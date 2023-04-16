import mongoose from "mongoose";
import {isValidPassword} from "../../util/Crypt.js";
import config from "../../config/config.js";

mongoose.set("strictQuery", false);
mongoose.connect(
  config.MONGO_URL,
  { dbName: "ecommerce" },
  (error) => {
    if (error) {
      console.log("Cannot connect to db");
      process.exit();
    }
  }
);

class UserDao {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    let ret = null;

    try {
      ret = await this.collection.find().lean();

      return ret;
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      let ret = await this.collection.findById(id);
      return ret;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email) {

    try {
      let ret = await this.collection.findOne({ email: email }).lean();
      return ret;
    } catch (error) {
      throw error;
    }
  }
  async insert(user) {
    try {
      let ret = await this.collection.create(user);
      return ret;
    } catch (error) {
      throw error;
    }
  }

  async update(id, user) {
    try {
      let ret = await this.collection.findOneAndUpdate({ _id: id }, user, {
        new: true,
      });
      return ret;
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      let ret = await this.collection.deleteOne({ _id: id });
      return ret;
    } catch (error) {
      throw error;
    }
  }

  async authenticate(email, password) {
    try {
      let user = await this.findByEmail(email);
      if (user) {
        if (isValidPassword(user, password)) {
          return user;
        } else {
          throw { status: 401, message: "Unauthorized - password error" };
        }
      } else {
        throw { status: 404, message: "email not found" };
      }
    } catch (error) {
      throw error;
    }
  }

  async findById(id) {
    try {
      let ret = await this.collection.findById(id).populate("cart").lean();
      return ret;
    } catch (error) {
      throw error;
    }
  }

  async register(user) {
    try {
      let userFound = await this.findByEmail(user.email);
      if (userFound) {
        throw { status: 409, message: "Conflict - User email already exists" };
      } else {
        const userCreated = await this.collection.create(user);
        return userCreated;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default UserDao;
