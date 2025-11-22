import path from "path";
import ProductModel from "../models/product.model.js";

export default class ProductController {
  getProducts(req, res, next) {
    var products = ProductModel.get();
    console.log(products);
    res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  getAddForm(req, res, next) {
    res.render("new-product", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }
  addNewProduct(req, res, next) {
    const { name, price, desc } = req.body;
    const imageUrl = "images/" + req.file.filename;
    ProductModel.add(name, price, desc, imageUrl);
    var products = ProductModel.get();
    return res.render("products", {
      products: products,
      userEmail: req.session.userEmail,
    });
  }

  getUpdateProductView(req, res, next) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    } else {
      res.status(401).send("Product not found");
    }
  }

  postUpdateProduct(req, res) {
    ProductModel.update(req.body);
    var products = ProductModel.get();
    return res.render("products", { products: products });
  }

  deleteProduct(req, res) {
    const id = req.params.id;
    var products = ProductModel.get();
    const productFound = ProductModel.getById(id);
    if (!productFound) {
      return res.status(401).send("Product not found");
    }
    ProductModel.delete(id);
    res.render("products", { products });
  }
}
