
function get_base_url(num) {
    var num_txt = "" + num;
    while (num_txt.length < 7)
        num_txt = "0" + num_txt;
    return num_txt;
}

function load_manifest(base_url, callback) {
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

            if (json && json.title && json.file && json.preview)
                callback(json);
        } else if (xhr.readyState === 4) {
            console.error("Error while loading /" + base_url + "/manifest.json");
        }
    }

    xhr.send();
}
