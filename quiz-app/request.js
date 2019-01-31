class Request {
    constructor(url, method = 'get', json, headers) {
        this.method = method;
        this.url = url;
        this.json = json || null;
        this.headers = headers || null;
    }
    send() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(this.method, this.url, true);
            if (this.headers != null) {
                xhr.setRequestHeader('Content-type', 'application/json');
            }
            xhr.send(this.json);
            xhr.onerror = function() {
                reject(xhr.responseText);
            };
            xhr.onload = function() {
                resolve(xhr.responseText);
            };
        });
    }
}
