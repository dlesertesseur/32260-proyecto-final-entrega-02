function getRoleByUser(user) {
  let role = null;

  try {
    if (
      user.email === "adminCoder@coder.com" &&
      user.password === "adminCod3r123"
    ) {
      role = "admin";
    } else {
      role = "user";
    }
  } catch (error) {
    console.log(error);
    role = "user";
  }

  return role;
}

export {getRoleByUser}
