const axios = require( `axios`);
const baseURL = 'http://localhost:3000';

exports.postAggregateQuery = async function(params){
    return axios.post(baseURL+'/execute-mongo-query',params);
}