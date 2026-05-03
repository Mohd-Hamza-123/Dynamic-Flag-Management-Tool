"use client";

import { useEffect, useState } from "react";
import FlagList from "@/components/FlagList";
import AddFlagDialog from "@/components/AddFlagDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [flags, setFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFlags = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/flags");
      const data = await res.json();
      setFlags(data);
    } catch (error) {
      console.error("Error fetching flags:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-6">
      
      {/* 🔷 Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Feature Flags Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your application features dynamically
          </p>
        </div>

        <AddFlagDialog refresh={fetchFlags} />
      </div>

      {/* 🔷 Stats Card */}
      <Card>
        <CardContent className="flex justify-between p-4 text-sm">
          <p>Total Flags: <span className="font-semibold">{flags.length}</span></p>
          <p>
            Active:{" "}
            <span className="font-semibold text-green-600">
              {flags.filter((f: any) => f.enabled).length}
            </span>
          </p>
          <p>
            Disabled:{" "}
            <span className="font-semibold text-red-500">
              {flags.filter((f: any) => !f.enabled).length}
            </span>
          </p>
        </CardContent>
      </Card>

      {/* 🔷 Content */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading flags...
        </div>
      ) : flags.length === 0 ? (
        <Card>
          <CardContent className="text-center py-10 space-y-3">
            <p className="text-gray-500">No feature flags found</p>
            <AddFlagDialog refresh={fetchFlags} />
          </CardContent>
        </Card>
      ) : (
        <FlagList flags={flags} refresh={fetchFlags} />
      )}
    </div>
  );
}