// Name: FilterList component
// By: Danielle Stewart
// Component that holds lists for Department filter options
import { ChangeEvent, useEffect, useState } from "react";
// Functions:
import {
  FilterOptions,
  filterProfiles,
} from "@/app/utils/functions/filterFunctions";
// Components:
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { black, red } from "@/app/utils/theme/theme";
import { DEPARTMENTS, Profile } from "@/app/utils/InterestsData/interestsData";
import { useRouter } from "next/navigation";

// Component: FilterList.tsx
// props:
//  * resultsArr - Array of profiles displayed on page.tsx
//  * filterSelections - Object holding the user's filter choices (search string and departments [])
//  * setFilterSelections - sets the value of filterSelections for global use
//  * onFilterChange - passes an updated Profile[] to page.tsx when a filter is changed
const FilterList = (props: {
  resultsArr: Profile[];
  filterSelections: FilterOptions;
  setFilterSelections: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onFilterChange: (filteredResults: Profile[]) => void;
}) => {
  const router = useRouter();
  // Functions for managing collapsible lists
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleFiltersClick = () => {
    setFiltersOpen((prevState) => !prevState);
  };

  const handleDepartmentClick = () => {
    setOpen1((prevState) => !prevState);
  };
  // Functions for managing the department list and adding search parameter the URL
  const [searchParam, setSearchParam] = useState<string>("");
  const [, setDepts] = useState<string[]>([]);

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    type: "departments"
  ) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    props.setFilterSelections((prevSelections) => {
      const updatedSelections = isChecked
        ? [...prevSelections[type], value]
        : prevSelections[type].filter((item) => item !== value);

      return {
        ...prevSelections,
        [type]: updatedSelections, // Updates props.filterSelections.departments
      };
    });

    setDepts((prevSelections) => { // same logic as setFilterSelections, but updates the URL with search parameters
      const updatedSelections = isChecked
        ? [...prevSelections, value]
        : prevSelections.filter((item) => item !== value);

      const searchParams = new URLSearchParams();
      updatedSelections.forEach((d) => searchParams.append("department", d)); // Adds each checked department to URLSearchParamsObj

      setSearchParam(() => {
        return `?${searchParams.toString()}`; // Sets searchParam string
      });

      return updatedSelections;
    });
  };

  // Filters results based on SearchBar and FilterList inputs
  const filteredResults = filterProfiles(
    props.filterSelections.departments,
    props.filterSelections.search
  );
  // Updates the displayed results when a filter has been changed
  useEffect(() => {
    props.onFilterChange(filteredResults);
  }, [props.filterSelections, props.onFilterChange]);

  useEffect(() => {
    // Navigate to the updated search param
    router.push(searchParam);
  }, [searchParam]);

  return (
    <Card sx={{ width: "100%", color: red }}>
      <CardContent>
        <List
          sx={{
            marginTop: "-25px",
            marginBottom: "-30px",
            width: "100%",
            minWidth: 225,
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {/* ------------------------ Filters Header ------------------------ */}
          <ListItemButton onClick={() => handleFiltersClick()}>
            <ListItemText primary="Filters" />
            {filtersOpen ? <RemoveIcon /> : <AddIcon />}
          </ListItemButton>
          <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
            <List
              sx={{ marginLeft: "2%" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {/* ------------------------ Department Filter ------------------------ */}
              <ListItemButton onClick={() => handleDepartmentClick()}>
                <ListItemText primary="Department" />
                {open1 ? <RemoveIcon /> : <AddIcon />}
              </ListItemButton>
              <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" sx={{ marginLeft: "2%", color: black }}>
                  <FormGroup
                    sx={{
                      height: "400px",
                      overflowX: "auto",
                      paddingLeft: "20px",
                    }}
                  >
                    {DEPARTMENTS.map((department: string) => (
                      <FormControlLabel
                        key={department}
                        control={
                          <Checkbox
                            sx={{ padding: "5px", paddingBottom: "10px" }}
                            value={department}
                            onChange={(event) =>
                              handleCheckboxChange(event, "departments")
                            }
                            checked={props.filterSelections.departments.includes(
                              department
                            )}
                          />
                        }
                        label={department}
                      />
                    ))}
                  </FormGroup>
                </List>
              </Collapse>
              {/* ------------------------ ***Order By Filter ------------------------ */}
              {/* <ListItemButton onClick={() => handleOrderByClick(!open2)}>
            <ListItemText primary="Order By" />
            {open2 ? <RemoveIcon /> : <AddIcon />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" sx={{ marginLeft: "15%" }}>
              <RadioGroup
                defaultValue={"Course and Section Number"}>
                {ORDER_OPTIONS.map((sortby: string) => (
                  <FormControlLabel
                    key={sortby}
                    value={sortby}
                    control={
                      <Radio/>
                    }
                    label={sortby}
                    onChange={() => handleRadioChange(sortby)}
                  />
                ))}
              </RadioGroup>
            </List>
          </Collapse> */}
            </List>
          </Collapse>
        </List>
      </CardContent>
    </Card>
  );
};

export default FilterList;
