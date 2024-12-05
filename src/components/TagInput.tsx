import React from 'react';
import { TextField, Autocomplete, Chip } from '@mui/material';
import { Culture } from '../interfaces';

interface TagInputInsideFieldProps {
  cultures: Culture[];
  handleCulturesChange: (newCultures: Culture[]) => void;
}

export const TagInputInsideField = (props: TagInputInsideFieldProps) => {
  return (
    <Autocomplete
      style={{marginTop: '10px'}}
      multiple
      freeSolo
      options={props.cultures} // Use as culturas selecionadas como opções
      value={props.cultures}
      onChange={(event, newValue) => {
        // Converte strings em objetos e mantém objetos existentes
        const formattedValue = newValue.map((item) =>
          typeof item === 'string' ? { name: item } : item
        );
        props.handleCulturesChange(formattedValue as Culture[]);
      }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      isOptionEqualToValue={(option, value) =>
        option.name === value.name
      } // Define como comparar objetos
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.name}
            {...getTagProps({ index })}
            key={index}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Culturas"
          placeholder="Press Enter to add"
        />
      )}
    />
  );
};
