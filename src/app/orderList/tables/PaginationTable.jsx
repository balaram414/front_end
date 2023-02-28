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
  Radio,
  FormControlLabel,
} from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditForm from '../forms/editForm';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const baseURL = 'http://localhost:3001/api/orders/tempOrder/';
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
  const [post, setPost] = React.useState(null);
  const [isPublish, setIsPublish] = React.useState(null);
  const [updateTable, setUpdateTable] = React.useState(null);

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
  const reloadTable = () => {
    axios.get(baseURL).then((response) => {
      setPost(response.data.data);
      console.log(JSON.stringify(post));
    });
  };
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data.data);
      console.log(JSON.stringify(post));
    });
  }, [open, updateTable]);
  const handleChange = (e) => {
    e.preventDefault();
    alert('Hello Search...');
  };
  const handleChange4 = (e) => {
    e.preventDefault();
    let val = '';
  };
  function deleteRecord(id) {
    try {
      let baseURL = `http://localhost:3001/api/orders/${id}`;
      axios.delete(baseURL).then((response) => {
        //setPost(response.data.data);
        console.log(JSON.stringify(response.data));
      });
      setUpdateTable('update');
      alert('Successfully Deleted');
    } catch (e) {
      alert('Successfully not Deleted');
    }
  }
  if (!post) return <div>Loading...#######################</div>;
  console.log(JSON.stringify(post));
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
            <TableCell align="left">Product Name</TableCell>
            <TableCell align="center">Quentity</TableCell>
            <TableCell align="center">Customer Id</TableCell>
            <TableCell align="center">Customer Address</TableCell>
            <TableCell align="center">Purches Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post
            //        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post, index) => (
              <TableRow key={index}>
                <TableCell align="left">{post.productId.split('_')[1]}</TableCell>
                <TableCell align="left">{post.quentity}</TableCell>
                <TableCell align="left">{post.customerId}</TableCell>
                <TableCell align="center">{post.custAddress}</TableCell>
                <TableCell align="center">{post.purchesDate}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default PaginationTable;
