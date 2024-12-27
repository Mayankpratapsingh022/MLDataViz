'use client';

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useData } from "./datapointadder";

const DataTable = () => {
  const { data } = useData();
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    // Update client-side data after hydration
    setClientData(data);
  }, [data]);

  return (
    <div className=" flex w-full  justify-center items-center   my-8 ">
        <section className=" w-full p-2 ">
      <Table className="  drop-shadow-lg" >
     
        <TableHeader>
          <TableRow>
            <TableHead>X-Axis</TableHead>
            <TableHead>Y-Axis</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
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
