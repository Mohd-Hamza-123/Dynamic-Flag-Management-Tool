"use client";

import { useQuery } from "@/lib/hooks";
import { Flag, ServerResponseType } from "@/types/frontend";
import FlagCard from "./FlagCard";
import { Spinner } from "./ui/Spinner";

export default function FlagList({ wsp_id }: { wsp_id: string }) {

  const { loading, error, data, queryFn } = useQuery<ServerResponseType<{ flags: Flag[] }>>(`/api/workspaces/${wsp_id}`);

  if (loading) return (
    <section className="h-[25dvh] flex flex-cntr-all">
      <Spinner />
    </section>
  )

  else if (error || !data || !data.success) return (
    <section className="p-4 space-y-2 bg-gray-500/20 border rounded-md border-gray-500/10">
      <h3 className="text-center">Uh Oh! Something went wrong</h3>
      <p className="ghost text-center">{error || data?.message || "Please refresh the page and try again"}</p>
    </section>
  )

  const toggleFlag = async (id: string, enabled: boolean) => {
    await fetch(`/api/flags/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ enabled: !enabled }),
    });
    queryFn();
  };

  const deleteFlag = async (id: string) => {
    await fetch(`/api/flags/${id}`, {
      method: "DELETE",
    });
    queryFn();
  };

  return (
    <div className="space-y-4">
      {data.flags.map((flag: any) => (
        <FlagCard
          key={flag._id}
          flag={flag}
          onToggle={() => toggleFlag(flag._id, flag.enabled)}
          onDelete={() => deleteFlag(flag._id)}
        />
      ))}
    </div>
  );
}