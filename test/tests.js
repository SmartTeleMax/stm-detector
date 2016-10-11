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
}
const defaultUserAgent = navigator.userAgent;

describe("isBrowser", function() {
    beforeEach(function() {
        assert(document.body.classList.length === 0);
    });
    afterEach(function() {
        document.body.classList = [];
        navigator.userAgent = defaultUserAgent;
    });
    it('windows - chrome', function() {
        var isBrowser = detector.isBrowser;
        navigator.userAgent = desktopUserAgents.windows.chrome;
        console.log('set agent', navigator.userAgent)

        assert(isBrowser.Webkit());
        assert.isFalse(false, 'foo bar');
        assert(true);
    });
});


// describe("First test", function() {
//     it('Should fail', function() {
//         console.log('useragent', navigator.userAgent);
//         console.log('body', document.body.classList);
//         detector.detectDeviceClass();
//         detector.detectBrowserClass();
//         // console.log('detector', detector);
//         console.log('body', document.body.classList);

//     });
// });