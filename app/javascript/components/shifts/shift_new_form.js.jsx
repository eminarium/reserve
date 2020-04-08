import React from 'react'
import { connect } from 'react-redux'
import { postShift } from '../../redux-store'
import LoaderImage from 'images/loader.gif'


class ShiftNewForm extends React.Component {
    constructor() {
        super();

        this.submitForm = this.submitForm.bind(this);
    }

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
            //console.log("Event Target : " + event.target.title.value + " " + event.target.notes.value);
            //console.log("Reference : " + this.getTitle.value + " " + this.getNotes.value);


            this.props.postShift({
                title: event.target.title.value,
                notes: event.target.notes.value,
                start_time: event.target.start_time.value,
                end_time: event.target.end_time.value
            })

            if (!this.props.loading)
                this.props.history.push('/shifts')
        }
    }

    render() {
        return (
            <div>

                <div className="card" style={{ width: '28rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">
                            Täze Wagt (Smena) Goş &nbsp; &nbsp; &nbsp; 
                            {
                                (this.props.loading) ? <img src={LoaderImage} /> :""
                            }
                        </h5>
                        <form noValidate onSubmit={this.submitForm}>

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-10 col-form-label">Wagtyň (Smenanyň) Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="title" name="title" className="form-control" required 
                                        ref={(input) => this.getTitle = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-10 col-form-label">Başlaýan wagty</label>
                                <div className="col-sm-10">
                                    <input type="time" id="start_time" name="start_time" className="form-control" required
                                        ref={(input) => this.getStartTime = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-10 col-form-label">Tamamlanýan wagty</label>
                                <div className="col-sm-10">
                                    <input type="time" id="end_time" name="end_time" className="form-control" required
                                        ref={(input) => this.getEndTime = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="notes" className="col-sm-10 col-form-label">Bellikler</label>
                                <div className="col-sm-10">
                                    <textarea type="text" id="notes" name="notes" className="form-control" required 
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
        error: state.shifts.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postShift: (shift) => dispatch(postShift(shift))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShiftNewForm)