'use strict'; 


const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database/db.js')

const PORT = process.env.PORT || 3000;
const CLIENT_FILES = path.join(__dirname, './public');
const server = express()
.use(express.static(CLIENT_FILES))
.listen(PORT, () => {
	console.log('\n\n\n\n\n   (((((((((  WELCOME TO OnQ SERVER  )))))))))  ');
	console.log(`Listening on ${ PORT }`);
	console.log('\n\n\n\n\n');
	});
console.log(PORT)
const WSserver = new SocketServer({ server });

WSserver.on('connection', (client) => {
	var clientID = client.upgradeReq.rawHeaders[21].slice(0,5);
	console.log('\n' + clientID + ' <---- connected');
	var sendObj = {};
	sendObj.user = {};
	sendObj.user.loginOk = false;
	sendObj.time = new Date().toTimeString();
	client.send( JSON.stringify(sendObj) );

	client.on('message', (recObj)=> {
		recObj = JSON.parse(recObj);
		console.log('\n' + clientID + ' attempting to update ');
		if (recObj.username.length > 0 && recObj.password.length > 0) {
			sendObj.user.loginOk = true;
			client.send( JSON.stringify(sendObj) );
		}
		});

	client.on('close', ()=> {
		console.log('\n' + clientID, ' <------ disconnected');
		// clearInterval(oneSetInterval); 
		});

	// var oneSetInterval = setInterval( ()=> {
	// 	sendObj.time = new Date().toTimeString();
	// 	client.send( JSON.stringify(sendObj) );
	// 	}, 1000);
	
});

