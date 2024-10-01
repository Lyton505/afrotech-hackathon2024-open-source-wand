import React from 'react';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  websiteUrl: string;
}

const projects: Project[] = [
  {
    title: "Oyster",
    description: "ColorStack's in-house member platform. Open-sourced for all to contribute to and learn from.",
    imageUrl: "https://cdn.prod.website-files.com/61ae4846c32bb55b23085ccd/621150da29e6f9048c44a6dd_Logo.png",
    githubUrl: "https://github.com/colorstackorg/oyster",
    websiteUrl: "https://www.colorstack.org/",
  },
  {
    title: "Ushahidi",
    description: "Ushahidi is an open-source platform for collecting and sharing data through crowdsourcing. It empowers communities to map and report incidents, providing valuable information for emergency response and humanitarian efforts.",
    imageUrl: "/ushahidi-logo.jpeg",
    githubUrl: "https://github.com/ushahidi",
    websiteUrl: "https://www.ushahidi.com/",
  },
  {
    title: "Outreachy",
    description: "Outreachy is a program that provides financial support to open-source contributors, particularly those from groups underrepresented in tech, to work on open-source projects.",
    imageUrl: "https://avatars.githubusercontent.com/u/50297779?s=200&v=4",
    githubUrl: "https://github.com/outreachy",
    websiteUrl: "https://www.outreachy.org/",
  },
  {
    title: "Google Summer of Code",
    description: "Google Summer of Code is a global program that pairs students with mentors from open-source organizations to work on open-source projects over the summer.",
    imageUrl: "https://summerofcode.withgoogle.com/assets/media/logo.svg",
    githubUrl: "https://github.com/google/gsocguides",
    websiteUrl: "https://summerofcode.withgoogle.com/",
  },
  {
    title: "CTI Accelerate",
    description: "The primary goal of Accelerate is to give you the best shot possible at landing a meaningful summer work experience.",
    imageUrl: "https://avatars.githubusercontent.com/u/170486771?s=200&v=4",
    githubUrl: "https://github.com/cti-accelerate",
    websiteUrl: "https://computingtalentinitiative.org/accelerate/",
  },
];

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center flex flex-col gap-2">
        <h1 className="text-xl mb-2 text-center">
          Open-Source Projects Empowering Minorities in Tech
        </h1>
        <h1 className="text-base">
          Explore these impactful projects and contribute to making a difference in the tech industry. 
        </h1>
        <h1 className="text-base">
          <a href="https://github.com/Lyton505/afrotech-hackathon2024-open-source-wand/issues" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Add an open-source project that empowers minorities in tech to this list</a>
        </h1>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="relative">
              <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-contain" />
              <h2 className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xl font-semibold">
                {project.title}
              </h2>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">{project.description.substring(0, 90)}...</p>
              <div className="flex justify-between">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  GitHub
                </a>
                <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Website
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;