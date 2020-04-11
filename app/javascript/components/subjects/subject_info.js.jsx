import React from 'react'
import { connect } from 'react-redux'

import {
    editSubject,
} from '../../redux-store'

import {
    Link
} from "react-router-dom";

class SubjectInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <br/>

                <div className="card" style={{ width: '32rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Ders Barada Maglumat</h5>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th scope="row">Ady</th>
                                    <td>{this.props.subject.title}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Derejesi</th>
                                    <td>{this.props.subject.level}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Ders Görnüşi</th>
                                    <td>{this.props.subject.subject_category.title}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Dili</th>
                                    <td>{this.props.subject.language.title}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Geçiş bahasy</th>
                                    <td>{this.props.subject.passing_points}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bellikler</th>
                                    <td>{this.props.subject.notes}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amallar</th>
                                    <td>
                                        <Link to={"/subjects/" + this.props.subject.id + "/edit"}>
                                            <button className="btn btn-warning"
                                                onClick={() => this.props.editSubject(this.props.subject.id)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                        </Link> 
                                        &nbsp;
                                        &nbsp;
                                        <Link to={"/subjects"}>
                                            <button className="btn btn-primary">
                                                <i className="fa fa-list"></i>
                                            </button>
                                        </Link> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        subject: state.subjects.currentSubject,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editSubject: (id) => dispatch(editSubject(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectInfo)
