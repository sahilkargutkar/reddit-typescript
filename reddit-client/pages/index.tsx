import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../src/generated/graphql";
import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../components/Layout";

const Home = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 5,
    },
  });
  return (
    <Layout variant="regular">
      <Flex align="center">
        <Heading>Reddit</Heading>
        <NextLink href="/create-post" passHref>
          <Link color="blue">Create Post</Link>
        </NextLink>
      </Flex>
      <br />
      {!data ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <Stack spacing={8}>
          {data.posts.map((p) => (
            <Box key={p._id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
