# Recipe Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This app allows users manage all of their recipes in one place. This app acts as a living index/reference to all of your recipes. You can add, edit, favorite, and delete recipes as you see fit. You can also search for recipes by name, ingredient, or category. 

## Additional Features
You can sign up a new user, login an existing user, pages & API points are authorized, and there is 2FA for added security.

![Screenshot 2025-01-14 at 9 16 56 AM](https://github.com/user-attachments/assets/5cb300c6-f8d6-4d49-bd76-2b5db03d8e1b)

![Screenshot 2025-01-14 at 9 17 26 AM](https://github.com/user-attachments/assets/8f1b9acd-fd01-4a76-b44a-bd727189fac5)

![Screenshot 2025-01-14 at 9 17 49 AM](https://github.com/user-attachments/assets/26735555-2298-4323-8fa3-655e1b754182)



## Table of Contents

- [Description](#description)
- [Additional Features](#additional-features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Technology Used](#technology-used)
- [Contributors](#contributors)
- [Questions](#questions)

### Installation:

To install, clone the repository and place it in your terminal.

### Usage:

To use this app, run the following command: `docker-compose up -d --build` then visit `http://localhost:3000` in your browser. Set your .env variables to allow services to communicate with one another, as well as prisma to connect to your database.
To ensure database connection, run `docker-compose exec prisma npx prisma migrate dev --name init` to create the database and tables. 

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

`This project is licensed under MIT`

### Technology Used:

- Javascript
- Docker
- Prisma
- Next.js
- PostgreSQL

### Contributors:

To contribute to this project, clone this repo locally and commit your code on a separate branch.

#### GitHub:

- https://github.com/mirandamorton1

#### Email:

- miranda.morton1@gmail.com
