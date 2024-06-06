"use client";

import {
   Area,
   AreaChart,
   CartesianGrid,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from "recharts";
import { chartData } from "./data/chartData";
import { divIcon } from "leaflet";

const Chart = () => {
   return (
      <div className="w-full h-[350px]">
         <ResponsiveContainer width={"100%"} height="100%">
            <AreaChart data={chartData}>
               <CartesianGrid
                  strokeDasharray="4 4"
                  stroke="#e8e8e8"
                  vertical={false}
               />
               <Area
                  dataKey="total"
                  type="monotone"
                  stroke="#06b6d4"
                  fill={`url(#cyan-gradient)`}
               />

               <XAxis
                  dataKey={"name"}
                  stroke="#334155"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
               />
               <YAxis
                  dataKey={"total"}
                  stroke="#334155"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
               />

               <Tooltip
                  cursor={{ fill: "#06b6d4", radius: 4, stroke: "#e0e0e0" }}
                  content={({ active, payload }) => {
                     if (!active || !payload || payload.length === 0) {
                        return null;
                     }
                     return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                           <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                 <span className="text-xs font-semibold">
                                    Date
                                 </span>
                                 <span className="text-sm ">
                                    {payload[0].payload.name}
                                 </span>
                              </div>
                              <div className="flex flex-col">
                                 <span className="text-xs font-semibold">
                                    Total
                                 </span>
                                 <span className="text-sm ">
                                    {payload[0].payload.total}
                                 </span>
                              </div>
                           </div>
                        </div>
                     );
                  }}
               />

               <defs>
                  <linearGradient
                     id="cyan-gradient"
                     x1="0"
                     y1="0"
                     x2="0"
                     y2="1"
                  >
                     <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                     <stop
                        offset="75%"
                        stopColor="#8b5cf6"
                        stopOpacity={0.05}
                     />
                  </linearGradient>
               </defs>
            </AreaChart>
         </ResponsiveContainer>
      </div>
   );
};

export default Chart;
