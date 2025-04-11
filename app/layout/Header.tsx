// Name: Header component
// By: Danielle Stewart
// Displays and centers a header image
"use client";
// Components:
import { AppBar, Grid2, Typography, useMediaQuery } from "@mui/material";
import theme, { red, white } from "../utils/theme/theme";
import Image from "next/image";
import Logo from "../utils/images/illinoisstate-seal.svg";
import SmallLogo from "../utils/images/reduced-app-seal.svg";
<link rel="stylesheet" href="https://use.typekit.net/xri5xvk.css"></link>;

const Header = () => {
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="relative" sx={{ backgroundColor: red }}>
      <Grid2
        container
        alignItems="flex-start"
        justifyContent="flex-start"
        width={{ xs: 400, sm: 850 }}
        mt={1}
        padding={2}
        sx={{ height: "100%"}}
      >
          <Grid2  size={{ xs: 3 }}>
            { isPhone ? (
              <Image
                src= {SmallLogo}
                width={isPhone ? 49 : 100}
                height={isPhone ? 49 : 100}
                alt=""
                style={{ maxHeight: "110px", marginLeft: isPhone ? 0 : 20 }}
              />
            ) : (
              <Image
                src= {Logo}
                width={isPhone ? 49 : 100}
                height={isPhone ? 49 : 100}
                alt=""
                style={{ maxHeight: "110px", marginLeft: isPhone ? 0 : 20 }}
              />
            )}
          </Grid2>
          <Grid2 mt={.5} size={{ xs: 9}}>
            <Typography
              sx={{
                fontFamily: "ISULogoSerif",
                fontVariant: "small-caps",
                fontWeight: 700,
                fontSize: {
                  xs: "1.35rem",
                  sm: "3rem",
                },
                color: white,
              }}
            >
              CAS Collaboration System
            </Typography>
            <Typography
              sx={{
                mt: { xs: -0.5 },
                fontFamily: `"ISUSerifItalic"`,
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: { xs: ".8rem", sm: "2.5vw", md: "2rem" },
                color: white,
              }}
            >
              Illinois State University
            </Typography>
          </Grid2>
        </Grid2>
    </AppBar>
  );
};

export default Header;
