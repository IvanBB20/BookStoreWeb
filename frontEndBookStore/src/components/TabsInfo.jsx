import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function TabsInfo() {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
        Show Books
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Show Cart
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

export default TabsInfo;