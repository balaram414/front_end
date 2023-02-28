import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const AppForm = () => {
  
  return (
    <Container>
     <h1>Hello Profile</h1>
    </Container>
  );
 
};

export default AppForm;
