import crypto from "crypto";

function hashUserId(userId:string) {
    const hash = crypto.createHash("sha256").update(userId).digest("hex");
    // console.log(hash)
    // 1. create hash object
    // 2. feed the input userId 
    // 3. generate hash output by digest
    // 4. convert the first 8 characters of the hash to an integer (base 16)
    return parseInt(hash.substring(0, 8),16)
}

export default hashUserId