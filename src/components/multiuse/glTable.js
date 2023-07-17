
import {
  Container,
} from 'react-bootstrap';


const GLTable = (props) => {
  const { data, GenericListItem } = props;
  return (
    <Container fluid>
      { data.map((d, i) => <GenericListItem 
        key={ `tli-${i}` } 
        record={ d }
        {...props}
      ></GenericListItem>)}
    </Container>
  );
}

export default GLTable;