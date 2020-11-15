import React, { Component } from "react";
import equal from "fast-deep-equal";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: this.props.sessionLength,
      seconds: "00",
      isSession: true,
    };
    this.interval = null;
  }

  togglePhase = () => {
    const { isSession } = this.state;
    const { sessionLength, breakLength } = this.props;
    if (isSession) {
      this.setState({
        timeLeft: sessionLength,
      });
    } else {
      this.setState({
        timeLeft: breakLength,
      });
    }
  };

  reset = () => {
    clearInterval(this.interval);
    this.setState({
      timeLeft: 25,
      seconds: "00",
      isSession: true,
    });
  };

  componentDidMount() {
    this.togglePhase();
  }

  componentDidUpdate(prevProps) {
    const { isSession } = this.state;
    const { sessionLength, breakLength, reset } = this.props;
    if (!equal(reset, prevProps.reset)) {
      this.reset();
    }
    if (isSession) {
      if (!equal(sessionLength, prevProps.sessionLength)) {
        this.setState({
          timeLeft: sessionLength,
        });
      }
    } else {
      if (!equal(breakLength, prevProps.breakLength)) {
        this.setState({
          timeLeft: breakLength,
        });
      }
    }
  }

  handlePhaseChange = () => {
    clearInterval(this.interval);
    this.audioBeep.play();
    this.setState((state) => ({
      isSession: !state.isSession,
    }));
    this.togglePhase();
    this.interval = setInterval(this.updateTimer, 1000);
  };

  updateTimer = () => {
    const { seconds, timeLeft } = this.state;
    if (timeLeft === 0 && seconds === "01") {
      this.handlePhaseChange();
    }
    this.setState((state) => ({
      seconds: (state.seconds -= 1),
    }));
    if (seconds === "00") {
      this.setState({
        seconds: 59,
      });
      this.setState((state) => ({
        timeLeft: (state.timeLeft -= 1),
      }));
    }
    if (seconds <= 10 && seconds >= 1) {
      this.setState((state) => ({
        seconds: "0" + state.seconds,
      }));
    }
  };

  play = () => {
    clearInterval(this.interval);
    this.interval = setInterval(this.updateTimer, 1000);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  render() {
    const { timeLeft, seconds, isSession } = this.state;
    return (
      <div>
        <h2 id="timer-label">{isSession ? "Session" : "Break"}</h2>
        <div id="time-left">
          {timeLeft < 10 ? "0" + timeLeft : timeLeft}:{seconds}
        </div>
        <div>
          <span id="start_stop">
            <i onClick={this.play} className="fas fa-play"></i>
            <i onClick={this.pause} className="fas fa-pause"></i>
          </span>
          <audio
            id="beep"
            preload="auto"
            ref={(audio) => {
              this.audioBeep = audio;
            }}
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          />
        </div>
      </div>
    );
  }
}

export default Timer;
