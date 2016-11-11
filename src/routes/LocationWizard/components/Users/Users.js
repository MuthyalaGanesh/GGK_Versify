import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Modal,OverlayTrigger,Tooltip} from 'react-bootstrap/lib'
import InputField from 'components/InputField/InputField'
import Multiselect from 'react-widgets/lib/Multiselect'
import DropdownList from 'react-widgets/lib/DropdownList'
import 'styles/widgetStyle.scss'


const renderMultiselect = ({ input, ...rest }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || rest.defaultValue} 
    onChange={(e)=>{  
        input.onChange(e);
        !!rest.onChangeEvent && rest.onChangeEvent(e);
     }}
    {...rest}/>

const RenderDropdownList = ({ input, ...rest }) =>
  <DropdownList {...input}
    onBlur={() => input.onBlur()}
    value={input.value || rest.defaultValue}
    onChange={(e)=>{  
        input.onChange(e);
        !!rest.onChangeEvent && rest.onChangeEvent(e);
     }}
    {...rest}/>

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
                                    <h3 className="box-title">Users By Role</h3>
                                    <div className="box-tools pull-right">
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label className="control-label"> Roles </label>
                                                <Field component={RenderDropdownList} className="form-control"  name = 'RoleByRoles'
                                                        data ={Roles} 
                                                        defaultValue = {props.userInfo.selectedRole.Id}                                                       
                                                        textField='Name'                                             
                                                        valueField='Id'
                                                        placeholder="Select a Role"
                                                        onChangeEvent = {props.selectRole}
                                            />                                                
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label className="control-label"> Contacts </label>
                                                <Field
                                                    name = 'contactsByRoles'
                                                    component={renderMultiselect}
                                                        defaultValue={props.userInfo.defaultContacts}
                                                    data ={Contacts}                                                        
                                                    textField='Name'                                             
                                                    valueField='Id'
                                                    placeholder="Select contacts"
                                                        onChangeEvent = {props.bindContactToRole}                                                      
                                                    />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6">
                            <div className="box">
                                <div className="box-header">                                    
                                    <h3 className="box-title">Users By Contact</h3>
                                    <div className="box-tools pull-right">
                                    </div>
                                </div>
                                <div className="box-body">

                                    <div className="row">
                                        <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label className="control-label"> Contacts </label>
                                            <Field component={RenderDropdownList} className="form-control" name = 'ContactsByContact'
                                                        data ={Contacts} 
                                                        defaultValue = {props.userInfo.selectedContact.Id}                                                          
                                                        textField='Name'                                             
                                                        valueField='Id'
                                                        placeholder="Select a contact"
                                                        onChangeEvent = {props.selectContact}/>                                            
                                            </div>
                                            <div className="col-sm-12 col-md-6 col-lg-6">
                                                <label className="control-label"> Roles </label>
                                                <Field
                                                        name = 'RoleByContact'
                                                        component={renderMultiselect}
                                                        defaultValue={props.userInfo.defaultRoles}
                                                        data={Roles}                                                       
                                                        textField='Name'                                             
                                                        valueField='Id'
                                                        placeholder="Select roles"
                                                        onChangeEvent = {props.bindRoleToContact}
                                                        />
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
                                    <Field component={RenderDropdownList} className="form-control" name="Org"  placeholder="Select Org"
                                            data = {ContactPopUpInfo.org} textField ='name' valueField='id'/>
                                </div>
                                <div className="col-xs-4">
                                    <label>type</label>
                                    <Field component={RenderDropdownList} className="form-control" name="Type"  placeholder="Select type"
                                             data = {ContactPopUpInfo.type} textField ='name' valueField='id'/>
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
                                    <Field component={RenderDropdownList} className="form-control" name="TimeZone"  placeholder="Select TimeZone"
                                            data = {ContactPopUpInfo.Timezones} textField ='value' valueField='id' />
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
                                            <Field component={RenderDropdownList} className="form-control" name="Gateway"  placeholder="Select type"
                                                 data = {ContactPopUpInfo.status}/>
                                        </div>
                                        <div className="col-xs-4">
                                            <label>User ID</label>
                                            <Field component={InputField} className="form-control" name="Name" type="text"  placeholder="Primary Email"
                                             />
                                        </div>                                
                                        <div className="col-xs-4">
                                            <label>Password</label>
                                            <Field component={InputField} type="text" className="form-control" name="Custom5">
                                            </Field>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12 form-group">
                                        <div className="col-xs-6">                                   
                                                <label>System Administrator</label>                                                  
                                                <Field name="SystemAdmin" component='input' type="checkbox" className='checkbox'/> 
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>          
                    </Modal.Body>
                    <Modal.Footer>   
                                <button className="btn btn-success" type="button" onClick={props.AddContactModalToggle}>Add</button> 
                                <button className="btn btn-warning" type="button"  onClick={props.AddContactModalToggle}>Cancel</button>  
                        
                </Modal.Footer>
                </Modal>
            </div>
        )
    }
export default Users