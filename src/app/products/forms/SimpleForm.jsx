import {
  Button,
  Grid,
  Icon,
  styled,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import { Span } from 'app/components/Typography';
import axios from 'axios';
import { Headers } from 'cross-fetch';
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
  const [name, setName] = useState();
  const [categoryId, setCategoryId] = useState();
  const [products, setProducts] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3001/api/category/`).then((response) => {
      setProducts(
        response.data.data.length > 0 &&
          response.data.data.map((item, i) => {
            return (
              <MenuItem key={i} value={item._id + '_' + item.name}>
                {item.name}
              </MenuItem>
            );
          })
      );
    });
  }, []);

  const handleSubmit = async (event) => {
    if (!file1) {
      alert('please select image');
      return;
    }
    if (categoryId == undefined) {
      alert('please select Category Id');
      return;
    }
    if (name != '' && description != '' && categoryId != '' && categoryId != undefined) {
      const formData = new FormData();
      formData.append('image', file1);
      try {
        axios
          .post(
            `http://localhost:3009/api/product/${name}/${description}/${categoryId}`,
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          )
          .then((data) => {
            alert(data.data.messagae);
            setName('');
            setFile('');
            setFile1('');
            setDescription('');
            setCategoryId('');
            props.pageLoad('reload');
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (ex) {
        console.log(ex);
      }
    } else {
      alert('please insert data all field');
      return;
    }
  };
  function handleChangeUpload(e) {
    setFile1(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  const handleChangeName = (event) => {
    event.persist();
    setName(event.target.value);
  };
  const handleChangeDescription = (event) => {
    event.persist();
    setDescription(event.target.value);
  };
  const handleChangeSeclect1 = (event) => {
    setCategoryId(event.target.value);
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
              label="Product Name"
              onChange={handleChangeName}
              value={name || ''}
              validators={['maxStringLength: 40']}
              errorMessages={['Maximum 40 Character']}
            />
            <input type="file" name="file" onChange={handleChangeUpload} />
            <div>
              <img src={file} style={{ width: 456, height: 200 }} />
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 450 }} style={{ marginLeft: 0 }}>
              <InputLabel id="demo-simple-select-helper-label">Category Id</InputLabel>
              <Select
                name="categoryId"
                labelId="demo-simple-select-helper-label"
                label="Category Id"
                onChange={handleChangeSeclect1}
              >
                {products}
              </Select>
            </FormControl>
            <textarea
              sx={{ mb: 4 }}
              rows="6"
              cols="60"
              placeholder="Describe aboute Product"
              type="text"
              style={{ marginLeft: 0, width: 455 }}
              name="description"
              label="Describe aboute Product"
              onChange={handleChangeDescription}
              value={description || ''}
              validators={['maxStringLength: 300']}
              errorMessages={['Maximum 300 Character']}
            />
          </Grid>
        </Grid>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          style={{ marginLeft: 870, marginBottom: 30 }}
        >
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
