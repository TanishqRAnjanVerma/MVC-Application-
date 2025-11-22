import express from "express";
import path from "path";
import ProductController from "./src/controllers/product.controller.js";
import UserController from "./src/controllers/user.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import validationMiddleware from "./src/middleware/validation.middleware.js";
import { uploadFile } from "./src/middleware/file-upload.middleware.js";
import session from "express-session";
import { auth } from "./src/middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middleware/lastVisit.middleware.js";

const server = express();
// Serve static files from the 'public' directory
server.use(express.static("public"));
server.use(cookieParser());

// Middleware to parse URL-encoded bodies
server.use(express.urlencoded({ extended: true }));
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Setup a view engine
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));

server.use(expressEjsLayouts);

// Create an instance of ProductController
const productController = new ProductController();

const usersController = new UserController();

server.get("/register", usersController.getRegister);
server.get("/login", usersController.getLogin);
server.post("/login", usersController.postLogin);
server.get("/logout", usersController.logout);
server.post("/register", usersController.postRegister);
server.get("/", setLastVisit, auth, productController.getProducts);
server.get("/new", auth, productController.getAddForm);
server.get("/update-product/:id", auth, productController.getUpdateProductView);
server.post("/delete-product/:id", auth, productController.deleteProduct);
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validationMiddleware,
  productController.addNewProduct
);
server.post("/update-product", productController.postUpdateProduct);

// Serve static files
server.use(express.static("src/views"));
server.use(express.static("public"));

server.get("/", (req, res) => {
  res.send("Server running!");
});
