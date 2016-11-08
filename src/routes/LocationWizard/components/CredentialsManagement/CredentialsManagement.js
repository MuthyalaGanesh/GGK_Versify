import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, ControlLabel} from 'react-bootstrap/lib'

export const CredentialsManagement = (props) => {
        return (
    <div className="row tab-pane fade in active" id="credentialsmanagement">
        <div className="col-xs-12">
            <div className="box">
                <div className="box-header">
                    <h3 className="box-title">Credentials Management</h3>
                    <div className="box-tools pull-right">
                    </div>
                </div>
                <div className="box-body">
                    <div className="margin-bottom-sm padding-top">

                        <h2 style={{'textAlign': 'center'}}> In Progress...</h2>

                    </div>
                </div>
            </div>
        </div>
    </div>

        )
    }
    export default CredentialsManagement