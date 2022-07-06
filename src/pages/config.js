import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { SettingConfig } from "../components/create_config/settings-config";

const Settings = () => (
  <>
    <Head>
      <title>Edit Config | Material Kit</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Edit Config
        </Typography>
        <SettingConfig />
      </Container>
    </Box>
  </>
);

Settings.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Settings;
