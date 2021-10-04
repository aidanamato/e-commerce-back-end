# 13. Object-Relational Mapping (ORM) Challenge: E-commerce Back End

![MIT License](https://img.shields.io/badge/license-MIT-green)

## Description

This is a RESTful API created with express.js, a MySQL database, and the Sequelize ORM. The database is populated with data pertaining to a mock E-commerce Store, and this API is built with endpoints that allow a user to perform CRUD operations on all facets of the database.

## Table of Contents

* [Installation and Setup](#installation)
* [Usage](#usage)
* [License](#license)
* [Credits](#credits)
* [Authors](#authors)
* [Questions](#questions)

<div id="installation></div>
## Instillation and Setup

This application is replicating the back end of what would be an E-commerce store, and is not actually deployed on the web. In order to test the API yourself, you will need to follow the instructions below to run the server from your local machine.

This application requires node.js. If you do not have node.js installed, you can download it [here](https://nodejs.org/en/). It also requires the MySQL database management system. Instillation instructions for Windows and Mac operating systems can be found [here](https://coding-boot-camp.github.io/full-stack/mysql/mysql-installation-guide). To begin the instillation process once node.js and MySQL are installed, first clone this repository into your desired local directory. Next, navigate into the cloned repository and run the command `npm install` to install the required dependencies for the application. Lastly, it is recommended to use a program such as Insomnia to test the api once the server is running. You can download Insomnia [here](https://insomnia.rest/download).

To prepare this application for use you will first need to run the schema.sql files in the mySQL CLI. After logging in using your password with the command `mysql -u root -p`, run `source db/schema.sql` to initialize the database. You will also need to create a `.env` file in the root of the application directory that contains the following:

* DB_NAME='ecommerce_db'
* DB_USER='*your MySql username here*'
* DB_PW='*your MySql password here*'

To initialize the tables in the database, simply start running the server using the command `npm start`. At this point it is useful to seed the database with some starting data. Press `ctrl + c` to close the server, and run `npm run seed` in the command line to populate the database with seed data.

Now the API is ready for use. Simply run `npm start` whenever you want to launch the server and start using the API routes.

## Usage

The base address when running the server is `localhost:3001/api`. This precedes all of the following routes.

### Category Routes

* `GET /categories` - Returns a list of all categories.
* `GET /categories/:id` - Returns a single category with the id passed as a parameter.
* `POST /categories` - Creates a new category with the id passed as a parameter. The request body should be formatted as follows:
  * {  
    "category_name": "*category name here*"  
  }
* `PUT /categories/:id` - Updates an existing category. The request body should be formatted the same as `POST /categories`.
* `DELETE /categories/:id` - Deletes a category with the id passed as a parameter.

### Product Routes

* `GET /products` - Returns a list of all products.
* `GET /products/:id` - Returns a single product with the id passed as a parameter.
* `POST /products` - Creates a new Product with the id passed as a parameter. The request body should be formatted as follows:
  * {  
      "Product_name": "*product name here*"  
      "price": *product price here*,  
      "stock": *product stock here*,  
      "category_id": *id of category to which product belongs*,  
      -Optional-  
      tagIds: [*array of tag id's to which product belongs*]  
    }
* `PUT /products/:id` - Updates an existing product. The request body should be formatted the same as `POST /products`.
* `DELETE /products/:id` - Deletes a product with the id passed as a parameter.

### Tag Routes

* `GET /tags` - Returns a list of all tags.
* `GET /tags/:id` - Returns a single tag with the id passed as a parameter.
* `POST /tags` - Creates a new tag with the id passed as a parameter. The request body should be formatted as follows:
  * `{
    "tag_name": "*tag name here*"  
  }`
* `PUT /tags/:id` - Updates an existing tag. The request body should be formatted the same as `POST /tags`.
* `DELETE /tags/:id` - Deletes a tag with the id passed as a parameter.

[Walkthrough Video](https://watch.screencastify.com/v/MwdqVsAndB9EloZf2FxD)

## License

[MIT](./LICENSE.txt)

## Credits

Starter Code

* [UCF Coding Bootcamp](https://github.com/coding-boot-camp/fantastic-umbrella)

Technologies

* [Node.js](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)

NPM Dependencies

* [Express](https://www.npmjs.com/package/express)
* [Sequelize](https://sequelize.org/)
* [Node MySQL 2](https://www.npmjs.com/package/mysql2?__cf_chl_captcha_tk__=pmd_D_9ZYQ1MY_s2zyp9_cyigjzi9F6rp.HQGrKz3R3K9gA-1632161698-0-gqNtZGzNAuWjcnBszQfR)
* [dotenv](https://www.npmjs.com/package/dotenv)

## Authors

Aidan Amato

## Questions

Please reach out if you have any additional questions!

* [GitHub](https://github.com/aidanamato)
* [Email](mailto:aidanamato@comcast.net)
