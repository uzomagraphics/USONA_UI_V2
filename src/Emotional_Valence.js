import React, { useState, useEffect } from 'react';

export function usePlay_pause() {
    const [Play_pause, setPlay_pause] = useState('');

    const changePlay_pause = (pp) => {
      setPlay_pause(pp);
    };
  
    return { Play_pause, changePlay_pause };
  }

  export function brightness() {
    const [brightness, setBrightness] = useState('');

    const changeBrightness = (pp) => {
      setBrightness(pp);
    };
  
    return { brightness, changeBrightness };
  }

  export function speed() {
    const [speed, setSpeed] = useState('');

    const changeSpeed = (pp) => {
      setSpeed(pp);
    };
  
    return { speed, changeSpeed };
  }
  
  function EmotionalValenceComponent({ onEmotionalValenceChange }) {

    const { play_pause } = usePlay_pause();
    const { brightness } = useBrightness();
    const { speed } = useSpeed();

    const [ppVal, setPpVal] = useState(play_pause);
    const [brightnessVal, setBrightnessVal] = useState(brightness);
    const [speedVal, setSpeedVal] = useState(speed);
    
    const handleExperienceClick = (newExperience) => {
        if (newExperience !== experience) {
            setExpVal(newExperience);
          onExperienceChange(newExperience);
        }
      };
    

return(

<div className="element-EMOTIONAL-VALENCE">
  <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/PromoUSONA.png')} />
  
  <header className="HEADER">
    <img
      className="element-USONA-logo-high"
      alt="Element USONA logo high"
      src={require('./assets/Logo.png')}
    />
    <div className="text-wrapper">EMOTIONAL VALENCE</div>
  </header>

  <div className="SETTINGS swiper-no-swiping">

    <div className="rectangle-2" />
    <button className="btnimg" onClick={e => { setPlay_pause(play_pause === 'play' ? 'pause' : 'play'); changePlay_pause() }}>
      <div className="PLAY-STOP">
        {play_pause === 'play' ? <img className="img" alt="Play STOP" src={require('./assets/Play.png')} /> : <img className="img" alt="Play STOP" src={require('./assets/Pause.png')} />}
      </div>
    </button>

    <div className="BRIGHTNESS">
      <img className="BRIGHTNESS-ICON" alt="Brightness ICON" src={require('./assets/BRIGHTNESSICON.png')} />
      <div className="SLIDER">
        <div className="overlap-group-2">
          <RangeSlider
            className="b_slider"
            defaultValue={[0, 1]}
            thumbsDisabled={[true, false]}
            rangeSlideDisabled={true}
            value={brightness}
            onInput={e => { setBrightness(e); changeBrightness() }}
          />
        </div>
      </div>
    </div>

    <div className="SPEED">
      <div className="overlap-group-wrapper">
        <div className="overlap-group-2">
          <RangeSlider
            className="s_slider"
            defaultValue={[0, 1]}
            thumbsDisabled={[true, false]}
            rangeSlideDisabled={true}
            value={speed}
            onInput={e => { setSpeed(e); changeSpeed() }}
          />
        </div>
      </div>
      <img className="SPEED-ICON" alt="Speed ICON" src={require('./assets/SPEEDICON.png')} />
    </div>
    <img className="line" alt="Line" src={require('./assets/Line1.png')} />
    <img className="line-2" alt="Line" src={require('./assets/Line1.png')} />
  </div>

  <div className="EMOTIONAL-CIRCLE swiper-no-swiping" draggable="false" ref={emotionalCircleRef}>


    <div className="overlap-2">
      <img className="FLOWER-OF-LIFE" alt="Flower OF LIFE" src={require('./assets/FLOWEROFLIFE.png')} draggable="false" />
      <img className="line-3" alt="Line" src={require('./assets/Line2.png')} draggable="false" />
      <img className="line-4" alt="Line" src={require('./assets/Line3.png')} draggable="false" />
      <div className="text-wrapper-2" draggable="false">stressed</div>
      <div className="text-wrapper-3" draggable="false">relaxed</div>
      <div className="text-wrapper-4" draggable="false">nervous</div>
      <div className="text-wrapper-5" draggable="false">depressed</div>
      <div className="text-wrapper-6" draggable="false">sad</div>
      <div className="text-wrapper-7" draggable="false">alert</div>
      <div className="text-wrapper-8" draggable="false">arousal +</div>
      <div className="text-wrapper-9" draggable="false">valence +</div>
      <div className="text-wrapper-10" draggable="false">fatigued</div>
      <div className="text-wrapper-11" draggable="false">happy</div>
      <div className="text-wrapper-12" draggable="false">excited</div>
      <div className="text-wrapper-13" draggable="false">serene</div>
      <div className="text-wrapper-14" draggable="false">upset</div>
      <div className="text-wrapper-15" draggable="false">calm</div>
    </div>
  </div>
</div>
);
}


export { ExperiencesComponent };