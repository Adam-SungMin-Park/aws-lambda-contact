'use strict';

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region:'us-west-2'});

module.exports.hello = async (event, context, callback) => {
  const requestId = context.awsRequestId;

  await createNumber(requestId).then(()=>{
    callback(null, {
      statusCode: 201,
      body:'',
      headers: {
        'Access-Control-Allow-Origin' : '*'
      }
    })
  }).catch((err)=>{
    console.error("error is" + err)
  });

};

function createNumber(requestId){
    const params = {
      TableName : 'VANITY_NUMBER',
      Item : {
        'numberId': requestId
      }
    }
    return ddb.put(params).promise();
}
