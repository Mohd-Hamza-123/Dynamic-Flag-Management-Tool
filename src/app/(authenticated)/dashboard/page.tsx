"use client";

import AddWorkspaceButton from "@/components/AddWorkspaceButton";
import OptionalChildren from "@/components/ui/OptionalChildren";
import { FullPageSpinner } from "@/components/ui/Spinner";
import WorkSpaceList from "@/components/WorkspaceList";
import { useQuery } from "@/lib/hooks";
import { WorkspaceListResponse } from "@/types/frontend";
import { CircleUserRoundIcon } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const { loading, data, queryFn } = useQuery<WorkspaceListResponse | undefined>("/api/workspaces");

  return (
    <main className="max-w-3xl mx-auto space-y-6 pb-6 pt-4">

      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your application features dynamically
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <AddWorkspaceButton refresh={queryFn} />
          <Link href="/me">
            <CircleUserRoundIcon className="size-5" />
          </Link>
        </div>
      </header>


      <OptionalChildren condition={!loading} fallback={<FullPageSpinner />}>
        <WorkSpaceList data={data} />
      </OptionalChildren>
    </main>
  );
}

export default Dashboard;