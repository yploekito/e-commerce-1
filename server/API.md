# e-Commerce API Documentation

## Project setup
```
npm install
```
### Run for production
```
npm run start
```

### Run for development
```
npm run dev
```







## /signin and signup

| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/signin`     | POST    | Sign in |          |  email:String, password: String                               |
| `/signup` | POST    | Create new User |     | name:String, email: String, password: String, admin:boolean                                 |


## /product

| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/product`     | GET    | Get all products      |token          |                                  |
| `/product/myShop`     | GET    | Get products uploaded by user     |token          |                                  |
| `/product/:id` | GET    | Get info for a specific product based on the product id  | token    |                                  |
| `/product`     | POST   | Add a new product, seller id specified from token   |  token | name:String, stock:Number, description:String, category:String, price:Number, image:multiform/form-data
| `/product/:id` | DELETE | Delete a specific product based on its id, only the seller can delete authorized from token               | token    |                                  |
| `/product/:id` | PATCH  | Update a specific product based on its id, only the seller can delete, authorized from token |          | name:String, stock:Number, description:String, image:multiform/form-data|  

## /user


| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/user/cart/add/:productId`     | PATCH    | add item in users cart     |token          |                                 |
| `/user/cart/remove/:productId`     | PATCH    | remove item in users cart     |token          |                                  |
| `/user/cart`     | GET    | get cart information about loggedin user     |token          |                                  |
| `/user/cart`     | PATCH    | remove all content within the user's cart |token          |                                  |

## /transaction

| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/transaction`     | GET    | get all transactions     |token          |                                 |
| `/transaction/history`     | GET    | get transaction of active user     |token          |                                  |
| `/transaction`     | POST    | checkout all items from cart and create new transaction      |token          |                                  |
| `/transaction/:transactionId`     | PATCH    | updatet delivery status of the transaction |token          |                                  |

| Route            | HTTP   | Description                 | Header(s)|Body                              |
|:-----------------|:-------|:----------------------------|:---------|:---------------------------------|
| `/user/cart/add/:productId`     | PATCH    | add item in users cart     |token          |                                 |
| `/user/cart/remove/:productId`     | PATCH    | remove item in users cart     |token          |                                  |
| `/user/cart`     | GET    | get cart information about loggedin user     |token          |                                  |
| `/user/cart`     | PATCH    | remove all content within the user's cart |token          |                                  |



