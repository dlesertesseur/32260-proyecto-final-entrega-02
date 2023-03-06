import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
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

class ProductDao {
  constructor(collection, schema) {
    schema.plugin(mongoosePaginate);
    this.collection = mongoose.model(collection, schema);
  }

  async getAll(limit = 10, page = 1, sort, query = null) {
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      lean: true,
      sort: { price: sort === "asc" ? 1 : -1 },
    };

    const queryParams = query
      ? { category: query, stock: { $gt: 0 } }
      : { stock: { $gt: 0 } };

    try {
      const pagination = await this.collection.paginate(queryParams, options);

      const resp = {
        status: "success",
        payload: pagination.docs,
        totalPages: pagination.totalPages,
        prevPage: pagination.prevPage,
        nextPage: pagination.nextPage,
        page: pagination.page,
        hasPrevPage: pagination.hasPrevPage,
        hasNextPage: pagination.hasNextPage,
        prevLink: pagination.hasPrevPage
          ? `/products?limit=${limit}&page=${pagination.prevPage}&sort=${sort}&query=${queryParams}`
          : null,
        nextLink: pagination.hasNextPage
          ? `/products?limit=${limit}&page=${pagination.nextPage}&sort=${sort}&query=${queryParams}`
          : null,
      };

      return resp;
    } catch (error) {
      const resp = {
        status: "error",
        payload: null,
        totalPages: 0,
        prevPage: null,
        nextPage: null,
        page: null,
        hasPrevPage: false,
        hasNextPage: false,
        prevLink: null,
        nextLink: null,
      };
      throw resp;
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

  async insert(product) {
    try {
      let ret = await this.collection.create(product);
      return ret;
    } catch (error) {
      throw error;
    }
  }

  async update(id, product) {
    try {
      let ret = await this.collection.findOneAndUpdate({ _id: id }, product, {
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
}

export default ProductDao;
