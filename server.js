const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");


// const fs = require("fs");

// let products = require("./products");




const app = express();

app.use(express.static(path.join(__dirname, "client/build")));

mongoose.connect("mongodb+srv://shuki:12345@cluster0.7o9mm.mongodb.net/beta_shop?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());
app.use(cors());
// var whitelist = ['http://localhost:3000', 'http://localhost:3001']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions));
// const corsOptions = {
  //   origin: "http://localhost:3001",
  //   optionsSuccessStatus: 200, 
  // };
  
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
    console.log("Example app listening on port 5000!");
  });
});
