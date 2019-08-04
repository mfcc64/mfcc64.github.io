
window.addEventListener("load", function(event){
    function include_icon(url, size) {
        var icon = document.createElement("link");
        icon.rel = "icon";
        icon.type = "image/png";
        icon.href = url;
        icon.sizes = size + "x" + size;
        document.head.appendChild(icon);
    }

    function include_js(url, is_async) {
        var js = document.createElement("script");
        js.async = is_async;
        js.src = url;
        document.head.appendChild(js);
    }

    include_icon("/img/icon/icon-16.png", 16);
    include_icon("/img/icon/icon-24.png", 24);
    include_icon("/img/icon/icon-32.png", 32);
    include_icon("/img/icon/icon-48.png", 48);
    include_icon("/img/icon/icon-64.png", 64);
    include_js("https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_HTML-full", true);
    include_js("/js/post.js", false);
    include_js("/js/layout.js", false);
    if (document.getElementById("content-list"))
        include_js("/js/content-list.js");
});
