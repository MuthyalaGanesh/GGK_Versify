import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Panel, Table, Modal} from 'react-bootstrap/lib'
import 'styles/equipmentStyles.scss'
import InputField from '../../../../../components/InputField/InputField'


export const Equipments = (props) => {

    return (
        <div>
            <Panel header={<label>Equipments</label>}>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="col-xs-4">Equipment</div>
                        <div className="col-xs-4">
                            <Field component={InputField} type="text" className="form-control" name="newEquipment">
                            </Field>
                        </div>
                        <div className="col-xs-4">
                            <button className="btn btn-success" onClick={props.AddEquipment}>Add</button>
                        </div>
                    </div>
                </div>
                <div className={props.equipments.insertedEquipment && props.equipments.insertedEquipment.length > 0 ? "show" : "hide"}>
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
                                        (<tr key={index}>
                                            <td className="col-xs-3 name-cell">{eq}</td>
                                            <td className="col-xs-1 text-align-col">
                                                <div>
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
                </div>
            </Panel>
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
                    <button className="btn btn-warning" type="button"  onClick={props.EditEquipment}>Cancel</button>
                    <button className="btn btn-success" type="button"  onClick={props.ApplyEditEquipment}>Apply</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Equipments