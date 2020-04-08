import React from 'react'
import { connect } from 'react-redux'
import { postSeason } from '../../redux-store'
import LoaderImage from 'images/loader.gif'


class SeasonNewForm extends React.Component {
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


            this.props.postSeason({
                title: event.target.title.value,
                order_no: event.target.order_no.value,
                start_date: event.target.start_date.value,
                end_date: event.target.end_date.value,
                return_deadline: event.target.return_deadline.value,
                notes: event.target.notes.value,
            })

            if (!this.props.loading)
                this.props.history.push('/seasons')
        }
    }

    render() {
        return (
            <div>

                <div className="card" style={{ width: '28rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">
                            Täze Tapgyr Goş &nbsp; &nbsp; &nbsp; 
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
                                <label htmlFor="order_no" className="col-sm-10 col-form-label">Tertip belgisi</label>
                                <div className="col-sm-10">
                                    <input type="text" id="order_no" name="order_no" className="form-control" required
                                        ref={(input) => this.getOrderNo = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="start_date" className="col-sm-10 col-form-label">Başlaýan senesi</label>
                                <div className="col-sm-10">
                                    <input type="date" id="start_date" name="start_date" className="form-control" required
                                        ref={(input) => this.getStartDate = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="end_date" className="col-sm-10 col-form-label">Tamamlanýan senesi</label>
                                <div className="col-sm-10">
                                    <input type="date" id="end_date" name="end_date" className="form-control" required
                                        ref={(input) => this.getEndDate = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="return_deadline" className="col-sm-10 col-form-label">Gaýtarma senesi</label>
                                <div className="col-sm-10">
                                    <input type="date" id="return_deadline" name="return_deadline" className="form-control" required
                                        ref={(input) => this.getReturnDeadline = input}
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
        loading: state.seasons.loading,
        error: state.seasons.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postSeason: (season) => dispatch(postSeason(season))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonNewForm)