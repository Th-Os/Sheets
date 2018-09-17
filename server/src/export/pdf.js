import report from 'jsreport-core';

function PDFRenderer() {
    this.pdf = {
        template: {
            content: 'localhost:' + process.env.PORT + '/resources/pdf.html',
            engine: 'handlebars',
            recipe: 'chrome-pdf',
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
}

function calcPoints(exercise) {
    let points = 0;
    for (let task of exercise.tasks) {
        points += task.points;
    }
    return points;
}

PDFRenderer.prototype.html = function(html) {
    this.pdf.template.content = html;
    return this;
};

PDFRenderer.prototype.data = function(data) {
    this.pdf.data = data;
    return this;
};

PDFRenderer.prototype.name = function(name) {
    this.pdf.name = name;
    return this;
};

PDFRenderer.prototype.addHelper = function(helper) {
    this.pdf.template.helpers += String(helper);
    return this;
};

PDFRenderer.prototype.send = function(res) {
    this.renderer.init().then(() => {
        this.renderer.render({
            template: this.pdf.template,
            data: this.pdf.data
        }).then((response) => {
            res.writeHead(200, {'Content-Type': 'application/pdf'});
            res.end(response.content, 'binary');
        }).catch((e) => {
            console.error(e);
        });
    }).catch((e) => {
        console.error(e);
    });
};

export default PDFRenderer;