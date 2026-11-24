
# Manufacturing Product Defect Reporting System

## Developer Information

- Name: Neilrho H. Topacio
- Course: Bachelor of Science in Information Technology
- Section: BSIT 4-E
- School: Cavite State University - Imus Campus
- Industry: Manufacturing

## Project Description

The Manufacturing Product Defect Reporting System is a backend application developed to help manufacturing companies record, manage, and monitor product defects.

The system allows authorized users to manage products, submit defect reports, and update the status of reported defects. It also provides different access permissions for administrators, staff, and inspectors.

This project was developed as part of our academic requirements in Systems Integration and Architecture.

## Project Objectives

- To develop a system for recording and monitoring product defects.
- To manage user accounts and product information.
- To provide secure login and authentication.
- To implement role-based access control.
- To organize defect reports based on status, severity, and product.
- To test API endpoints using Postman.

## Technologies Used

- NestJS - Backend framework
- Node.js - Runtime environment
- TypeScript - Programming language
- MySQL - Database
- TypeORM - Database integration
- JWT - User authentication
- Bcrypt - Password hashing
- Postman - API testing
- Git and GitHub - Version control
- Visual Studio Code - Code editor

## System Features

- User authentication
- User account management
- Product management
- Defect report management
- Create, Read, Update, and Delete operations
- Role-based access control
- Password hashing
- Input validation
- Defect report filtering
- Automatic identification of the reporting user

## User Roles

### Admin

- Manage user accounts.
- Manage products.
- View and create defect reports.
- Update defect reports.
- Delete defect reports.

### Staff

- View product information.
- Create and view defect reports.
- Update defect report status.
- Filter defect reports.

### Inspector

- View product information.
- Create defect reports.
- View individual defect reports.
- Cannot update or delete defect reports.

## Database

The system uses MySQL as its relational database.

Database Name: manufacturing_defect_system

Main Tables:

- users
- products
- defect_reports

TypeORM is used to connect the backend application to the database.

## System Architecture

The system follows a client-server architecture.

Postman sends HTTP requests to the NestJS backend. The backend processes the requests, checks user authentication and permissions, and communicates with the MySQL database using TypeORM.

## Installation and Setup

### Step 1: Clone the repository

    git clone https://github.com/TopacioNeilrho-BSIT2F/manufacturing-defect-api.git

### Step 2: Open the project folder

    cd manufacturing-defect-api

### Step 3: Install dependencies

    npm install

### Step 4: Configure the database

Open MySQL Workbench and create the database.

    CREATE DATABASE IF NOT EXISTS manufacturing_defect_system;

Import the database backup if available.

### Step 5: Configure environment variables

Create a .env file using .env.example as a reference.

    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=your_mysql_password
    DB_DATABASE=manufacturing_defect_system
    JWT_SECRET=your_secure_secret_key

Replace the sample values with your own configuration.

Do not upload the actual .env file to GitHub because it contains sensitive information.

### Step 6: Run the application

Development mode:

    npm run start:dev

Production build:

    npm run build

Production mode:

    npm run start:prod

## Base URL

    http://localhost:3000

## API Endpoints

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /auth/login | User login |
| GET | /auth/profile | View authenticated user profile |

### Users

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /users | Create a user |
| GET | /users | View all users |
| GET | /users/:id | View a specific user |
| PATCH | /users/:id | Update a user |
| DELETE | /users/:id | Delete a user |

### Products

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /products | Create a product |
| GET | /products | View all products |
| GET | /products/:id | View a specific product |
| PATCH | /products/:id | Update a product |
| DELETE | /products/:id | Delete a product |

### Defect Reports

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /defect-reports | Create a defect report |
| GET | /defect-reports | View all defect reports |
| GET | /defect-reports/:id | View a specific report |
| PATCH | /defect-reports/:id | Update a report |
| DELETE | /defect-reports/:id | Delete a report |
| GET | /defect-reports/status/:status | Filter by status |
| GET | /defect-reports/severity/:severity | Filter by severity |
| GET | /defect-reports/product/:productId | Filter by product |

## API Security

The system uses JSON Web Token (JWT) authentication to protect API endpoints.

Users must log in to receive an access token. The access token must be included as a Bearer Token when accessing protected endpoints.

Bcrypt is used to hash user passwords. Role-based access control is also implemented to prevent users from performing actions outside their assigned permissions.

Input validation is used to check the data submitted to the API.

## API Testing

Postman was used to test the API endpoints and verify the functionality of the system.

The following HTTP status codes were used during testing:

| Status Code | Description |
| --- | --- |
| 200 OK | Successful request |
| 201 Created | Successfully created a record |
| 400 Bad Request | Invalid input |
| 401 Unauthorized | Missing or invalid authentication |
| 403 Forbidden | User does not have permission |
| 404 Not Found | Requested resource was not found |

The application was also successfully built and tested locally in production mode.

## System Limitations

- The system is a backend prototype.
- It does not include a graphical user interface.
- API requests are performed using Postman.
- The system focuses on product defect reporting and does not include inventory management.
- The application is currently running on a local server.

## Conclusion

This project helped me understand how backend development, database integration, API security, and role-based access control work together.

Through this project, I learned how to develop REST APIs using NestJS, connect a MySQL database using TypeORM, and test API endpoints using Postman.

The system demonstrates how technology can help manufacturing companies organize and monitor product defect reports.

## References

- https://docs.nestjs.com/
- https://typeorm.io/
- https://dev.mysql.com/doc/
- https://learning.postman.com/
