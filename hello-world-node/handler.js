'use strict';

module.exports.hello = async (event) => {
  if(event === undefined){
    return ""
  }
    let phoneNumber=[];
    while(phoneNumber.length < 10){
      phoneNumber.push(Math.floor(Math.random()*10));

    }
    return phoneNumber.join('');

};
