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

import axios from 'axios';
import React from 'react';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
const baseURL = 'http://localhost:3001/api/category/list/';
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
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  const [post, setPost] = React.useState(null);
  const [updateTable, setUpdateTable] = React.useState(null);
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
  };
  const handleChange4 = (e) => {
    e.preventDefault();
    let val = '';
    // let res = axios
    //     .put(`http://localhost:3001/api/category/isPublished/${id}`, {
    //       isPublished: val
    //     })
    //     .then((response) => {
    //       console.log(JSON.stringify(response.data));
    //       if(response.data.isSuccess)
    //       alert("Update successfully");
    //       else
    //       alert("Update not successfully:");
    //       props.chooseMessage('home', {});
    //     });
    // setUpdateTable("update")
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
            <TableCell align="left">Category Name</TableCell>
            <TableCell align="left">Category Type</TableCell>
            <TableCell align="center">Photo</TableCell>
            <TableCell align="center">Description</TableCell>
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
                <TableCell align="left">{post.categoryType}</TableCell>
                <TableCell align="center">
                  <img src={post.imageUrl} alt="Girl in a jacket" width="70" height="80"></img>
                </TableCell>
                <TableCell align="center">{post.description}</TableCell>
                <TableCell align="center">
                  <FormControlLabel
                    name="isPublished"
                    //value="true"
                    checked={post.isPublished == true}
                    onClick={(id = post._id, isPublished = post.isPublished) => {
                      if (post.isPublished == true) isPublished = false;
                      else isPublished = true;
                      let res = axios
                        .put(`http://localhost:3001/api/category/isPublished/${post._id}`, {
                          isPublished: isPublished,
                        })
                        .then((response) => {
                          // if (response.data.isSuccess) alert('Update successfully');
                          // else alert('Update not successfully:');
                          //setUpdateTable('update');
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
                        categoryType: post.categoryType,
                        name: post.name,
                        id: post._id,
                        description: post.description,
                        imageUrl: post.imageUrl,
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
