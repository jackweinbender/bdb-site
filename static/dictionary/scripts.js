document.onclick = function (e) {
    e = e ||  window.event;
    var element = e.target || e.srcElement;

    if (element.classList.contains('root-link')) {
        var url_params = element.href.split('page/')[1].split('/?root=')
        var page = url_params[0]
        var root = url_params[1]

        swapPageImage(page);
        setNewURL(page, root)
        selectRoot(element.parentElement)
        return false;
    }
  };

function setNewURL(page, root){
    var url = '/page/' + page + '/?root=' + root
    window.history.pushState(null, null, url);
}

function swapPageImage(page) {
    var new_src = '/static/dictionary/pages/' + page + '_original.png'
    var img = document.querySelectorAll('.page-img img')
        .forEach(function(img){ img.src = new_src })
}

function selectLetter(elem) {
    var x = document.querySelectorAll('.active-letter')
        .forEach(function(el) { el.classList.remove('active-letter') });
    elem.classList.add('active-letter');
}

function selectRoot(elem) {
    var x = document.querySelectorAll('.active-root')
        .forEach(function(el) { el.classList.remove('active-root') });
    elem.classList.add('active-root');
}