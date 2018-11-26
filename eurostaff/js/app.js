'use strict';

// Активные ссылки
var links = document.querySelectorAll('.header-menu-list-link a');
var title = document.title;

if (links && links.length > 0) {
    switch (title) {
        case 'Eurostaff | Главная':
            links[0].style.color = '#45A490';
            break;
        case 'Eurostaff | О нас':
            links[1].style.color = '#45A490';
            break;
        case 'Eurostaff | Вакансии':
            links[2].style.color = '#45A490';
            break;
        case 'Eurostaff | Заказчику':
            links[3].style.color = '#45A490';
            break;
        default:
            break;
    }
}

// Scroll to top 
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

// Show contacts popup
var close = $('.contacts .contacts-close i');
var contacts = document.querySelectorAll('.contacts-menu-link');
var popup = $('.contacts');

contacts.forEach(function (item, i) {
    item.addEventListener('click', function () {

        $(window).scrollTop(0);
        popup.css('display', 'flex');
        links[4].style.color = '#45A490';

        // Close contacts popup
        close.on('click', function () {
            popup.css('display', 'none');
            links[4].style.color = '#333';
        });
    });
});