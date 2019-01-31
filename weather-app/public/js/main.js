(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(location => {
			const lon = location.coords.longitude;
			const lat = location.coords.latitude;
			const app = new WeatherApp(lon, lat);
			app.getWeather();
		});
	} else {
		alert('Geolocation is not supported by this browser.');
	}
})();
class WeatherApp {
	constructor(lon, lat, lang) {
		this.secret = 'c077c1f899cdfe7cb98f9e2012273431';
		this.lon = lon;
		this.lat = lat;
		this.lang = lang ? lang : 'en';
		this.query = `?exclude=minutely&units=si&lang=sr`;
		this.url = `https://api.darksky.net/forecast/${this.secret}/${
			this.lat
		},${this.lon}${this.query}`;
		console.log(this.url);
	}
	getWeather() {
		$.ajax({
			method: 'get',
			url: this.url,
			dataType: 'jsonp'
		})
			.done(data => {
				console.log(data);
				this.renderData(data);
			})
			.fail(err => {
				console.log(err);
			});
	}
	renderData(data) {
		const units = data.flags.units;
		const hoursContainer = document.querySelector('.container-hours');
		const daysContainer = document.querySelector('.weather-daily');
		const current = document.querySelector('.current strong');
		const summary = document.querySelector('.current small');
		const currentIcon = document.querySelector('.current div');
		const day = document.querySelector('.day');
		day.innerHTML = new Date(data.currently.time * 1000).toLocaleString(
			window.navigator.language,
			{ weekday: 'long' }
		);
		currentIcon.innerHTML = icons[data.currently.icon];
		current.innerHTML = `${Math.round(data.currently.temperature)}${
			units == 'si' ? '&#8451;' : '&#8457;'
		}`;
		summary.innerHTML = data.currently.summary;
		let hourlyData = '';
		//hourly
		for (let i = 1; i < 7; i++) {
			hourlyData += `<div class="text-center hour animated slideInDown">
			<div class="text-center hour-header">
				${this.addZero(new Date(data.hourly.data[i].time * 1000).getHours())}:00
			</div>
			<div class="text-center hour-icon">
				${icons[data.hourly.data[i].icon]}
			</div>
			<div class="text-center hour-temperature">
				<small>${data.hourly.data[i].summary}</small><br>
				<div>${Math.round(data.hourly.data[i].temperature)}${
				units == 'si' ? '&#8451;' : '&#8457;'
			}</div>
			</div>
			</div>`;
		}
		hoursContainer.innerHTML = hourlyData;
		//daily
		let dailyData = '';
		data.daily.data.forEach((day, i) => {
			if (i != 0) {
				dailyData += `<div class="row weather-day animated slideInRight">
							<div class="col-3 text-left">
								${new Date(day.time * 1000).toLocaleString(window.navigator.language, {
									weekday: 'long'
								})}
							</div>
							<div class="day-icon col-6 text-center">
								${day.summary}
							</div>
							<div class="col-3 text-right">
								${Math.round(day.temperatureHigh)}${units == 'si' ? '&#8451;' : '&#8457;'}
							</div>
						</div>`;
			}
		});
		daysContainer.innerHTML = dailyData;
		this.resizeSvgs();
	}
	resizeSvgs() {
		const svgs = document.querySelectorAll('svg');
		svgs.forEach(svg => {
			svg.style.width = `${svg.parentElement.offsetWidth}px`;
			svg.style.height = `${svg.parentElement.offsetHeight}px`;
			const offset = Math.min(
				svg.parentElement.offsetHeight,
				svg.parentElement.offsetWidth
			);
			console.log(
				offset,
				svg.parentElement.offsetHeight,
				svg.parentElement.offsetWidth
			);
			svg.setAttribute('viewBox', `0 0 ${offset} ${offset}`);
			svg.setAttribute('height', offset);
			svg.setAttribute('width', offset);
		});
	}
	addZero(i) {
		if (i < 10) {
			i = '0' + i;
		}
		return i;
	}
	addDay(i) {
		const days = {
			0: ''
		};
	}
}

/* <div class="text-center hour">
	<div class="hour-header text-center">
		Now
	</div>
	<div class="hour-icon">
		<i class="climacon sun"></i>
	</div>
	<div class="hour-temperature">
		30
	</div>
</div>*/
/*                 <div class="row weather-day">
                    <div class="col-4 text-left">
                        Thursday
                    </div>
                    <div class="hour-icon col-4 text-center">
                        <i class="climacon sun"></i>
                    </div>
                    <div class="col-4 text-right">
                        20
                    </div>
                </div>*/
