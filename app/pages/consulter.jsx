import {Dashboard} from "../views/Dashboard/Dashboard";
import {useLoggedIn} from "../hooks/useLoggedIn";

export default function IndexPage() {
  useLoggedIn();
  return <Dashboard/>;
}