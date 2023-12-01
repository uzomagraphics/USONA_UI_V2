import React, { useEffect, useState, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import autoAnimate from '@formkit/auto-animate'
import RangeSlider from 'react-range-slider-input';
import "react-range-slider-input/dist/style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { confirmAlert } from 'react-confirm-alert'; // You might need to install this package

// Import Styles
import "swiper/css";
import "swiper/css/pagination";
import './App.css';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//  const WS_URL = 'ws://192.168.1.72:8000';
// const WS_URL = 'ws://localhost:8000';
// const WS_URL = 'ws://usona-led-pulse.promega.com:8000';
const WS_URL = 'ws://studio-15.local:8000';

function App() {

  // First invocation just for logging when the connection is established.
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true
  });

  // Second invocation to destructure sendMessage and lastJsonMessage.
  const { sendMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    retryOnError: true,
    shouldReconnect: () => true
  });

  //////////SWIPER/////////
  const [swiper, setSwiper] = useState(null);
  const onSwiperInit = (swiper) => {
    setSwiper(swiper);
  };

  ///////////ANIMATE
  const [open, setOpen] = useState(false);
  const parentRef = React.useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      const elements = parentRef.current.querySelectorAll('[data-auto-animate]');
      elements.forEach((element) => {
        element.style.transitionDuration = '0s';
      });
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);
  const showMore = () => setOpen(!open);


  /////////EXPERIENCE////////////////
  var [experience, setExperience] = useState('');
  const changeExperience = (exp) => {
    console.log("Send experience = " + exp)
    sendMessage(JSON.stringify({
      "experience": exp
    }
    ));
  };

  /////////EMOTIONAL VALENCE////////
  const [incomingX, setIncomingX] = useState(null);
  const [incomingY, setIncomingY] = useState(null);

  var [play_pause, setPlay_pause] = useState('play');
  const changePlay_pause = () => {
    console.log("Send play_pause = " + play_pause)
    sendMessage(JSON.stringify({
      "stop": play_pause
    }
    ));
  };

  var [brightness, setBrightness] = useState('');
  const changeBrightness = (e) => {
    console.log("Send brightness = " + e[1] / 100)
    sendMessage(JSON.stringify({
      "brightness": e[1] / 100
    }
    ));
  };

  var [speed, setSpeed] = useState('');
  const changeSpeed = (e) => {
    console.log("Send speed = " + e[1] / 100)
    sendMessage(JSON.stringify({
      "speed": e[1] / 100
    }
    ));
  };

  var [AR, setAR] = useState('');
  const changeAR = (e) => {
    console.log("Send reactivity = " + e[1] / 100)
    sendMessage(JSON.stringify({
      "reactivity": e[1] / 100
    }
    ));
  };

  /////////AUDIO////////
  var [volume, setVolume] = useState('');
  const changeVolume = (e) => {
    console.log("Send volume = " + e[1] / 100)
    sendMessage(JSON.stringify({
      "volume": e[1] / 100
    }
    ));
  };

  var [volume2, setVolume2] = useState('');
  const changeVolume2 = (e) => {
    console.log("Send volume2 = " + e[1] / 100)
    sendMessage(JSON.stringify({
      "lightBrightness": e[1] / 100
    }
    ));
  };

  var [Audioplay_pause, setAudioPlay_pause] = useState('play');
  const changeAudioPlay_pause = () => {
    console.log("Send Audioplay_pause = " + Audioplay_pause)
    sendMessage(JSON.stringify({
      "AudioPlay_pause": Audioplay_pause
    }
    ));
  };

  var [source, setSource] = useState(1);
  const changeSource = (a) => {
    console.log("Send source = " + a)
    sendMessage(JSON.stringify({
      "source": a
    }
    ));
  };

  //Crestron//
  const sendCrestronButton1 = () => {
    console.log("sendCrestronButton1");
    sendMessage(JSON.stringify({
      "crestronButton": 1,
      "type": "public_c"
    }));
  };

  const sendCrestronButton2 = () => {
    console.log("sendCrestronButton2");
    sendMessage(JSON.stringify({
      "crestronButton": 2,
      "type": "public_c"
    }));
  };

  const sendCrestronButton3 = () => {
    console.log("sendCrestronButton3");
    sendMessage(JSON.stringify({
      "crestronButton": 3,
      "type": "public_c"
    }));
  };
  const sendCrestronButton4 = () => {
    console.log("sendCrestronButton4");
    sendMessage(JSON.stringify({
      "crestronButton": 4,
      "type": "public_c"
    }));
  };


  //////////////LIGHT//////////////
  var [lightBrightness, setLightBrightness] = useState('');
  const changeLightBrightness = (e) => {
    console.log("Send light brightness = " + e)
    sendMessage(JSON.stringify({
      "lightBrightness": e / 100
    }
    ));
  };

  var [onOff, setOnOff] = useState('ON');
  const changeOnOff = () => {
    console.log("Send light onOff = " + onOff)
    sendMessage(JSON.stringify({
      "onOff": onOff
    }
    ));
  };

  //////////////MOTOR//////////////
  var [motor, setMotor] = useState('');
  const changeMotor = (e) => {
    console.log("Send motor = " + Math.round(e * 10) / 10)
    sendMessage(JSON.stringify({
      "motor": + Math.round(e * 10) / 10
    }
    ));
  };

  //////////////SYSTEM//////////////
  const [td, setTd] = useState('DOWN');

  const handleReboot = () => {
    confirmAlert({
      title: 'Confirm to reboot',
      message: 'Are you sure you want to reboot the system?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            sendMessage(JSON.stringify({ action: 'reboot' }));
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  ////////PASSWORD//////
  var [login, setLogin] = useState('incorrect');
  var [userName, setUserName] = useState('');
  var [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    sendMessage(JSON.stringify({
      "password": password
    }
    ));
  };

  //////JSON//////
  useEffect(() => {
    if (lastJsonMessage !== null) {

      if (lastJsonMessage.energy !== undefined && lastJsonMessage.positivity !== undefined) {
        setIncomingX(lastJsonMessage.energy);
        setIncomingY(lastJsonMessage.positivity);
        console.log("Received energy = " + lastJsonMessage.energy + "positivity = " + lastJsonMessage.positivity);
      }

      if (lastJsonMessage.experience) {
        setExperience(prevExperience => {
          console.log("exp = " + lastJsonMessage.experience);
          return lastJsonMessage.experience;
        });
      }

      if (lastJsonMessage.stop) {
        setPlay_pause(prevPlay_pause => {
          console.log("play_pause = " + lastJsonMessage.stop);
          return lastJsonMessage.stop === 'play' ? 'pause' : 'play';
        });
      }

      if (lastJsonMessage.brightness) {
        setBrightness(prevBrightness => {
          console.log("brightness = " + lastJsonMessage.brightness);
          return [0, lastJsonMessage.brightness * 100];
        });
      }

      if (lastJsonMessage.speed) {
        setSpeed(prevSpeed => {
          console.log("speed = " + lastJsonMessage.speed);
          return [0, lastJsonMessage.speed * 100];
        });
      }
      if (lastJsonMessage.reactivity) {
        setAR(prevAR => {
          console.log("reactivity = " + lastJsonMessage.reactivity);
          return [0, lastJsonMessage.reactivity * 100];
        });
      }

      if (lastJsonMessage.volume) {
        setVolume(prevVolume => {
          console.log("volume = " + lastJsonMessage.volume);
          return [0, lastJsonMessage.volume * 100];
        });
      }

      if (lastJsonMessage.AudioPlay_pause) {
        setAudioPlay_pause(prevAudioPlay_pause => {
          console.log("AudioPlay_pause = " + lastJsonMessage.AudioPlay_pause);
          return lastJsonMessage.Audioplay_pause === 'play' ? 'pause' : 'play';
        });
      }

      if (lastJsonMessage.source) {
        setSource(prevSource => {
          console.log("source = " + lastJsonMessage.source);
          return lastJsonMessage.source;
        });
      }

      if (lastJsonMessage.lightBrightness) {
        setVolume2(prevVolume2 => {
          console.log("light brightness = " + lastJsonMessage.lightBrightness);
          return [0, lastJsonMessage.lightBrightness * 100];
        });
      }

      if (lastJsonMessage.onOff) {
        setOnOff(prevOnOff => {
          console.log("light onOff = " + (lastJsonMessage.onOff === 'ON' ? 'OFF' : 'ON'));
          return lastJsonMessage.onOff === 'ON' ? 'OFF' : 'ON';
        });
      }

      if (lastJsonMessage.TD) {
        setTd(prevTd => {
          console.log("TD = " + lastJsonMessage.TD);
          return lastJsonMessage.TD;
        });
      }

      if (lastJsonMessage.login === 'correct') {
        setLogin(prevLogin => {
          console.log("login = correct");
          return 'correct';
        });
      }
    }
  }, [lastJsonMessage]);


  ////// Emotion Circle START //////
  function translateCoordinates(incomingX, incomingY, circle) {
    // Assuming incomingX and incomingY are between 0 and 1, representing a percentage of the radius
    const radius = circle.width / 2; // Assuming it's a perfect circle

    // Convert percentages to pixel values within the circle
    let posX = (incomingX * 2 - 1) * radius; // Translating to range [-radius, radius]
    let posY = (incomingY * 2 - 1) * radius; // Translating to range [-radius, radius]

    // Rotate by +45 degrees
    const angle = -45 * (Math.PI / 180);
    const rotatedX = posX * Math.cos(angle) - posY * Math.sin(angle);
    const rotatedY = posX * Math.sin(angle) + posY * Math.cos(angle);

    // Translate the rotated coordinates back to the top-left origin
    const translatedX = rotatedX + radius;
    const translatedY = rotatedY + radius;

    return { translatedX, translatedY };
  }

  useEffect(() => {
    const circle = emotionalCircleRef.current.getBoundingClientRect();
    if (incomingX !== null && incomingY !== null && circle) {
      const { translatedX, translatedY } = translateCoordinates(incomingX, incomingY, circle);
      setTranslatedXX(translatedX);
      setTranslatedYY(translatedY);
    }
  }, [incomingX, incomingY]);

  //This will keep the reference to the DOM node for the "EMOTIONAL-CIRCLE"
  const emotionalCircleRef = useRef(null);

  const [translatedXX, setTranslatedXX] = useState(255);
  const [translatedYY, setTranslatedYY] = useState(255);


  useEffect(() => {
    let isDragging = false;

    // Capture the current value of the ref in a local variable
    const currentCircleRef = emotionalCircleRef.current;

    const processMovement = (x, y) => {
      const circle = emotionalCircleRef.current.getBoundingClientRect();
      const centerX = circle.left + circle.width / 2;
      const centerY = circle.top + circle.height / 2;
      const radius = circle.width / 2; // Assuming it's a perfect circle

      // Calculate the position of the pointer in the rotated coordinate system
      let offsetX = x - centerX;
      let offsetY = y - centerY;

      // Rotate the coordinate system back by -45 degrees
      const angle = -45 * (Math.PI / 180); // Convert 45 degrees to radians
      const rotatedX = offsetX * Math.cos(angle) - offsetY * Math.sin(angle);
      const rotatedY = offsetX * Math.sin(angle) + offsetY * Math.cos(angle);

      // Check if the pointer is within the circle
      if (Math.sqrt(rotatedX ** 2 + rotatedY ** 2) < radius) {
        // Rotate the coordinates back by +45 degrees to correct the position
        const correctedX = rotatedX * Math.cos(-angle) - rotatedY * Math.sin(-angle);
        const correctedY = rotatedX * Math.sin(-angle) + rotatedY * Math.cos(-angle);

        // Adjust position by adding center coordinates
        setTranslatedXX(centerX + correctedX - circle.left);
        setTranslatedYY(centerY + correctedY - circle.top);

        // Do your sendMessage calls here if necessary
        // The energy and positivity should be calculated based on the rotated coordinates
        let energy = 1 - (rotatedY + radius) / (2 * radius);
        let positivity = (rotatedX + radius) / (2 * radius);
        console.log("energy = " + energy + "positivity = " + positivity);
        sendMessage(JSON.stringify({
          "energy": energy,
          "positivity": positivity
        }));
      }
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;
      processMovement(event.clientX, event.clientY);
    };

    const handleTouchMove = (event) => {
      if (!isDragging) return;
      if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        processMovement(touch.clientX, touch.clientY);
      }
    };

    const startDrag = (event) => {
      isDragging = true;

      // Process the initial position for touch or mouse event
      if (event.type === 'touchstart' && event.touches && event.touches.length > 0) {
        const touch = event.touches[0];
        processMovement(touch.clientX, touch.clientY);
      } else if (event.type === 'mousedown') {
        processMovement(event.clientX, event.clientY);
      }

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
    };

    const stopDrag = () => {
      isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };

    // Attach the start and stop drag event listeners to the specific element
    if (currentCircleRef) {
      currentCircleRef.addEventListener('mousedown', startDrag);
      currentCircleRef.addEventListener('touchstart', startDrag, { passive: true });// passive removes violation warning in chrome console
      document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchend', stopDrag);

      return () => {
        currentCircleRef.removeEventListener('mousedown', startDrag);
        currentCircleRef.removeEventListener('touchstart', startDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
      };
    }
  }, [sendMessage]);
  ////// Emotion Circle END //////





  ////// Html //////
  return (
    <>
      <Swiper
        pagination={false}
        modules={[Pagination]}
        className="mySwiper"
        onInit={onSwiperInit}
        onSlideChange={() => setLogin('incorrect')}
      >

        <SwiperSlide>

          <div className="element-HOME">
            <div className="overlap-wrapper">
              <div className="overlap">
                <img className="rectangle" alt="Rectangle" src={require('./assets/Rectangle21.png')} />
                <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/USONABKG.png')} />

                <header className="HEADER">
                  <img
                    className="element-USONA-logo-high"
                    alt="Element USONA logo high"
                    src={require('./assets/Logo.png')}
                  />
                </header>

                <div className="EXPERIENCE">
                  <div className="overlap-2" onClick={e => { swiper.slideTo(1); }}>
                    <img className="EXPERIENCES" alt="Experiences" src={require('./assets/EXPERIENCES.png')} />
                    <img className="lineExp" alt="Line" src={require('./assets/Line1.png')} />
                    <div className="ICON-EXP">
                      <div className="overlap-group-2">
                        <img className="ellipse" alt="Ellipse" src={require('./assets/ICONEXP.png')} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="LIGHTING">
                  <div className="overlap-3" onClick={e => { swiper.slideTo(4); }}>
                    <img className="BRIGHTNESS-ICON" alt="Brightness ICON" src={require('./assets/BRIGHTNESSICON2.png')} />
                    <img className="img" alt="Lightingimg" src={require('./assets/ENVIRONMENT.png')} />
                    <img className="line" alt="Line" src={require('./assets/Line1.png')} />
                  </div>
                </div>

                <div className="AUDIO">
                  <div className="overlap-4" onClick={e => { swiper.slideTo(3); }}>
                    <img className="VOLUME-ICON" alt="Volume ICON" src={require('./assets/VOLUMEICON2.png')} />
                    <img className="AUDIO-2" alt="Audio" src={require('./assets/AUDIO.png')} />
                    <img className="line" alt="Line" src={require('./assets/Line1.png')} />
                  </div>
                </div>

                <div className="MOTOR-SYSTEM">
                  <div className="overlap-3" onClick={e => { swiper.slideTo(5); }}>
                    <img className="MOTOR-CONTROL-SYSTEM" alt="Motor CONTROL SYSTEM" src={require('./assets/MOTORCONTROLSYSTEM.png')} />
                    <img className="line-3" alt="Line" src={require('./assets/Line1.png')} />
                    <img className="noun-setting" alt="Noun setting" src={require('./assets/noun-setting.png')} />
                  </div>
                </div>

                <div className="EMOTIONAL">
                  <div className="overlap-3" onClick={e => { swiper.slideTo(2); }}>
                    <img className="EMOTIONAL-VALENCE" alt="Emotional VALENCE" src={require('./assets/EMOTIONALVALENCE.png')} />
                    <img className="line-3" alt="Line" src={require('./assets/Line1.png')} />
                    <img className="noun-flower-of-life" alt="Noun flower of life" src={require('./assets/flower-of-life.png')} />
                  </div>
                </div>

              </div>
            </div>

          </div>

        </SwiperSlide>

        <SwiperSlide>

          <div className="element-EXPERIENCES">
            <img className="rectangle" alt="Rectangle" src={require('./assets/Rectangle21.png')} />
            <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/PromoUSONA.png')} />

            <header className="HEADER">
              <img
                className="element-USONA-logo-high"
                alt="Element USONA logo high"
                src={require('./assets/Logo.png')}
              />
              <div className="text-wrapper">EXPERIENCES</div>
              <div className="home" onClick={e => { swiper.slideTo(0); }}>
                <img
                  alt="home"
                  src={require('./assets/home.png')}
                />
              </div>
            </header>

            <div className="element-RAIN-FOREST">
              {experience === 'forest' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse7.png')} /> : null}
              <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse7.png')} />
              <button className="btnimg" onClick={e => { changeExperience('forest'); setExperience('forest'); }}>
                <img className="img" alt="Element RAIN FOREST" src={require('./assets/RAINFOREST.png')} />
              </button>
            </div>

            <div className="element-OCEAN">
              {experience === 'ocean' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse8.png')} /> : null}
              <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse8.png')} />
              <button className="btnimg" onClick={e => { changeExperience('ocean'); setExperience('ocean'); }}>
                <img className="img" alt="Element OCEAN" src={require('./assets/OCEAN.png')} />
              </button>
            </div>

            <div className="element-MEDITATION">
              <div className="overlap-2">
                {experience === 'meditation' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse10.png')} /> : null}
                <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse10.png')} />
                <button className="btnimg" onClick={e => { changeExperience('meditation'); setExperience('meditation'); }}>
                  <img className="img" alt="Element MEDITATION" src={require('./assets/MEDITATION.png')} />
                </button>
              </div>
            </div>

            <div className="element-GALAXY">
              {experience === 'space' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse9.png')} /> : null}
              <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse9.png')} />
              <button className="btnimg" onClick={e => { changeExperience('space'); setExperience('space'); }}>
                <img className="img" alt="Element GALAXY" src={require('./assets/GALAXY.png')} />
              </button>
            </div>

            <div className="element-SPIRAL-RS">
              {experience === 'spiral' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse11.png')} /> : null}
              <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse11.png')} />
              <button className="btnimg" onClick={e => { changeExperience('spiral'); setExperience('spiral'); }}>
                <img className="img" alt="Element SPIRAL REACTIVE" src={require('./assets/SPIRAL.png')} />
              </button>
            </div>

            <div className="element-REACTIVE-SCENE">
              {experience === 'reactive2' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse14.png')} /> : null}
              <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse14.png')} />
              <button className="btnimg" onClick={e => { changeExperience('reactive2'); setExperience('reactive2'); }}>
                <img className="img" alt="Element REACTIVE SCENE" src={require('./assets/REACTIVESCENE.png')} />
              </button>
            </div>

          </div>

        </SwiperSlide>

        <SwiperSlide>

          <div className="element-EMOTIONAL-VALENCE">
            <img className="rectangle" alt="Rectangle" src={require('./assets/Rectangle21.png')} />
            <img className="Promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/USONABKG.png')} />

            <header className="HEADER">
              <img
                className="element-USONA-logo-high"
                alt="Element USONA logo high"
                src={require('./assets/Logo.png')}
              />
              <div className="text-wrapper">EMOTIONAL VALENCE</div>
              <div className="home" onClick={e => { swiper.slideTo(0); }}>
                <img
                  alt="home"
                  src={require('./assets/home.png')}
                />
              </div>
            </header>

            <div className="SETTINGS swiper-no-swiping">

              <div className="rectangle-2" />
              <img className="backR" alt="button" src={require('./assets/EMOTIONAL.png')} />
              <button className="btnimg" onClick={e => { setPlay_pause('pause'); changePlay_pause() }}>
                <div className="PLAY-STOP">
                  {play_pause === 'play' ? <img className="img" alt="ESTOP" src={require('./assets/ESTOP.png')} /> : <img className="img" alt="STOP_ACTIVE" src={require('./assets/ESTOP_CLIC.png')} />}
                </div>
              </button>

              <div className="BRIGHTNESS">
                <div className="SLIDER">
                  <div className="overlap-group-2">
                    <RangeSlider
                      className="b_slider"
                      defaultValue={[0, 1]}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      value={brightness}
                      onInput={e => { setBrightness(e); changeBrightness(e) }}
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
                      onInput={e => { setSpeed(e); changeSpeed(e) }}
                    />
                  </div>
                </div>
              </div>

              <div className="AUDIOR">
                <div className="overlap-audior">
                  <div className="overlap-audior2">
                    <RangeSlider
                      className="ar_slider"
                      defaultValue={[0, 1]}
                      thumbsDisabled={[true, false]}
                      rangeSlideDisabled={true}
                      value={AR}
                      onInput={e => { setAR(e); changeAR(e) }}
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="EMOTIONAL-CIRCLE swiper-no-swiping" draggable="false" ref={emotionalCircleRef}>
              <div className="overlap-2  pointer-container">
                <img className="FLOWER-OF-LIFE" alt="Flower OF LIFE" src={require('./assets/CIRCLE.png')} draggable="false" />
              </div>

              <img className="pointerimg" alt="pointer" src={require('./assets/pointer.png')}
                style={{
                  left: `${translatedXX}px`, // Set the left property to use translatedX
                  top: `${translatedYY}px`,  // Set the top property to use translatedY
                }} />
            </div>

          </div>

        </SwiperSlide>

        <SwiperSlide>

          <div className="element-AUDIO-STEP">

            <img className="rectangle" alt="Rectangle" src={require('./assets/Rectangle21.png')} />
            <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/PromoUSONA.png')} />

            <header className="HEADER">
              <img
                className="element-USONA-logo-high"
                alt="Element USONA logo high"
                src={require('./assets/Logo.png')}
              />
              <div className="text-wrapper">AUDIO</div>
              <div className="home" onClick={e => { swiper.slideTo(0); }}>
                <img
                  alt="home"
                  src={require('./assets/home.png')}
                />
              </div>
            </header>

            <div className="SETTINGS swiper-no-swiping">

              <img className="audio_settings" alt="audio settings" src={require('./assets/audiosettings.png')} />
              <div className="overlap-2">

                <div className="VOLUME">
                  <div className='slider-wrapper' >
                    <div className="SLIDER">
                      <div className="overlap-group-2">
                        <RangeSlider
                          className="a_slider"
                          defaultValue={[0, 1]}
                          thumbsDisabled={[true, false]}
                          rangeSlideDisabled={true}
                          value={volume}
                          onInput={e => { setVolume(e); changeVolume(e) }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='song-icon-wrapper' ref={parentRef}>

                  <div className="INPUT-SOURCE">

                    <div className='top'>
                      <p className="text-wrapper-7">Source:</p>
                      <img className="SONG-ICON2" alt="Song ICON" src={require('./assets/SONGICON.png')} />

                    </div>

                    <div className='bottom'>
                      <img className="line-4" alt="Line" src={require('./assets/LineAudio2.png')} />
                      {source === 1 ? <div className="rectangle-4" /> : null}
                      <div className="rectangle-4btn" onClick={e => { setSource((prevSource) => 1); changeSource(1) }}>
                        <div className="text-wrapper-2">Experience Audio</div>
                        <img className="line-bottom" alt="Line" src={require('./assets/Line4.png')} />
                      </div>
                      {source === 2 ? <div className="rectangle-5" /> : null}
                      <div className="rectangle-5btn" onClick={e => { setSource((prevSource) => 2); changeSource(2) }}>
                        <div className="text-wrapper-2">Spotify</div>
                        <img className="line-bottom" alt="Line" src={require('./assets/Line4.png')} />
                      </div>
                      {source === 3 ? <div className="rectangle-6" /> : null}
                      <div className="rectangle-6btn" onClick={e => { setSource((prevSource) => 3); changeSource(3) }}>
                        <div className="text-wrapper-2">Sonos</div>
                        <img className="line-bottom" alt="Line" src={require('./assets/Line4.png')} />
                      </div>
                      {source === 4 ? <div className="rectangle-7" /> : null}
                      <div className="rectangle-7btn" onClick={e => { setSource((prevSource) => 4); changeSource(4) }}>
                        <div className="text-wrapper-2">XLR Stereo</div>
                        <img className="line-bottom" alt="Line" src={require('./assets/Line4.png')} />
                      </div>
                      {source === 5 ? <div className="rectangle-8" /> : null}
                      <div className="rectangle-8btn" onClick={e => { setSource((prevSource) => 5); changeSource(5) }}>
                        <div className="text-wrapper-2">XLR Ambisonic</div>
                      </div>
                    </div>

                  </div>



                  <div className="PLAY-STOP">
                    <button className="btnimg2" onClick={e => { setAudioPlay_pause(Audioplay_pause === 'play' ? 'pause' : 'play'); changeAudioPlay_pause() }}>
                      {Audioplay_pause === 'play' ? <img className="img2" alt="Play STOP" src={require('./assets/STOP_ACTIVE.png')} /> : <img className="img2" alt="Play STOP" src={require('./assets/STOPA.png')} />}
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </SwiperSlide>

        <SwiperSlide>

          <div className="element-LIGHTNING">
            <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/USONABKG.png')} />
            <div className="rectangle" />

            <header className="HEADER">
              <img
                className="element-USONA-logo-high"
                alt="Element USONA logo high"
                src={require('./assets/Logo.png')}
              />
              <div className="text-wrapper">ENVIRONMENT</div>
              <div className="home" onClick={e => { swiper.slideTo(0); }}>
                <img
                  alt="home"
                  src={require('./assets/home.png')}
                />
              </div>
            </header>

            <div className="SETTINGS swiper-no-swiping">
              <div className="overlap-2">
                <div className="rectangle-2" />
                <img className="backL" alt="Line" src={require('./assets/RECTANGLELIGHT.png')} />
              </div>

              <div className="MOTOR-CONTROL swiper-no-swiping">
                <div className='bottom'>
                  <div className="UP-DOWN">
                    <img className="UPDOWNI" alt="Up" src={require('./assets/UPDOWN.png')} />
                    <div className='UP-DOWN2' onClick={sendCrestronButton3} >
                    </div>
                    <div className='UP-DOWN1' onClick={sendCrestronButton4} >
                    </div>
                  </div>
                  <img className="HALF-OPEN" onClick={sendCrestronButton1} src={require('./assets/HALFOPEN.png')} alt="Half Open" />
                  <img className="CLOSE" onClick={sendCrestronButton2} src={require('./assets/CLOSE.png')} alt="Closed" />
                </div>
              </div>

              <div className='abajo'>

                <div className='abajo-down'>

                  <div className="ON-OFF">
                    <div className='on-off-btn' onClick={e => { setOnOff(onOff === 'ON' ? 'OFF' : 'ON'); changeOnOff() }}>
                      <div className="overlap-group">
                        {onOff === 'ON' ? <img className="CURSEUR" alt="Curseur" src={require('./assets/CURSEUR.png')} /> : <img className="CURSEUR2" alt="Curseur" src={require('./assets/CURSEUR.png')} />}
                      </div>
                    </div>
                  </div>

                  <div className="BRIGHTNESS swiper-no-swiping">
                    <div className="SLIDER">
                      <div className="overlap-group-2">
                        <RangeSlider
                          className="b_slider"
                          defaultValue={[0, 1]}
                          thumbsDisabled={[true, false]}
                          rangeSlideDisabled={true}
                          value={volume2}
                          onInput={e => { setVolume2(e); changeVolume2(e) }}
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </SwiperSlide>

        <SwiperSlide>

          <div className="element-MOTOR-CONTROL">

            <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/USONABKG.png')} />
            <div className="rectangle" />

            <header className="HEADER">
              <img
                className="element-USONA-logo-high"
                alt="Element USONA logo high"
                src={require('./assets/Logo.png')}
              />
              <div className="text-wrapper">MOTOR CONTROL</div>
              <div className="home" onClick={e => { swiper.slideTo(0); }}>
                <img
                  alt="home"
                  src={require('./assets/home.png')}
                />
              </div>
            </header>

            {login === 'correct' ?

              <div className="SETTINGS">
                <div className="overlap-2">

                  <img className="MC" alt="Line" src={require('./assets/MC.png')} />
                  <div className="overlap-group-2" />

                  <div className="MOTOR-CONTROL">
                    <div className='posText'>
                    </div>
                    <div className='top'>

                      <button className="POSITION" onClick={e => { setMotor(1); changeMotor(1) }}>
                        <img className="POSITIONbtn" alt="Rectangle" src={require('./assets/POSITION01.png')} />
                      </button>

                      <button className="POSITION-3" onClick={e => { setMotor(2); changeMotor(2) }}>
                        <img className="POSITIONbtn" alt="Rectangle" src={require('./assets/POSITION03.png')} />
                      </button>

                    </div>
                  </div>

                  <div className='bottom'>

                    <div className='motorStop' onClick={e => { setMotor(3); changeMotor(3) }}>
                      <img className="motorstopimg" alt="motor stop" src={require('./assets/ESOF.png')} />
                    </div>

                    <div className="ON-OFF">
                      <div className='on-off-btn' onClick={e => { setOnOff(onOff === 'ON' ? 'OFF' : 'ON'); changeOnOff() }}>
                        <div className="overlap-groupOn">
                          {onOff === 'ON' ? <img className="CURSEUR" alt="Curseur" src={require('./assets/CURSEUR.png')} /> : <img className="CURSEUR2" alt="Curseur" src={require('./assets/CURSEUR.png')} />}
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className='right'>

                    <div className="SYSTEM">
                      <div className="REBOOT" onClick={handleReboot}>
                        <img className="POWER" alt="Power" src={require('./assets/REBOOT.png')} />
                      </div>
                    </div>

                    <div className="TD-STATUS">
                      <p className="touch-designer">
                      </p>
                      {td === 'UP' ? <div className="ellipse" /> : <div className="ellipse2" />}
                    </div>

                  </div>

                </div>
              </div>

              :

              <div className="element-LOGIN">

                <div className="overlap-wrapper">
                  {/* <div className="overlap">

                    <div className="rectangleW" />
                    <div className="rectangle" />
                    <div className="overlap" />
                    <div className="div" /> */}
                  <img className='loginImg' alt='' src={require('./assets/LOGIN.png')} />

                  <form className='form' onSubmit={handleSubmit}>

                    <div className="LOGIN">
                      <input className="rectangle-2" value={userName} type="text" name="uname" required onChange={e => { setUserName(e.target.value) }} />
                    </div>

                    <div className="PASSWORD">
                      <div className='pass-wrapper'>
                        <input className="overlap-group" value={password} type="current-password" name="pass" required onChange={e => { setPassword(e.target.value) }} />
                      </div>
                    </div>

                    <div className="ENTER">
                      <div className="div-wrapper" >
                        <button className='submitbtn' type="submit"></button>
                      </div>
                    </div>

                  </form>

                  {/* </div> */}
                </div>

              </div>
            }

          </div>

        </SwiperSlide>

      </Swiper>
    </>
  );

}

export default App;
