'use strict';

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region:'us-west-2'});

module.exports.hello = async (event, context, callback) => {
  const requestId = context.awsRequestId;
  const number = event['Details']['ContactData']['CustomerEndpoint']['Address']
  let vanityNumberArray = [];
  let vanityNum =""
  const rawNum = number.split(1)[1];
  //rawNum = 7144036969
  for(let i = 0 ; i < rawNum.length; i++){
    console.log(rawNum[i])

  }


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
