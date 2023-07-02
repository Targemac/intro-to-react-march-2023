require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const connectDB = require("./config/db_connect");
const userRouter = require("./routes/usersRoutes");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

connectDB();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017/e-shop",
  collection: "mySessions",
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: "This is a secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
  })
);

// users route
app.use("/api/users", userRouter);

// create default route
app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Admin route!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}!`);
});
