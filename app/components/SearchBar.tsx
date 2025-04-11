/* eslint-disable @typescript-eslint/no-unused-vars */
// Name: SearchBar Component
// By: Danielle Stewart
// Component that displays a search bar for the returned results of the collaboration database
// User can search by instructor name, department, or interests
import { useEffect } from "react";
import { FilterOptions, filterProfiles } from "@/app/utils/functions/filterFunctions";
import TextField from "@mui/material/TextField";
import { Profile } from "@/app/utils/InterestsData/interestsData";

const SearchBar = (props: {
  resultsArr: Profile[];
  filterSelections: FilterOptions;
  setFilterSelections: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onFilterChange: (filteredResults: Profile[]) => void;
}) => {
  // Adds user input to props.filterSelections.search onChange
  const handleInputChange = (
    value: string
  ) => {
    props.setFilterSelections((prevSelections) => ({
      ...prevSelections,
      search: value,
    }));
  };

  // Filters results based on SearchBar and FilterList inputs
  const filteredResults =  filterProfiles(
      props.filterSelections.departments,
      props.filterSelections.search
    );

  // Updates the displayed results when a filter has been changed
  useEffect(() => {
    props.onFilterChange(filteredResults);
  }, [props.filterSelections, props.resultsArr, props.onFilterChange]);

  return (
    <TextField
      fullWidth
      id="search-bar"
      sx={{ width: "100%" }}
      label="Search entries"
      aria-label="search box"
      role="search"
      margin="normal"
      placeholder="Search by instructor name, department, or interest"
      onChange={(event) => handleInputChange(event.target.value)}
    />
  );
};

export default SearchBar;
