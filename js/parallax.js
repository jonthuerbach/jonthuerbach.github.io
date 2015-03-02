$(document).ready(function(){
	$(window).scroll(function(e){
	  parallax();
	});
	function parallax(){
	  var scrolled = $(window).scrollTop();
	  $('.main-bg').css('top',-(scrolled*0.2)+'px');
	}
})