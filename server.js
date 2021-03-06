const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();


const app = express();

app.use(express.static(path.join(__dirname, "client/build")));
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
app.use(cors());

  
  const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
  });
  const Product = mongoose.model("Product", productSchema);
  
  
  app.get("/api/products", async(req, res) => {
    const products = await Product.find({}).exec();
  const { q } = req.query;
  if (q) {
    res.send(products.filter((product) => product.title.includes(q)));
  } else {
    res.send(products);
  }
});
app.get("/api/products/:id", async(req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).exec();
  res.send(product ?? {});
});
app.get("/api/products/:id", async(req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({title}).exec();
  res.send(product ?? {});
});
app.post("/api/products", async(req, res) => {
  const { title, price, description, category, image } = req.body;
 await new Product({ title, price, description, category, image }).save();

  res.send("OK");
});
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;

  await Product.updateOne({ _id: id }, { title, price, description, category, image },{omitUndefined:true}).exec();
  res.send("OK!");
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  await Product.deleteOne({ _id: id }).exec();
  res.send("OK!");
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
const db = mongoose.connection;
const port = process.env.PORT || 5000;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
  });
});
