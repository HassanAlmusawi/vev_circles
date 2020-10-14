import React, { useContext } from 'react'
import { CirclesContext } from './App.js'
import useDraggableElement from './useDraggableElement.js'

const Circle = (props) => {
    const { state, dispatch } = useContext(CirclesContext);

    useDraggableElement(props.id, dispatch);

    return (
        <div 
          id={props.id} 
          className='circle' 
          style={{
            left: state[props.id].x + "px", 
            top: state[props.id].y + "px"
          }}
        >
            <span >
                X 
                <input 
                  type="number" 
                  id={"input_X" + props.id} 
                  className='input' 
                  value={state[props.id].x} 
                  onChange={(e) => dispatch({
                    type: props.id +'_UPDATE', 
                    new_position: {[props.id]: {x: e.target.value , y: state[props.id].y}}})}
                />
            </span>
            <span>
                Y 
                <input 
                  type="number" 
                  id={"input_Y" + props.id} className='input' 
                  value={state[props.id].y}
                  onChange={(e) => dispatch({
                    type: props.id +'_UPDATE', 
                    new_position: {[props.id]: {x: state[props.id].x , y: e.target.value}}})}
                />
            </span>
        </div>
    )
}

export { Circle as default }