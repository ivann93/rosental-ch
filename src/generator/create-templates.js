let ejs = require('ejs');
const fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);

const sites = [
    {name: 'our-mission', template: 'default'},
    {name: 'ingredients-policy', template: 'default'},

    {name: 'sternzeichen-fische', template: 'starsign'},
    {name: 'sternzeichen-wassermann', template: 'starsign'},
    {name: 'sternzeichen-steinbock', template: 'starsign'},
    {name: 'sternzeichen-widder', template: 'starsign'},
    {name: 'sternzeichen-stier', template: 'starsign'},
    {name: 'sternzeichen-zwillinge', template: 'starsign'},
    {name: 'sternzeichen-krebs', template: 'starsign'},
    {name: 'sternzeichen-loewe', template: 'starsign'},
    {name: 'sternzeichen-jungfrau', template: 'starsign'},
    {name: 'sternzeichen-waage', template: 'starsign'},
    {name: 'sternzeichen-skorpion', template: 'starsign'},
    {name: 'sternzeichen-schuetze', template: 'starsign'},
]; 

const createSection = async ({name, template}) => {
    const siteName = name;
    let sectionName = 'page-template';
    if (siteName != 'default') { 
        sectionName = 'page-' + siteName;
    }
 
    const data = {
        sectionName: sectionName,
        dateCreated: new Date()
    };
    const options = {
        async: false
    }; 
    const filename = `${appDir}/liquid/section-${template}.liquid`
    console.log(filename)

    await ejs.renderFile(filename, data, options, async function(err, str){
        //console.log(filename, siteName, str); 
        const {sectionName} = data

        await fs.writeFile(`${appDir}/../../shopify/sections/${sectionName}.liquid`, str, function (err) {
            if (err) return console.log(err);
            console.log("Section generated:", sectionName);
        });
    });
} 

const createTemplate = async ({name, template}) => {
    const siteName = name;
    let sectionName = 'page-template'; 
    let templateName = 'page';
    if (siteName != 'default') {
        sectionName = 'page-' + siteName;
        templateName = 'page.' + siteName;
    }

    const data = {
        sectionName: sectionName,
        templateName: templateName,
        dateCreated: new Date()
    };
    const options = {
        async: false
    }; 
    const filename = `${appDir}/liquid/page-${template}.liquid`

    await ejs.renderFile(filename, data, options, async function(err, str){
        //console.log(filename, siteName, str);
        const {sectionName, templateName} = data

        fs.writeFile(`${appDir}/../../shopify/templates/${templateName}.liquid`, str, function (err) {
            if (err) return console.log(err);
            console.log("Page generated:", templateName);
        }); 
    });
}

sites.forEach(async (site) => { 
    createSection(site);
    createTemplate(site);
});