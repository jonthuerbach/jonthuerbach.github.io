$(document).ready(function() {
  
  // Define vars
  var clicks = $('#clicks');
  
  var setClicks = function() {
		localStorage.setItem('clicks', clickAmount);
	}
  
  var clickAmount = function() {
  	// stuff
  }

  function updateClicks() {
  	clicks.text(clickAmount);
  	setClicks();
  }

  $('#btn').click(function() {

  	$('#clicks').text(function() {
  		clickAmount++;
  		updateClicks();
  	});

  });


});