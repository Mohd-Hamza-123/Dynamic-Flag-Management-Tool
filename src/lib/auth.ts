import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import verifyToken from "./verifyToken";

export const isValidUser = async (jar: ReadonlyRequestCookies) => {
    const token = jar.get("session-token")?.value;

    if (!token) return null;

    const user_id = await verifyToken(token)
        .catch(e => {
            console.warn(e);
            return null
        });

    return user_id;

}