import Route from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReset, useUser } from "../services/hooks";

export default function Header() {
    const [user, setUser] = useState({});

    useEffect(() => {
        async function Exec() {
            const user = await useUser();
            setUser(user);
        }
        Exec();
    }, [])

    const Logout = () => {
        useReset();
        Route.push('/login');
    }

    return (
        <header>
            {
                user ?
                <>
                    <Link href="/profile"><a>profile</a></Link>
                    {user.type !== 'employee'   ? <Link href="/job"><a>post job</a></Link> : null} {/* show post page to admin or employer only */}
                    <Link href="/work-place"><a>work place</a></Link>
                    <a href="#" onClick={Logout}>logout</a>
                </>
                :
                <>
                    <Link href="/login"><a>login</a></Link>
                    <Link href="/employee/register"><a>employee register</a></Link>
                    <Link href="/employer/register"><a>employer register</a></Link>
                </>
            }
            <Link href="/help"><a>FAQ</a></Link>

            <style jsx>{`
                header {
                    display: flex;
                    margin: 1em;
                    justify-content: flex-end;
                }
                a {
                    padding: 4px 9px;
                    margin: 5px 1em;
                    color: white;
                    background: #444;
                    border-radius: 4px;
                    transition: all .3s ease;
                }
                a:hover {
                    color: #444;
                    background: #FFF;
                    text-decoration: underline;
                }
            `}</style>
        </header>
    )
}
