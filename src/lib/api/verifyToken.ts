import jwt from "jsonwebtoken"

const verifyToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; };
        return decoded.userId;
    } catch (error) {
        console.error("Error verifying token:", error);
        throw new Error("Failed to verify token");
    }
}

export default verifyToken