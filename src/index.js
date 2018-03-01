import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import $ from "jquery";
class Site extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data: []
		}
	}

	requestData(){

		//proxyurl needed to bypass cors
		const proxyurl = "https://cors-anywhere.herokuapp.com/";
		const url = 'https://api.fortnitetracker.com/v1/profile/psn/davesteezy422';
		let req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			let data = this.state.data;
			let newData;
			if(req.readyState === XMLHttpRequest.DONE){
				//console.log(req.responseText);
				newData = JSON.parse(req.responseText);
				this.setState({
					data: data.concat(newData)
				});
				console.log(this.state.data);
				return data;
			}
		}.bind(this);

		req.open('GET', proxyurl + url, true);

		//api key send with request through header
		req.setRequestHeader('TRN-api-key', '40e833dc-c903-4409-a3c0-d3f6d4cc0fa7');

		req.send();
	}

	render(){
		const check = this.state.data;
		let list = [];
		for(let i = 0; i < check.length; ++i){
			list.push(check[i].accountId);
		}
		
		return(
			<div>
				<button onClick={() => this.requestData()}>Yes</button>
				{list}
			</div>
		);
	}
}

ReactDOM.render(<Site />, document.getElementById('root'));


