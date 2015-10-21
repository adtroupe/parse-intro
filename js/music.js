// Initialize Parse app
Parse.initialize("MYhiVDj7M1i1cWssBwGXhwea21mKpHFWCN4PJ9L6", "uRpgz7CfUUWX2aP95Cvew6hpDBROLQie2c0Ka0w3");

// Create a new sub-class of the Parse.Object, with name "Music"
var Music = Parse.Object.extend('Music');

// Create a new instance of your Music class 
//var musicItem = new Music();
// Set a property 'band' equal to a band name
//musicItem.set('band', 'The Black Keys');
// Set a property 'website' equal to the band's website
//musicItem.set('website', 'blackkeys.whatever');
// Set a property 'song' equal to a song
//musicItem.set('song', 'Little Black Submarines');
// Save your instance of your song -- and go see it on parse.com!
//musicItem.save();

// Click event when form is submitted
$('form').submit(function() {

	// Create a new instance of your Music class 
	var musicItem = new Music();

	// For each input element, set a property of your new instance equal to the input's value
	// musicItem.set({
	// 	band: $('#band').val(),
	// 	website: $('#website').val(),
	// 	song: $('#song').val()
	// });
	// // After setting each property, save your new instance back to your database
	// musicItem.save();

	$(this).find('input').each(function() {
		musicItem.set($(this).attr('id'), $(this).val());
		$(this).val('');
	});
	musicItem.save(null, {
		success: function(){
			getData();
		}
	});


	return false;
});



// Write a function to get data
var getData = function() {
	// Set up a new query for our Music class
	var query = new Parse.Query(Music);

	// Set a parameter for your query -- where the website property isn't missing
	query.exists('website');

	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/
	query.find({
		success: function(result){
			buildList(result);
		}
	});

};

// A function to build your list
var buildList = function(data) {
	// Empty out your unordered list
	$('ol').empty();	
	// Loop through your data, and pass each element to the addItem function
	data.forEach(function(d) {
		addItem(d);
	});

};


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters (website, band, song) from the data item passed to the function
	var b = item.get('band');
	var s = item.get('song');
	var w = item.get('website');
	var li = $('<li>'+b+' -- '+s+' -- '+w+' </li>  ');
	var button = $('<button class="btm btm-danger"><span class="glyphicon glyphicon-remove"></span></button>');
	li.append(button);
	button.on('click', function() {
		item.destroy({
			success: function() {
				getData();
			}
		});
	});

	// Append li that includes text from the data item
	$('ol').append(li);

	
	// Time pending, create a button that removes the data item on click
	$('.delete').on('click', function() {
		success: item.delete();
	});
	
};

// Call your getData function when the page loads
getData();
