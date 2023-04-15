import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URL,
  { dbName: "ecommerce" },
  (error) => {
    if (error) {
      console.log("Cannot connect to db");
      process.exit();
    }
  }
);

class CategoryDao {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    let ret = null;

    try {
      ret = await this.collection.find().lean();

      return ret;
    } catch (error) {
      throw(error);
    }
  }

  async findById(id) {
    try {
      let ret = await this.collection.findById(id);
      return ret;
    } catch (error) {
      throw(error);
    }
  }

  async insert(category) {
    try {
      let ret = await this.collection.create(category);
      return ret;
    } catch (error) {
      throw(error);
    }
  }

  async update(id, category) {
    try {
      let ret = await this.collection.findOneAndUpdate({ _id: id }, category, {
        new: true,
      });
      return ret;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      let ret = await this.collection.deleteOne({ _id: id });
      return ret;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CategoryDao;
