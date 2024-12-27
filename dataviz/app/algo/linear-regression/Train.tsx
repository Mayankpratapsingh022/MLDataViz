'use client';

import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { useData } from "./datapointadder";

const ErrorByIterationPlot = ({ errorHistory, maxIterations }) => {
  useEffect(() => {
    const svgWidth = 500;
    const svgHeight = 300;
    const margin = { top: 20, right: 20, bottom: 60, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    d3.select("#trainingErrorPlot").selectAll("*").remove();
    const svg = d3
      .select("#trainingErrorPlot")
      .append("svg")
      .attr("width", "100%")
      .attr("height", svgHeight)


    const xScale = d3.scaleLinear().domain([0, maxIterations]).range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(errorHistory) || 1])
      .range([height, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(10))
      .append("text")
      .attr("y", 40)
      .attr("x", width / 3)
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Iterations");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Error");

    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(errorHistory)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("d", line);
  }, [errorHistory, maxIterations]);

  return <div id="trainingErrorPlot" className="w-fit   shadow p-2 bg-[#252428] rounded-md drop-shadow-lg"></div>;
};

const GradientDescentTraining = () => {
  const { data } = useData();
  const [trainingData, setTrainingData] = useState(data);
  const [weight, setWeight] = useState(0);
  const [bias, setBias] = useState(0);
  const [learningRate, setLearningRate] = useState(0.01);
  const [errorHistory, setErrorHistory] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [iterations, setIterations] = useState(0);
  const [maxIterations, setMaxIterations] = useState(30);
  const tolerance = 0.0001;

  const calculateError = () => {
    return (
      trainingData.reduce((sum, point) => {
        const predictedY = weight * point.x + bias;
        return sum + Math.pow(point.y - predictedY, 2);
      }, 0) / trainingData.length
    );
  };

  const performGradientDescent = () => {
    const gradients = trainingData.reduce(
      (acc, point) => {
        const predictedY = weight * point.x + bias;
        const error = point.y - predictedY;
        acc.weightGradient += -2 * point.x * error;
        acc.biasGradient += -2 * error;
        return acc;
      },
      { weightGradient: 0, biasGradient: 0 }
    );

    gradients.weightGradient /= trainingData.length;
    gradients.biasGradient /= trainingData.length;

    setWeight((prevWeight) => prevWeight - learningRate * gradients.weightGradient);
    setBias((prevBias) => prevBias - learningRate * gradients.biasGradient);

    const newError = calculateError();
    setErrorHistory((prevHistory) => [...prevHistory, newError]);
    setIterations((prevIterations) => prevIterations + 1);

    if (iterations >= maxIterations) {
      setIsTraining(false);
    }
  };

  const renderBestFitLinePlot = () => {
    const svgWidth = 400;
    const svgHeight = 300;
    const margin = { top: 20, right: 20, bottom: 60, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    d3.select("#bestFitLinePlot").selectAll("*").remove();
    const svg = d3
      .select("#bestFitLinePlot")
      .append("svg")
      .attr("width", "100%")
      .attr("height", svgHeight)
      .style('background', '#252428');

    const xScale = d3.scaleLinear().domain([0, 10]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 120]).range([height, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .append("text")
      .attr("y", 40)
      .attr("x", width / 3)
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("x (Input Feature)");

    g.append("g")
      .call(d3.axisLeft(yScale))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .attr("fill", "white")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("y (Target Output)");

    g.selectAll("circle")
      .data(trainingData)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5)
      .style("fill", "#9f7aea");

    g.append("line")
      .attr("x1", xScale(0))
      .attr("y1", yScale(bias))
      .attr("x2", xScale(10))
      .attr("y2", yScale(weight * 10 + bias))
      .attr("stroke", "#9f7aea")
      .attr("stroke-width", 3);
  };

  useEffect(() => {
    if (isTraining) {
      const interval = setInterval(() => {
        performGradientDescent();
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isTraining, iterations, weight, bias, learningRate]);

  useEffect(() => {
    renderBestFitLinePlot();
  }, [weight, bias, trainingData]);

  const resetTraining = () => {
    setWeight(0);
    setBias(0);
    setLearningRate(0.01);
    setErrorHistory([]);
    setIterations(0);
    setIsTraining(false);
    setTrainingData(data); // Reload data in case it has been updated by users
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h1 className="text-lg font-bold mb-4">Iteration: {iterations} | Current Error: {errorHistory[errorHistory.length - 1]?.toFixed(4) || 0}</h1>

      <section className="flex gap-3 w-full  flex-wrap">
<div className="p-2 bg-[#252428] rounded-md drop-shadow-lg">
      <div id="bestFitLinePlot" className="w-fit  "></div>
      </div>


      {/* New Error vs. Iterations Plot */}
      <ErrorByIterationPlot errorHistory={errorHistory} maxIterations={maxIterations} />
      </section>
      <div className="mt-4 flex flex-col items-start w-full">
        <label className="mb-2">Learning Rate: {learningRate}</label>
        <input
          type="range"
          min="0.001"
          max="0.1"
          step="0.001"
          value={learningRate}
          onChange={(e) => setLearningRate(parseFloat(e.target.value))}
        />
      </div>

      <div className="mt-4 flex flex-col items-start w-full">
        <label className="mb-2">Max Iterations: {maxIterations}</label>
        <input
          type="range"
          min="10"
          max="100"
          step="1"
          value={maxIterations}
          onChange={(e) => setMaxIterations(parseInt(e.target.value))}
        />
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => setIsTraining(true)}
          disabled={isTraining}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Start Training
        </button>
        <button
          onClick={() => setIsTraining(false)}
          disabled={!isTraining}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Stop Training
        </button>
        <button
          onClick={resetTraining}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default GradientDescentTraining;
