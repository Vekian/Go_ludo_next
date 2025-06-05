"use client";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, IconButton, MenuItem } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import NotificationsList from "./NotificationsList";
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
import { useMercureSubscription } from "@/hook/UseMercureSubscription";

export default function NotificationInput({ user }: { user: User }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useMercureSubscription({
    topic: `/user/${user.id}`,
    refreshUrl: `/api/notification/token`,
    onMessage: (notif: object) => {
      const notification = notif as Notification;
      setNotifications((prevNotifications) => {
        return [notification, ...prevNotifications];
      });
    },
  });

  const fetchNotifications = useCallback(async () => {
    const response = await getNotifications();
    if (response.ok && response.data) {
      setNotifications(response.data);
    }
  }, []);
  const readAll = useCallback(async () => {
    if (notifications.some((item) => !item.read)) {
      const response = await readNotifications();
      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, read: true }))
        );
      }
    }
  }, [notifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const notificationItems = useMemo(
    () =>
      notifications.map((notification) => (
        <MenuItem key={notification.id} onClick={handleClose}>
          <Link
            href={handleUrlNotification(notification)}
            className="text-wrap text-md flex flex-col text-neutral-950"
          >
            <small>{getRelativeTime(notification.createdAt)}</small>
            <div className={notification.read ? "" : "font-semibold"}>
              {notification.content}
            </div>
          </Link>
        </MenuItem>
      )),
    [notifications, handleClose]
  );

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
          badgeContent={unreadCount}
          invisible={false}
        >
          <FontAwesomeIcon
            icon={faBell}
            className={`text-primary-950 ${
              notifications &&
              notifications.some((item) => item.read === false) &&
              "animate-shake"
            } `}
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
        {notificationItems}
      </NotificationsList>
    </div>
  );
}
