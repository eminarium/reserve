import React from 'react'
import { connect } from 'react-redux'
import { 
    fetchSeasons,
    editSeason,
    seasonInfo,
    removeSeason
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class Seasons extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchSeasons()
    }

    render() {

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="7">
                                Tapgyrlar
                            </th>
                            <th>
                                <Link to={"/seasons/new"}>
                                    <button className="btn btn-info">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </Link> 
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ady</th>
                            <th scope="col">Belgisi</th>
                            <th scope="col">Başlaýan senesi</th>
                            <th scope="col">Gutarýan senesi</th>
                            <th scope="col">Gaýtarma soňky senesi</th>
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
                            this.props.seasons.map( (season, index) => {
                                var dstart = new Date(season.start_date)
                                var dend = new Date(season.end_date)
                                var dreturn = new Date(season.return_deadline)

                                return (
                                    <tr key={season.id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{season.title}</td>
                                        <td>{season.order_no}</td>
                                        <td>
                                            {dstart.getDate() < 9 ? "0" : ""}{dstart.getDate()}-
                                            {dstart.getMonth() < 9 ? "0" : ""}{dstart.getMonth() + 1}-
                                            {dstart.getFullYear()} 
                                        </td>
                                        <td>
                                            {dend.getDate() < 9 ? "0" : ""}{dend.getDate()}-
                                            {dend.getMonth() < 9 ? "0" : ""}{dend.getMonth() + 1}-
                                            {dend.getFullYear()} 
                                        </td>
                                        <td>
                                            {dreturn.getDate() < 9 ? "0" : ""}{dreturn.getDate()}-
                                            {dreturn.getMonth() < 9 ? "0" : ""}{dreturn.getMonth() + 1}-
                                            {dreturn.getFullYear()} 
                                        </td>
                                        <td>{season.notes}</td>
                                        <td>
                                            <Link to={"/seasons/" + season.id}>
                                                <button className="btn btn-primary"
                                                    onClick={() => this.props.seasonInfo(season.id)}
                                                >
                                                    <i className="fa fa-info"></i>
                                                </button>
                                            </Link> 
                                            &nbsp;
                                            &nbsp;
                                            <Link to={"/seasons/" + season.id + "/edit"}>
                                                <button className="btn btn-warning"
                                                    onClick={() => this.props.editSeason(season.id)}
                                                >
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                            </Link> 
                                            &nbsp;
                                            &nbsp;
                                            <button className="btn btn-danger"
                                                onClick={() => { if (window.confirm("Tapgyry bozmalymy ?")) this.props.removeSeason(season.id) }}
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
        seasons: state.seasons.seasons,
        loading: state.seasons.loading,
        error: state.seasons.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSeasons: () => dispatch(fetchSeasons()),
        editSeason: (id) => dispatch(editSeason(id)),
        removeSeason: (id) => dispatch(removeSeason(id)),
        seasonInfo: (id) => dispatch(seasonInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seasons)

