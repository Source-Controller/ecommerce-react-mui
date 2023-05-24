import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

const AppPagination = ({ page, handlePageChange, pagesCount }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ m: "20px 0" }}
    >
      <Pagination
        color="primary"
        page={page}
        count={pagesCount}
        onChange={handlePageChange}
        shape="rounded"
      />
    </Box>
  );
};

export default AppPagination;
