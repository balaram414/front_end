import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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

const EditForm = (props) => {
  const [state, setState] = useState({ date: new Date() });
  const [customerAddress, setCustomerAddress] = useState(props.customerAddress);
  const [customerId, setCustomerId] = useState(props.customerId);
  const [prodoptions, setProdoptions] = useState();
  const [productId, setProductId] = useState(props.productId);
  const [quentity, setQuentity] = useState(props.quentity);
  const [purchesDate, setPurchesDate] = useState();

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
  const handleSubmit = (event) => {
    if (
      customerAddress != '' &&
      productId != '' &&
      quentity != '' &&
      purchesDate != '' &&
      customerId != ''
    ) {
      axios
        .put(`http://localhost:3001/api/order/:${props.id}`, {
          customerId,
          customerAddress,
          productId,
          quentity,
          purchesDate,
        })
        .then((response) => {
          alert(JSON.stringify(response.data.messagae));
        });
    } else {
      alert('Please fill Elements Properly....');
    }
    // console.log(event);
  };
  const productHandleChange = (e) => {
    setProductId(e.target.value);
  };
  const quentityHandleChange = (e) => {
    setQuentity(e.target.value);
  };
  const customerIdHandleChange = (e) => {
    setCustomerId(e.target.value);
  };
  const customerAddressHandleChange = (e) => {
    setCustomerAddress(e.target.value);
  };

  const goBack = (event) => {
    props.chooseMessage('home', {});
  };
  const handleDateChange = (date) => setState({ ...state, date });

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
            <FormControl sx={{ m: 1, minWidth: 510 }} style={{ marginLeft: 0 }}>
              <InputLabel id="demo-simple-select-helper-label">Product Name</InputLabel>
              <Select
                name="productId"
                labelId="demo-simple-select-helper-label"
                label="Product Name"
                onChange={productHandleChange}
                defaultValue={props.productId}
              >
                {prodoptions}
              </Select>
            </FormControl>
            <TextField
              type="text"
              name="quentity"
              label="Quentity "
              onChange={quentityHandleChange}
              value={quentity || ''}
              validators={['required', 'minStringLength: 4', 'maxStringLength: 20']}
              errorMessages={[
                'this field is required',
                'Minimum 4 Character',
                'Maximum 20 Character',
              ]}
            />
            <TextField
              type="text"
              name="customerId"
              label="customer Id "
              onChange={customerIdHandleChange}
              value={customerId || ''}
              validators={['required', 'minStringLength: 4', 'maxStringLength: 20']}
              errorMessages={[
                'this field is required',
                'Minimum 4 Character',
                'Maximum 20 Character',
              ]}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={purchesDate}
                onChange={handleDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Purches Date"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: '100%' }}
                  />
                )}
              />
            </LocalizationProvider>
            <textarea
              sx={{ mb: 4 }}
              rows="6"
              cols="63"
              placeholder="Customer address"
              type="text"
              name="custAddress"
              label="Customer address"
              onChange={customerAddressHandleChange}
              value={customerAddress || ''}
              errorMessages={[
                'this field is required',
                'this field is required minimum 5 Character',
              ]}
              validators={['required', 'minStringLength:5', 'maxStringLength: 300']}
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

export default EditForm;
