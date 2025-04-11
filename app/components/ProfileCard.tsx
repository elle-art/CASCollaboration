// Name: ProfileCard Component
// By: Danielle Stewart
// Component that displays the information of a given profile
// Information: Department, photo, instructor name, instructor title, email, CAS profile link, teaching interests, and research interests
"use client";
import { memo } from "react";
import { Profile } from "../utils/InterestsData/interestsData";
import theme from "@/app/utils/theme/theme";
// Components:
import {
  Box,
  Card,
  CardContent,
  Grid2,
  useMediaQuery,
} from "@mui/material";
import InstructorImage from "./ProfileCard/InstructorImage";
import InstructorInfo from "./ProfileCard/InstructorInfo";
import CardButtons from "./ProfileCard/CardButtons";
import InterestsDropdown from "./ProfileCard/InterestsDropdown";
import DeptTag from "./ProfileCard/DeptTag";

const ProfileCard = memo(function ProfileCard(props: { profile: Profile }) {
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const isHEIC = props.profile.photo?.endsWith(".heic"); // next/image does not support .heic files

  return (
    <Card
      sx={{
        marginBottom: "3%",
        height: { xs: "550px", sm: "505px", md: "355px" },
      }}
    >
      <CardContent>
        <Grid2 container spacing={2} paddingTop={1}>
          {/* --------------------- Card Text --------------------- */}
          <Grid2 size={{ md: 5, xs: 12 }} paddingRight={1}>
            {/* -------------------Corner Tag: Department --------------------- */}
            <Grid2 size={{ xs: 12 }} paddingRight={1}>
              <DeptTag department={props.profile.department} />
            </Grid2>
            <Grid2 display={"flex"} flexDirection={"row"} mt={3}>
              {/* --------------------- Instructor Photo --------------------- */}
              {props.profile.photo && !isHEIC ? (
                <InstructorImage
                  img={props.profile.photo}
                  name={props.profile.instructor}
                />
              ) : (
                ""
              )}
              <Box
                sx={{ height: { phone: 250, xs: 170 } }}
                width={"100%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                overflow={"hidden"}
              >
                {/* --------------------- Instructor Information (name, title, and email) --------------------- */}
                <InstructorInfo
                  name={props.profile.instructor}
                  title={props.profile.instructorTitle}
                  email={props.profile.email}
                />
                {/* --------------------- Buttons (>=xs screens)--------------------- */}
                {isPhone ? (
                  ""
                ) : (
                  <Box display={"flex"} flexDirection={"row"}>
                    <CardButtons
                      ulid={props.profile.ulid}
                      email={props.profile.email}
                    />
                  </Box>
                )}
              </Box>
            </Grid2>
            {/* --------------------- Buttons (<=xs screens)--------------------- */}
            {isPhone ? (
              <Box
                display={"flex"}
                flexDirection={"row"}
                sx={{ mt: { phone: -9, xs: -3 } }}
              >
                <CardButtons
                  ulid={props.profile.ulid}
                  email={props.profile.email}
                />
              </Box>
            ) : (
              ""
            )}
          </Grid2>
          {/* --------------------- Interests Dropdowns --------------------- */}
          <Grid2
            container
            size={{ md: 7, xs: 12 }}
            sx={{
              height: { sm: 175, phone: 100, xs: 110 },
            }}
          >
            <InterestsDropdown teachingInterests={props.profile.teachingInterests} researchInterests={props.profile.researchInterests} />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
});

export default ProfileCard;
