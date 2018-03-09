var fs = require('fs');
const hbs = require('handlebars')

// Load Data from JSON
const letters = require('./letters')
const pages = require('./pages')
const roots = require('./roots')

// Load Template and Partial Files
const index     = fs.readFileSync('index.hbs', 'utf8')
const head      = fs.readFileSync('partials/head.hbs', 'utf8')
const nav       = fs.readFileSync('partials/nav.hbs', 'utf8')
const page_nav  = fs.readFileSync('partials/page-nav.hbs', 'utf8')

// Precompile the Navigateion (cuts compile in half)
let n = hbs.compile(nav)
const nav_compiled = n({roots:roots, letters:letters})

// Register Partials
hbs.registerPartial('head', head)
hbs.registerPartial('page-nav', page_nav)
hbs.registerPartial('nav', nav_compiled)

// Compile the main template
let template = hbs.compile(index)

// Write out Each Page
pages.forEach(page => {
    let data = { page: page, letters: letters, roots: roots }
    let output = template(data)
    fs.mkdirSync(`dist/page/${page.id}/`)

    fs.writeFile(`dist/page/${page.id}/index.html`, output, (err) => {
        if (err) throw err
    });
})

