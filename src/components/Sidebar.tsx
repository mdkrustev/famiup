import { Link } from "react-router-dom";
import { t } from "../utils/i18n";
import { LayoutDashboardIcon, Users2Icon } from "lucide-react";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <Link className={'active'} to="/dashboard">
                <LayoutDashboardIcon size={16} />
                {t.links.Dashbord}
            </Link>
            <Link to="/accounts">
                <Users2Icon size={16} />
                {t.links.Accounts}</Link>
        </div>
    )
}