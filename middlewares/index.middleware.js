export const addRequestDate = (req, res, next)=>{
    req.currentDate = new Date();
    next();
};