'use client';

import React, { useState, useEffect, createContext, useContext } from "react";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";
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
    window.addEventListener("resize", renderPlot);
    return () => window.removeEventListener("resize", renderPlot);
  }, [data, hoveredPoint]);

  const renderPlot = () => {
    const container = d3.select("#scatterplot");
    const containerWidth = container.node().getBoundingClientRect().width;
    const svgSize = Math.min(containerWidth, 500); // Maintain a square aspect ratio
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const width = svgSize - margin.left - margin.right;
    const height = svgSize - margin.top - margin.bottom;

    d3.select("#scatterplot").selectAll("*").remove();
    const svg = container
      .append("svg")
      .attr("width", svgSize)
      .attr("height", svgSize)
      .style("background", "#252428");

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
      .attr("r", 5) // Static circle size
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
    <div className="flex gap-5 flex-wrap flex-col my-10 text-white rounded-lg ">
      <h1 className="text-2xl font-medium underline my-4">Add your Data Points</h1>
      <section className="flex flex-wrap flex-row w-full">
        <div className=" p-3 bg-[#252428] rounded-lg drop-shadow-2xl w-full lg:w-2/6 md:w-1/2">
          
          <div id="scatterplot" className="w-full h-full"></div>
        
        </div>
        <div className="flex flex-col flex-wrap w-full lg:w-1/2 md:w-1/2 mx-auto mt-6">
          <div className="flex gap-4">
            <Button variant="main" onClick={randomizeData}>
              Randomize
            </Button>

            <Button variant="destructive" onClick={resetData}>
              Reset
            </Button>
          </div>

          <section className="text-white rounded-lg shadow-lg max-w-5xl mt-10 text-left">
  <p className="text-sm leading-relaxed">
    Use the <span className="inline-block bg-maincolor text-white px-2 py-1 rounded font-medium">Data Point Adder</span> tool to add and interact with points on the graph.
  </p>
  <b className="text-sm text-white rounded font-semibold underline mt-4 block">Features:</b>
  <ul className="mt-2 space-y-1 text-sm">
    <li>
      <span className="inline-block bg-maincolor px-2 py-1 rounded font-medium">Click</span>: Add a point at the clicked position.
    </li>
    <li>
      <span className="inline-block bg-maincolor px-2 py-1 rounded font-medium">Hover</span>: Show <span className="font-semibold">X</span>, <span className="font-semibold">Y</span> coordinates.
    </li>
    <li>
      <span className="inline-block bg-maincolor px-2 py-1 rounded font-medium">Randomize</span>: Generate random points.
    </li>
    <li>
      <span className="inline-block bg-maincolor px-2 py-1 rounded font-medium">Reset</span>: Clear all points.
    </li>
  </ul>
</section>

        </div>
      </section>
    </div>
  );
};

export default DataPointAdder;
