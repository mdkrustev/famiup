import { EllipsisVerticalIcon } from "lucide-react";
import { useFetch } from "../../utils/hooks";
import type { IUser } from "../../utils/interfaces";
import { t } from "../../utils/i18n"


export default function MeberList() {
    const { data: accounts, loading, error } = useFetch<IUser[]>("/api/user/accounts");


    if (loading) return <p>{t.messages.Loading}...</p>;
    if (error) return <p>{t.messages.Error}: {error.message}</p>;
    return (
        <table className="custom-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t.texts.Name}</th>
                    <th>{t.texts.Email}</th>
                    <th>{t.texts.Role}</th>
                    <th style={{ width: '20px' }}></th>
                </tr>
            </thead>
            <tbody>
                {accounts.map((u, idx) => (
                    <tr key={u.id}>
                        <td>{idx + 1}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.email}</td>
                        <td>
                            <EllipsisVerticalIcon size={18} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

}