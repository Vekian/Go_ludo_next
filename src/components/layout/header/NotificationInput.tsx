"use client";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, IconButton, MenuItem } from "@mui/material";
import React, { useEffect } from "react";
import NotificationsList from "./NotificationsList";
import { EventSourcePolyfill } from "event-source-polyfill";
import { User } from "next-auth";
import { Notification } from "@/interfaces/notification.interface";
import {
  getNotifications,
  readNotifications,
} from "@/lib/api/server/notification";
import Link from "next/link";
import { handleUrlNotification } from "@/lib/notification/notification";
import { theme } from "@/theme/theme";
import { getRelativeTime } from "@/lib/date";

export default function NotificationInput({ user }: { user: User }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [mercureToken, setMercureToken] = React.useState<string>();
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (!mercureToken) {
      fetchNotifications(false);
    } else {
      const eventSource = new EventSourcePolyfill(
        `${process.env.NEXT_PUBLIC_MERCURE_URL}?topic=/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${mercureToken}`,
          },
        }
      );

      eventSource.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response?.new === true) {
          fetchNotifications(true);
        }
      };

      return () => {
        eventSource.close();
      };
    }
  }, [mercureToken]);

  const fetchNotifications = async (tokenCreated: boolean) => {
    const response = await getNotifications(tokenCreated);
    if (response.ok && response.data?.token) {
      if (response.data.token) {
        setMercureToken(response.data.token);
      }
      if (response.data.notifications) {
        setNotifications(response.data.notifications);
      }
    }
  };
  const readAll = async () => {
    if (notifications.some((item) => item.read === false)) {
      const response = await readNotifications();
      if (response.ok) {
        const updatedNotifications = notifications.map((notification) => ({
          ...notification,
          read: true,
        }));
        setNotifications(updatedNotifications);
      }
    }
  };

  return (
    <div className="me-12">
      <IconButton
        aria-label="fingerprint"
        color="primary"
        onClick={handleClick}
      >
        <Badge
          color="primary"
          overlap="circular"
          badgeContent={
            notifications.filter((notification) => notification.read === false)
              .length
          }
          invisible={false}
        >
          <FontAwesomeIcon
            icon={faBell}
            className="text-primary-950 animate-shake"
            size="lg"
          />
        </Badge>
      </IconButton>
      <NotificationsList
        id="demo-customized-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={readAll}
        MenuListProps={{
          sx: {
            backgroundColor: theme.colors.primary[50],
            maxWidth: 250,
          },
        }}
      >
        {notifications.map((notification) => (
          <MenuItem key={notification.content} onClick={handleClose}>
            <Link
              href={handleUrlNotification(notification)}
              className="text-wrap text-md flex flex-col text-neutral-950"
            >
              <small>{getRelativeTime(notification.createdAt)}</small>
              <div className={`${notification.read ? "" : "font-semibold"}`}>
                {notification.content}
              </div>
            </Link>
          </MenuItem>
        ))}
      </NotificationsList>
    </div>
  );
}
