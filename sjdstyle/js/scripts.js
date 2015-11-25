$(document).ready(function() {

	// OFFSET FIXED MENU
	$('body').css('padding-top', function() {
    return $('#navbar-sjd').innerHeight();
  });

	// SET SCREEN HEIGHT TO HERO IMAGE
	$('#hero').css('height', function() {
    var screenHeight = $(window).height() - $('#navbar-sjd').innerHeight();
    return screenHeight;
  });

	// PARALLAX
	$(window).scroll(function () {
	    $("#hero").css("background-position","0% " + ($(this).scrollTop() / 2) + "px");
	});

	// SMOOTH SCROLLING
	$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 850, 'swing');
        return false;
      }
    }
  });

}); // END .ready()