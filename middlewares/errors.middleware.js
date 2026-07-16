export const notFound = (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    next(error);
};



export const errorHandler = (err, req, res, next) => {
    const { status = 500 } = err;

    const errorResponse = {
        message: err.error?.message || 'Something went wrong',
        type: err.type || 'server error',
    };

    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.error?.stack;
    }

    res.status(status).json({ error: errorResponse });
};