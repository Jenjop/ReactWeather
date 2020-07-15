import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// var zip = '92130'
//Test API Key
var api_key = '40b84f4171d173d01d8b03a7f4c83159'

var lat = '32.94702'
var lon = '-118.20220'
var units = 'imperial' //'metric', 'imperial'
var day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]


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

// const icons = {
// 	Sunny : "https://ssl.gstatic.com/onebox/weather/48/sunny.png",
// 	Cloudy: "https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
// }

// 'http://openweathermap.org/img/wn/' + icon + '@2x.png'

class DateSquare extends React.Component{
	constructor(props){
		super(props)
		this.state={
			details: this.props.desc
		}
	}
	render(){
		return(
			<button className='datePanel' 
				onFocus={() => this.setState({details: this.props.specs})}
				onBlur={() => this.setState({details: this.props.desc})}
			>
				<div className='day'>
					{this.props.day}
				</div>
				<div className='icon'>
					{/*<img src={icons[this.props.icon]} alt={this.props.icon}/>*/}
					<img src={'http://openweathermap.org/img/wn/' + this.props.icon + '@2x.png'}/>
				</div>
				<div className='desc'>
					{this.state.details}
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
	constructor(props){
		super(props);
		this.state = {}
	}

	// createDate(daily_item){
	// 	// var day_name = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	// 	let temp = new Date(daily_item[0]*1000)
	// 	console.log(temp)
	// 	// let temp2 = temp.getDay()
	// 	let day = day_name[temp]
	// 	return(
	// 		<Date
	// 			day={"Mon"}
	// 			d={temp}
	// 			high={daily_item[2]}
	// 			low={daily_item[1]}
	// 		/>
	// 	)
	// }

	render(){
		return(
			<div className='mainPanel'>
				{this.props.daily.map(
					item => {console.log(item[3][0]['id']); return <DateSquare
							day={day_name[new Date(item[0] * 1000).getDay()]}
							desc={item[3][0]['main']}
							specs={item[3][0]['description']}
							high={item[2]}
							low={item[1]}
							icon={item[3][0]['icon']}
							/>}
				)
				}
				{/*<Date day="Sun" icon = "Sunny" high="80" low="70"/>
				<Date day="Mon" icon = "Cloudy" high="80" low="70"/>
				<Date day="Tue" high="80" low="70"/>
				<Date day="Wed" high="80" low="70"/>
				<Date day="Thu" high="80" low="70"/>
				<Date day="Fri" high="80" low="70"/>
				<Date day="Sat" high="80" low="70"/>
				<Date day="Sat" high="80" low="70"/>*/}
			</div>
		);
	}
}

/*

this.items = this.apps.map((item) => 
			<AppBox
				name={item.name}
				img={item.img}
				onClick={() => this.props.onClick(item)}
			/>
		)

*/

class Weather extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			result: []
		};
	}

// Backup: "https://api.weather.gov/gridpoints/SGX/55,23/forecast"

// 5day/3hr
// Sample: 'https://samples.openweathermap.org/data/2.5/forecast?zip=94040&appid=439d4b804bc8187953eb36d2a8c26a02'
// 'https://api.openweathermap.org/data/2.5/forecast?zip=92130&appid=40b84f4171d173d01d8b03a7f4c83159'
// 'https://api.openweathermap.org/data/2.5/forecast?zip=' + zip + '&appid=' + api_key

// 16day
// Sample: 'https://samples.openweathermap.org/data/2.5/forecast/daily?zip=94040&appid=439d4b804bc8187953eb36d2a8c26a02'
// 'https://api.openweathermap.org/data/2.5/forecast/daily?zip=92130&appid=40b84f4171d173d01d8b03a7f4c83159'
// 'https://api.openweathermap.org/data/2.5/onecall?lat=32.94702&lon=-117.20220&exclude=current,hourly,minutely&appid=40b84f4171d173d01d8b03a7f4c83159'
// 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=current,hourly,minutely&appid=' + api_key
	componentDidMount() {
		this.getWeather();
	}

	getWeather(){
		fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=' + units + '&exclude=current,hourly,minutely&appid=' + api_key)
		.then(res => res.json())
		.then(
			(result) => {
				let daily = Object.keys(result.daily).map(
					key => {
						let entry = result.daily[key];
						return [entry.dt, entry.temp.min, entry.temp.max, entry.weather]
					}
				)
				this.setState({
					isLoaded: true,
					result: daily
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			}
		)

	}

	render(){
		return(
			<Panels daily={this.state.result}/>
		);
	}
}
ReactDOM.render(
	<Weather />,
	document.getElementById('root')
);