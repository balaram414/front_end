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
  Radio,
  TableRow,
  FormControlLabel,
} from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EditForm from '../forms/editForm';

import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { red } from '@mui/material/colors';
import { PropaneSharp } from '@mui/icons-material';
const baseURL = 'http://localhost:3001/api/users/userdetails';
const StyledTable = styled(Table)(() => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } },
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } },
  },
}));

const PaginationTable = () => {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [post, setPost] = React.useState(null);
  // const handleChangePage = (_, newPage) => {
  //   setPage(newPage);
  // };

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
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
  };
  function deleteRecord(id) {
    let baseURL = `http://localhost:3001/api/admin/${id}`;
    axios.delete(baseURL).then((response) => {
      //setPost(response.data.data);
      console.log(JSON.stringify(response.data));
    });
    alert(id);
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
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">User Email</TableCell>
            <TableCell align="right">User Type</TableCell>
            <TableCell align="right">isActive</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post
            //        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post, index) => (
              <TableRow key={index}>
                <TableCell align="left">{post.userName}</TableCell>
                <TableCell align="center">{post.email}</TableCell>
                <TableCell align="right">{post.userType}</TableCell>
                <TableCell align="center">
                  <FormControlLabel
                    name="isActive"
                    checked={post.isActive == true}
                    onClick={(id = post._id, isActive = post.isActive) => {
                      if (post.isActive == true) isActive = false;
                      else isActive = true;
                      let res = axios
                        .put(`http://localhost:3001/api/users/isActive/${post._id}`, {
                          isActive: isActive,
                        })
                        .then((response) => {
                          // if (response.data.isSuccess) alert('Update successfully');
                          // else alert('Update not successfully:');
                          //setUpdateTable('update');
                          console.log('user active successfully!');
                          reloadTable();
                        });
                    }}
                    labelPlacement="end"
                    control={<Radio color="secondary" />}
                  />
                </TableCell>

                <TableCell align="right">
                  <IconButton>
                    <EditForm
                      id={post._id}
                      name={post.name}
                      email={post.email}
                      password={post.password}
                    />
                  </IconButton>
                  <IconButton>
                    <Icon color="error" onClick={() => deleteRecord(post._id)}>
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
