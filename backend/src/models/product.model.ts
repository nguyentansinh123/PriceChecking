import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  href: {
    type: String,
  },
  source: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;

