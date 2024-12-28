import DataPointAdder from "../algo/linear-regression/datapointadder";
import LinePlot from "../algo/linear-regression/lineplot";
import { DataProvider } from "../algo/linear-regression/datapointadder";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ErrorVisualization from "../algo/linear-regression/ErrorVis";
import DataTable from "../algo/linear-regression/table";
import ErrorExplanation from "../algo/linear-regression/errorblog";
import GradientDescentTraining from "../algo/linear-regression/Train";
import TrainBlog from "../algo/linear-regression/Trainblog";

export default function LinearRegressionPage() {
    return (
      <div className="min-h-screen  flex justify-center items-center   bg-[#19181B] text-white p-2">
    
   <DataProvider>
        <div className="md:w-2/3 sm:w-5/6">
        <Breadcrumb className="pb-10 pt-5 ">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/linear-regression">Linear Regression</BreadcrumbLink>
    </BreadcrumbItem>

   
  </BreadcrumbList>
</Breadcrumb>

        <LinePlot/>
<DataPointAdder/>
<DataTable/>
<ErrorVisualization/>
<ErrorExplanation/>
<GradientDescentTraining/>
<TrainBlog/>
        </div></DataProvider>
      
      </div>
    );
  }
  