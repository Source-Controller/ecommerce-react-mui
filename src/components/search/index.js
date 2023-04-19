import { IconButton, Slide } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useUIContext } from "../../context/ui";
import { SearchBoxContainer, SearchField } from "../../styles/search";

const SearchBox = () => {
  const { showSearchBox, setShowSearchBox } = useUIContext();

  return (
    <Slide direction="down" in={showSearchBox} timeout={500}>
      <SearchBoxContainer>
        <SearchField
          variant="standard"
          placeholder="search..."
          color="secondary"
          fullWidth
        />
        <IconButton>
          <SearchIcon
            color="secondary"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => setShowSearchBox(false)}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <CloseIcon
            color="secondary"
            sx={{
              fontSize: "4rem",
            }}
          />
        </IconButton>
      </SearchBoxContainer>
    </Slide>
  );
};

export default SearchBox;
