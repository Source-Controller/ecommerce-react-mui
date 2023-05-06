import { Box, Pagination } from "@mui/material";

const AppPagination = ({ pagesCount, handlePageChange }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ m: "20px 0" }}
    >
      <Pagination
        color="primary"
        count={pagesCount}
        onChange={handlePageChange}
        shape="rounded"
      />
    </Box>
  );
};

export default AppPagination;
