
function include_js(url, is_async) {
    var js = document.createElement("script");
    js.async = is_async;
    js.src = url;
    document.head.appendChild(js);
}

function include_icon(url, size) {
    var icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.href = url;
    icon.sizes = size + "x" + size;
    document.head.appendChild(icon);
}

// analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}

(function(){
    include_icon("/img/icon/icon-16.png", 16);
    include_icon("/img/icon/icon-24.png", 24);
    include_icon("/img/icon/icon-32.png", 32);
    include_icon("/img/icon/icon-48.png", 48);
    include_icon("/img/icon/icon-64.png", 64);

    if (window.location && location.hostname == "localhost") {
        include_js("/MathJax/MathJax.js?config=TeX-AMS_HTML-full", true);
    } else {
        include_js("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_HTML-full", true);

        // analytics
        var aid = "UA-146336275-1";
        include_js("https://www.googletagmanager.com/gtag/js?id=" + aid, true);
        gtag('js', new Date());
        gtag('config', aid);
    }

    include_js("/js/post.js", false);
    include_js("/js/layout.js", true);
})();
