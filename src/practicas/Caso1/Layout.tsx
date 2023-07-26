import { Button, Grid, Step, StepButton, Stepper, useMediaQuery } from "@mui/material";
import { FormEventHandler } from "react";
import { FocusTrap } from '@mui/base';
import { SignupUserData } from "./Caso1";

export interface SignupProcessProps{
  currentStep: number,
  onChange:    Function,
  SignupSteps: LayoutProps['SignupSteps']
}

export interface LayoutProps{
  formdata:         SignupUserData;
  currentStep:      number,
  setCurrentStep:   Function,
  handleformdata:   FormEventHandler<HTMLFormElement | HTMLInputElement>,
  handleformsubmit: FormEventHandler<HTMLFormElement>,
  SignupSteps: {
    title:   string,
    content: React.ComponentType<{visible: boolean}>,
  }[],
}

const Layout: React.FunctionComponent<LayoutProps> = (
  {
    formdata, 
    currentStep,
    setCurrentStep,
    handleformdata,
    handleformsubmit,
    SignupSteps,
  }
) => {

  const SignupViews = SignupSteps.map(
    (step, index)=>(
      <Grid
        key={index}
        item
        style={{
          display: (index===currentStep) ? 'block' : 'none',
          gap: '2em',
        }}
      >
        <step.content visible={index===currentStep} />
      </Grid>
    )
  )

  return (
  <>
      <form id="signupform" onChange={handleformdata} onSubmit={handleformsubmit}>
        <FocusTrap open={true}>
        <Grid container direction={"column"} gap={2}>
          
          <Grid item >
            <SignupProcess currentStep={currentStep} onChange={setCurrentStep} SignupSteps={SignupSteps}/>
          </Grid>
          
          <Grid item sx={{minHeight:'40dvh'}}>
            {SignupViews}
          </Grid> 

          <Grid container columns={2}>
            <Grid item xs={1}>
              <Button
                variant="contained"
                type="button"
                onClick={()=>setCurrentStep(currentStep-1)}
                disabled={currentStep === 0}
              >Anterior</Button>
            </Grid>
            <Grid item xs={1} style={{textAlign: 'right'}}>
              <Button
                autoFocus
                variant="contained"
                type="submit"
              >
                {currentStep === SignupSteps.length-1
                  ? 'Enviar'
                  : 'Continuar'
                }
              </Button>
            </Grid>
          </Grid>

        </Grid>
        </FocusTrap>
      </form>
      {JSON.stringify(formdata)}
      {currentStep}
  </>
  );
}

const SignupProcess: React.FunctionComponent<SignupProcessProps> = (
  {
    currentStep=0,
    onChange,
    SignupSteps
  }
) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  return (
    <Stepper 
      nonLinear
      activeStep={currentStep} 
      alternativeLabel={(isSmallScreen)}
    >
      {SignupSteps.map(
        (step, index)=>
          <Step key={index} >
            <StepButton disableRipple onClick={()=>onChange(index)}>
              {step.title}
            </StepButton>
          </Step>
      )} 
    </Stepper>
  )
}

export default Layout;