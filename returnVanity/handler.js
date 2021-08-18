'use strict';

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region:'us-west-2'});

module.exports.vanityReturn = async (event, context, callback) => {
  const number = event['Details']['ContactData']['CustomerEndpoint']['Address']
  let result;
  await queryVanity(number).then((res)=>{
   result = res.Item.vanity.splice(0,3);

  }).catch((err)=>{
    console.error("err is" + err)
  });

  return result;
};

function queryVanity(number){
  const params = {
      TableName: "VANITY_NUMBERS",
      Key: {
        "customerNumber" : number,
      },
      KeyConditionExpression : "customerNumber = :n ",
      ProjectionExpression: "vanity",
      ExpressionAttributeValues:{
        ":n" : number
      }
    }
     return ddb.get(params).promise();
}
