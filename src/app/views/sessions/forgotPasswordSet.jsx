import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import axios from 'axios';

import Button from '@mui/material/Button';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));
const handleClose = () => {};
const open = true;
const JWTForgotPasswordDesign = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  email: '',
  password: '',
  username: '',
  remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const JwtPasswordSet = (props) => {
  const theme = useTheme();
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(false);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const handleClose = () => {
    setOpen(false);
    axios
      .post('http://localhost:3001/api/users/forgotPasswordSet-verify', {
        email: email,
        otp: otp,
        password: password,
      })
      .then(function (response) {
        alert("User's password updated");
      })
      .catch(function (error) {
        alert('Invalid OTP');
      });
  };
  const otpHandleChange = (e) => {
    setOtp(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      result = forgotPassword(email, password).then((r) => {
        if (r == 'OTP-has-been-send!') {
          setOpen(true);
        }
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  let result;
  const handleFormSubmit = (values) => {
    //setLoading(true);
    // alert();
    // try {
    // result = register(values.email, values.username, values.password).then((r) => {
    //   if (r == 'OTP-has-been-send!') {
    setOpen(true);
    //     setEmail(values.email);
    //   }
    // });
    //   alert();
    // } catch (e) {
    //   console.log(e);
    //   setLoading(false);
    // }
  };
  const passwordSet = (e) => {
    setPassword(e.target.value);
  };
  return (
    <JWTForgotPasswordDesign>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="ForgotPasswordSet"
                src="/assets/images/illustrations/posting_photo.svg"
              />
            </ContentBox>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    size="small"
                    type="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    readonly
                    value={email}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={passwordSet}
                    sx={{ mb: 2 }}
                  />

                  <LoadingButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    variant="contained"
                    sx={{ mb: 2, mt: 3 }}
                  >
                    Forgot Password Setting
                  </LoadingButton>
                  <Paragraph>
                    Already have an account?
                    <NavLink
                      to="/session/signin"
                      style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                    >
                      Login
                    </NavLink>
                  </Paragraph>
                  <Button onClick={handleOpen}>Open modal</Button>
                </form>
              </Formik>
              <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
              >
                <Box sx={style}>
                  <p id="unstyled-modal-description">Otp has been send</p>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    name="otp"
                    label="Otp"
                    variant="outlined"
                    value={otp}
                    onChange={otpHandleChange}
                    // helperText={touched.username && errors.username}
                    // error={Boolean(errors.username && touched.username)}
                    sx={{ mb: 3 }}
                  />
                  <Button onClick={handleClose}>Submit</Button>
                </Box>
              </Modal>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTForgotPasswordDesign>
  );
};

export default JwtPasswordSet;
