import { Stack } from '@mui/material';
import { Box, styled } from '@mui/system';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { useEffect, useState } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import SimpleForm from './SimpleForm';
import StepperForm from './StepperForm';
import EditForm from './editForm';
import { useAuth } from '../../hooks/useAuth';
const AppList = Loadable(lazy(() => import('../tables/PaginationTable')));
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const AppForm = () => {
  const [checksum, setChecksum] = useState('home');
  const [recordDetails, setRecordDetails] = useState();
  const chooseMessage = (message, recordDetails) => {
    setRecordDetails(recordDetails);
    setChecksum(message);
  };
  if (checksum == 'home')
    return (
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Material', path: '/material' }, { name: 'Form' }]} />
        </Box>

        <Stack spacing={3}>
          <SimpleCard title="Order">
            <SimpleForm />
          </SimpleCard>
          <SimpleCard title="Orders List">
            <AppList chooseMessage={chooseMessage} />
          </SimpleCard>
        </Stack>
      </Container>
    );
  if (checksum == 'edit')
    return (
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Material', path: '/material' }, { name: 'Form' }]} />
        </Box>
        <Stack spacing={3}>
          <SimpleCard>
            <EditForm
              chooseMessage={chooseMessage}
              id={recordDetails.id}
              quentity={recordDetails.quentity}
              purchesDate={recordDetails.purchesDate}
              productId={recordDetails.productId}
              customerAddress={recordDetails.customerAddress}
              customerId={recordDetails.customerId}
            />
          </SimpleCard>
        </Stack>
      </Container>
    );
};

export default AppForm;
