import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { PropaneSharp } from '@mui/icons-material';
import axios from "axios";
import { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const [state, setState] = useState({ date: new Date() });
  const [open, setOpen] = React.useState(false);
  const {
    username,
    name,
    merchantId,
    phoneNo,
    gender,
    date,
    email,
    countryCode
  } = state;
  const handleSubmit = (event) => {
    
    if(name!="" && merchantId!="" && phoneNo!="" && gender!="" && countryCode!="")
    {
      axios.put('http://localhost:3006/api/admin/?id=', {
        merchantName: name,
        adminEmail: "a@gmail.com",
        startDate: date,
        phoneNo:phoneNo,
        merchantId: merchantId,
        countryCode: countryCode,
     }).then((response) => {
      alert(JSON.stringify(response.data.messagae))
   })
    }
    else
    {
      alert("Please fill Elements....")
    }
    // console.log(event);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
      <Button variant="outlined" onClick={handleClickOpen}>
     <AppRegistrationIcon color="edit">close</AppRegistrationIcon>  
      </Button>
      <Dialog 
        // style={{
        //   width: '150px',
        // }}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Record
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div><input name="id" defaultValue={props.name} hidden/>
        <TextField
          id="outlined-error"
          label="Name"
          defaultValue={props.name}
          validators={["required", "minStringLength: 2", "maxStringLength: 2"]}
          errorMessages={["this field is required"]}
        />
        <TextField          
          id="outlined-error-helper-text"
          label="Email"
          defaultValue={props.email}
          helperText="Please put your email"
        />
      </div>
      <div>
        
        <TextField          
          id="filled-error-helper-text"
          label="Password"
          defaultValue={props.password}
          helperText="Please put the Password"
          variant="filled"
        />
      </div>
      <div>
        {/* <TextField
          error
          id="standard-error"
          label="Error"
          defaultValue=""
          variant="standard"
        />
        <TextField
          error
          id="standard-error-helper-text"
          label="Error"
          defaultValue=""
          helperText="Incorrect entry."
          variant="standard"
        /> */}
      </div>
    </Box>
      </Dialog>
      </ValidatorForm>
    </div>
  );
}
