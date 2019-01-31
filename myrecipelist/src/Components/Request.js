class Request {
	constructor(method, url, json, header) {
		this.method = method;
		this.url = url;
		this.json = json;
		this.header = header;
	}
	send() {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open(this.method, this.url, true);
			if (this.header)
				xhr.setRequestHeader(this.header.title, this.header.content);
			xhr.send(this.json);
			xhr.onerror = function() {
				reject({
					status: xhr.status,
					response: xhr.responseText
				});
			};
			xhr.onload = function() {
				resolve({
					status: xhr.status,
					response: xhr.responseText
				});
			};
		});
	}
}

export default Request;
