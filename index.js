const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");

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
app.use(express.json());
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
app.get("/", (req, res) => {
  res.send("<h1>multiple@@ docker files!!</h1>");
});
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
