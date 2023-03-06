const inspectCart = async (id) => {
  console.log(`/carts/${id}`);
  location.href = `/carts/${id}`;
};

const removeProductsCart = async (id) => {
  await fetch(`/carts/${id}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    });
};

const addProductToCart = async (pid) => {
  /*Determinar de donde tomar el id de carrito*/
  const cid = "6405c81c5d44bc4cf36beced";

  await fetch(`/carts/${cid}/products/${pid}`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    });
};

const removeProductCart = async (cid, pid) => {
  await fetch(`/carts/${cid}/products/${pid}`, {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      location.reload();
    });
};