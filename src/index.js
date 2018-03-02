import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import $ from "jquery";

class Form extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			users: ['', ''],
			platforms: ['pc', 'pc'],
			forms: [true, true]
		};

		this.handleUserChange = this.handleUserChange.bind(this);
		this.handlePlatformChange = this.handlePlatformChange.bind(this);
		this.requestData = this.requestData.bind(this);
		this.addForm = this.addForm.bind(this);
		this.removeForm = this.removeForm.bind(this);
	}


	//updates username info
	handleUserChange(event){
		let index = parseInt(event.target.className[0], 10);
		let users = this.state.users;
		users[index] = event.target.value;

		this.setState({users: users});
	}


	//updates platform info
	handlePlatformChange(event){
		let index = parseInt(event.target.className[0], 10);
		let platforms = this.state.platforms;
		platforms[index] = event.target.value;

		this.setState({platforms: platforms});
	}

	//adds additional forms for more users
	addForm(event){
		event.preventDefault();
		const formNumber = this.state.forms;
		const users = this.state.users;
		const platforms = this.state.platforms;
		this.setState({
			users: users.concat(['']),
			platforms: platforms.concat(['pc']),
			forms: formNumber.concat([true])
		});

	}

	removeForm(event){
		event.preventDefault();

		const formNumber = this.state.forms;
		const users = this.state.users;
		const platforms = this.state.platforms;

		users.pop();
		platforms.pop();
		formNumber.pop();

		this.setState({
			users: users,
			platforms: platforms,
			forms: formNumber
		});

	}

	//requests data from api
	requestData(event){
		//prevents page reload
		event.preventDefault();

		let users = this.state.users;
		let platforms = this.state.platforms;
		let user;
		let platform;
		let data = [];

		let wait = 0;
		//proxyurl needed to bypass cors
		const proxyurl = "https://cors-anywhere.herokuapp.com/";

		//for each user submitted
		for(let i = 0; i < users.length; ++i){
			user = users[i];
			platform = platforms[i];
			const url = 'https://api.fortnitetracker.com/v1/profile/' + platform.toLowerCase() + "/" + user;
			const req = new XMLHttpRequest();
			req.onreadystatechange = function(){
				let newData;
				if(req.readyState === XMLHttpRequest.DONE){
					newData = JSON.parse(req.responseText);

					if(newData.error){
						newData.error = users[i];
					}

					data.push(newData);
					this.props.handleNewInfo(data);
				}
			}.bind(this)

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

	render(){
		let formNumber = this.state.forms;
		const forms = formNumber.map((curr, index) => {
			return(
				<div key={index} className="userForm">
					Name:
					<input className={index} type='text' value={this.state.users[index]} onChange={this.handleUserChange} />
					Platform:
					<select className={index} value={this.state.platforms[index]} onChange={this.handlePlatformChange}>
						<option>PC</option>
						<option>PSN</option>
						<option>XBL</option>
					</select>
				</div>
			);

		});

		return(
			<form id="playerForm" onSubmit={this.requestData}>
				<label>
					{forms}
				</label>
				<input type='submit' value='Get Info' />
				<button onClick={this.addForm}>Add Player</button>
				<button onClick={this.removeForm}>Remove Player</button>
			</form>
		);
	}

}

class Site extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: []
		}
	}

	//completely rewrite data with the new set of data
	handleNewInfo(newData){
		this.setState({
			data: newData
		});
	}

	render(){

		const data = this.state.data;
		console.log(data);
		//parses the data to get necessary info
		const parseUserData = data.map((curr, index) => {
			if(curr.error){
				return(
					<div key={curr.error} className="userID" id={curr.error}>{"Player named " + curr.error + " not found. Please Try Again."}</div>
				);
			}

			
			const user = curr.epicUserHandle;
			const platform = curr.platformNameLong;
			const lifetimeStats = curr.lifeTimeStats;
			const recentMatches = curr.recentMatches;
			const stats = curr.stats;

			const lifetime = lifetimeStats.map((curr,index) =>{
				const key = curr.key;
				const value = curr.value;

				return(
					<div className="lifeTimeStats">
						<div className={key}>{key}</div>
						<div>{value}</div>
					</div>
				);
			});
			return(
				<div className="userInfo" id={user}>
					<div key={user} className="userID">{user}</div>
					<div className="userPlatform">{platform}</div> 
					{lifetime}
				</div>
			);
		});  

		return(
			<div>
				<Form data={this.state.data} handleNewInfo={(newData) => this.handleNewInfo(newData)}/>
				{parseUserData}
			</div>
		);
	}
}

ReactDOM.render(<Site />, document.getElementById('root'));


