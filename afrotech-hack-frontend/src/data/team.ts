export interface TeamMember {
  name: string;
  picture: string;
  github: string;
  linkedin: string;
  description: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Jane Doe",
    picture: "https://example.com/jane-doe.jpg",
    github: "https://github.com/janedoe",
    linkedin: "https://linkedin.com/in/janedoe",
    description: "Jane is a full-stack developer with a passion for open-source projects. She has contributed to various initiatives that empower minorities in tech and is always looking for new ways to make a positive impact in the community."
  },
  {
    name: "John Smith",
    picture: "https://example.com/john-smith.jpg",
    github: "https://github.com/johnsmith",
    linkedin: "https://linkedin.com/in/johnsmith",
    description: "John is a UX designer and front-end developer who believes in the power of inclusive design. He has been involved in several open-source projects aimed at improving accessibility and user experience for underrepresented groups in technology."
  }
];