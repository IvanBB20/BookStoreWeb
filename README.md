# Bookstore Application

## Description
The Bookstore Application is a web-based platform where users can browse and order books online. Users can create accounts, log in , and manage their orders. The application is built with a React frontend for the user interface and a Spring Boot backend to handle data processing and server-side logic.

## Features
- **User Authentication**: Users can create accounts and  log in to can access and order in  the bookstore .
- **Book Browsing**: You can browse through a collection of books.
- **Book Filtering**: You filter based on price and genre(you do not need to be authenticated).
- **Ordering Books**: Authenticated users can add books to their cart and proceed with the checkout process to place orders.
- **Autorization** :Every user that logs in has a role of 'USER' and there is a special user that has the roles of 'USER' and 'ADMIN' who can upload books as well.

## Technologies Used
- **Frontend**: React.js
- **Backend**: Spring Boot
- **Database**:MongoDB Atlas
- **Authentication**: JSON Web Tokens(JWT) and Spring security (for authorization)
- **API Communication**: RESTful APIs

# Preview and Examples

## Registration page
![Image Description](https://i.imgur.com/fJ82zpr.jpg) 

## Login page
![Image Description](https://i.imgur.com/W6TFP1A.jpeg) 

## Books page if User is not Authenticated
![Image Description](https://i.imgur.com/eQxZSiJ.jpeg) 

## Books paga is User is Authenticated
![Image Description](https://i.imgur.com/NwgxB56.jpeg) 

## Books page if you filter based on price
![Image Description](https://i.imgur.com/3fWI6R3.jpeg)

## Books page if you filter based on genre
![Image Description](https://i.imgur.com/rMEl9WU.jpeg)

## Books page if you filter based on price and genre
![Image Description](https://i.imgur.com/kcuzrCh.jpeg)

***Show all button* removes all filtering and shows all books again.If you click on a price filter it disables all other price filters(same for the genre filter)**


## Books page if you click on button to add a Book
![Image Description](https://i.imgur.com/EkuHr0z.jpeg)
**If you click go on cart , you will be redirected to the ordering page , if you click  contine you will browse for more books**

## Order Page (only authenticated users can access it)
![Image Description](https://i.imgur.com/jyyfvG7.jpeg)

**By pressing the X , users can remove a book from their order**
**By pressing *Press to buy Your order of Books* a progress bar appears to proccess the order**
![Image Description](https://i.imgur.com/ZYjCgxm.jpeg)
**In this example progress order is at 20%**

## Result after order is proccessed
![Image Description](https://i.imgur.com/AafQhE9.jpeg)

## Admin page (only users with the role of 'ADMIN' can access it) to post books to the store
![Image Description](https://i.imgur.com/D8AI9dD.jpeg)
