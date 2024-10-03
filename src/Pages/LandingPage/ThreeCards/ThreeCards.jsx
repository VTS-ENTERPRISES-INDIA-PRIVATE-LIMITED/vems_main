import React from 'react';
import { FaRocket, FaShieldAlt, FaBullseye } from 'react-icons/fa'; // Import necessary icons
import './ThreeCards.css'; // Import external CSS

const cards = [
  {
    id: 1,
    icon: <FaRocket />,
    title: 'Efficiency Unleashed',
    description: 'Imagine a transportation system that optimizes routes, adjusts dynamically to changes, and ensures maximum efficiency in every ride. Our automation tools do just that, saving time and resources while keeping your workforce on the move.',
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: 'Safety in Automation',
    description: 'Safety is our priority. With automated tracking, real-time monitoring, and smart navigation, we guarantee a secure commuting experience, ensuring your employees\' peace of mind on the road.',
  },
  {
    id: 3,
    icon: <FaBullseye />,
    title: 'Precision in Planning',
    description: 'Automation streamlines trip scheduling, ensuring precision and accuracy in pick-ups and drop-offs. Say goodbye to guesswork and hello to a well-organized transportation system.',
  },
];

const ThreeCards = () => {
  return (
    <div className="three-cards-container">
      {cards.map((card) => (
        <div key={card.id} className="card">
          <div className="icon">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ThreeCards;