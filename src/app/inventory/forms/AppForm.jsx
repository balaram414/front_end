import { Stack } from '@mui/material';
import { Box, styled } from '@mui/system';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { useEffect, useState } from 'react';
import { Breadcrumb, SimpleCard } from 'app/components';
import SimpleForm from './SimpleForm';
import StepperForm from './StepperForm';
import EditForm from './editForm';

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
          <SimpleCard title="Form">
            <SimpleForm />
          </SimpleCard>
          <SimpleCard title="Inventory List">
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
              id={recordDetails.id}
              categoryId={recordDetails.categoryId}
              imageUrl={recordDetails.imageUrl}
              merchantId={recordDetails.merchantId}
              quantity={recordDetails.quantity}
              type={recordDetails.type}
              prodId={recordDetails.prodId}
              sellingPrice={recordDetails.sellingPrice}
              buyPrice={recordDetails.buyPrice}
              packageInfo={recordDetails.packageInfo}
              storageInfo={recordDetails.storageInfo}
              genericName={recordDetails.genericName}
              ingredientInfo={recordDetails.ingredientInfo}
              productManufacture={recordDetails.productManufacture}
              sku={recordDetails.sku}
              color={recordDetails.color}
              weight={recordDetails.weight}
              chooseMessage={chooseMessage}
            />
          </SimpleCard>
        </Stack>
      </Container>
    );
};

export default AppForm;
