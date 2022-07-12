import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";

export const SettingsNotifications = (props) => (
  <form {...props}>
    <Card>
      <CardHeader title="Language" subheader="Select Your Language" />
      <Divider />
      <CardContent>
        <Grid container spacing={6} wrap="wrap">
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            xs={12}
          >
            {/* <Typography color="textPrimary" gutterBottom variant="h6">
              Notifications
            </Typography> */}
            <FormControlLabel
              control={<Checkbox color="primary" defaultChecked />}
              label="English"
            />
            <FormControlLabel control={<Checkbox color="primary" defaultChecked />} label="Thai" />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button color="primary" variant="contained">
          Save
        </Button>
      </Box>
    </Card>
  </form>
);
