import { red, white } from "@/app/utils/theme/theme";
import { Box, Typography } from "@mui/material";

const DeptTag = (props: { department: string }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography
        sx={{
          fontSize: { sm: "18px", phone: "14px", xs: "12px" },
          backgroundColor: red,
          color: white,
          borderRadius: "25px",
          paddingLeft: "10px",
          paddingRight: "10px",
          marginRight: "5px",
          boxShadow:
            "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        {props.department}
      </Typography>
    </Box>
  );
};

export default DeptTag;
