import React from 'react';
import './AboutPage.css'; 
import { Link } from 'react-router-dom';

import janeImg from '../../Assets/janeImg.jpg';
import mikeImg from '../../Assets/mike.jpg';
import johnImg from '../../Assets/john.jpg';
import jennieImg from '../../Assets/jennie.jpeg';
import jennieferImg from '../../Assets/jenniefer.jpeg';
import ranjithImg from '../../Assets/Ranjith.jpeg';
import christinaImg from '../../Assets/christina.jpeg';
import suhasImg from '../../Assets/suhas.jpeg';
import RichardImg from '../../Assets/Richard.jpeg';

const teamMembers = [
  {
    name: 'Jane Doe',
    title: 'CEO & Founder',
    description: 'Some text that describes me lorem ipsum ipsum lorem.',
    email: 'jane.doe@example.com',
    img: janeImg,
  },
  {
    name: 'Mike Ross',
    title: 'Art Director',
    description: 'Some text that describes me lorem ipsum ipsum lorem.',
    email: 'mike.ross@example.com',
    img: mikeImg,
  },
  {
    name: 'John Doe',
    title: 'Designer',
    description: 'Some text that describes me lorem ipsum ipsum lorem.',
    email: 'john.doe@example.com',
    img: johnImg,
  },
  {
    name: 'Jennie Richards',
    title: 'Operations',
    description: 'Some text that describes me lorem ipsum ipsum lorem.',
    email: 'jennie.richards@example.com',
    img: jennieImg,
  },
  {
    name: 'Jenniefer Curls',
    title: 'Designer',
    description: 'Some text that describes me lorem ipsum ipsum lorem.',
    email: 'jenniefer.curls@example.com',
    img: jennieferImg,
  },
  {
    name: 'Ranjith',
    title: 'Designer',
    description: 'Some text that describes me lorem ipsum ipsum lorem.',
    email: 'ranjith@example.com',
    img: ranjithImg,
  },
];

const advisors = [
  {
    name: 'Christina Kate',
    title: 'Senior Technical Advisor',
    description: 'Some text that describes the advisor lorem ipsum.',
    email: 'christina.kate@example.com',
    img: christinaImg,
  },
  {
    name: 'Suhas',
    title: 'Business Strategy Advisor',
    description: 'Some text that describes the advisor lorem ipsum.',
    email: 'suhas@example.com',
    img: suhasImg,
  },
];

const memorySection = [
  {
    name: 'Richard Charles',
    title: 'Founder',
    description: 'Remembering Richard for his dedication and contribution.',
    img: RichardImg,
  },
];

const AboutSection = () => {
  return (
    <div className="about-section">
      <h1>Welcome to Our HackQuest!!!</h1>
      <p>We are dedicated to empowering innovators, developers, and creators by providing a platform to participate in hackathons, collaborate on projects, and showcase their skills.</p>
      <p>Join us and be part of a dynamic community where learning meets creativity, and ideas turn into reality. Discover, build, and grow with us.</p>
    </div>
  );
};

const TeamSection = ({ title, members }) => {
  return (
    <section className="team-section">
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <div className="row">
        {members.map((member) => (
          <div className="column" key={member.name}>
            <div className="card">
              <img src={member.img} alt={member.name} className="team-img" />
              <div className="container">
                <h2>{member.name}</h2>
                <p className="title">{member.title}</p>
                <p>{member.description}</p>
                {member.email && (
                  <p>
                    <a href={`mailto:${member.email}`} className="button">
                      Contact via Email
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AboutPage = () => {
  return (
    <div>
      <AboutSection />
      <TeamSection title="Our Team" members={teamMembers} />
      <TeamSection title="Advisors" members={advisors} />
      <TeamSection title="In Memory Of" members={memorySection} />
      <div className="home-redirect">
        <Link to="/">
          <button className="button">Go to Homepage</button>
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
