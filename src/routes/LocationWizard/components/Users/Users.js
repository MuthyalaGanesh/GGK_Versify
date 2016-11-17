import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Modal,OverlayTrigger,Tooltip} from 'react-bootstrap/lib'
import InputField from 'components/InputField/InputField'
import DropdownListField from 'components/DropdownList/DropdownListField'
import 'styles/widgetStyle.scss'

export const Users = (props) => {    
        const {Roles,Contacts} = props.userInfo.userInformation;
        const ContactPopUpInfo = props.userInfo.newContactPopUp;
        return (
            <div className="row tab-pane fade in active" id='users'>
                <div className="col-xs-12">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">Users</h3>
                            <div className="box-tools pull-right">
                                <OverlayTrigger placement="bottom" overlay={
                                    <Tooltip id="tooltip">
                                        <strong>Add New Contact</strong>
                                    </Tooltip>}>
                                    <i className="fa fa-address-book fa-2x" onClick={props.AddContactModalToggle}></i>
                                </OverlayTrigger>
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
                                                <Field component={DropdownListField} name = 'RoleByRoles'
                                                        data ={Roles} 
                                                        defaultValue = {props.userInfo.selectedRole.Id}                                                       
                                                        labelKey='Name'                                             
                                                        valueKey='Id'
                                                        placeholder="Select a Role"
                                                        onChangeEvent = {props.selectRole}/>                                           
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6 MultipleSelect">
                                                <label className="control-label"> Contacts </label>
                                                <Field
                                                    name = 'contactsByRoles'
                                                    component={DropdownListField}
                                                    defaultValue={props.userInfo.defaultContacts}
                                                    data ={Contacts}                                                        
                                                    labelKey='Name'                                             
                                                    valueKey='Id'
                                                    placeholder="Select contacts"                                                    
                                                    disabled = {props.userInfo.disableContacts}
                                                    multi = {true}
                                                    onChangeEvent = {props.bindContactToRole}                                                      
                                                    />
                                                <div className={props.userInfo.disableContacts ? "hide" :"col-lg-12"}>
                                                    <span className="select-all pull-left" onClick={props.selectAllContacts}>Select All</span>
                                                    <span className="deselect-all pull-right" onClick={props.unSelectAllContacts}>Deselect All</span>
                                                </div>
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
                                            <Field component={DropdownListField}  name = 'ContactsByContact'
                                                        data ={Contacts} 
                                                        defaultValue = {props.userInfo.selectedContact.Id}                                                          
                                                        labelKey='Name'                                             
                                                        valueKey='Id'
                                                        placeholder="Select a contact"
                                                        onChangeEvent = {props.selectContact}/>                                    
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6 MultipleSelect">
                                                <label className="control-label"> Roles </label>
                                                <Field
                                                        name = 'RoleByContact'
                                                        component={DropdownListField}
                                                        defaultValue={props.userInfo.defaultRoles}
                                                        data={Roles}                                                       
                                                        labelKey='Name'                                             
                                                        valueKey='Id'                                                        
                                                        multi = {true}
                                                        placeholder="Select roles"
                                                        disabled = {props.userInfo.disableRoles}
                                                        onChangeEvent = {props.bindRoleToContact}
                                                        />  
                                                 <div className={props.userInfo.disableRoles ? "hide" :"col-lg-12"}>
                                                    <span className="select-all pull-left" onClick={props.selectAllRoles}>Select All</span>
                                                    <span className="deselect-all pull-right" onClick={props.unSelectAllRoles}>Deselect All</span>
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
                <Modal show={props.userInfo.showAddContactModal}>
                    <Modal.Header>
                        <Modal.Title>New Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">Contact Info</h3>                            
                            </div>
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-xs-12 col form-group">
                                        <div className="col-xs-4">
                                            <label>Name</label>
                                            <Field component={InputField} className="form-control" name="Name" type="text"  placeholder="Name"
                                             />
                                        </div>
                                        <div className="col-xs-4">
                                            <label>Primary Phone</label>
                                            <Field component={InputField} type="text" className="form-control" name="Primary" placeholder="Primary Phone">
                                            </Field>
                                        </div>
                                        <div className="col-xs-4">
                                            <label>Custom 1</label>
                                            <Field component={InputField} type="text" className="form-control" name="Custom1">
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 form-group">
                                <div className="col-xs-4">
                                    <label>Cell / Mobile</label>
                                    <Field component={InputField} className="form-control" name="Cell" type="text"  placeholder="Cell / Mobile"
                                             />
                                </div>
                                <div className="col-xs-4">
                                    <label>Other Phone</label>
                                    <Field component={InputField} type="text" className="form-control" name="OtherPhone" placeholder="Other Phone">
                                    </Field>
                                </div>
                                <div className="col-xs-4">
                                    <label>Custom 2</label>
                                    <Field component={InputField} type="text" className="form-control" name="Custom2">
                                    </Field>
                                </div>
                                    </div>
                                </div> 
                                <div className="row">   
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-4">
                                    <label>Org</label>
                                    <Field component={DropdownListField} name="Org"  placeholder="Select Org"
                                            data = {ContactPopUpInfo.org} labelKey ='name' valueKey='id'/>
                                </div>
                                <div className="col-xs-4">
                                    <label>type</label>
                                    <Field component={DropdownListField} name="Type"  placeholder="Select type"
                                             data = {ContactPopUpInfo.type} labelKey ='name' valueKey='id'/>
                                </div>
                                <div className="col-xs-4">
                                    <label>Custom 3</label>
                                    <Field component={InputField} type="text" className="form-control" name="Custom3">
                                    </Field>
                                </div>
                            </div>
                                </div>
                                <div className="row">    
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-4">
                                    <label>Primary Email</label>
                                    <Field component={InputField} className="form-control" name="PrimaryEmail" type="text"  placeholder="Primary Email"
                                             />
                                </div>
                                <div className="col-xs-4">
                                    <label>Secondary Email</label>
                                    <Field component={InputField} type="text" className="form-control" name="SecondaryEmail" placeholder="Secondary Email">
                                    </Field>
                                </div>
                                <div className="col-xs-4">
                                    <label>Custom 4</label>
                                    <Field component={InputField} type="text" className="form-control" name="Custom4">
                                    </Field>
                                </div>
                            </div>
                                </div>  
                                <div className="row">    
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-4">
                                    <label>Title</label>
                                    <Field component={InputField} className="form-control" name="Title" type="text"  placeholder="Title"
                                             />
                                </div>
                                <div className="col-xs-4">
                                    <label>TimeZone</label>
                                    <Field component={DropdownListField} name="TimeZone"  placeholder="Select TimeZone"
                                            data = {ContactPopUpInfo.Timezones} labelKey ='value' valueKey='id' />
                                </div>
                                <div className="col-xs-4">
                                    <label>Custom 5</label>
                                    <Field component={InputField} type="text" className="form-control" name="Custom5">
                                    </Field>
                                </div>
                            </div>
                                </div> 
                            </div> 
                        </div>
                        <div className="box">
                            <div className="box-header">
                                <h3 className="box-title">User Access</h3>                            
                            </div>
                            <div className="box-body">
                                <div className="row">    
                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-4">
                                            <label>status</label>
                                            <Field component={DropdownListField} name="status"  placeholder="Select type"
                                                 data = {ContactPopUpInfo.status} labelKey ='value' valueKey='id'/>
                                        </div>
                                        <div className="col-xs-4">
                                            <label>User ID</label>
                                            <Field component={InputField} className="form-control" name="userId" type="text"  placeholder="Primary Email"
                                             />
                                        </div>                                
                                        <div className="col-xs-4">
                                            <label>Password</label>
                                            <Field component={InputField} type="text" className="form-control" name="Password">
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6 row">                                   
                                                <label className="checkbox-inline control-label"><Field name="SystemAdmin" component='input' type="checkbox" className='checkbox'/>System Administrator</label>                                                  
                                                 
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>          
                    </Modal.Body>
                    <Modal.Footer>   
                                <button className="btn btn-success" type="button" onClick={props.saveNewContact}>Add</button> 
                                <button className="btn btn-warning" type="button"  onClick={props.AddContactModalToggle}>Cancel</button>  
                        
                </Modal.Footer>
                </Modal>
            </div>
        )
    }
export default Users