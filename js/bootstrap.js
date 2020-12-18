
function append_element(parent, name, func) {
    var e = document.createElement(name);
    func(e);
    parent.appendChild(e);
}

function include_js(url, is_async) {
    append_element(document.head, "script", (e) => (e.async = is_async, e.src = url));
}

function include_icon(url, size) {
    append_element(document.head, "link", (e) => (e.rel = "icon", e.type = "image/png",
                   e.href = url, e.sizes = size + "x" + size));
}

(function(){
    include_icon("/img/icon/icon-16.png", 16);
    include_icon("/img/icon/icon-24.png", 24);
    include_icon("/img/icon/icon-32.png", 32);
    include_icon("/img/icon/icon-48.png", 48);
    include_icon("/img/icon/icon-64.png", 64);

    if (window.location && location.hostname == "localhost") {
        include_js("/MathJax/MathJax.js?config=TeX-AMS_CHTML-full", true);
    } else {
        include_js("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_CHTML-full", true);
    }

    include_js("/js/post.js", false);
    include_js("/js/load-manifest.js", false);
    include_js("/js/layout.js", false);
})();
