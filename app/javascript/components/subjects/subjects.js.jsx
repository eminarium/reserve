import React from 'react'
import { connect } from 'react-redux'
import { 
    fetchSubjects,
    editSubject,
    subjectInfo,
    removeSubject
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class Subjects extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSubjects()
    }

    render() {

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="7">
                                Dersler
                            </th>
                            <th>
                                <Link to={"/subjects/new"}>
                                    <button className="btn btn-info">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </Link> 
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Dersiň Ady</th>
                            <th scope="col">Derejesi</th>
                            <th scope="col">Ders Görnüşi</th>
                            <th scope="col">Dili</th>
                            <th scope="col">Geçiş Bahasy</th>
                            <th scope="col">Teswiri</th>
                            <th scope="col">Amallar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (this.props.loading) ?
                            (
                                <tr>
                                    <td colSpan="8">
                                        <div style={{ alignItems: 'center' }} >
                                            <img src={LoaderImage} />
                                        </div>
                                    </td>
                                </tr>
                            ) : (<tr><td></td></tr>)
                        }
                        {
                            (this.props.error) ?
                            (
                                <tr>
                                    <td colSpan="8">
                                        <h3>
                                            {this.props.error}
                                        </h3>
                                    </td>
                                </tr>                                
                            ) :
                            this.props.subjects.map( (subject, index) => {
                                return (
                                    <tr key={subject.id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{subject.title}</td>
                                        <td>{subject.level}</td>
                                        <td>{subject.subject_category.title}</td>
                                        <td>{subject.language.title}</td>
                                        <td>{subject.passing_points}</td>
                                        <td>{subject.notes}</td>
                                        <td>
                                            <Link to={"/subjects/" + subject.id}>
                                                <button className="btn btn-primary"
                                                    onClick={() => this.props.subjectInfo(subject.id)}
                                                >
                                                    <i className="fa fa-info"></i>
                                                </button>
                                            </Link> 
                                            &nbsp;
                                            &nbsp;
                                            <Link to={"/subjects/" + subject.id + "/edit"}>
                                                <button className="btn btn-warning"
                                                    onClick={() => this.props.editSubject(subject.id)}
                                                >
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                            </Link> 
                                            &nbsp;
                                            &nbsp;
                                            <button className="btn btn-danger"
                                                onClick={() => { if (window.confirm("Dersi bozmalymy ?")) this.props.removeSubject(subject.id) }}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        subjects: state.subjects.subjects,
        loading: state.subjects.loading,
        error: state.subjects.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSubjects: () => dispatch(fetchSubjects()),
        editSubject: (id) => dispatch(editSubject(id)),
        removeSubject: (id) => dispatch(removeSubject(id)),
        subjectInfo: (id) => dispatch(subjectInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subjects)

