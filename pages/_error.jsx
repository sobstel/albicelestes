import Layout from "components/Layout";

function Error({ statusCode }) {
  return (
    <Layout title={`Error #${statusCode}`}>
      <p>{statusCode ? `Server error #${statusCode}` : "Client error"}</p>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
