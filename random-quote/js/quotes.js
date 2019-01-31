var quotes = [
	{
		'picture': 'http://sydneydemocracynetwork.org/wp-content/uploads/2014/08/Nietzsche-wikipedia.jpg',
		'author': 'Friedrich Nietzsche (1844-1900)',
		'quote': 'That which does not kill us makes us stronger.',
	},
	{
		'picture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Winston_Churchill_As_Prime_Minister_1940-1945_MH26392.jpg/1200px-Winston_Churchill_As_Prime_Minister_1940-1945_MH26392.jpg',
		'author': 'Sir Winston Churchill (1874-1965)',
		'quote': 'A lie gets halfway around the world before the truth has a chance to get its pants on.',
	},
	{
		'picture': 'http://irishpost.co.uk/wp-content/uploads/2017/02/Wilde_F.jpg',
		'author': 'Oscar Wilde (1854-1900)',
		'quote': 'Some cause happiness wherever they go; others, whenever they go.',
	},
	{
		'picture': 'http://d279m997dpfwgl.cloudfront.net/wp/2014/02/0218_mark-twain.jpg',
		'author': 'Mark Twain (1835-1910)',
		'quote': 'I have never let my schooling interfere with my education.',
	},
	{
		'picture': 'https://imagejournal.org/wp-content/uploads/2017/05/Robert_Oppenheimer_1946-via-wikimedia-commons-thumbnail.jpg',
		'author': 'Robert J. Oppenheimer (1904-1967)',
		'quote': 'Now I am become death, the destroyer of worlds.',
	},
	{
		'picture': 'http://www.twincities.com/wp-content/uploads/2016/05/30-ianfleming.jpg',
		'author': 'Ian L. Fleming (1908-1964)',
		'quote': 'I shall not waste my days in trying to prolong them.',
	},
	{
		'picture': 'https://media.wired.com/photos/5a04a6d02a76145d1c96ebcf/master/w_2400,c_limit/carlsagan-TA.jpg',
		'author': 'Carl Sagan (1934-1996)',
		'quote': 'If you want to make an apple pie from scratch, you must first create the universe.',
	},
	{
		'picture': 'https://www.maa.org/sites/default/files/images/upload_library/46/0_Halmos_Photos/lot_0079/e_ph_0079_01.jpg',
		'author': 'Paul Erdos (1913-1996)',
		'quote': 'A mathematician is a device for turning coffee into theorems.',
	},
	{
		'picture': 'http://www.viralnovelty.net/wp-content/uploads/2014/11/121.jpg',
		'author': 'Mahatma Gandhi (1869-1948)',
		'quote': 'First they ignore you, then they laugh at you, then they fight you, then you win.',
	},
	{
		'picture': 'https://timedotcom.files.wordpress.com/2017/05/jfk1.jpeg',
		'author': 'John F. Kennedy (1917-1963)',
		'quote': 'Forgive your enemies, but never forget their names.',
	},
	{
		'picture': 'http://www.theimaginativeconservative.org/wp-content/uploads/2016/06/Chaplin.jpg',
		'author': 'Charlie Chaplin (1889-1977)',
		'quote': 'In the end, everything is a gag.',
	}
];
var windowWidth =  $(window).width();
var windowHeight =  $(window).height();
var changeTest = -1;
var scrollTest = true;


// $(document).ready(changeQuote);

$('.clickable').click(addAnimation);

$('.clickable').click(changeBg);

$('.clickable').click(changeQuote);

function addAnimation() {
	$('#container').addClass('animate').removeClass('clickable');
	
	setTimeout(function(){
		$('#container').removeClass('animate').addClass('clickable');
	}, 1550);
};

function changeBg() {
	if (scrollTest) {
		setTimeout(function(){
			$('.bg').css({'transform': 'translateY(' + -Math.abs(windowHeight) + 'px)'},);
			scrollTest = false;		
		}, 300)

	} else {
		setTimeout(function(){
			$('.bg').css({'transform': 'translateY(' + 0 + 'px)'},);
			scrollTest = true;			
		}, 300)

	}
	
};

function changeQuote(){
	var x = Math.floor(Math.random() * 11);
	if (x == changeTest) {
		console.log(changeTest);
	} else {
		if (scrollTest) {
			$('#bg1').css('background', 'url(' + quotes[x]['picture'] + ')');
			$('#bg1').css({
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			});
		} else {
			$('#bg0').css('background', 'url(' + quotes[x]['picture'] + ')');
			$('#bg0').css({
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			});
		}

		setTimeout(function(){
			changeTest = x;
			$('#quoteBox').html('<p>' + quotes[x]['quote'] + '</p>');
			$('#authorBox').html('<p>' + '-' + quotes[x]['author'] + '</p>');
			}, 700);

		}
	}

