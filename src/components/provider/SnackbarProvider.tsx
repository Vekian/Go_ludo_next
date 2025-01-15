"use client";
import React, { createContext, useContext, useState } from "react";
import { Alert, Snackbar, AlertColor } from "@mui/material";

interface SnackbarContextType {
  showSnackbar: (message: string, status: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbarContext must be used within SnackbarProvider");
  }
  return context;
};

const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<AlertColor>("info");

  const showSnackbar = (message: string, status: AlertColor) => {
    setMessage(message);
    setStatus(status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={status}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Export par défaut
export default SnackbarProvider;
