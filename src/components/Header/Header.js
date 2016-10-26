import React from 'react'
import { IndexLink, Link } from 'react-router'
import LogoImg from 'public/images/logo-new.png'
import 'styles/headerStyles.scss'
import {Dropdown,CustomToggle,CustomMenu,MenuItem,DropdownButton,Nav,NavItem,ButtonToolbar} from 'react-bootstrap/lib'

export const Header = () => (
     
	<header className="main-header">
		<nav id="headerbar_top" className="navbar navbar-static-top" role="navigation" style={{zIndex:9}}>
			<div style={{float:'left', position:'relative', zIndex:999}}>
      <img src={LogoImg} alt="Versify" className="logo-img"/> 
    	</div>
	 <div className="notifications-section">
       <ButtonToolbar>
        <DropdownButton noCaret title={<span><i className="fa fa-envelope"></i> </span>} id="nav-dropdown">
          <MenuItem eventKey="1">You have 4 messages</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="2">Support Team</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="3">See all messages</MenuItem>
        </DropdownButton>
          <DropdownButton noCaret title={<span><i className="fa fa-bell"></i> </span>} id="nav-dropdown">
          <MenuItem eventKey="1">You have 10 notifications</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="2"><span className="fa fa-group"></span>5 members joined today</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="3">View all</MenuItem>
        </DropdownButton>
        <DropdownButton noCaret title={<span><i className="fa fa-flag"></i></span>} id="nav-dropdown">
            <MenuItem eventKey="1">You have 9 tasks</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="2">
          <div className='progress'>
          xyz
	      <div className='progress-bar'
	            role='progressbar'
              aria-valuenow='70'
              aria-valuemin='0'
              aria-valuemax='100'
              style={{width: '70%'}}>
    <span className='sr-only'>70% Complete</span>
        </div>
        </div>
          </MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="5.3">View all tasks</MenuItem>
        </DropdownButton>
 </ButtonToolbar>
		</div>

  	</nav>
  <Nav bsStyle="pills" activeKey={0}>
    <NavItem eventKey={0}>&#9776;</NavItem>
    <NavItem eventKey={1} href=""><i className="fa fa-home"></i>Home</NavItem>
    <NavItem eventKey={2} href="/location"><i className="fa fa-book"></i>Location Wizard</NavItem>
  </Nav>
	</header>  
)

export default Header
