import React from 'react';
import {Menu} from 'semantic-ui-react';

import logo from '../../../assets/images/dnt-logo-circle.svg';

const Header = ({user}) => (
  <header>
    <Menu attached="top" fixed="top">Hello</Menu>
    <div className="ui fixed top inverted menu">
      <div className="ui container">
        <a href="https://www.dnt.no/sherpa" className="header item logo">
          <img src={logo} />
        </a>
        <Menu.Menu position="right">
          {
            user && user.isAuthenticated ?
              <Menu.Item link href="/logg-ut">
                Logget inn som {`${user.data.fornavn} ${user.data.etternavn}`} – Logg ut
              </Menu.Item>
            :
              <Menu.Item link href="/logg-inn">
                Logg inn
              </Menu.Item>
          }
        </Menu.Menu>
      </div>
    </div>
  </header>
);

export default Header;
