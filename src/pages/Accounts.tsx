import { useFetch } from "../utils/hooks";
import type { IUser } from "../utils/interfaces"

export default function Accounts() {
    const { data: accounts, loading, error } = useFetch<IUser[]>("/api/user/accounts");

    if (loading) return <p>Зареждане...</p>;
    if (error) return <p>Грешка: {error.message}</p>;

    return (<>
        <h1>Test</h1>
        {accounts.map(u => (
            <div key={u.id}>{u.name}</div>
        ))}
    </>)
}