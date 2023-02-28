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

const EditForm = (props) => {
  const [state, setState] = useState({ date: new Date() });
  const [gender, setGender] = useState(props.gender);
  const [merchantName, setMerchantName] = useState(props.merchantName);
  const [merchantId, setMerchantId] = useState(props.merchantId);
  const [phoneNo, setPhoneNo] = useState(props.phoneNo.toString());
  const [email, setEmail] = useState(props.email);
  const handleChange1 = (event) => {
    setMerchantName(event.target.value);
    console.log(merchantName);
  };
  const handleChange2 = (event) => {
    setMerchantId(event.target.value);
  };
  const handleChange4 = (event) => {
    setPhoneNo(event.target.value);
  };
  const handleChange5 = (event) => {
    setGender(event.target.value);
  };
  const goBack = (event) => {
    props.chooseMessage('home', {});
  };
  //const { username, merchantName, merchantId, phoneNo, gender, date, email, countryCode } = state;
  const handleSubmit = (event) => {
    if (
      merchantName != '' &&
      merchantId != '' &&
      merchantId.length == 10 &&
      phoneNo != '' &&
      phoneNo.length == 10 &&
      gender != ''
    ) {
      let res = axios
        .put(`http://localhost:3001/api/merchants/${props.id}`, {
          merchantName: merchantName,
          phoneNo: phoneNo,
          merchantId: merchantId,
          gender: gender,
        })
        .then((response) => {
          if (response.data.isSuccess) alert('Update successfully');
          else alert('Update not successfully:');
          //props.chooseMessage('home', {});
        });
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
        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Back</Span>
      </Button>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} noValidate={true}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="merchantName"
              value={merchantName || ''}
              label="Merchant Name"
              onChange={handleChange1}
              defaultValue={merchantName}
              validators={['required', 'minStringLength: 4', 'maxStringLength: 50']}
              errorMessages={['this field is required', 'minStringLength:4', 'maxStringLength: 50']}
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              disabled
              defaultValue={email || ''}
            />
            <RadioGroup row sx={{ mb: 2 }} value={gender || ''}>
              <FormControlLabel
                value="Male"
                label="Male"
                name="gender"
                checked={gender === 'Male'}
                onChange={handleChange5}
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Female"
                label="Female"
                name="gender"
                checked={gender === 'Female'}
                onChange={handleChange5}
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Others"
                label="Others"
                name="gender"
                checked={gender === 'Others'}
                onChange={handleChange5}
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />
            </RadioGroup>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="number"
              name="phoneNo"
              value={phoneNo || ''}
              label="Mobile Nubmer"
              onChange={handleChange4}
              validators={['required', 'minStringLength: 10', 'maxStringLength: 10']}
              errorMessages={[
                'this field is required',
                'minStringLength:10',
                'maxStringLength: 10',
              ]}
            />
            <TextField
              type="text"
              name="merchantId"
              value={merchantId || ''}
              label="Merchant Pan No."
              onChange={handleChange2}
              validators={['required', 'minStringLength: 10', 'maxStringLength: 10']}
              errorMessages={[
                'this field is required',
                'minStringLength:10',
                'maxStringLength: 10',
              ]}
            />
          </Grid>
        </Grid>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          type="submit"
          style={{ marginLeft: 870 }}
        >
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Update</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default EditForm;
