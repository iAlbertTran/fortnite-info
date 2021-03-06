import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './img/logo.png';
import {Doughnut} from 'react-chartjs-2';

class Form extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			user: '',
			platform: 'pc',
			titleData: false
		};

		this.handleUserChange = this.handleUserChange.bind(this);
		this.changePlatform = this.changePlatform.bind(this);
		this.callApi = this.callApi.bind(this);
	}


	//updates username info
	handleUserChange(event){
		let user = this.state.user;
		user = event.target.value;

		this.setState({user: user});
	}



	callApi = async (event) => {
  		event.preventDefault();

  		let user = this.state.user;
		let platform = this.state.platform;

		let url = "/query?op=update&playerName=" + user + "&platform=" + platform;
		const response = await fetch(url);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		else if (response.status === 200) {
			this.props.handleNewInfo(body);
			this.setState({
				user: '',
				platform: 'pc'
			});
		}

  	};

  	changePlatform(event){
  		this.setState({
  			platform: event.target.value
  		});
  	}

	render(){

		return(
			<form id="playerForm" className="input-group input-group-sm mb-3" onSubmit={this.callApi}>
				<div className="input-group-prepend btn-group">
					<button type="button" className="btn btn-secondary" onClick={this.changePlatform} value="pc">PC</button>
					<button type="button" className="btn btn-secondary" onClick={this.changePlatform} value="psn">PSN</button>
					<button type="button" className="btn btn-secondary" onClick={this.changePlatform} value="xbl">XBL</button>
				</div>


				<input 
					className={"form-control"} 
					type='text' 
					value={this.state.user} 
					onChange={this.handleUserChange} required 
					placeholder="Enter Player Name"
				/>

				<button className="btn btn-sm btn-secondary input-group-append" type='submit' value='Update'>Update</button>
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

function Dropdown(props){
	return(
		<div className={props.class + " btn-group btn-group-sm dropleft"}>
			<button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				{props.buttonText}<span className="caret"></span>
			</button>
			<div className="dropdown-menu dropdown-menu-right">
					{props.content}
			</div>
		</div>
	);
}
class Checkboxes extends React.Component{

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

		let overall_div = (
			<div id="overall" className="dropdown-item">
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

		);

		let mode_stats_div = (
			<div id="mode-stats" className="dropdown-item">
				<CheckMode category="life" title="Lifetime Stats"/>
				<CheckMode category="season" title="Season Stats"/>
				<CheckSection />
			</div>
		);

		return(
			<div id="stat-checkbox">

				<Dropdown 
					buttonText="Overall"
					content={overall_div}
					class="overall-wrapper"
				/>

				<Dropdown 
					buttonText="Mode"
					content={mode_stats_div}
					class="mode-wrapper"
				/>
			
			</div>
		);
	}
}

class UserID extends React.Component{

	render(){
		return(
			<button key={this.props.user} id={this.props.user} className="user" onClick={this.props.handleChange}>
				<div>{this.props.user} </div>
				<div className="userPlatform">{this.props.platform}</div> 
			</button>
		);
	}
}

class OverallStats extends React.Component{
	render(){
		const data = this.props.data;
		let data_titles = [];

		
		//get the title for subcategories of each mode and lifetime stats
		if(data){
			let data_overall = Object.entries(data).splice(2,).map((curr,index) =>{
				data_titles.push(curr[0]);
				return curr[1];
			});

			//TRN api: Top 3 = top 10, Top 3 and Top 25s are for solos,
			//Top 5s and Top 12s are for duos,
			// Finally, Top 3s and Top 6s are for squad (notice Top 3 has no s for solo in JSON)
			let wins_overall = data_titles[0]  + " (All Modes - " + Math.round(data_overall[0] / data_overall[7] * 10000)/100 + "%)";
			let solo = "Top 10/25 (Solo - " + Math.round((data_overall[1] + data_overall[6]) / data_overall[7] * 10000)/100 + "%)";
			let duo =  "Top 5/12 (Duo - " + Math.round((data_overall[3] + data_overall[5]) / data_overall[7] * 10000)/100 + "%)";
			let squad = "Top 3/6 (Squad - " + Math.round((data_overall[2] + data_overall[4]) / data_overall[7] * 10000)/100 + "%)";
			let matches = "Did not place (" + Math.round((data_overall[7] - data_overall[6] - data_overall[5] - data_overall[4] - data_overall[3] - data_overall[2] - data_overall[1] - data_overall[0]) / data_overall[7] * 10000)/100 + "%)";


			const chart_data = {
				labels: [
					wins_overall,
					solo,
					duo,
					squad,
					matches
				],
				datasets: [{
					data: [
						data_overall[0],
						data_overall[1] + data_overall[6],
						data_overall[3] + data_overall[5],
						data_overall[2] + data_overall[4],
						data_overall[7] - data_overall[6] - data_overall[5] - data_overall[4] - data_overall[3] - data_overall[2] - data_overall[1] - data_overall[0]
					],
					backgroundColor: [
						'#71aef2',
						'#8ff243',
						'#ffc100',
						'#6B5B95',
						'#ea5645'
					],
					hoverBackgroundColor: [
						'#4d8ace',
						'#6bce1f',
						'#db9d00',
						'#473771',
						'#c63221'
					]
				}]
			};

			let chartOptions = {
				maintainAspectRatio: false,
				legend: {
					position: 'bottom'
				},
				title: {
					display: true,
					text: "Placement History"
				}
			}
			return(
				<div className="total-lifetime-stats category">
					<Doughnut
						ref='chart'
						data={chart_data} 
						options={chartOptions}
						width={300}
						height={300}
						redraw={this.props.shouldRedraw}
					/>
				</div>
			);
		}



		return(
			<div className="total-lifetime-stats category">
			</div>
		);
	}
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
				<div key={index} className="individual-stat">
					{curr[1]}
				</div>
			);
	
		});

		return(
			<div key={mode_specific} className={"mode-stats " + mode_specific}>
				{stat_numbers}
			</div>
		);
	});

	const stat_titles = stats[0].map((curr, index) => {
		return(
			<div key={curr[0]} className="stat-title">
				{curr[0]}
			</div>
		);
	});

	return(
		<div className={mode_category}>
			<div className="title">{mode_category}</div>
			<div className="all-mode-data">
				<div className="modes">
					<div className="mode">Mode</div>
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
				stats_overall[0] = temp;
				break;
			case "Overall-Duo":
				stats_overall[1] = temp;
				break;
			case "Overall-Squad":
				stats_overall[2] = temp;
				break;
			case "Season-Solo":
				stats_season[0] = temp;
				break;
			case "Season-Duo":
				stats_season[1] = temp;
				break;
			case "Season-Squad":
				stats_season[2] = temp;
				break;
			default: break;
		}
	});

	//console.log(stats_season);
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
		let relevant_data = [];
		for(let i = 0; i < modeData.length; ++i){
			if(modeData[i].User === curr.User){
				relevant_data.push(modeData[i]);
			}
		}

		return(
			<div key={user} className="userInfo" id={user + "-info"}>
				<OverallStats data={curr} shouldRedraw={props.shouldRedraw}/>
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
			modeData: [],
			shouldRedraw: false
		}

		this.handleChange = this.handleChange.bind(this);
	}

	//completely rewrite data with the new set of data
	handleNewInfo(newData){
		this.setState({
			data: newData
		});
	}

	//displays the respective user's info
	handleChange(event){

		highlightUserButton(event);
		displayUserInfo(event);

		//used so that the chart animations are done again when the info is displayed
		this.setState({
			shouldRedraw: true
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

		let data = this.state.data;
		const name_platform = data.map((curr, index) => {
			const user = curr.User;
			const platform = curr.Platform;

			return(
				<UserID 
					user={user} 
					platform={platform} 
					handleChange={this.handleChange}
				/>
			);
		});

		return(
			<div id="content">
				<nav className="navbar sticky-top">
					<img id="logo" alt="fortnite logo" src={logo} />
					<Form  
						handleNewInfo={(newData) => this.handleNewInfo(newData)}
					/>
					<Checkboxes 
						data={this.state.data}
					/>
				</nav>
				<div className="userID">
					{name_platform}
				</div>
				<UserInfo 
					data={this.state.data} 
					modeData={this.state.modeData}
					shouldRedraw={this.state.shouldRedraw}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Site />, document.getElementById('root'));



//highlights the user button that was clicked
function highlightUserButton(event){
	const userButton = document.getElementsByClassName("user");

	for(let i = 0; i < userButton.length; ++i){
		userButton[i].style.backgroundColor = "#1d1e21";
		userButton[i].style.color = "#f9f9f9";
	}

	const button = (event.target.id) ? 
		document.getElementById(event.target.id) :
		document.getElementById(event.target.parentElement.id);

	button.style.backgroundColor = "#f9f9f9";
	button.style.color = "#1d1e21";
}


//displays corresponding user's info
function displayUserInfo(event){
	const users = document.getElementsByClassName("userInfo");

	for(let i = 0; i < users.length; ++i){
		users[i].style.display = "none";
	}

	//funky button reaction on click where it sometimes targets inner divs vs. wrapper
	const user = (event.target.id) ? 
		document.getElementById(event.target.id + "-info") :
		document.getElementById(event.target.parentElement.id + "-info");
	
	if(user.style.display === 'grid'){
		user.style.display = 'none';
	}
	else{
		user.style.display = 'grid';
	}
}

