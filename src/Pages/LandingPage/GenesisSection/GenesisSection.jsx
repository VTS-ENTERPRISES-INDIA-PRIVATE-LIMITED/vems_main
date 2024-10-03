import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import './GenesisSection.css';
import Rocket from '../GenesisSection/rocket.png'
import Group from '../GenesisSection/group.jpg'
import Plant from '../GenesisSection/Plant.jpg'
import Tick from '../GenesisSection/Tick.jpg'

const GenesisSection = () => {
    const carouselData = [
        {
            image: 'https://res.cloudinary.com/dlo7urgnj/image/upload/v1725335289/impact_icon.01711b99_ffe5lo.png',
            title: 'Crafted in a Studio',
            subtitle: 'Not in an Office..!',
            description: `VEMS stands as one of our premier creations, developed in the VirtualMaze studio rather than a traditional office.
             It was designed by an exceptional team and brought to life by tech industry veterans.`
        },
        {
            image:"https://res.cloudinary.com/dlo7urgnj/image/upload/v1725335212/studio_icon.e34a8db3_qq2k4k.png",
            title: 'Innovated in a Studio',
            subtitle: 'Transforming Transportation..!',
            description: `VEMS, a standout product from our VirtualMaze studio, is not just a creation but a revolution. Developed by top-tier experts,
             it has redefined employee transportation with its cutting-edge technology, driving efficiency and seamless mobility..`
        },
        {
            image: "https://res.cloudinary.com/dlo7urgnj/image/upload/v1725335376/transport_icon.2f1275e4_lewlry.png",
            title: 'Upgrade Your Future with VEMS',
            subtitle: 'Born in our VirtualMaze studio..!',
            description: `VEMS is more than just a product—it's a game-changer. Crafted by visionary designers and expert developers,
             it's set to transform the future of employee transportation, bringing innovation and efficiency to every journey..`
        }
    ];

    return (
        <>
        <section className="genesis-section">
            <div className="genesis-header">
                <h1><span className="highlight">The</span> Origin</h1>
                <p>
                Automation optimizes trip scheduling, guaranteeing precise and accurate pick-ups and drop-offs. Eliminate uncertainty and embrace a seamlessly organized transportation experience.</p>
            </div>
            <Carousel 
                showThumbs={false} 
                showStatus={false} 
                autoPlay 
                infiniteLoop 
                className="genesis-carousel"
            >
                {carouselData.map((item, index) => (
                    <div className="carousel-item" key={index}>
                        <div className="carousel-image">
                            <img style={{height:"204px",width:"264px"}} src={item.image} alt="Carousel" />
                        </div>
                        <div className="carousel-content">
                            <h2>{item.title}</h2>
                            <h3>{item.subtitle}</h3>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>

        <section className="why-vm-routes">
      <h2 className="why-title">Why VEMS?</h2>
      <div className="why-cards">
        <div className="why-card">
          <div className="icon-wrapper">
            <img src={Tick} alt="Icon 1" />
          </div>
          <h3>Recognizing and Reducing Risks</h3>
          <p>
            Manual procedures provide only a limited opportunity for the team to guarantee their employees' safety.
          </p>
        </div>
        <div className="why-card">
          <div className="icon-wrapper">
            <img src={Plant} alt="Icon 2" />
          </div>
          <h3>Enhancing Environmental, Social, and Governance (ESG) Adherence</h3>
          <p>
            Lower carbon emissions by opting for shared vehicle commuting and embracing electric vehicle (EV) adoption.
          </p>
        </div>
        <div className="why-card">
          <div className="icon-wrapper">
            <img src={Group} alt="Icon 3" />
          </div>
          <h3>Enhancing Employee Contentment</h3>
          <p>
            Guaranteeing employee satisfaction during their commute to work remains a universal challenge.
          </p>
        </div>
      </div>
    </section>
    </>
    );
}

export default GenesisSection;