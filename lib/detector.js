/*jslint esversion: 6, -W097, browser: true, strict: implied, -W034 */
/* globals console, require */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.supportsTransitions = supportsTransitions;
var $ = require('jquery');

// detecting user device
var isMobile = exports.isMobile = {
    Android: function Android() {
        return navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Mobile/i);
    },
    BlackBerry: function BlackBerry() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function iOS() {
        return navigator.userAgent.match(/iPhone|iPod/i);
    },
    Opera: function Opera() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function Windows() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function any() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
};

var isTablet = exports.isTablet = {
    Android: function Android() {
        return navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i);
    },
    iOS: function iOS() {
        return navigator.userAgent.match(/iPad/i);
    },
    any: function any() {
        return isTablet.iOS() || isTablet.Android();
    }
};

function deviceClass() {
    var $body = $(document.body);
    if (isMobile.any()) {
        $body.addClass('mobile');
    }

    if (isMobile.Android()) {
        $body.addClass('android');
    }

    if (isTablet.any()) {
        $body.addClass('tablet');
    }
}

deviceClass(); // XXX

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