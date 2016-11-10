import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Multiselect from 'react-widgets/lib/Multiselect'
import 'styles/widgetStyle.scss'


const renderMultiselect = ({ input, ...rest }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || rest.defaultValue} // requires value to be an array
    {...rest}/>

export const Users = (props) => {    
        const {Roles,Contacts} = props.userInfo.userInformation;
       
        return (
            <div className="row tab-pane fade in active" id='users'>
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">Users</h3>
                            <div className="box-tools pull-right">
                            </div>
                        </div>
                        <div className="box-body">

                        <div className="row">
                            <div className="col-md-12 col-lg-6">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">USERS BY ROLE</h3>
                                    <div className="box-tools pull-right">
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label className="control-label"> Roles </label>
                                                <Field component="select" className="form-control"  name ='RoleByRoles'>
                                                    <option value="">Select a Role</option>
                                                    {
                                                    Roles.map(role =>
                                                    <option value={role.Id} key={role.Id}>{role.Name}</option>)
                                                    }
                                                </Field>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label className="control-label"> Contacts </label>
                                                <Field
                                                    name = 'contactsByRoles'
                                                    component={renderMultiselect}
                                                    defaultValue={[]}
                                                    data ={Contacts}                                                        
                                                    textField='Name'                                             
                                                    valueField='Id'
                                                    placeholder="Select contacts"
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6">
                            <div className="box">
                                <div className="box-header">                                    
                                    <h3 className="box-title">USERS BY CONTACT</h3>
                                    <div className="box-tools pull-right">
                                    </div>
                                </div>
                                <div className="box-body">

                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label className="control-label"> Contacts </label>
                                                <Field component="select" className="form-control" name = 'ContactsByContact'>
                                                <option value="">Select a contact</option>
                                                {
                                                Contacts.map(contact =>
                                                <option value={contact.Id} key={contact.Id}>{contact.Name}</option>)
                                                }
                                            </Field>
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label className="control-label"> Roles </label>
                                                <Field
                                                        name = 'RoleByContact'
                                                        component={renderMultiselect}
                                                        defaultValue={[]}
                                                        data={Roles}                                                       
                                                        textField='Name'                                             
                                                        valueField='Id'
                                                        placeholder="Select roles"/>
                                            </div>
                                        </div>
                                    

                                
                                    
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
export default Users