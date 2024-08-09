import React from 'react';

const ErrorPage = ({ statusCode }) => {
  return (
    <div className="text-center p-4">
      <h1 className="text-4xl font-bold">An Error Occurred</h1>
      <p className="text-xl">Status Code: {statusCode}</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res }) => {
  const statusCode = res ? res.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
