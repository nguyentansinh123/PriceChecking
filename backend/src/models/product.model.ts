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
  store: {
    type: String,
    enum: ['Coles', 'IGA', 'Woolworths', 'Other'],
    default: 'Other'
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;

