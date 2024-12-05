import * as React from 'react';
import { TabPanel } from './TabPanel';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { Produtor } from '../interfaces';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Delete from '@mui/icons-material/Delete';
import { Box, Divider, Fab } from '@mui/material';
import CreateProdutorModal from './CreateProdutorModal';
import DeleteProductorModal from './DeleteProdutorModal';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface PropsData {
  produtores: Produtor[];
  value: number;
  index: number;
  handleUpdateProductors: () => {};
}

export function ProductorsList(props: PropsData) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [productorToDelete, setProductorToDelete] = React.useState('');
  const [selectedProductor, setSelectedProductor] = React.useState({});

  const emptyProductor = {
    name: '',
    city: '',
    state: '',
    document: '',
    farmName: '',
    totalArea: 0,
    agricultureArea: 0,
    vegetationArea: 0,
    cultures: [],
  };

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteProductor = (productorId: string) => {
    setProductorToDelete(productorId);
    setIsDeleteModalOpen(true);
  };

  const headerItens = [
    'CPF/CNPJ',
    'Nome',
    'Nome da Fazenda',
    'Cidade',
    'Estado',
    'Área Total',
    'Área de Agricultura',
    'Área de Vegetação',
    'Culturas',
    'Ações',
  ];

  return (
    <TabPanel
      value={props.value}
      index={props.index}
      // style={{ minHeight: '100vh' }}
    >
      <TableContainer component={Paper} sx={{ maxHeight: '530px' }}>
        <Table
          stickyHeader
          sx={{ minWidth: 700 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {headerItens.map((item: string) => (
                <StyledTableCell align="center">{item}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {props.produtores.length === 0 &&
                headerItens.map((item) => (
                  <StyledTableCell align="center">{'-'}</StyledTableCell>
                ))}
            </>

            {props.produtores.map((productor: any) => (
              <StyledTableRow key={productor.id}>
                {Object.keys(productor).map((key: string) => {
                  if (key === 'cultures') {
                    return (
                      <StyledTableCell align="center">
                        {productor.cultures
                          .map((item: any) => item.name)
                          .join(',')}
                      </StyledTableCell>
                    );
                  } else if (key !== 'id') {
                    return (
                      <StyledTableCell align="center">
                        {productor[key]}
                      </StyledTableCell>
                    );
                  }
                })}
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      color: 'text.secondary',
                      justifyContent: 'space-around',
                      cursor: 'pointer',
                      '& svg': {
                        m: 1,
                      },
                    }}
                  >
                    <Edit
                      onClick={() => {
                        setSelectedProductor(productor);
                        handleClickOpen();
                      }}
                    />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Delete
                      onClick={() => handleDeleteProductor(productor.id || '')}
                    />
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        size="small"
        color="secondary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: '16px', right: '16px' }}
        onClick={() => {
          setSelectedProductor(emptyProductor);
          setIsModalOpen(true);
        }}
      >
        <Add />
      </Fab>
      <CreateProdutorModal
        initialProdutor={selectedProductor}
        isOpen={isModalOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        handleUpdateProductors={props.handleUpdateProductors}
      />

      <DeleteProductorModal
        isOpen={isDeleteModalOpen}
        handleClickOpen={() => {
          setIsDeleteModalOpen(true);
        }}
        handleClose={() => {
          setIsDeleteModalOpen(false);
        }}
        productorId={productorToDelete}
        handleUpdateProductors={props.handleUpdateProductors}
      />
    </TabPanel>
  );
}
