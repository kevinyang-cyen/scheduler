import { useState } from "react";


// function to switch modes while booking/deleting/editing an interview
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    if (replace) {
      history.pop();
      setMode(newMode);
      setHistory([...history, newMode]);
    }
    else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length-1]);
    }
  }

  return { mode, transition, back };
}