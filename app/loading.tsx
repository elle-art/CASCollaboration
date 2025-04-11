// Name: Loading page
// By: Danielle Stewart
// Returns "Loading......" with a dot animation
import { Typography } from "@mui/material";

export default function Loading() {
  return (
    <Typography mt={25} fontSize={70} textAlign={"center"}>
      Loading
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
    </Typography>
  );
}
