# My Teen and I: A Social Media Platform for Parents to Connect on Teenager Parenting

My Teen and I is a social media platform designed specifically for parents to connect and share insights, tips, and experiences on handling teenagers. The platform provides a safe and supportive environment for parents to seek advice, share stories, and engage with others facing similar challenges.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [API](#api)
- [Folder Structure](#folder-structure)
- [Schema](#schema)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

My Teen and I aims to facilitate communication and collaboration among parents dealing with the unique challenges of raising teenagers. Built using Node.js for the backend, React.js for the frontend, MongoDB/Mongoose for the database, and Redis for session caching, My Teen and I offers a robust and scalable platform for parents to connect and support each other.

## Features

- User authentication and authorization
- User profile management
- Posting and sharing parenting tips and experiences
- Following other users
- Commenting on posts
- Uploading and removing profile pictures

## API

### Authentication
- `GET /signup`: Sign up for a new account (handled by React)
- `POST /signup`: Create a new user account (handled by Node.js)
- `GET /login`: Log in to an existing account (handled by React)
- `POST /login`: Authenticate user credentials (handled by Node.js)
- `POST /logout`: Log out of the current session

### User Management
- `GET /user/dashboard`: View user's personal information and posts
- `GET /user/posts`: View user's posts
- `POST /user/posts`: Create a new post
- `GET /user/followers`: View user's followers
- `GET /user/delete`: Delete user account and associated posts
- `PUT /user/info`: Update user information

### Media
- `POST /picture/upload`: Upload a profile picture (React and Node.js)
- `POST /picture/remove`: Remove a profile picture (React and Node.js)

## Folder Structure
```
MyTeenAndI/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── myHooks/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── CreatePost.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NavBar.jsx
│   │   ├── Post.jsx
│   │   ├── RootHome.jsx
│   │   ├── SignUp.jsx
│   │   └── UserDashboard.jsx
│   └── package.json
│
├── server.js
├── utils/
│   ├── redis.js
│   └── db.js
├── controllers/
│   ├── AuthController.js
│   ├── AppController.js
│   └── UserController.js
├── routes/
│   └── index.js
└── package.json
```


## Schema

### User
- Name
- Username
- Email
- CreateAt
- UpdatedAt
- Password
- Phone Number (optional)
- Posts

### Post
- Body
- Likes
- Date
- Comments

### Comment
- Username
- Comment
- Date

## Technologies

### Backend
- Node.js
- Express.js
- MongoDB/Mongoose
- Redis
- bcryptjs
- bull
- chai-http
- cors
- image-thumbnail
- mime-types
- uuid
- validator

### Frontend
- React
- React DOM
- React Router DOM

## Installation

1. Clone the repository: `git clone https://github.com/ifebusola263/myTeenAndI.git`
2. Navigate to the project directory: `cd My Teen and I`
3. Install backend dependencies: `npm install`
4. Navigate to the frontend directory: `cd client`
5. Install frontend dependencies: `npm install`

## Usage

1. Start the backend server: `npm start-server`
2. Start the frontend development server: `npm start-app` (in the `client` directory)
3. Access the server side application in your browser: `http://localhost:3000`
4. Access the client side application in your browser: `http://localhost:5173`

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements or additional features you'd like to see.

## License

This project is licensed under the [MIT License](LICENSE).