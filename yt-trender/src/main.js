import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { Observable } from 'rxjs';
import modalTemplate from './modalTemplate';
import videoTemplate from './videoTemplate';
let app = null;
window.onload = () => {
	app = new App(12);
};

const videoContainer = document.querySelector('#videoContainer');
const videoModalContainer = document.querySelector(
	'#videoModal .modal-content'
);
const fade = document.querySelector('.fade');
Observable.fromEvent(fade, 'click').subscribe(event => {
	videoModalContainer.firstElementChild.remove();
});
const loadFade = document.querySelector('#loadFade');
const search = document.querySelector('#search');
Observable.fromEvent(search, 'input').subscribe(event => {
	loadFade.classList.add('show');
	loadFade.classList.remove('hide');
	setTimeout(() => {
		app.initSearch(event.srcElement.value);
	}, 100);
});

class App {
	constructor(maxResults) {
		this.maxResults = maxResults;
		this.youtubeAPIkey = 'AIzaSyBPRqm0-mx7aqOt9qTl8shsTPS_TuMVhXg';
		this.__init__();
	}
	__init__() {
		this.initTrending();
	}
	renderVideos(videos) {
		videoContainer.innerHTML = videos;
		const watch = document.querySelectorAll('.watch');
		Observable.fromEvent(watch, 'click').subscribe(event => {
			this.openModal(event.srcElement.attributes['data-url'].value);
		});
		setTimeout(() => {
			loadFade.classList.remove('show');
			loadFade.classList.add('hide');
		}, 100);
	}
	openModal(url) {
		const video = {
			url: url
		};
		console.log(video);

		videoModalContainer.innerHTML = modalTemplate(video);
	}
	initTrending() {
		const youtubeURL = `https://www.googleapis.com/youtube/v3/videos?part=id,snippet&chart=mostPopular&maxResults=${
			this.maxResults
		}&key=${this.youtubeAPIkey}`;
		this.fetchVideos(youtubeURL, {}, YTData => {
			console.log(YTData);
			const videos = this.parseYoutubeData(YTData.items);
			this.renderVideos(videos);
		});
	}
	initSearch(query) {
		const youtubeURL = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${query}&type=video&maxResults=${
			this.maxResults
		}&key=${this.youtubeAPIkey}`;
		this.fetchVideos(youtubeURL, {}, YTData => {
			console.log(YTData);
			const videos = this.parseYoutubeData(YTData.items);
			this.renderVideos(videos);
		});
	}
	parseYoutubeData(YTData) {
		let result = '';
		YTData.forEach((video, i) => {
			result += videoTemplate(video, i);
		});
		return result;
	}
	fetchVideos(url, opt, callback) {
		const options = opt || {};
		fetch(url, options)
			.then(res => res.json())
			.then(callback)
			.catch(err => console.log(err));
	}
}
