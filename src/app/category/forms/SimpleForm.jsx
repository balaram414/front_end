import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { IconButton } from '@material-ui/core';

import { SearchOutlined } from '@material-ui/icons';
import {
  Button,
  Select,
  FormControlLabel,
  Grid,
  Icon,
  InputLabel,
  FormControl,
  MenuItem,
  styled,
} from '@mui/material';
import { Span } from 'app/components/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const SimpleForm = (props) => {
  const [state, setState] = useState({ date: new Date() });
  const [file, setFile] = useState();
  const [file1, setFile1] = useState();
  const [categoryType, setCategoryType] = useState();
  const { name, description } = state;
  const handleSubmit = (event) => {
    if (name != '' && description != '' && categoryType != '') {
      if (!file1) {
        alert('please select image');
        return;
      }
      const formData = new FormData();
      formData.append('image', file1);
      axios
        .post(
          `http://localhost:3010/api/category/${name}/${description}/${categoryType}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then((response) => {
          alert(JSON.stringify(response.data.messagae));
          setState({ name: '' });
          props.pageLoad('reload');
          setState({ description: '' });
        });
    } else {
      alert('Please fill Elements Properly....');
      return;
    }
    // console.log(event);
  };
  function handleChangeUpload(e) {
    setFile1(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const ChangeCategoryType = (event) => {
    //event.persist();
    setCategoryType(event.target.value);
  };

  const handleDateChange = (date) => setState({ ...state, date });

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="name"
              label="Category Name"
              onChange={handleChange}
              value={name || ''}
              // validators={['required', 'minStringLength: 4', 'maxStringLength: 20']}
              // errorMessages={[
              //   'this field is required',
              //   'Minimum 4 Character',
              //   'Maximum 20 Character',
              // ]}
            />
            <FormControl sx={{ m: 1, minWidth: 470 }} style={{ marginLeft: 0, width: 0 }}>
              <InputLabel id="demo-simple-select-helper-label">Category Type</InputLabel>
              <Select
                name="categoryType"
                labelId="demo-simple-select-helper-label"
                label="Category Type"
                onChange={ChangeCategoryType}
              >
                <MenuItem value="SWC">Size, Weight,Color</MenuItem>
                <MenuItem value="SW">Size, Weight</MenuItem>
                <MenuItem value="CW">Color, Weight</MenuItem>
                <MenuItem value="SC">Size, Color</MenuItem>
                <MenuItem value="S">Size</MenuItem>
                <MenuItem value="W">Weight</MenuItem>
                <MenuItem value="C">Color</MenuItem>
              </Select>
            </FormControl>
            <textarea
              sx={{ mb: 4 }}
              style={{ marginLeft: 0, width: 470 }}
              rows="6"
              cols="60"
              placeholder="Describe aboute Category"
              type="text"
              name="description"
              label="Describe aboute Category"
              onChange={handleChange}
              value={description || ''}
              errorMessages={[
                'this field is required',
                'this field is required minimum 5 Character',
              ]}
              validators={['required', 'minStringLength:5', 'maxStringLength: 300']}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <input type="file" name="file" onChange={handleChangeUpload} />
            <div>
              <img src={file} style={{ width: 450, height: 200 }} />
            </div>
          </Grid>
        </Grid>

        <Button
          color="primary"
          variant="contained"
          type="submit"
          style={{ marginLeft: 856, marginBottom: 30 }}
        >
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
