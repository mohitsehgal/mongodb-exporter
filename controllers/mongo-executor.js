'use strict'

const MongoClient = require('mongodb').MongoClient;

exports.executeFindQuery = async function(params){
    let connection;
  try{
    const {connectionString,dbName,collection,query,projection,sort,skip,limit} = params;
    const client = new MongoClient(connectionString,{ useUnifiedTopology: true });
    connection = await client.connect();
  
    console.log('query',JSON.parse(query));
    let findQuery = client.db(dbName).collection(collection).find(JSON.parse(query));

    if(projection)
    findQuery= findQuery.project(projection)

    if(sort)
    findQuery= findQuery.sort(JSON.parse(sort))

    if(skip)
    findQuery= findQuery.skip(skip)

    if(limit)
    findQuery= findQuery.limit(limit)

    console.log('findQuery' ,findQuery)
    const result  = await findQuery.toArray();
    return result;
  }catch(e){
    throw e;
  }
  finally{
    if(connection){
        await connection.close();
        console.log('Connection Closed')
    }
  }


}

exports.executeAggregateQuery = async function(params){
    let connection;
    try{
      const {connectionString,dbName,collection,query} = params;
      const client = new MongoClient(connectionString,{ useUnifiedTopology: true });
      connection = await client.connect();
      const result  = await client.db(dbName)
      .collection(collection)
      .aggregate(JSON.parse(query))
      .toArray();
  
      return result;
    }catch(e){
      throw e;
    }
    finally{
      if(connection){
          await connection.close();
          console.log('Connection Closed')
      }
    }
}