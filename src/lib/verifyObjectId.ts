import mongoose from "mongoose";

export function isValidObjectId(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return false
    } 
    return true
}