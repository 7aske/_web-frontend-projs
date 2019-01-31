export default function modalTemplate(video) {
	return `
    <iframe src="${
		video.url
	}" style="height:50vh" frameborder="0" scrolling="no"></iframe>
    `;
}
