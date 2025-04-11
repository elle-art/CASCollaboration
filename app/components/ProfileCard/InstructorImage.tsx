import theme from "@/app/utils/theme/theme";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";

const InstructorImage = (props: { img: string; name: string }) => {
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.down("phone"));

  return (
    <div>
      {isPhone ? (
        <div>
          {isXs ? (
            <Image // xs size
              src={`https://illinois-state-dm-s3.imgix.net/${props.img}`}
              width={80}
              height={135}
              alt={`${props.name}`}
              style={{
                objectFit: "cover",
                marginRight: "10px",
                borderRadius: "10px",
                boxShadow:
                  "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          ) : (
            <Image // phone size
              src={`https://illinois-state-dm-s3.imgix.net/${props.img}`}
              width={100}
              height={170}
              alt={`${props.name}`}
              style={{
                objectFit: "cover",
                marginRight: "25px",
                borderRadius: "10px",
                boxShadow:
                  "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            />
          )}
        </div>
      ) : (
        <Image // >phone size
          src={`https://illinois-state-dm-s3.imgix.net/${props.img}`}
          width={145}
          height={250}
          alt={`${props.name}`}
          style={{
            objectFit: "cover",
            marginRight: "25px",
            borderRadius: "10px",
            boxShadow:
              "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      )}
    </div>
  );
};

export default InstructorImage;
