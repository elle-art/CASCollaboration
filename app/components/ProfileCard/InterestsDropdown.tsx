import {
  Collapse,
  Grid2,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import theme from "@/app/utils/theme/theme";

const InterestsDropdown = (props: {
  teachingInterests?: string;
  researchInterests?: string;
}) => {
  const isSm = useMediaQuery(theme.breakpoints.down("md"));

  // Functions for managing collapsible lists
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);

  const handleTIClick = () => {
    setOpen1((prevState) => !prevState);
  };

  const handleRIClick = () => {
    setOpen2((prevState) => !prevState);
  };
  return (
    <List sx={{ width: "100%" }}>
      {/* --------------------- Teaching Interests Dropdown --------------------- */}
      {props.teachingInterests ? (
        <Grid2 size={{ xs: 12 }}>
          <ListItemButton
            onClick={() => handleTIClick()}
            sx={{
              borderRadius: "10px",
              boxShadow:
                "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <ListItemText primary="Teaching Interests" />
            {open1 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </ListItemButton>
          <Collapse in={open1} timeout="auto" unmountOnExit>
            <List
              component="div"
              sx={{
                marginLeft: "5%",
                marginTop: "3px",
                maxHeight:
                  open2 && props.researchInterests
                    ? isSm
                      ? 50
                      : 100
                    : isSm
                    ? 100
                    : 200,
                overflowY: "auto",
              }}
            >
              <Typography
                dangerouslySetInnerHTML={{
                  __html: props.teachingInterests,
                }}
              ></Typography>
            </List>
          </Collapse>
        </Grid2>
      ) : (
        ""
      )}
      {/* --------------------- Research Interests Dropdown --------------------- */}
      {props.researchInterests ? (
        <Grid2 size={{ xs: 12 }}>
          <ListItemButton
            onClick={() => handleRIClick()}
            sx={{
              marginTop: "10px",
              borderRadius: "10px",
              boxShadow:
                "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <ListItemText primary="Research Interests" />
            {open2 ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </ListItemButton>
          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List
              component="div"
              sx={{
                marginLeft: "5%",
                marginTop: "3px",
                maxHeight:
                  open1 && props.teachingInterests
                    ? isSm
                      ? 50
                      : 100
                    : isSm
                    ? 100
                    : 200,
                overflowY: "auto",
              }}
            >
              <Typography
                dangerouslySetInnerHTML={{
                  __html: props.researchInterests,
                }}
              ></Typography>
            </List>
          </Collapse>
        </Grid2>
      ) : (
        ""
      )}
    </List>
  );
};

export default InterestsDropdown;
