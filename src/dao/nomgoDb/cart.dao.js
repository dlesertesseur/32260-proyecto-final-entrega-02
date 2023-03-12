import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_DB_CONNECTION, { dbName: "ecommerce" }, (error) => {
  if (error) {
    console.log("Cannot connect to db");
    process.exit();
  }
});

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
      let ret = await this.collection.findById(id).populate("products.product").lean();
      return ret;
    } catch (error) {
      throw error;
    }
  }

  async findByUserId(uid) {
    try {
      let cart = await this.collection.findOne({user:uid}).lean();
      return cart;
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

  async remove(cid) {
    try {
      let cart = await this.collection.findOne(cid);
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
      let cart = await this.collection.findById(cid).lean();

      //Busca el producto en el carrito
      const cartItem = cart.products.find((item) => {
        return item.product.toString() === pid;
      });

      if (cartItem) {
        //Si ya esta agregado al carrito le suma la cantidad pasada
        cartItem.quantity += quantity;
      } else {
        const item = { product: pid, quantity: quantity };
        cart.products.push(item);
      }

      let ret = await this.collection.findOneAndUpdate({ _id: cid }, cart, {
        new: true,
      });

      return ret;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(cid, pid, body) {
    try {
      let ret = null;
      let cart = await this.collection.findById(cid).lean();

      //Busca el producto en el carrito
      const cartItem = cart.products.find((item) => {
        return item.product.toString() === pid;
      });

      if (cartItem) {
        //Si existe, asigna la cantidad pasada.
        cartItem.quantity = body.quantity;

        ret = await this.collection.findOneAndUpdate({ _id: cid }, cart, {
          new: true,
        });
      } else {
        throw { code: 404, message: `Product id: ${pid} Not Found` };
      }

      return ret;
    } catch (error) {
      throw error;
    }
  }

  async removeProduct(cid, pid) {
    try {
      let ret = null;
      let cart = await this.collection.findById(cid).lean();

      //Busca el producto en el carrito
      const items = cart.products.filter((item) => {
        return item.product.toString() !== pid;
      });

      if (items) {
        cart.products = items;
        ret = await this.collection.findOneAndUpdate({ _id: cid }, cart, {
          new: true,
        });
      } else {
        throw { code: 404, message: `Product id: ${pid} Not Found` };
      }

      return ret;
    } catch (error) {
      throw error;
    }
  }
}

export default CartDao;
