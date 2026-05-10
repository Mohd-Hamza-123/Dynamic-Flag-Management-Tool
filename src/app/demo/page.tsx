import verifyToken from "@/lib/verifyToken";
import { cookies } from "next/headers";
import DemoPage from "./DemoPage";

const Page = async () => {
    const token = (await cookies()).get("session-token")?.value;
    const user_id = token ? await verifyToken(token) : null;

    return <DemoPage user_id={user_id} />

}

export default Page;