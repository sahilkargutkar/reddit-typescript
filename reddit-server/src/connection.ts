import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

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

export default postgresDataSource;
