
"use client"

import * as React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const initialData = [
  { name: "Jan", total: 0 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 0 },
  { name: "Apr", total: 0 },
  { name: "May", total: 0 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 0 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 0 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
]

export function OverviewChart() {
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    const generatedData = initialData.map(item => ({
        ...item,
        total: Math.floor(Math.random() * 5000000) + 1000000
    }));
    setData(generatedData);
  }, []);


  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `UGX ${new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(value)}`}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
