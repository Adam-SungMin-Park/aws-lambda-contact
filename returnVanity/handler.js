'use strict';

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region:'us-west-2'});

module.exports.vanityReturn = async (event, context, callback) => {
  const number = event['Details']['ContactData']['CustomerEndpoint']['Address']
  //after it receives the result of the query, it will show only 3 out of 5 options, hence res.Item.vanity.splice(0,3)

  await queryVanity(number).then((res)=>{
   callback(null, {
      statusCode: 201,
      body:res.Item.vanity.splice(0,3),
      headers: {
        'Access-Control-Allow-Origin' : '*'
      }
    })
  }).catch((err)=>{
    console.error("err is" + err)
  });
};
//I have created a query to look up the phone number within the database. In my amazon contact flow,
//saving the phone number with 5 best vanity numbers happens first, and searching happens second.
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
