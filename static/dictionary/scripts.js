function selectLetter(elem) {
    var x = document.querySelectorAll('.active-letter')
        .forEach(function(el) { el.classList.remove('active-letter') });
    elem.classList.add('active-letter');
}