import {
  findCardById,
  getAllCards,
  insertCart,
  updateCart,
  removeCart,
  addProductToCard,
  updateProductCart,
  removeProductCart,
} from "../services/cart.service.js";

const getAll = async (req, res) => {
  try {
    const carts = await getAllCards();
    res.render("carts", {
      title: "Carts",
      style: "index.css",
      carts,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const insert = async (req, res) => {
  try {
    const cart = await insertCart(req.body);
    res.send(cart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await updateCart(cid, req.body);
    res.send(cart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const cart = await removeCart(req.body);
    res.send(cart);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  const cid = req.params.cid;
  if (cid) {
    try {
      const cart = await findCardById(cid);
      res.render("cart", {
        title: "Cart",
        style: "index.css",
        cart,
      });

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};

const addProduct = async (req, res) => {
  let cart = null;
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.params.quantity ? req.params.quantity : 1;

  if (cid && pid) {
    try {
      cart = await addProductToCard(cid, pid, quantity);
      res.send(cart);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};

const removeProduct = async (req, res) => {
  let cart = null;
  const cid = req.params.cid;
  const pid = req.params.pid;

  if (cid && pid) {
    try {
      cart = await removeProductCart(cid, pid);
      res.send(cart);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};

const updateProduct = async (req, res) => {
  let cart = null;
  const cid = req.params.cid;
  const pid = req.params.pid;
  const body = req.body;

  console.log("cart.controller -> updateProduct", cid, pid, body);

  if (cid && pid) {
    try {
      cart = await updateProductCart(cid, pid, body);
      res.send(cart);
    } catch (error) {
      res.status(error.code).send({ message: error.message });
    }
  } else {
    res.status(400).send({ message: "Bad request" });
  }
};

export {
  getAll,
  findById,
  insert,
  update,
  remove,
  addProduct,
  removeProduct,
  updateProduct,
};
