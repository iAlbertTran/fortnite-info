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
	response.status(code);
	response.send(message);
}



let queryCount;
let error_list;
let queries = 6;
//answers valid queries
function answer(query, response){
	let answer = response;
	let queryObj = querystring.parse(query);
	let operation = queryObj.op;
	error_list = [];
	let appResponse = response;

	//gets user info from TRN API and inserts / updates database with the information
	if(operation === "update"){
		console.log('attemping to update user stats in database...');

		//splits url to get usernames and their platform for each entry in array
		let names_platforms = query.split("&"); 
		names_platforms.shift();

		let users = [];
		let platforms = [];
		let data = [];

		//splits it further to separate the user and platforms into two separate arrays
		for(let i = 0; i < names_platforms.length; ++i){
			let name_platform = names_platforms[i].split(',');
			users.push(name_platform[0].split("=")[1]);
			platforms.push(name_platform[1].split("=")[1]);
		}

		let remainingCalls = users.length;
		let wait = 0;

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
						APIcallback(body, user, platform, appResponse);
					}
				});
			}, wait);

			wait += 2000;
		}

		//callback to resolve async problem with settimeout
		function APIcallback(body, user, platform, appResponse){
			let newData = JSON.parse(body);

			if(newData.error){
				newData.error = user + " on platform " + platform + " not found";
				newData.User = user;
				newData.Platform = platform;
			}

			data.push(newData);

			--remainingCalls;
			//send data after all api calls are done
			if(remainingCalls === 0){

				//global variable. 7 updates to 7 tables per player. Shouldn't send a response until all updates are done;
				queryCount = data.length * 7;
				for(let i = 0; i < data.length; ++i){

					//if api call to TRN can't find user...
					if(data[i].error){
						error_list.push(data[i]);
						queryCount -= 7;
						sendData(appResponse);
						continue;
					}

					let accountName = data[i].epicUserHandle;
					let platformName = data[i].platformName;

					let overall_stats = data[i].lifeTimeStats;
					let mode_stats = data[i].stats;

					updateOverallStats(accountName, platformName, overall_stats, response);
					updateModeStats(accountName, platformName, mode_stats, response);

				}
			}
		}
	}

	else if(operation === "userInfo"){
		console.log('Pulling data on users in database...')
		fortniteDB.all("SELECT * FROM overall", function(err,rows){
			if(err){
			console.log(err+"\n");
			sendCode(400, response, "API error");
		}
		else{
			console.log("query success!");
			response.status(200);
            response.type("text/plain");
            response.send(rows);
		}
		});
	}

	else if(operation ==="modeData"){

		console.log("Pulling data from all game mode tables");
		let data = [];
		pullModeData("SELECT * FROM overall_solo", "overall-solo");
		pullModeData("SELECT * FROM overall_duo", "overall-duo");
		pullModeData("SELECT * FROM overall_squad", "overall-squad");
		pullModeData("SELECT * FROM season_solo", "season-solo");
		pullModeData("SELECT * FROM season_duo", "season-duo");
		pullModeData("SELECT * FROM season_squad", "season-squad");
		
		function pullModeData(cmdStr, table){
			fortniteDB.all(cmdStr, function(err, rows){
				if(err){
				console.log(err+"\n");
				sendCode(400, appResponse, "API error");
			}
			else{
				rows.unshift({mode: table});
				data.push(rows);
				--queries;

				if(!queries){
					console.log("query success!");
					response.status(200);
		            response.type("text/plain");
		            response.send(data);
		        }
			}
			});
		}
	}
}


function updateOverallStats(user, platform, data, response){
	let lifeTime_keys = ['User','Platform'];
	let lifeTime_values = ["'" + user + "'", "'" + platform + "'"];
	for(let i = 0; i < data.length; ++i){
		lifeTime_keys.push("'" + data[i].key + "'");
		lifeTime_values.push("'" + data[i].value + "'");
	}
	
	let cmdStr = "INSERT OR REPLACE INTO overall (" + lifeTime_keys + ") VALUES (" + lifeTime_values + ")";
	fortniteDB.run(cmdStr, updateCallback);

	function updateCallback(err){
		console.log("updating information for " + user);
		if(err){
			console.log(err+"\n");
			sendCode(400, response, "API error");
		}
		else{
			console.log("update success!");
			response.status(200);
            response.type("text/plain");
           	--queryCount;
		}
	}
}

function updateModeStats(user, platform, data, response){
	const test = Object.entries(data).map((curr) =>{

		let tableName;

		switch(curr[0]){
			case 'p2':
				tableName = 'overall_solo';
				break;
			case 'p10':
				tableName = 'overall_duo';
				break;
			case 'p9':
				tableName = 'overall_squad';
				break; 
			case 'curr_p2':
				tableName = 'season_solo';
				break;
			case 'curr_p10':
				tableName = 'season_duo';
				break;
			case 'curr_p9':
				tableName = 'season_squad';
				break;
			default: break; 
		}

		let columnNames = ["'User'", "'Platform'"];

		let mode_values = Object.entries(curr[1]).map((curr) => {
			columnNames.push("'" + curr[1].label + "'");
			return ("'" + curr[1].displayValue + "'");
		});

		mode_values.unshift("'" + platform + "'");
		mode_values.unshift("'" + user + "'");

		let cmdStr = "INSERT OR REPLACE INTO " + tableName + " (" + columnNames + ") VALUES (" + mode_values + ")";
		fortniteDB.run(cmdStr, function(err){
			console.log("updating " + tableName + " for " + user);

			if(err){
				console.log(err+"\n");
				sendCode(400, response, "API error");
			}
			else{

				console.log("update success!");

				response.status(200);
	            response.type("text/plain");

	            --queryCount;

	            sendData(response);
			}

		});

	});	
}


function sendData(response){
	if(queryCount === 0){
		fortniteDB.all("SELECT * FROM overall", function(err, row){
			if(err){
				console.log(err+"\n");
				sendCode(400, response, "API error");

			}
			else{
				let length = error_list.length;
				while(length > 0){
					row.push(error_list[--length]);
				}
				console.log('Data sent!');
				response.send(row);
			}
		});
	}
}