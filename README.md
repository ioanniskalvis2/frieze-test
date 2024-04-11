## After cloning the repository these are the steps you should follow to setup the project:

- Using a terminal cd to the client folder using the command `cd client`.
- Run the command `npm i` to install all the frontend dependencies.
- Create a .env file in the root of the client directory and create.
- Add a variable named REACT_APP_API_BASE_URL and add the value of http://localhost:<port_used_by_the_backend>. The port used by the backend server will again be setup on an .env file, so make sure these 2 are matching.
- Using another terminal cd to the server folder using the command `cd server`.
- Again, run the command `npm i` to install all the backend dependencies.
- Create a .env file in the root of the server directory and create.
- Add a PORT variable and make sure it's the same as the one used in the frontend, for example 3001 (react runs on port 3000 by default, so preferably use 3001).
- Go to (https://app.exchangerate-api.com/dashboard) and get a free API key.
- Add in your .env file another variable named EXCHANGE_RATE_API_KEY and add the value of your API key.
- Use the first terminal and run the command `npm start`.
- Use the second terminal and run the command `npm run dev`.
### Now you should be able to run the application.
### If it's not working make sure the ports in the env files are matching and also that you exchange rate API key has the correct value.

