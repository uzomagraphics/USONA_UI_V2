import React, { useEffect, useState, useRef } from 'react';
import useWebSocket from 'react-use-websocket';

import autoAnimate from '@formkit/auto-animate'

import RangeSlider from 'react-range-slider-input';
import "react-range-slider-input/dist/style.css";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import './App.css';

// import required modules
import { Pagination } from "swiper/modules";

const WS_URL = 'ws://localhost:8000';

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
  });

  useWebSocket(WS_URL, {
    share: true,
    filter: () => false
  });


  ///////////ANIMATE
  const [open, setOpen] = useState(false);
  const parentRef = React.useRef(null);

  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  const showMore = () => setOpen(!open);
  //////////////////////


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
    console.log("Send brightness = " + brightness)
    sendMessage(JSON.stringify({
      "brightness": brightness[1] / 100
    }
    ));
  };

  var [speed, setSpeed] = useState('');
  const changeSpeed = (e) => {
    console.log("Send speed = " + speed)
    sendMessage(JSON.stringify({
      "speed": speed[1] / 100
    }
    ));
  };

  /////////AUDIO////////
  var [volume, setVolume] = useState('');
  const changeVolume = (e) => {
    console.log("Send volume = " + volume)
    sendMessage(JSON.stringify({
      "volume": volume[1] / 100
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


  //////////////BLINDS//////////////
  var [blinds, setBlinds] = useState('');
  const changeBlinds = (e) => {
    console.log("Send blinds = " + e)
    sendMessage(JSON.stringify({
      "blinds": e
    }
    ));
  };

  //////////////LIGHT//////////////
  var [lightBrightness, setLightBrightness] = useState('');
  const changeLightBrightness = (e) => {
    console.log("Send light brightness = " + lightBrightness)
    sendMessage(JSON.stringify({
      "lightBrightness": lightBrightness[1] / 100
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
    console.log("Send motor = " + e)
    sendMessage(JSON.stringify({
      "motor": e
    }
    ));
  };

  const sendEmergencyStop = () => {
    console.log("sendEmergencyStop")
    sendMessage(JSON.stringify({
      "EmergencyStop": "STOP",
    }
    ));
  };

  //////////////SYSTEM//////////////
  const [td, setTd] = useState('DOWN');

  const sendReboot = () => {
    console.log("sendReboot")
    sendMessage(JSON.stringify({
      "Reboot": "Reboot",
    }
    ));
  };

  ////////PASSWORD//////
  var [login, setLogin] = useState('incorrect');
  var [userName, setUserName] = useState('');
  var [password, setPassword] = useState('');
  const handleSubmit = (event) => {
    // Prevent page reload
    event.preventDefault();

    sendMessage(JSON.stringify({
      "userName": userName
    }
    ));
    sendMessage(JSON.stringify({
      "password": password
    }
    ));
  };

  ///////////MODBUS///////////////
  const sendModbus = (num) => {
    console.log("sendModbus = " + num)
    sendMessage(JSON.stringify({
      "modbusButton": num,
      "type": "public_c"
    }
    ));
  };
  const sendModbusSlider = (num, id) => {
    console.log("sendModbusSlider = " + id + " val = " + num)
    sendMessage(JSON.stringify({
      "modbusSlider": num,
      "type": "modbusSlider" + id
    }
    ));
  };

  ///////////BACNET///////////////
  const sendBacnet = (num) => {
    console.log("sendBacnet = " + num)
    sendMessage(JSON.stringify({
      "bacnetButton": num,
      "type": "public_c"
    }
    ));
  };
  const sendBacnetSlider = (num, id) => {
    console.log("sendBacnetSlider = " + id + " val = " + num)
    sendMessage(JSON.stringify({
      "bacnetSlider": num,
      "type": "bacnetSlider" + id
    }
    ));
  };

  //////JSON//////
  useEffect(() => {
    if (lastJsonMessage !== null) {

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

      if (lastJsonMessage.blinds) {
        setBlinds(prevBlinds => {
          console.log("blinds = " + lastJsonMessage.blinds);
          return lastJsonMessage.blinds;
        });
      }

      if (lastJsonMessage.lightBrightness) {
        setLightBrightness(prevLightBrightness => {
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

      if (lastJsonMessage.motor) {
        setBlinds(prevMotor => {
          console.log("motor = " + lastJsonMessage.motor);
          return lastJsonMessage.motor;
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



  //MOUSE POSITION - FLOWER OF LIFE
  //This will keep the reference to the DOM node for the "EMOTIONAL-CIRCLE"
  const emotionalCircleRef = useRef(null);

  useEffect(() => {
    let isDragging = false;

    // Capture the current value of the ref in a local variable
    const currentCircleRef = emotionalCircleRef.current;

    const getCircleProperties = () => {
      const boundingBox = emotionalCircleRef.current.getBoundingClientRect();
      const centerX = boundingBox.left + boundingBox.width / 2;
      const centerY = boundingBox.top + boundingBox.height / 2;
      const radius = (boundingBox.width + boundingBox.height) / 4;  // Average of width and height divided by 2

      return {
        centerX,
        centerY,
        radius
      };
    };

    const processMovement = (x, y) => {
      const { centerX, centerY, radius } = getCircleProperties();

      const translatedX = x - centerX;
      const translatedY = y - centerY;

      const rotatedX = translatedX * Math.sqrt(2) / 2 - translatedY * Math.sqrt(2) / 2;
      const rotatedY = translatedX * Math.sqrt(2) / 2 + translatedY * Math.sqrt(2) / 2;

      if (Math.pow(rotatedX, 2) + Math.pow(rotatedY, 2) < Math.pow(radius, 2)) {
        const finalX = rotatedX + centerX;
        const finalY = rotatedY + centerY;

        sendMessage(JSON.stringify({
          "energy": (finalX - centerX + radius) / (2 * radius)
        }));
        sendMessage(JSON.stringify({
          "positivity": (finalY - centerY + radius) / (2 * radius)
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
      currentCircleRef.addEventListener('touchstart', startDrag);
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













  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper" onSlideChange={() => setLogin('incorrect')} >

        <SwiperSlide>

          <div className="element-EXPERIENCES">
            <img className="promousonalogowhite" alt="Promousonalogowhite" src={require('./assets/PromoUSONA.png')} />

            <header className="HEADER">
              <img
                className="element-USONA-logo-high"
                alt="Element USONA logo high"
                src={require('./assets/Logo.png')}
              />
              <div className="text-wrapper">EXPERIENCES</div>
            </header>

            <div className="element-RAIN-FOREST">
              <div className="overlap-2">
                {experience === 'forest' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse7.png')} /> : null}
                <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse7.png')} />
                <button className="btnimg" onClick={e => { changeExperience('forest'); setExperience('forest') }}>
                  <img className="img" alt="Element RAIN FOREST" src={require('./assets/RAINFOREST.png')} />
                </button>
              </div>
            </div>

            <div className="element-OCEAN">
              <div className="overlap-2">
                {experience === 'ocean' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse8.png')} /> : null}
                <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse8.png')} />
                <button className="btnimg" onClick={e => { changeExperience('ocean'); setExperience('ocean') }}>
                  <img className="img-2" alt="Element OCEAN" src={require('./assets/OCEAN.png')} />
                </button>
              </div>
            </div>

            <div className="element-MEDITATION">
              <div className="overlap-2">
                {experience === 'meditation' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse10.png')} /> : null}
                <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse10.png')} />
                <button className="btnimg" onClick={e => { changeExperience('meditation'); setExperience('meditation') }}>
                  <img className="element-MEDITATION-2" alt="Element MEDITATION" src={require('./assets/MEDITATION.png')} />
                </button>
              </div>
            </div>

            <div className="element-GALAXY">
              <div className="overlap-2">
                {experience === 'space' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse9.png')} /> : null}
                <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse9.png')} />
                <button className="btnimg" onClick={e => { changeExperience('space'); setExperience('space') }}>
                  <img className="img" alt="Element GALAXY" src={require('./assets/GALAXY.png')} />
                </button>
              </div>
            </div>

            <div className="element-SPIRAL-RS">
              <div className="overlap-2">
                {experience === 'spiral' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse11.png')} /> : null}
                <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse11.png')} />
                <button className="btnimg" onClick={e => { changeExperience('spiral'); setExperience('spiral') }}>
                  <img className="img-2" alt="Element SPIRAL REACTIVE" src={require('./assets/SPIRAL.png')} />
                </button>
              </div>
            </div>

            <div className="element-REACTIVE-SCENE">
              <div className="overlap-2">
                {experience === 'reactive2' ? <img className="ellipseRot" alt="Ellipse" src={require('./assets/Ellipse14.png')} /> : null}
                <img className="ellipse" alt="Ellipse" src={require('./assets/Ellipse14.png')} />
                <button className="btnimg" onClick={e => { changeExperience('reactive2'); setExperience('reactive2') }}>
                  <img className="img-2" alt="Element REACTIVE SCENE" src={require('./assets/REACTIVESCENE.png')} />
                </button>
              </div>
            </div>
          </div>

        </SwiperSlide>

      </Swiper>
    </>
  );
}


export default App;
