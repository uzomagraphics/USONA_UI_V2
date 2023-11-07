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

const WS_URL = 'ws://192.168.1.72:8000';

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


  //////////////BLINDS//////////////
  var [blinds, setBlinds] = useState('');
  const changeBlinds = (e) => {
    console.log("Send blinds = " + Math.round(e * 10) / 10)
    sendMessage(JSON.stringify({
      "blinds": Math.round(e * 10) / 10
    }
    ));
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
                        <div className="element-RAIN-FOREST" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="LIGHTING">
                  <div className="overlap-3" onClick={e => { swiper.slideTo(4); }}>
                    <img className="BRIGHTNESS-ICON" alt="Brightness ICON" src={require('./assets/BRIGHTNESSICON2.png')} />
                    <img className="img" alt="Lightingimg" src={require('./assets/LIGHTING.png')} />
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
              <button className="btnimg" onClick={e => { setPlay_pause(play_pause === 'play' ? 'pause' : 'play'); changePlay_pause() }}>
                <div className="PLAY-STOP">
                  <img className="backB" alt="button" src={require('./assets/Ellipse13.png')} />
                  {play_pause === 'play' ? <img className="img" alt="Play STOP" src={require('./assets/Play.png')} /> : null}
                </div>
              </button>

              <img className="line-b" alt="Line" src={require('./assets/Line1.png')} />
              <div className="text-brightness" draggable="false"><p className='bright'>Brightness</p></div>

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
                <img className="SPEED-ICON" alt="Speed ICON" src={require('./assets/SPEEDICON.png')} />
              </div>

              <img className="line" alt="Line" src={require('./assets/Line1.png')} />
              <img className="line-s" alt="Line" src={require('./assets/Line1.png')} />
              <div className="text-speed" draggable="false"><p className='speed_t'>Speed</p></div>
              <img className="line-2" alt="Line" src={require('./assets/Line1.png')} />
            </div>

            <div className="EMOTIONAL-CIRCLE swiper-no-swiping" draggable="false" ref={emotionalCircleRef}>

              <div className="overlap-2">
                <img className="FLOWER-OF-LIFE" alt="Flower OF LIFE" src={require('./assets/CIRCLE.png')} draggable="false" />

                <div className="text-wrapper-2" draggable="false">stressed</div>
                <div className="text-wrapper-3" draggable="false">relaxed</div>
                <div className="text-wrapper-4" draggable="false">nervous</div>
                <div className="text-wrapper-5" draggable="false">depressed</div>
                <div className="text-wrapper-6" draggable="false">sad</div>
                <div className="text-wrapper-7" draggable="false">alert</div>

                <div className="text-wrapper-10" draggable="false">fatigued</div>
                <div className="text-wrapper-11" draggable="false">happy</div>
                <div className="text-wrapper-12" draggable="false">excited</div>
                <div className="text-wrapper-13" draggable="false">serene</div>
                <div className="text-wrapper-14" draggable="false">upset</div>
                <div className="text-wrapper-15" draggable="false">calm</div>
              </div>

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
                  {!open ?
                    (
                      <div>
                        <div className='icon-wrapper' onClick={showMore}></div>
                        <div className='song-wrapper'>
                        </div>
                      </div>
                    )
                    :
                    (
                      <div className="INPUT-SOURCE">
                        <div className='top'>
                          <img className="SONG-ICON2" alt="Song ICON" src={require('./assets/SONGICON.png')} />
                          <img className="BACK" alt="Back" src={require('./assets/BACK.png')} onClick={showMore} />
                        </div>
                        <div className='bottom'>
                          <img className="line-4" alt="Line" src={require('./assets/LineAudio2.png')} />
                          {source == 1 ? <div className="rectangle-4" /> : null}
                          <div className="rectangle-4btn" onClick={e => { setSource((prevSource) => 1); changeSource(1) }}>
                            <div className="text-wrapper-2">Source 01 - Title</div>
                            <img className="line-bottom" alt="Line" src={require('./assets/Line4.png')} />
                          </div>
                          {source == 2 ? <div className="rectangle-5" /> : null}
                          <div className="rectangle-5btn" onClick={e => { setSource((prevSource) => 2); changeSource(2) }}>
                            <div className="text-wrapper-2">Source 02 - Title</div>
                            <img className="line-bottom" alt="Line" src={require('./assets/Line4.png')} />
                          </div>
                          {source == 3 ? <div className="rectangle-6" /> : null}
                          <div className="rectangle-6btn" onClick={e => { setSource((prevSource) => 3); changeSource(3) }}>
                            <div className="text-wrapper-2">Source 03 - Title</div>
                            <img className="line-bottom" alt="Line" src={require('./assets/Line4.png')} />
                          </div>
                          {source == 4 ? <div className="rectangle-7" /> : null}
                          <div className="rectangle-7btn" onClick={e => { setSource((prevSource) => 4); changeSource(4) }}>
                            <div className="text-wrapper-2">Source 04 - Title</div>
                            <img className="line-bottom" alt="Line" src={require('./assets/Line4.png')} />
                          </div>
                          {source == 5 ? <div className="rectangle-8" /> : null}
                          <div className="rectangle-8btn" onClick={e => { setSource((prevSource) => 5); changeSource(5) }}>
                            <div className="text-wrapper-2">Source 05 - Title</div>
                          </div>

                        </div>
                      </div>
                    )
                  }
                  <div className="PLAY-STOP">
                    <button className="btnimg2" onClick={e => { setAudioPlay_pause(Audioplay_pause == 'play' ? 'pause' : 'play'); changeAudioPlay_pause() }}>
                      {Audioplay_pause == 'play' ? <img className="img2" alt="Play STOP" src={require('./assets/Play.png')} /> : <img className="img2" alt="Play STOP" src={require('./assets/Pause.png')} />}
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
              <div className="text-wrapper">LIGHTING</div>
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






                  <img className="HALF-OPEN" onClick={e => { setBlinds(0.5); changeBlinds(0.5) }} src={require('./assets/HALFOPEN.png')} />

                  <img className="CLOSE" onClick={e => { setBlinds(1); changeBlinds(1) }} src={require('./assets/CLOSE.png')} />

                </div>
              </div>

              <div className='abajo'>

                <div className='abajo-down'>

                  <div className="ON-OFF">

                    <div className='on-off-btn' onClick={e => { setOnOff(onOff == 'ON' ? 'OFF' : 'ON'); changeOnOff() }}>
                      <div className="overlap-group">
                        {onOff == 'ON' ? <img className="CURSEUR" alt="Curseur" src={require('./assets/CURSEUR.png')} /> : <img className="CURSEUR2" alt="Curseur" src={require('./assets/CURSEUR.png')} />}
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

            <div className="SETTINGS">
              <div className="overlap-2">
                <img className="MC" alt="Line" src={require('./assets/MC.png')} />
                <div className="overlap-group-2">

                </div>


                <div className="MOTOR-CONTROL">
                  <div className='posText'>

                  </div>
                  <div className='top'>


                    <button className="POSITION" onClick={e => { setMotor(0); changeMotor(0) }}>
                      <img className="POSITIONbtn" alt="Rectangle" src={require('./assets/POSITION01.png')} />
                    </button>



                    <button className="POSITION-3" onClick={e => { setMotor(1); changeMotor(1) }}>
                      <img className="POSITIONbtn" alt="Rectangle" src={require('./assets/POSITION03.png')} />
                    </button>


                  </div>
                </div>

                <div className='bottom'>

                  <div className="ON-OFF">

                    <div className='on-off-btn' onClick={e => { setOnOff(onOff == 'ON' ? 'OFF' : 'ON'); changeOnOff() }}>
                      <div className="overlap-groupOn">
                        {onOff == 'ON' ? <img className="CURSEUR" alt="Curseur" src={require('./assets/CURSEUR.png')} /> : <img className="CURSEUR2" alt="Curseur" src={require('./assets/CURSEUR.png')} />}
                      </div>
                    </div>

                  </div>
                </div>

                <div className='right'>
                  <div className="SYSTEM">
                    <div className="REBOOT" onClick={e => { sendReboot() }}>
                      <img className="POWER" alt="Power" src={require('./assets/REBOOT.png')} />
                    </div>
                  </div>
                  <div className="TD-STATUS">
                    <p className="touch-designer">

                    </p>
                    {td == 'UP' ? <div className="ellipse" /> : <div className="ellipse2" />}
                  </div>
                </div>
              </div>
            </div>

            {login == 'correct' ? null :
              <div className="element-LOGIN">

                <div className="overlap-wrapper">
                  <div className="overlap">

                    <div className="rectangleW" />
                    <div className="rectangle" />
                    <div className="overlap" />
                    <div className="div" />
                    <img className='loginImg' src={require('./assets/LOGIN.png')} />
                    <form className='form' onSubmit={handleSubmit}>
                      <div className="PASSWORD">
                        <div className='pass-wrapper'>

                          <input className="overlap-group" value={password} type="password" name="pass" required onChange={e => { setPassword(e.target.value) }} />


                        </div>

                      </div>
                      <div className="LOGIN">


                        <input className="rectangle-2" value={userName} type="text" name="uname" required onChange={e => { setUserName(e.target.value) }} />
                      </div>
                      <div className="ENTER">
                        <div className="div-wrapper" >
                          <button className='submitbtn' type="submit">

                          </button>
                        </div>
                      </div>

                    </form>


                  </div>
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
