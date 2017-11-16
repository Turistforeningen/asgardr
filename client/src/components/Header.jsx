import React from 'react';
import {Menu} from 'semantic-ui-react';

import dntLogo from '../assets/images/dnt-logo-circle.svg';
import utnoLogo from '../assets/images/utno-logo-negative.svg';

const Header = ({user}) => (
  <header>
    <div className="ui fixed top inverted menu">
      <div className="ui container">
        {
          user && user.isAuthenticated && user.data.is_admin ?
            <a href="https://www.dnt.no/sherpa" className="header item logo dnt">
              <img src={dntLogo} />
            </a>
          :
            <a href="/" className="header item logo dnt">
              <img src={dntLogo} />
            </a>
        }
        <a className="header item logo utno">
          <img src={utnoLogo} />
        </a>
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
