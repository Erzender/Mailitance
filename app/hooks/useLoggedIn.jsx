import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedInSelector, userIdSelector} from "../redux/account/accountSelectors";
import {useEffect, useState} from "react";
import {sharedInitialFetch} from "../redux/sharedActions";

export const useLoggedIn = () => {
  const router = useRouter();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const userId = useSelector(userIdSelector);
  const [firstLoad, setFirstLoad] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedIn)
      router.push('/login');
    else if (firstLoad) {
      setFirstLoad(false);
      dispatch(sharedInitialFetch(userId));
    }
  }, [isLoggedIn, userId]);

}