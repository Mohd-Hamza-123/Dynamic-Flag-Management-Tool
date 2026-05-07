import { WorkspaceListResponse } from "@/types/frontend";
import WorkSpaceCard from "./WorkSpaceCard";

const WorkSpaceList = ({ data }: { data: WorkspaceListResponse | undefined }) => {

    if (!data || !data.success) return (
        <section className="p-4 space-y-2 bg-gray-500/20 border rounded-md border-gray-500/10">
            <h3 className="text-center">Uh Oh! Something went wrong</h3>
            <p className="ghost text-center">{data?.message || "Please refresh the page and try again"}</p>
        </section>
    )

    else if (!data.workspaces || !data.workspaces.length) return (
        <section className="p-4 space-y-2 bg-gray-500/20 border rounded-md border-gray-500/10">
            <h3 className="text-center">So Empty!</h3>
            <p className="ghost text-center">Start creating Workspaces now</p>
        </section>
    )

    return (
        <section className="max-w-3xl grid grid-cols-2 gap-4 mx-auto">
            {data.workspaces.map(wsp => (
                <WorkSpaceCard {...wsp} />
            ))}
        </section>
    )

}

export default WorkSpaceList;