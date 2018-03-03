import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import $ from "jquery";

class Form extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			users: [''],
			platforms: ['pc'],
			forms: [true],
			titleData: false
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
					<input className={index} type='text' value={this.state.users[index]} onChange={this.handleUserChange} required />
					Platform:
					<select className={index} value={this.state.platforms[index]} onChange={this.handlePlatformChange} required>
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

		//get the title of each category
		let titleData;
		if(data.length > 0){
			titleData = Object.entries(data[0].stats.p2).map((curr,index) =>{
				return(
					<div key={curr[0]} className="subcategory-title" id={curr[0]}>
						{curr[1].label}
					</div>
				);
			});
		}

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
			const stats = curr.stats;

			const lifetime = lifetimeStats.map((curr,index) =>{
				const key = curr.key;
				const value = curr.value;

				return(
					<div className={key + ' subcategory'}>
						<div>{value}</div>
					</div>
				);
			});

			//parses both season data and lifetime data
			const stats_per_mode = Object.entries(stats).map((curr,index) =>{
				let key;
				let section
				switch(curr[0]){

						case "p2":
							key = "lifetime-solos";
							section = "Solos (Total)"
							break;

						case "p10":
							key = "lifetime-duos";
							section = "Duos (Total)"
							break;

						case "p9":
							key = "lifetime-squads";
							section = "Squads (Total)"
							break;

						case "curr_p2":
							key = "season-solos";
							section = "Solos (Current Season)"
							break;

						case "curr_p10":
							key = "season-duos";
							section = "Duos (Current Season)"
							break;

						case "curr_p9":
							key = "season-squads";
							section = "Squads (Current Season)"
							break;

						default:
							return(<div></div>);
					}

				const stats = Object.entries(curr[1]).map((curr, index) => {
					const percentile = curr[1].percentile ?
						curr[1].percentile : "N/A";
					return(
						<div className={curr[0] + ' subcategory'}>
							<div>{curr[1].value}</div>
							<div className="percentile">{percentile}</div>
						</div>
					);
					
				});


				//if a win ratio is not present it means that the player hasn't won a game in that category, thus the field is omitted. 
				//So we create one to keep the table looking uniform
				if(!curr[1].winRatio){
					const empty_winRatio = 
						(<div className="winRatio subcategory">
							<div>0</div>
							<div className="percentile">N/A</div>
						</div>
						);
					stats.push(empty_winRatio);
				}

				return (
					<div className={key + ' category'}>
						<div className="category-title subcategory">{section}</div>
						{stats}
					</div>
					);
			});


			return(
				<div className="userInfo" id={user}>
					<div key={user} className="userID">{user}</div>
					<div className="userPlatform">{platform}</div> 
					<div className="total-lifetime-stats category">
						<div id="lifetime-title">Overall Statistics</div>
						{lifetime}
					</div>
					<div id="game-mode">
						<div id="game-mode-title">Game Mode Statistics</div>
						<div id="userName" className="subcategory-title">User Name</div>
						<div id="category" className="subcategory-title">Category</div>
						{titleData}
						{stats_per_mode}
					</div>
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


