import React from 'react'
import { connect } from 'react-redux'

import {
    editSubjectCategory,
} from '../../redux-store'

import {
    Link
} from "react-router-dom";

class SubjectCategoryInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <br/>

                <div className="card" style={{ width: '32rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Ders Görnüşi Barada Maglumat</h5>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th scope="row">Ady</th>
                                    <td>{this.props.subject_category.title}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Çaga toparymy ?</th>
                                    <td>
                                        {
                                            this.props.subject_category.is_kids ?
                                            <i className="fa fa-check" style={{ color: 'green', fontSize: 20 }}></i> :
                                            <i className="fa fa-times" style={{ color: 'red', fontSize: 20 }}></i>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Bellikler</th>
                                    <td>{this.props.subject_category.notes}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amallar</th>
                                    <td>
                                        <Link to={"/subject_categories/" + this.props.subject_category.id + "/edit"}>
                                            <button className="btn btn-warning"
                                                onClick={() => this.props.editSubjectCategory(this.props.subject_category.id)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                        </Link> 
                                        &nbsp;
                                        &nbsp;
                                        <Link to={"/subject_categories"}>
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
        subject_category: state.subject_categories.currentSubjectCategory,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editSubjectCategory: (id) => dispatch(editSubjectCategory(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectCategoryInfo)
