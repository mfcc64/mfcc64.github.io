"use strict";
(() => {
    const post_info = {
        count: 3,
        important: [ 0 ]
    };

    const append_el = (parent, name, func) => {
        const el = document.createElement(name);
        func?.(el);
        parent.appendChild(el);
    };

    const mprefix = "https://cdn.jsdelivr.net/npm/@mfcc64/gh-pages@1.0.1/";

    import(mprefix + "main.mjs").then(r => {
        let main = r.default;
        if (document.readyState != "loading")
            main({post_info}), main = null;
        document.addEventListener("readystatechange", () => (main?.({post_info}), main = null));
    });

    append_el(document.head, "script", el => {
        el.src = "https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-chtml.js";
        el.async = true;
    });
})();
