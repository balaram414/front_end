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
  TableRow,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import React from "react";
const baseURL = "http://localhost:3001/api/inventory/";
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const subscribarList = [
  {
    name: "john doe",
    date: "18 january, 2019",
    amount: 1000,
    status: "close",
    company: "ABC Fintech LTD.",
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "kessy bryan",
    date: "10 january, 2019",
    amount: 9000,
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "james cassegne",
    date: "8 january, 2019",
    amount: 5000,
    status: "close",
    company: "Collboy Tech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "lucy brown",
    date: "1 january, 2019",
    amount: 89000,
    status: "open",
    company: "ABC Fintech LTD.",
  },
];

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
  React.useEffect(() => {
     axios.get(baseURL).then((response) => {
      setPost(response.data.data);
      console.log(JSON.stringify(post));
    });
  }, []);
  if (!post) return (<div >Loading...#######################</div>)
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">SKU</TableCell>
            <TableCell align="center">Category Id</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Prod Id</TableCell>
            <TableCell align="center">Reserve Quantity</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">weight</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post
    //        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((post, index) => (
              <TableRow key={index}>
                <TableCell align="left">{post.sku}</TableCell>
                <TableCell align="center">{post.categoryId}</TableCell>
                <TableCell align="center">{post.quantity}</TableCell>
                <TableCell align="center">{post.prodId}</TableCell>
                <TableCell align="center">{post.reserveQuantity}</TableCell>
                <TableCell align="center">{post.color}</TableCell>
                <TableCell align="center">{post.size}</TableCell>
                <TableCell align="center">{post.weight}</TableCell>
                <TableCell align="right">
                  <IconButton>
                    <Icon color="error">close</Icon>
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
