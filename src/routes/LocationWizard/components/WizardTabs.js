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
return (
  
<div className="board-inner">
    <nav className="navbar ">
    <div style={{'width':'100%','position':'fixed','zIndex':'3','background':'#F7F9FA','heigth':'150px'}}>
        <div className="" style={{'width':'75%'}}>
            <ul className="nav nav-tabs">
                <div className="liner"></div>
                <li>
                    <Link activeClass="active" className="wizard-item" offset={-232} to="basicInfo" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs one">
                        <i className="glyphicon glyphicon-home"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Basic Information</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" offset={-232} to="credential" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs two">
                        <i className="glyphicon glyphicon-gift"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Credential Management</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" offset={-232}to ="unitcharacteristics" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs three">
                        <i className="glyphicon glyphicon-user"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Unit Characteristics</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" offset={-232} to="systemintegration" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs four">
                        <i className="glyphicon glyphicon-comment"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>System Integration</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" to="workflows" offset={-232} spy={true} smooth={true} duration={500}>
                    <span className="round-tabs five">
                        <i className="glyphicon glyphicon-folder-open"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>&nbsp;&nbsp;WorkFlows</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" to="users" offset={-232} spy={true} smooth={true} duration={500}>
                    <span className="round-tabs six">
                        <i className="glyphicon glyphicon-user"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" to="equipment" offset={-232} spy={true} smooth={true} duration={500}>
                    <span className="round-tabs seven">
                        <i className="glyphicon glyphicon-indent-right"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>&nbsp;&nbsp;&nbsp;Equipment</small></span>
                    </Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" to="gateways" offset={-232} spy={true} smooth={true} duration={500}>
                    <span className="round-tabs two">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>&nbsp;&nbsp;&nbsp;Gateways</small></span>
                    </Link>
                </li>
                <li>
                    <Link activeClass="active" className="wizard-item" offset={-232} to="datahistorian" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs three">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </span>
                    <span className="tab-title hidden-xs"><small>Data Historian</small></span>
                    </Link>
                </li>

            </ul>
        </div>
        </div>
    </nav>
</div>
        )    
}

export default WizardTabs
