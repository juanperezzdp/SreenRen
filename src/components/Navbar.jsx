import Link from "next/link";
import { getServerSession } from "next-auth";

async function Navbar() {
  const session = await getServerSession();

  return (
    <nav className="text-white p-4 fixed z-10 w-full">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl">ScreenRen</h1>
        </Link>

        <ul className="flex gap-x-2">
          {session ? (
            <>
              <li className="px-3 py-1">
                <Link href="/dashboard/profile">Signout</Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-white  px-5 py-1 rounded-md border-2 border-transparent hover:border-white focus:ring-1 focus:outline-none focus:ring-white ">
                <Link href="/login">Login</Link>
              </li>
              <li className="text-white  px-5 py-1 rounded-md border-2 border-transparent hover:border-white focus:ring-1 focus:outline-none focus:ring-white ">
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
