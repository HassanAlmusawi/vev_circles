import React, { useContext } from "react";
import { CirclesContext } from "./App.js";

const Line = (props) => {
  const { state, dispatch } = useContext(CirclesContext);

  let x1 = (parseInt(state.CIRCLE_ONE.x) + 75).toString();
  let y1 = (parseInt(state.CIRCLE_ONE.y) + 75).toString();
  let x2 = (parseInt(state.CIRCLE_TWO.x) + 75).toString();
  let y2 = (parseInt(state.CIRCLE_TWO.y) + 75).toString();

  if(isNaN(x1)) {
    dispatch({
      type: 'CIRCLE_ONE_UPDATE', 
      new_position: {'CIRCLE_ONE': {x:  '0', y: state['CIRCLE_ONE'].y}}})
  } else if(isNaN(y1)) {
    dispatch({
      type: 'CIRCLE_ONE_UPDATE', 
      new_position: {'CIRCLE_ONE': {x:  state['CIRCLE_ONE'].x, y: '0'}}})
  } else if(isNaN(x2)) {
    dispatch({
      type: 'CIRCLE_TWO_UPDATE', 
      new_position: {'CIRCLE_TWO': {x: '0', y:  state['CIRCLE_TWO'].y}}})
  } else if(isNaN(y2)) {
    dispatch({
      type: 'CIRCLE_TWO_UPDATE', 
      new_position: {'CIRCLE_TWO': {x:  state['CIRCLE_TWO'].x, y: '0'}}})
  }

  let x = (parseInt(x1) + (parseInt(x2) - parseInt(x1)) / 2).toString();
  let y = (parseInt(y1) + (parseInt(y2) - parseInt(y1)) / 2).toString();

  const length_input = (e) => {
    e.preventDefault();
    dispatch({ type: "LENGTH", new_length: { LENGTH: e.target.value } });
  };

  return (
    <div id={props.id}>
      <svg>
        <line x1={x1} y1={y1} x2={x2} y2={y2} />
      </svg>
      <div className="input_box">
        <input
          id="input"
          className="input"
          type="number"
          style={ {left: x + "px", top: y + "px"} } 
          value={Math.round(state.LENGTH)} 
          onChange={length_input}
        />
      </div>
    </div>
  );
};

export { Line as default };
