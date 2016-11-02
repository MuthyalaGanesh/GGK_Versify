import React from 'react'
import BasicInfo from '../routes/BasicInfo/component/BasicInfo'
import CredentialsManagement from '../routes/CredentialsManagement/component/CredentialsManagement'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem} from 'react-bootstrap'
import {Link}from 'react-router'

export const WizardTabs =(props)=> {
return (
    
  
<div className="board-inner">
    <ul className="nav nav-tabs">
        <div className="liner"></div>
        <li className="active">
            <Link to='/location/basic' data-toggle="tab" title="Basic Information">
            <span className="round-tabs one">
                <i className="glyphicon glyphicon-home"></i>
            </span>
            <span className="tab-title"><small>Basic Information</small></span>
            </Link>
        </li>
        <li>
            <Link to='/location/credential' data-toggle="tab" title="Credential Management">
            <span className="round-tabs two">
                <i className="glyphicon glyphicon-gift"></i>
            </span>
            <span className="tab-title"><small>Credential Management</small></span>
            </Link>
        </li>
        <li>
            <Link to='/location/unitcharacteristics' data-toggle="tab" title="Unit Characteristics">
            <span className="round-tabs three">
                <i className="glyphicon glyphicon-user"></i>
            </span>
            <span className="tab-title"><small>Unit Characteristics</small></span>
            </Link>

        </li>
        <li>
                <Link to="/location/systemintegration" data-toggle="tab" title="System Integration">
                    <span className="round-tabs four">
                        <i className="glyphicon glyphicon-comment"></i>
                    </span>
                    <span className="tab-title"><small>System Integration</small></span>

                </Link>
        </li>
        <li>
            <Link to="/location/workFlows" data-toggle="tab" title="WorkFlows">
                <span className="round-tabs five">
                    <i className="glyphicon glyphicon-folder-open"></i>
                </span>
                <span className="tab-title"><small>&nbsp;&nbsp;WorkFlows</small></span>
            </Link>
        </li>
        <li>
            <Link to="/location/users" data-toggle="tab" title="Users">
                <span className="round-tabs six">
                    <i className="glyphicon glyphicon-user"></i>
                </span>
                <span className="tab-title"><small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Users</small></span>
            </Link>
        </li>
        <li>
            <a href="#doner" data-toggle="tab" title="Equipment">
                <span className="round-tabs seven">
                    <i className="glyphicon glyphicon-indent-right"></i>
                </span>
                <span className="tab-title"><small>&nbsp;&nbsp;&nbsp;Equipment</small></span>

            </a>
        </li>
        <li>
            <a href="#settings" data-toggle="tab" title="Gateways">
                <span className="round-tabs two">
                    <i className="glyphicon glyphicon-pencil"></i>
                </span>
                <span className="tab-title"><small>&nbsp;&nbsp;&nbsp;Gateways</small></span>

            </a>
        </li>
        <li>
            <a href="#settings" data-toggle="tab" title="Data Historian">
                <span className="round-tabs three">
                    <i className="glyphicon glyphicon-pencil"></i>
                </span>
                <span className="tab-title"><small>Data Historian</small></span>

            </a>
        </li>
    </ul>
</div>

        )    
}

export default WizardTabs
