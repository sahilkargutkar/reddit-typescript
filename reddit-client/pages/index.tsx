import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../src/generated/graphql";
import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../components/Layout";

const Home = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout variant="regular">
      <NextLink href="/create-post">
        <Link color="blue">Create Post</Link>
      </NextLink>

      <div>Hello World</div>
      <br />
      {!data ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        data.posts.map((p) => (
          <>
            <div>{p.title}</div>
          </>
        ))
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
