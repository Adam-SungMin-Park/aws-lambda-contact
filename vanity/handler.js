'use strict';

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region:'us-west-2'});

module.exports.hello = async (event, context, callback) => {
  const requestId = context.awsRequestId;
  const number = event['Details']['ContactData']['CustomerEndpoint']['Address']

  console.log(number)
  await createNumber(requestId,number).then(()=>{
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

function createNumber(requestId,number){
    const params = {
      TableName : 'VANITY_NUMBER',
      Item : {
        'numberId': requestId,
        'customerNumber' : number
      }
    }
    return ddb.put(params).promise();
}
