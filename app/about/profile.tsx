import React from "react";

const SocialLinks: React.FC = () => {
  const links = [
    { name: "GitHub", url: "https://github.com/Mayankpratapsingh022" },
    { name: "Twitter", url: "https://x.com/Mayank_022" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/mayankpratapsingh022/" },
    { name: "Instagram", url: "https://www.instagram.com/mayankpratapsingh_022/" },
  ];

  return (
    <div className="flex justify-center flex-col items-center gap-1 space-x-4 p-4  text-white">
      
        <p className="text-center text-neutral-300 my-5 ">Connect with me for updates on<br/> new algorithms and exciting improvements!</p>
     <div className="flex gap-2">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm underline hover:text-gray-300 transition"
        >
          {link.name}
        </a>
      ))}
      </div>
    </div>
  );
};

export default SocialLinks;
