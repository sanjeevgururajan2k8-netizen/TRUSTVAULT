import { initials } from "../../utils/helpers";

export default function UserAvatar({ name, size = "md" }) {
  const cls = size === "sm" ? "avatar avatar-sm" : size === "lg" ? "avatar avatar-lg" : "avatar";
  return <div className={cls}>{initials(name || "?")}</div>;
}
