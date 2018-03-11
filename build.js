var fs = require('fs');
const hbs = require('handlebars')

// Load Data from JSON
const letters = require('./_data/letters')
const pages = require('./_data/pages')
const roots = require('./_data/roots')

// Load Template and Partial Files
const index     = fs.readFileSync('index.hbs', 'utf8')
const head      = fs.readFileSync('_partials/head.hbs', 'utf8')
const nav       = fs.readFileSync('_partials/nav.hbs', 'utf8')
const page_nav  = fs.readFileSync('_partials/page-nav.hbs', 'utf8')

// Precompile the Navigateion (cuts compile in half)
let n = hbs.compile(nav)
const nav_compiled = n({roots:roots, letters:letters})

// Register Partials
hbs.registerPartial('head', head)
hbs.registerPartial('page-nav', page_nav)
hbs.registerPartial('nav', nav_compiled)

// Compile the main template
let template = hbs.compile(index)

// Write out Each Page to its Section
fs.mkdirSync('dist/api/')
pages.forEach(page => {
    let data = { page: page, letters: letters, roots: roots }
    let output = template(data)
    
    // Write title to the root index
    if(page.section == 'title'){
        fs.writeFileSync(`dist/index.html`, output)
        fs.writeFileSync(`dist/api/index.json`, JSON.stringify(page))
    } else {
        fs.writeFileSync(`dist/${page.section}-${page.id}.html`, output)
        fs.writeFileSync(`dist/api/${page.section}-${page.id}.json`, JSON.stringify(page))
    }
})

