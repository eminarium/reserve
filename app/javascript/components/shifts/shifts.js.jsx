import React from 'react'
import { connect } from 'react-redux'
import { 
    fetchShifts,
    editShift,
    shiftInfo,
    removeShift
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'

import {
    Link
} from "react-router-dom";

class Shifts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchShifts()
    }

    render() {

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" colSpan="5">
                                Wagtlar (Smenalar)
                            </th>
                            <th>
                                <Link to={"/shifts/new"}>
                                    <button className="btn btn-info">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </Link> 
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Wagtyň (smenanyň) Ady</th>
                            <th scope="col">Başlaýan wagty</th>
                            <th scope="col">Gutarýan wagty</th>
                            <th scope="col">Teswiri</th>
                            <th scope="col">Amallar</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            (this.props.loading) ?
                            (
                                <tr>
                                    <td colSpan="6">
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
                                    <td colSpan="6">
                                        <h3>
                                            {this.props.error}
                                        </h3>
                                    </td>
                                </tr>                                
                            ) :
                            this.props.shifts.map( (shift, index) => {
                                var dstart = new Date(shift.start_time)
                                var startMinutes = dstart.getMinutes() < 10 ? ("0"+dstart.getMinutes()) : dstart.getMinutes()

                                var dend = new Date(shift.end_time)
                                var endMinutes = dend.getMinutes() < 10 ? ("0" + dend.getMinutes()) : dend.getMinutes()
                                return (
                                    <tr key={shift.id}>
                                        <th scope="row">{index+1}</th>
                                        <td>{shift.title}</td>
                                        <td>{dstart.getUTCHours()} : {startMinutes} </td>
                                        <td>{dend.getUTCHours()} : {endMinutes}</td>
                                        <td>{shift.notes}</td>
                                        <td>
                                            <Link to={"/shifts/" + shift.id}>
                                                <button className="btn btn-primary"
                                                    onClick={() => this.props.shiftInfo(shift.id)}
                                                >
                                                    <i className="fa fa-info"></i>
                                                </button>
                                            </Link> 
                                            &nbsp;
                                            &nbsp;
                                            <Link to={"/shifts/" + shift.id + "/edit"}>
                                                <button className="btn btn-warning"
                                                    onClick={() => this.props.editShift(shift.id)}
                                                >
                                                    <i className="fa fa-pencil"></i>
                                                </button>
                                            </Link> 
                                            &nbsp;
                                            &nbsp;
                                            <button className="btn btn-danger"
                                                //onClick={() => { if (window.confirm("Wagty (smenany) bozmalymy ?")) this.props.removeShift(shift.id) }}
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
        shifts: state.shifts.shifts,
        loading: state.shifts.loading,
        error: state.shifts.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchShifts: () => dispatch(fetchShifts()),
        editShift: (id) => dispatch(editShift(id)),
        removeShift: (id) => dispatch(removeShift(id)),
        shiftInfo: (id) => dispatch(shiftInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shifts)

