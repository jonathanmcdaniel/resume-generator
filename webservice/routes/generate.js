var express = require('express');
var router = express.Router();

const puppeteer = require('puppeteer');
const fse = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
var fs = require('fs');
const uuidv4 = require('uuid/v4');

global.Buffer = global.Buffer || require('buffer').Buffer;

if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str, 'binary').toString('base64');
    };
}

if (typeof atob === 'undefined') {
    global.atob = function (b64Encoded) {
        return new Buffer(b64Encoded, 'base64').toString('binary');
    };
}

const compileTemplate = async function(template, data) {
    const file = path.join(process.cwd(), 'views', 'templates', `${template}.hbs`);
    const html = await fse.readFile(file, 'utf-8');
    return hbs.compile(html)(data);
}

const generatePdf = async function(templateName, resumeInformation){
    var retVal = null
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const content = await compileTemplate(templateName, resumeInformation);

        await page.setContent(content);
        await page.emulateMedia('screen');
        const pdfBuffer = await page.pdf({
            format: 'Letter',
            printBackground: true
        });
        await browser.close();
        retVal = pdfBuffer;
    } catch(e) {
        console.error(e);
        throw e;
    }
    return retVal;
};

router.post('/:templateName/:fileType', async function(req, res, next) {
    var fileType = req.params['fileType'];
    var templateName = req.params['templateName'];
    var resumeJson = req.body || {};
    try {
        if (fileType === 'html'){
            res.writeHead(200, {'Content-Type': 'application/html'})
            var html = await compileTemplate(templateName, resumeJson);
            res.end(html);
        } else if (fileType === 'pdf-online') {
            const data = await generatePdf(templateName, resumeJson);
            var fileName = uuidv4().toString();
            var url = "public/" + fileName + ".pdf";
            fs.writeFile(url, data,  "binary",function(err) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("The file was saved!");
                }
            });
            var jsonData = {
                "pdfUrl": fileName + ".pdf"
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(jsonData));
        } else if (fileType === 'json'){
            res.setHeader('Content-Type', 'application/json');
            const data = await generatePdf(templateName, resumeJson);
            var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(data)));
            var jsonData = {
                "pdf": base64String
            }
            res.end(JSON.stringify(jsonData));
        } else {
            res.status(404).end('File type not found.');
        }
    } catch(e) {
        res.status(500).end('The following error occurred:' + e);
    }
});

module.exports = router;