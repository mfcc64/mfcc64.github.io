
function default_layout() {
    var body = document.body;
    var content = document.getElementById("content");
    var content_list =document.getElementById("content-list");

    if (body && (content || content_list)) {
        var footer = document.createElement("div");
        footer.className = "align-center";
        footer.id = "footer-link";
        footer.innerHTML = "<a href='/'><img src='/img/icon/icon-32.png' alt='Home'/></a>" +
                            "<a href='https://github.com/mfcc64' rel='noopener' target='_blank'>" +
                                "<img src='/img/icon/github-mark-light-32.png' alt='GitHub'/>" +
                            "</a>";

        var path = location.pathname.substring(1) + "???";
        var content_index = parseInt(path, 10);
        if (isNaN(content_index))
            content_index = -1;

        var prev_index = 0;
        var next_index = post_info.count - 1;

        if (content_index >= 0 && content_index < post_info.count) {
            prev_index = (content_index + post_info.count - 1) % post_info.count;
            next_index = (content_index + 1) % post_info.count;
        }

        var prev_base = get_base_url(prev_index);
        var next_base = get_base_url(next_index);

        function append_arrow(dir, base, json) {
            var div = document.createElement("div");
            var alt = (dir == "left") ? "Prev" : "Next";
            div.style.position = "fixed";
            div.style[dir] = 0;
            div.style.bottom = 0;
            div.innerHTML = "<a href='/" + base + "/" + json.file + "'>" +
                            "<img src='/img/icon/arrow-" + dir + "-32.png' alt='" + alt + "'/>" +
                            "</a>";
            footer.appendChild(div);
        }
        load_manifest(prev_base, function(json) { append_arrow("left", prev_base, json); });
        load_manifest(next_base, function(json) { append_arrow("right", next_base, json); });

        body.appendChild(footer);
        if (content_list)
            include_js("/js/content-list.js", true);
    } else {
        setTimeout(default_layout, 30);
    }
}

default_layout();
