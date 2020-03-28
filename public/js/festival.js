(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 54)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 56
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        var nav = $("#mainNav");
        if (nav.offset().top > 100) {
            nav.addClass("navbar-shrink");
        } else {
            nav.removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    var localizeJs = function () {
        $('textarea#message').summernote({
            placeholder: i18next.t('contact.form.textarea', "#"),
            tabsize: 2,
            height: 200,
            disableDragAndDrop: true,
            spellCheck: true,
            dialogsInBody: true,
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                ['fontsize', ['fontsize', 'color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['insert', ['link', 'table']]
            ]
        });

        var details = {
            message: i18next.t('cookies.message', "#"),
            acceptText: i18next.t('cookies.accept', "#"),
            policyButton: true,
            policyText: i18next.t('cookies.policy', "#"),
            policyURL: '/Datenschutz.html', //URL of Privacy Policy
            fixed: true, //Set to true to add the class "fixed" to the cookie bar. Default CSS should fix the position
            bottom: true, //Force CSS when fixed, so bar appears at bottom of website
            zindex: '9999'
        };
        $.cookieBar(details);
    };
    if (i18next.exists('contact.form.textarea')) {
        localizeJs();
    } else {
        i18next.on('initialized', function() {
            localizeJs();
        });
    }

    var initMap = function () {
        var point = {lat: 51.380219, lng: 11.433763};
        var map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: point});
        var marker = new google.maps.Marker({position: point, map: map});
        marker.addListener('click', function () {
            window.open('https://www.google.com/maps/@51.380219,11.433763,16z?hl=de', '_blank');
        });

        var styles = [{
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [{"saturation": "-100"}]
        }, {
            "featureType": "administrative.province",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": "50"}, {"visibility": "simplified"}]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{"saturation": "-100"}]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}]
        }, {
            "featureType": "road.arterial",
            "elementType": "all",
            "stylers": [{"lightness": "30"}]
        }, {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [{"lightness": "40"}]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"visibility": "simplified"}]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]
        }, {"featureType": "water", "elementType": "labels", "stylers": [{"lightness": -25}, {"saturation": -100}]}];
        map.set('styles', styles);
    };
    initMap();

    // Initialize Firebase
    firebase.analytics();

})(jQuery); // End of use strict