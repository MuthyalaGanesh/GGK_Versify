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
                <TreeView data={props.Locations} leftMenuDropdownClickEvent={props.leftMenuDropdownClickEvent} />
            </div>
        </div>
    </Scrollbars>
</aside>
    );
}

export const LocationLeftMenuChild =(props)=> {
     
         return(
          <ul className="treeview-menu">
							<li>
                    {props.childnode 
                        ?  <a onClick={(e)=>{props.leftMenuDropdownClickEvent(props.key, e)}}>
                        <span>{ props.name} </span> 
                        {props.currentLocation.Children.length > 0
                      ? <i className="fa fa-angle-left pull-right" onClick={(e)=>{props.leftMenuDropdownClickEvent(props.key, e)}}></i>
                      : ''
                    }                           
                </a>
                    :''
                }
                      
                 {props.currentLocation.Children.length > 0 
                  ? props.currentLocation.Children.map(child => <LocationLeftMenuChild key={child.Id} childnode={true} name={child.Name} leftMenuDropdownClickEvent={props.leftMenuDropdownClickEvent} currentLocation={child}/>)
                  : ''
                  }
            </li>
         </ul> );
        
 
}

export default LocationLeftMenu