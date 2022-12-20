const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  return res.status(status).json(err.message || 'Something went wrong');
};

export default errorHandler;
