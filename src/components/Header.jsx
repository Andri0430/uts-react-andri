import { Link, NavLink } from "react-router-dom";
import Button from "./Button";

export default function Header() {
  return (
    <header>
      <Link to={"/"}>
        <div>Title</div>
      </Link>
      <nav>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/About"}>About</NavLink>
        <NavLink to={"/Contact"}>Contact</NavLink>
      </nav>
      <Button>Login</Button>
    </header>
  );
}
