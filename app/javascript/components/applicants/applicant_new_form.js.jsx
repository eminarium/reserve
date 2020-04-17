import React from 'react'
import { connect } from 'react-redux'
import { postApplicant } from '../../redux-store'
import LoaderImage from 'images/loader.gif'



class ApplicantNewForm extends React.Component {
    constructor() {
        super();

        this.state = {

        }

        this.submitForm = this.submitForm.bind(this);
        this.checkFormValidity = this.checkFormValidity.bind(this);
    }

    checkFormValidity(form) {

        if (form.first_name.value == "" || form.last_name.value == "" || form.mobile_phone.value == "")
            return false;
        
        return true;

    }

    submitForm(event) {
        event.preventDefault();

        //if (!event.target.checkValidity()) {
        if (!this.checkFormValidity(event.target)) {
            console.log("Form is invalid!");
            this.setState({
                errorMsg: "Все поля должны быть заполнены !"
            })
            return;
        }
        else {
            console.log("Form is Valid!");

            this.props.postApplicant({
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                patronymic: event.target.patronymic.value,
                home_phone: event.target.home_phone.value,
                mobile_phone: event.target.mobile_phone.value,
                school_grade: event.target.school_grade.value,
                age: event.target.age.value,
                notes: (event.target.notes.value)
            })
            /*
            .then((response) => {
                //console.log(response.data)
                //this.props.history.push('/applicants/'+response.data.id)
                //this.props.history.push('applicants/' + this.props.applicants)
            })
            .catch(() => {
                console.log("SOMETHINGS IS WRONG !!!!!!!!!!!!!!!")
                //if (error.response.status === 401) {
                //    localStorage.removeItem('currentUser');
                //    localStorage.removeItem('Token');
                //}

                //console.log(error.error)
                //const errorMsg = error.response.message
                //dispatch(postApplicantFailure(errorMsg))
                
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
                                <label htmlFor="school_grade" className="col-sm-10 col-form-label">Synpy</label>
                                <div className="col-sm-10">
                                    <input type="text" id="school_grade" name="school_grade" className="form-control"
                                        ref={(input) => this.getSchoolGrade = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="age" className="col-sm-10 col-form-label">Ýaşy</label>
                                <div className="col-sm-10">
                                    <input type="text" id="age" name="age" className="form-control" 
                                        ref={(input) => this.getAge = input}
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