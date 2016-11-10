import React from 'react'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem} from 'react-bootstrap'
import {Link}from 'react-router'
import TreeView from './BootstrapTreeView';


export const LocationLeftMenu =(props)=> {
    
  return(   
     <aside className="main-sidebar control-sidebar-dark">
        {/*<ul className="nav nav-tabs nav-justified control-sidebar-tabs">
            <li className="active">
                <Link to="#control-sidebar-menutree-tab" data-toggle="tab">
                    <i className="fa fa-list"></i> Locations
                </Link>
            </li>
            <li>
                <Link to="#control-sidebar-favorites-tab" data-toggle="tab">
                    <i className="fa fa-star-o"></i> ExecView
                </Link>
            </li>
            <li>
                <Link to="#control-sidebar-recent-tab" data-toggle="tab">
                    <i className="fa fa-history"></i> PlanOps
                </Link>
            </li>
        </ul>*/}

        <div className="tab-content">
            <div className="tab-pane active" id="control-sidebar-menutree-tab">
               
                   <TreeView data={props.Locations} leftMenuDropdownClickEvent={props.leftMenuDropdownClickEvent}/>
                
            </div>
        </div>

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