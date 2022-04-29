import Layout from '../src/components/layouts/layout'

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

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <div className="app">
        <Component {...pageProps} />
      </div>
    </Layout>
  )
}