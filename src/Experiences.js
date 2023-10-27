import React, { useState, useEffect } from 'react';

export function useExperience() {
    const [experience, setExperience] = useState('');

    const changeExperience = (exp) => {
      console.log("Send experience = " + exp);
      setExperience(exp); // Update the 'experience' state
    };

    useEffect(() => {
        console.log("Experience updated: " + experience);
      }, [experience]);
  
    return { experience, changeExperience };
  }
  
  function ExperiencesComponent({ onExperienceChange }) {

    const { experience, changeExperience } = useExperience();
    const [expVal, setExpVal] = useState(experience);

    useEffect(() => {
        
        changeExperience(experience);
        console.log("nnn = " + experience)
      }, [experience]);

    const handleExperienceClick = (newExperience) => {
        if (newExperience !== experience) {
            changeExperience(newExperience); // Update the 'experience' state
            onExperienceChange(newExperience);
        }
      };
    

return(
    <div className="element-EXPERIENCES">
    <img className="" alt="Promousonalogowhite" src={require('./assets/PromoUSONA.png')} />

    <header className="HEADER">
      <img
        className="element-USONA-logo-high"
        alt="Element USONA logo high"
        src={require('./assets/Logo.png')}
      />
      <div className="text-wrapper">EXPERIENCES</div>
    </header>

    <div className="element-RAIN-FOREST">
        {experience === 'forest' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse7.png')} /> : null}
        <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse7.png')} />
        <button className="btnimg" onClick={() => { handleExperienceClick('forest') }}>
          <img className="img" alt="Element RAIN FOREST" src={require('./assets/RAINFOREST.png')} />
        </button>
    </div>

    <div className="element-OCEAN">
        {experience === 'ocean' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse8.png')} /> : null}
        <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse8.png')} />
        <button className="btnimg" onClick={() => { handleExperienceClick('ocean') }}>
          <img className="img" alt="Element OCEAN" src={require('./assets/OCEAN.png')} />
        </button>
    </div>

    <div className="element-MEDITATION">
      <div className="overlap-2">
        {experience === 'meditation' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse10.png')} /> : null}
        <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse10.png')} />
        <button className="btnimg" onClick={() => { handleExperienceClick('meditation') }}>
          <img className="img" alt="Element MEDITATION" src={require('./assets/MEDITATION.png')} />
        </button>
      </div>
    </div>

    <div className="element-GALAXY">
        {experience === 'galaxy' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse9.png')} /> : null}
        <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse9.png')} />
        <button className="btnimg" onClick={() => { handleExperienceClick('galaxy') }}>
          <img className="img" alt="Element GALAXY" src={require('./assets/GALAXY.png')} />
        </button>
    </div>

    <div className="element-SPIRAL-RS">
        {experience === 'spiral' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse11.png')} /> : null}
        <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse11.png')} />
        <button className="btnimg" onClick={() => { handleExperienceClick('spiral') }}>
          <img className="img" alt="Element SPIRAL REACTIVE" src={require('./assets/SPIRAL.png')} />
        </button>
    </div>

    <div className="element-REACTIVE-SCENE">
        {experience === 'reactive2' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse14.png')} /> : null}
        <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse14.png')} />
        <button className="btnimg" onClick={() => { handleExperienceClick('reactive2') }}>
          <img className="img" alt="Element REACTIVE SCENE" src={require('./assets/REACTIVESCENE.png')} />
        </button>
    </div>
  </div>
);
}


export { ExperiencesComponent };