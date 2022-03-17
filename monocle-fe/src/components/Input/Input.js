import PropTypes from "prop-types";

// Components
import { TextField } from "@mui/material";

export function Input({ value, placeholder, onChange, ...rest }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          color: "custom.black",
          padding: "0 0 0 20px",
          height: 54,
          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: ({ palette }) => palette.custom.black,
              borderWidth: 2,
            },
          },
        },
        "& input": {
          padding: 0,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: 2,
          borderColor: ({ palette }) => palette.custom.black,
          borderWidth: 2,
        },
        "&&& .Mui-focused fieldset": {
          borderColor: ({ palette }) => palette.custom.black,
          borderWidth: 2,
        },
        ...rest.sx
      }}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

Input.defaultProps = {
  value: "",
  onChange: () => {},
  placeholder: "",
};
