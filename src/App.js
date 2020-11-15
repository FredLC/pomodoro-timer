import "./App.css";
import TimerControls from "./TimerControls";

function App() {
  return (
    <div className="App">
      <video
        src="background.mp4"
        className="video-background"
        loop
        muted
        autoPlay
      ></video>
      <div className="video-overlay"></div>
      <h1>Pomodoro Clock</h1>
      <TimerControls />
    </div>
  );
}

export default App;
