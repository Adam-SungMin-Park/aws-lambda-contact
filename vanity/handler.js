'use strict';

const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region:'us-west-2'});

module.exports.vanity = async (event, context, callback) => {
  //I needed to first extract the customer's number from the event.
  const number = event['Details']['ContactData']['CustomerEndpoint']['Address']
  const rawNum = number.slice(2);
  let vanityNumArray =[];
  let vanityNum = "";
  //I wasn't so sure how to define "best", so I decided to pick 5 randomized vanity numbers and store them in to the array.
  for(let j = 0 ; j < 5; j++){
    for(let i = 0 ; i < rawNum.length; i++){
      if(rawNum[i]==="1"){
        let random = Math.floor(Math.random()*2);
        if(random === 1){
          vanityNum += "A"
        }else{
          vanityNum +="K"
        }
      }
      if(rawNum[i]==="2"){
        let random = Math.floor(Math.random()*2);
        if(random === 1){
          vanityNum += "B"
        }else{
          vanityNum +="L"
        }
      }
      if(rawNum[i]==="3"){
        let random = Math.floor(Math.random()*2);
        if(random === 1){
          vanityNum += "C"
        }else{
          vanityNum +="M"
        }
      }
      if(rawNum[i]==="4"){
        let random = Math.floor(Math.random()*2);
        if(random === 1){
          vanityNum += "D"
        }else{
          vanityNum +="N"
        }
      }
      if(rawNum[i]==="5"){
        let random = Math.floor(Math.random()*2);
        if(random === 1){
          vanityNum += "F"
        }else{
          vanityNum +="O"
        }
      }
      if(rawNum[i]==="6"){
        let random = Math.floor(Math.random()*2);
        if(random === 1){
          vanityNum += "F"
        }else{
          vanityNum +="P"
        }
      }
      if(rawNum[i]==="7"){
        let random = Math.floor(Math.random()*2);
        if(random === 1){
          vanityNum += "G"
        }else{
          vanityNum +="Q"
        }
      }
      if(rawNum[i]==="8"){
        let random = Math.floor(Math.random()*2);
        if(random === 1){
          vanityNum += "H"
        }else{
          vanityNum +="R"
        }
      }
      if(rawNum[i]==="9"){
        let random = Math.floor(Math.random()*2);
        if(random === 1){
          vanityNum += "I"
        }else{
          vanityNum +="S"
        }
      }
      if(rawNum[i]==="0"){
        let random = Math.floor(Math.random()*2);
        if(random === 1){
          vanityNum += "J"
        }else{
          vanityNum +="T"
        }
      }
    }
  vanityNumArray.push(vanityNum);
  vanityNum =""
  }
  await createNumber(number,vanityNumArray).then(()=>{
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
  //once I have created the vanity numbers, I made 'PUT' request to the database in order to save the info.
function createNumber(number,vanityNumArray){
    const params = {
      TableName : 'VANITY_NUMBERS',
      Item : {
        'customerNumber' : number,
        'vanity' :vanityNumArray
      }
    }
    return ddb.put(params).promise();
}
