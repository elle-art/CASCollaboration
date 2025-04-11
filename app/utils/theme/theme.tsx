"use client";
import {
  createTheme,
  IconButton,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Radio,
} from "@mui/material";

// Color HEX codes
export const red = "#CC0000";
export const darkred = "#990000";
export const black = "#000000";
export const white = "#FFFFFF";

// Styled Components:
export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: 15,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
}));

export const StyledButton = styled(IconButton)({
  width: "50px",
  height: "50px",
  backgroundColor: red,
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: darkred,
  },
});

export const StyledRadio = styled(Radio)({
  color: "#FFFFFF",
  "&.Mui-checked": {
    color: "#FFFFFF",
  },
});

// Overrides default Select, Button, Card, CardContent styles
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      phone: 400,
      sm: 680,
      md: 1085,
      avg: 1200,
      lg: 1350,
      xl: 1536,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px",
            color: black,
            "&.Mui-focused fieldset": {
              borderColor: red,
              color: red,
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: red,
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          "& .MuiSvgIcon-root": {
            color: black,
            fontSize: 35,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: black,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: black,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {},
        contained: {
          backgroundColor: black,
          color: white,
          boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: darkred,
          },
        },
        text: {
          color: red,
          "&:hover": {
            color: darkred,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "2px solid #000000",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "20px",
        },
      },
    },
  },
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    avg: true;
    phone: true;
  }
}

export default theme;
