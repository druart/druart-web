// modal
$(document).ready(function() {
    var dataCard = [
        {
            dataTitle: "Illustrations",
            dataContent: "One of my favorite hobbies!<br> I started making vectorial illustrations, with personal style, that can be used for communication.<br>Take a look at what I've done so far.",
            dataImg: "background-image: url(images/png/marti-pulgas.png)"
        }
    ];

    var dataModal = [
        {
            dataTitle: "Eutrophication",
            dataContent: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aut rem quod unde deserunt id provident asperiores tempore, modi totam, vel placeat tempora dolor voluptatem! Ipsa nemo, modi vero excepturi!<br><a href='https://www.bund.net/fileadmin/user_upload_bund/publikationen/meere/meere_eutrophierung_flyer.pdf' target='_blank'>download the flyer</a>",
            dataImg: "background-image: url(images/png/eutrophierung_BUND_2016-01.png);",
            dataThumb: "background-image: url(images/png/eutrophierung_mascots_BUND_2016-02.png);"
        },
        {
            dataTitle: "Underwater Noise",
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
});