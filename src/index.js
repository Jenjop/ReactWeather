import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



//Cloudy
// https://ssl.gstatic.com/onebox/weather/64/cloudy.png
//Rain
//https://ssl.gstatic.com/onebox/weather/48/rain.png
//Light Rain
//https://ssl.gstatic.com/onebox/weather/48/rain_light.png
//Partly Cloudy
//https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png
//Sunny
//https://ssl.gstatic.com/onebox/weather/48/sunny.png

const icons = {
	Sunny : "https://ssl.gstatic.com/onebox/weather/48/sunny.png",
	Cloudy: "https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
}

class Date extends React.Component{
	render(){
		return(
			<button className='datePanel'>
				<div className='day'>
					{this.props.day}
				</div>
				<div className='icon'>
					<img src={icons[this.props.icon]} alt={this.props.icon}/>
				</div>
				<div className='temp'>
					{this.props.high}
					{"° "}
					{this.props.low}
					{"°"}
				</div>
			</button>
		);
	}
}
class Panels extends React.Component {

	// componentDidMount(){
	// 	fetch("https://api.weather.gov/gridpoints/SGX/55,23/forecast")
	// 		.then(res => res.json())
	// 		.then(
	// 			(results) => {
	// 				this.setState({
	// 					isLoaded: true,
	// 					items: results.items
	// 				});
	// 			},
	// 			(error) => {
	// 				this.setState({
	// 					isLoaded: true,
	// 					error
	// 			});
	// 		}
	// 	)
	// }

	render(){
		return(
			<div className='mainPanel'>
				<Date day="Sun" icon = "Sunny" high="80" low="70"/>
				<Date day="Mon" icon = "Cloudy" high="80" low="70"/>
				<Date day="Tue" high="80" low="70"/>
				<Date day="Wed" high="80" low="70"/>
				<Date day="Thu" high="80" low="70"/>
				<Date day="Fri" high="80" low="70"/>
				<Date day="Sat" high="80" low="70"/>
			</div>
		);
	}
}

class Weather extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		return(
			<Panels />
		);
	}
}
ReactDOM.render(
	<Weather />,
	document.getElementById('root')
);