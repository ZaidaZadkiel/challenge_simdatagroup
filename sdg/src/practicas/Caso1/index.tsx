import { FormEventHandler, useState } from 'react';
import Layout from './Layout'
import {SignupSteps, SignupUserData} from './Caso1'

const Caso1 = ()=>{
  const [userdata, setuserdata] = useState<SignupUserData>({});

  const [currentStep, setCurrentStep] = useState(0);

  const handleformdata: FormEventHandler<HTMLFormElement | HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  )=>{
    console.log(event)
    setuserdata({
      ...userdata,
      [event.target.name]: event.target.value
    });
  }

  const handleformsubmit = (
    event: React.FormEvent
  )=>{
    event.preventDefault()
    console.log(userdata, event)
    if(currentStep < SignupSteps.length){
      console.log('ok')
      setCurrentStep(currentStep+1)
    }

    switch(currentStep){
      case 0:

    }
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