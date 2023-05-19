import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { SettingsNotifications } from "src/sections/settings/settings-notifications";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => (
  <>
    <Head>
      <title>Settings | HRM</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">Settings</Typography>
          <SettingsNotifications />
        </Stack>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;