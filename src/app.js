import * as dotenv from "dotenv";
import express from 'express';

import hbs from 'express-handlebars';
import cartRoute from "./routes/cart.route.js";
import categoryRoute from "./routes/categories.route.js";
import productRoute from "./routes/products.route.js";

dotenv.config();
const PORT = process.env.HTTP_PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", hbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use('/carts', cartRoute);
app.use('/products', productRoute);
app.use('/categories', categoryRoute);

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port: ${httpServer.address().port}`);
});
httpServer.on("error", (error) => console.log(error));
