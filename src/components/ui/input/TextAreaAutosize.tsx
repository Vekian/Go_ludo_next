import {
  styled,
  TextareaAutosize as BaseTextareaAutosize,
} from "@mui/material";
import { theme as baseTheme } from "@/theme/theme";

const TextAreaAutosize = styled(BaseTextareaAutosize)(
  () => `
    box-sizing: border-box;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0;
    border: 1px solid ${baseTheme.colors.neutral[700]};

    &:hover {
      border-color: ${baseTheme.colors.primary[600]};
    }

    &:focus {
      outline: 0;
      border-color: ${baseTheme.colors.primary[600]};
    }

    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `
);

export default TextAreaAutosize;
