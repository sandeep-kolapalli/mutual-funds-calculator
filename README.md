*** Project Desciption ***
This program will calculate the trailing returns of the mutual funds for a specific scheme over a stipulated period of years (horizon) and a period of investment

*** Folder Structuring ***
This repository consists of two individual components, one each for the Front-end (built using ReactJS) and Back-end (build using NodeJS)

*** Setting up the repository in DEV environment ***

## Back-end

- Navigate to 'server' folder
- Type 'npm install' to update the node_modules
- Type 'npm start' to run the application
- Open a browser and launch the URL http://localhost/{PORT} (PORT as specified in the command console)

## Front-end (Optional)

For simplicity, front-end production build files are hosted by the server application in this repo.
If you wish to edit the front-end source code,
-Navigate to 'client' folder
-Type 'npm install' to update the node_modules
-Type 'npm run build' to build the production files
-Type 'npm start' to run the application

Note: If you wish to run the front-end independent of the back-end server (i.e. on a different domain, please make sure to update the server api port in services/index.js file)

*** Static Code Analysis ***
![Standard Js](https://cdn.rawgit.com/feross/standard/master/badge.svg)

*** Author ***
sandeep.kolapalli@gmail.com