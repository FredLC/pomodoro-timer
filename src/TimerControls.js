import React from "react";
import Timer from "./Timer";

class TimerControls extends React.Component {
  state = {
    breakLength: 5,
    sessionLength: 25,
    reset: false,
  };

  handleDecrement = (phase) => {
    if (phase === "break") {
      this.state.breakLength > 1
        ? this.setState((state) => ({
            breakLength: (state.breakLength -= 1),
          }))
        : this.setState({
            breakLength: 1,
          });
    } else {
      this.state.sessionLength > 1
        ? this.setState((state) => ({
            sessionLength: (state.sessionLength -= 1),
          }))
        : this.setState({
            sessionLength: 1,
          });
    }
  };

  handleIncrement = (phase) => {
    if (phase === "break") {
      this.state.breakLength < 60
        ? this.setState((state) => ({
            breakLength: (state.breakLength += 1),
          }))
        : this.setState({
            breakLength: 60,
          });
    } else {
      this.state.sessionLength < 60
        ? this.setState((state) => ({
            sessionLength: (state.sessionLength += 1),
          }))
        : this.setState({
            sessionLength: 60,
          });
    }
  };

  reset = () => {
    this.setState((state) => ({
      breakLength: 5,
      sessionLength: 25,
      reset: !state.reset,
    }));
  };

  render() {
    return (
      <div>
        <div id="timer-controls">
          <div className="timer-control">
            <h2 id="break-label">Break Length</h2>
            <div className="control">
              <i
                onClick={() => this.handleDecrement("break")}
                className="fas fa-minus"
                id="break-decrement"
              ></i>
              <p id="break-length">{this.state.breakLength}</p>
              <i
                onClick={() => this.handleIncrement("break")}
                className="fas fa-plus"
                id="break-increment"
              ></i>
            </div>
          </div>
          <div className="timer-control">
            <i onClick={this.reset} className="fas fa-sync-alt" id="reset"></i>
          </div>
          <div className="timer-control">
            <h2 id="session-label">Session Length</h2>
            <div className="control">
              <i
                onClick={() => this.handleDecrement("session")}
                className="fas fa-minus"
                id="session-decrement"
              ></i>
              <p id="session-length">{this.state.sessionLength}</p>
              <i
                onClick={() => this.handleIncrement("session")}
                className="fas fa-plus"
                id="session-increment"
              ></i>
            </div>
          </div>
        </div>
        <Timer
          breakLength={this.state.breakLength}
          sessionLength={this.state.sessionLength}
          reset={this.state.reset}
        />
      </div>
    );
  }
}

export default TimerControls;
