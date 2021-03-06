'use strict'

const assert = require('assert');
let databasesList;
const MongoExecutor = require('./mongo-executor');
const CSVHelper = require('./csv-helper');




exports.exportMongoQuery = async function(req,res){
    let {connectionString, dbName, collection, mode,query,sort,skip,limit} = req.body;
    let result ={};
    let csvData;
    try{ 
     if(mode === 'find'){
         //todo validate body for find query
         result  = await MongoExecutor.executeFindQuery({
             connectionString,dbName,collection,query,sort,skip,limit
         });
         csvData = await CSVHelper.jsonToCSV(result);
         console.log(csvData)
         res.attachment('filename.csv');
         return res.send(Buffer.from(csvData));

        //  return res.json({
        //      csvData,
        //      status:1
        // })
     }else if(mode === 'aggregate'){
         //todo validate body for aggregate query
         result  = await MongoExecutor.executeAggregateQuery({
             connectionString,dbName,collection,query
         });
         csvData = await CSVHelper.jsonToCSV(result);
         console.log(csvData)
         res.attachment('filename.csv');
         return res.send(Buffer.from(csvData));

        //  return res.json({
        //      csvData,
        //      status:1
        // })
        
     }else{
        return  res.json({
             message:"Invalid Mode ",
             status:0
        })
     }
    }catch(e){
          res.json({
          message:"Unable to fetch Data due to "+e.toString(),
          status:0
     })
     
    }
 };

exports.executeMongoQuery = async function(req,res){
   let {connectionString, dbName, collection, mode,query,sort,skip,limit} = req.body;
   let result ={};
   try{ 
    if(mode === 'find'){
        //todo validate body for find query
        result  = await MongoExecutor.executeFindQuery({
            connectionString,dbName,collection,query,sort,skip,limit
        });
        return res.json({
            result,
            status:1
       })
    }else if(mode === 'aggregate'){
        //todo validate body for aggregate query
        result  = await MongoExecutor.executeAggregateQuery({
            connectionString,dbName,collection,query
        });
        return res.json({
            result,
            status:1
       })
       
    }else{
       return  res.json({
            message:"Invalid Mode ",
            status:0
       })
    }
   }catch(e){
         res.json({
         message:"Unable to fetch Data due to "+e.toString(),
         status:0
    })
    
   }
};