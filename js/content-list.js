
(function(){
    function get_base_url(num) {
        var num_txt = "" + num;
        while (num_txt.length < 7)
            num_txt = "0" + num_txt;
        return num_txt;
    }

    var idx = 0;
    var idx_table = [];

    function gen_idx_table() {
        var idx_table_used = [];
        var idx_table_weight = [];

        for (var m = 0; m < post_info.count; m++)
            idx_table_used[m] = false;

        for (var m = 0; m < post_info.important.length; m++) {
            idx_table[m] = post_info.important[m];
            idx_table_used[idx_table[m]] = true;
        }

        var cur_weight = post_info.count;
        for (var m = post_info.count - 1; m >= 0; m--) {
            for (var n = 0; n < cur_weight; n++)
                idx_table_weight.push(m);
            cur_weight = Math.round(0.74*cur_weight);
        }

        for (var m = post_info.important.length; m < Math.min(300, post_info.count); m++) {
            for (;;) {
                var rnd_idx = Math.floor(Math.random() * (idx_table_weight.length - 0.001));
                if (!idx_table_used[idx_table_weight[rnd_idx]]) {
                    idx_table[m] = idx_table_weight[rnd_idx];
                    idx_table_used[idx_table[m]] = true;
                    break;
                }
            }
        }
    }
    gen_idx_table();

    function append_link() {
        var base_url = get_base_url(idx_table[idx]);
        var container = document.createElement("div");
        container.id = "content-list-" + base_url;
        document.getElementById("content-list").appendChild(container);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/" + base_url + "/manifest.json", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText) {
                var json = null;
                try {
                    json = JSON.parse(xhr.responseText);
                } catch (err) {
                    console.error(err);
                }
                if (json && json.title && json.file && json.preview) {
                    var inner = "<h2>" + json.title + "</h2>" + json.preview.join(" ") +
                                "<p><a href=\"/" + base_url + "/" + json.file + "\">Read more...</a>" +
                                "&#160;<a target='_blank' rel='noopener' href=\"/" + base_url + "/" + json.file +
                                "\">Read more in new tab...</a></p>";
                    container.innerHTML = inner;
                    if (window.MathJax && MathJax.Hub)
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, container]);
                }
            } else if (xhr.readyState === 4) {
                console.error("Error while loading /" + base_url + "/manifest.json");
            }
        }

        xhr.send();
        idx++;
        if (idx < idx_table.length)
            window.setTimeout(append_link, 300);
    }
    append_link();

})();

