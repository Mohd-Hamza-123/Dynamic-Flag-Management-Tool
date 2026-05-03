"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function FlagCard({ flag, onToggle, onDelete }: any) {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-semibold text-lg">{flag.name}</h3>
          <p className="text-sm text-muted-foreground">
            {flag.environment}
          </p>
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