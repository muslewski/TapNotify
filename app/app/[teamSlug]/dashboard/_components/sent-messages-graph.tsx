import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as BarChartIcon } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface SentMessageData {
  timestamp: string;
  count: number;
}

// Sample data - replace this with your actual data
const data: SentMessageData[] = [
  { timestamp: "Jan 1", count: 24 },
  { timestamp: "Jan 2", count: 13 },
  { timestamp: "Jan 3", count: 98 },
  { timestamp: "Jan 4", count: 39 },
  { timestamp: "Jan 5", count: 48 },
  { timestamp: "Jan 6", count: 38 },
  { timestamp: "Jan 7", count: 43 },
];

const SentMessagesGraph = () => {
  return (
    <Card className="col-span-full transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sent Messages</CardTitle>
        <BarChartIcon className="h-5 w-5 text-primary" />
      </CardHeader>
      <CardContent className="h-[300px] w-full p-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="timestamp"
              className="text-xs text-muted-foreground"
            />
            <YAxis className="text-xs text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              labelStyle={{
                color: "hsl(var(--foreground))",
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary)/.2)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SentMessagesGraph;
