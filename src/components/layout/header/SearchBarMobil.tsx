import InputText from "@/components/ui/input/InputText";
import { GameListItem } from "@/interfaces";
import { ListPaginated } from "@/interfaces/paginator.interface";
import { searchGames } from "@/lib/api/search";
import { getImg, getLinkGame } from "@/lib/utils";
import { theme } from "@/theme/theme";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchBarMobil() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState<string | null>(null);
  const [options, setOptions] = useState<GameListItem[]>([]);

  useEffect(() => {
    if (search) {
      loadOptions(search);
    } else {
      setOptions([]);
    }
  }, [search]);

  async function loadOptions(search: string) {
    const gamesList: ListPaginated<GameListItem> = await searchGames([
      { key: "search", value: search },
    ]);
    setOptions([...gamesList.items]);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          color: theme.colors.neutral[900],
          border: "none",
        }}
      >
        <FontAwesomeIcon icon={faSearch} className="text-xl" />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: theme.colors.white,
            color: theme.colors.black,
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton>
            <InputText
              value={search ?? ""}
              id={"search"}
              onChange={setSearch}
            />
          </Toolbar>
        </AppBar>
        <List>
          {options.map((option, index) => (
            <Link
              href={getLinkGame(option)}
              key={index + option.type[0] + option.id}
              onClick={handleClose}
            >
              <ListItemButton className="flex gap-x-5">
                <Image
                  src={getImg(option.cover)}
                  alt={option.name}
                  width={25}
                  height={25}
                />
                <ListItemText
                  primary={option.name}
                  secondary={option.type === "base" ? "Jeu" : option.type}
                />
              </ListItemButton>
              {(index !== 0 || index !== options.length) && <Divider />}
            </Link>
          ))}
        </List>
      </Dialog>
    </React.Fragment>
  );
}
