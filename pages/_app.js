import Layout from '../src/components/layouts/layout'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";

import { getUser } from '../src/api/goldenLeopardsApi';
import keys from '../src/utils/auth/storageKeys';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import '../src/components/glNavBar.css';
import '../src/components/glHome.css';
import '../src/components/next-game/glNextGameListItem.css';
import '../src/components/schedule/glSchedule.css';
import '../src/components/schedule/glScheduleListItem.css';
import '../src/components/tournaments/tournamentListItem.css';
import '../src/components/tournaments/tournaments.css';

import '../src/components/achievements/achievements.css';
import '../src/components/banner/banner.css';

import '../src/components/game-result/glGameResult.css';

import './app.css';

const groupMeAuthUrl = process.env.NEXT_PUBLIC_GROUPME_AUTH_URL;
    
export default function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const { query } =  router;
  const { access_token } = query;

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await getUserData();
    }
    fetchData();
  }, []);

  const getUserData = async () => {
    if (access_token) {
      const userFromServer = await getUser(access_token);
      setUser(userFromServer);
      setIsLoggedIn(true);
      localStorage.setItem(keys.kGLUser, JSON.stringify(userFromServer));
    } else {
      // check local storage;
      const localUser = JSON.parse(localStorage.getItem(keys.kGLUser));
      if (localUser) {
        setUser(localUser);
        setIsLoggedIn(true);
      }
    }
  }

  const handleLogin = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login();
    }
  }

  const login  = () => {
    router.push(groupMeAuthUrl)
  }

  const logout = () => {
    localStorage.removeItem(keys.kGLUser);
    setUser(null);
    setIsLoggedIn(false);
  }

  console.log(isLoggedIn);

  return (
    <Layout user={ user } isLoggedIn={ isLoggedIn } handleLogin={ handleLogin }>
      <div className="app">
        <Component { ...pageProps}/>
      </div>
    </Layout>
  )
}