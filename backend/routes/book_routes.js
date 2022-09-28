const express = require("express");
const bookRouter = express.Router();
const bookController = require("../controllers/book_controller");
const upload = require("../middlewares/uploadFile_middleware");
const NotFound = require("../controllers/error");
const { isAuth, authRoles } = require("../middlewares/auth_middleware");

//admin and user
bookRouter.get("/", bookController.allBooks);
bookRouter.get("/single/:bookId", bookController.singleBook);
bookRouter.get("/favbooks", isAuth, bookController.getUserFavBooks);

bookRouter.post("/addtofavourite",isAuth,bookController.addBookToFavourtie);
//admin
bookRouter.post("/add", isAuth, authRoles("admin"),upload.single("bookImg"),
bookController.addBook);

bookRouter.put("/update/:bookId",isAuth,authRoles("admin"),upload.single("bookImg"),
bookController.updateBook);

bookRouter.delete("/delete/:bookId",isAuth,authRoles("admin"),bookController.deleteBook);

bookRouter.all("*", NotFound.notFoundPage);

module.exports = bookRouter;
