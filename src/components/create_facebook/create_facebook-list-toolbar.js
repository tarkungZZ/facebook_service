import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";

export const CreateFacebookListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Create User
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          startIcon={<DownloadIcon fontSize="small" />}
          color="primary"
          variant="contained"
          onClick={() => {
            localStorage.setItem("create", "click");
          }}
        >
          Add Account
        </Button>
      </Box>
    </Box>
  </Box>
);
