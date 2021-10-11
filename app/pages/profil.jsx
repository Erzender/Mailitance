import {useLoggedIn} from "../hooks/useLoggedIn";
import {Profile} from "../views/Profile/Profile";

export default function IndexPage() {
  useLoggedIn();
  return <Profile/>;
}