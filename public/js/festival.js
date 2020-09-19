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

        $('#modalImportantText').html(i18next.t("modal.important.text", "#"))
        $('#modalImportant').on('show.bs.modal', function () {
            $('#modalImportant a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
                if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: (target.offset().top - 54)
                        }, 1000, "easeInOutExpo");
                        $('#modalImportant').modal('hide');
                        return false;
                    }
                }
            });
        }).modal({
            show: true,
            backdrop: false,
            keyboard: false
        })

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

    jQuery.fn.extend({
        buildArtistModal:
            function(titleI18Next, textI18Next, imageName, fbName, scName, igName, ytName, copyright) {
                var title = i18next.t(titleI18Next, "#")
                $('#modalArtistTitle').html(title)
                $('#modalArtistText').html(i18next.t(textI18Next, "#"))

                $('#modalArtistImage')
                    .attr('src', '#')
                    .attr('src', './img/artists/' + imageName)
                    .attr('alt', title + ' artist image');
                if (copyright) {
                    $('#modalArtistCopyright').html('&copy; ' + copyright).removeClass('d-none')
                } else {
                    $('#modalArtistCopyright').html('').addClass('d-none')
                }

                if (fbName) {
                    $('#modalArtistLinkFb').attr('href', 'https://www.facebook.com/' + fbName);
                    $('#modalArtistContainerFb').removeClass('d-none')
                } else {
                    $('#modalArtistContainerFb').addClass('d-none')
                }
                if (scName) {
                    $('#modalArtistLinkSc').attr('href', 'https://soundcloud.com/' + scName);
                    $('#modalArtistContainerSc').removeClass('d-none')
                } else {
                    $('#modalArtistContainerSc').addClass('d-none')
                }
                if (igName) {
                    $('#modalArtistLinkIg').attr('href', 'https://instagram.com/' + igName);
                    $('#modalArtistContainerIg').removeClass('d-none')
                } else {
                    $('#modalArtistContainerIg').addClass('d-none')
                }
                if (ytName) {
                    $('#modalArtistLinkYt').attr('href', 'https://youtube.com/' + ytName);
                    $('#modalArtistContainerYt').removeClass('d-none')
                } else {
                    $('#modalArtistContainerYt').addClass('d-none')
                }
                $('#modalArtist').modal('show');
                return this;
            },
        buildCollModal:
            function(titleI18Next, textI18Next, fbName, scName) {
                $('#modalCollTitle').html(i18next.t(titleI18Next, "#"))
                $('#modalCollText').html(i18next.t(textI18Next, "#"))

                if (fbName) {
                    $('#modalCollLinkFb').attr('href', 'https://www.facebook.com/' + fbName);
                    $('#modalCollContainerFb').removeClass('d-none')
                } else {
                    $('#modalCollContainerFb').addClass('d-none')
                }
                if (scName) {
                    $('#modalCollLinkSc').attr('href', 'https://soundcloud.com/' + scName);
                    $('#modalCollContainerSc').removeClass('d-none')
                } else {
                    $('#modalCollContainerSc').addClass('d-none')
                }
                $('#modalColl').modal('show');
                return this;
            },
        buildInfoModal:
            function(titleI18Next, textI18Next) {
                $('#modalInfoTitle').html(i18next.t(titleI18Next, "#"))
                $('#modalInfoText').html(i18next.t(textI18Next, "#"))
                $('#modalInfo').modal('show');
                return false;
            }
    });

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