import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ReactNode, FunctionComponent } from "react";

export interface InformationProps {
  information: {
    title: string;
    content: ReactNode;
  },
  open: boolean,
  onClose: CallableFunction
}

const Information: FunctionComponent<InformationProps> = (
  {
    information={
      title:"default", 
      content:<div>default</div>
    }, 
    open, 
    onClose
  }: InformationProps
) => {
  return (
<Dialog 
  open={open}
  onClose={()=>onClose()}
  scroll="paper"
  aria-labelledby="scroll-dialog-title"
  aria-describedby="scroll-dialog-description"
>
  <DialogTitle id="scroll-dialog-title">Descripción del caso</DialogTitle>
      <DialogContent dividers={true}>
          <DialogContentText>
              <h4>{information.title}</h4>
              {information.content}
          </DialogContentText>
      </DialogContent>
  <DialogActions>
      <Button variant="contained" onClick={()=>onClose()}>Cerrar</Button>
  </DialogActions>
  </Dialog>
  );
}


export default Information;