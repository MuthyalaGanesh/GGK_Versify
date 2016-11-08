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

        <div className="" id="bs-example-navbar-collapse-1" style={{'width':'75%','position':'fixed','zIndex':'999999'}}>
            <ul className="nav nav-tabs">
                <div className="liner"></div>
                <li>
                    <Link activeClass="active" className="basicInfo" to="basicInfo" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs one">
                        <i className="glyphicon glyphicon-home"></i>
                    </span>
                    <span className="tab-title"><small>Basic Information</small></span></Link>
                </li>               
                <li>
                    <Link activeClass="active" className="credential" to="credential" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs two">
                        <i className="glyphicon glyphicon-gift"></i>
                    </span>
                    <span className="tab-title"><small>Credential Management</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="unitcharacteristics" to="unitcharacteristics" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs three">
                        <i className="glyphicon glyphicon-user"></i>
                    </span>
                    <span className="tab-title"><small>Unit Characteristics</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="systemintegration" to="systemintegration" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs four">
                        <i className="glyphicon glyphicon-comment"></i>
                    </span>
                    <span className="tab-title"><small>System Integration</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="workflows" to="workflows" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs five">
                        <i className="glyphicon glyphicon-folder-open"></i>
                    </span>
                    <span className="tab-title"><small>&nbsp;&nbsp;WorkFlows</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="users" to="users" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs six">
                        <i className="glyphicon glyphicon-user"></i>
                    </span>
                    <span className="tab-title"><small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users</small></span></Link>
                </li>
                <li>
                    <Link activeClass="active" className="equipment" to="equipment" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs seven">
                        <i className="glyphicon glyphicon-indent-right"></i>
                    </span>
                    <span className="tab-title"><small>&nbsp;&nbsp;&nbsp;Equipment</small></span>
                    </Link>
                </li>
                <li>
                    <Link activeClass="active" className="gateways" to="gateways" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs two">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </span>
                    <span className="tab-title"><small>&nbsp;&nbsp;&nbsp;Gateways</small></span>
                    </Link>
                </li>
                <li>
                    <Link activeClass="active" className="datahistorian" to="datahistorian" spy={true} smooth={true} duration={500}>
                    <span className="round-tabs three">
                        <i className="glyphicon glyphicon-pencil"></i>
                    </span>
                    <span className="tab-title"><small>Data Historian</small></span>
                    </Link>
                </li>

            </ul>
        </div>
    </nav>
</div>
        )    
}

export default WizardTabs
