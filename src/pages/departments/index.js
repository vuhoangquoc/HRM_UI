import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { EmployeesSearch } from "src/sections/employees/emplyees-search";
import { applyPagination } from "src/utils/apply-pagination";
import employeeService from "src/services/employeeService";
import EmployeesDataTable from "src/sections/employees/EmployeesDataTable";
import EmployeeAddNewFormDialog from "src/sections/employees/EmployeeAddNew";
import { useEmployeeContext } from "src/contexts/EmployeeContext";
import { useEmployee } from "src/hooks/use-employee";
import DepartmentsDataTable from "src/sections/departments/DepartmentsDataTable";
import { useDepartmentContext } from "src/contexts/DepartmentContext";
import DepartmentAddNewOrUpdate from "src/sections/departments/DepartmentAddNewOrUpdate";

const now = new Date();

const Page = () => {
  // const [employees, setEmployees] = useState(null)
  const [isOpenAddNewDialog, setIsOpenAddNewDialog] = useState(false);
  const { departmentList } = useDepartmentContext();
  // useEffect(() => {
  // 	(async () => {
  // 		let res = await employeeService.getAll()
  // 		console.log(res.data);
  // 		res && res.statusCode === 200 && setEmployees(res.data)
  // 	})()
  // }, [])

  return (
    <>
      <EmployeeAddNewFormDialog
        isOpen={isOpenAddNewDialog}
        // onClose={() => setIsOpenAddNewDialog(false)}
        onCancel={() => setIsOpenAddNewDialog(false)}
      />
      <Head>
        <title>Department | HRM</title>
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
                <Typography variant="h4">Department</Typography>
              </Stack>
            </Stack>
            <DepartmentAddNewOrUpdate />
            <DepartmentsDataTable data={departmentList} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
