import Head from "next/head";
import { CreateFacebookListResults } from "../components/create_facebook/create_facebook-list-results";
import { CreateFacebookListToolbar } from "../components/create_facebook/create_facebook-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Dashboard({ logout }) {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <DashboardLayout logout={logout}>
        <Head>
          <title>FarmFace | Create Accounts</title>
        </Head>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <CreateFacebookListToolbar />
            <Box sx={{ mt: 3 }}>
              <CreateFacebookListResults customers={customers} />
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </div>
  );
}
