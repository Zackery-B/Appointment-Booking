# Appointment Booker

This project is a simple prototype of a appointment booking site for a medical office.
It includes a React front-end and a Express back-end API using SQLite for the server database.

## How to run

Make sure you have the node.js package manager installed.

Make sure to install all required node modules for both the server and client. They must be installed in there respective folders.

The React front-end can be run in dev mode by simply navigating to the `/client` folder in the terminal and running `npm run dev`. It does make use of a vite proxy to access the server and avoid CORS restrictions.

Logging in does requires the server to be running.

To start the server, navigate to the `/server` folder in the terminal and run the `server.js` file using the  `node server.js` command. This will automatically create a `database.db` file and add the database structure.

By default the server will run on localhost port 3001.

The server can be safely shut down using Ctrl + C in the terminal.

Data is stored in the `database.db` file. It can be safely deleted to remove all current data.

The database will be empty by default. If you want some mock data, you can navigate to the `/server/db` folder and run the `add_mock_data.js` file using the `node add_mock_data.js` command.

### Mock data credentials :

#### Clients

    Email: c1Email
    Password: c1password

    Email: c2Email
    Password: c2password

#### Doctors

    Email: d1Email
    Password: d1password

    Email: d2Email
    Password: d2password

Feel free to also create your own client and/or doctor account using the create account page.

Permissions and accessible pages will be different depending if you are logged in as a doctor or client.

## What I built

I made use of various tools and libraries including React, Vite, Express, and SQLite, all installed through the Node.js package manager

The react front end is based on a previous school project I completed with a teammate. Most of it is build from scratch, but section of the other project where used or modified as necessary.

The back end, including the end points, database, and queries are made from scratch using listed tools.

## Technical decision

### Vite

I was already familiar with Vite and like it. It provides very helpful development support like automatic page reloading and the ability to easily import needed modules. It also provides very good support for react.

### React

I choose to use react to make the front end because I have experience with it. I also new it could provide a simple to make, pretty and effective front end.

### Express

I have little previously experience with express. I discoverd it while doing some research for this project. It's a simple Node.js framework used to build back ends exactly like the API I required. It provides very easy routing and database querying. It is also commonly used with react.

### SQLite

I chose to use SQLite because, according to my research, it was simple to use. This was in fact correct. I have not had practice configuring a database so starting simple was helpful.
SQLite is also very light weight while still providing all the functionality you need from a database.
It is also supported by node.js making it easy to include in the project.

## Possible Improvements

- Make API more secure : This can be solved by adding better authentication using JWT.

- Make API more robust : There is currently a lack of input checking. This can be improved by simply adding more checks to make sure the given data is correct.

- Add secure automatic login when you create and account.

- Add animations to the drawer to make is smoother.

- Add complex password requirement to enhance user security.

- Add the ability for patients to cancel there appointments.

- Improve styles : styles can be more fancy and a bit more dynamic.
