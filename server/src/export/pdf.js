import report from 'jsreport-core';
import fs from 'fs';

function PDFRenderer() {
    this.pdf = {
        template: {
            content: 'localhost:3000/resources/pdf.html',
            engine: 'handlebars',
            recipe: 'chrome-pdf',
            helpers: String(calcPoints)
        },
        data: {},
        name: 'abc'
    };
    this.renderer = report({
        'extensions': {
            'assets': {
                // wildcard pattern for accessible linked or external files
                allowedFiles: '**.css',
                // enables access to files not stored as linked assets in jsreport store
                searchOnDiskIfNotFoundInStore: false,
                // root url used when embedding assets as links {#asset foo.js @encoding=link}
                rootUrlForLinks: 'localhost:3000/resources',
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
            // TODO send via buffer or stream
            fs.writeFileSync('output/' + this.pdf.name + '.pdf', response.content);
            res.download('output/' + this.pdf.name + '.pdf');
        }).catch((e) => {
            console.error(e);
        });
    }).catch((e) => {
        console.error(e);
    });
};

export default PDFRenderer;