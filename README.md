# HRMS ( Human Resource Management System )

## Overview 
HRMS is a webapp which simulates a basic internal HR tool, focusing on essential HR operations with a simple, usable, and professional interface.


## Setup 
step 1 - Create a virtual environment from the terminal by running 
``` python -m venv venv ```

step 2 - Install Dependencies like flask and flask-sqlalchemy from the terminal 
``` pip install flask flask-sqlalchemy ```


## Spinning the server
To run the backend server, ensure your're in virtual environment and installed all the required dependencies before hand.
In the root directory, run 
``` python run.py ```


## Repository Overview 
HRMS-LITE
  |
  |------/app
           |
           |---- init.py       # App instance and database connection
           |                    
           |---- routes.py     # Requests handling
           |
           |---- models.py     # Database Schemas
           |
           |---- services.py   # Definition for helper functions
  |         
  |------/instance             # sqlite db file
           |
           |---- hrms.db    
  |
  |------ .gitignore           # gitignore file to untrack git file
  |
  |------ run.py               # starting point for webapp
  |
  |------ README.md            

