

export default ({players = []}) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    height: '20px',
    margin: '5px',
  }}>
    <hr style={{flexGrow: 1}}></hr>
    <span style={{
      fontSize: '0.7em',
      color: 'rgb(100 100 100)',
      fontWeight: 600
    }}
    >
      &nbsp;
      { players.length > 0 &&
        <span>{ `(${players.length})` }</span>
      } Intrested &nbsp;</span>
      <hr style={{flexGrow: 1}}></hr>
  </div>
)
