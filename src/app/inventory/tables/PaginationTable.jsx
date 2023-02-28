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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditForm from '../forms/editForm';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { calById } from '../../utils/calById';

const baseURL = 'http://localhost:3005/api/inventory/';
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaginationTable = ({ chooseMessage }) => {
  const { userType } = useAuth();
  const catagoryList = {};
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [post, setPost] = React.useState(null);
  const [catList, setCatList] = React.useState();

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
    });
  }, [open]);
  const handleChange = (e) => {
    e.preventDefault();
    alert('Hello Search...');
  };
  function deleteRecord(id) {
    try {
      let baseURL = `http://localhost:3005/api/inventory/${id}`;
      axios.delete(baseURL).then((response) => {});
      alert('Successfully Deleted');
      setOpen(false);
    } catch (e) {
      alert('Successfully not Deleted');
    }
  }

  if (!post) return <div>Loading...#######################</div>;

  return (
    <Box width="100%" overflow="auto">
      <TextField
        style={{
          borderRadius: '25px',
          border: '2px solid #609',
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
            <TableCell align="left">Photo</TableCell>
            <TableCell align="left">Merchand</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Buy Price</TableCell>
            <TableCell align="center">Selling Price</TableCell>
            <TableCell align="center">Reserve Count</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Prod Id</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post
            //        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post, index) => (
              <TableRow key={index} style={{}}>
                <TableCell>
                  <img src={post.imageUrl} alt="Girl in a jacket" width="70" height="80"></img>
                </TableCell>
                <TableCell align="left">{post.merchantId.split('_')[1]}</TableCell>
                <TableCell align="left">{post.prodId.split('_')[1]}</TableCell>
                <TableCell align="center">{post.quantity}</TableCell>
                <TableCell align="center">{post.buyPrice}</TableCell>
                <TableCell align="center">{post.sellingPrice}</TableCell>
                <TableCell align="center">{post.reserveQuantity}</TableCell>
                <TableCell align="center">{post.type}</TableCell>
                <TableCell align="center">{post.prodId.split('_')[1]}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() =>
                      chooseMessage('edit', {
                        id: post._id,
                        merchantId: post.merchantId,
                        quantity: post.quantity,
                        type: post.type,
                        prodId: post.prodId,
                        sellingPrice: post.sellingPrice,
                        buyPrice: post.buyPrice,
                        packageInfo: post.packageInfo,
                        storageInfo: post.storageInfo,
                        genericName: post.genericName,
                        productManufacture: post.productManufacture,
                        ingredientInfo: post.ingredientInfo,
                        sku: post.sku,
                        color: post.color,
                        weight: post.weight,
                        height: post.height,
                        imageUrl: post.imageUrl[0],
                      })
                    }
                  >
                    <Button variant="contained" component="label">
                      Edit
                    </Button>
                  </IconButton>

                  <div>
                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{'Are you Sure want to Delete ?'}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Are you Sure want to Delete ?.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={() => deleteRecord(post._id)}>Agree</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <IconButton>
                    <Icon color="error" onClick={handleClickOpen}>
                      close
                    </Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default PaginationTable;
