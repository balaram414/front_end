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
  const [gender, setGender] = useState('Male');
  const { username, name, merchantId, phoneNo, date, email } = state;
  const handleSubmit = (event) => {
    if (
      name != '' &&
      merchantId != '' &&
      merchantId.length == 10 &&
      phoneNo != '' &&
      phoneNo.length == 10 &&
      gender != '' &&
      date != '' &&
      email != ''
    ) {
      axios
        .post('http://localhost:3001/api/merchants/', {
          merchantName: name,
          email: email,
          gender: gender,
          startDate: date,
          phoneNo: phoneNo,
          merchantId: merchantId,
        })
        .then((response) => {
          alert(JSON.stringify(response.data.messagae));
          props.pageLoad('reload');
        });
    } else {
      alert('Please fill Elements Properly....');
    }
    // console.log(event);
  };

  const handleChange = (event) => {
    //alert([event.target.name]+"---"+ event.target.value)
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
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
              label="Merchant Name"
              onChange={handleChange}
              value={name || ''}
              validators={['required', 'minStringLength: 4', 'maxStringLength: 30']}
              errorMessages={['this field is required']}
            />
            <TextField
              type="email"
              name="email"
              label="Email"
              value={email || ''}
              onChange={handleChange}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
            <RadioGroup row sx={{ mb: 2 }} value={gender || ''}>
              <FormControlLabel
                value="Male"
                label="Male"
                name="gender"
                onChange={handleChange}
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Female"
                label="Female"
                name="gender"
                onChange={handleChange}
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Others"
                label="Others"
                name="gender"
                onChange={handleChange}
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
              onChange={handleChange}
              validators={['required', 'minStringLength: 10', 'maxStringLength: 10']}
              errorMessages={[
                'this field is required',
                'minStringLength:10',
                'maxStringLength: 10',
              ]}
            />
            <TextField
              sx={{ mb: 4 }}
              type="text"
              name="merchantId"
              label="Merchant Pan No."
              onChange={handleChange}
              value={merchantId || ''}
              errorMessages={['this field is required']}
              validators={['required', 'minStringLength:10', 'maxStringLength: 10']}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={date}
                onChange={handleDateChange}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    label="Start picker"
                    id="mui-pickers-date"
                    sx={{ mb: 2, width: '100%' }}
                  />
                )}
              />
            </LocalizationProvider>
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
