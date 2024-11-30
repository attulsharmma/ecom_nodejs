// seed.js
import mongoose from "mongoose";
import Products from "../models/Products.js";
import Categories from "../models/Categories.js";
import { dummyData } from "../constants.js";
import dotenv from "dotenv";

dotenv.config();
const { MONGODB_URL_LOCAL } = process.env;
async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URL_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await Products.deleteMany({});
    await Categories.deleteMany({});

    // Insert seed data
    await Products.insertMany(dummyData.products);
    await Categories.insertMany(dummyData.categories);

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
