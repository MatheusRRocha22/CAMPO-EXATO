import { useState } from "react";

const colors = ["f44336", "2196f3", "4caf50", "ff9800", "9c27b0", "ff5722"];

export default function Avatar({ user, size = 40 }) {
  const [imgError, setImgError] = useState(false);

  const name = user.displayName || "U";
  const initial = name.charAt(0).toUpperCase();

  const bgColor =
    colors[
      user.uid
        ? user.uid.charCodeAt(0) % colors.length
        : Math.floor(Math.random() * colors.length)
    ];

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    objectFit: "cover",
    fontSize: size / 2,
    fontWeight: "bold",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    overflow: "hidden",
    userSelect: "none",
    border: "3px solid green",
  };

  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=${bgColor}&color=fff&size=${size}`;

  return imgError || !user.photoURL ? (
    <img
      src={fallbackUrl}
      alt={name}
      style={avatarStyle}
      onError={() => setImgError(true)}
    />
  ) : (
    <img
      src={user.photoURL}
      alt={name}
      style={avatarStyle}
      onError={() => setImgError(true)}
    />
  );
}
