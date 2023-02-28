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
import { red } from '@mui/material/colors';
import { PropaneSharp } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const baseURL = 'http://localhost:3009/api/product/';
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

const PaginationTable = ({ chooseMessage, pageReload }) => {
  const [post, setPost] = React.useState(null);
  const [updateTable, setUpdateTable] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
  }, [open, updateTable, pageReload]);
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
      let baseURL = `http://localhost:3001/api/category/${id}`;
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
            <TableCell align="center">Photo</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">category</TableCell>
            <TableCell align="center">isPublished</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post
            //        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post, index) => (
              <TableRow key={index}>
                <TableCell align="left">{post.name}</TableCell>
                <TableCell align="center">
                  <img src={post.image} width="70" height="80" />
                </TableCell>
                <TableCell align="center">{post.description}</TableCell>
                <TableCell align="center">{post.categoryId.split('_')[1]}</TableCell>
                <TableCell align="center">
                  <FormControlLabel
                    name="isPublished"
                    //value="true"
                    checked={post.isPublished == true}
                    onClick={(id = post._id, isPublished = post.isPublished) => {
                      if (post.isPublished == true) isPublished = false;
                      else isPublished = true;
                      let res = axios
                        .put(
                          `http://localhost:3009/api/product/isPublished/${post._id}/${isPublished}`
                        )
                        .then((response) => {
                          reloadTable();
                        });
                    }}
                    labelPlacement="end"
                    control={<Radio color="secondary" />}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() =>
                      chooseMessage('edit', {
                        name: post.name,
                        id: post._id,
                        description: post.description,
                        imageUrl: post.image,
                        categoryId: post.categoryId,
                      })
                    }
                    style={{ marginRight: 55 }}
                  >
                    <Button variant="contained" component="label">
                      Edit
                    </Button>
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
