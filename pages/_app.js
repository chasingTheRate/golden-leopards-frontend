import Layout from '../src/components/layouts/layout'

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import '../src/components/glNavBar.css';
import '../src/components/glHome.css';
import '../src/components/next-game/glNextGameListItem.css';
import './schedule/glSchedule.css';
import './schedule/glScheduleListItem.css';
import './tournaments/tournamentListItem.css';
import './tournaments/tournaments.css';


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