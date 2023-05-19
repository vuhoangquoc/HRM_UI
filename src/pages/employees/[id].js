import { Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEmployee } from "src/hooks/use-employee";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { EmployeeProfile } from "src/sections/employees/EmployeeProfile";
import { EmployeeProfileDetails } from "src/sections/employees/EmployeeProfileDetails";
import { useEffect, useState } from "react";
import { useInsuranceContext } from "src/contexts/InsuranceContext";
import employeeService from "src/services/employeeService";
import { useApp } from "src/hooks/use-app";
import { UpdateInsurance } from "src/sections/employees/updateInsurance";
import { AddInsurance } from "src/sections/employees/addInsurance";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const insuranceContext = useInsuranceContext();
  const [insurance, setInsurance] = useState(
    insuranceContext.insuranceList.find((res) => res.employeeId === id)
  );
  const { refreshApp } = useApp();

  useEffect(() => {
    (async () => {
      const insuranceNew = insuranceContext.insuranceList.find((ins) => ins.employeeId === id);
      // console.log(insuranceId);
      setInsurance(insuranceNew);
      if (insuranceNew === undefined) {
        return;
      }
    })();
  }, [id, refreshApp, insuranceContext.insuranceList]);

  return (
    <>
      <Head>
        <title>Employee | HRM</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            {/* <div>
							<Typography variant="h5">
								Employee Info
							</Typography>
						</div> */}
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={4} item>
                  <EmployeeProfile employeeId={id} />
                </Grid>
                <Grid xs={12} md={6} lg={8} item>
                  <EmployeeProfileDetails employeeId={id} />
                </Grid>
                <Grid xs={12} item>
                  {insurance ? (
                    <UpdateInsurance info={insurance} />
                  ) : (
                    <AddInsurance employeeId={id} />
                  )}
                </Grid>
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
