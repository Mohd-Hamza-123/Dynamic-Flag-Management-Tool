"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash, FlagIcon } from "lucide-react";

export default function FlagCard({ flag, onToggle, onDelete }: any) {
  return (
    <Card className="bg-gray-500/10 px-2 py-3">
      <CardContent className="flex px-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="size-10 flex flex-cntr-all rounded-full bg-gray-500/40">
            <FlagIcon className="size-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{flag.name}</h3>
            <p className="text-sm text-muted-foreground">
              {flag.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Switch
            checked={flag.enabled}
            onCheckedChange={onToggle}
          />

          <Button
            variant="destructive"
            size="icon"
            onClick={onDelete}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}