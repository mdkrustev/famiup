import { Link } from "react-router-dom";
import MembersCreaeteForm from "../../../components/form/MembersCreaeteForm";
import { t } from "../../../utils/i18n"
import { ArrowLeftIcon } from "lucide-react";


export default function MembersCreate() {

    return (
        <div className="table-wrapper">
            <div className="flex flex-space">
                <h2>{t.texts.CreateNewMember}</h2>
                <div className="mb-10">
                    <Link to={'/members'} className="btn-s btn-default"><ArrowLeftIcon size={16}/>{t.buttons.BeckToUserList}</Link>
                </div>
            </div>
            <MembersCreaeteForm/>
        </div>
    );
}
