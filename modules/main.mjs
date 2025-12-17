
const base = String(new URL("./", import.meta.url));

export default async function(args) {
    const path = document.location.pathname;

    if (path == "/" || path == "/index.html")
        return home(args);

    const idx = parseInt(path.substring(1) + "?", 10);
    footer_link({
        prev: idx == idx ? (idx + args.post_info.count - 1) % args.post_info.count : 0,
        next: idx == idx ? (idx + 1) % args.post_info.count : args.post_info.count - 1
    });
}

async function home(args) {
    footer_link({ prev: 0, next: args.post_info.count - 1 });

    const list = [];
    for (const imp of args.post_info.important)
        list.push(imp);

    while (list.length < Math.min(args.post_info.count, 20)) {
        const index = Math.floor(args.post_info.count * (1 - Math.random())**2);
        if (list.indexOf(index) >= 0)
            continue;

        list.push(index);
    }

    for (const idx of list)
        append_content_list(idx);
}

async function append_content_list(idx) {
    const content_list = document.getElementById("content-list");
    const manifest = await get_manifest(idx);
    if (!manifest)
        return;

    const preview = typeof(manifest.preview) == "string" ? manifest.preview :
                    manifest.preview instanceof Array ? manifest.preview.join(" ") : "";

    const url = `/${String(idx).padStart(7, "0")}/${manifest.file}`;
    const div = document.createElement("div");
    div.innerHTML =
`<h2>${manifest.title}</h2>
${preview}
<p>
    <a href="${url}" title="${manifest.title}">Read more...</a>
    <a href="${url}" title="${manifest.title}" rel="noopener" target="_blank">Read more in new tab...</a>
</p>`;
    content_list.appendChild(div);
    if (window.MathJax && MathJax.typeset)
        MathJax.typeset([ div ]);
}

async function footer_link(links) {
    document.body.insertAdjacentHTML("beforeend",
`<div id="footer-link" class="align-center">
    <div style="position: absolute; bottom: 0; left: 0;">
        <a id="footer-link-prev"><img src="${ base + "img/icon/arrow-left-32.png" }" alt="Prev"/></a>
    </div>
    <a href="/" title="Home"><img src="${ base + "img/icon/icon-32.png" }" alt="Home"/></a>
    <a href="https://github.com/mfcc64" title="GitHub" rel="noopener" target="_blank">
        <img src="${ base + "img/icon/github-mark-light-32.png" }" alt="GitHub"/>
    </a>
    <div style="position: absolute; bottom: 0; right: 0;">
        <a id="footer-link-next"><img src="${ base + "img/icon/arrow-right-32.png" }" alt="Next"/></a>
    </div>
</div>`);

    const prev = document.getElementById("footer-link-prev");
    const next = document.getElementById("footer-link-next");
    const manifest = await Promise.all([ get_manifest(links.prev), get_manifest(links.next) ]);
    if (manifest[0]) {
        prev.href = `/${String(links.prev).padStart(7, "0")}/${manifest[0].file}`;
        prev.title = manifest[0].title;
    }
    if (manifest[1]) {
        next.href = `/${String(links.next).padStart(7, "0")}/${manifest[1].file}`;
        next.title = manifest[1].title;
    }
}

async function get_manifest(id) {
    try {
        const resp = await fetch(`/${String(id).padStart(7, "0")}/manifest.json`);
        if (!resp.ok)
            return null;
        const manifest = await resp.json();
        if (!manifest.file || !manifest.title)
            return null;
        return manifest;
    } catch (err) {
        console.error(err);
        return null;
    }
}
