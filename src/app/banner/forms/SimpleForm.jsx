import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const handleSubmit = (event) => {
    if (name != '' && description != '') {
      if (!file1) {
        alert('please select image');
        return;
      }
      const formData = new FormData();
      formData.append('image', file1);
      axios
        .post(`http://localhost:3010/api/banner/${name}/${description}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((response) => {
          alert(JSON.stringify(response.data.messagae));
          setName('');
          setState({ description: '' });
          props.pageLoad('reload');
        });
    } else {
      alert('Please fill Elements Properly....');
    }
  };

  function handleChangeUpload(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setFile1(e.target.files[0]);
  }
  const handleChangeName = (event) => {
    event.persist();
    setName(event.target.value);
  };
  const handleChangeDescription = (event) => {
    event.persist();
    setDescription(event.target.value);
  };
  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="name"
              label="Banner name"
              onChange={handleChangeName}
              value={name || ''}
              validators={['required', 'minStringLength: 4', 'maxStringLength: 30']}
              errorMessages={['this field is required']}
            />
            <textarea
              sx={{ mb: 4 }}
              rows="6"
              cols="60"
              placeholder="Describe aboute Banner"
              type="text"
              name="description"
              style={{ marginLeft: 0, width: 470 }}
              label="Describe aboute Banner"
              onChange={handleChangeDescription}
              value={description || ''}
              validators={[
                'required',
                'Minimum Character Length:5',
                'Maximum Character Length: 300',
              ]}
              errorMessages={['this field is required minimum 5 Character']}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <input type="file" multiple onChange={handleChangeUpload} />
            <div>
              <img src={file} style={{ width: 470, height: 200 }} />
            </div>
          </Grid>
        </Grid>

        <Button
          color="primary"
          variant="contained"
          type="submit"
          style={{ marginLeft: 885, marginTop: 10 }}
        >
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
