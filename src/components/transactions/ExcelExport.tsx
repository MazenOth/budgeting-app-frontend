import { AddIcon, DownloadIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import * as XLSX from "xlsx";

interface ExcelExporterProps {
  data: any[];
  fileName: string;
}

const ExcelExport = ({ data, fileName }: ExcelExporterProps) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <Button
      leftIcon={<DownloadIcon />}
      colorScheme="teal"
      variant="ghost"
      onClick={exportToExcel}
    >
      Export to Excel
    </Button>
  );
};

export default ExcelExport;
