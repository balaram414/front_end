import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TextField,
  TableRow,
} from "@mui/material";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditForm from '../forms/editForm'
import { useState } from "react";
import axios from "axios";
import React from "react";
import { red } from "@mui/material/colors";
import { PropaneSharp } from "@mui/icons-material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const baseURL = "http://localhost:3001/api/merchants/";
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaginationTable = ({ chooseMessage ,pageReload}) => {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [post, setPost] = React.useState(null);
  // const handleChangePage = (_, newPage) => {
  //   setPage(newPage);
  // };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };
  React.useEffect(() => {
     axios.get(baseURL).then((response) => {
      setPost(response.data.data);
      console.log(JSON.stringify(post));
    });
  }, [open,pageReload]);
  const handleChange = (e) => {
    e.preventDefault();
    alert("Hello Search...")
  };
  function deleteRecord(id)
  {
    try{
    let baseURL= `http://localhost:3006/api/merchants/${id}`;
    axios.delete(baseURL).then((response) => {
      //setPost(response.data.data);
      console.log(JSON.stringify(response.data));
    });
    alert("Successfully Deleted")
    setOpen(false);

  }
  catch(e)
  {
    alert("Successfully not Deleted")
  }
  }
  if (!post) return (<div >Loading...#######################</div>)
  console.log(JSON.stringify(post))
  return (
    <Box width="100%" overflow="auto">
      <TextField style={{
        borderRadius:"25px",
        border: "2px solid #609"
    }}
              //sx={{ mb: 4 }}
              type="text"
              name="merchantId"
              label="Search..."
              onChange={handleChange}
              //value={merchantId || ""}
            />
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Merchant Name</TableCell>            
            <TableCell align="center">Merchant Id</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Mobile No</TableCell>
            <TableCell align="center">Start Date</TableCell> 
            <TableCell align="center">Action</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {post
    //        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post, index) => (
              <TableRow key={index}>
                <TableCell align="left">{post.merchantName}</TableCell>                
                <TableCell align="center">{post.merchantId}</TableCell>                
                <TableCell align="center">{post.email}</TableCell>  
                <TableCell align="center">{post.gender}</TableCell>                
                <TableCell align="center">{post.phoneNo}</TableCell>
                <TableCell align="center">{post.startDate}</TableCell>
                <TableCell align="right">
                <IconButton  onClick={() => chooseMessage("edit",
                {merchantName:post.merchantName,
                  id:post._id,email:post.email,gender:post.gender,merchantId:post.merchantId,
                  phoneNo:post.phoneNo
                })}>
                   <Button variant="contained" component="label">Edit</Button>
                  </IconButton>
                  <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you Sure want to Delete ?"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Are you Sure want to Delete ?.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={()=>deleteRecord(post._id)}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
                 
                  <IconButton>    
                    <Icon color="error" onClick={handleClickOpen}>close</Icon>
                  </IconButton>                  
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
      
{/* 
      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={subscribarList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      /> */}
    </Box>
  );
};

export default PaginationTable;
