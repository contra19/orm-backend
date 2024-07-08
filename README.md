# ORM Backend

![Node.js](https://img.shields.io/badge/Node.js-14.x-brightgreen)
![Sequelize](https://img.shields.io/badge/Sequelize-6.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Table of Contents
- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Demo Video](#demo-video)
- [Database Models](#database-models)
  - [Category Model](#category-model)
  - [Product Model](#product-model)
  - [Tag Model](#tag-model)
  - [ProductTag Model](#producttag-model)
- [API Endpoints](#api-endpoints)
  - [Categories](#categories)
  - [Products](#products)
  - [Tags](#tags)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Project Description

The ORM Backend is a Node.js application that uses Sequelize, a promise-based Node.js ORM, to interact with a MySQL database. This project includes models for products, categories, tags, and the relationships between them, and provides RESTful API endpoints for managing these entities.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/contra19/orm-backend.git
   cd orm-backend
   ```

2. Install the dependencies: 
   ```sh
   npm install
   ```

3. Set up the database connection: 
   - update your connection information in the .env.TEMPLATE file   
   ```sh
   DB_URL='postgres://your-user:YourPassword@yourdatabase:5432/ecommerce_db'
   DB_NAME='ecommerce_db'
   DB_USER='your-user'
   DB_PASSWORD='YourPassword'
   ```
   - remane .env.TEMPLATE to .env

4. Initialize and seed the database: 
   ```sh
   npm run seed
   ```

5. Start the application: 
   ```sh
   npm start
   ```

## Usage

After installation, the server will be running at `http://localhost:3001`. You can use tools like Postman or Insomnia to interact with the API endpoints.
If you prefer to run on a different PORT, you can update line 6 in the index.js file to a different port number: 
```sh
const PORT = process.env.PORT || 3001; # Update this value to change the port number
```

## Demo Video
[Demo Video](https://drive.google.com/file/d/1YsvMU3B5PtBiw9jEVz9JsJ3OMP-a7_Bp/view?usp=sharing)

## Database Models

### Category Model

- **id**: Primary key, auto-increment integer, not nullable.
- **category_name**: String, not nullable.

### Product Model

- **id**: Primary key, auto-increment integer, not nullable.
- **product_name**: String, not nullable.
- **price**: Decimal, not nullable, validated as decimal.
- **stock**: Integer, not nullable, defaults to 10, validated as numeric
- **category_id**: Integer, foreign key referencing the `id` in the `Category` model.

### Tag Model

- **id**: Primary key, auto-increment integer, not nullable.
- **tag_name**: String.

### ProductTag Model

- **id**: Primary key, auto-increment integer, not nullable.
- **product_id**: Integer, foreign key referencing the `id` in the `Product` model.
- **tag_id**: Integer, foreign key referencing the `id` in the `Tag` model.

## API Endpoints

### Categories

- `GET /api/categories`: Retrieve all categories, including associated products.
- `GET /api/categories/:id`: Retrieve a single category by its ID, including associated products.
- `POST /api/categories`: Create a new category.
- `PUT /api/categories/:id`: Update a category by its ID.
- `DELETE /api/categories/:id`: Delete a category by its ID.

### Products

- `GET /api/products`: Retrieve all products, including associated categories and tags.
- `GET /api/products/:id`: Retrieve a single product by its ID, including associated categories and tags.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update a product by its ID.
- `DELETE /api/products/:id`: Delete a product by its ID.

### Tags

- `GET /api/tags`: Retrieve all tags, including associated products.
- `GET /api/tags/:id`: Retrieve a single tag by its ID, including associated products.
- `POST /api/tags`: Create a new tag.
- `PUT /api/tags/:id`: Update a tag by its ID.
- `DELETE /api/tags/:id`: Delete a tag by its ID.

## Error Handling

The API provides meaningful error messages for invalid requests and server errors, ensuring a robust and user-friendly experience.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push to the branch.
5. Open a pull request.

## License ![License](https://img.shields.io/badge/License-MIT-yellow)

This project is licensed under the MIT License.

## Acknowledgements

I would like to acknowledge the following individuals and organizations for their contributions to the development of the ORM Backend:

1. **OpenAI**: For providing the AI technology that assisted in the development process.
2. **Node.js Community**: For creating and maintaining a robust platform that makes building server-side applications efficient and enjoyable.
3. **PostgreSQL Global Development Group**: For developing a powerful, open-source object-relational database system that forms the backbone of this project.
4. **Xandromus**: For providieng the starter code. (https://github.com/coding-boot-camp/bookish-sniffle)

## Contact

For any inquiries, please contact:

- **Name**: contra19
- **Email**: contra19@gmail.com
- **GitHub**: [contra19](https://github.com/contra19)

