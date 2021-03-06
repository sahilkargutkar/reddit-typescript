import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../src/generated/graphql";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Layout from "../components/Layout";
import { useState } from "react";

const Home = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  console.log(variables);

  if (!fetching && !data) {
    return <div>Something Failed please try again</div>;
  }

  return (
    <Layout variant="regular">
      <Flex align="center">
        <Heading>Reddit</Heading>
        <NextLink href="/create-post" passHref>
          <Link ml="auto" color="blue">
            Create Post
          </Link>
        </NextLink>
      </Flex>
      <br />
      {fetching && !data ? (
        <>
          <div>Loading...</div>
        </>
      ) : (
        <Stack spacing={8}>
          {data!.posts.map((p) => (
            <Box key={p._id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts[data.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
