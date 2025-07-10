import User from "../models/user.model.js";
import { ErrorHandler } from "../utils/errorHandler.utils.js";
import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  // console.log("COOKIES ", req.cookies);
  const cookies = req.cookies.myCookie;
  //   if (cookies == null || cookies == undefined) OR
  if (!cookies) {
    throw new ErrorHandler("please login to access this resource", 401);
  }
  //*statements-- decrypt the cookies
  let decodedToken = jwt.verify(cookies, process.env.JWT_SECRET_KEY);
  // console.log("DECODED-TOKEN ", decodedToken);
  let decodedID = decodedToken.id;
  let myUser = await User.findOne({ _id: decodedID });
  //~ let myUser = await User.findById(decodedID); this is mongoose method
  if (!myUser) return next(new ErrorHandler("Token Expired, please log in again", 401));
  // console.log("finding user - decoded id", myUser);
  //* modifying req object
  req.user = myUser;
  next();
};

export default authenticate;
