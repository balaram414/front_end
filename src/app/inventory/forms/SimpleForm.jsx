import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Button,
  Grid,
  Icon,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Fab,
  styled,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Span } from 'app/components/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { setQuarter } from 'date-fns/esm';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const SimpleForm = () => {
  const [state, setState] = useState({ date: new Date() });
  const [merchantId, setMerchantId] = useState();
  const [categoryId, setCategoryId] = useState();
  const [prodId, setProdId] = useState();
  const [catoptions, setCatoptions] = useState();
  const [prodoptions, setProdoptions] = useState();
  const [meroptions, setMeroptions] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file, setFile] = useState();
  const {
    color,
    size,
    weight,
    packageInfo,
    genericName,
    productManufacture,
    ingredientInfo,
    storageInfo,
    quantity,
    buyPrice,
    sellingPrice,
  } = state;

  const handleSubmit = (event) => {
    if (
      merchantId != '' &&
      prodId != '' &&
      categoryId != '' &&
      color != '' &&
      weight != '' &&
      size != '' &&
      quantity != '' &&
      buyPrice != '' &&
      sellingPrice != '' &&
      packageInfo != '' &&
      genericName != '' &&
      ingredientInfo != '' &&
      productManufacture != '' &&
      storageInfo != ''
    ) {
      if (!file1) {
        alert('please select image');
        return;
      }
      const formData = new FormData();
      formData.append('image', file1);
      axios
        .post(
          `http://localhost:3005/api/inventory/${merchantId}/${weight}/${size}/${color}/${quantity}/${prodId}/${sellingPrice}/${buyPrice}/${packageInfo}/${storageInfo}/${genericName}/${ingredientInfo}/${productManufacture}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then((response) => {
          alert(JSON.stringify(response.data.data));
          //setMerchantId(''), setCategoryId(''), setProdId('');
        });
    } else {
      alert('Please fill Elements Properly....');
    }
    // console.log(event);
  };

  useEffect(() => {
    axios.get(`http://localhost:3009/api/product`).then((response) => {
      setProdoptions(
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
  useEffect(() => {
    axios.get(`http://localhost:3001/api/merchants/`).then((response) => {
      setMeroptions(
        response.data.data.length > 0 &&
          response.data.data.map((item, i) => {
            let value = item._id + '_' + item.merchantName;
            return (
              <MenuItem key={i} value={value}>
                {item.merchantName}
              </MenuItem>
            );
          })
      );
    });
  }, []);

  const handleChangeSeclect2 = (event) => {
    setMerchantId(event.target.value);
  };
  const handleChangeSeclect3 = (event) => {
    setProdId(event.target.value);
  };
  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
  };

  function handleChangeUpload(e) {
    setFile1(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 465 }} style={{ marginLeft: 0 }}>
              <InputLabel id="demo-simple-select-helper-label">Marchent Id</InputLabel>
              <Select
                name="merchantId"
                labelId="demo-simple-select-helper-label"
                label="Merchant Id"
                onChange={handleChangeSeclect2}
              >
                {meroptions}
              </Select>
            </FormControl>
            <TextField
              type="number"
              name="quantity"
              label="Quantity of Product"
              onChange={handleChange}
              value={quantity || ''}
              validators={['required', 'minStringLength: 1', 'maxStringLength: 10']}
              errorMessages={['this field is required']}
            />
            <TextField
              type="number"
              name="buyPrice"
              label="Buy Price of Product"
              value={buyPrice || ''}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="number"
              name="sellingPrice"
              label="selling price of Product"
              onChange={handleChange}
              value={sellingPrice || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:1', 'maxStringLength: 10']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="color"
              label="Color Name"
              onChange={handleChange}
              value={color || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:3', 'maxStringLength: 10']}
            />

            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="size"
              label="size of Product"
              onChange={handleChange}
              value={size || ''}
              errorMessages={[
                'this field is required',
                'minStringLength: 3',
                'maxStringLength: 70',
              ]}
              validators={['required', 'minStringLength:3', 'maxStringLength: 20']}
            />
            <input type="file" multiple onChange={handleChangeUpload} />
            <div style={{ width: 500, height: 150 }}>
              <img src={file} style={{ width: 100, height: 120 }} />
              <img src={file2} style={{ width: 100, height: 120 }} />
              <img src={file3} style={{ width: 100, height: 120 }} />
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 465 }} style={{ marginLeft: 0 }}>
              <InputLabel id="demo-simple-select-helper-label">Product Name</InputLabel>
              <Select
                name="productId"
                labelId="demo-simple-select-helper-label"
                label="Product Name"
                onChange={handleChangeSeclect3}
              >
                {prodoptions}
              </Select>
            </FormControl>
            <TextField
              type="number"
              name="weight"
              value={weight || ''}
              label="Weight in Grams of Product"
              onChange={handleChange}
              validators={['required', 'minStringLength: 2', 'maxStringLength: 20']}
              errorMessages={['this field is required', 'minStringLength:2', 'maxStringLength: 20']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="packageInfo"
              label="package Information of Product"
              onChange={handleChange}
              value={packageInfo || ''}
              errorMessages={[
                'this field is required',
                'minStringLength: 3',
                'maxStringLength: 70',
              ]}
              validators={['required', 'minStringLength:3', 'maxStringLength: 20']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="ingredientInfo"
              label="Ingedient information"
              onChange={handleChange}
              value={ingredientInfo || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:3', 'maxStringLength: 50']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="genericName"
              label="Generic name of product"
              onChange={handleChange}
              value={genericName || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:3', 'maxStringLength: 30']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="productManufacture"
              label="Manufacture of Product"
              onChange={handleChange}
              value={productManufacture || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:3', 'maxStringLength: 70']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="storageInfo"
              label="Storage Instruction"
              onChange={handleChange}
              value={storageInfo || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:3', 'maxStringLength: 70']}
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit" style={{ marginLeft: 870 }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default SimpleForm;
