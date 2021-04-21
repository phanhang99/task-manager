require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userRoutes = require('./routes/user.route')
const authRoutes = require('./routes/auth.route')
const categoryRoutes = require('./routes/category.route')
const teamRoutes = require('./routes/team.route')
const cardRoutes = require('./routes/card.route')

const authUserMiddleware = require("./middlewares/auth-user.middleware");
const authAdminMiddleware = require("./middlewares/auth-admin.middleware");
const getTeamsMiddleware = require("./middlewares/get-teams.middleware");
const getCategoriesMiddleware = require("./middlewares/get-categories.middleware");

const port = 2000;
const app = express();

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static("public"));
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.get("/", authUserMiddleware.requireAuth, getTeamsMiddleware.getAll, getCategoriesMiddleware.getAll, (req, res) =>{
  let teams = res.locals.teams;
  let cates = res.locals.categories;
  for(let i=0 ; i<teams.length; i++){
    teams[i].categories = cates.filter(el => teams[i].id == el.id_team.id)
  }
  res.render("index",{...res.locals.user,teams: teams});
});

app.get("/admin",authUserMiddleware.requireAuth,authAdminMiddleware.requireAuthAdmin , (req, res) => {
  res.status(200).send("Access Allowed")
})

app.use('/auth', authRoutes);

app.use('/category', categoryRoutes);
app.use('/team', teamRoutes);
app.use('/card', cardRoutes);

app.use("/user", authUserMiddleware.requireAuth, userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
