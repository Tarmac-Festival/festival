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
    const linkType = {
        default: 0,
        facebook: 1,
        soundcloud: 2,
        instagram: 3,
        youtube: 4,
        bandcamp: 5,
        mixcloud: 6,
        twitter:7
        
    }
    var getLinkType = function(lt){
        if(!lt || lt.length===0) return linkType.default;
        if(lt.includes("soundcloud")){
            return linkType.soundcloud;
        }else if(lt.includes("instagram")){
            return linkType.instagram;
        }else if(lt.includes("facebook")){
            return linkType.facebook;
        }else if(lt.includes("youtube")){
            return linkType.youtube;
        }else if(lt.includes("bandcamp")){
            return linkType.bandcamp;
        }else if(lt.includes("mixcloud")){
            return linkType.mixcloud;
        }else if(lt.includes("twitter")){
            return linkType.twitter;
        }else{
            return linkType.default;
        }
    }
    
    jQuery.fn.extend({
        buildArtistModal:
            function(name, link,imageName, text, copyright, year) {
                console.log("build Artist Modal");
                $('#modalArtistContainerFb').addClass('d-none');
                $('#modalArtistContainerSc').addClass('d-none');
                $('#modalArtistContainerIg').addClass('d-none');
                $('#modalArtistContainerYt').addClass('d-none');
                $('#modalArtistContainerBc').addClass('d-none');
                $('#modalArtistContainerMc').addClass('d-none');
                $('#modalArtistContainerTw').addClass('d-none');
                $('#modalArtistContainerDefault').addClass('d-none');
                $('#modalArtistImage').removeAttr('scr').removeAttr('alt').addClass('d-none');
                $('#modalArtistImageLink').removeAttr('href');
                $('#modalArtistTitle').html(name)
                $('#modalArtistBody').removeClass('d-none');
                var links = link.split(',').filter(Boolean);
                if(imageName){
                    $('#modalArtistImage')
                    .attr('src', '#')
                    .attr('src', './img/artists/'+ year+'/'+ imageName)
                    .attr('alt', name + ' artist image')
                    .removeClass('d-none');
                    if(links[0]){
                        $('#modalArtistImageLink').attr('href',links[0])
                        .attr('target','_blank');
                    }
                }else{
                    
                    $('#modalArtistBody').addClass('d-none');
                }
                
                if (copyright) {
                    $('#modalArtistCopyright').html('&copy; ' + copyright).removeClass('d-none')
                } else {
                    $('#modalArtistCopyright').html('').addClass('d-none')
                }
                if(!text.length===0){
                    $('#modalArtistText').html(text).removeClass('d-none')
                } else {
                    $('#modalArtistText').html('').addClass('d-none')
                }
                
                //no link provided -> LinkType null
                //prep set all d-none
                
                
                if(links){
                    console.log(name);
                    console.log(link);
                    console.log(LinkType);
                    var LinkType = linkType.default;
                    links.forEach(element=> {
                        LinkType = getLinkType(element);

                        switch(LinkType){
                            
                            case linkType.facebook:
                                if (element) {
                                    $('#modalArtistLinkFb').attr('href', element);
                                    $('#modalArtistContainerFb').removeClass('d-none')
                                } else {
                                    $('#modalArtistContainerFb').addClass('d-none')
                                }
                                break;
                            case linkType.soundcloud:
                                if (element) {
                                    $('#modalArtistLinkSc').attr('href', element);
                                    $('#modalArtistContainerSc').removeClass('d-none')
                                } else {
                                    $('#modalArtistContainerSc').addClass('d-none')
                                }
                                break;
                            case linkType.instagram:
                                if (element) {
                                    $('#modalArtistLinkIg').attr('href', element);
                                    $('#modalArtistContainerIg').removeClass('d-none')
                                } else {
                                    $('#modalArtistContainerIg').addClass('d-none')
                                }
                                break;
                            case linkType.youtube:
                                if (element) {
                                    $('#modalArtistLinkYt').attr('href', element);
                                    $('#modalArtistContainerYt').removeClass('d-none')
                                } else {
                                    $('#modalArtistContainerYt').addClass('d-none')
                                }
                                break;
                            case linkType.bandcamp:
                                if (element) {
                                    $('#modalArtistLinkBc').attr('href', element);
                                    $('#modalArtistContainerBc').removeClass('d-none')
                                } else {
                                    $('#modalArtistContainerBc').addClass('d-none')
                                }
                                break;
                            case linkType.mixcloud:
                                if (element) {
                                    $('#modalArtistLinkMc').attr('href', element);
                                    $('#modalArtistContainerMc').removeClass('d-none')
                                } else {
                                    $('#modalArtistContainerMc').addClass('d-none')
                                }
                                break;
                            case linkType.twitter:
                                if (element) {
                                    $('#modalArtistLinkTw').attr('href', element);
                                    $('#modalArtistContainerTw').removeClass('d-none')
                                } else {
                                    $('#modalArtistContainerTw').addClass('d-none')
                                }
                                break;
                            default:
                                if(element){
                                    $('#modalArtistLinkDefault').attr('href',element);
                                    $('#modalArtistContainerDefault').removeClass('d-none')
                                }
                                else{
                                    $('#modalArtistContainerDefault').addClass('d-none');
                                }
                            }
                        });
                                    
                    }
                    $('#modalArtist').modal('show');
                    return this;
                },
        buildArchivedArtistModal:
    function(name, link,imageName, text, copyright, year) {
        console.log("build Artist Modal");
        $('#modalArtistContainerFb').addClass('d-none');
        $('#modalArtistContainerSc').addClass('d-none');
        $('#modalArtistContainerIg').addClass('d-none');
        $('#modalArtistContainerYt').addClass('d-none');
        $('#modalArtistContainerBc').addClass('d-none');
        $('#modalArtistContainerMc').addClass('d-none');
        $('#modalArtistContainerTw').addClass('d-none');
        $('#modalArtistContainerDefault').addClass('d-none');
        
        var links = link.split(',').filter(Boolean);
        //no link provided -> LinkType null
        //prep set all d-none
        
        
        if(links.length >0){
            console.log(name);
            console.log(link);
            console.log(LinkType);
            var LinkType = linkType.default;
            links.forEach(element=> {
                LinkType = getLinkType(element);

                switch(LinkType){
                    
                    case linkType.facebook:
                        if (element) {
                            $('#modalArtistLinkFb').attr('href', element);
                            $('#modalArtistContainerFb').removeClass('d-none')
                        } else {
                            $('#modalArtistContainerFb').addClass('d-none')
                        }
                        break;
                    case linkType.soundcloud:
                        if (element) {
                            $('#modalArtistLinkSc').attr('href', element);
                            $('#modalArtistContainerSc').removeClass('d-none')
                        } else {
                            $('#modalArtistContainerSc').addClass('d-none')
                        }
                        break;
                    case linkType.instagram:
                        if (element) {
                            $('#modalArtistLinkIg').attr('href', element);
                            $('#modalArtistContainerIg').removeClass('d-none')
                        } else {
                            $('#modalArtistContainerIg').addClass('d-none')
                        }
                        break;
                    case linkType.youtube:
                        if (element) {
                            $('#modalArtistLinkYt').attr('href', element);
                            $('#modalArtistContainerYt').removeClass('d-none')
                        } else {
                            $('#modalArtistContainerYt').addClass('d-none')
                        }
                        break;
                    case linkType.bandcamp:
                        if (element) {
                            $('#modalArtistLinkBc').attr('href', element);
                            $('#modalArtistContainerBc').removeClass('d-none')
                        } else {
                            $('#modalArtistContainerBc').addClass('d-none')
                        }
                        break;
                    case linkType.mixcloud:
                        if (element) {
                            $('#modalArtistLinkMc').attr('href', element);
                            $('#modalArtistContainerMc').removeClass('d-none')
                        } else {
                            $('#modalArtistContainerMc').addClass('d-none')
                        }
                        break;
                        case linkType.twitter:
                        if (element) {
                            $('#modalArtistLinkTw').attr('href', element);
                            $('#modalArtistContainerTw').removeClass('d-none')
                        } else {
                            $('#modalArtistContainerTw').addClass('d-none')
                        }
                        break;
                    default:
                        if(element){
                            $('#modalArtistLinkDefault').attr('href',element);
                            $('#modalArtistContainerDefault').removeClass('d-none')
                        }
                        else{
                            $('#modalArtistContainerDefault').addClass('d-none');
                        }
                    }
                });
                            
            }
            $('#modalArtist').modal('show');
            return this;
        },
        buildCollModal:
            function(titleI18Next, textI18Next, fbName, scName, instName) {
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
                if (instName) {
                    $('#modalCollLinkInst').attr('href', 'https://www.instagram.com/' + instName);
                    $('#modalCollContainerInst').removeClass('d-none')
                } else {
                    $('#modalCollContainerInst').addClass('d-none')
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
            },
        showNewsletterModal:
            function(){
                $('#modalNewsletter').modal('show');
                return false;
            }
    });

    var initMap = function () {
        var point = {lat: 51.388995, lng: 11.450222};
        var map = new google.maps.Map(document.getElementById('map'), {zoom: 13, center: point});
        var marker = new google.maps.Marker({position: point, map: map});
        marker.addListener('click', function () {
            window.open('https://www.google.com/maps/@51.388995,11.450222,16z?hl=de', '_blank');
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