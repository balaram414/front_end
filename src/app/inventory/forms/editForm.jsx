import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Button,
  Grid,
  Icon,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
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
  const [merchantId, setMerchantId] = useState(props.merchantId);
  const [prodId, setProdId] = useState(props.prodId);
  const [prodoptions, setProdoptions] = useState();
  const [meroptions, setMeroptions] = useState();
  const [file1, setFile1] = useState();
  const [file, setFile] = useState(props.imageUrl);
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [color, setColor] = useState(props.color);
  const [size, setSize] = useState(props.size);
  const [weight, setWeight] = useState(props.weight);
  const [packageInfo, setPackageInfo] = useState(props.packageInfo);
  const [genericName, setGenericName] = useState(props.genericName);
  const [productManufacture, setProductManufacture] = useState(props.productManufacture);
  const [ingredientInfo, setIngredientInfo] = useState(props.ingredientInfo);
  const [storageInfo, setStorageInfo] = useState(props.storageInfo);
  const [quantity, setQuantity] = useState(props.quantity);
  const [buyPrice, setBuyPrice] = useState(props.buyPrice);
  const [sellingPrice, setSellingPrice] = useState(props.sellingPrice);

  const handleSubmit = (event) => {
    if (
      merchantId != '' &&
      prodId != '' &&
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
    )
      if (!file1) {
        axios
          .put(
            `http://localhost:3005/api/inventory/${props.id}/${merchantId}/${weight}/${size}/${color}/${quantity}/${prodId}/${sellingPrice}/${buyPrice}/${packageInfo}/${storageInfo}/${genericName}/${ingredientInfo}/${productManufacture}`
          )
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
            `http://localhost:3005/api/inventory/withImage/${props.id}/${merchantId}/${weight}/${size}/${color}/${quantity}/${prodId}/${sellingPrice}/${buyPrice}/${packageInfo}/${storageInfo}/${genericName}/${ingredientInfo}/${productManufacture}`,
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
  };

  useEffect(() => {
    axios.get(`http://localhost:3009/api/product`).then((response) => {
      setProdoptions(
        response.data.data.length > 0 &&
          response.data.data.map((item, i) => {
            let value = item._id + '_' + item.name;
            return (
              <MenuItem key={i} value={value}>
                {item.name}
              </MenuItem>
            );
          })
      );
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3006/api/merchants/`).then((response) => {
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

  const MerchantSelect = (event) => {
    setMerchantId(event.target.value);
  };
  const productSelect = (event) => {
    setProdId(event.target.value);
  };

  function handleChangeUpload(e) {
    setFile1(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleChangeIngredientInfo = (event) => {
    event.persist();
    setIngredientInfo(event.target.value);
  };
  const handleChangeGenericName = (event) => {
    event.persist();
    setGenericName(event.target.value);
  };
  const handleChangeProductManufacture = (event) => {
    event.persist();
    setProductManufacture(event.target.value);
  };
  const handleChangeStorageInfo = (event) => {
    event.persist();
    setStorageInfo(event.target.value);
  };
  const handleChangeQuentity = (event) => {
    event.persist();
    setQuantity(event.target.value);
  };
  const handleChangeWeight = (event) => {
    event.persist();
    setWeight(event.target.value);
  };
  const handleChangeBuyPrice = (event) => {
    event.persist();
    setBuyPrice(event.target.value);
  };
  const handleChangeSellingPrice = (event) => {
    event.persist();
    setSellingPrice(event.target.value);
  };
  const handleChangeColor = (event) => {
    event.persist();
    setColor(event.target.value);
  };
  const handleChangePackageInfo = (event) => {
    event.persist();
    setPackageInfo(event.target.value);
  };

  const goBack = (event) => {
    props.chooseMessage('home', {});
  };
  return (
    <div>
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
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 470 }} style={{ marginLeft: 0 }}>
              <InputLabel id="demo-simple-select-helper-label">Marchent Id</InputLabel>
              <Select
                name="merchantId"
                labelId="demo-simple-select-helper-label"
                label="Merchant Id"
                onChange={MerchantSelect}
                defaultValue={props.merchantId}
              >
                {meroptions}
              </Select>
            </FormControl>
            <TextField
              type="number"
              name="quantity"
              label="Quantity of Product"
              onChange={handleChangeQuentity}
              value={quantity || ''}
              // validators={['required', 'maxStringLength: 20']}
              // errorMessages={['this field is required', 'max digit 20']}
            />
            <TextField
              type="number"
              name="buyPrice"
              label="Buy Price of Product"
              value={buyPrice || ''}
              onChange={handleChangeBuyPrice}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="number"
              name="sellingPrice"
              label="selling price of Product"
              onChange={handleChangeSellingPrice}
              value={sellingPrice || ''}
              // errorMessages={['this field is required', 'max digits 10']}
              // validators={['required', 'maxStringLength: 10']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="packageInfo"
              label="package Information of Product"
              onChange={handleChangePackageInfo}
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
              name="color"
              label="Color Name"
              onChange={handleChangeColor}
              value={color || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:3', 'maxStringLength: 10']}
            />
            <input type="file" name="file" onChange={handleChangeUpload} />
            <div style={{ width: 500, height: 150 }}>
              <img src={file} style={{ width: 500, height: 200 }} />
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 470 }} style={{ marginLeft: 0 }}>
              <InputLabel id="demo-simple-select-helper-label">Product Name</InputLabel>
              <Select
                name="productId"
                labelId="demo-simple-select-helper-label"
                label="Product Name"
                onChange={productSelect}
                defaultValue={props.prodId}
              >
                {prodoptions}
              </Select>
            </FormControl>
            <TextField
              type="number"
              name="weight"
              value={weight || ''}
              label="Weight in Grams of Product"
              onChange={handleChangeWeight}
              validators={['required', 'minStringLength: 2', 'maxStringLength: 20']}
              errorMessages={['this field is required', 'minStringLength:2', 'maxStringLength: 20']}
            />

            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="ingredientInfo"
              label="Ingedient information"
              onChange={handleChangeIngredientInfo}
              value={ingredientInfo || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:3', 'maxStringLength: 50']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="genericName"
              label="Generic name of product"
              onChange={handleChangeGenericName}
              value={genericName || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:3', 'maxStringLength: 30']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="productManufacture"
              label="Manufacture of Product"
              onChange={handleChangeProductManufacture}
              value={productManufacture || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:3', 'maxStringLength: 70']}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="storageInfo"
              label="Storage Instruction"
              onChange={handleChangeStorageInfo}
              value={storageInfo || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:3', 'maxStringLength: 70']}
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit" style={{ marginLeft: 870 }}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Update</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default EditForm;
