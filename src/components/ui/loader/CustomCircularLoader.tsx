"use client";
import { styled } from "@mui/material/styles";
import { theme } from "@/theme/theme";
import { CircularProgress } from "@mui/material";

const CustomCircularLoader = styled(CircularProgress)({
  color: theme.colors.primary[900],
});

export default CustomCircularLoader;
