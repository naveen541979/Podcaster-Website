import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify token using the ACCESS_TOKEN_SECRET from environment
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        if (!decodedToken) {
            throw new ApiError(401, "Invalid Access Token");
        }

        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});



// export const isAdmin = asyncHandler(async (req, res, next) => {
//     const token =
//         req.cookies?.accessToken ||
//         req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//         throw new ApiError(401, "Unauthorized: No access token provided");
//     }

//     let decoded;
//     try {
//         decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     } catch (err) {
//         throw new ApiError(401, "Unauthorized: Invalid or expired access token");
//     }

//     const user = await User.findById(decoded?._id).select("-password -refreshToken");

//     if (!user) {
//         throw new ApiError(403, "Unauthorized: User not found");
//     }

//     if (user.role !== 'admin') {
//         throw new ApiError(403, "Unauthorized: Admin access required");
//     }

//     req.user = user;
//     next();
// });