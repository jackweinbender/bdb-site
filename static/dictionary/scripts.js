window.onload = function(e){
    var url_params = location.href.split('page/')
    if (url_params.length > 1){
        url_params = url_params[1].split('/?root=')

        if (url_params.length > 1){
            var page = url_params[0].replace('/', '')
            var root = url_params[1]

            goto_page(page, root)
        }
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
    setActive(page, root)
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
        new_prev = 1118
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
function setActive(page, root_num){
    console.log(page, root_num)
    var root_id
    if(root_num){
        root_id = 'root_' + root_num
    } else {
        root_id = get_first_root_by_page(page).id
    }
    letter = document.getElementById(root_id).closest('.letter')
    selectRoot(root_id)
    selectLetter(letter)
}

function get_first_root_by_page(page){
    page = parseInt(page, 10)
    if (page < 1) {
        return document.querySelector('.root[data-page="1"]')
    }
    selector = ".root[data-page='" + page + "']"
    root = document.querySelector(selector)
    if (!root) {
        root = get_first_root_by_page(page - 1)
    }
    return root
}

function selectLetter(elem) {
    var x = document.querySelectorAll('.active-letter')
        .forEach(function(el) { el.classList.remove('active-letter') });
    elem.classList.add('active-letter');
}

function selectRoot(root_id) {
    document.querySelectorAll('.active-root')
        .forEach(function(el) { el.classList.remove('active-root') });
    var x = document.getElementById(root_id)
    x.classList.add('active-root');
}