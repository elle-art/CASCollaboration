import { BootstrapTooltip, StyledButton } from "@/app/utils/theme/theme";
import { Button } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import EmailIcon from "@mui/icons-material/Email";
// Constants:
const PROFILE_PAGE_LINK =
  "https://cas.illinoisstate.edu/faculty-staff/profile/?ulid=";

const CardButtons = (props: { ulid: string; email: string }) => {
  // Function for "View Full Profile" button
  const handleClick = () => {
    window.open(`${PROFILE_PAGE_LINK}${props.ulid}`, "_blank");
  };
  // Function for "Email" button
  const sendEmail = () => {
    window.open(`mailto:${props.email}`, "_blank");
  };

  return (
    <div style={{ width: "100%" }}>
      {/* --------------------- Email Button --------------------- */}
      <BootstrapTooltip title={`mailto: ${props.email}`} arrow placement="top">
        <StyledButton
          onClick={sendEmail}
          sx={{
            width: "20%",
            fontSize: "13.5px",
            borderRadius: "10px",
            marginRight: "10px",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={visuallyHidden}> External link</div>
          <EmailIcon sx={{ verticalAlign: "middle" }} />
        </StyledButton>
      </BootstrapTooltip>
      {/* --------------------- Profile Page Button --------------------- */}
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          width: { lg: "75%", md: "70%", phone: "75%", xs: "70%" },
          height: "50px",
          fontSize: "13.5px",
          borderRadius: "10px",
        }}
      >
        <div style={visuallyHidden}> External link</div>View full profile
      </Button>
    </div>
  );
};

export default CardButtons;
