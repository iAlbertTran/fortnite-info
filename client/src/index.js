import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import $ from "jquery";
//https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
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
		this.addForm = this.addForm.bind(this);
		this.callApi = this.callApi.bind(this);
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

		if(users.length > 1){
			users.pop();
			platforms.pop();
			formNumber.pop();

			this.setState({
				users: users,
				platforms: platforms,
				forms: formNumber
			});
		}


	}

	callApi = async (event) => {
  		event.preventDefault();
  		let users = this.state.users;
		let platforms = this.state.platforms;

		let url = "/query?op=userInfo";

		for(let i = 0; i < users.length; ++i){
			url = url +  "&playerName=" + users[i] + ",platform=" + platforms[i];
		}
		const response = await fetch(url);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
  	};


	render(){
		let formNumber = this.state.forms;
		const users = this.state.users;
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

		const remove_button = (users.length > 1) ?
			<button onClick={this.removeForm}>Remove Player</button> :
			<button onClick={this.removeForm} disabled>Remove Player</button>

		return(
			<form id="playerForm" onSubmit={this.callApi}>
				<label>
					{forms}
				</label>
				<input type='submit' value='Get Info' />
				<button onClick={this.addForm}>Add Player</button>
				{remove_button}
			</form>
		);
	}

}

function UserID(props){

	return(
		<div className="userID" key={props.user} id={props.user}>
			<div>{props.user} </div>
			<div className="userPlatform">{props.platform}</div> 
		</div>
	);
}

function OverallStats(props){

	const data = props.data;
	let lifetime;
	let titleData_lifetime;

	//get the title for subcategories of each mode and lifetime stats
	if(!data.error){
		titleData_lifetime = data.lifeTimeStats.map((curr,index) =>{
			return(
				<div key={curr.key} className={curr.key + " subcategory-title"}>
					{curr.key}
				</div>
			);
		});
	}



	const lifetimeStats = data.lifeTimeStats;

	lifetime = lifetimeStats.map((curr,index) =>{
		const key = curr.key;
		const value = curr.value;

		return(
			<div className={key + ' subcategory'}>
				<div>{value}</div>
			</div>
		);
	});


	return(
		<div className="total-lifetime-stats category">
			<div className="lifetime-title">Overall Statistics</div>
			{titleData_lifetime}
			{lifetime}
		</div>
	);
}

function GameMode(props){
	const data = props.data;
	let titleData_mode_overall;
	let titleData_mode_season;
	let stats_per_mode;

	//get the title for subcategories of each mode and lifetime stats
	if(!data.error){
		titleData_mode_overall = Object.entries(data.stats.p2).map((curr,index) =>{
			return(
				<div key={curr[0]} className={curr[0] + " subcategory-title"}>
					{curr[1].label}
				</div>
			);
		});

		titleData_mode_overall.unshift(<div className="mode subcategory-title">Mode</div>);

		titleData_mode_season= Object.entries(data.stats.p2).map((curr,index) =>{
			return(
				<div key={curr[0]} className={curr[0] + " subcategory-title"}>
					{curr[1].label}
				</div>
			);
		});

		titleData_mode_season.unshift(<div className="mode subcategory-title">Mode</div>);
	}

	const stats = data.stats;
	//parses both season data and lifetime data
	stats_per_mode = Object.entries(stats).map((curr,index) =>{
		let key;
		let section
		switch(curr[0]){

				case "p2":
					key = "lifetime-solos";
					section = "Solos"
					break;

				case "p10":
					key = "lifetime-duos";
					section = "Duos"
					break;

				case "p9":
					key = "lifetime-squads";
					section = "Squads"
					break;

				case "curr_p2":
					key = "season-solos";
					section = "Solos"
					break;

				case "curr_p10":
					key = "season-duos";
					section = "Duos"
					break;

				case "curr_p9":
					key = "season-squads";
					section = "Squads"
					break;

				default:
					return(<div></div>);
			}
		//if percentile isn't present, set to 0
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
				<div className="category-title">{section}</div>
				{stats}
			</div>
			);
	});

	return(
		<div className="game-mode">
			<div className="game-mode-title overall">Game Mode Statistics (Overall)</div>
			<div className="subcategory-titles-overall">{titleData_mode_overall}</div>
			<div className="game-mode-title current">Game Mode Statistics (Current Season)</div>
			<div className="subcategory-titles-season">{titleData_mode_season}</div>
			{stats_per_mode}
		</div>
	);
}

function UserInfo(props){
	const data = props.data;

	//parses the data to get necessary info
	const parseUserData = data.map((curr, index) => {
		if(curr.error){
			return(
				<div key={curr.error} className="userID" id={curr.error}>{"Player named " + curr.error + " not found. Please Try Again."}</div>
			);
		}

		const user = curr.epicUserHandle;
		const platform = curr.platformNameLong;

		return(
			<div className="userInfo" id={user}>
				<UserID user={user} platform={platform} />
				<OverallStats data={curr} />
				<GameMode data={curr}/>
			</div>
		);
	}); 
	return parseUserData;
}

class Site extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: [],
			response: ''
		}
	}

  	/*componentDidMount() {
    	this.callApi()
      	.then(res => this.setState({ response: res.express }))
      	.catch(err => console.log(err));
 	}*/



	 //requests data from api

	//completely rewrite data with the new set of data
	handleNewInfo(newData){
		this.setState({
			data: newData
		});
	}

	render(){

		return(
			<div>
				<Form 
					data={this.state.data} 
					handleNewInfo={(newData) => this.handleNewInfo(newData)}
				/>
				<UserInfo data={this.state.data}/>
			</div>
		);
	}
}

ReactDOM.render(<Site />, document.getElementById('root'));

