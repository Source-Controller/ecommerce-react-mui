import { useState } from "react";

import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { Colors } from "../../styles/theme";

import { clamp } from "./clamp";

const IncDec = () => {
  const [value, setValue] = useState(1);
  const clampValue = clamp(1, 10);

  return (
    <Box display="flex">
      <IconButton
        onClick={() => setValue(clampValue(value - 1))}
        sx={{
          borderRadius: 0,
          background: Colors.secondary,
        }}
      >
        <RemoveIcon />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          border: `1px solid ${Colors.secondary}`,
          p: 2,
        }}
      >
        {value}
      </Typography>
      <IconButton
        onClick={() => setValue(clampValue(value + 1))}
        sx={{
          borderRadius: 0,
          background: Colors.secondary,
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default IncDec;
