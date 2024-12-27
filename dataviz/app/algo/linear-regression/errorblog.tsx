import { MathJaxContext, MathJax } from "better-react-mathjax";

const ErrorExplanation = () => {
    return (
<section className="text-white rounded-lg shadow-lg max-w-5xl mt-10 text-left">
  <p className="text-base leading-relaxed">
    In linear regression, an <span className="inline-block bg-maincolor text-white px-2 py-1 rounded font-medium">error</span> is the difference between the actual value and the predicted value of the dependent variable (<b>Y</b>). Errors help us measure how well our regression line fits the data, and they are critical for improving the model.
  </p>
  <b className="text-base text-white rounded font-semibold underline mt-4 block">Why Errors Are Important:</b>
  <ul className="mt-2 space-y-1 text-base">
    <li>
      Errors quantify how far our predictions are from the actual values.
    </li>
    <li>
      They help us choose the best regression line by minimizing the overall error.
    </li>
    <li>
      They are crucial in optimizing and evaluating machine learning models.
    </li>
  </ul>

  <b className="text-base text-white rounded font-semibold underline mt-4 block">Types of Errors:</b>
  <ul className="mt-2 space-y-1 text-base">
    <li>
      <b>Mean Absolute Error (MAE):</b> This is the average of the absolute differences between the predicted values and actual values:
      <br />
      <div className="inline-block bg-maincolor px-2 py-1 rounded font-medium">
        MAE = (1/n) Σ |yᵢ - ŷᵢ|
      </div>
      <br />
      MAE is simple to interpret and less sensitive to large errors, but it may not penalize large deviations strongly enough.
    </li>
    <li>
      <b>Mean Squared Error (MSE):</b> This is the average of the squared differences between the predicted values and actual values:
      <br />
      <div className="inline-block bg-maincolor px-2 py-1 rounded font-medium">
        MSE = (1/n) Σ (yᵢ - ŷᵢ)²
      </div>
      <br />
      MSE is widely used because it penalizes large errors more strongly than MAE. However, it can be influenced by outliers.
    </li>
  </ul>

  <b className="text-base text-white rounded font-semibold underline mt-4 block">Key Points:</b>
  <ul className="mt-2 space-y-1 text-base">
    <li>Lower MAE or MSE indicates a better fit of the regression line to the data.</li>
    <li>MSE is commonly used for its mathematical properties and sensitivity to large errors.</li>
    <li>Both metrics help us evaluate and compare regression models.</li>
  </ul>
</section>

  );
};

export default ErrorExplanation;