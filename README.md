
<p  align="center">

<a  href="http://nestjs.com/"  target="blank"><img  src="https://nestjs.com/img/logo-small.svg"  width="120"  alt="Nest Logo"  /></a>

</p>

  

## Description

  

The backend system is a Contact Management API implemented using NestJS and MongoDB. The core functionalities include user authentication and authorization, along with CRUD operations for managing contact information. Here's an overview of the structure and main features:

# Modules

  

### Contact Module:

 - Manages contact-related operations (create, read, update, delete)
 - Uses the ContactController and ContactService for logic and routing.
 - Integrates with MongoDB using Mongoose for the Contact schema.
-  Depends on AuthModule for authentication and user-specific operations

### Auth Module:

- Provides user authentication via JWT tokens.
- Handles user signup and login.
- Includes strategies for protecting routes (e.g., AuthGuard).

 

## Key Features

### Authentication:

- JWT-based authentication with configurable expiration.
- Password hashing using bcrypt.
- Guards for securing routes (@UseGuards(AuthGuard())).
    

### Validation and Error Handling:
- Ensures correct ID formats using Mongoose utilities.
- Verifies user ownership for sensitive operations (update, delete).
- Handles invalid credentials and access attempts with appropriate exceptions.

### Route Endpoints

#### Authentication
| Endpoint | Description |
|--|--|
| POST /auth/signup | Registers a new user. |
| POST /auth/login | Authenticates a user and returns a JWT token. |

#### Contacts 
| Endpoint | Description |
|--|--|
| GET /contacts | Fetches contacts (pagination, keyword search). |
| POST /contacts/new | Creates a new contact. |
| GET /contacts/:id | Fetches a specific contact. |
| PUT /contacts/:id | Updates a contact. |
| DELETE /contacts/:id | Deletes a contact. |



GET /contacts/:id: Fetches a specific contact.

PUT /contacts/:id: Updates a contact.

DELETE /contacts/:id: Deletes a contact.

  
  

## Compile and run the project

  

```bash

# development

$  npm  run  start

  

# watch mode

$  npm  run  start:dev

  

# production mode

$  npm  run  start:prod

```
