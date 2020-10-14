import React, { createContext, useReducer, useEffect} from "react";
import Circle from "./Circle.js";
import Line from "./Line";

import "./App.scss";

export const CirclesContext = createContext();

const circlesReducer = (state, action) => {
  let new_state;
  let x1;
  let y1;
  let x2;
  let y2;
  let length;

  switch (action.type) {
    case "POPULATE_STATE":
      return action.state;
    case "CIRCLE_ONE_UPDATE":
      new_state = Object.assign({}, state, action.new_position);
      x1 = parseInt(new_state.CIRCLE_ONE.x) + 75;
      y1 = parseInt(new_state.CIRCLE_ONE.y) + 75;
      x2 = parseInt(new_state.CIRCLE_TWO.x) + 75;
      y2 = parseInt(new_state.CIRCLE_TWO.y) + 75;
      length = Math.sqrt(
        Math.pow(parseInt(x2) - parseInt(x1), 2) +
          Math.pow(parseInt(y2) - parseInt(y1), 2)
      ).toString();
      new_state = Object.assign({}, new_state, { LENGTH: length });
      return new_state;
    case "CIRCLE_TWO_UPDATE":
      new_state = Object.assign({}, state, action.new_position);
      x1 = parseInt(new_state.CIRCLE_ONE.x) + 75;
      y1 = parseInt(new_state.CIRCLE_ONE.y) + 75;
      x2 = parseInt(new_state.CIRCLE_TWO.x) + 75;
      y2 = parseInt(new_state.CIRCLE_TWO.y) + 75;
      length = Math.sqrt(
        Math.pow(parseInt(x2) - parseInt(x1), 2) +
          Math.pow(parseInt(y2) - parseInt(y1), 2)
      ).toString();
      new_state = Object.assign({}, new_state, { LENGTH: length });
      return new_state;
    case "LENGTH":
      let old_length = parseInt(state.LENGTH);
      let new_length = parseInt(action.new_length.LENGTH);
      let theta;

      x1 = parseInt(state.CIRCLE_ONE.x) + 75;
      y1 = parseInt(state.CIRCLE_ONE.y) + 75;
      x2 = parseInt(state.CIRCLE_TWO.x) + 75;
      y2 = parseInt(state.CIRCLE_TWO.y) + 75;
      
      if (y2 >= y1) {
        theta = Math.asin((x2 - x1)/old_length);
        x2 = Math.round(new_length*Math.sin(theta) + x1 - 75);
        y2 = Math.round(new_length*Math.cos(theta) + y1 - 75);
        new_state = Object.assign({}, state, { 
          CIRCLE_TWO: {
            x: x2.toString(),
            y: y2.toString()
          },
          LENGTH: action.new_length.LENGTH
        });
      } else if (y2 < y1 && x2 < x1) {
        theta = Math.asin((y2 - y1)/old_length);
        x2 = (x1 - new_length*Math.cos(theta) - 75);
        y2 = (new_length*Math.sin(theta) + y1 - 75);
        new_state = Object.assign({}, state, { 
          CIRCLE_TWO: {
            x: parseInt(x2.toString()),
            y: parseInt(y2.toString())
          },
          LENGTH: action.new_length.LENGTH
        });
      }
      else {
        theta = Math.asin((y2 - y1)/old_length);
        x2 = (new_length*Math.cos(theta) + x1 - 75);
        y2 = (new_length*Math.sin(theta) + y1 - 75);
        new_state = Object.assign({}, state, { 
          CIRCLE_TWO: {
            x: parseInt(x2.toString()),
            y: parseInt(y2.toString())
          },
          LENGTH: action.new_length.LENGTH
        });
      }
      return new_state;
    default:
      return state;
  }
};

const initialState = {
  CIRCLE_ONE: {
    x: "100",
    y: "10",
  },
  CIRCLE_TWO: {
    x: "400",
    y: "10",
  },
  LENGTH: "300"
};

function App() {
  const [state, dispatch] = useReducer(circlesReducer, initialState);

  useEffect(() => {
    const state = JSON.parse(localStorage.getItem("state"));

    if (state) {
      dispatch({ type: "POPULATE_STATE", state });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <CirclesContext.Provider value={{ state, dispatch }}>
      <Circle id="CIRCLE_ONE" />
      <Circle id="CIRCLE_TWO" />
      <Line id="LINE" />
    </CirclesContext.Provider>
  );
}

export default App;
