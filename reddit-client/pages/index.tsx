import Navbar from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../src/generated/graphql";

const Home = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Navbar />
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
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
