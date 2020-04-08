import React from 'react'
import { connect } from 'react-redux'
import { updateShift } from '../../redux-store'
import $ from 'jquery'
import LoaderImage from 'images/loader.gif'


class ShiftEditForm extends React.Component {
    constructor() {
        super();
        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        //this.loadJquery()
    }

    /*
    loadJquery() {
        <script type="text/javascript">
            $('#start_time').timepicker()
        </script>
    }
    */

    submitForm(event) {
        event.preventDefault();

        if (!event.target.checkValidity()) {
            console.log("Form is invalid!");
            this.setState({
                errorMsg: "Все поля должны быть заполнены !"
            })
            return;
        }
        else {
            console.log("Form is Valid!");
            console.log("Event Target : " + event.target.id.value + " " + event.target.title.value + " " + event.target.start_time.value + " " + event.target.end_time.value + " " + event.target.notes.value);
            console.log("Reference : " + this.getTitle.value + " " + this.getStartTime.value + " " + this.getEndTime.value + " " + this.getNotes.value);


            this.props.updateShift({
                id: event.target.id.value,
                title: event.target.title.value,
                start_time: event.target.start_time.value,
                end_time: event.target.end_time.value,
                notes: event.target.notes.value
            })

            if (!this.props.loading)
                this.props.history.push('/shifts')
        }
    }

    render() {

        
        var dstart = new Date(this.props.shift.start_time)
        var start_hours = dstart.getUTCHours() < 10 ? ("0" + dstart.getUTCHours()) : dstart.getUTCHours()
        var start_minutes = dstart.getMinutes() < 10 ? ("0" + dstart.getMinutes()) : dstart.getMinutes()
        var start_time_string = start_hours + ":" + start_minutes 

        var dend = new Date(this.props.shift.end_time)
        var end_hours = dend.getUTCHours() < 10 ? ("0" + dend.getUTCHours()) : dend.getUTCHours()
        var end_minutes = dend.getMinutes() < 10 ? ("0" + dend.getMinutes()) : dend.getMinutes()
        var end_time_string = end_hours + ":" + end_minutes
        

        return (
            <div>

                <div className="card" style={{ width: '28rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">
                            Wagt (Smena) Maglumatlaryny Üýtget &nbsp; &nbsp; &nbsp;
                            {
                                (this.props.loading) ? <img src={LoaderImage} /> : ""
                            }
                        </h5>
                        <form noValidate onSubmit={this.submitForm}>

                            <input type="hidden" name="id" id="id" defaultValue={this.props.shift.id} />

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-10 col-form-label">Wagtyň (Smenanyň) Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="title" name="title" className="form-control" required
                                        defaultValue={this.props.shift.title}
                                        ref={(input) => this.getTitle = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-10 col-form-label">Başlaýan wagty</label>
                                <div className="col-sm-10 input-group bootstrap-timepicker timepicker">
                                    <input type="time" id="start_time" name="start_time" className="form-control input-small" required
                                        defaultValue={start_time_string}
                                        //defaultValue={this.props.shift.start_time}
                                        ref={(input) => this.getStartTime = input}
                                    />
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-time"></i></span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-10 col-form-label">Tamamlanýan wagty</label>
                                <div className="col-sm-10 input-group bootstrap-timepicker timepicker">
                                    <input type="time" id="end_time" name="end_time" className="form-control" required
                                        defaultValue={end_time_string}
                                        //defaultValue={this.props.shift.end_time}
                                        ref={(input) => this.getEndTime = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="notes" className="col-sm-10 col-form-label">Bellikler</label>
                                <div className="col-sm-10">
                                    <textarea type="text" id="notes" name="notes" className="form-control" required 
                                        defaultValue={this.props.shift.notes}
                                        ref={(input) => this.getNotes = input}
                                    />
                                </div>
                            </div>

                            <button className="btn btn-primary">Kabul Et</button>
                        </form>
                        <br/>
                        <div style={{color: "red"}}>
                            { this.props.error }
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.shifts.loading,
        error: state.shifts.error,
        shift: state.shifts.shifts.find(shift => shift.id == state.shifts.editingShiftId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateShift: (shift) => dispatch(updateShift(shift))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftEditForm)