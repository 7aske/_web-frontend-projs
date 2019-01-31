function containerDimensions() {}
function getStream() {
	var streams = [
		'imaqtpie',
		'ESL_SC2',
		'OgamingSC2',
		'cretetion',
		'freecodecamp',
		'storbeck',
		'RobotCaleb',
		'noobs2ninjas',
		'nightblue3',
		'froggen',
		'starladder_cs_en',
		'mithjinny',
		'dakotaz',
		'drlupo'
	];
	var name = '';
	var status = '';
	var url = '';
	var logo = '';
	var streamContainer = '';
	var statusString = '';
	var views = 0;
	var online = '';
	for (let i = 0; i < streams.length; i++)
		$.ajax({
			url:
				'https://wind-bow.gomix.me/twitch-api/streams/' +
				streams[i] +
				'?callback=?',
			type: 'GET',
			dataType: 'jsonp',
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
			.done(function(data) {
				console.log(data);
				if (data.stream !== null) {
					if (data.stream.channel.status == null) {
						statusString = '';
					} else if (data.stream.channel.status.length >= 60) {
						status = data.stream.channel.status;
						statusString = status.substring(0, 60) + '...';
					} else {
						statusString = data.stream.channel.status;
					}
					name = data.stream.channel.name;
					url = data.stream.channel.url;
					logo = data.stream.channel.logo;
					views = data.stream.viewers;
					online = 'Online';
					streamContainer =
						streamContainer +
						'<div class="row stream-container">\
					<div class="col-3">\
						<a href="' +
						url +
						'" target="_blank"><img src="' +
						logo +
						'" class="stream-image"></a>\
					</div>\
					<div class="col-6">\
						<a href="' +
						url +
						'" target="_blank"><h2 class="stream-name">\
						' +
						name +
						'</h2></a>\
						<a href="' +
						url +
						'" target="_blank"><h4 class="stream-status">\
						' +
						statusString +
						'</h4></a>\
					</div>\
					<div class="col-3">\
						<div>\
							<h5 class="viewer-count">Viwers: ' +
						views +
						'</h5>\
							<h5 class="online-status"><i class="fa fa-user-circle"></i>' +
						online +
						'</h5>\
						</div>\
					</div>\
				</div>';
					$('.container').html(streamContainer);
					console.log('success');
				}
			})
			.fail(function() {
				alert('No such stream');
			})
			.always(function() {});
}

$(document).ready(getStream);
