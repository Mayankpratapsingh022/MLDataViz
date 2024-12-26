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



export default function LinearRegressionPage() {
    return (
      <div className="min-h-screen  flex justify-center items-start  bg-[#19181B] text-white p-6">
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


        </div></DataProvider>
      </div>
    );
  }
  