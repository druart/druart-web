// back to top buttom show and hidde after scroll to top
var amountScrolled = 480;
var windowsHeight = $(window).height();
$(window).scroll(function() {
    if ($(this).scrollTop() > amountScrolled) {
        $(".back-top-btn").addClass("is-show");
    } else {
        $(".back-top-btn").removeClass("is-show  is-actived");
    }
    console.log(windowsHeight);
});

$(".back-top-btn").on('click',function() {
    $("html, body").animate(
        {
            scrollTop: 0
        },
        600
    );
    return false;
});

//add and remove animation with mouse
$('.back-top-btn').on('mouseleave', function() {
    $(this).removeClass('is-actived');
});
$('.back-top-btn').on('mouseenter', function() {
    $(this).addClass('is-actived');
});/**
 * map interactive
 */
$(document).ready(function() {
    
    /**
    type (string): data-* [e.g. item, area]
    id (string): id of data- area or item to toggle
    show (boolean): true = show info, false = hide info
    **/
    //[1] where this function is used
    function toggleMapInfo(type, id, show) {
        var showClass = 'show-info  active';
        
        // reset all [data-area] elements
        $('[data-area]').removeClass(showClass);
        $('[data-item]').removeClass(showClass);

        // set visibility on selected [data-<type>]
        $('[data-' + type + '="' + id + '"]').addClass(showClass);
    }

    //show button list
    $('.js-show-list').on('click', function() {
        //remove menu bar active clases
        $('.nav-icon').removeClass('is-open');
        $('.menu-bar--slide').removeClass('is-show');

        $(this).closest('.btn').find('.btn--subnav').toggleClass('is-active');
        $(this).closest('.btn').find('.show-more').toggleClass('is-open');
    });

    //highlighting map areas on button click
    $('.js-area').on('click', function() {
        //remove menu bar active clases
        $('.show-more').removeClass('is-open');
        $('.nav-icon').removeClass('is-open');
        $('.menu-bar--slide').removeClass('is-show');
        $('.btn--subnav').removeClass('is-active');

        var area = $(this).attr('data-area-id');
        toggleMapInfo('area', area, true);//[1]
    });

    //highlighting map areas on button hover
    $('.js-item').on('mouseleave', function() {
        $('[data-item]').removeClass('highlight  waves');
        $('.highlight-indicator').removeClass('active');
        var item_id = $(this).attr('data-item-id');
        toggleMapInfo('item', item_id, false);//[1]
    });
    
    //active item-area dinamically when mouse enter
    $('.js-item').on('mouseenter', function() {
        var item_id = $(this).attr('data-item-id');
        //[5] dynamic variable loop to js toggle class = highlight waves, when mouse enter
        var $area = $('[data-item="' + item_id + '"]');
        $area.addClass('highlight  waves');//[5]
        
        //reset class = highlight waves
        $('.map__info').removeClass('highlight  waves');
        
        //hepls to get the correct svg element
        var areaSize = $area.get(0).getBoundingClientRect();//don´t use bbox when element is resizing, it does not work well.

        //create variables to use in [3]
        // width of element
        var elementWidth = areaSize.width;
        // height of element
        var elementHeight = areaSize.height;
        
        toggleMapInfo('item', item_id, true);//[1]
        
        
        //define max-size of the area to display animation
        if(elementWidth < 15 && elementHeight < 15) {
            //create variable for [4]
            var $indicator = $('.highlight-indicator').addClass('active');
            
            //get coordinates "top-left corner" of an element
            var positionX = $area.offset().left; 
            var positionY = $area.offset().top;
            
            //[3] define center position of the element outline
            var centerX = positionX + elementWidth / 2;  
            var centerY = positionY + elementHeight / 2;
            
            //dinamically active the animation on top of the selected element
            $indicator.css('left', centerX).css('top', centerY);//[4]
        
            //debug mode function
            console.log(positionX, positionY);
            console.log(centerX, centerY);
            console.log(elementWidth, elementHeight);
            console.log(typeof positionX);
            console.log($area);
        }
    });
    
    //changing maps
    $('.js-show-map').on('click', function() {
        // hide all maps
        $('[data-map]').removeClass('show');
        
        // show selected map
        var mapID = $(this).attr('data-map-id');
        $('[data-map="' + mapID + '"]').addClass('show');

        if(mapID == "galapagos") {
            $('.map__menu').addClass("is-show");
        } else {
            $('.map__menu').removeClass("is-show");
        }
    });

    //map menu hamburger
    $('.js-toggle').on('click', function(e) {
		e.preventDefault();
        $(this).toggleClass('is-open');
        $('.menu-bar--slide').toggleClass('is-show');
        $('.show-more').removeClass('is-open');
        $('.btn--subnav').removeClass('is-active');
    });
    
    $('.js-show-gmr').on('click', function() {
        $('[data-gmr]').toggleClass('is-show');
        $('.nav-icon').removeClass('is-open');
        $('.menu-bar--slide').removeClass('is-show');

        if($('[data-gmr]').hasClass('is-show')) {
            $(this).text('Hide GMR');
        } else {
            $(this).text('Show GMR');
        }
    });
});// modal
$(document).ready(function() {
    var dataCard = [
        {
            dataTitle: "Illustrations",
            dataContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, consequatur.",
            dataImg: "background-image: url(images/png/marti-pulgas.png)"
        }
    ];

    var dataModal = [
        {
            dataTitle: "Lorem ipsum",
            dataContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aut rem quod unde deserunt id provident asperiores tempore, modi totam, vel placeat tempora dolor voluptatem! Ipsa nemo, modi vero excepturi!",
            dataImg: "background-image: url(images/png/eutrophierung_BUND_2016-01.png);",
            dataThumb: "background-image: url(images/png/eutrophierung_mascots_BUND_2016-02.png);"
        },
        {
            dataTitle: "Lorem ipsum",
            dataContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, consequatur.",
            dataImg: "background-image: url(images/png/unterwasserlaerm_BUND_2020-01.png); background-position: left",
            dataThumb: "background-image: url(images/png/unterwasserlaerm_BUND_2020-02.png);"
        },
    ];

/******
*card
*/
    //loop length
    var dataLength = dataModal.length;

    //Create card structure:
    var cardElements =
        '<div class="card  card--border">' +
            '<div class="card__img" style="' + dataCard[0].dataImg + '"></div>' +
            '<div class="card__content">' +
                '<h3 class="card__title">' + dataCard[0].dataTitle + '</h3>' +
                '<p class="card__description">' + dataCard[0].dataContent + '</p>' +
            '</div>' +
            '<div class="card__footer  card__footer--pop-up">' +
                '<div class="underline__btn  [ js-modal ]" data-obj="' + 0 +'">more about</div>' +
            '</div>' +
        '</div>';

    //empty container
    $(".js-card-builder").empty();
    //append thumb
    $(".js-card-builder").append(cardElements);

/*
*modal
*/
    var thisElement = 0;
    function modalContent(content) {
        $(".modal__img").attr("style", dataModal[content].dataImg);
        $(".modal__title").html(dataModal[content].dataTitle);
        $(".modal__description").html(dataModal[content].dataContent);
        $(".modal__thumb").attr("style", dataModal[content].dataThumb);
        if(dataModal[content].dataThumb == "") {
            $(".global-flex__item--small").hide();
        } else {
            $(".global-flex__item--small").show();
        }
    }

//open modal
    $(".js-modal").click(function(e) {
        e.preventDefault();
        thisElement = $(this).attr("data-obj");
        modalContent(thisElement);
        $(".overlay").addClass("active");
        $('body').addClass("overflow-stop");
        dissBtn();
    });

//close modal
    $(".js-close").click(function() {
        $(".overlay-active").removeClass("active");
        $(".overlay").removeClass("active");
        $('body').removeClass("overflow-stop");
    });

//next modal
    $(".js-next").click(function(e) {
        e.preventDefault();
        if (thisElement < dataLength - 1) {
            thisElement = parseInt(thisElement) + 1;
            modalContent(thisElement);
            dissBtn();
        }
    });

//prev modal
    $(".js-prev").click(function(e) {
        e.preventDefault();
        if (thisElement > 0) {
            thisElement = parseInt(thisElement) - 1;
            modalContent(thisElement);
            dissBtn();
        }
    });

//button disabled
    var dissBtn = function() {
        $(".js-prev, .js-next").removeClass("disabled");
        if (thisElement <= 0) {
            $(".js-prev").addClass("disabled");
        } else if (thisElement >= dataLength - 1) {
            $(".js-next").addClass("disabled");
        }
    }
});//plane
var dataModal = [
    {
        dataImg: "background-image: url(images/png/eutrophierung_BUND_2016-01.png);"
    },
    {
        dataImg: "background-image: url(images/png/unterwasserlaerm_BUND_2020-01.png);"
    }
]

$('.js-start-trip').on('click', function (e) {
    e.preventDefault();
    $('.plane').addClass('is-flying');
    var plane = new Plane();
    plane.startAnimation();
    console.log('start');
});

$('.js-stop-trip').on('click', function (e) {
    e.preventDefault();
    $('.plane').removeClass('is-flying');
});

$('.js-next-trip').on('click', function (e) {
    e.preventDefault();
    console.log('change background');
});

function Plane() {
    var animatvarartTime = 0;
    var animationDuration = 18000;
    var target = document.querySelector('.plane');

    this.startAnimation = function () {
        animatvarartTime = Date.now();
        requestAnimationFrame(update);
    };

    function update() {
        var currentTime = Date.now();
        var positionInAnimation = (currentTime - animatvarartTime) / animationDuration;
        var objectWidth = $('.section').width() - $('.plane').width();
        var xPosition = positionInAnimation * objectWidth;
        var yPosition = positionInAnimation * 0;
        target.style.WebKitTransform = 'translate(' + xPosition + 'px, ' + yPosition + 'px)';
        target.style.transform = 'translate(' + xPosition + 'px, ' + yPosition + 'px)';
        if (positionInAnimation <= 5 && objectWidth > xPosition) {
            requestAnimationFrame(update);
            $('.js-start-trip').addClass('disabled reset');
            $('.js-stop-trip').addClass('disabled');
            $('.js-next-trip').addClass('disabled');
        } else {
            $('.js-start-trip').removeClass('disabled');
            $('.js-stop-trip').removeClass('disabled');
            $('.js-next-trip').removeClass('disabled');
        }
        if (objectWidth < xPosition)
            console.log('end');
            changeBtnText('.js-start-trip');
    };
};

function changeBtnText(selector) {
    var x = document.querySelector(selector);
    if (x.classList.contains('reset')) {
        x.classList.remove('reset');
        x.value = 'start trip';
    } else {
        x.value = 'reset trip';
    }
};
//smooth Scrolling
$('a[href*="#"]:not([href="#"])').on("click", function() {
	var speed = 1200;
	if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//,"") && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
		if (target.length) {
			$("html, body").animate(
				{scrollTop: target.offset().top},
				speed
			);
			return false;
		}
	}
});//show element with scroll
$(document).ready(function() {
    $(window).scroll( function(){
        $('.section__element--hidden').each( function(){
            var objectBottom = $(this).offset().top + $(this).outerHeight();
            var objectHeight = $(this).outerHeight();
            var windowBottom = $(window).scrollTop() + $(window).height();
            if(windowBottom > objectBottom){
                $(this).addClass("animate");
            }
        }); 
    });
});