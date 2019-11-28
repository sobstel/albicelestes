import Layout from "components/Layout";

function serverErrorMessage(statusCode) {
  if (statusCode == 404) {
    return "Page not found";
  }

  return `Server error: #${statusCode}`;
}

function Error({ statusCode }) {
  return (
    <Layout title={`Error #${statusCode}`}>
      <p>{statusCode ? serverErrorMessage(statusCode) : "Client error"}</p>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
