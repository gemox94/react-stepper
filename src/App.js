import React, { useReducer, useState } from 'react';
import Stepper from './Stepper';

const reducerNextStep = (state, action) => {
  switch (action.type) {
    case 'step-1':
      return { ...state, ...action.payload };

    case 'step-1-remove': {
      const { step1, ...left } = state;
      return left;
    }

    case 'step-2':
      return { ...state, ...action.payload };

    case 'step-2-remove': {
      const { step2, ...left } = state;
      return left;
    }

    case 'step-3':
      return { ...state, ...action.payload };

    case 'step-3-remove': {
      const { step3, ...left } = state;
      return left;
    }

    default:
      return {...state};
  }
};

const App = () => {

  const [stepperData, dispatchNextStep] = useReducer(reducerNextStep, {});
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { indicator: 1, title: 'Paso 1'},
    { indicator: 2, title: 'Paso 2'},
    { indicator: 3, title: 'Paso 3'},
  ];

  const handleNextStep = (data = null) => {


    switch (activeStep) {

      case 0:
        dispatchNextStep({ type: 'step-1', payload: data });
        break;

      case 1:
        dispatchNextStep({ type: 'step-2', payload: data });
        break;

      case 2:
        dispatchNextStep({ type: 'step-3', payload: data });
        break;
    }

    const nextStep = activeStep + 1;
    if (nextStep < steps.length) {
      setActiveStep(nextStep);
    }
  };


  const handlePreviousStep = () => {

    switch (activeStep) {

      case 2:
        dispatchNextStep({ type: 'step-3-remove' });
        break;

      case 1:
        dispatchNextStep({ type: 'step-2-remove' });
        break;

      case 0:
        dispatchNextStep({ type: 'step-1-remove' });
        break;
    }

    const previousStep = activeStep - 1;
    if (previousStep >= 0) {
      setActiveStep(previousStep);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 py-3">
          <Stepper steps={steps} activeStep={activeStep}/>
          <br/>
          { activeStep === 0 && (
              <div className="row">
                <div className="col">
                  <h4>Paso 1</h4>
                  <button className="btn btn-warning" onClick={handlePreviousStep}>
                    Atras
                  </button>
                  <button className="btn btn-primary" onClick={() => handleNextStep({ step1: 'Some 1 data' })}>
                    Siguiente
                  </button>
                </div>
              </div>
          )}

          { activeStep === 1 && (
              <div className="row">
                <div className="col">
                  <h4>Paso 2</h4>
                  <button className="btn btn-warning" onClick={handlePreviousStep}>
                    Atras
                  </button>
                  <button className="btn btn-primary" onClick={() => handleNextStep({ step2: 'Step 2 data' })}>
                    Siguiente
                  </button>
                </div>
              </div>
          )}

          { activeStep === 2 && (
              <div className="row">
                <div className="col">
                  <h4>Paso 3</h4>
                  <button className="btn btn-warning" onClick={handlePreviousStep}>
                    Atras
                  </button>
                  <button className="btn btn-primary" onClick={() => handleNextStep({ step3: 'Step 3 data' })}>
                    Complete
                  </button>
                </div>
              </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col">
          <pre>
            {JSON.stringify(stepperData, null, 4)}
          </pre>
        </div>
      </div>

    </div>
  );
}

export default App;
