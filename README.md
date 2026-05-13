# Appointment Booker

This project is a simple prototype of an appointment booking site for a medical office.
It includes a React front-end and an Express back-end REST API making use of SQLite for the server database.

## How to run

Make sure you have the Node.js package manager installed.

Make sure to install all required node modules for both the client and server. They must be installed in their respective folders.

The React front-end can be run in dev mode by simply navigating to the `/client` folder in the terminal and running `npm run dev`. The front-end makes use of a Vite proxy to access the server and avoid CORS restrictions.

Logging in requires the server to be running.

To start the server, navigate to the `/server` folder in the terminal and run the `server.js` file using the  `node server.js` command. This will automatically create a `database.db` file and add the database structure.

By default the server will run on localhost port 3001.

The server can be safely shut down using `Ctrl + C` shortcut in the terminal.

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

Feel free to also create your own client and/or doctor account through the "Create Account" page.

Permissions and accessible pages will be different depending on if you are logged in as a doctor or client.

## What I built

I made use of various tools and libraries, including React, Vite, Express, and SQLite, all installed through the Node.js package manager.

The React front-end is based on a previous school project I completed with a teammate. Most of it is built from scratch, but sections of the other project were used or modified as necessary.

The back end, including the endpoints, database, and queries, was built from scratch using the listed tools.

## Technical decision

### Vite

I was already familiar with Vite. It provides very helpful development support like automatic page reloading and the ability to easily import needed modules. It also provides very good support for React.

### React

I choose to use React to make the front-end because I have previous experience with it. I knew it could provide a simple to make, pretty, and effective front-end.

### Express

I had limited previous experience with Express and learned a lot during this project. It's a simple Node.js framework used to build back-ends exactly like the REST API I required. It provides very easy routing and database querying. It is also commonly used with React.

### SQLite

I chose to use SQLite because it is simple to use and lacks complex configurations. I have not previously configured a database, so I preferred a simpler option.
SQLite is also very lightweight while still providing all the functionality needed from a database.
It's also supported by Node.js, making it easy to include in the project.

## Possible Improvements

- Make the API more secure : This can be solved by adding better authentication using JWT.

- Make the API more robust : There is currently a lack of input checking. This can be improved by adding more checks to make sure the given data is correct.

- Add the ability for patients to cancel their appointments.

- Add complex password requirement to enhance user security.

- Add secure automatic login when the users creates an account.

- Add animations to the drawer to make it smoother.

- Improve styles : styles can be fancier and a bit more dynamic.
