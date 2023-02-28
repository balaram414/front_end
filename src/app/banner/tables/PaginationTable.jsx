import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  FormControlLabel,
  Button,
  Radio,
  TextField,
  TableRow,
} from '@mui/material';
import axios from 'axios';
import React from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const baseURL = 'http://localhost:3001/api/banner/';
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

const PaginationTable = ({ chooseMessage,pageReload }) => {
  const [post, setPost] = React.useState(null);

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
    });
  };
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data.data);
      console.log(JSON.stringify(post));
    });
  }, [open,pageReload]);
  const handleChange = (e) => {
    e.preventDefault();
  };
  function deleteRecord(id) {
    try {
      let baseURL = `http://localhost:3001/api/banner/${id}`;
      axios.delete(baseURL).then((response) => {
        console.log(JSON.stringify(response.data));
      });
      alert('Successfully Deleted');
      setOpen(false);
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
            <TableCell align="left">Banner Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">IsPublish</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post
            //        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post, index) => (
              <TableRow key={index}>
                <TableCell align="left">{post.name}</TableCell>
                <TableCell align="center">{post.description}</TableCell>
                <TableCell align="center">
                  <img src={post.imageUrl} width="70" height="80" />
                </TableCell>
                <TableCell align="center">
                  <FormControlLabel
                    name="isPublished"
                    //value="true"
                    checked={post.isPublished == true}
                    onClick={(id = post._id, isPublished = post.isPublished) => {
                      if (post.isPublished == true) isPublished = false;
                      else isPublished = true;
                      axios
                        .put(`http://localhost:3010/api/banner/${post._id}/${isPublished}`)
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
                        imageUrl: post.imageUrl,
                      })
                    }
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
