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
  const cid = "6404abdd4b3990bc50cc46b4";

  await fetch(`/carts/${cid}/product/${pid}`, {
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
