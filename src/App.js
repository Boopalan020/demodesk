import React from 'react';
// import VechInfoComponent from './propcomponent/VechInfoComponent';
import FieldArrayComponent from './components/FieldArrayComponent'
import StepperComponent from './components/StepperComponent'

function App() {
  return (
    <div>
      <h1>Step 1 : </h1>
      <FieldArrayComponent />
      <h1>Step 2 : </h1>
      <StepperComponent />
      {/* <h3>Stepper 1 : vechicle info</h3>
      <VechInfoComponent /> */}
    </div>
  );
}

export default App;
