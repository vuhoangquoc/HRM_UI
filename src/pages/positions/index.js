import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import EmployeeAddNewFormDialog from "src/sections/employees/EmployeeAddNew";
import PositionAddNewOrUpdate from "src/sections/positions/PositionAddNewOrUpdate";
import PositionsDataTable from "src/sections/positions/PositionsDataTable";
import { usePositionContext } from "src/contexts/PositionContext";

const now = new Date();

const Page = () => {
  const [isOpenAddNewDialog, setIsOpenAddNewDialog] = useState(false);
  const { positionList } = usePositionContext();
  return (
    <>
      <EmployeeAddNewFormDialog
        isOpen={isOpenAddNewDialog}
        onCancel={() => setIsOpenAddNewDialog(false)}
      />
      <Head>
        <title>Position | HRM</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pb: 0,
          pt: 0,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Position</Typography>
              </Stack>
            </Stack>
            <PositionAddNewOrUpdate />
            <PositionsDataTable data={positionList} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
