Install the application with npm install.

Start the server by using a Terminal:
Change the directory to artistSearch and use npm start to start the server locally on port 3000.
To send a request, open your Browser at http://localhost:3000/. There you can see the landing page that can take all needed properties for the request (artistName, fileName and limit).
You can then submit your request with the submit-button. You will see the results of your search in the browser window and also you can download the results as fileName.csv. 
If there are no results returned some random artists will be returned instead from a defined JSON file.
If the server of last.fm is not reachable, an error message occurs.