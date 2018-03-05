const express = require('express');
const request = require('request');
const sqlite3 = require("sqlite3").verbose();
const dbFile = "fortniteUserData.db";
const querystring = require('querystring');
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


const fortniteDB = new sqlite3.Database(dbFile);

const app = express();

//localhost:5000 listens to queries
//localhost:3000 is my actual react app
const port = process.env.PORT || 5000;

//listens to all queries
app.get('/query', function(request, response){
	console.log("query");
	query = request.url.split("?")[1];

	if(query){
		answer(query, response);
	}
	else{
		sendCode(400, response, 'query not recognized');
	}
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function sendCode(code, response, message){
	console.log(1);
	reponse.status(code);
	response.send(message);
}



//answers valid queries
function answer(query, response){
	let answer = response;
	let queryObj = querystring.parse(query);
	let operation = queryObj.op;
	console.log(operation);
	console.log(query);


	//gets user info from TRN API and inserts / updates database with the information
	if(operation === "userInfo"){
		console.log('uploading user statistics to database...');

		//splits url to get usernames and their platform for each entry in array
		let names_platforms = query.split("&"); 
		names_platforms.shift();

		let users = [];
		let platforms = [];

		//splits it further to separate the user and platforms into two separate arrays
		for(let i = 0; i < names_platforms.length; ++i){
			let name_platform = names_platforms[i].split(',');
			users.push(name_platform[0].split("=")[1]);
			platforms.push(name_platform[1].split("=")[1]);
		}

		let data = [];
		let remainingCalls = users.length;
		let wait = 0;
		//proxyurl needed to bypass cors
		const proxyurl = "https://cors-anywhere.herokuapp.com/";

		//for each user submitted
		for(let i = 0; i < users.length; ++i){
			let user = users[i];
			let platform = platforms[i];
			const url = 'https://api.fortnitetracker.com/v1/profile/' + platform.toLowerCase() + "/" + user;
			let options = {
				url: url,
				headers:{
					'TRN-api-key' : '40e833dc-c903-4409-a3c0-d3f6d4cc0fa7'
				}
			};

			//fortnite api only allows 1 api request per 2 seconds
			setTimeout(function(){
				request(options, function(error, response, body){
					if(!error && response.statusCode === 200){
						APIcallback(body);
					}
				});
			}, wait);
			wait += 2000;
		}

		//callback to resolve async problem with settimeout
		function APIcallback(body){
			let newData = JSON.parse(body);
			data.push(newData);
			--remainingCalls;
			//send data after all api calls are done
			if(remainingCalls === 0){
				for(let i = 0; i < data.length; ++i){
					let accountName = data[0].epicUserHandle;
					let platformName = data[0].platformName;
					let overall_stats = data[i].lifeTimeStats;
					let mode_stats = data[i].stats;

					let mode_stats_overall_solos = mode_stats.p2;
					let mode_stats_overall_duos = mode_stats.p10;
					let mode_stats_overall_squads = mode_stats.p9;

					let mode_stats_season_solos = mode_stats.curr_p2;
					let mode_stats_season_duos = mode_stats.curr_p10;
					let mode_stats_season_squads =  mode_stats.curr_p9;
				}	
			}
		}
	}	



}