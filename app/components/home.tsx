import Link from "next/link";
import SocialLinks from "../about/profile";

const Topics = () => {
  const topics = [
    { name: "Linear Regression", path: "/linear-regression" },
    { name: "More Algorithms Coming Soon", path: "/linear-regression" },

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
              className="text-blue-400 underline hover:text-gray-300"
            >
              {topic.name}
            </Link>
          </li>
        ))}
      </ul>
      <footer className="">
      <SocialLinks/>
      </footer>
    </div>
  );
};

export default Topics;
