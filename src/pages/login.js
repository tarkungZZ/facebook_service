// import Head from "next/head";
// import NextLink from "next/link";
// import { useRouter } from "next/router";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Facebook as FacebookIcon } from "../icons/facebook";
// import { Google as GoogleIcon } from "../icons/google";
// // import { DashboardLayout } from "../components/dashboard-layout";

// const Login = () => {
//   const router = useRouter();
//   const formik = useFormik({
//     initialValues: {
//       email: "demo@devias.io",
//       password: "Password123",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
//       password: Yup.string().max(255).required("Password is required"),
//     }),
//     onSubmit: () => {
//       router.push("/");
//     },
//   });

//   return (
//     <>
//       <Head>
//         <title>Login | Material Kit</title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           alignItems: "center",
//           display: "flex",
//           flexGrow: 1,
//           minHeight: "100%",
//         }}
//       >
//         <Container maxWidth="sm">
//           <NextLink href="/" passHref>
//             <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
//               Dashboard
//             </Button>
//           </NextLink>
//           <form onSubmit={formik.handleSubmit}>
//             <Box sx={{ my: 3 }}>
//               <Typography color="textPrimary" variant="h4">
//                 Sign in
//               </Typography>
//               <Typography color="textSecondary" gutterBottom variant="body2">
//                 Sign in on the internal platform
//               </Typography>
//             </Box>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Button
//                   color="info"
//                   fullWidth
//                   startIcon={<FacebookIcon />}
//                   onClick={formik.handleSubmit}
//                   size="large"
//                   variant="contained"
//                 >
//                   Login with Facebook
//                 </Button>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Button
//                   fullWidth
//                   color="error"
//                   startIcon={<GoogleIcon />}
//                   onClick={formik.handleSubmit}
//                   size="large"
//                   variant="contained"
//                 >
//                   Login with Google
//                 </Button>
//               </Grid>
//             </Grid>
//             <Box
//               sx={{
//                 pb: 1,
//                 pt: 3,
//               }}
//             >
//               <Typography align="center" color="textSecondary" variant="body1">
//                 or login with email address
//               </Typography>
//             </Box>
//             <TextField
//               error={Boolean(formik.touched.email && formik.errors.email)}
//               fullWidth
//               helperText={formik.touched.email && formik.errors.email}
//               label="Email Address"
//               margin="normal"
//               name="email"
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               type="email"
//               value={formik.values.email}
//               variant="outlined"
//             />
//             <TextField
//               error={Boolean(formik.touched.password && formik.errors.password)}
//               fullWidth
//               helperText={formik.touched.password && formik.errors.password}
//               label="Password"
//               margin="normal"
//               name="password"
//               onBlur={formik.handleBlur}
//               onChange={formik.handleChange}
//               type="password"
//               value={formik.values.password}
//               variant="outlined"
//             />
//             <Box sx={{ py: 2 }}>
//               <Button
//                 color="primary"
//                 disabled={formik.isSubmitting}
//                 fullWidth
//                 size="large"
//                 type="submit"
//                 variant="contained"
//               >
//                 Sign In Now
//               </Button>
//             </Box>
//             <Typography color="textSecondary" variant="body2">
//               Don&apos;t have an account?{" "}
//               <NextLink href="/register">
//                 <Link
//                   to="/register"
//                   variant="subtitle2"
//                   underline="hover"
//                   sx={{
//                     cursor: "pointer",
//                   }}
//                 >
//                   Sign Up
//                 </Link>
//               </NextLink>
//             </Typography>
//           </form>
//         </Container>
//       </Box>
//     </>
//   );
// };

// // Login.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// export default Login;

import Head from "next/head";
import NextLink from "next/link";
import router, { useRouter } from "next/router";
// import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";
import auth from "../../src/api/auth.js";
// import { DashboardLayout } from "../components/dashboard-layout";

export default function Login({ setIsLoading }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const formik = useFormik({
  //   initialValues: {
  //     username: "admin3",
  //     password: "admin3",
  //   },
  //   validationSchema: Yup.object({
  //     username: Yup.string().max(255),
  //     password: Yup.string().max(255).required("Password is required"),
  //   }),
  //   onSubmit: () => {
  //     handleLogin();

  //   },

  // });

  const handleLogin = async () => {
    const { data } = await auth.login(username, password);
    // location.href = "/";
    // setIsLoading(true);
    return data;
  };

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          {/* <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink> */}
          {/* <form onSubmit={() => handleLogin()}> */}
          <form>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Users Management
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid container spacing={3}></Grid>

            <TextField
              // error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              // helperText={formik.touched.username && formik.errors.username}
              label="Username"
              margin="normal"
              name="username"
              // onBlur={formik.handleBlur}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              value={username}
              variant="outlined"
            />
            <TextField
              // error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              // helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              // onBlur={formik.handleBlur}
              // onChange={formik.handleChange}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                onClick={() => handleLogin()}
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="button"
                variant="contained"
              >
                Confirm
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
}
