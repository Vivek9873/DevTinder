# Software Engineering Water Fall Model

Requirement
Design
Development
Testing
Deployment
Maintainance

# How projects build in big companys

- First of all define the requirement of Devtinder or project
  Project Manager to define the requirement of the project
- What is the tech stack
- WHose is the audience
- In small startup CEo do this job
- Project Manager takes help from designer to create the UI mocks
- In requirement we got a overview how will our ui would look like

- Second is Design
- This is not the UI design
- This is the responsibily of senior engineer and tech lead engineer manager to make the design document. Deciding which techstack will be used, monolith or microstructure, High level design, Low level design

- THird Development
- Sde1, sde2, interns involves in this phase
- Writing test cases is the part of test cases / unit test cases

- Testing phase
- SDET --> software developer engineer tester, test the application thoroughly
- Some company don't have testing team so developers have to write the test cases and test the application

- Deployment
- DevOps engineer team take care of deployment. It is also done by developers or testing team if devops are not present / Managing server and all

- Maintainance
- It is like following the whole cycle again like building a new functionality

- In small startups 2-3 developers do all these things

# Monlith vs Microservices

- Monolith means we have one big single project. It does everything backend, database connection, frontend, authentication, Emails services, Analytics, notification services
- On big repo and lot of developers work on same repo
- Same and big codebase

# Service , project , application are all same

- Microservice is very small service and it has only one job. A microservice only for frontend,
  only for backend
- only for analytics
- only for email services
- Build small small applications and there can be a separate whose is maintaining the for that particular application
- Only for fraud detection
- Only for invoices and billing
- They have their own backend, own dashboard

- Companies are moving towards microservices. As it give a lot of flexibility

# Parameters of Monolith vs Microservices

- Dev Speed --->
  Monolith has slower dev speed as compared to microservices
  as many people are working on same repo, sometimes it is difficult to build frontend and backend parallely but micro it is easier

- Code Repo ---> Monolith has single code repo, whrere in microservices has multiple code repo

- Scalability ---> In start ups monolith can scale easily but in bigger companies its become difficult to scale the project. Easier in microservices

- Deployment --> In monolith we have to deploy the whole code which takes a lot of time. Even if there is a small change in line we have to deploy the whole code. But in microservices if there is different version of backend and frontend then it can cause issue.

- Tech Stack ---> IN monolith we are resticted in techstack. For eg for admin dashboard student dashboard we have to use single techstack like react. But in microservices we can use differrent techstack for different services.

- Infra cost --> Infra cost lower in monolith. Microservices infra according to microservices 3 services for frontedn 4 servers for backend. Separate services have separate team, separate servers

- Complexity ---> Complexity is tough in microservices in simple projects. But in large projects monolith is tough

- Fault isolation --> if some code has a fault then the whole prject is go down in monolith but in microservices only that particular service go down

- Testing --> in monolith is easier
- Ownership --> different teams take ownership for different services in micro

- Maintainace --> easier to maintain micro
- Rewamps --> again microservices
- Debugging --> can be tough in both. Blame games can happen in microservices
  monolith can be slightly easier

- Dev Experience ---> Love microservices.

# What happens in NamasteDev.com

- Student Web in next.js
- Admin web in Reactjs
- Backend applicatoin --> nodejs talks to admin and student 3 micorservices
- For student mobile application -- REactnative to build this

# What are we going to build in DevTinder?

- Making 2 microservices in DevTinder
- Frontend --> React
- Backend --> Nodejs

# How frontend and backend communicate

- using api calls

# Requirements/Features Of Devtinder

- Tinder for developers
- Create Account
- Login
- Update your profile
- Feed page - explore page
- Send connection request
- See our matches
- See the request we have sent or recieved
- Update your profile

# Tech Planning hld

- hwo microsevice connect to each other which tech stack will be used

# Before writing code coders do LLD

- Database design
- Second imp thing Api design
- For mongodb table is collection
- Firstly User collection which contains firstname, lastname, email id, password, age, gender, etc
- For send connection request
- Connection Request - From Userid , to userId, status = pending

# RESTApi is a way to communicate to backend

# GET, POST,

- GET api used to get data from the service or fetch data
- POST api used to post the data
- PUT api used to update the data
- PATCH api also used to update the data
- DELETE api is used to delete the data

All these apis are HTTP method

- Another name is CRUD opeartions

# Coding Part

- We have create the project
- First create the server --> By express.js
- Listen on the server --> basically we are accepting the incoming request from outside world

- Express->>> fast unopinionated,minimalist web framework for nodejs
- After installing we get node-modules and package-lock.json

# Node Modules --> is a place where whenever we install the package gets the code of the package and put it in node modules so that we can use it

# dependency --> any package on which our project depend on and all the dependencies install in the node_modules

# Other folders in node_modules except our required package??? --> express library also has some dependencies and hence those dependencies's code also get installed in the node modules

# Package-lock.json ---> will tells the actual version of the package

# Package.json --> tell the noraml nomenclature

"express": "^5.1.0"
5 --> major
1 --> minor
0 --> patch

# Project starts from 1.0.0

- If you are doing very small bug fix or small change is known as patch the version increases from 1.0.1
- If express team release a new feature or minor feature they will change the version to 1.1.1.
  In this case things are still be backward compatible
- backward compatible -->
- When breaking chnages are there major bit changes
- ^ --> carat and ~ can also be used instead of ^
- ^--> is used so that our project gets upgraded whenever any new version of express comes in future but the updates must be minor and patch.
- If we don't put ^ our project will never update it
- ~ basically allows patch changes but not major and minor changes

# Whenever we go to any url we make a GET api call

# To test the backend code we have to use POSTMAN

# Regardign Routes and Some Advanced Routes concept

// code for handling the incoming requests
// app.use("/test",(req,res)=>{
// res.send("Hello from the server"); // whatever requests comes in we are giving same
// })

// // code for handling the incoming requests
// app.use("/hello",(req,res)=>{
// res.send("Hello Hello Hello"); // whatever requests comes in we are giving same
// })

// // code for handling the incoming requests
// app.use("/",(req,res)=>{
// res.send("Namaste Vivek!"); // whatever requests comes in we are giving same
// })

app.get("/abc",(req,res)=>{
res.send({"firstname":"VIvek","lastname":"Shamra"});
})
// this will print everything in send on get request or anyother request
// If i put ab?c then this will work for ab , abc here b is optional
// If i put a(bc)?d then this will work for abc , abcd, ad means bc is optional  
// If i put ab+c then this will work for abc, and anything that we like to add between ab and c For example abbbbbbbbdddddc also work
// If i put ab\*cd similar to ab+cd

// INstad of string we can provide Regex /a/ which means in the path if a letter is there then it will work

// Regex /.\*fly$/ means starts with anything but should end with fly it will work like butterfly, sfsfdlfly,

// Order of the route request matters a lot. For eg if app.use("/") is present at the top then at every routes after / gives the response of "/"
// Now in our cae we have put "/test" at top now if we try to go to page /test/... it will give test response.

# If we don't handle the request in .use() method then the browser or postman go to the infinite loop but after timeout it will stop

# req.query is an object which helps in accessing the values which are present in the url

http://localhost:3000/user?user_id=2&name=vivek

- therefore req.query.user_id will give 2 and req.query.name will give vivek

# req.params give url parameters

http://localhost:3000/user/vivek/sharma/2?user_id=2&name=vivek
in .use("/user/:name/:lastname/:id")
req.params.name = vivek, req.params.lastname = sharma, req.params.id = 2

# Multiple Route handlers

// We can make multiple route handlers
// app.use("/user",rh,rh2,rh3,rh4);
// if we wrap the all or some route handlers in an array then it will also give same output

- app.use("/user",(req,res,next)=>{
  // Route Handler
  // res.send("Route Handler")
  console.log("Handling the route user") // This will also make infinite loop
  res.send("Route Handler 1")
  next()

},(req,res,next)=>{
console.log("Handling the route user 2");
}) this will not give any error as we are not changing the header

- app.use("/user",(req,res,next)=>{
  // Route Handler
  // res.send("Route Handler")
  console.log("Handling the route user") // This will also make infinite loop
  res.send("Route Handler 1")
  next()

},(req,res,next)=>{
console.log("Handling the route user 2");
res.send("Route Handler 1")
}) this will give error after sending to client we are trying to set the header

# Another example of multiple route handler

app.use("/user",(req,res,next)=>{
// Route Handler
// res.send("Route Handler")
console.log("Handling the route user") // This will also make infinite loop
// res.send("Route Handler 1")
next();

},(req,res,next)=>{
console.log("Handling the route user 2");
// res.send("Route Handler 1")
next()
},(req,res,next)=>{
console.log("Handling the route user 2");
// res.send("Route Handler 1")
next()
},(req,res,next)=>{
console.log("Handling the route user 2");
// res.send("Route Handler 1")
next()
},(req,res,next)=>{
console.log("Handling the route user 2");
// res.send("Route Handler 5")
next()
})

// This will basically create an error in the postman as we are not setting the header

# Another way of multiple route handler is

app.use("/",(req,res,next)=>{
console.log("This is a middleware 1");
res.send("Middleware becomes route handler")
next();
})

app.get("/user",(req,res)=>{
console.log("This is the route handler");
res.send("This is user page")
})

- This will basically also works in the same way as we try to give multiple router handler in one request

# Middleware

- MIddleware is node js function similar to route handler but they didn't set the header which would be sent to the client. They act as a bridge between different applications, operating systems, and databases, enabling them to communicate and exchange data seamlessly.
- There is one example when we are to access the admin page but for that we shoudl authenticate whether the user is admin or not So instead of writing the code in all the route handler functions of admin we can make a middleware to check the admin auth in a separate file and can also send some data. And can use this middleware by importing them.

# example of middleware

app.use("/admin",(req,res,next)=>{
const token = "xyz";
if(token!=="xyz"){
res.status(401).send("Unauthorized user!")
}
else{
next();
}
})
app.get("/admin/portal",(req,res,next)=>{
console.log("AAgye raja ji");
res.send("Admin portal page")
// next();
})

# Error Handling

- It can be done by either try and catch block
- Another way is to put a errorHandler .use() at the end of routes which basically handle each and every type of error from any request

# Hashing password use bcrypt library which basically makes the hash password strong as we give more stronger salt number

# Authentication

- In authentication basically when a user login, user makes a request to server then the server provide a token in a cookie to the browser.
- THen whenver the user tries to make a request for getting the profile or want to do anything that a login user can do,
- this token and request is always sent to the server.
- Server try to compare whether the token and the logined in token is same or not.
- If yes he/she can access the functions
- else go to login page

# Index

basiacally we can make index to any of the field so that the searching become easier for mongodb. And we have to make the index to the field very carefully.
Disadvantages if we make every field index then it will become very difficult task for mongodb to place the data in the database.

# Pre is a middleware which basically a method of the schema through we can check anything before saving anything in the document or database.

# ref key word in models helps in referring to some other model and witht thhe help of populate function we can find the values of that referring model. ITS like join in sql


# Payment Gateway 
It is a two major step process
- Create order
- Payment Verification


# Real time chat applicatoin
web sockets.io 

- 3 major things - low- latency, bidirectional and event-based 
low-latency - means it is fast, seamless 
- client can send data to server and server send data to connected client
- event based basically it has event listener and all 