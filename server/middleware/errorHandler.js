const errorHandler = (err, req, res, next) => {
  console.log(err);

  const status = res.statusCode ? res.statusCode : 500;

  res.status(status);

  res.json({
    message: err.message,
    isError: true,
  });

  next();
};

module.exports = errorHandler;