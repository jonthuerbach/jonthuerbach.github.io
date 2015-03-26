$(document).ready(function(){
	
	// SIMPLE PARALLAX CODE
	$(window).scroll(function(e){
	  parallax();
	});
	function parallax(){
	  var scrolled = $( window ).scrollTop();
	  $('.main-bg').css('top',-(scrolled*0.2)+'px');
	}
	
	// VERTICAL RESIZING FOR HERO AREA
	resizeCenter();	

	$(window).load(function(){
	  resizeCenter();
	});

	$(window).resize(function(){
	  resizeCenter();
	});
	
	function resizeCenter() {
    $('.hero-text').css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : -$('.hero-text').outerWidth()/2,
        'margin-top' : -$('.hero-text').outerHeight()/2
    });
    
    $('.hero-container').css({
        'width' : $( window ).outerWidth()
    });
	}

	// BOOTSTRAP AFFIX
	$('#main-nav').affix({
	  offset: {
	    top: function () {
	      return (this.top = $('.hero-zone').outerHeight(true)-$('.navbar').outerHeight(true))
	    }
	  }
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

  // BOOTSTRAP SCROLLSPY
  $('body').scrollspy({ target: '#main-nav' })

})