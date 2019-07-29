
(function(){
    var body = document.body;
    var footer = document.createElement("div");
    footer.className = "align-center";
    footer.id = "footer-link";
    footer.innerHTML = "<a href='/'><img src='/img/icon/icon-32.png' alt='Home'/></a>" +
                       "<a href='https://github.com/mfcc64' target='_blank'><img src='/img/icon/github-mark-light-32.png' alt='GitHub'/></a>";
    body.appendChild(footer);
})();
