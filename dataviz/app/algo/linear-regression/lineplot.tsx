'use client';

// Import necessary libraries
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button"


const LinePlot = () => {
  const svgRef = useRef();
  const [slope, setSlope] = useState(1);
  const [intercept, setIntercept] = useState(0);
  const [lineRange, setLineRange] = useState(10);

  const resetLine = () => {
    setSlope(1);
    setIntercept(0);
    setLineRange(10);
  };

  useEffect(() => {
    // Set up dimensions and margins
    const width = 500; // Width of the chart content
    const height = 500; // Height of the chart content
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };

    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`) // Makes SVG responsive
      .attr('preserveAspectRatio', 'xMidYMid meet') // Maintain aspect ratio
      .style('background', '#252428')
      .style('overflow', 'hidden');

    // Clear previous content
    svg.selectAll('*').remove();

    // Create a group element for the chart content
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Define scales
    const xScale = d3
      .scaleLinear()
      .domain([-lineRange, lineRange])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([-lineRange, lineRange])
      .range([height, 0]);

    // Define axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Draw x-axis
    chart
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('fill', 'white')
      .style('font-size', '14px')
      .style('text-anchor', 'middle')
      .text('X-Axis');

    // Draw y-axis
    chart
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .append('text')
      .attr('x', -height / 2)
      .attr('y', -40)
      .attr('transform', 'rotate(-90)')
      .attr('fill', 'white')
      .style('font-size', '14px')
      .style('text-anchor', 'middle')
      .text('Y-Axis');

    // Plot line
    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    const lineData = [
      { x: -lineRange, y: slope * -lineRange + intercept },
      { x: lineRange, y: slope * lineRange + intercept },
    ];

    chart
      .append('path')
      .datum(lineData)
      .attr('class', 'line-path')
      .attr('fill', 'none')
      .attr('stroke', '#873AFA')
      .attr('stroke-width', 10)
      .attr('d', line);

    // Display equation dynamically
    chart
      .append('text')
      .attr('class', 'equation')
      .attr('x', width / 2)
      .attr('y', 15)
      .attr('fill', 'white')
      .style('font-size', '28px')
      .style('text-anchor', 'middle')
      .text(`y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`);
  }, [slope, intercept, lineRange]);

  return (
    <div className="flex gap-5 flex-col">
      
   
      <h1 className="text-2xl font-medium underline mb-4">Understanding the Line Equation</h1>
      <section className="flex flex-wrap flex-row">
     
        <div className="p-5 bg-[#252428] rounded-lg drop-shadow-2xl w-fit h-fit lg:w-2/6 md:w-1/4">
          <svg ref={svgRef} className="w-full h-auto "></svg>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 md:w-1/2  mx-auto mt-6">

 

        <section className='flex justify-start py-8'>

        <Button variant="destructive"   onClick={resetLine}>Reset</Button>
        </section>
  
          <label className="mb-4">
            <div className='flex flex-row justify-between'>
            <span className="block text-lg font-normal">Slope [m]</span>
            <span className="text-lg font-semibold ml-4">{slope.toFixed(2)}</span>
            </div>
            <Slider
              defaultValue={[slope]}
              max={10}
              min={-10}
              step={0.01}
              onValueChange={(value) => setSlope(value[0])}
              
            />
           
          </label>

          <label className="mb-4">
          <div className='flex flex-row justify-between'>
          <span className="block text-lg font-medium">Intercept [b]</span>
          <span className="text-lg font-semibold ml-4">{intercept.toFixed(2)}</span>
          </div>
   
            <Slider
              defaultValue={[intercept]}
              max={10}
              min={-10}
              step={0.01}
              onValueChange={(value) => setIntercept(value[0])}
            />
         
          </label>

          <label className="mb-4">
          <div className='flex flex-row justify-between'>
          <span className="block text-lg font-medium">Line Range</span>
          <span className="text-lg font-semibold ml-4">{lineRange}</span>
          </div>
        
            <Slider
              defaultValue={[lineRange]}
              max={20}
              min={5}
              step={1}
              onValueChange={(value) => setLineRange(value[0])}
            />
     
          </label>
      

        </div>
        <section className=" text-white rounded-lg shadow-lg max-w-5xl  mt-10 text-left">

  <p className="text-lg leading-relaxed">
    The equation <span className="inline-block bg-maincolor text-white px-2 py-1 rounded font-medium">y = mx + b</span> represents a straight line and is foundational in linear regression.

   
  </p>
  <b className='text-lg text-white py-10 rounded font-semibold underline'>Here’s what the terms mean:</b> 
  <ul className="mt-4 space-y-2">
    <li>
      <span className="inline-block bg-maincolor px-2 py-1 rounded font-medium">m</span>: The <span className="font-semibold">slope</span>, determining the steepness of the line.
    </li>
    <li>
      <span className="inline-block bg-maincolor px-2 py-1 rounded font-medium">b</span>: The <span className="font-semibold">intercept</span>, where the line crosses the Y-axis.
    </li>
    <li>
      <span className="inline-block bg-maincolor px-2 py-1 rounded font-medium">x</span>: The input variable or predictor.
    </li>
    <li>
      <span className="inline-block bg-maincolor px-2 py-1 rounded font-medium">y</span>: The output or predicted value.
    </li>
  </ul>
  <p className="mt-4 text-gray-300">
    Use the sliders to adjust the <span className="inline-block bg-maincolor px-2 py-1 rounded font-medium">slope</span> and <span className="inline-block bg-maincolor px-2 py-1 rounded font-medium">intercept</span>, and observe how the line dynamically updates on the graph.
  </p>
</section> 
      </section>
    

    </div>
  );
};

export default LinePlot;
