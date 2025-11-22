export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static add(name, email, password) {
    // Logic to add a new user to the database

    const newUser = new UserModel(users.length + 1, name, email, password);
    users.push(newUser);
  }

  static isValidUser(email, password) {
    // Logic to validate user credentials
    const result = users.find(
      (user) => user.email == email && user.password == password
    );
    return result;
  }
}

var users = [];
