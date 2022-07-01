import Head from "next/head";
import { useState, useEffect } from "react";
// import { Box, Container, Grid } from "@mui/material";
import { Budget } from "../components/dashboard/budget";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { LatestProducts } from "../components/dashboard/latest-products";
import { Sales } from "../components/dashboard/sales";
import { TasksProgress } from "../components/dashboard/tasks-progress";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import { TrafficByDevice } from "../components/dashboard/traffic-by-device";
import { DashboardLayout } from "../components/dashboard-layout";
// import { Dashboard } from './dashboard'
import auth from "../api/auth.js";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";

import Login from './login'
import Dashboard from './dashboard'

// const [isLogin, setIsLogin] = React.useState(true);

export default function App(){


  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(undefined)

  useEffect(() => {
    if(isLoading) {
      verifyAccessToken()
    }
  },[isLoading])

  

  // useEffect(() => {
  //   setIsLoading(true)
  //   verifyAccessToken()
  // },[accessToken])

  const verifyAccessToken = async () => {
    const token = await localStorage.getItem("token")
    setAccessToken(token)
    setIsLoading(false)
  }

  const logout = async () => {
    setAccessToken(undefined)
    await localStorage.removeItem("token")
    setIsLoading(true)
  }
  // const router = useRouter();
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
  //     console.log("test");
  //   },
  // });

  // console.log("validationSchema", formik.values.username);

  // useEffect(async () => {
  //   
  //   if (await localStorage.getItem("token")) {
  //     setIsLogin(false);
  //   } else {
  //     setIsLogin(false);
  //   }
  // });


console.log(accessToken)
  if(isLoading) return <div>.... loading</div>

  return <div>{accessToken ?  <Dashboard logout={() => logout()}/> : <Login setIsLoading={setIsLoading}/>}</div>
}

