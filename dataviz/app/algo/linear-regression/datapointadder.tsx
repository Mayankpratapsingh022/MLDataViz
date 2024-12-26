'use client';

import React, { useState, useEffect, createContext, useContext } from "react";
import * as d3 from "d3";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Create a Context for sharing data
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: parseFloat((i + Math.random()).toFixed(2)),
      y: parseFloat((i * 10 + Math.random() * 20).toFixed(2)),
      selected: false,
    }))
  );

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

const DataPointAdder = () => {
  const { data, setData } = useData();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    renderPlot();
  }, [data, hoveredPoint]);

  const renderPlot = () => {
    const svgWidth = 500;
    const svgHeight = 500;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    d3.select("#scatterplot").selectAll("*").remove();
    const svg = d3
      .select("#scatterplot")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style('background', '#252428');

    const xScale = d3.scaleLinear().domain([0, 10]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 120]).range([height, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X and Y axes
    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    g.append("g").call(d3.axisLeft(yScale));

    // Add data points
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 10)
      .style("fill", "#9f7aea")
      .style("cursor", "pointer")
      .on("mouseover", function (event, d) {
        setHoveredPoint(d);
      })
      .on("mouseout", function () {
        setHoveredPoint(null);
      });

    // Add red dashed lines for hovered point
    if (hoveredPoint) {
      g.append("line")
        .attr("x1", xScale(hoveredPoint.x))
        .attr("y1", 0)
        .attr("x2", xScale(hoveredPoint.x))
        .attr("y2", height)
        .style("stroke", "red")
        .style("stroke-width", 1)
        .style("stroke-dasharray", "4");

      g.append("line")
        .attr("x1", 0)
        .attr("y1", yScale(hoveredPoint.y))
        .attr("x2", width)
        .attr("y2", yScale(hoveredPoint.y))
        .style("stroke", "red")
        .style("stroke-width", 1)
        .style("stroke-dasharray", "4");

      g.append("text")
        .attr("x", xScale(hoveredPoint.x) + 5)
        .attr("y", yScale(hoveredPoint.y) - 5)
        .attr("fill", "white")
        .style("font-size", "12px")
        .text(`(${hoveredPoint.x.toFixed(2)}, ${hoveredPoint.y.toFixed(2)})`);
    }

    // Add point on click
    svg.on("click", function (event) {
      const [x, y] = d3.pointer(event);
      const newPoint = {
        id: data.length,
        x: parseFloat(xScale.invert(x - margin.left).toFixed(2)),
        y: parseFloat(yScale.invert(y - margin.top).toFixed(2)),
        selected: false,
      };
      setData((prevData) => [...prevData, newPoint]);
    });
  };

  const deleteSelected = () => {
    setData((prevData) => prevData.filter((point) => !point.selected));
  };

  const toggleSelect = (id) => {
    setData((prevData) =>
      prevData.map((point) =>
        point.id === id ? { ...point, selected: !point.selected } : point
      )
    );
  };

  const updateData = (id, field, value) => {
    setData((prevData) =>
      prevData.map((point) =>
        point.id === id ? { ...point, [field]: parseFloat(value) } : point
      )
    );
  };

  const randomizeData = () => {
    setData(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: parseFloat((i + Math.random()).toFixed(2)),
        y: parseFloat((i * 12 + Math.random() * 15).toFixed(2)),
        selected: false,
      }))
    );
  };

  const resetData = () => {
    setData([]);
  };

  return (
    <div className=" flex gap-5  flex-wrap  flex-col my-10  text-white  rounded-lg shadow-md drop-shadow-md">
 <h1 className="text-2xl font-medium underline my-4">Add your Data Points</h1>
<section className="flex flex-wrap flew-row w-full p-5 ">
<div className="p-5 bg-[#252428] rounded-lg drop-shadow-2xl w-fit h-fit lg:w-2/6 md:w-1/4">
      <div id="scatterplot" className="w-fit p-5  items-center justify-center h-auto "></div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 md:w-1/2  mx-auto mt-6">
      <div className="flex gap-4">

   
          <button
            className="bg-maincolor text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={randomizeData}
          >
            Randomize
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-500"
            onClick={resetData}
          >
            Reset
          </button>
        </div>
      </div>

      </section>
    <section className="flex flex-wrap">
      {/* <div className="overflow-scroll w-fit ">
        <Table>
          <TableCaption>A list of your scatterplot data points.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  type="checkbox"
                  className=""
                  onChange={(e) =>
                    setData((prevData) =>
                      prevData.map((point) => ({
                        ...point,
                        selected: e.target.checked,
                      }))
                    )
                  }
                />
              </TableHead>
              <TableHead>X</TableHead>
              <TableHead>Y</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((point) => (
              <TableRow
                key={point.id}
               
              >
                <TableCell>
                  <input
                    type="checkbox"
                    className=" "
                    checked={point.selected}
                    onChange={() => toggleSelect(point.id)}
                  
                  />

                  
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={point.x.toFixed(2)}
                    onChange={(e) => updateData(point.id, "x", e.target.value)}
                    className="bg-transparent focus:outline-none focus:border-neutral-500 focus:border  text-white text-center w-fit p-4 appearance-none"
                  />
                  
    
          



                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    value={point.y.toFixed(2)}
                    onChange={(e) => updateData(point.id, "y", e.target.value)}
                    className="bg-transparent focus:outline-none focus:border-neutral-500 focus:border  text-white text-center w-fit p-4 appearance-none"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> */}
     
      </section>
    </div>
  );
};

export default DataPointAdder;
