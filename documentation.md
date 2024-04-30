# Visitors Management System Setup Instructions

---

## Overview

The Visitors Management System is a Node.js application designed to manage visitor records efficiently. It utilizes PostgreSQL as the database system and provides functionalities to add new visitors, list all visitors, delete a visitor, update visitor information, view visitor details, delete all visitors, and view the details of the last visitor added.

## System Requirements

- Node.js
- Docker (for running PostgreSQL and Adminer)
- PostgreSQL database

## Installation Steps

### 1. Clone the Repository

git clone <repository-url>

### 2. Install Dependencies

cd <project-folder>
npm install

### Docker Setup

- Ensure Docker is installed and running on your machine.

### 4. Database Configuration

- Update the PostgreSQL configuration in the config.js file according to your database setup.

#### .env File Setup

```.env
POSTGRES_USER = user
POSTGRES_HOST = localhost
POSTGRES_DB = db
POSTGRES_PASSWORD = pass
POSTGRES_PORT = 5432
```

### Starting The Application

- Run `docker compose up`.

## Database Functions

### createVisitorsTable Function

- This function takes in no arguments.
- If the visitors tables was successfully created it returns a success message.
- If there was an issue whilst creating the visitors table it throws an error.

#### Example Usage

```javascript
createVisitorsTable().then((result) => console.log(result));
```

### addNewVisitor Function

- This function takes in an object with the properties visitor_name, visitor_age, date_of_visit, time_of_visit, assisted_by and comments.
- If the visitor was successfully added it returns a success message.
- If there were any issues whilst adding the new visitor data it throws an error.

#### Example usage

```javascript
addNewVisitor({
  visitorName: "John Doe",
  visitorAge: 25,
  dateOfVisit: "2022-01-01",
  timeOfVisit: "17:05",
  assistedBy: "Jane Doe",
  comments: "Nice visit",
}).then((result) => console.log(result));
```

### listAllVisitors Function

- This Function takes in no arguments.
- If the query was successful it return an array of all the visitors in the visitors table.
- If the query was an issue whilst visitors data it throws an error.

#### Example Usage

```javascript
listAllVisitors().then((visitors) => console.log(visitors));
```

### deleteVisitor Function

- This function takes in the visitor ID as an argument.
- If the visitor data was successfully deleted it returns a success message.
- If there was an error whilst deleting the visitor data it throws an error.

#### Example Usage

```javascript
deleteVisitor(1).then((result) => console.log(result));
```

### UpdateVisitor Function

- This function takes in visitorID, Updated visitor data in an object.
- If the visitor data was successfully updated it returns a success message.
- If there was an issue whilst updating the visitor data it throws an error.

#### Example Usage

```javascript
updateVisitor(1, {
  visitor_name: "Jane Doe",
  date_of_visit: "2023-06-27",
}).then((result) => console.log(result));
```

### viewVisitor Function

- This function takes in the visitorID as an argument.
- If the query was successful it return the visitor date.
- If there was an issue whilst retrieving the visitor data it throws an error.

#### Example Usage

```javascript
viewVisitor(1).then((visitor) => console.log(visitor));
```

### deleteAllVisitors Function

- This function takes in no arguments.
- If the query was successful it return a success message.
- If there was an issue whilst deleting the visitors it throws an error.

#### Example Usage

```javascript
deleteAllVisitors().then((result) => console.log(result));
```

### viewLastVisitor Function

- This function takes in no arguments.
- If the query was successful it returns a success message.
- If there was an issue whilst retrieving last visitor data it throws an error.

#### Example Usage

```javascript
viewLastVisitor().then((visitorId) => console.log(visitorId));
```

## End-Points

## Server Setup and Accessing the Form

- Run `npm start` to set up the server.
- visit http://localhost:3000/new_visitor to access the form

## Endpoints

### GET /visitors

- This endpoint lists all visitors in the database.

#### Example Usage

```bash
GET http://localhost:3000/visitors
```

### POST /visitors

- This endpoint creates new visitor.
- This request can be sent using json body format or urlencoded format

#### Example Usage

##### JSON Body Example

- The data for the new visitor should be provided in the body of the request as JSON format.

```bash
POST http://localhost:3000/visitors
```

###### Requests Body Example

```json
{
  "visitor_name": "John Doe", // cannot be null and must provide both first name and last name, no initials.
  "visitor_age": 30, // cannot be null
  "date_of_visit": "2024-03-15", // cannot be null
  "time_of_visit": "13:45", // cannot be null
  "assisted_by": "Jane Smith", // cannot be null
  "comments": "Nice Visit" // can be null
}
```

##### URL Encoded Example

```bash
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "visitor_name=Jane Doe" \
  --data-urlencode "visitor_age=35" \
  --data-urlencode "date_of_visit=2020-04-17" \
  --data-urlencode "time_of_visit=18:06" \
  --data-urlencode "assisted_by=John Doe" \
  --data-urlencode "comments=Boring" \
  http://localhost:3000/visitors
```

### GET /visitors/:id

- This endpoint gets details of a specific visitor.
- You have to provide the id of the visitor as a parameter in the request.

#### Example Usage

```bash
GET http://localhost:3000/visitors/1
```

### DELETE /visitors/:id

- This endpoint deletes a specific visitor.
- You have to provide the id of the visitor as a parameter in the request.

#### Example Usage

```bash
DELETE http://localhost:3000/visitors/1
```

### DELETE /visitors

- This endpoint deletes deletes all visitors in the database.

#### Example Usage

```bash
DELETE http://localhost:3000/visitors
```

### PUT /visitors/:id

- This endpoint updates a specific visitor.
- You have to provide the id of the visitor as a parameter in the request.
- The updated data should be provided in the body of the request as JSON format.

#### Example Usage

```bash
PUT http://localhost:3000/visitors/1
```

#### Requests Body Example

```json
{
  "visitor_name": "Jane Doe",
  "visitor_age": 45
}
```

**The above will update the visitor_name and age of the visitor with id=1 to Jane Doe and 45.**
