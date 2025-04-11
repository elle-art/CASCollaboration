import { black, red } from "@/app/utils/theme/theme";
import { Link, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

const InstructorInfo = (props: { name: string; title: string, email: string }) => {
  return (
    <div>
      {/* --------------------- Instructor Name --------------------- */}
      <Typography
        variant="h4"
        sx={{ fontSize: { phone: "2em", xs: "1.25em" } }}
      >
        {props.name}
      </Typography>
      {/* --------------------- Instructor Title --------------------- */}
      <Typography
        sx={{
          fontSize: { phone: "20px", xs: "13px" },
          color: black,
        }}
        gutterBottom
      >
        {props.title}
      </Typography>
      {/* --------------------- Email Text (Link) --------------------- */}
      <Link
        href={`mailto:${props.email}`}
        underline="none"
        target="_blank"
        rel="noopener"
        gutterBottom
        sx={{
          fontSize: {
            phone: "1.1em",
            xs: "13px",
          },
          color: red,
        }}
      >
        {props.email}
        <div style={visuallyHidden}>
          Opens email draft to {props.name} in new window
        </div>
      </Link>
    </div>
  );
};

export default InstructorInfo;
