// import Head from 'next/head';
// import { Box, Container, Grid } from '@mui/material';
// import { Budget } from '../components/dashboard/budget';
// import { LatestOrders } from '../components/dashboard/latest-orders';
// import { LatestProducts } from '../components/dashboard/latest-products';
// import { Sales } from '../components/dashboard/sales';
// import { TasksProgress } from '../components/dashboard/tasks-progress';
// import { TotalCustomers } from '../components/dashboard/total-customers';
// import { TotalProfit } from '../components/dashboard/total-profit';
// import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
// import { DashboardLayout } from '../components/dashboard-layout';

// const Dashboard = () => (
//   <>
//     <Head>
//       <title>
//         Dashboard | Material Kit
//       </title>
//     </Head>
//     <Box
//       component="main"
//       sx={{
//         flexGrow: 1,
//         py: 8
//       }}
//     >
//       <Container maxWidth={false}>
//         <Grid
//           container
//           spacing={3}
//         >
//           <Grid
//             item
//             lg={3}
//             sm={6}
//             xl={3}
//             xs={12}
//           >
//             <Budget />
//           </Grid>
//           <Grid
//             item
//             xl={3}
//             lg={3}
//             sm={6}
//             xs={12}
//           >
//             <TotalCustomers />
//           </Grid>
//           <Grid
//             item
//             xl={3}
//             lg={3}
//             sm={6}
//             xs={12}
//           >
//             <TasksProgress />
//           </Grid>
//           <Grid
//             item
//             xl={3}
//             lg={3}
//             sm={6}
//             xs={12}
//           >
//             <TotalProfit sx={{ height: '100%' }} />
//           </Grid>
//           <Grid
//             item
//             lg={8}
//             md={12}
//             xl={9}
//             xs={12}
//           >
//             <Sales />
//           </Grid>
//           <Grid
//             item
//             lg={4}
//             md={6}
//             xl={3}
//             xs={12}
//           >
//             <TrafficByDevice sx={{ height: '100%' }} />
//           </Grid>
//           <Grid
//             item
//             lg={4}
//             md={6}
//             xl={3}
//             xs={12}
//           >
//             <LatestProducts sx={{ height: '100%' }} />
//           </Grid>
//           <Grid
//             item
//             lg={8}
//             md={12}
//             xl={9}
//             xs={12}
//           >
//             <LatestOrders />
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   </>
// );

// Dashboard.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

// export default Dashboard;

// import Head from 'next/head';
// import { Box, Container, Grid } from '@mui/material';
// import { Budget } from '../components/dashboard/budget';
// import { LatestOrders } from '../components/dashboard/latest-orders';
// import { LatestProducts } from '../components/dashboard/latest-products';
// import { Sales } from '../components/dashboard/sales';
// import { TasksProgress } from '../components/dashboard/tasks-progress';
// import { TotalCustomers } from '../components/dashboard/total-customers';
// import { TotalProfit } from '../components/dashboard/total-profit';
// import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
// import { DashboardLayout } from '../components/dashboard-layout';

// export default function Dashboard({logout}) {
//   return <div>
//     <DashboardLayout logout={logout}>
//       <Head>
//         <title>Dashboard | Material Kit</title>
//       </Head>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 8,
//         }}
//       >
//         <Container maxWidth={false}>
//           <Grid container spacing={3}>
//             <Grid item lg={3} sm={6} xl={3} xs={12}>
//               <Budget />
//             </Grid>
//             <Grid item xl={3} lg={3} sm={6} xs={12}>
//               <TotalCustomers />
//             </Grid>
//             <Grid item xl={3} lg={3} sm={6} xs={12}>
//               <TasksProgress />
//             </Grid>
//             <Grid item xl={3} lg={3} sm={6} xs={12}>
//               <TotalProfit sx={{ height: "100%" }} />
//             </Grid>
//             <Grid item lg={8} md={12} xl={9} xs={12}>
//               <Sales />
//             </Grid>
//             <Grid item lg={4} md={6} xl={3} xs={12}>
//               <TrafficByDevice sx={{ height: "100%" }} />
//             </Grid>
//             <Grid item lg={4} md={6} xl={3} xs={12}>
//               <LatestProducts sx={{ height: "100%" }} />
//             </Grid>
//             <Grid item lg={8} md={12} xl={9} xs={12}>
//               <LatestOrders />
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </DashboardLayout>
//   </div>
// }

import Head from "next/head";
import { CreateFacebookListResults } from "../components/create_facebook/create_facebook-list-results";
import { CreateFacebookListToolbar } from "../components/create_facebook/create_facebook-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { customers } from "../__mocks__/customers";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Dashboard({ logout }) {
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
            {/* <CreateFacebookListToolbar /> */}
            <Box sx={{ mt: 3 }}>
              <CreateFacebookListResults customers={customers} />
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </div>
  );
}
