import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SliderThumb } from "@mui/material";

interface RangeThumbProps extends React.HTMLAttributes<unknown> {
  "data-index"?: number; // Ajout de la propriété manquante
}
export default function RangeThumb(props: RangeThumbProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      {props["data-index"] === 0 ? (
        <FontAwesomeIcon
          icon={faMinus}
          className="MuiSlider-thumbIcon text-white"
        />
      ) : (
        <FontAwesomeIcon
          icon={faPlus}
          className="MuiSlider-thumbIcon text-white"
        />
      )}
    </SliderThumb>
  );
}
