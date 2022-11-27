# Employee Tracker 

## Description 
This application was created to generate an employee database based on user input using the Inquirer package from npm. 

This project demonstrates the use of SQL. 

## Installation 
The user should clone the repository from GitHub and download Node and mysql2. 

Run the following commands in your terminal to make sure the applications works correctly: 
* `` mysql -u root -p ``
* Enter your password
* `` source db/schema.sql; ``
* `` source db/seeds.sql; ``
* `` exit ``
* `` npm i `` to download the node modules to run this application.
* `` node server.js `` to start the application. 

## Usage 
* The user is presented with a list of options for what they would like to do first.
* Once the user selects the desired action, they are presented with a response based on their selection.
* Selecting "View Employees", will present the user with a table of all the employees currently in the database.
* Selecting "View Roles", will present the user with a table of all the roles currently in the database.
* Selecting "View Departments", will present the user with a table of all departments currently in the database.
* Selecting "Add Employee", will present the user with prompts to add a new employee.
* Selecting "Add Role", will present the user with prompts to add a new role to the database.
* Selecting "Add Department", will present the user with prompts to add a new department to the database.


## Walk Through Video 
![Screenshot](./assets%20/images/Screenshot_2022-11-26.png)

View walk through video here - [Screencastify](https://drive.google.com/file/d/12Ew7Fn3MCGh6TDoVOfQ_dKhtY1EQ8kU7/view)