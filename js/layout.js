
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
        body.appendChild(footer);
        if (content_list)
            include_js("/js/content-list.js", true);
    } else {
        setTimeout(default_layout, 30);
    }
}

default_layout();
