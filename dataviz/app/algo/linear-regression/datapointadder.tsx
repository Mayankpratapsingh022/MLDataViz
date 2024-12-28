"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";

// Define the shape of the context data
interface DataPoint {
  id: number;
  x: number;
  y: number;
  selected: boolean;
}

interface DataContextType {
  data: DataPoint[];
  setData: React.Dispatch<React.SetStateAction<DataPoint[]>>;
}

// Create a Context with a default value
const DataContext = createContext<DataContextType | undefined>(undefined);

// DataProvider props type
interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<DataPoint[]>([]);
  useEffect(() => {
    // Initialize with random data
    setData(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: parseFloat((i + Math.random()).toFixed(2)),
        y: parseFloat((i * 10 + Math.random() * 20).toFixed(2)),
        selected: false,
      }))
    );
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DataContext
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

// Component: DataPointAdder
const DataPointAdder: React.FC = () => {
  const { data, setData } = useData();
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  // Use useCallback to memoize renderPlot
  const renderPlot = useCallback(() => {
    const container = d3.select("#scatterplot");
    const containerNode = container.node();

    // Ensure the containerNode is of type HTMLElement
    if (!(containerNode instanceof HTMLElement)) return;

    const containerWidth = containerNode.getBoundingClientRect().width;
    const svgSize = Math.min(containerWidth, 500); // Maintain a square aspect ratio
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    const width = svgSize - margin.left - margin.right;
    const height = svgSize - margin.top - margin.bottom;

    container.selectAll("*").remove();
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
  }, [data, hoveredPoint, setData]); // Add all dependencies here

  // useEffect with renderPlot in the dependency array
  useEffect(() => {
    renderPlot();
    window.addEventListener("resize", renderPlot);
    return () => window.removeEventListener("resize", renderPlot);
  }, [renderPlot]);

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
        <div className="p-3 bg-[#252428] rounded-lg drop-shadow-2xl w-full lg:w-2/6 md:w-1/2">
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
        </div>
      </section>
    </div>
  );
};

export default DataPointAdder;
