export default class ProductModel {
  constructor(_id, _name, _price, _desc, _imageUrl) {
    this.id = _id;
    this.name = _name;
    this.price = _price;
    this.desc = _desc;
    this.imageUrl = _imageUrl;
  }

  static get() {
    return products;
  }

  static add(name, price, desc, imageUrl) {
    let newProduct = new ProductModel(
      products.length + 1,
      name,
      price,
      desc,
      imageUrl
    );

    products.push(newProduct);
  }

  static update(productObj) {
    const index = products.findIndex((product) => product.id == productObj.id);
    products[index] = productObj;
  }

  static getById(id) {
    return products.find((product) => product.id == id);
  }

  static delete(id) {
    const index = products.findIndex((product) => product.id == id);
    products.splice(index, 1);
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg"
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg"
  ),
];
