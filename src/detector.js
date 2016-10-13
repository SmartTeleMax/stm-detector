/*jslint esversion: 6, -W097, browser: true, strict: implied, -W034 */
/* globals console */
'use strict';

// detecting user device
export var isMobile = {
    Android: function() {
        return !!(navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Mobile/i));
    },
    BlackBerry: function() {
        return !!navigator.userAgent.match(/BlackBerry|BB10/i);
    },
    iOS: function() {
        return !!navigator.userAgent.match(/iPhone|iPod/i);
    },
    Opera: function() {
        return !!navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return !!navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        let mobileChecks = [
            isMobile.Android(),
            isMobile.BlackBerry(),
            isMobile.iOS(),
            isMobile.Opera(),
            isMobile.Windows()
        ];
        return mobileChecks.some(x => !!x);
    }
};

export var isBrowser = {
    Firefox: function() {
        return !!(navigator.userAgent.match(/Firefox/i));
    },
    Webkit: function() {
        return !!(navigator.userAgent.match(/Webkit/i));
    },
};

export var isTablet = {
    Android: function() {
        return !!(navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i));
    },
    iOS: function() {
        return !!(navigator.userAgent.match(/iPad/i));
    },
    any: function() {
        return !!(isTablet.iOS() || isTablet.Android());
    }
};

// Following functions are not executed on import anymore
export function detectDeviceClass() {
    let body = document.body;
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

export function detectBrowserClass() {
    let body = document.body;
    if (isBrowser.Firefox()) {
        body.classList.add('is-firefox');
    }
}


export function supportsTransitions(doc = document) {
    var b = doc.body || doc.documentElement;
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
export function detectWindowWidth(mobileWidth = 730) {
    let isMobileWidth = window.innerWidth < mobileWidth;
    let body = document.body;
    if (isMobileWidth) {
        body.classList.add('is-mobile-width');
    } else {
        body.classList.remove('is-mobile-width');
    }
}
