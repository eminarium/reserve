import React from 'react'
import { connect } from 'react-redux'
import { 
    fetchSubjectCategories,
    editSubjectCategory,
    subjectCategoryInfo,
    removeSubjectCategory
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class SubjectCategories extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSubjectCategories()
    }

    render() {

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="4">
                                Ders Görnüşleri
                            </th>
                            <th>
                                <Link to={"/subject_categories/new"}>
                                    <button className="btn btn-info">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </Link> 
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ders Görnüşiniň Ady</th>
                            <th scope="col">Çaga Toparymy ?</th>
                            <th scope="col">Teswiri</th>
                            <th scope="col">Amallar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (this.props.loading) ?
                            (
                                <tr>
                                    <td colSpan="5">
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
                                    <td colSpan="5">
                                        <h3>
                                            {this.props.error}
                                        </h3>
                                    </td>
                                </tr>                                
                            ) :
                            this.props.subject_categories.map( (subject_category, index) => {
                                return (
                                    <tr key={subject_category.id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{subject_category.title}</td>
                                        <td>
                                            {
                                                subject_category.is_kids ?
                                                <i className="fa fa-check" style={{ color: 'green', fontSize: 20 }}></i> :
                                                <i className="fa fa-times" style={{color: 'red', fontSize:20}}></i>
                                            }                                            
                                        </td>
                                        <td>{subject_category.notes}</td>
                                        <td>
                                            <Link to={"/subject_categories/" + subject_category.id}>
                                                <button className="btn btn-primary"
                                                    onClick={() => this.props.subjectCategoryInfo(subject_category.id)}
                                                >
                                                    <i className="fa fa-info"></i>
                                                </button>
                                            </Link> 
                                            &nbsp;
                                            &nbsp;
                                            <Link to={"/subject_categories/" + subject_category.id + "/edit"}>
                                                <button className="btn btn-warning"
                                                    onClick={() => this.props.editSubjectCategory(subject_category.id)}
                                                >
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                            </Link> 
                                            &nbsp;
                                            &nbsp;
                                            <button className="btn btn-danger"
                                                onClick={() => { if (window.confirm("Ders Görnüşini bozmalymy ?")) this.props.removeSubjectCategory(subject_category.id) }}
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
        subject_categories: state.subject_categories.subject_categories,
        loading: state.subject_categories.loading,
        error: state.subject_categories.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSubjectCategories: () => dispatch(fetchSubjectCategories()),
        editSubjectCategory: (id) => dispatch(editSubjectCategory(id)),
        removeSubjectCategory: (id) => dispatch(removeSubjectCategory(id)),
        subjectCategoryInfo: (id) => dispatch(subjectCategoryInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectCategories)

