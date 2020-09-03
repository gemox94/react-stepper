import React from 'react';
import './stepper.css';

const Step = ({ indicator, title, isCompleted, isActive }) => {
    return (
        <div className="col text-center">
            <div className={`stepNumber ${isActive ? 'activeStep' : ''} ${isCompleted ? 'completedStep' : ''}`}>
                {indicator}
            </div>
            <span>{title}</span>
        </div>
    );
};

const Stepper = ({ steps, activeStep }) => {

    return (
        <>
            <div className="row">
                {steps.map(({ indicator, title }, index) =>
                    <Step
                        key={index}
                        indicator={indicator}
                        title={title}
                        isActive={activeStep === index}
                        isCompleted={index < activeStep || (activeStep + 1) === steps.length}
                    />
                )}
            </div>
        </>
    )
};

export default Stepper;