`use strict`
const { Parser } = require('json2csv');
const json2csvParser = new Parser({ unwindBlank: true, flatten: true, flattenSeparator: '__' });


exports.jsonToCSV = async function(jsonData){

    const csvData = json2csvParser.parse(jsonData);
    return csvData;
}