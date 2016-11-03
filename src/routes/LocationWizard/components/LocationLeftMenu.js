import React from 'react'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem} from 'react-bootstrap'
import {Link}from 'react-router'


export const LocationLeftMenu =(props)=> {
  return(   
      <div>
    <aside className="main-sidebar control-sidebar-dark">
        <ul className="nav nav-tabs nav-justified control-sidebar-tabs">
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
        </ul>

        <div className="tab-content">
            <div className="tab-pane active" id="control-sidebar-menutree-tab">
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        {props.Locations.map(location =>
                            <li className="treeview">
                                <Link to="#">
                                    <span>{location.Name} </span>
                                    {location.Children.length > 0
                                    ? <i className="fa fa-angle-left pull-right"></i>
                                    : ''}
                                    </Link>
                                <LocationLeftMenuChild key={location.id} name={location.Name} currentLocation={location} />
                            </li>)
                        }
                    </ul>
                </section>
            </div>
        </div>

    </aside>
</div> 
    );
}

export const LocationLeftMenuChild =(props)=> {
     
         return(
          <ul className="treeview-menu">
							<li>
                    {props.childnode 
                        ? <Link to="#">
                        <span>{ props.name} </span> 
                        {props.currentLocation.Children.length > 0
                      ? <i className="fa fa-angle-left pull-right"></i>
                      : ''
                    }                           
                </Link>
                    :''
                }
                      
                 {props.currentLocation.Children.length > 0 
                  ? props.currentLocation.Children.map(child => <LocationLeftMenuChild key={child.id} childnode={true} name={child.Name} currentLocation={child}/>)
                  : ''
                  }
            </li>
         </ul> );
        
 
}

export default LocationLeftMenu