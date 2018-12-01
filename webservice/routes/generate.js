var express = require('express');
var router = express.Router();

const puppeteer = require('puppeteer');
const fse = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');

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
            var html = await compileTemplate(templateName, resumeJson);
            res.end(html);
        } else if (fileType === 'pdf') {
            const data = await generatePdf(templateName, resumeJson);
            res.writeHead(200, {'Content-Type': 'application/pdf'});
            res.end(data, 'binary');
        } else if (fileType === 'json'){
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(resumeJson));
        } else {
            res.status(404).end('File type not found.');
        }
    } catch(e) {
        res.status(500).end('The following error occurred:' + e);
    }
});

module.exports = router;