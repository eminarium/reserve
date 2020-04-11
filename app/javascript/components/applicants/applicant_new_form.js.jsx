import React from 'react'
import { connect } from 'react-redux'
import { postApplicant } from '../../redux-store'
import LoaderImage from 'images/loader.gif'


class ApplicantNewForm extends React.Component {
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
            console.log("File paths : " + event.target.photo_url.files[0].name);


            this.props.postApplicant({
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                patronymic: event.target.patronymic.value,
                home_phone: event.target.home_phone.value,
                mobile_phone: event.target.mobile_phone.value,
                birth_date: event.target.birth_date.value,
                photo_url: event.target.photo_url.files[0].name,
                notes: event.target.notes.value
            })
            /*
            .then(response => {
                //console.log(response.data)
                this.props.history.push('applicants/'+response.data.id)
            })
            .catch(error => {
                /*
                if (error.response.status === 401) {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('Token');
                }

                console.log(error.error)
                const errorMsg = error.response.message
                dispatch(postApplicantFailure(errorMsg))
                
            })
            */

            //if (!this.props.loading)
                //this.props.history.push('/applicants')
        }
    }

    render() {
        return (
            <div>

                <div className="card" style={{ width: '28rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">
                            Täze Müşderi Goş &nbsp; &nbsp; &nbsp; 
                            {
                                (this.props.loading) ? <img src={LoaderImage} /> :""
                            }
                        </h5>
                        <form noValidate onSubmit={this.submitForm}>

                            <div className="form-group row">
                                <label htmlFor="first_name" className="col-sm-10 col-form-label">Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="first_name" name="first_name" className="form-control" required 
                                        ref={(input) => this.getFirstName = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="last_name" className="col-sm-10 col-form-label">Familiýasy</label>
                                <div className="col-sm-10">
                                    <input type="text" id="last_name" name="last_name" className="form-control" required
                                        ref={(input) => this.getLastName = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="patronymic" className="col-sm-10 col-form-label">Atasynyň Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="patronymic" name="patronymic" className="form-control" required
                                        ref={(input) => this.getPatronymic = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="home_phone" className="col-sm-10 col-form-label">Öý Tel. Belgisi</label>
                                <div className="col-sm-10">
                                    <input type="text" id="home_phone" name="home_phone" className="form-control" required
                                        ref={(input) => this.getHomePhone = input}
                                    />
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="mobile_phone" className="col-sm-10 col-form-label">Mobil Tel. Belgisi</label>
                                <div className="col-sm-10">
                                    <input type="text" id="mobile_phone" name="mobile_phone" className="form-control" required
                                        ref={(input) => this.getMobilePhone = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="photo_url" className="col-sm-10 col-form-label">Suraty</label>
                                <div className="col-sm-10">
                                    <input type="file" id="photo_url" name="photo_url" className="form-control" required
                                        ref={(input) => this.getPhotoUrl = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="birth_date" className="col-sm-10 col-form-label">Doglan Senesi</label>
                                <div className="col-sm-10">
                                    <input type="date" id="birth_date" name="birth_date" className="form-control" required data-date-format="DD MM YYYY" placeholder="YYYY-MM-DD"
                                        ref={(input) => this.getBirthDate = input}
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
        loading: state.applicants.loading,
        error: state.applicants.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postApplicant: (applicant) => dispatch(postApplicant(applicant))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantNewForm)