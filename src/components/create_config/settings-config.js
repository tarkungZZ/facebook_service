import { useState, useEffect } from "react";
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
  TextField,
} from "@mui/material";
import auth from "../../../src/api/auth.js";
import { useTranslation } from "react-i18next";

export const SettingConfig = (props) => {
  const [delay_min, setMin] = useState(undefined);
  const [delay_max, setMax] = useState(undefined);
  const [all, setAll] = useState(undefined);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
    getData();
  }, []);

  const getData = async () => {
    const data = await auth.getDelay();
    setAll(data.data[0].delay_min);
    setMin(data.data[0].delay_min);
    setMax(data.data[0].delay_max);
    return data;
  };

  // console.log("all data --->", all);

  const handleDelay = async () => {
    const data = await auth.editDelay(delay_min, delay_max);
    setTimeout(() => {
      alert("Edit Success");
    }, 400);
    getData();
    return data;
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader={t("manage_delay_system")} title={t("delay")} />
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
              <Typography color="textPrimary" gutterBottom variant="h6">
                {t("min_delay")} ({t("Seconds")})
              </Typography>
              <TextField
                fullWidth
                name="min"
                onChange={(e) => setMin(e.target.value)}
                type="number"
                value={delay_min}
                variant="outlined"
                size="small"
                margin="dense"
              />
            </Grid>
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
              <Typography color="textPrimary" gutterBottom variant="h6">
                {t("max_delay")} ({t("Seconds")})
              </Typography>
              <TextField
                fullWidth
                name="max"
                onChange={(e) => setMax(e.target.value)}
                type="number"
                value={delay_max}
                variant="outlined"
                size="small"
                margin="dense"
              />
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
          <Button color="primary" variant="contained" onClick={handleDelay}>
            {t("save")}
          </Button>
        </Box>
      </Card>
    </form>
  );
};
