import React from 'react'
import { connect } from 'react-redux'

import {
    editLanguage,
} from '../../redux-store'

import {
    Link
} from "react-router-dom";

class LanguageInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <br/>

                <div className="card" style={{ width: '32rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Dil Barada Maglumat</h5>
                        <table className="table table-hover">
                            <tbody>
                                <tr>
                                    <th scope="row">Ady</th>
                                    <td>{this.props.language.title}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bellikler</th>
                                    <td>{this.props.language.notes}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amallar</th>
                                    <td>
                                        <Link to={"/languages/" + this.props.language.id + "/edit"}>
                                            <button className="btn btn-warning"
                                                onClick={() => this.props.editLanguage(this.props.language.id)}
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                        </Link> 
                                        &nbsp;
                                        &nbsp;
                                        <Link to={"/languages"}>
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
        language: state.languages.currentLanguage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editLanguage: (id) => dispatch(editLanguage(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageInfo)
