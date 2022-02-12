
import {
  Container,
  Button,
  Badge
} from 'react-bootstrap';
import moment from 'moment';

const TournamentScheduleTable = ({ addPlayerToTournament, data }) => {

  const formatDate = (record) => {
    const { ['Start Date']: startDate, ['End Date']: endDate } = record;

    if (!endDate || startDate === endDate) {
      return moment(startDate, 'YYYY-MM-DD').format('MMM DD');
    }

    return `${moment(startDate, 'YYYY-MM-DD').format('MMM DD')}-${moment(endDate, 'YYYY-MM-DD').format('DD')}`;
  };

  const getMonth = (record) => {
    const { ['Start Date']: startDate, ['End Date']: endDate } = record;

    const startMonth = moment(startDate, 'YYYY-MM-DD').format('MMM');
    const endMonth = moment(endDate, 'YYYY-MM-DD').format('MMM');

    if (startMonth === endMonth) {
      return startMonth;
    }

    return `${startMonth}-${endMonth}`;
  };

  const getDates = (record) => {
    let { ['Start Date']: startDate, ['End Date']: endDate } = record;

    startDate = moment(startDate, 'YYYY-MM-DD').format('DD');
    endDate = moment(endDate, 'YYYY-MM-DD').format('DD');

    if (startDate === endDate) {
      return startDate;
    }

    return `${startDate}-${endDate}`;
  };

  return (
    <Container 
      fluid 
      style={{ 
        padding: 3, 
      }}>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        { data.map((d, i) => {
          return (
          <div 
          key={`tournament-record-${i}`}
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            padding: 12,
            marginBottom: '12px',
            //borderColor: 'lightGray', 
            //borderStyle: 'solid', 
            borderRadius: '5px',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
          }}>
            <div style={{ 
            display: 'flex',
          }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px', textAlign:'center', lineHeight: '0.8em' }}>
                <span
                  style={{
                    fontWeight: 600, 
                    fontSize: '0.8em',
                  }}
                >{ getMonth(d) }<br></br>
                { getDates(d) }</span>
              </div>
              <div style={{ flexGrow: 1, lineHeight: '1.1em'}}>
                  <a href={ d.Url }>{ d.Name }</a>
                  <br></br>
                  <span
                    style={{ 
                      fontSize: '0.8em',
                      color: 'rgba(0, 0, 0, 0.5)',
                      fontWeight: 500
                  }}
                  >{ d.Location }</span>
              </div>
              <div style={{width: '50px'}}>
                <Button onClick={ (e) => addPlayerToTournament(d) }><i className="bi bi-plus-circle"></i></Button>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'start', height: '40px', alignItems: 'center'}}>
                { d.interested && d.interested.map((i, index) => (
                  <div key={`interested-badge-${index}`} style={{ marginRight: '3px'}}>
                    <Badge>{ i }</Badge>
                  </div>
                ))}
            </div>
            </div>
          </div>
          )
        })}
      </div>
    </Container>
  );
}

export default TournamentScheduleTable;