# Triveous

# E-commerce API with Node.js

An API for managing e-commerce operations, including product and category listing, product details, cart management, order processing, and user authentication. This API uses Node.js and interacts with a database to store product, user cart, and order details.

## Features

- **Category Listing:** Retrieve a list of available product categories.
- **Product Listing:** Get a list of products with essential details (title, price, description, availability) based on category.
- **Product Details:** Retrieve detailed information about a specific product by its ID.
- **Cart Management:** Add products to the user's cart, view the cart, update quantities, and remove items.
- **Order Placement:** Place an order with products from the user's cart.
- **Order History:** Fetch the order history for authenticated users.
- **Order Details:** Retrieve detailed information about a specific order by its ID.

## Technologies Used

- Node.js
- Express.js
- MongoDB 
- JWT (JSON Web Tokens) for user authentication
- Bcrypt for password hashing

## Installation
 
 1. To start the server
    1)npm install
    2)node server.js

2. Backend is Deployed on 
Base url - 

3. API Endpoints

1)To create account : Post - /user/signup

2)To login : Post - /user/login

3)To get all Categories : GET  - /category/

4)To get all Products : GET  - /product/

5)To get product detail by ID : GET - /:productId

6) Add product to the Cart : Post - /product/addToCart

7)To view the user Cart : GET - /product/cart

8)To update the quantity of a product in the  cart : 
PUT - /product/updateCart/:productId

9)To remove a product from the  cart : DELETE - 
/product/remove/:productId

10)Route for Placing the order : POST - /product/placeOrder

11)To get Order History - GET - /product/orderHistory

12)To get the order detalis by ID - GET - 
/product/orderDetails/:orderId

13)To create a new Category - Post - /category/addCategory

14)To update category details -PUT - /category/:categoryId


# Contact

Name : Shubham Pilane
Email: shubhampilane143@gmail.com
GitHub: https://github.com/Shubham-Pilane
LinkedIn: https://www.linkedin.com/in/shubham-pilane-b918a9248/


# Documentation 
is a very important thing for the back end due to the 
lack of time I was unable to do swagger docs I apologize for that 
and thanks Triveous for giving me this opportunity im excited  for
future updated .Thank you :)




