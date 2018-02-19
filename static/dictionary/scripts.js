window.onload = function(e){
    var url_params = location.href.split('page/')[1].split('/?root=')
    if (url_params.length > 1){
        var page = url_params[0]
        var root = url_params[1]

        selectRoot(root)
    }
}

document.onclick = function (e) {
    e = e ||  window.event;
    var element = e.target || e.srcElement;

    if (element.classList.contains('root-link')) {
        var url_params = element.href.split('page/')[1].split('/?root=')
        var page = url_params[0]
        var root = url_params[1]

        goto_page(page, root)
        selectRoot(root)
        return false;
    }
    if (element.classList.contains('letter')) {
        selectLetter(element)
        return false;
    }
    if (element.classList.contains('next') || element.classList.contains('prev')) {
        var page = element.href.split('page/')[1].split('/')[0]
        goto_page(page, false)
        return false;
    }
  };

function goto_page(page, root){
    swapPageImage(page)
    setNext(page)
    setPrev(page)
    setNewURL(page, root)
}

function setNext(page){
    var next_page = (parseInt(page, 10) + 1) % 1118
    var new_next = '/page/' + next_page + '/'
    var next = document.querySelectorAll('.next')
        .forEach(function(n){ n.href = new_next })
}
function setPrev(page){
    var new_prev;
    if(page === '1'){ 
        new_prev = page
    } else {
        new_prev = parseInt(page, 10) - 1
    }
    var new_prev = '/page/' + new_prev + '/'
    var prev = document.querySelectorAll('.prev')
        .forEach(function(n){ n.href = new_prev })
}

function setNewURL(page, root){
    var url = '/page/' + page
    if(root){
        url += '/?root=' + root
    }
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

function selectRoot(root_num) {
    id = 'root_' + root_num
    var x = document.querySelectorAll('.active-root')
        .forEach(function(el) { el.classList.remove('active-root') });
    document.getElementById(id).classList.add('active-root');
}