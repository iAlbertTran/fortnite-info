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
let queries;
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
		let name_platform = query.split("&"); 
		name_platform.shift();

		let user = name_platform[0].split("=")[1];
		let platform = name_platform[1].split("=")[1];
		console.log(user);
		console.log(platform);

		const url = 'https://api.fortnitetracker.com/v1/profile/' + platform.toLowerCase() + "/" + user;
		let options = {
			url: url,
			headers:{
				'TRN-api-key' : '40e833dc-c903-4409-a3c0-d3f6d4cc0fa7'
			}
		};

		//fortnite api only allows 1 api request per 2 seconds
		request(options, function(error, response, body){
			if(!error && response.statusCode === 200){
				APIcallback(body, user, platform, appResponse);
			}
		});


		//callback to resolve async problem with settimeout
		function APIcallback(body, user, platform, appResponse){
			let newData = JSON.parse(body);

			//global variable. 7 updates to 7 tables per player. Shouldn't send a response until all updates are done;
			queryCount = 7;

			if(newData.error){
				newData.error = user + " on platform " + platform + " not found";
				newData.User = user;
				newData.Platform = platform;
				queryCount -= 7;
				sendData(appResponse);
			}
			else{
				let accountName = newData.epicUserHandle;
				let platformName = newData.platformName;

				let overall_stats = newData.lifeTimeStats;
				let mode_stats = newData.stats;

				updateOverallStats(accountName, platformName, overall_stats, response);
				updateModeStats(accountName, platformName, mode_stats, response);
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
		queries = 6;
		console.log("Pulling data from all game mode tables");
		let data = [];
		pullModeData("SELECT * FROM overall_solo", "Overall-Solo");
		pullModeData("SELECT * FROM overall_duo", "Overall-Duo");
		pullModeData("SELECT * FROM overall_squad", "Overall-Squad");
		pullModeData("SELECT * FROM season_solo", "Season-Solo");
		pullModeData("SELECT * FROM season_duo", "Season-Duo");
		pullModeData("SELECT * FROM season_squad", "Season-Squad");
		
		function pullModeData(cmdStr, table){
			fortniteDB.all(cmdStr, function(err, rows){
				if(err){
				console.log(err+"\n");
				sendCode(400, appResponse, "API error");
			}
			else{
				for(let i = 0; i < rows.length; ++i){
					rows[i].Mode = table;
					data.push(rows[i]);
				}
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
				console.log('Data sent!');
				response.send(row);
			}
		});
	}
}