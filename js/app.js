'use strict';
/***** Константы  *****/

var ACTIVE_COLOR = '#45A490';

/***** Активные ссылки меню *****/
var linksH = document.querySelectorAll('.header-menu-list-link a');
var linksF = document.querySelectorAll('.footer-menu-list-link a');
var linksM = document.querySelectorAll('.header-mobile-links a');

/***** Mobile Header *****/
var openMenu = $('.header-langs .fas.fa-bars');
var closeMenu = $('.header-mobile-close .fas.fa-times');
var mobileMenu = $('.header-mobile-menu');

if (openMenu) {
    openMenu.on('click', function () {
        // openMenu.css('display', 'none'); 
        closeMenu.css('display', 'inline');
        mobileMenu.css('display', 'block');
        // Close menu
        closeMenu.on('click', function () {
            openMenu.css('display', 'block');
            closeMenu.css('display', 'none');
            mobileMenu.css('display', 'none');
        });
    });
}

/***** Scroll to top  *****/
(function () {
    function $(id) {
        return document.getElementById(id);
    }
    function goTop(acceleration, time) {
        acceleration = acceleration || 0.1;
        time = time || 12;

        var dx = 0;
        var dy = 0;
        var bx = 0;
        var by = 0;
        var wx = 0;
        var wy = 0;

        if (document.documentElement) {
            dx = document.documentElement.scrollLeft || 0;
            dy = document.documentElement.scrollTop || 0;
        }
        if (document.body) {
            bx = document.body.scrollLeft || 0;
            by = document.body.scrollTop || 0;
        }
        var wx = window.scrollX || 0;
        var wy = window.scrollY || 0;

        var x = Math.max(wx, Math.max(bx, dx));
        var y = Math.max(wy, Math.max(by, dy));

        var speed = 1 + acceleration;
        window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
        if (x > 0 || y > 0) {
            var invokeFunction = "top.goTop(" + acceleration + ", " + time + ")";
            window.setTimeout(invokeFunction, time);
        }
        return false;
    }
    function scrollTop() {
        var el = $('gotop');
        var stop = document.body.scrollTop || document.documentElement.scrollTop;
        if (stop > 50) {
            if (el.style.display != 'block') {
                el.style.display = 'block';
                smoothopaque(el, 0, 100, 1);
            }
        } else {
            el.style.display = 'none';
        }
        return false;
    }
    // Плавная смена прозрачности
    function smoothopaque(el, startop, endop, inc) {
        var op = startop;
        // Устанавливаем прозрачность
        setopacity(el, op);
        // Начинаем изменение прозрачности
        setTimeout(slowopacity, 1);
        function slowopacity() {
            if (startop < endop) {
                op = op + inc;
                if (op < endop) {
                    setTimeout(slowopacity, 1);
                }
            } else {
                op = op - inc;
                if (op > endop) {
                    setTimeout(slowopacity, 1);
                }
            }
            setopacity(el, op);
        };
    };
    // установка opacity
    function setopacity(el, opacity) {
        el.style.opacity = opacity / 100;
        el.style.filter = 'alpha(opacity=' + opacity + ')';
    };
    if (window.addEventListener) {
        window.addEventListener("scroll", scrollTop, false);
        window.addEventListener("load", scrollTop, false);
    } else if (window.attachEvent) {
        window.attachEvent("onscroll", scrollTop);
        window.attachEvent("onload", scrollTop);
    }
    window['top']['goTop'] = goTop;
})();

/***** Contacts popup *****/
var close = $('#contacts-popup .contacts .contacts-close i');
var contacts = document.querySelectorAll('.contacts-menu-link');
var wrapper = $('#contacts-popup');
var popup = $('#contacts-popup .contacts');

/***** Hide contacts popup *****/
var hidePopup = function hidePopup(event) {
    if (event.target.id == 'contacts-popup' || event.target.className == 'fas fa-times') {
        popup.css('display', 'none');
        wrapper.css('display', 'none');
        linksH[4].style.color = '#333';
        linksF[4].style.color = '#E1E1E1';
    } else {
        return;
    }
};

/***** Show contacts popup *****/
contacts.forEach(function (item, i) {
    item.addEventListener('click', function () {
        // Open contacts popup functions
        $(window).scrollTop(0);
        popup.css('display', 'flex');
        wrapper.css('display', 'block');
        wrapper.css('height', document.body.scrollHeight + 'px');
        linksH[4].style.color = ACTIVE_COLOR;
        linksF[4].style.color = ACTIVE_COLOR;
        // Hide mobile menu
        if (linksM.length) {
            closeMenu.css('display', 'none');
            mobileMenu.css('display', 'none');
        }
        // Close contacts popup functions
        close.on('click', hidePopup);
        wrapper.on('click', hidePopup);
    });
});

/***** Form popup *****/
var closeForm = $('#form-popup .contacts .contacts-close i');
var wrapperForm = $('#form-popup');
var popupForm = $('#form-popup .contacts');
var formLink = $('.show-popup-form');

/***** Hide form popup *****/
var hideForm = function hideForm(event) {
    if (event.target.id == 'form-popup' || event.target.className == 'fas fa-times') {
        popupForm.css('display', 'none');
        wrapperForm.css('display', 'none');
    } else {
        return;
    }
};

/***** Form popup events *****/
formLink.on('click', function () {
    // Open form popup functions
    $(window).scrollTop(0);
    popupForm.css('display', 'flex');
    wrapperForm.css('display', 'block');
    wrapperForm.css('height', document.body.scrollHeight + 'px');
    // Close form popup functions
    closeForm.on('click', hideForm);
    wrapperForm.on('click', hideForm);
});

/***** Styling input type='date' *****/
var calendar = document.getElementById('calendar-input');
if (calendar) {
    calendar.onchange = function () {
        if (calendar.value === '') {
            calendar.classList.add("empty-calendar");
        } else {
            calendar.classList.remove("empty-calendar");
        }
    };
}

/***** Class for different languages *****/

// Customers image
// .msg.customers 
// .customers-img-rus 
// .customers-img-eng 
// .customers-img-fr 
// .customers-img-uzb 

// About us 
// .about-map-wrapper
// .about-map-rus
// .about-map-eng
// .about-map-fr
// .about-map-uzb