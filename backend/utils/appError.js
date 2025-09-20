const globalErrorHandler = (err, req, res, next) => {
    const stack = err?.stack || 'No stack trace available';
    const message = err?.message || 'An unknown error occurred';
    const status = err?.status || 'failed';
    const statusCode = err?.statusCode || 500;

    res.status(statusCode).json({
        status,
        message,
        stack
    });
};

module.exports = globalErrorHandler;