### Bookfiend Frontend


- [Let's get STAR ted ⭐!](#star-pls-)
- [Overview](#overview)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Disclaimer](#disclaimer)
- [License](#license)



# Let's get STAR ted ⭐!
  Liked it? Hit that star button.

# Overview
  A frontend project for my [Bookfiend](https://github.com/smh53/Bookfiend) project. Designed with Angular (16.2.0). Used Material Design components

 # Usage

`git clone https://github.com/smh53/Bookfiend_frontend` 

# Screenshots
  - Dynamic CRUD operations on complex entities. (Create Book, assign it to an Author, update and delete it dynamically): 
     
      ![create-update-2023-7-29](https://github.com/smh53/bookfiend_frontend/assets/39862947/14599ed1-4ef5-40ce-bca7-08a59cae6ae0)
      
      ![deleting-2023-7-29](https://github.com/smh53/bookfiend_frontend/assets/39862947/f78d3d8f-d96f-4e7c-ab05-736e82632fff)

   - JWT claim-based authorization on both client and server side. Users have roles and roles have claims. Claims gets added to user's token.
        - Delete book button is disabled because there is no ```delete``` value under the ```book``` claim in the token:
          
        ![cba-jwt-2023-7-30](https://github.com/smh53/bookfiend_frontend/assets/39862947/5f6aafde-96d3-4185-9a33-6d2d993eb59e)
     
        - ``` GET ``` ```http://localhost:xxxx/api/books``` operation fails with ```403``` status code because there is no ```list``` value under the ```book``` claim in the token:
          
        ![cliam-jwte-2023-7-30](https://github.com/smh53/bookfiend_frontend/assets/39862947/1cf7d796-313a-4b57-ae67-0a712ddddf20)

  - Claims in the database :
  
      ![sql-claim-tableopt-2023-7-31](https://github.com/smh53/bookfiend_frontend/assets/39862947/17b40fae-879a-4864-9c41-bc30d4edfb09)


  - Multiple column filtering:

    ![multiple-filtering-2023-7-29](https://github.com/smh53/bookfiend_frontend/assets/39862947/357ed4e6-e052-4b6c-a122-9e5e977a41d6)

    
    

# Disclaimer

This project is created for educational purposes. The source code is licensed under the MIT license.

# License

This project is licensed under the terms of the [MIT](https://github.com/smh53/Bookfiend/blob/master/LICENSE.txt) license.


