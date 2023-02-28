import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import SimpleForm from "./SimpleForm";

import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
const AppProgress = Loadable(lazy(() => import('../tables/AppTable')));

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
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Form" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Simple Form">
          <SimpleForm />
        </SimpleCard>

        <SimpleCard title="The Merchant List">        
          <AppProgress />
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default AppForm;
