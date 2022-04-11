import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { RequiredEntityData } from "@mikro-orm/core";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    return ctx.em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("_id", () => Int) _id: number,
    @Ctx()
    ctx: MyContext
  ): Promise<Post | null> {
    return ctx.em.findOne(Post, { _id });
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string,
    @Ctx()
    ctx: MyContext
  ): Promise<RequiredEntityData<Post>> {
    // @ts-ignore
    const post = ctx.em.create(Post, { title });
    await ctx.em.persistAndFlush(post);
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("_id") _id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx()
    ctx: MyContext
  ): Promise<Post | null> {
    const post = await ctx.em.findOne(Post, { _id });

    if (!post) {
      return null;
    }
    if (typeof title !== "undefined") {
      post.title = title;
      await ctx.em.persistAndFlush(post);
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Arg("_id") _id: number,
    @Ctx()
    ctx: MyContext
  ): Promise<boolean> {
    await ctx.em.nativeDelete(Post, { _id });
    return true;
  }
}
