# Review Questions

## What is Node.js?
  It is a runtime enviroment that is a platform that runs Javascript outside the browser.
## What is Express?
  Express is used with Node.js. It sits on top of the Node server and it adds extra functionality.
## Mention two parts of Express that you learned about this week.
  Express adds middleware to the server and it can user routing. 
## What is Middleware?
  Middleware takes the information being passed to an action and it will check the data, change it, or pass it to a differnt middleware before returning it to the response.
## What is a Resource?
  A Resource is what the client is asking to be returned to them. So it is what we send the client after it goes through our CRUD methods.
## What can the API return to help clients know if a request was successful?
  The API can return status codes, like 200, to let the client know it was successful.
## How can we partition our application into sub-applications?
  We can break up our application up using routing. This is done using Express Routers.
## What is express.json() and why do we need it?
  We need it to read the request body. Without we are not able to read the data off the req body.