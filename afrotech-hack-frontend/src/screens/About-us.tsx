import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

interface TeamMember {
  name: string;
  picture: string;
  github: string;
  linkedin: string;
  website: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Lyton",
    picture: "https://lyton.dev/logo-trans.png",
    github: "https://github.com/Lyton505",
    linkedin: "https://www.linkedin.com/in/lytonmhlanga/",
    website: "https://lyton.dev",
    description: "Lyton is a sophomore at Vanderbilt University, studying Computer Science. He is passionate about spoken languages and human-computer interactions. Lyton is currently working on a language learning app for African languages and other minority languages. He also enjoys playing/watching soccer(Go Gunners)"
  },
  {
    name: "Kaleab",
    picture: "/kaleab.jpeg",
    github: "https://github.com/Kaleab-A",
    linkedin: "https://www.linkedin.com/in/kaleab-azezew/",
    website: "https://www.linkedin.com/in/kaleab-azezew/",
    description: "Kaleab is a sophomore at Vanderbilt University, studying Computer Science, with a burning passion for learning how the human brain works. His interests have led him to pursue a career in AI and quantitative finance. He loves chess and challenging Lyton in 200m races(Lyton is faster though)"
  }
];

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-8 text-center">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teamMembers.map((member: TeamMember, index: number) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto">
            <div className="flex flex-col">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-contain" src={member.picture} alt={member.name} />
              </div>
              <div className="p-6">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{member.name}</div>
                <p className="mt-2 text-gray-500 text-sm">{member.description}</p>
                <div className="mt-4 flex space-x-4">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                  </a>
                  {member.website && (
                    <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-500">
                      <FontAwesomeIcon icon={faGlobe} size="lg" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
