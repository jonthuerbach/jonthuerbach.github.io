$( document ).ready(function() {
	// parallax
	$(window).scroll(function () {
	    $(".hero-block").css("background-position","0% " + ($(this).scrollTop() / 2) + "px");
	});
});