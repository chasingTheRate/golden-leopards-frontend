import React, { useState, useEffect, useRef } from "react";

import { getLeagueSchedule } from '../../src/api/goldenLeopardsApi';
import GLSchedule from '../../src/components/schedule/glSchedule';
import GLLPageContainer from "../../src/components/multiuse/glPageContainer";

export async function getServerSideProps(context) {

  const id = context.params.id
  const ssLeagueSchedule = await getLeagueSchedule(id);
  
  return { props: { ssLeagueSchedule } }
}

const GLLeague = ({ ssLeagueSchedule = [] }) => {
  return (
    <GLLPageContainer>
      <GLSchedule schedule={ ssLeagueSchedule }></GLSchedule>
    </GLLPageContainer>
    );
}

export default GLLeague;
