import Link from "next/link";

const Topics = () => {
  const topics = [
    { name: "Linear Regression", path: "/linear-regression" },
    { name: "Logistic Regression", path: "/logistic-regression" },
    { name: "Support Vector Machines", path: "/svm" },
    { name: "Decision Trees", path: "/decision-trees" },
  ];

  return (
    <div className="bg-gray-950 h-screen flex flex-col  items-center justify-center w-full  text-white p-6">
   
      <ul className="flex justify-center items-start flex-col gap-4">
      <section className="">
    <h1 className="text-4xl font-bold flex text-left"> ML Algorithms</h1>

    </section>
        {topics.map((topic, index) => (
          <li key={index} className="text-gray-400 hover:text-white transition-colors duration-200">
            <Link
              href={topic.path}
              className="text-gray-100 underline hover:text-gray-300"
            >
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Topics;
