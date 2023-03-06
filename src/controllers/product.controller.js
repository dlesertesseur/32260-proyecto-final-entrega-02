import {
  getAllProducts,
  findProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";

const getAll = async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const sort = req.query.sort;
  const query = req.query.query;

  try {
    const data = await getAllProducts(limit, page, sort, query);

    res.render("products", {
      title: "Products",
      style: "index.css",
      data,
    });
    
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  const pid = req.params.pid;

  try {
    const product = await findProductById(pid);
    res.send(product);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

const insert = async (req, res) => {
  let product = null;
  try {
    product = await insertProduct(req.body);
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  const pid = req.params.pid;

  if (pid) {
    try {
      const product = await updateProduct(pid, req.body);
      res.send(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};

const remove = async (req, res) => {
  const pid = req.params.pid;

  if (pid) {
    try {
      const product = await deleteProduct(pid);
      res.send(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }

};
export { getAll, findById, update, insert, remove };
