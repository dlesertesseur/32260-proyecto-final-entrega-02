import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_DB_CONNECTION,
  { dbName: "ecommerce" },
  (error) => {
    if (error) {
      console.log("Cannot connect to db");
      process.exit();
    }
  }
);

class CartDao {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      let ret = await this.collection.find().lean();
      return ret;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      let ret = await this.collection.findById(id).populate("products").lean();
      return ret;
    } catch (error) {
      throw error;
    }
  }

  async insert(cart) {
    try {
      let ret = await this.collection.create(cart);
      return ret;
    } catch (error) {
      throw error;
    }
  }

  async update(id, body) {
    try {
      let cart = await this.collection.findOne(id);
      if (cart) {
        cart.products = body;
        const ret = await this.collection.updateOne(cart);
        return ret;
      } else {
        throw { message: "not found" };
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(id) {
    try {
      let cart = await this.collection.findOne(id);
      if (cart) {
        cart.products = [];
        const ret = await this.collection.updateOne(cart);
        return ret;
      } else {
        throw { message: "not found" };
      }
    } catch (error) {
      throw error;
    }
  }

  async addProduct(cid, pid, quantity) {
    try {
      let product = await this.collection.findById(cid);

      product.products.push(pid);

      let ret = await this.collection.findOneAndUpdate({ _id: cid }, product, {
        new: true,
      });

      return ret;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(cid, pid) {
    try {
      let cat = await this.collection.findById(cid);

      cat.products.push(pid);

      let ret = await this.collection.findOneAndUpdate({ _id: cid }, cat, {
        new: true,
      });

      return ret;
    } catch (error) {
      throw error;
    }
  }

  async removeProduct(cid, pid) {
    try {
      let cat = await this.collection.findById(cid);

      let index = cat.products.indexOf(pid);
      if (index > -1) {
        cat.products.splice(index, 1);
      }

      let ret = await this.collection.findOneAndUpdate({ _id: cid }, cat, {
        new: true,
      });

      return ret;
    } catch (error) {
      throw error;
    }
  }
}

export default CartDao;
