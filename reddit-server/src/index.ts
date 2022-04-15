import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import "dotenv-safe/config";
import { COOKIE_NAME, __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/posts";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";

// import cors from "cors";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up(); //run migrations
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

    context: ({ req, res }) => ({ em: orm.em, req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: cors });

  app.listen(4000, () => {
    console.log(`Server Started at localhost:4000`);
  });
};

main();

console.log("Hello world");
