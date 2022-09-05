# Book Store Project
This is NTI Graduation project I did it with my teammate <a href="https://github.com/Abdallahhany">Abdallah Hany</a> to manage books by admin and users can make orders.
## Features
**User**
- User can see all the books
- User can see the details of a single book
- User can regisrer and login
- Registered User can add book to the cart
- Registered User can see all the books added to his cart
- Registered User can make order from the books in his cart
- Registered User can view/edit his own profile
- Registered User can logout<br/>

**Admin**
- Admin can see all the books and the details of a single book
- Admin can add/delete books
- Admin can edit single book
- Admin can see the users of the system
- Admin can view/edit his own profile
## Technologies
- Front-end<br/>
**HTML** - **CSS** - **Bootstrap** - **Angular**
- Back-end and Database<br/>
**NodeJS** - **ExpressJS** - **MongoDB**<br/>

We used **"mongoose"** to create schema for the models.<br/>
We Used **"cors"** package to make Angular use the Back-end APIs.<br/>
We Used **"bcrypt"** and **"jsonwebtoken"** packages to encrypt the password and make token for logged users.
## Get Started
1- Clone the project
```
git clone git@github.com:nadausama17/Book-Store.git
```
2- Open the backend folder and add .env to it that contains<br/>
`PORT= 3000 or the port you want` <br/>
`MONGOURL=your mongodb url` <br/>
`JWT_SECRET=any secret key you want` <br/><br/>

3- Open the terminal for the backend folder and write
```  
npm install  //to install all the packages in your project
```
4- To run the backend write
```
npm start or node index
```
5- Open the terminal for the frontend folder and write
```
npm install  //to install all the packages in your project
```
6- To run the frontend write
```
ng serve //the localhost will appear then open it in your browser
```
