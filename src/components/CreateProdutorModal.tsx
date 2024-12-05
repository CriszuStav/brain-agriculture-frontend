import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { TagInputInsideField } from './TagInput';
import { Culture, Produtor } from '../interfaces';
import React, { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { ApiService } from '../services/api.service';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';

const getEstados = async () => {
  const response = await fetch('https://brasilapi.com.br/api/ibge/uf/v1');
  return await response.json();
};

export default function ProdutorModal(props: any) {
  const [estados, setEstados] = useState([]);
  const api = new ApiService();
  const [produtor, setProdutor] = useState<Produtor>({
    name: '',
    city: '',
    state: '',
    document: '',
    farmName: '',
    totalArea: 0,
    agricultureArea: 0,
    vegetationArea: 0,
    cultures: [],
  });

  // Configura o estado inicial no modo de edição
  useEffect(() => {
    if (props.initialProdutor) {
      setProdutor(props.initialProdutor);
    }
  }, [props.initialProdutor]);

  const handleFormChange = (key: string, value: string | number) => {
    setProdutor({ ...produtor, [key]: value });
  };

  const handleCulturesChange = (newCultures: Culture[]) => {
    setProdutor({ ...produtor, cultures: newCultures });
  };

  useEffect(() => {
    (async () => {
      const data = await getEstados();
      setEstados(data);
    })();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Decide se é cadastro ou edição
    const response = produtor?.id
      ? await api.updateProdutor(produtor?.id || '', produtor) // Atualiza
      : await api.createProdutor(produtor); // Cadastra

    if (response.status === 201 || response.status === 200) {
      props.handleClose();
      props.handleUpdateProductors();
    }
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>
        {props.initialProdutor ? 'Editar Produtor' : 'Cadastrar Produtor'}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Nome"
          type="text"
          fullWidth
          variant="standard"
          value={produtor.name}
          onChange={(event) => handleFormChange('name', event.target.value)}
        />
        <TextField
          required
          margin="dense"
          label="Nome da fazenda"
          type="text"
          fullWidth
          variant="standard"
          value={produtor.farmName}
          onChange={(event) => handleFormChange('farmName', event.target.value)}
        />
        <TextField
          required
          margin="dense"
          label="CPF/CNPJ"
          type="text"
          fullWidth
          variant="standard"
          value={produtor.document}
          onChange={(event) => handleFormChange('document', event.target.value)}
        />
        <TextField
          required
          margin="dense"
          label="Cidade"
          type="text"
          fullWidth
          variant="standard"
          value={produtor.city}
          onChange={(event) => handleFormChange('city', event.target.value)}
        />
        <FormControl size="medium" fullWidth margin="dense" >
          <InputLabel>Estado</InputLabel>
          <Select
            value={produtor.state}
            onChange={(event: SelectChangeEvent) =>
              handleFormChange('state', event.target.value)
            }
          >
            {estados.map((estado: any) => (
              <MenuItem key={estado.sigla} value={estado.sigla}>
                {estado.sigla}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          required
          margin="dense"
          label="Área total"
          type="number"
          fullWidth
          variant="standard"
          value={produtor.totalArea}
          onChange={(event) =>
            handleFormChange('totalArea', parseInt(event.target.value, 10))
          }
        />
        <TextField
          required
          margin="dense"
          label="Área de Agricultura"
          type="number"
          fullWidth
          variant="standard"
          value={produtor.agricultureArea}
          onChange={(event) =>
            handleFormChange(
              'agricultureArea',
              parseInt(event.target.value, 10)
            )
          }
        />
        <TextField
          required
          margin="dense"
          label="Área de Vegetação"
          type="number"
          fullWidth
          variant="standard"
          value={produtor.vegetationArea}
          onChange={(event) =>
            handleFormChange('vegetationArea', parseInt(event.target.value, 10))
          }
        />
        <TagInputInsideField
          cultures={produtor.cultures}
          handleCulturesChange={handleCulturesChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancelar</Button>
        <Button type="submit">
          {props.initialProdutor ? 'Salvar' : 'Cadastrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
