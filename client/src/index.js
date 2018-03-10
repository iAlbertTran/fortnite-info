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

		let url = "/query?op=update";

		for(let i = 0; i < users.length; ++i){
			url = url +  "&playerName=" + users[i] + ",platform=" + platforms[i];
		}
		const response = await fetch(url);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		else if (response.status === 200) {
			this.props.handleNewInfo(body);
		}

  	};


	render(){

		let formNumber = this.state.forms;
		const users = this.state.users;
		const forms = formNumber.map((curr, index) => {
			return(
				<div key={index} className="userForm">
					Name:
					<input 
						className={index} 
						type='text' 
						value={this.state.users[index]} 
						onChange={this.handleUserChange} required />
					Platform:
					<select 
						className={index} 
						value={this.state.platforms[index]} 
						onChange={this.handlePlatformChange} 
						required
					>
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
				<input type='submit' value='Update' />
				<button onClick={this.addForm}>Add Player</button>
				{remove_button}
			</form>
		);
	}

}

class CheckBoxStack extends React.Component{

	handleChange(){
		console.log(1);


		
	}

	render(){

		return(
			<div className="individual-check">
				<div className="text">{this.props.text}</div>
				<div className="inputs">
					<input 
						className="lifetime-solo" 
						value={"table=overall_solo&column='" + this.props.value + "'"} 
						type='checkbox' 
						onChange={this.handleChange}/>
					<input 
						className="lifetime-duo" 
						value={"table=overall_duo&column='" + this.props.value + "'"}
						type='checkbox' 
						onChange={this.handleChange}/>
					<input 
						className="lifetime-squad" 
						value={"table=overall_squad&column'" + this.props.value + "'"} 
						type='checkbox' 
						onChange={this.handleChange}/>
					<input 
						className="season-solo" 
						value={"table=season_solo&column='" + this.props.value + "'"} 
						type='checkbox' 
						onChange={this.handleChange}/>
					<input 
						className="season-duo" 
						value={"table=season_duo&column='" + this.props.value + "'"} 
						type='checkbox' 
						onChange={this.handleChange}/>
					<input 
						className="season-squad" 
						value={"table=season_squad&column='" + this.props.value + "'"} 
						type='checkbox' 
						onChange={this.handleChange}/>
				</div>
			</div>
		);
	}
}

class CheckSection extends React.Component{
	render(){
		return(
			<div id='checkboxes'>
				<CheckBoxStack text="Wins" value="Wins" />
				<CheckBoxStack text="Top 3" value="Top 3" />
				<CheckBoxStack text="Top 5" value="Top 5" />
				<CheckBoxStack text="Top 6" value="Top 6" />
				<CheckBoxStack text="Top 10" value="Top 10" />
				<CheckBoxStack text="Top 12" value="Top 12" />
				<CheckBoxStack text="Top 25" value="Top 25" />
				<CheckBoxStack text="Matches" value="Matches" />
				<CheckBoxStack text="Win %" value="Win %" />
				<CheckBoxStack text="Kills" value="Kills" />
				<CheckBoxStack text="Kills/Min" value="Kills Per Min" />
				<CheckBoxStack text="Kills/Match" value="Kils Per Match" />
				<CheckBoxStack text="Time/Match" value="Avg Match Time" />
				<CheckBoxStack text="K/D" value="K/d" />
				<CheckBoxStack text="Time Played" value="Time Played" />
				<CheckBoxStack text="Score/Match" value="Score per Match" />
				<CheckBoxStack text="Score/Min" value="Score per Minute" />
				<CheckBoxStack text="Score" value="Score" />
				<CheckBoxStack text="TRN Rating" value="TRN Ratings" />
			</div>
		);
	}
}

function CheckMode(props){
	return(
		<div className={props.category}>
			<div className="title">{props.title}</div>
			<div className="mode">
				<div id='solo'>Solo</div>
				<div id='duo'>Duo</div>
				<div id='squad'>Squad</div>
			</div>
		</div>
	);
}

class OverallChecks extends React.Component{

	handleChange(event){

		let columns = document.getElementsByClassName(event.target.value);

		for(let i = 0; i < columns.length; ++i){
			if(columns[i].style.display === 'block' || !columns[i].style.display){
				columns[i].style.display = 'none';
			}
			else{
				columns[i].style.display = 'block';
			}
		}
	}

	render(){
		return(
			<div className="individual-check">
				<div className="text">{this.props.text}</div>
				<input 
					className="lifetime" 
					value={this.props.value} 
					type='checkbox' 
					defaultChecked="true" 
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}
class Checkboxes extends React.Component{

	handleChange(event){
		let user = document.getElementById(event.target.value);

		if(user.style.display === 'grid' || !user.style.display){
			user.style.display = 'none';
		}
		else{
			user.style.display = 'grid';
		}
	}

	render(){
		let data = this.props.data;
		const user_list = data.map((curr, index) => {
			return (
				<div key={curr.User} className="individuals">
					<div>{curr.User}</div>
					<input 
						className="user-list" 
						value={curr.User} 
						type='checkbox' 
						defaultChecked="true" 
						onChange={this.handleChange}
					/>
				</div>
			);
		});
		return(
			<div id="stat-checkbox">
				<div id="users">
					<div id="user-title">Users</div>
					<div id="individual-list">
						{user_list}
					</div>
				</div>
				<div id="overall">
					<div className="title">Overall</div>
					<div id="overall-wrapper">
						<OverallChecks value="Wins" text="Wins" />
						<OverallChecks value="Top 3" text="Top 3" />
						<OverallChecks value="Top 3s" text="Top 3s" />
						<OverallChecks value="Top 5s" text="Top 5s" />
						<OverallChecks value="Top 6s" text="Top 6s" />
						<OverallChecks value="Top 12s" text="Top 12s" />
						<OverallChecks value="Top 25s" text="Top 25s" />
						<OverallChecks value="Matches Played" text="# of Matches" />
						<OverallChecks value="Win%" text="Win%" />
						<OverallChecks value="Score" text="Score" />
						<OverallChecks value="Kills" text="Kills" />
						<OverallChecks value="K/d" text="K/D" />
						<OverallChecks value="Kills Per Min" text="Kills/Min" />
						<OverallChecks value="Time Played" text="Time Played" />
						<OverallChecks value="Avg Survival Time" text="Time/Match" />
					</div>
				</div>
				<div id="mode-stats">
					<CheckMode category="life" title="Lifetime Stats"/>
					<CheckMode category="season" title="Season Stats"/>
					<CheckSection />
				</div>
			</div>
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
	let data_overall;

	//get the title for subcategories of each mode and lifetime stats
	if(data){
		data_overall = Object.entries(data).splice(2,).map((curr,index) =>{
			return(
				<div key={curr[0]} className={curr[0] + " overall-stats"}>
					<div className="subcategory-title">{curr[0]}</div>
					<div className="subcategory-stat">{curr[1]}</div>
				</div>
			);
		});
	}



	return(
		<div className="total-lifetime-stats category">
			{data_overall}
		</div>
	);
}


function StatsChart(props){
	let stats = props.stats;
	let mode = [];
	let mode_category = '';
	let mode_specific = '';

	if(!stats.length)
		return <div></div>;



	const chart = stats.map((curr, index) => {
		mode = curr.pop();
		mode_category = mode[1].split("-")[0];
		mode_specific = mode[1].split("-")[1];

		const stat_numbers = curr.map((curr, index) => {
			return(
				<div className="individual-stat">
					{curr[1]}
				</div>
			);
	
		});

		return(
			<div key={mode} className={"mode-stats " + mode_specific}>
				{stat_numbers}
			</div>
		);
	});

	const stat_titles = stats[0].map((curr, index) => {
		return(
			<div className="stat-titles">
				{curr[0]}
			</div>
		);
	});

	return(
		<div className={mode_category}>
			<div className="title">{mode_category}</div>
			<div className="all-mode-data">
				<div className="modes">
					<div className="mode">Solo</div>
					<div className="mode">Duo</div>
					<div className="mode">Squad</div>
				</div>
				<div className="chart">
					<div className="stat-titles">{stat_titles}</div>
					<div className="stats">{chart}</div>
				</div>
			</div>
		</div>
	);
}


function ModeStats(props){
	let modeData = props.modeData;

	let stats_season = [];
	let stats_overall = [];

	modeData.map((curr, index) => {
		let temp = Object.entries(curr).splice(2,);

		// parse the data into two categoris: overall stats and season stats
		switch(curr.Mode){
			case "Overall-Solo":
			case "Overall-Duo":
			case "Overall-Squad":
				stats_overall.push(temp);
				break;
			case "Season-Solo":
			case "Season-Duo":
			case "Season-Squad":
				stats_season.push(temp);
				break;
			default: break;
		}
		return temp;
	});

	return(
		<div className="mode-stats">
			<StatsChart stats={stats_overall} className="mode-stats"/>
			<StatsChart stats={stats_season} className="mode-stats"/>	
		</div>
	);
}

function UserInfo(props){
	const data = props.data;
	let modeData = props.modeData;
	//parses the data to get necessary info
	const parseUserData = data.map((curr, index) => {
		if(curr.error){
			return(
				<div key={curr.User} className="userInfo error" id={curr.User}>
					{"Player named " + curr.error + ". Please Try Again."}
				</div>
			);
		}
		const user = curr.User;
		const platform = curr.Platform;
		let relevant_data = [];
		for(let i = 0; i < modeData.length; ++i){
			if(modeData[i].User === curr.User){
				relevant_data.push(modeData[i]);
			}
		}

		return(
			<div key={user} className="userInfo" id={user}>
				<UserID 
					user={user} 
					platform={platform} 
					handleCheck={props.handleCheck}
				/>
				<div className="lifetime-title">Overall Statistics</div>
				<OverallStats data={curr} />
				<div className="mode-title">Game Mode Statistics</div>
				<ModeStats modeData={relevant_data} />
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
			response: '',
			modeData: []
		}
	}

	//completely rewrite data with the new set of data
	handleNewInfo(newData){
		this.setState({
			data: newData
		});
	}

	componentWillMount = async () => {
		let url = "/query?op=userInfo";

		const response = await fetch(url);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);


		let mode_url = "/query?op=modeData";
		
		const mode_response = await fetch(mode_url);
		const mode_body = await mode_response.json();

		if (mode_response.status !== 200) throw Error(mode_body.message);
		
		this.setState({
			data: body,
			modeData: mode_body
		});
	}

	render(){
		return(
			<div id="content">
				<Form  
					handleNewInfo={(newData) => this.handleNewInfo(newData)}
				/>
				<Checkboxes 
					data={this.state.data}
				/>
				<UserInfo 
					data={this.state.data} 
					modeData={this.state.modeData}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Site />, document.getElementById('root'));

