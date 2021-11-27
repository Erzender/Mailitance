import {Logout} from "../views/Logout/Logout";
import {useLoggedIn} from "../hooks/useLoggedIn";

export default function IndexPage() {
  useLoggedIn();
  return <Logout/>;
}