import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { CreatePostListResults } from "../components/create_post/create_post-list-results";

const Account = () => (
  <>
    <Head>
      <title>Create Post | Material Kit</title>
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
          <CreatePostListResults />
        </Box>
      </Container>
    </Box>
  </>
);

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
