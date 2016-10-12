/*jslint esversion: 6, -W097, browser: true, strict: implied, -W034 */
/* globals console */
'use strict';

// detecting user device

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.detectDeviceClass = detectDeviceClass;
exports.detectBrowserClass = detectBrowserClass;
exports.supportsTransitions = supportsTransitions;
exports.detectWindowWidth = detectWindowWidth;
var isMobile = exports.isMobile = {
    Android: function Android() {
        return !!(navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Mobile/i));
    },
    BlackBerry: function BlackBerry() {
        return !!navigator.userAgent.match(/BlackBerry|BB10/i);
    },
    iOS: function iOS() {
        return !!navigator.userAgent.match(/iPhone|iPod/i);
    },
    Opera: function Opera() {
        return !!navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
        return !!navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
        var mobileChecks = [isMobile.Android(), isMobile.BlackBerry(), isMobile.iOS(), isMobile.Opera(), isMobile.Windows()];
        return mobileChecks.some(function (x) {
            return !!x;
        });
    }
};

var isBrowser = exports.isBrowser = {
    Firefox: function Firefox() {
        return !!navigator.userAgent.match(/Firefox/i);
    },
    Webkit: function Webkit() {
        return !!navigator.userAgent.match(/Webkit/i);
    }
};

var isTablet = exports.isTablet = {
    Android: function Android() {
        return !!(navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i));
    },
    iOS: function iOS() {
        return !!navigator.userAgent.match(/iPad/i);
    },
    any: function any() {
        return !!(isTablet.iOS() || isTablet.Android());
    }
};

// Following functions are not executed on import anymore
function detectDeviceClass() {
    var body = document.body;
    if (isMobile.any()) {
        body.classList.add('mobile');
    }

    if (isMobile.Android()) {
        body.classList.add('android');
    }

    if (isTablet.any()) {
        body.classList.add('tablet');
    }
}

function detectBrowserClass() {
    var body = document.body;
    if (isBrowser.Firefox()) {
        body.classList.add('is-firefox');
    }
}

function supportsTransitions() {
    var b = document.body || document.documentElement;
    var s = b.style;
    var p = 'transition';
    if (typeof s[p] === 'string') {
        return true;
    }

    // Tests for vendor specific prop
    var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for (var i = 0; i < v.length; i++) {
        if (typeof s[v[i] + p] === 'string') {
            return true;
        }
    }
    return false;
}

// This function can be triggered on window resize
function detectWindowWidth() {
    var mobileWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 730;

    var isMobileWidth = window.innerWidth < mobileWidth;
    var body = document.body;
    isMobileWidth ? body.classList.add('is-mobile-width') : body.classList.remove('is-mobile-width');
}