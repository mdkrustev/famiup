import { Link, useLocation } from "react-router-dom";
import { t } from "../utils/i18n";
import { LayoutDashboardIcon, Users2Icon } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="sidebar">
      <Link
        className={path.startsWith("/dashboard") || path === "/" ? "active" : ""}
        to="/dashboard"
      >
        <LayoutDashboardIcon size={16} />
        {t.links.Dashbord}
      </Link>

      <Link
        className={path.startsWith("/members") ? "active" : ""}
        to="/members"
      >
        <Users2Icon size={16} />
        {t.links.Accounts}
      </Link>
    </div>
  );
}
