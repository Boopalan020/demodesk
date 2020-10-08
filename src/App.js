import React from 'react';
// import VechInfoComponent from './propcomponent/VechInfoComponent';
import FieldArrayComponent from './components/FieldArrayComponent'
import MemoTableComponent from './components/MemoTableComponent';
import StepperComponent from './components/StepperComponent'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/field' component = { FieldArrayComponent } />
          <Route path='/stepper' component = { StepperComponent } />
          <Route path='/memotable' component = { MemoTableComponent } />
        </Switch>
      </Router>
      {/* <h1>Step : 3</h1>
      <MemoTableComponent /> */}
    </div>
  );
}

export default App;
