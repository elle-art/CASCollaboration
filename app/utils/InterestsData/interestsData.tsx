/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

// Array of Department names as strings
// Dynamically filled based on json file in getInterestsInformation() - {profileObj.department}
export const DEPARTMENTS: string[] = [];

// Profile object definition
export interface Profile {
  key: number;
  ulid: string;
  email: string;
  photo: string | null;
  teachingInterests: string;
  researchInterests: string;
  instructor: string;
  instructorTitle: string;
  // college: string; // should all be CAS
  department: string;
  [key: string]: any; // used to dynamically add attributes to object
}

// Array of Profile objs
export const profiles: Profile[] = [];

// function to get data from JSON data file and add to profiles []
const getInterestsInformation = async () => {
  const interestsData = require("./teacher_interests.json");

  for (const profileObj of interestsData) {
    if (profileObj.teachingInterests || profileObj.researchInterests) {
      // Ensures a profile has a teaching/research interest
      const endIdx = profileObj.email?.indexOf("@");

      // Parses email to get ulid
      profileObj.ulid = profileObj.email?.substring(0, endIdx);

      profiles.push(profileObj); // Adds profileObj to profiles []
    }

    if (
      !DEPARTMENTS.includes(profileObj.department) &&
      profileObj.department !== ""
    ) {
      DEPARTMENTS.push(profileObj.department);
    } // Fills DEPARTMENTS []
  }
  DEPARTMENTS.sort(); // Orders DEPARTMENTS alphabetically
};

getInterestsInformation();
