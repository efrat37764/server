export const addRequestDate = (req, res, next) => {
    req.currentDate = new Date();
    next();
};


export const logGetRequests = (req, res, next) => {
    console.log(`GET request received at: ${req.currentDate}`);
    next();
};