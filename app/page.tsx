/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// Name: Results page of Collaboration Database
// By: Danielle Stewart
// Loads results given department params as a virtualized list
"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
// Page components:
import {
  Box,
  Grid2,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { VariableSizeList as List } from "react-window";
import theme, { darkred, red, white } from "./utils/theme/theme";
import ProfileCard from "./components/ProfileCard";
import {
  Profile,
  profiles,
} from "./utils/InterestsData/interestsData";
import SearchBar from "./components/SearchBar";
import { FilterOptions } from "./utils/functions/filterFunctions";
import Hilitor from "./utils/functions/hiltor";
import FilterList from "./components/FilterList";

const Results = () => {
  const searchParams = useSearchParams();
  const [filteredResults, setFilteredResults] = useState<Profile[]>(profiles);
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.down("phone"));

  // Functions for filter selections
  const [filterSelections, setFilterSelections] = useState<FilterOptions>({
    departments: [],
    search: "",
  });

  // Functions for virtualized list
  const getItemSize = () => {
    return isXs ? 560 : isSm ? 520 : 370;
  };

  const Row = (params: any) => {
    const { index, style, data } = params;

    return (
      <div style={style}>
        <ProfileCard profile={data[index]} />
      </div>
    );
  };

  useEffect(() => {
    searchParams.forEach((dept) => {
      setFilterSelections((prevState) => ({
        ...prevState,
        departments: [...prevState.departments, dept], // Add department to the list based on URL search params
      }));
    });

    // Adds text highlight based on SearchBar input
    const myHilitor = new Hilitor({ id: "results" });
    myHilitor.setMatchType("open");

    document.getElementById("search-bar")?.addEventListener(
      "keyup",
      (e) => {
        myHilitor.apply((e.target as HTMLInputElement).value);
      },
      false
    );
  }, []);

  return (
    <main>
      <Grid2
        container
        spacing={3}
        mx="auto"
        sx={{ width: { xs: "80%", sm: "75%" } }}
      >
        {/* ------------------------ Title ------------------------ */}
        <Grid2
          container
          size={{ xs: 12 }}
          display="flex"
          justifyContent="space-between"
          width="100%"
          mb={1}
          mt={5}
        >
          <Grid2 size={{ md: 3, xs: 12 }}>
            <Typography
              variant="h1"
              sx={{ fontSize: { xs: "40px", phone: "60px" }, fontWeight: 500 }}
            >
              Entries
            </Typography>
            <Typography
              sx={{
                fontSize: { lg: "16px", xs: "14px" },
              }}
            >
              Returned {filteredResults.length} of {profiles.length} entries
              from<br></br>
              CAS Collaboration System
            {filterSelections.departments.map((dept: string, index: number) => (
            <span key={index}>
              , {dept}
            </span>
            ))}
            </Typography>
          </Grid2>
          <Grid2 size={{ md: 9, xs: 12 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                marginTop: { md: "10px" },
              }}
            >
              {/* ------------------------ FilterList ------------------------ */}
              <FilterList
                resultsArr={profiles}
                filterSelections={filterSelections}
                setFilterSelections={setFilterSelections}
                onFilterChange={setFilteredResults}
              />
            </Box>
          </Grid2>
        </Grid2>
        {/* ------------------------ SearchBar ------------------------ */}
        <Grid2 size={{ xs: 12 }} sx={{ position: "relative" }}>
          <SearchBar
            resultsArr={profiles}
            filterSelections={filterSelections}
            setFilterSelections={setFilterSelections}
            onFilterChange={setFilteredResults}
          />
          <IconButton
            aria-label="Search"
            sx={{
              position: "absolute",
              right: 10,
              top: "55%",
              transform: "translateY(-50%)",
              backgroundColor: red,
              color: white,
              zIndex: 1,
              "&:hover": {
                backgroundColor: darkred,
              },
              "&:focus": {
                backgroundColor: darkred,
              },
            }}
          >
            <SearchIcon />
          </IconButton>
        </Grid2>
        {/* ------------------------ ProfileCards ------------------------ */}
        <Grid2 size={{ xs: 12 }}>
          <div id="results">
            <List
              height={800}
              itemCount={filteredResults.length}
              itemSize={getItemSize}
              width={"100%"}
              itemData={filteredResults}
            >
              {Row}
            </List>
          </div>
        </Grid2>
      </Grid2>
    </main>
  );
};

export default Results;
