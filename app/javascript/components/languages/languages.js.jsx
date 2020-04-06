import React from 'react'
import { connect } from 'react-redux'
import { fetchLanguages } from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class Languages extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchLanguages()
    }

    render() {

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="3">
                                Diller
                            </th>
                            <th>
                                <Link to={"/languages/new"}>
                                    <button className="btn btn-info">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </Link> 
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Diliň Ady</th>
                            <th scope="col">Teswiri</th>
                            <th scope="col">Amallar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (this.props.loading) ?
                            (
                                <tr>
                                    <td colSpan="4">
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
                                    <td colSpan="4">
                                        <h3>
                                            {this.props.error}
                                        </h3>
                                    </td>
                                </tr>                                
                            ) :
                            this.props.languages.map( (language, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{language.title}</td>
                                        <td>{language.notes}</td>
                                        <td>
                                            <Link to={"/languages/" + language.id}>
                                                <button className="btn btn-primary">
                                                    <i className="fa fa-info"></i>
                                                </button>
                                            </Link> 
                                            &nbsp;
                                            &nbsp;
                                            <Link to={"/languages/" + language.id + "/edit"}>
                                                <button className="btn btn-warning">
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                            </Link> 
                                            &nbsp;
                                            &nbsp;
                                            <button className="btn btn-danger"
                                                //onClick={() => { if (window.confirm("Dili bozmalymy ?")) this.removeLanguage(language.id) }}
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
        languages: state.languages.languages,
        loading: state.languages.loading,
        error: state.languages.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchLanguages: () => dispatch(fetchLanguages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Languages)

