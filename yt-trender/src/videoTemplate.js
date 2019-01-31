export default function videoTemplate(video, i) {
	return `
    <div class="card col-lg-3 col-md-4 col-sm-6">
        <img style="cursor:pointer" class="card-img-top watch" data-url="https://youtube.com/embed/${
			video.id
		}" data-toggle="modal" data-target="#videoModal" src="${
		video.snippet.thumbnails.high.url
	}" alt="Thumbnail">
        <div class="card-body">
        <span class="badge badge-secondary">${
			video.kind.split('#')[0]
		}</span></h1> 
        <h5 class="card-title" title="${video.snippet.title}">${
		video.snippet.title
	}</h5>
        <div class="accordion mb-2 border-bottom border-dark" id="accordion${i}">
        <div class="card border-0">
            <div style="cursor:pointer" class="btn btn-group-vertical p-2 border-0" id="heading${i}" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                More
            </div>
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordion${i}">
            <div class="card-body">
                ${video.snippet.description}
            </div>
            </div>
        </div>
        </div>    
        <button type="button" class="btn btn-secondary watch" data-url="https://youtube.com/embed/${
			video.id
		}" data-toggle="modal" data-target="#videoModal" class="btn btn-outline-dark">Watch Now</button>
        </div>
    </div>
    `;
}
