import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import "dotenv-safe/config";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import { buildSchema } from "type-graphql";
import { DataSource } from "typeorm";
import { COOKIE_NAME } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/posts";
import { UserResolver } from "./resolvers/user";

// import cors from "cors";

const main = async () => {
  const postgresDataSource = new DataSource({
    type: "postgres",
    port: 5432,
    database: "lireddit2",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [Post, User],
  });

  postgresDataSource
    .initialize()
    .then(() => {
      console.log("Initialized");
    })
    .catch((err) => console.error("err", err));
  const app = express();

  const redis = new Redis();

  let RedisStore = connectRedis(session);

  // app.use(cors({ origin: "*", credentials: true }));

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        // @ts-ignore
        client: redis,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      },
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
    })
  );

  const cors = {
    origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    credentials: true,
  };

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),

    context: ({ req, res }) => ({ req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: cors });

  app.listen(4000, () => {
    console.log(`Server Started at localhost:4000`);
  });
};

main();

console.log("Hello world");
