import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedInSelector, loadedSelector, userIdSelector} from "../redux/account/accountSelectors";
import {useEffect, useState} from "react";
import {sharedInitialFetch} from "../redux/sharedActions";

export const useLoggedIn = () => {
  const router = useRouter();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const isLoaded = useSelector(loadedSelector)
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoggedIn)
      router.push('/login');
    else if (!isLoaded) {
      dispatch(sharedInitialFetch(userId));
    }
  }, [isLoggedIn, userId]);

}