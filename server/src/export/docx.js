/* import report from 'jsreport-core';
import docx from 'jsreport-html-embedded-in-docx';

function DOCXRenderer() {
    this.docx = {
        template: {
            content: 'localhost:' + process.env.PORT + '/resources/template.html',
            engine: 'handlebars',
            recipe: 'html',
            helpers: String(calcPoints)
        },
        data: {},
        name: 'output'
    };
    this.renderer = report({
        'extensions': {
            'assets': {
                // wildcard pattern for accessible linked or external files
                allowedFiles: '**.css',
                // enables access to files not stored as linked assets in jsreport store
                searchOnDiskIfNotFoundInStore: false,
                // root url used when embedding assets as links {#asset foo.js @encoding=link}
                rootUrlForLinks: 'localhost:' + process.env.PORT + '/resources',
                // make all assets accessible to anonymous requests
                publicAccessEnabled: true
            }
        }
    });
};

function calcPoints(exercise) {
    let points = 0;
    for (let task of exercise.tasks) {
        points += task.points;
    }
    return points;
}

DOCXRenderer.prototype.html = function(html) {
    this.docx.template.content = html;
    return this;
};

DOCXRenderer.prototype.data = function(data) {
    this.docx.data = data;
    return this;
};

DOCXRenderer.prototype.name = function(name) {
    this.docx.name = name;
    return this;
};

DOCXRenderer.prototype.addHelper = function(helper) {
    this.docx.template.helpers += String(helper);
    return this;
};

DOCXRenderer.prototype.send = function(res) {
    this.renderer.init().then(() => {
        this.renderer.render({
            template: this.docx.template,
            data: this.docx.data
        }).then((response) => {
            let jsreport = report();
            jsreport.use(docx());

            jsreport.init().then(() => {
                jsreport.render({
                    template: {
                        content: response.content.toString('utf8'),
                        recipe: 'html-embedded-in-docx',
                        engine: 'none'
                    }
                }).then((response) => {
                    res.writeHead(200, {'Content-Type': 'application/vnd.openxmlformats-officedocument. wordprocessingml.document'});
                    res.end(response.content, 'binary');
                });
            });
        }).catch((e) => {
            console.error(e);
        });
    }).catch((e) => {
        console.error(e);
    });
};
*/
import officegen from 'officegen';

function DOCXRenderer() {
    this.docx = officegen({
        'type': 'docx',
        'title': '',
        'author': 'Sheets Team',
        'subject': '',
        'keywords': '',
        'description': ''
    });

    this.docx.on('finalize', function(written) {
        console.log('Finish to create Word file.\nTotal bytes created: ' + written + '\n');
    });
    this.docx.on('error', function(err) {
        console.log(err);
    });
}

DOCXRenderer.prototype.addHeader = function() {
    this.docx.getHeader().createP().addText('This is the header');
    return this;
};

DOCXRenderer.prototype.add = function() {
    this.docx.createP().addText('hello');
    return this;
};

DOCXRenderer.prototype.send = function(res) {
    res.writeHead(200, {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.documentml.document',
        'Content-disposition': 'attachment; filename=test.docx'
    });
    this.docx.generate(res);
};

export default DOCXRenderer;
