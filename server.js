const express = require('express');
const request = require('request');
const sqlite3 = require("sqlite3").verbose();
const dbFile = "fortniteUserData.db";
const querystring = require('querystring');
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


const fortniteDB = new sqlite3.Database(dbFile);

const app = express();
const port = process.env.PORT || 5000;

app.get('/query', function(request, response){
	console.log("query");
	query = request.url.split("?")[1];

	if(query){
		answer(query, response);
	}
	else{
		sendCode(400, response, 'query not recgnozied');
	}
});

app.listen(port, () => console.log(`Listening on port ${port}`));

function sendCode(code, response, message){
	console.log(1);
	reponse.status(code);
	response.send(message);
}

function answer(query, response){
	let queryObj = querystring.parse(query);
	let operation = queryObj.op;
	console.log(operation);
	console.log(query);

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

		let wait = 0;
		//proxyurl needed to bypass cors
		const proxyurl = "https://cors-anywhere.herokuapp.com/";

		//for each user submitted
		for(let i = 0; i < users.length; ++i){
			let user = users[i];
			let platform = platforms[i];
			const url = 'https://api.fortnitetracker.com/v1/profile/' + platform.toLowerCase() + "/" + user;
			const req = new XMLHttpRequest;
			req.onreadystatechange = function(){
				let newData;
				console.log(req.readyState);
				if(req.readyState === 4){
					newData = JSON.parse(req.responseText);
					console.log('it goes here');
					if(newData.error){
						newData.error = users[i];
					}

					data.push(newData);
					console.log(newData);
				}
			}

			req.open('GET', proxyurl + url, true);

			//api key send with request through header
			req.setRequestHeader('TRN-api-key', '40e833dc-c903-4409-a3c0-d3f6d4cc0fa7');

			//api limits 1 request per 2 seconds
			setTimeout(function(){
				req.send();
			}, wait);

			wait += 2000;
		}

	}
}