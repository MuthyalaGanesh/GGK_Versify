import React from 'react'
import BasicInfo from '../routes/BasicInfo/component/BasicInfo'
import CredentialsManagement from '../routes/CredentialsManagement/component/CredentialsManagement'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem} from 'react-bootstrap'
import {Link}from 'react-router'
export const LocationWizard =(props)=> {
return (
    <div className="row" style={{paddingTop:'50px'}}>
                        <div className="col-md-2">
                            LeftMenu Space.
                        </div>
                        <div className="col-md-10">
                        <Link to='/location/basic'> basic </Link>
                        <Link to='/location/Credential'> Credential </Link>
                            <div className="col-xs-12">
                                {props.children}
                           {/* <BasicInfo  />*/}
                        </div>
                         {/* <div  className="col-xs-12">
                          <CredentialsManagement onSubmit={props.submit} onChange={props.onchange} />
                        </div>*/}
                        </div>
                        
                    </div>

            
        )
    
}


export default LocationWizard
