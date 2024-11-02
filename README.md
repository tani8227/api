API Documentation
This API handles operations for questions and options, including creating, retrieving, updating, and deleting records, as well as voting on options. Below are the routes and descriptions for each endpoint.

Base URL
bash
/api
Routes
Questions
Get All Questions

Endpoint: /api/questions
Method: GET
Description: Retrieves all questions in the database.
Create a New Question

Endpoint: /api/questions/create
Method: POST
Description: Creates a new question with the provided details.
Display a Single Question

Endpoint: /api/questions/:id
Method: GET
Description: Displays details of a specific question by its id.
Delete a Question

Endpoint: /api/questions/:id/delete
Method: DELETE
Description: Deletes a question with the specified id from the database.
Options
Create a New Option for a Question

Endpoint: /api/questions/:id/options/create
Method: POST
Description: Creates a new option associated with a specific question identified by id.
Add a Vote to an Option

Endpoint: /api/options/:id/add_vote
Method: GET
Description: Adds a vote to the option with the specified id.
Delete an Option

Endpoint: /api/options/:id/delete
Method: DELETE
Description: Deletes the option with the specified id from the database.
Controllers
Question Controller: Handles question-related operations (e.g., creating, retrieving, deleting questions).
Option Controller: Manages option-related operations (e.g., creating, voting, deleting options).
