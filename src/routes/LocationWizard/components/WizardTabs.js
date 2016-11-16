import React from 'react'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem} from 'react-bootstrap'
//import {Link}from 'react-router'

var Scroll    = require('react-scroll');

var Link       = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;
export const WizardTabs =(props)=> {
     var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth;
var offsetValue = x < 768 ? -125 : -180;

return (
  
<div className="board-inner">
    <nav className="navbar ">
    <div className='content-header'>       
            <ul className="nav nav-tabs">
                <div className="liner"></div>
                <li>
                    <Link activeClass="active" className="wizard-item" offset={offsetValue-5} to="basicInfo" spy={true}  smooth={true} duration={500}>
                    <span className="round-tabs one">
                        <i className="fa fa-info"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Information</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" offset={offsetValue} to="credential" spy={true}  smooth={true} duration={500}>
                    <span className="round-tabs two">
                        <i className="fa fa-lock"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Credentials</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" offset={offsetValue}to ="unitcharacteristics" spy={true}  smooth={true} duration={500}>
                    <span className="round-tabs three">
                        <i className="fa fa-list-alt"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Attributes</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" offset={offsetValue} to="systemintegration" spy={true}  smooth={true} duration={500}>
                    <span className="round-tabs four">
                        <i className="fa fa-link"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Integrations</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" to="workflows" offset={offsetValue} spy={true}  smooth={true} duration={500}>
                    <span className="round-tabs five">
                        <i className="fa fa-sitemap"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>WorkFlows</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" to="users" offset={offsetValue} spy={true}  smooth={true} duration={500}>
                    <span className="round-tabs six">
                        <i className="fa fa-users"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Users</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" to="equipment" offset={offsetValue} spy={true}  smooth={true} duration={500}>
                    <span className="round-tabs seven">
                        <i className="fa fa-cubes"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Equipment</small></span>
                    </Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" to="gateways" offset={offsetValue} spy={true}  smooth={true} duration={500}>
                    <span className="round-tabs two">
                        <i className="fa fa-road"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Gateways</small></span>
                    </Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" offset={offsetValue} to="datahistorian" spy={true}  smooth={true} duration={500}>
                    <span className="round-tabs three">
                        <i className="fa fa-history"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Historian</small></span>
                    </Link>
                </li>

            </ul>
        </div>
    </nav>
</div>
        )    
}

export default WizardTabs
