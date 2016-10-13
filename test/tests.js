var detector = require('../lib/detector');
var assert = require('chai').assert;

const desktopUserAgents = {
    windows: {
        chrome: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
        firefox: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0'
    },
    linux: {
        chrome: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
        firefox: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0'
    },
    mac: {
        chrome: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36',
        firefox: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:48.0) Gecko/20100101 Firefox/48.0'
    }
};
const mobileUserAgents = {
    'android_phone': 'Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>',
    'android_tablet': 'Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev>(KHTML, like Gecko) Chrome/<Chrome Rev> Safari/<WebKit Rev>',
    'blackberry': 'Mozilla/5.0 (BB10; <Device Model>) AppleWebKit/<WebKit Version> (KHTML, like Gecko) Version/<BB Version #> Mobile Safari/<WebKit Version>',
    'iphone': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A456 Safari/602.1',
    'ipad': 'Mozilla/5.0 (iPad; CPU OS 10_0_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A456 Safari/602.1',
    'opera': 'Opera/9.80 (Android; Opera Mini/7.5.33361/31.1448; U; en) Presto/2.8.119 Version/11.1010',
    'windows': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; NOKIA; Lumia 920)'
};

const defaultUserAgent = navigator.userAgent;
global.window = { document: { body: { style: { transition: 42 } } } };

function setUserAgent(userAgent) {
    if (window.navigator.userAgent != userAgent) {
        var userAgentProp = {
            get: function() {
                return userAgent;
            }
        };
        try {
            Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
        } catch (e) {
            window.navigator = Object.create(navigator, {
                userAgent: userAgentProp
            });
        }
    }
}


describe("#isMobile", function() {
    var check = detector.isMobile;
    before(function() {
        setUserAgent(defaultUserAgent);
    });
    afterEach(function() {
        setUserAgent(defaultUserAgent);
    });

    it('is not mobile by default', function() {
        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.BlackBerry(), "check blackberry");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.Opera(), "check opera");
        assert.isFalse(check.Windows(), "check windows");
        assert.isFalse(check.any(), "check any");
    });

    it('Android phone', function() {
        setUserAgent(mobileUserAgents.android_phone);

        assert.isTrue(check.Android(), "check android");
        assert.isFalse(check.BlackBerry(), "check blackberry");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.Opera(), "check opera");
        assert.isFalse(check.Windows(), "check windows");
        assert.isTrue(check.any(), "check any");
    });
    it('Android tablet', function() {
        setUserAgent(mobileUserAgents.android_tablet);

        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.BlackBerry(), "check blackberry");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.Opera(), "check opera");
        assert.isFalse(check.Windows(), "check windows");
        assert.isFalse(check.any(), "check any");
    });
    it('Blackberry phone', function() {
        setUserAgent(mobileUserAgents.blackberry);

        assert.isFalse(check.Android(), "check android");
        assert.isTrue(check.BlackBerry(), "check blackberry");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.Opera(), "check opera");
        assert.isFalse(check.Windows(), "check windows");
        assert.isTrue(check.any(), "check any");
    });
    it('iPhone', function() {
        setUserAgent(mobileUserAgents.iphone);

        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.BlackBerry(), "check blackberry");
        assert.isTrue(check.iOS(), "check ios");
        assert.isFalse(check.Opera(), "check opera");
        assert.isFalse(check.Windows(), "check windows");
        assert.isTrue(check.any(), "check any");
    });
    it('iPad', function() {
        setUserAgent(mobileUserAgents.ipad);

        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.BlackBerry(), "check blackberry");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.Opera(), "check opera");
        assert.isFalse(check.Windows(), "check windows");
        assert.isFalse(check.any(), "check any");
    });
    it('Opera mini', function() {
        setUserAgent(mobileUserAgents.opera);

        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.BlackBerry(), "check blackberry");
        assert.isFalse(check.iOS(), "check ios");
        assert.isTrue(check.Opera(), "check opera");
        assert.isFalse(check.Windows(), "check windows");
        assert.isTrue(check.any(), "check any");
    });
    it('Windows mobile', function() {
        setUserAgent(mobileUserAgents.windows);

        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.BlackBerry(), "check blackberry");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.Opera(), "check opera");
        assert.isTrue(check.Windows(), "check windows");
        assert.isTrue(check.any(), "check any");
    });
    it('Desktop is not mobile', function() {
        setUserAgent(desktopUserAgents.windows.chrome);

        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.BlackBerry(), "check blackberry");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.Opera(), "check opera");
        assert.isFalse(check.Windows(), "check windows");
        assert.isFalse(check.any(), "check any");
    });
});

describe("#isBrowser", function() {
    var check = detector.isBrowser;

    afterEach(function() {
        setUserAgent(defaultUserAgent);
    });

    it('windows chrome is webkit', function() {
        setUserAgent(desktopUserAgents.windows.chrome);

        assert.isTrue(check.Webkit());
        assert.isFalse(check.Firefox());
    });
    it('linux chrome is webkit', function() {
        setUserAgent(desktopUserAgents.linux.chrome);

        assert.isTrue(check.Webkit());
        assert.isFalse(check.Firefox());
    });
    it('mac chrome is webkit', function() {
        setUserAgent(desktopUserAgents.mac.chrome);

        assert.isTrue(check.Webkit());
        assert.isFalse(check.Firefox());
    });

    it('windows firefox is firefox', function() {
        setUserAgent(desktopUserAgents.windows.firefox);

        assert.isFalse(check.Webkit());
        assert.isTrue(check.Firefox());
    });
    it('linux firefox is firefox', function() {
        setUserAgent(desktopUserAgents.linux.firefox);

        assert.isFalse(check.Webkit());
        assert.isTrue(check.Firefox());
    });
    it('mac firefox is firefox', function() {
        setUserAgent(desktopUserAgents.mac.firefox);

        assert.isFalse(check.Webkit());
        assert.isTrue(check.Firefox());
    });
});


describe("#isTablet", function() {
    var check = detector.isTablet;
    before(function() {
        setUserAgent(defaultUserAgent);
    });
    afterEach(function() {
        setUserAgent(defaultUserAgent);
    });

    it('should fail by default', function() {
        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.any(), "check any");
    });
    it('Android phone', function() {
        setUserAgent(mobileUserAgents.android_phone);

        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.any(), "check any");
    });
    it('Android tablet', function() {
        setUserAgent(mobileUserAgents.android_tablet);

        assert.isTrue(check.Android(), "check android");
        assert.isFalse(check.iOS(), "check ios");
        assert.isTrue(check.any(), "check any");
    });
    it('iPhone', function() {
        setUserAgent(mobileUserAgents.iphone);

        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.any(), "check any");
    });
    it('iPad', function() {
        setUserAgent(mobileUserAgents.ipad);

        assert.isFalse(check.Android(), "check android");
        assert.isTrue(check.iOS(), "check ios");
        assert.isTrue(check.any(), "check any");
    });
    it('Desktop is not a tablet', function() {
        setUserAgent(desktopUserAgents.windows.chrome);

        assert.isFalse(check.Android(), "check android");
        assert.isFalse(check.iOS(), "check ios");
        assert.isFalse(check.any(), "check any");
    });

});

describe("#detectDeviceClass", function() {
    var mobileClass = 'mobile',
        androidClass = 'android',
        tabletClass = 'tablet',
        clsList = document.body.classList;

    before(function() {
        document.body.className = "";
        setUserAgent(defaultUserAgent);
    });
    afterEach(function() {
        document.body.className = "";
        setUserAgent(defaultUserAgent);
    });

    it("Desktop browser", function() {
        setUserAgent(desktopUserAgents.windows.chrome);

        detector.detectDeviceClass();

        assert.isFalse(clsList.contains(mobileClass), 'check mobile');
        assert.isFalse(clsList.contains(androidClass), 'check android');
        assert.isFalse(clsList.contains(tabletClass), 'check tablet');
    });

    it("Android phone", function() {
        setUserAgent(mobileUserAgents.android_phone);

        detector.detectDeviceClass();

        assert.isTrue(clsList.contains(mobileClass), 'check mobile');
        assert.isTrue(clsList.contains(androidClass), 'check android');
        assert.isFalse(clsList.contains(tabletClass), 'check tablet');
    });

    it("Android tablet", function() {
        setUserAgent(mobileUserAgents.android_tablet);

        detector.detectDeviceClass();

        assert.isFalse(clsList.contains(mobileClass), 'check mobile');
        assert.isFalse(clsList.contains(androidClass), 'check android');
        assert.isTrue(clsList.contains(tabletClass), 'check tablet');
    });

    it("Blackberry", function() {
        setUserAgent(mobileUserAgents.blackberry);

        detector.detectDeviceClass();

        assert.isTrue(clsList.contains(mobileClass), 'check mobile');
        assert.isFalse(clsList.contains(androidClass), 'check android');
        assert.isFalse(clsList.contains(tabletClass), 'check tablet');
    });

    it("iPad", function() {
        setUserAgent(mobileUserAgents.ipad);

        detector.detectDeviceClass();

        assert.isFalse(clsList.contains(mobileClass), 'check mobile');
        assert.isFalse(clsList.contains(androidClass), 'check android');
        assert.isTrue(clsList.contains(tabletClass), 'check tablet');
    });

    it("Windows mobile", function() {
        setUserAgent(mobileUserAgents.windows);

        detector.detectDeviceClass();

        assert.isTrue(clsList.contains(mobileClass), 'check mobile');
        assert.isFalse(clsList.contains(androidClass), 'check android');
        assert.isFalse(clsList.contains(tabletClass), 'check tablet');
    });
});


describe("#detectBrowserClass", function() {
    var ffClassName = 'is-firefox';

    before(function() {
        document.body.className = "";
        setUserAgent(defaultUserAgent);
    });
    afterEach(function() {
        document.body.className = "";
        setUserAgent(defaultUserAgent);
    });

    it('do not set `is-firefox` class to body in chrome', function() {
        setUserAgent(desktopUserAgents.windows.chrome);

        detector.detectBrowserClass();
        assert.isFalse(document.body.classList.contains(ffClassName), 'Body do not have firefox-specific class name');
    });
    it('set `is-firefox` class to body', function() {
        setUserAgent(desktopUserAgents.windows.firefox);

        detector.detectBrowserClass();
        assert(document.body.classList.contains(ffClassName), 'Body should have firefox-specific class name');
    });
});


describe("#supportsTransitions", function() {
    it('supports by default', function() {
        assert.isTrue(detector.supportsTransitions(), 'phantomjs should support transitions');
    });

    it('do not support if there are no such property', function() {
        var doc = { body: { style: {} } };
        assert.isFalse(detector.supportsTransitions(doc));
    });

    it('Support vendor-specific', function() {
        var doc = { body: { style: { msTransition: '' } } };
        assert.isTrue(detector.supportsTransitions(doc));
    });

    it('documentElement instead of body', function() {
        var doc = { documentElement: { style: { transition: '' } } };
        assert.isTrue(detector.supportsTransitions(doc));
    });
});


describe("#detectWindowWidth", function() {
    var __defaultWidth = window.innerWidth,
        mobileCls = 'is-mobile-width';


    afterEach(function() {
        window.innerWidth = __defaultWidth;
        document.body.className = "";
    });
    it('Desktop width with default args', function() {
        window.innerWidth = 1024;

        detector.detectWindowWidth();

        assert.isFalse(document.body.classList.contains(mobileCls));
    });
    it('Zero width with default args', function() {
        window.innerWidth = 0;
        detector.detectWindowWidth();

        assert.isTrue(document.body.classList.contains(mobileCls));
    });
    it('Corner case with default args', function() {
        window.innerWidth = 730;
        detector.detectWindowWidth();

        assert.isFalse(document.body.classList.contains(mobileCls));
    });
    it('Custom mobile width', function() {
        window.innerWidth = 1024;
        detector.detectWindowWidth(1200);

        assert.isTrue(document.body.classList.contains(mobileCls));
    });
});
