$(document).ready(function(){
	$(window).scroll(function(e){
	  parallax();
	});
	function parallax(){
	  var scrolled = $( window ).scrollTop();
	  $('.main-bg').css('top',-(scrolled*0.2)+'px');
	}
	
	$(window).resize(function(e){
	  resizeCenter();
	});
		$(function resizeCenter() {
	    $('.hero-text').css({
	        'position' : 'absolute',
	        'left' : '50%',
	        'top' : '50%',
	        'margin-left' : -$('.hero-text').outerWidth()/2,
	        'margin-top' : -$('.hero-text').outerHeight()/2
	    });
	    $('.hero-container').css({
	        'width' : $( window ).width()
	    });
		});

})