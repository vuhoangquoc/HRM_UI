import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import FileDataTable from "src/sections/files/FileDataTable";
import { useFileContext } from "src/contexts/FileContext";
import FileUploadFeature from "src/sections/files/FileUploadFeature";
import DocViewer, { DocViewerRenderers, PDFRenderer } from "@cyntler/react-doc-viewer";
import pptxgen from "pptxgenjs";
import { Presentation, Slide, Image } from "react-pptx";

const Page = () => {
  // const [employees, setEmployees] = useState(null)
  const [isOpenUploadDialog, setIsOpenUploadDialog] = useState(false);
  const { fileList } = useFileContext();

  const [pdfData, setPdfData] = useState(null);
  const [pptx, setPptx] = useState(null);

  const fileContext = useFileContext();
  useEffect(() => {
    (async () => {
      let pdfRes = await fileContext.getData("c96810a8-914d-4ca4-b660-ea72d0f444eb");
      const pdfUrl = URL.createObjectURL(new Blob([pdfRes], { type: "application/pdf" }));
      setPdfData([{ uri: pdfUrl }]);

      let pptxRes = await fileContext.getData("fe74740b-3b68-4e25-bfc9-7da92a2958f1");
      const pptxUrl = URL.createObjectURL(pptxRes);

      setPptx([{ uri: pptxUrl }]);
      // const pptx = new pptxgen();

      // pptx.load(pptxRes, { base64: true });
    })();
  }, []);
  return (
    <>
      <FileUploadFeature
        isOpen={isOpenUploadDialog}
        onClose={() => setIsOpenUploadDialog(false)}
        onCancel={() => setIsOpenUploadDialog(false)}
      />

      <Head>
        <title>File | HRM</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pb: 7,
          pt: 2.5,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">File</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  {/* <Button
										color="inherit"
										startIcon={(
											<SvgIcon fontSize="small">
												<ArrowUpOnSquareIcon />
											</SvgIcon>
										)}
									>
										Import
									</Button>
									<Button
										color="inherit"
										startIcon={(
											<SvgIcon fontSize="small">
												<ArrowDownOnSquareIcon />
											</SvgIcon>
										)}
									>
										Export
									</Button> */}
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setIsOpenUploadDialog(true)}
                >
                  Add
                </Button>
              </div>
            </Stack>
            {/* <EmployeesSearch /> */}
            <FileDataTable data={fileList} />
            {/* {pdfData && (
							<DocViewer
								pluginRenderers={DocViewerRenderers}
								documents={pdfData}

							/>
						)} */}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
