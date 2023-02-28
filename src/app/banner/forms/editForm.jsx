import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Grid,
  Select,
  Icon,
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

const EditForm = (props) => {
  const [state, setState] = useState({ date: new Date() });
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [file, setFile] = useState(props.imageUrl);
  const [file1, setFile1] = useState();

  const handleChange1 = (event) => {
    setName(event.target.value);
  };
  const handleChange2 = (event) => {
    setDescription(event.target.value);
  };
  function handleChangeUpload(e) {
    setFile1(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const goBack = (event) => {
    props.chooseMessage('home', {});
  };
  const handleSubmit = (event) => {
    if (name != '' && description != '') {
      if (!file1) {
        axios
          .put(`http://localhost:3010/api/banner/${props.id}/${name}/${description}`)
          .then((response) => {
            if (response.data.isSuccess) alert('Update successfully');
            else alert('Update not successfully:');
            props.chooseMessage('home', {});
          });
      } else {
        const formData = new FormData();
        formData.append('image', file1);
        axios
          .put(
            `http://localhost:3010/api/banner/withImage/${props.id}/${name}/${description}`,
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          )
          .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data.isSuccess) alert('Update successfully');
            else alert('Update not successfully:');
            props.chooseMessage('home', {});
          });
      }
    } else {
      alert('Please fill Elements Properly....');
    }
  };

  const handleDateChange = (date) => setState({ ...state, date });

  return (
    <div>
      {' '}
      <Button
        color="primary"
        onClick={goBack}
        variant="contained"
        type="submit"
        style={{ marginRight: 70, marginBottom: 30 }}
      >
        {/* <Icon>send</Icon> */}
        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Back</Span>
      </Button>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} noValidate={true}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="merchantName"
              value={name || ''}
              label="Category Name"
              onChange={handleChange1}
              validators={['required', 'minStringLength: 4', 'maxStringLength: 50']}
              errorMessages={['this field is required', 'minStringLength:4', 'maxStringLength: 50']}
            />
            <textarea
              sx={{ mb: 4 }}
              rows="6"
              cols="60"
              placeholder="Describe aboute Category"
              type="text"
              name="description"
              label="Describe aboute Category"
              onChange={handleChange2}
              style={{ marginLeft: 0, width: 470 }}
              value={description || ''}
              errorMessages={[
                'this field is required',
                'this field is required minimum 5 Character',
              ]}
              validators={[
                'required',
                'Minimum Character Length:5',
                'Maximum Character Length: 300',
              ]}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={54} sx={{ mt: 2 }} >
            <input type="file" name="file" onChange={handleChangeUpload} />
            <div>
              <img src={file} style={{ width: 470, height: 200 }} />
            </div>
          </Grid>
        </Grid>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          type="submit"
          style={{ marginLeft: 885 }}
        >
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Update</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default EditForm;
