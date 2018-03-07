import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import $ from "jquery";
//https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0
let initialData;
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
				<input type='submit' value='Update' />
				<button onClick={this.addForm}>Add Player</button>
				{remove_button}
			</form>
		);
	}

}

function CheckBoxStack(props){
	return(
		<div className="individual-check">
			<div className="text">{props.text}</div>
			<div className="inputs">
				<input className="lifetime-solo" value={props.value} type='checkbox'/>
				<input className="lifetime-duo" value={props.value}type='checkbox'/>
				<input className="lifetime-squad" value={props.value} type='checkbox'/>
				<input className="season-solo" value={props.value} type='checkbox'/>
				<input className="season-duo" value={props.value} type='checkbox'/>
				<input className="season-squad" value={props.value} type='checkbox'/>
			</div>
		</div>
	);
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

function OverallChecks(props){
	return(
		<div className="individual-check">
			<div className="text">{props.text}</div>
			<input className="lifetime" value={props.value} type='checkbox'/>
		</div>
	);
}
class Checkboxes extends React.Component{
	render(){
		let data = this.props.data;
		return(
			<div id="stat-checkbox">
				<div id="users">
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
	delete data.User;
	delete data.Platform;
	//get the title for subcategories of each mode and lifetime stats
	if(data){
		data_overall = Object.entries(data).map((curr,index) =>{
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

function UserInfo(props){
	const data = props.data;

	//parses the data to get necessary info
	const parseUserData = data.map((curr, index) => {
		if(curr.error){
			return(
				<div key={curr.error} className="userID" id={curr.error}>{"Player named " + curr.error + " not found. Please Try Again."}</div>
			);
		}

		const user = curr.User;
		const platform = curr.Platform;

		return(
			<div key={user} className="userInfo" id={user}>
				<UserID 
					user={user} 
					platform={platform} 
					handleCheck={props.handleCheck}
				/>
				<div className="lifetime-title">Overall Statistics</div>
				<OverallStats data={curr} />
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
			initialData: []
		}
	}
	
	//completely rewrite data with the new set of data
	handleNewInfo(newData){
		this.setState({
			data: newData
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
				/>
			</div>
		);
	}
}

ReactDOM.render(<Site />, document.getElementById('root'));