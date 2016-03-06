var Carousel = function(options){

	this.$ = {};

	// OUR DOM ELEMENTS
	this.$.container        = options.elt;
	this.$.pages            = this.$.container.find('.neighbor');
	this.$.slides_container = this.$.container.find('.items');
	this.$.slides           = this.$.slides_container.find('.item');
	
	// OPTIONS 
	this.max_width 			= this.$.container.css('width');
	this.pagination 		= options.pagination;
	this.speed 				= options.speed;
	this.timing				= options.transition_timing;
	this.ease 				= options.timing_function[0] == '.' ? 'cubic-bezier('+options.timing_function+')' : options.timing_function ;
	this.arrows 			= options.arrows;	
	this.ratio 				= options.ratio !== 0 ? options.ratio : this.$.container.css('height') / this.$.container.css('width') ;
	console.log(this.$.container);
	this.count              = this.$.slides.length;

	this.pos_top 			= $(this.$.slides_container).offset().top;
	this.height 			=  $(this.$.slides_container).height();

	this.interval 			= false;
	this.focus 				= false;


	// INITIALIZES RESPONSIVE RESIZING
	this.sizing();

	// INITIALIZES SLIDING
	if(this.speed !== 0 && focus === true){
		this.sliding();
	}

	// INITIALIZES ARROW NAVIGATION
	if(this.arrows === true){
		this.$.container.find('.neighbors').append('<div class="neighbor prev fa fa-long-arrow-left fa-2x"></div> <div class="neighbor next fa fa-long-arrow-right fa-2x"></div>');
		this.$.next = this.$.container.find('.next');
		this.$.prev = this.$.container.find('.prev');
		this.init_arrows();

	}

	// INITIALIZES EVENT LISTENERS
	this.init_events();

	// INITIALIZES PAGINATION
	this.init_pagination();

	// SETS THE ANIMATION DURATION AND TIMING FUNCTION OF A CAROUSEL
	this.$.slides_container.css({ transition: this.timing + 's transform ' + this.ease});

	carousels.push(this);
	
};

// RESPONSIVENESS OF THE CAROUSELS
Carousel.prototype.sizing = function() {
	var that = this;
	this.$.container.css({width : this.width().width,
						  marginLeft: this.width().margin_left,
						  height: this.width().height
						});

	this.$.slides.each(function(index){
		$(that.$.slides[index]).css('width', that.width().width);
		$(that.$.slides[index]).find('.infos').css('width', that.width().width);
	});
};

// CALLED WHEN sizing() IS TRIGGERED
Carousel.prototype.width = function() {
	var carousel_width = parseFloat($(this.$.container).css('width'));
	if( carousel_width > $(window).width() || carousel_width < ($(window).width() / 4)){
		var new_width = $(window).width() * 0.8 < parseFloat(this.max_width) ? $(window).width() * 0.8 : parseFloat(this.max_width);
		return {width: new_width, margin_left: $(window).width() / 2 - $(window).width() * 0.8 / 2, height: $(window).width() * (0.8 * this.ratio)} ;
	} else {
		return {width: carousel_width, margin_left: $(window).width() / 2 - carousel_width / 2, height: carousel_width * this.ratio};
	}
};


Carousel.prototype.index = 0;
Carousel.prototype.count = 0;


// MANAGING THE MOVEMENT OF THE IMAGES
Carousel.prototype.go_to = function(index){
	var that = this;
	if( index < 0){
		index = this.count-1;	
	} else if ( index > this.count - 1){
		index = 0;
	}

	this.$.slides_container.css('transform', 'translateX(' + (- that.width().width * index)+ 'px)');

	this.index = index;
	this.$.container.find('.preview-container').children().removeClass('active');
	this.$.container.find('.preview-container').children().eq(index).addClass('active');
};

Carousel.prototype.next = function(){
 	this.go_to(this.index + 1);
};

Carousel.prototype.prev = function(){
	this.go_to(this.index - 1);
};


// SET THE SLIDING INTERVAL
Carousel.prototype.sliding = function(){
	var that = this;

	this.interval = setInterval(
		function(){
    		return that.next();
	}, 
	that.speed * 1000);
};


// FOR EACH SLIDES IN A CAROUSEL, CREATE A PAGINATION ELEMENT
Carousel.prototype.init_pagination = function(carousel){
	if(this.pagination === true){
		var that = this;

		this.$.slides.each(function(index){
			if(index === 0){
				that.$.container.find('.preview-container').append('<div class="preview active" data-pos="'+index+'"></div>');
			} else {
				that.$.container.find('.preview-container').append('<div class="preview" data-pos="'+index+'"></div>');
			}
		});

		this.$.container.find('.preview').each(function(index){
			var $pagination = $(this);
			var pos = $pagination.attr('data-pos');

			$pagination.on('click', function(pos) {
				that.go_to($(this).attr('data-pos'));
			});
		});
	}
};


// EXITING THE FULL SCREEN AND SETTING THE SCROLL ON
Carousel.prototype.exitFullscreen = function() {
	$('.fullscreen').toggleClass('.active');
	$('.fullscreen').css('transform', 'translateY(-100vh)');
	$('.layer').css('transform', 'translateY(-100vh)');
	$(document).unbind('mousewheel');
};


// INITIALIZES THE EVENTS ON THE NAVIGATION ARROWS
Carousel.prototype.init_arrows = function(){
	var that = this;
	
	this.$.next.on('click', function(){
		that.next();
		return false;
	});

	this.$.prev.on('click', function(){
		
		that.prev();
		return false;
	});

	this.$.container.hover(
		function(){
			that.$.next.css({opacity: 1});
			that.$.prev.css({opacity: 1});
			clearInterval(that.interval);
			that.interval = false;
		}, 
		function(){
			that.$.next.css({opacity: 0});
			that.$.prev.css({opacity: 0});
		}
	);

	this.$.next.hover(
		function(){
			current_slide = -(that.width().width * that.index);
			current_slide -= that.width().width / 10;
			$(that.$.slides_container).css('transform', 'translateX(' + current_slide + 'px)');
		}, 
		function(){
			current_slide = -(that.width().width * that.index);
			$(that.$.slides_container).css('transform', 'translateX(' + current_slide + 'px)');
		}
	);

	this.$.prev.hover(
		function(){
			current_slide = -(that.width().width * that.index);
			current_slide += that.width().width / 10;
			$(that.$.slides_container).css('transform', 'translateX(' + current_slide + 'px)');
		}, 
		function(){
			current_slide = -(that.width().width * that.index);
			$(that.$.slides_container).css('transform', 'translateX(' + current_slide + 'px)');
		}
	);
};

Carousel.prototype.init_events = function() {

	var that = this;
	var current_slide;
	var offset;
	var pos_origin;

	// TRIGGERING OF RESPONSIVE BEHAVIOR
	$(window).on( 'resize',function(){
		that.sizing();
		that.go_to(that.index);
	});

	// SETTING THE AUTOFOCUS ON A CAROUSEL
	$(document).on('scroll', function(e){
		if (that.pos_top > $(window).scrollTop() && that.pos_top + that.height < $(window).scrollTop() + $(window).height()){
			that.focus = true;
		} else {
			that.focus = false;
		}

		if(that.focus === true && that.interval === false && that.speed !== 0) {
			that.sliding();
		} else if( that.focus === false && that.speed !== 0) {
			clearInterval(that.interval);
			that.interval = false;
		}
	});

	// KEYBOARD NAVIGATION
	$(document).on('keyup', function(e){
		if(e.keyCode == '39' && that.focus === true){
			that.next();
		} else if (e.keyCode == '37' && that.focus === true){
			that.prev();
		} 
		if (e.keyCode == '27' && $('.fullscreen').hasClass('active')){
			that.exitFullscreen();
		}
	});

	// STOP SLIDING ON HOVER
	$(this.$.container).hover(function(){
		clearInterval(that.interval);
	}, function(){
		if (that.speed !== 0){
			that.sliding();
		}
	});

	// DRAG AND DROP
	this.$.slides_container.click(
		function(e){
			pos_origin = e.clientX;
			e.preventDefault();
			$(document).on('mousemove', function(e){
				offset = e.clientX - pos_origin;
				that.$.slides_container.css('transform', 'translateX('+ parseFloat(that.$.slides_container.css('left')) + offset +'px)');
				e.preventDefault();
			});
		},function(e){
			if(offset !== 0){
				$(document).off('mousemove');
				if(offset < 0){
					that.next();
				} else if(offset > 0) {
					that.prev();
				}
				offset = 0;
			}
 		}
 	);

	//SWIPE
	this.$.slides_container.swipe( {
		swipe:
		function(event, direction, distance, duration, fingerCount, fingerData) {
  			if(direction == 'left'){
  				that.next();
  			} else if (direction == 'right') {
  				that.prev();
  			}
		}
	});

	// FULL SCREEN VISUALISATION ON AND OFF
	this.$.slides_container.find('.triggerFullscreen').on('click', 
		function(){
			$(document).on('mousewheel', 
				function(e) {
					e.preventDefault();
					e.stopPropagation();
				}
			);
	
			var background = $(this).parents('.item').attr('style');
			background = background.slice(background.indexOf('(')+2, background.length-3);

			$('.fullscreen').addClass('active');
			$('.fullscreen img').attr('src', background);
			$('.layer').css('transform', 'translateY(' + $(window).scrollTop()+'px)');
			$('.fullscreen').css('transform', 'translateY(' + ($(window).scrollTop() + ($(window).height() / 2) - $('.fullscreen').height()/ 2) + 'px)' + ' translateX(' + (($(window).width() / 2)  - $('.fullscreen').width() / 2) + 'px)');
		}
	);

	$('.close').on('click', 
		function(){
			that.exitFullscreen();
		}
	);

	$('.layer').on('click', 
		function(){
			that.exitFullscreen();
		}
	);

	// VOICE NAVIGATION
	if (annyang) {
	  var commands = {
	    'next': function() {
		$.each(carousels, function(index){
   			 if(carousels[index].focus === true) {
   			 	carousels[index].next();
   			 }
		});
	    },
	    'previous': function() {
    		that.prev();
	    }
	  };

	  annyang.addCommands(commands);
	  annyang.start();
	}
};


var carousels = [];
var $carousels = $('.carousel');

var carousel_1 = new Carousel({
	elt: $($('.carousel')[0]), 
	pagination: true, 
	speed: 4.5,
	transition_timing: '0.5' ,
	timing_function: 'ease-in-out', 
	arrows: true,
	ratio: 0.6
});

var carousel_2 = new Carousel({
	elt: $($('.carousel')[1]), 
	pagination: false, 
	speed: 0,
	transition_timing: '0.5' ,
	timing_function: '.3,.31,.72,.87', 
	arrows: true,
	ratio: 0
});

var carousel_3 = new Carousel({
	elt: $($('.carousel')[2]), 
	pagination: true, 
	speed: 2,
	transition_timing: '0.5' ,
	timing_function: '.3,.31,.72,.87', 
	arrows: false,
	ratio: 0
});

// $carousels.each( function(){
// 	var $carousel = $(this);
// 	carousel = new Carousel({
// 		elt: $carousel, 
// 		pagination: true, 
// 		speed: 0,
// 		transition_timing: '0.5' ,
// 		timing_function: '.23,1.43,.84,.38', 
// 		arrows: true,
// 		ratio: 0	});
// });

