import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { ApiService } from '../services/api.service';

export default function DeleteProductorModal(props: any) {
  const api = new ApiService();


  return (
    <React.Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            
            await api.deleteProdutor(props.productorId)

            props.handleClose();
            props.handleUpdateProductors();

          },
        }}
      >
        <DialogTitle>Deletar Produtor</DialogTitle>
        <DialogContent>
          <>Deseja Deletar o Produtor?</>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancelar</Button>
          <Button type="submit">Deletar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
