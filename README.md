# 🛒 E-Commerce Products API

A simple and reusable E-Commerce REST API built with Node.js, Express.js, MongoDB, and Mongoose.

This API provides a ready-to-use collection of product data that frontend developers can use to practice building e-commerce applications, product listings, product details, filtering, sorting, pagination, and more.

> This project currently focuses on GET/read operations. Create, update, and delete operations are not exposed as public API endpoints.

---

## 🚀 Features

- 50 product records
- Product images
- Product categories
- Product brands
- Product prices
- Product ratings
- Stock information
- Get all products
- Get a single product
- Filter by category
- Filter by brand
- Filter by minimum price
- Filter by maximum price
- Combine multiple filters
- Sort products by price
- Pagination
- Field selection
- Query parameters
- MongoDB + Mongoose
- RESTful API structure
- Separate routes and controllers
- Reusable API for frontend projects

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript

---

# 🌐 Base URL

### Local

```text
https://ecom-backend-5z52.onrender.com
```

### Production

```text
https://ecom-backend-5z52.onrender.com
```

All product endpoints start with:

```text
/api/products
```

---

# 📦 Product Structure

Each product contains:

```json
{
  "_id": "MongoDB ObjectId",
  "product_id": 1001,
  "name": "iPhone 16",
  "description": "Apple iPhone 16 smartphone",
  "price": 79999,
  "category": "Mobiles",
  "brand": "Apple",
  "image": "https://example.com/image.jpg",
  "rating": 4.8,
  "stock": 25,
  "createdAt": "2026-08-14T00:00:00.000Z",
  "updatedAt": "2026-08-14T00:00:00.000Z"
}
```

### Fields

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | MongoDB automatically generated ID |
| `product_id` | Number | Custom product ID |
| `name` | String | Product name |
| `description` | String | Product description |
| `price` | Number | Product price |
| `category` | String | Product category |
| `brand` | String | Product brand |
| `image` | String | Product image URL |
| `rating` | Number | Product rating |
| `stock` | Number | Available stock |
| `createdAt` | Date | Automatically generated creation date |
| `updatedAt` | Date | Automatically updated date |

---

# 📚 API ENDPOINTS

## 1. Get All Products

```http
GET /api/products
```

Example:

```text
https://ecom-backend-5z52.onrender.com/api/products
```

---

## 2. Get a Single Product

Get one product using the custom `product_id`.

```http
GET /api/products/:id
```

Example:

```text
https://ecom-backend-5z52.onrender.com/api/products/1001
```

This searches using:

```js
Product.findOne({
  product_id: req.params.id
})
```

---

# 🔎 FILTERING

## 3. Filter by Category

```http
GET /api/products?category=Mobiles
```

Examples:

```text
/api/products?category=Mobiles
/api/products?category=Laptops
/api/products?category=Audio
/api/products?category=TV
/api/products?category=Tablets
/api/products?category=Watches
```

---

## 4. Filter by Brand

```http
GET /api/products?brand=Apple
```

Examples:

```text
/api/products?brand=Apple
/api/products?brand=Samsung
/api/products?brand=Sony
/api/products?brand=JBL
/api/products?brand=OnePlus
```

---

# 💰 PRICE FILTERING

## 5. Minimum Price

Returns products whose price is greater than or equal to the specified value.

```http
GET /api/products?minPrice=50000
```

Equivalent MongoDB condition:

```js
{
  price: {
    $gte: 50000
  }
}
```

---

## 6. Maximum Price

Returns products whose price is less than or equal to the specified value.

```http
GET /api/products?maxPrice=50000
```

Equivalent MongoDB condition:

```js
{
  price: {
    $lte: 50000
  }
}
```

---

## 7. Price Range

```http
GET /api/products?minPrice=50000&maxPrice=100000
```

This means:

```text
price >= 50000
AND
price <= 100000
```

Equivalent MongoDB condition:

```js
{
  price: {
    $gte: 50000,
    $lte: 100000
  }
}
```

---

# 🔗 COMBINING FILTERS

### Category + Brand

```text
/api/products?category=Mobiles&brand=Apple
```

### Category + Minimum Price

```text
/api/products?category=Mobiles&minPrice=50000
```

### Category + Price Range

```text
/api/products?category=Mobiles&minPrice=50000&maxPrice=100000
```

### Brand + Price Range

```text
/api/products?brand=Apple&minPrice=50000&maxPrice=150000
```

---

# 🔃 SORTING

## 8. Lowest Price First

```text
/api/products?sort=asc
```

Uses:

```js
.sort({
  price: 1
})
```

Order:

```text
Lowest Price → Highest Price
```

---

## 9. Highest Price First

```text
/api/products?sort=desc
```

Uses:

```js
.sort({
  price: -1
})
```

Order:

```text
Highest Price → Lowest Price
```

---

# 📄 PAGINATION

Pagination allows frontend applications to load products page by page.

The API uses:

```text
page
limit
```

## 10. First Page

```text
/api/products?page=1&limit=10
```

Returns products 1–10.

## 11. Second Page

```text
/api/products?page=2&limit=10
```

Returns products 11–20.

## 12. Third Page

```text
/api/products?page=3&limit=10
```

Returns products 21–30.

### Pagination Logic

```js
const skip = (page - 1) * limit;
```

Example:

```text
page = 2
limit = 10

skip = (2 - 1) * 10
skip = 10
```

MongoDB:

```js
.skip(10)
.limit(10)
```

---

# 🔥 COMBINING PAGINATION, FILTERING AND SORTING

Example:

```text
/api/products?category=Mobiles&minPrice=50000&sort=desc&page=1&limit=5
```

This means:

```text
Category: Mobiles
Minimum price: ₹50,000
Sorting: Highest price → Lowest price
Page: 1
Products: 5
```

---

# 🎯 FIELD SELECTION

Request only the fields required by your frontend.

```text
/api/products?fields=name,price,image
```

Example response:

```json
{
  "data": [
    {
      "name": "iPhone 16",
      "price": 79999,
      "image": "https://example.com/image.jpg"
    }
  ]
}
```

---

# 📋 COMPLETE GET ROUTES

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get one product |
| GET | `/api/products?category=Mobiles` | Filter by category |
| GET | `/api/products?brand=Apple` | Filter by brand |
| GET | `/api/products?minPrice=50000` | Minimum price |
| GET | `/api/products?maxPrice=100000` | Maximum price |
| GET | `/api/products?minPrice=50000&maxPrice=100000` | Price range |
| GET | `/api/products?sort=asc` | Low to high price |
| GET | `/api/products?sort=desc` | High to low price |
| GET | `/api/products?page=1&limit=10` | Pagination |
| GET | `/api/products?fields=name,price,image` | Select fields |

---

# 🚀 FRONTEND USAGE

## JavaScript Fetch

```js
const response = await fetch(
  "https://ecom-backend-5z52.onrender.com/api/products"
);

const data = await response.json();

console.log(data);
```

---

# ⚛️ REACT EXAMPLE

```jsx
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://ecom-backend-5z52.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      });
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.product_id}>
          <img
            src={product.image}
            alt={product.name}
            width="200"
          />

          <h2>{product.name}</h2>
          <p>₹{product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default Products;
```

---

# 🛍️ EXAMPLE REQUESTS

### Get all products

```text
/api/products
```

### Get all mobiles

```text
/api/products?category=Mobiles
```

### Get all Apple products

```text
/api/products?brand=Apple
```

### Get products above ₹50,000

```text
/api/products?minPrice=50000
```

### Get products below ₹50,000

```text
/api/products?maxPrice=50000
```

### Get products between ₹20,000 and ₹80,000

```text
/api/products?minPrice=20000&maxPrice=80000
```

### Get expensive mobiles

```text
/api/products?category=Mobiles&sort=desc
```

### Get cheapest products

```text
/api/products?sort=asc
```

### Get 10 products per page

```text
/api/products?page=1&limit=10
```

### Get the second page of mobiles

```text
/api/products?category=Mobiles&page=2&limit=10
```

### Get cheap Apple products

```text
/api/products?brand=Apple&sort=asc
```

### Get only product card information

```text
/api/products?fields=name,price,image,rating
```

### Combine multiple filters

```text
/api/products?category=Mobiles&brand=Apple&minPrice=50000&maxPrice=100000&sort=desc&page=1&limit=5
```

---

# 🧩 REQUEST FLOW

```text
Frontend
    ↓
HTTP GET Request
    ↓
Express Router
    ↓
Product Controller
    ↓
Mongoose Model
    ↓
MongoDB
    ↓
JSON Response
    ↓
Frontend
```

---

# 🏗️ PROJECT STRUCTURE

```text
backend/
│
├── controllers/
│   └── productController.js
│
├── models/
│   └── productDB.js
│
├── routes/
│   └── productRoutes.js
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

---

# 🧪 TESTING

You can test the API using:

- Postman
- Thunder Client
- Insomnia
- Browser
- JavaScript Fetch
- Axios
- React
- Next.js
- Vue
- Angular

Example:

```text
GET https://ecom-backend-5z52.onrender.com/api/products
```

---

# ⚠️ CURRENT API SCOPE

This API currently provides read-only product endpoints.

### Available

```text
GET ✅
```

### Not available

```text
POST ❌
PUT ❌
PATCH ❌
DELETE ❌
```

The API is designed mainly for frontend developers who need product data for practicing and building projects.

---

# 🎯 USE CASES

You can use this API to practice building:

- E-commerce websites
- Product listing pages
- Product detail pages
- Product cards
- Search interfaces
- Category filters
- Brand filters
- Price filters
- Sort dropdowns
- Pagination
- Infinite scrolling
- React applications
- JavaScript applications
- Frontend portfolio projects

---

# 👨‍💻 AUTHOR

Built as a learning and practice project using:

**Node.js + Express.js + MongoDB + Mongoose**

Feel free to use this API for learning, practice, and frontend development.

---

## ⭐ If you find this API useful

Give the repository a ⭐ on GitHub and feel free to use the API for your frontend projects.
