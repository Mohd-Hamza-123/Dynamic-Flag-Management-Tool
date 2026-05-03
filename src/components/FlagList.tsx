"use client";

import FlagCard from "./FlagCard";

export default function FlagList({ flags, refresh }: any) {
  const toggleFlag = async (id: string, enabled: boolean) => {
    await fetch(`/api/flags/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ enabled: !enabled }),
    });
    refresh();
  };

  const deleteFlag = async (id: string) => {
    await fetch(`/api/flags/${id}`, {
      method: "DELETE",
    });
    refresh();
  };

  return (
    <div className="space-y-4">
      {flags.map((flag: any) => (
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