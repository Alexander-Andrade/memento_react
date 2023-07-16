import logo from './logo.svg';
import './App.css';
import {Col, Row} from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="container-fluid">
      <Row>
          <Col>
              Bookmark
          </Col>
          <Col>
              Topic
          </Col>
          <Col>
              Entry
          </Col>
          <Col>
              Entry Details
          </Col>
          <Col>
              Calendar
          </Col>
      </Row>
    </div>
  );
}

export default App;
