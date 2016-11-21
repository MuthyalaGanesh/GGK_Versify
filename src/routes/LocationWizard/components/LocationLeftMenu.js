import React from 'react'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem,} from 'react-bootstrap'
import {OverlayTrigger, Tooltip} from 'react-bootstrap/lib'

import {Link}from 'react-router'
import TreeView from './BootstrapTreeView';
import { Scrollbars } from 'react-custom-scrollbars';

export const LocationLeftMenu =(props)=> {
     var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth;
var leftMenuHeight = w.innerHeight||e.clientHeight||g.clientHeight;
  return(   
<aside className="main-sidebar control-sidebar-dark">
    
        <div id='location-header'>
            <h5>Locations </h5>
            <OverlayTrigger placement="bottom" overlay={
                                <Tooltip id="tooltip">
                                    <strong>Add Location</strong>
                                </Tooltip>}>
                <a onClick={(e)=>{props.leftMenuDropdownClickEvent(0, e)}}>
                    <i className="fa fa-plus-circle fa-2x"></i>
                </a>                               
                </OverlayTrigger>
            
        </div>
    <Scrollbars style={{ height: leftMenuHeight }}>
        <div className="tab-content">
            <div className="tab-pane active" id="control-sidebar-menutree-tab">
                <TreeView data={props.Locations} leftMenuDropdownClickEvent={props.leftMenuDropdownClickEvent} defaultNodeExpanded={props.defaultNodeExpanded} />
            </div>
        </div>
    </Scrollbars>
</aside>
    );
}

export default LocationLeftMenu