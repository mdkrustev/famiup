
import { Link } from "react-router-dom";
import MemberList from "../../../components/display/MemberList";
import { t } from "../../../utils/i18n"


export default function MeberDisplay() {

    return (
        <div className="table-wrapper">
            <div className="flex flex-space">
                <h2>{t.texts.MemberList}</h2>
                <div className="mb-10">
                    <Link to={'/members/create'} className="btn-s btn-default">+ {t.buttons.AddNewMember}</Link>
                </div>
            </div>
            <MemberList/>
        </div>
    );
}