const express = require("express");
const { request, response } = require("http");
const server = express();
const mongoose = require("mongoose");
const Product = require("./models/product");
const User = require("./models/user");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = 3000;
require("dotenv").config({ path: "../.env" });

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());
// console.log(process.env);
mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    server.listen(port, () => {
      console.log(`Listening on ${port}...\nConnected to DB`);
    });
  })
  .catch((error) => console.log(error));

server.get("/", (request, response) => {
  response.send("LIVE!");
});

server.get("/products", async (request, response) => {
  const products = await Product.find();
  response.send(products);
});

server.post("/submitProduct", async (request, response) => {
  const productData = ({ id, productName, brand, quantity, image, price } =
    request.body);
  const newProduct = new Product(productData);
  const saveProduct = await newProduct.save();
  if (saveProduct) {
    response.send("Product Submitted");
  } else {
    response.send("Failed!!!");
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  const deleteProduct = await Product.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  }); //change the id from string to object id to be used by mongoDB
  deleteProduct ? response.send("Product Deleted") : response.send("FAILED!!");
});

server.patch("/products/:id", async (request, response) => {
  const { id } = request.params;
  const product = request.body;
  const patchProduct = await Product.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: product }
  );
  patchProduct
    ? response.send(`${product.productName} product is edited`)
    : response.send("Failed to edit");
});

////////////////user registration post

server.post("/register", async (request, response) => {
  const { username, password } = request.body;
  const loginUser = await User.findOne({ username }).then(async (user) => {
    if (user) {
      response.send({ message: "username already exists", isCreated: false });
    } else {
      const newUser = await new User({
        username: username,
      });
      newUser.password = newUser.generateHash(request.body.password);
      const saveUser = await newUser.save();

      saveUser
        ? response.send({
            message: `Congrats! created username ${username}`,
            isCreated: true,
          })
        : response.send({
            message: "failed to store new user",
            isCreated: false,
          });
    }
  });
});

///////////////user verfication post

server.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const jwtToken = jwt.sign({ id: username }, "secret");
  const loginUser = await User.findOne({ username }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          response.send(err);
        }
        if (res) {
          response.send({ message: "success", token: jwtToken });
        } else {
          response.send({ message: "Bad username or password" });
        }
      });
    } else {
      response.send({ message: "Username does not exist" });
    }
  });
});
