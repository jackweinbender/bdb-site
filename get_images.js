const gm = require('gm');
const fs = require('fs')
const pages = require('./_data/pages')
fs.mkdirSync('images')

pages.forEach(page => {
    let num = pad(page.emory_page, 4)
    let pagefile = `00825376_1523_${num}.jp2`
    console.log(pagefile)
    gm(`../bdb_raw/${pagefile}`)
        .resize(1024)
        .write(`images/${page.section}_${page.id}.png`, err => {
        if (err) console.log(err);
    });
})

function pad(int, total_len){
    var s = int+"";
    while (s.length < total_len) s = "0" + s;
    return s;
}