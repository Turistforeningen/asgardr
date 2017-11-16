import React from 'react';
import {Menu} from 'semantic-ui-react';

import logo from '../assets/images/dnt-logo-circle.svg';

const Header = ({user}) => (
  <header>
    <div className="ui fixed top inverted menu">
      <div className="ui container">
        {
          user && user.isAuthenticated && user.data.is_admin ?
            <a href="https://www.dnt.no/sherpa" className="header item logo">
              <img src={logo} />
            </a>
          :
            <a href="/" className="header item logo">
              <img src={logo} />
            </a>
        }
        <Menu.Menu position="right">
          {
            user && user.isAuthenticated ?
              <Menu.Item link href="/logg-ut">
                Logget inn som {`${user.data.fornavn} ${user.data.etternavn}`} – Logg ut
              </Menu.Item>
            :
              <Menu.Item link href="/logg-inn/dnt">
                Logg inn
              </Menu.Item>
          }
        </Menu.Menu>
      </div>
    </div>
  </header>
);

export default Header;
