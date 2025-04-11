// utils for filter-related functions and constants
import { Profile, profiles } from "../InterestsData/interestsData";

// Definition of FilterOptions object - used by setFilterSelections
export interface FilterOptions {
  departments: string[];
  search: string;
}

// Array for order by filter options on results page ***edit/delete
export const ORDER_OPTIONS = [
  "Course and Section Number",
  "Instructor Name",
  "Course Name",
];

// function for FilterCard and SearchBar - verifies the Department and the user search input of the profiles, returned in FilteredResults
export const filterProfiles = (departments: string[], search: string) => {
  let filteredResults: Profile[] = [];

  if (departments.length > 0) { // If a department is checked
    if (search === "") {
      filteredResults = [];
    }

    for (const selection of departments) {
      // for each checked box
      filteredResults.push(
        ...profiles.filter((profile) => profile.department === selection)
      ); // filter results by departments
    }

    if (search != "") {
      filteredResults = filteredResults.filter(
        (profile: Profile) =>
          profile.instructor.toLowerCase().includes(search.toLowerCase()) ||
          profile.teachingInterests
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          profile.researchInterests
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          profile.department.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    return filteredResults;
  } else { // No departments are checked
      filteredResults = profiles.filter(
        (profile: Profile) =>
          profile.instructor.toLowerCase().includes(search.toLowerCase()) ||
          profile.teachingInterests
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          profile.researchInterests
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          profile.department.toLowerCase().includes(search.toLowerCase())
      );
    
    return filteredResults;
  }
};
