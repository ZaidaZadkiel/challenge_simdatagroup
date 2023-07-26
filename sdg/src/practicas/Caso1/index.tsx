import { FormEventHandler, useEffect, useState } from 'react';
import Layout from './Layout'
import {SignupSteps, SignupUserData} from './Caso1'

const Caso1 = ()=>{
  const [userdata,    setuserdata]    = useState<SignupUserData>({});
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(
    ()=>{
      if(currentStep>=SignupSteps.length){
        alert("Gracias!\nAhora el formulario se reiniciara.")
        setCurrentStep(0)
        setuserdata({})
        /* magic: just clean up the entire uncontrolled form */
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window['signupform'].reset();
      }
      if(currentStep<0) setCurrentStep(Math.min(Math.max(currentStep, 0), SignupSteps.length-1))
    }, 
    [currentStep]
  )

  const handleformdata: FormEventHandler<HTMLFormElement | HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  )=>{
    let target=event.target;
    setuserdata({
      ...userdata,
      [target.name]: target.value
    });
  }

  const handleformsubmit = (
    event: React.FormEvent
  )=>{
    console.log('flag');
    event.preventDefault()
    event.stopPropagation()

    /* magic: use aria-invalid to determine if 
      the form has errors from validation in the SignupSteps component */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let elements = Array.from(document.getElementById(`view-${currentStep}`)?.querySelectorAll('input[aria-invalid="true"]'));
    console.log({elements})
    if(elements?.length>0){
      console.log(elements)
      return false
    }

    console.log(userdata, event)

    if(currentStep < SignupSteps.length){
      console.log('ok')
      setCurrentStep(currentStep+1)
    }

    return false;
  }

  return <Layout 
    formdata={userdata} 
    currentStep={currentStep}
    setCurrentStep={setCurrentStep}
    handleformdata={handleformdata}
    handleformsubmit={handleformsubmit}
    SignupSteps={SignupSteps}
    
  />
}

export default Caso1