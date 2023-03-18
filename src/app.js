import * as dotenv from "dotenv";
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport'
import hbs from 'express-handlebars';
import authRoute from "./routes/auth.route.js";
import cartRoute from "./routes/cart.route.js";
import categoryRoute from "./routes/categories.route.js";
import productRoute from "./routes/products.route.js";
import sessionsRouter from "./routes/session.route.js";
import initializePassport from "./config/passport.config.js";

dotenv.config();
const PORT = process.env.HTTP_PORT || 8080;

const mongoUrl = process.env.MONGO_DB_CONNECTION;
const dbName = process.env.DB_NAME;

const mongoStore = MongoStore.create({
  mongoUrl: mongoUrl,
  dbName: dbName,
  mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  ttl: 150
})

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(session({
  store: mongoStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

/*Inicializa la configuracion de passport */
initializePassport();

app.engine("handlebars", hbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoute);
app.use('/api/carts', cartRoute);
app.use('/api/products', productRoute);
app.use('/api/categories', categoryRoute);
app.use("/api/sessions", sessionsRouter);

app.use('/', (req, res) => {res.redirect("/api/auth/login")});

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port: ${httpServer.address().port}`);
});
httpServer.on("error", (error) => console.log(error));
