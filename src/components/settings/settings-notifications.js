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
import React, { useEffect, useState } from "react";
import { initReactI18next, useTranslation } from "react-i18next";
import i18n from "../../i18next";
import EN from "../../Languages/en.json";
import TH from "../../Languages/th.json";

export const SettingsNotifications = (props) => {
  const [lang, setLang] = React.useState("th");
  const { t } = useTranslation();

  useEffect(async () => {
    i18n.locale = await localStorage.getItem("language");
    setLang(i18n.locale);
  }, []);

  const handleChangeLng = async (lng) => {
    if (lng === "th") {
      i18n.locale = "th";
      localStorage.setItem("language", "th");
    }
    if (lng === "en") {
      i18n.locale = "en";
      localStorage.setItem("language", "en");
    }
    const language = await localStorage.getItem("language");
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  i18n.translations = { EN, TH };

  return (
    <form {...props}>
      <Card>
        <CardHeader title={t("languages")} subheader={t("select your language")} />
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
              <Button
                color="primary"
                style={{
                  color: localStorage.getItem("language") === "en" ? "white" : "#5048E5",
                  backgroundColor: localStorage.getItem("language") === "en" ? "#5048E5" : "rgba(0,0,0,0.1)",
                }}
                onClick={() => handleChangeLng("en")}
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                English
              </Button>
              <Button
                color="primary"
                style={{
                  color: localStorage.getItem("language") === "th" ? "white" : "#5048E5",
                  backgroundColor: localStorage.getItem("language") === "th" ? "#5048E5" : "rgba(0,0,0,0.1)",
                }}
                onClick={() => handleChangeLng("th")}
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                ภาษาไทย
              </Button>
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
          <Button color="primary" variant="contained" onClick={() => alert(t("change langue"))} >
            {t("save")}
          </Button>
        </Box>
      </Card>
    </form>
  );
};
