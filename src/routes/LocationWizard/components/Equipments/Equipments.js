import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Modal} from 'react-bootstrap/lib'
import 'styles/equipmentStyles.scss'
import InputField from 'components/InputField/InputField'


export const Equipments = (props) => {
    const touched = props.formdata

    return (
        <div className="row tab-pane fade in active" id="equipments">
            <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Equipments</h3>
                        <div className="box-tools pull-right">
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="margin-bottom-sm padding-top">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="col-xs-4">Equipment</div>
                                    <div className="col-xs-4">
                                        <Field component={InputField} type="text" className="form-control" name="newEquipment"
                                            touched = {touched.hasOwnProperty('EquipmentsForm') ? touched.EquipmentsForm.hasOwnProperty('fields') ? touched.EquipmentsForm.fields.hasOwnProperty('newEquipment') : false : false }>
                                        </Field>
                                    </div>
                                    <div className="col-xs-4">
                                        <button className="btn btn-success" onClick={props.AddEquipment}>Add</button>
                                    </div>
                                </div>
                            </div>
                            {props.equipments.insertedEquipment && props.equipments.insertedEquipment.length >
                                0 ?
                                <div>
                                    <div className="col-xs-4"></div>
                                    <div className="col-xs-4">
                                        <Table striped bordered condensed hover responsive className="all-equipments">
                                            <thead>
                                                <tr>
                                                    <th className="col-xs-3 text-align-col">Name</th>
                                                    <th className="col-xs-1 text-align-col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.equipments.insertedEquipment.map((eq, index) =>
                                                        (
                                                            <tr key={index}>
                                                                <td className="col-xs-3 name-cell">{eq}</td>
                                                                <td className="col-xs-1 text-align-col">
                                                                    <div className=" text-center">
                                                                        <i className="fa fa-edit fa-2x" onClick={() => { props.EditEquipment(index) } }></i>
                                                                        <i className="fa fa-trash-o fa-2x" onClick={() => { props.DeleteEquipment(index) } }></i>
                                                                    </div>
                                                                </td>
                                                            </tr>)
                                                    )
                                                }
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className="col-xs-4"></div>
                                </div> : null}

                        </div>

                        <Modal show={props.equipments.showEditModal}>
                            <Modal.Header>
                                <Modal.Title>Edit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Field component={InputField}
                                    type="text"
                                    className="form-control"
                                    name="editedEquipment"
                                    defaultValue={props.equipments.editableEquipment}></Field>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-warning" type="button" onClick={props.EditEquipment}>Cancel</button>
                                <button className="btn btn-success" type="button" onClick={props.ApplyEditEquipment}>Apply</button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Equipments