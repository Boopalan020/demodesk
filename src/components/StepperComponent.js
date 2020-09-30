import React from 'react'
import Stepper from 'react-js-stepper'
import { useState } from 'react'

// Commands to install required package
// npm install node-sass --save
// npm install react-js-stepper --save

// TOP MOST COMPONENT
const steps = [{title: ''}, {title: ''}, {title: ''}, {title: ''}, {title: ''}, {title: ''} , {title: ''} ]
function StepperComponent() {

    const [activeState, setActiveState] = useState(1)

    const handleOnClickNext = () => {
        setActiveState(activeState + 1)
    }

    const handleOnClickBack = () => {
        setActiveState(activeState - 1)
    }

    return (
        <div>
            <Steppers
                steps = {steps}
                activeState = { activeState }
                handleOnClickNext = { handleOnClickNext }
                handleOnClickBack = { handleOnClickBack }
            />

        <h3> Buttons Outside the Stepper Component </h3>
        <div style = {{marginTop : '40px'}}>
        <input type="button" value={activeState === steps.length ? 'Finish' : 'Next'} 
                        onClick={activeState === steps.length ? null : handleOnClickNext}/>
                {activeState ===1 ? '' : <input type="button" value="Back" onClick={handleOnClickBack} /> }
        </div>    
        </div>
    )
}
export default StepperComponent

// LOWER LEVEL COMPONENT
function Steppers({steps, activeState, handleOnClickNext, handleOnClickBack }) {
    return (
        <>
            <Stepper
                steps = {steps}
                activeStep = { activeState }
                showNumber = { true }
            />
            <h3> Buttons Inside the Stepper Component </h3>
            <div style = {{marginTop : '40px'}}>
            <input type="button" value={activeState === steps.length ? 'Finish' : 'Next'} 
                            onClick={activeState === steps.length ? null : handleOnClickNext}/>
                    {activeState ===1 ? '' : <input type="button" value="Back" onClick={handleOnClickBack} /> }
            </div>
        </> 

        
    )
}
