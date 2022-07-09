const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const cors = require("cors");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  SESSION_SECRET,
  REDIS_IP,
  REDIS_PORT,
} = require("./config/config");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_IP,
  port: REDIS_PORT,
});

redisClient.on("error", (err) =>
  console.log("Redis Client Error:::BOOOOO", err)
);

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // findAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to our mongo database!");
    })
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

const postRouter = require("./routes/postsRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 60 * 1000,
    },
  })
);
app.use(express.json());
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.get("/api/v1", (req, res) => {
  console.log("YEP IT RAN");
  res.send("<h1>multiple@@ docker files!!</h1>");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
