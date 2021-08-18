# aws-lambda-VoiceFoundry

### Contact Number : 207-770-4050

## Implementation

Basic outline of my approach is: 

  - Invoke Lambda function whenever there is a call made to the Contact Number
  - Extract the incoming number by using event parameter of the function
  - Using customer's phone number to generate five "best" (in my case, randomized) vanity numbers
      -this was done by my first Lambda function inside "vanity" folder
  - Save the original number with vanity numbers
  - look up the phone number from the database and return 3 vanity possibilities
      -"returnVanity"

## Obstacles

To be frank, this was my first time coding with AWS services, everything was new to me. With that being said, the first obstacle was for me to actually understand the concept of what the objective for this assessment were. 

I had to read a lot of AWS documentations just so I can have some understanding of the concept of AWS services. After reading, I would utilize YouTube, Udemy and LinkedIn learning to watch how people actually use AWS services in order to make a real world example.
Having some basic setup ready to go for the project, I wrote down all the objectives I needed to tackle in order to achieve the goal. 

My first big technical difficulty was how to invoke Lambda function by calling the number. I realized that I needed to add my Lambda function to the Amazon Connect from AWS console, and use that function from contact flow so that everytime it receives the call, it will invoke the function. 

After that, I needed to save those incoming numbers from the event. I learned this from AWS documentation. 

Most of my difficulties were solved from reading the documentations and watching videos of other people making an example.

## Shortcuts

  - Randomly saving vanity numbers.
    - Definitely feels like there could be a duplicate issue once the scale of the database is large. (at the moment, having a two exact same vanity number is 1 /  2^10)
  - minimal database structure.
  - minimal design for the Contact Flow.
    - Could be designed better which could improve user experience / user interaction.


## Improvements

As I mentioned in the Shortcuts section, if I had more time, I would study more on the concepts and logics of Lambda function, DynamoDB and Contact Flow so that I can understand more fully about this problem. 
After that, I would also consider more about what could be the "best" way to set an algorithm when generating vanity numbers. My current method of generating vanity number could be prone to bugs so I would definitely want to change the logic for this part. My contact flow does not have much components into it, other than invoking the Lambda functions. I think I did not fully utilize the purpose of Contact Flow which could greatly improve user interaction with the business/product.








