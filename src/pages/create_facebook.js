import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CreateFacebookListResults } from "../components/create_facebook/create_facebook-list-results";
import { CreateFacebookListToolbar } from "../components/create_facebook/create_facebook-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";

const Customers = () => (
  <>
    <Head>
      <title>Create Facebook | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        {/* <CreateFacebookListToolbar /> */}
        <Box sx={{ mt: 3 }}>
          <CreateFacebookListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
