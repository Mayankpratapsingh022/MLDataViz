'use client';

import React, { useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import { useData } from "./datapointadder";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Terminal } from "lucide-react";
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const ErrorVisualization = () => {
  const { data } = useData();
  const [weight, setWeight] = useState(1);
  const [bias, setBias] = useState(0);
  const [totalError, setTotalError] = useState(0);
  const [errorType, setErrorType] = useState("absolute");
  const [errorHistory, setErrorHistory] = useState<number[]>([]);

  const calculateError = useCallback(() => {
    if (errorType === "absolute") {
      return data.reduce((sum, point) => {
        const predictedY = weight * point.x + bias;
        return sum + Math.abs(point.y - predictedY);
      }, 0);
    } else if (errorType === "meanSquare") {
      return (
        data.reduce((sum, point) => {
          const predictedY = weight * point.x + bias;
          return sum + Math.pow(point.y - predictedY, 2);
        }, 0) / data.length
      );
    }
    return 0;
  }, [data, weight, bias, errorType]);

  const updateErrorHistory = useCallback(() => {
    const newError = calculateError();
    setErrorHistory((prevHistory) => [...prevHistory, newError]);
  }, [calculateError]);

  const renderErrorPlot = useCallback(() => {
    const container = d3.select("#errorplot");
    const parentWidth = (container.node() as HTMLElement)?.clientWidth || 500;

    const aspectRatio = 4 / 4;
    const svgWidth = parentWidth;
    const svgHeight = svgWidth / aspectRatio;
    const margin = { top: 20, right: 20, bottom: 60, left: 70 };

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    d3.select("#errorplot").selectAll("*").remove();
    const svg = container
      .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("background", "#252428");

    const xScale = d3.scaleLinear().domain([0, 10]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 120]).range([height, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 100)
      .attr("fill", "white")
      .style("font-size", "14px")
      .text("X (Independent Variable)");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -100)
      .attr("fill", "white")
      .style("font-size", "14px")
      .style("text-anchor", "middle")
      .text("Y (Dependent Variable)");

    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 6)
      .style("fill", "#9f7aea");

    if (errorType === "absolute") {
      g.selectAll("line.error")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", (d) => xScale(d.x))
        .attr("y1", (d) => yScale(d.y))
        .attr("x2", (d) => xScale(d.x))
        .attr("y2", (d) => yScale(weight * d.x + bias))
        .attr("stroke", "red")
        .attr("stroke-dasharray", "4");
    } else if (errorType === "meanSquare") {
      g.selectAll("rect.error")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.x))
        .attr("y", (d) => Math.min(yScale(d.y), yScale(weight * d.x + bias)))
        .attr("width", (d) =>
          Math.abs(yScale(d.y) - yScale(weight * d.x + bias))
        )
        .attr("height", (d) =>
          Math.abs(yScale(d.y) - yScale(weight * d.x + bias))
        )
        .attr("fill", "rgba(255, 0, 0, 0.5)");
    }

    g.append("line")
      .attr("x1", xScale(0))
      .attr("y1", yScale(weight * 0 + bias))
      .attr("x2", xScale(10))
      .attr("y2", yScale(weight * 10 + bias))
      .attr("stroke", "#9f7aea")
      .attr("stroke-width", 3);
  }, [data, weight, bias, errorType]);

  const renderErrorHistoryPlot = useCallback(() => {
    const container = d3.select("#errorHistoryPlot");
    const parentWidth = (container.node() as HTMLElement)?.clientWidth || 500;

    const aspectRatio = 16 / 9;
    const svgWidth = parentWidth;
    const svgHeight = svgWidth / aspectRatio;
    const margin = { top: 20, right: 20, bottom: 60, left: 70 };

    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    d3.select("#errorHistoryPlot").selectAll("*").remove();
    const svg = container
      .append("svg")
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const xScale = d3
      .scaleLinear()
      .domain([0, errorHistory.length])
      .range([0, width]);

      const filteredErrorHistory = errorHistory.filter((d): d is number => d !== undefined);
      
      const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(filteredErrorHistory) || 0])

      .range([height, 0]);
    
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("x", width / 2)
      .attr("y", 50)
      .attr("fill", "white")
      .style("font-size", "14px")
      .text("Iterations");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -50)
      .attr("fill", "white")
      .style("font-size", "14px")
      .style("text-anchor", "middle")
      .text("Error");

      const line = d3
      .line<[number, number]>() // Specify the type as a tuple of [x, y]
      .x((d) => xScale(d[0]))   // Access the first element (x)
      .y((d) => yScale(d[1]))   // Access the second element (y)
      .curve(d3.curveMonotoneX);
    
    g.append("path")
      .datum(
        errorHistory.map((value, index) => [index, value]) as [number, number][]
      ) // Transform errorHistory into an array of tuples [x, y]
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line);
    
  }, [errorHistory]);

  useEffect(() => {
    renderErrorPlot();
    if (errorType !== "none") {
      updateErrorHistory();
    }
  }, [data, weight, bias, errorType, renderErrorPlot, updateErrorHistory]);

  useEffect(() => {
    setTotalError(calculateError());
  }, [data, weight, bias, errorType, calculateError]);

  useEffect(() => {
    renderErrorHistoryPlot();
  }, [errorHistory, renderErrorHistoryPlot]);

  const NoDataMessage = () => {
    if (data.length === 0) {
      return (
        <Alert className="bg-red-500 text-white my-2">
          <Terminal className="h-4 w-4 stroke-white " />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>
            No data points. Add some above to visualize errors.
          </AlertDescription>
        </Alert>
      );
    }
    return null;
  };

  return (
    <div className="flex justify-start text-start items-center flex-col">
      <h1 className="text-2xl font-medium underline w-full my-8">Visualizing Errors</h1>
      <NoDataMessage />
      <div className="flex justify-start items-start flex-wrap flex-row w-full">
        <div className="rounded-lg w-full md:w-full lg:w-2/6 drop-shadow-md p-2 items-stretch bg-[#252428]">
          <div id="errorplot" className="max-w-3xl bg-[#252428]"></div>
        </div>
        <section className="flex flex-col p-2 flex-wrap justify-start w-full h-full md:w-1/2 gap-4">
          <div className="md:w-1/2 w-full px-5">
            <Select onValueChange={(value) => setErrorType(value)} value={errorType}>
              <SelectTrigger className="mt-5">
                <SelectValue placeholder="Select Error Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="absolute">Absolute Error</SelectItem>
                  <SelectItem value="meanSquare">Mean Square Error</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-5 w-full max-w-3xl px-5">
            <label className="block text-white mb-2">Weight: {weight.toFixed(2)}</label>
            <Slider
              value={[weight]}
              onValueChange={([value]) => setWeight(value)}
              min={-10}
              max={10}
              step={0.1}
              className="mb-5"
            />
            <label className="block text-white mb-2">Bias: {bias.toFixed(2)}</label>
            <Slider
              value={[bias]}
              onValueChange={([value]) => setBias(value)}
              min={-100}
              max={100}
              step={1}
            />
          </div>
        </section>
      </div>
      {errorType !== "none" && (
        <div className="mt-5 font-bold text-white">
          Total {errorType === "absolute" ? "Absolute" : "Mean Square"} Error: {totalError.toFixed(2)}
        </div>
      )}
      <div id="errorHistoryPlot" className="w-full md:w-1/2 max-w-3xl mt-5 bg-[#252428] p-2 rounded-md drop-shadow-md"></div>
    </div>
  );
};

export default ErrorVisualization;
