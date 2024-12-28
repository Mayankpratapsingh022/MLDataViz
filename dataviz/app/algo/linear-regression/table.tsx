"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useData } from "./datapointadder";

const DataTable = () => {
  const { data } = useData();
  const [clientData, setClientData] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    // Update client-side data after hydration
    setClientData(data);
  }, [data]);

  if (!data.length) {
    return (
      <div className="flex justify-center items-center text-white mt-4">
        <p>No data available. Add some data points to visualize here.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center items-center my-8">
      <section className="w-full p-2">
        {/* Table Header */}
        <Table className="drop-shadow-lg">
          <TableHeader>
            <TableRow>
              <TableHead>X-Axis</TableHead>
              <TableHead>Y-Axis</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        {/* Table Body with Scroll */}
        <div className="overflow-y-auto max-h-48 border border-neutral-800 rounded-lg">
          <Table>
            <TableBody>
              {clientData.map((point) => (
                <TableRow key={point.id}>
                  <TableCell>{point.x.toFixed(2)}</TableCell>
                  <TableCell>{point.y.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default DataTable;
