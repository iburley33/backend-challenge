# API Documentation

## Video walkthrough

A video is linked below which will walk through use of this API.



## Getting started

Prior to using any routes please run the following scripts in your terminal. They must be completed in the order they are listed:

**npm i** - Install all dependencies.

**npm run seed** - This will seed the database with data used for further testing.

**npm start** - This will run your API server and allow for further testing via postman.

## .env

Now that dotenv is installed you will need to create a .env file in both the server folder and the test foldeer. There is an example.env included but your file must include:

**JWT_SECRET**=*yoursecret*

### Authentication Process

Prior to logging in please ensure that you have run the command npm run seed in the terminal of the server file. You will need to login using the credentials provided below to receive a token. You will then need to include this token as a header in any User or Organization routes.

**Bearer Token** 

This Application is built to follow a strict Bearer token format. Protected route HTTP requests must be made with the following structure in the Authorzation value: 

Bearer *token*

After logging in you will receive a JWT as a response. This JWT will need to be included as a header in further testing as routes for user and organization require Admin access due to security protocols. Users who are not an Admin will not have access to any sensitive data. **Again, for the token to be accepted please use this format:**

**Key:** *Authorization*


**Value:** *Bearer* (insert token)

## Login Controller



**Login:** The login endpoint allows users to authenticate themselves by providing their email address and password and returns a JWT to the front end to be stored as a cookie. **The credentials below provide access to Admin priveleges and must be used for this test.**


**Endpoint: POST http://localhost:3000/api/login**

*Example Request Body:*

{

  "email": "testadmin@test.com",
  "password": "tomato"

}

**Responses:**

200 OK - Successful login. Returns a JWT token for authentication.

401 Unauthorized - Invalid email or password.

**Authentication Headers:** 
Once an admin is logged in, include the JWT token in the Authorization header of subsequent requests to authenticate the user.

**Token Expiry:** The JWT token expires after 1 hour. After expiration, users need to log in again to obtain a new token.


## Organization Controller

### Retrieve All Organizations:

**Endpoint: GET http://localhost:3000/api/organization**

**Response:** Returns an array of all existing organization objects.

### Query an individual organization

The routes below will allow you to query organizations based on specific search values to isolate pertinent data. The queries provided should identify the key and value to match. Feel free to test any route but a good example is the "DataMasters" organization. Please note that you will need to copy an id from "DataMasters after hitting the retrieve all route. If you provide the below example in both routes the matchall route will provide 1 matching document, while the matchany route will return 3. 

*For example http://localhost:3000/organization/:orgId/matchAny/?city=Byteville&state=FL.*

**Endpoint: GET http://localhost:3000/api/organization/:orgId/matchall/?someQuery&someOtherQuery**

**Response:** Returns a data object with locations that match all of the given queries. Based on the given example this response would only include locations in Byteville, FL.

**Endpoint: GET http://localhost:3000/api/organization/:orgId/matchany/?someQuery&someOtherQuery**

**Response:** Returns a data object with locations that match all of the given queries. Based on the given example this response would not only include locations in Baltimore but also all locations in the city of Byteville as well as any locations in FL.


### Retrieve Single Organization:
Please note that you will need to copy an id from an organization after hitting the retrieve all route.

**Endpoint: GET http://localhost:3000/api/organization/:orgId**

**Response:** Returns a single organization object matching the provided orgId.

### Create Organization:

**Endpoint: POST http://localhost:3000/api/organization/create**

*Example Request Body:* 

{
  name: Tech R Us,
  addresses: [
    {
      "street": "896 Elmo Rd",
      "city": "Springfield",
      "state": "IL",
      "zip": "31958",
      "country": "USA"
    }
  ]
}

**Response:** Returns the created organization object.

### Update Organization:
Please note that you will need to copy an id from an organization after hitting the retrieve all route.

**Endpoint: PUT http://localhost:3000/api/organization/:orgId**

*Example Request Body:* 

{

  "name": "Tech R NOT Us ANYMORE"

}

**Response:** Returns the updated organization object.

### Delete Organization:
Please note that you will need to copy an id from an organization after hitting the retrieve all route.

**Endpoint: DELETE http://localhost:3000/api/organization/:orgId**

**Response:** Returns a success message upon successful deletion as well as an object containing the details of the deleted organization.


# User Controller
## Retrieve Users

### Retrieve All Users:

**Endpoint: GET http://localhost:3000/api/user**

Response: Returns an array of all user objects in the database.

### Retrieve Single User:
Please note that you will need to copy an id from an organization after hitting the retrieve all route.

**Endpoint: GET http://localhost:3000/api/user/:userId**

**Response:** Returns a single user object matching the provided userId.

## Create User:

**Endpoint: POST http://localhost:3000/api/user/create**

*Example Request Body:* 

{

  "email": "fakeemail@gmail.com",

  "password": "fakepassword123",

  "role": "Employee" 

}

**Response:** Returns the created user object.

## Update User:
Please note that you will need to copy an id from an organization after hitting the retrieve all route.

**Endpoint: PUT http://localhost:3000/api/user/:userId**

*Example Request Body:*

{

  "email": "updatedfakeemail@gmail.com"

}

**Response:** Returns the updated user object.

## Delete User:
Please note that you will need to copy an id from an organization after hitting the retrieve all route.

**Endpoint: DELETE http://localhost:3000/api/user/:userId**

**Response:** Returns a success message upon successful deletion.

# Mocha Testing
Please ensure that you have first run the **npm run seed** command in the terminal prior to testing. For tests to run appropriately you must have a .env file in your Tests folder that matches the .env in your server folder.

From the Tests folder terminal run the following script to execute mocha testing:

**npm run test**