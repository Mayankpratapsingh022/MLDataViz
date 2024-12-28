import React from "react";

const LinearRegressionBlog = () => {
  return (
<section className="text-white rounded-lg shadow-lg max-w-5xl mt-10 text-left p-6 ">
  <h2 className="text-2xl font-bold mb-4">Understanding Linear Regression and Gradient Descent</h2>



 
  <h3 className="text-xl  mt-6 font-semibold underline">The Role of Gradient Descent</h3>
  <p className="text-lg leading-relaxed mt-2">
    Gradient descent is an optimization algorithm used to minimize the error (or cost) function. The cost function in linear regression is defined as:
  </p>
  <p className="text-lg font-mono bg-maincolor px-3 py-2 rounded inline-block my-4">
    J(m, b) = 𝟏/𝟐n ∑ (y<sub>i</sub> - (m𝑥<sub>i</sub> + b))²
  </p>
  <p className="text-lg leading-relaxed">
    Where:
  </p>
  <ul className="mt-4 space-y-2 list-disc list-inside">
    <li><span className="font-bold">J(m, b)</span>: The cost function (mean squared error).</li>
    <li><span className="font-bold">n</span>: The number of data points.</li>
    <li><span className="font-bold">(x<sub>i</sub>, y<sub>i</sub>)</span>: The input and actual output values for the i-th data point.</li>
  </ul>
  <p className="text-lg leading-relaxed mt-4">
    The goal is to adjust <span className="font-bold">m</span> (slope) and <span className="font-bold">b</span> (intercept) iteratively to minimize <span className="font-bold">J(m, b)</span>.
    This is achieved by updating them using the gradients:
  </p>
  <ul className="mt-4 space-y-2 list-disc list-inside">
    <li>
      <span className="font-mono">m = m - α * ∂J/∂m</span>
    </li>
    <li>
      <span className="font-mono">b = b - α * ∂J/∂b</span>
    </li>
  </ul>
  <p className="text-lg mt-4">
    Here, <span className="font-bold">α</span> is the learning rate that controls how big each step is in the direction of the gradient.
  </p>
  <h3 className="text-xl font-semibold underline mt-6">How to Use This Visualization Tool</h3>
  <p className="text-lg leading-relaxed mt-2">
    This tool demonstrates how linear regression works with gradient descent:
  </p>
  <ul className="mt-4 space-y-2 list-disc list-inside">
    <li>
      <span className="font-bold">Best-Fit Line Plot</span>: Shows how the line adjusts to fit the data points.
    </li>
    <li>
      <span className="font-bold">Error Plot</span>: Visualizes the decrease in error over iterations.
    </li>
    <li>
      <span className="font-bold">Iteration Count</span>: Displays the current iteration and the error value.
    </li>
  </ul>
  <p className="text-lg mt-4">
    You can interact with the tool using these controls:
  </p>
  <ul className="mt-4 space-y-2 list-disc list-inside">
    <li>
      <span className="font-bold">Learning Rate</span>: Adjust the value to control the step size of gradient descent. Common values are <span className="font-mono">0.01</span> or <span className="font-mono">0.001</span>. Higher values speed up convergence but may overshoot the minimum.
    </li>
    <li>
      <span className="font-bold">Max Iterations</span>: Sets the number of iterations for gradient descent. A higher value provides more refinement for the line.
    </li>
    <li>
      <span className="font-bold">Start Training</span>: Begins the gradient descent process.
    </li>
    <li>
      <span className="font-bold">Stop Training</span>: Pauses the gradient descent process.
    </li>
    <li>
      <span className="font-bold">Reset</span>: Resets the best-fit line and incorporates any new data points added.
    </li>
  </ul>
  <p className="text-lg leading-relaxed mt-4">
    Explore the sliders and buttons to observe how gradient descent adjusts the line and reduces error. This interactive visualization is a powerful way to understand the inner workings of linear regression.
  </p>
</section>

  );
};

export default LinearRegressionBlog;
