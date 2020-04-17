import React from 'react'
import { connect } from 'react-redux'
import { updateApplicant } from '../../redux-store'
import LoaderImage from 'images/loader.gif'


class ApplicantEditForm extends React.Component {
    constructor() {
        super();

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

        if (!this.checkFormValidity(event.target)) {
            console.log("Form is invalid!");
            this.setState({
                errorMsg: "Все поля должны быть заполнены !"
            })
            return;
        }
        else {
            console.log("Form is Valid!");
            //console.log("Event Target : " + event.target.id.value + " " + event.target.title.value + " " + event.target.start_time.value + " " + event.target.end_time.value + " " + event.target.notes.value);
            //console.log("Reference : " + this.getTitle.value + " " + this.getStartTime.value + " " + this.getEndTime.value + " " + this.getNotes.value);
            console.log("THIS IS APPLICANT ID : " + event.target.id.value)


            this.props.updateApplicant({
                id: event.target.id.value,
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                patronymic: event.target.patronymic.value,
                home_phone: event.target.home_phone.value,
                mobile_phone: event.target.mobile_phone.value,
                school_grade: event.target.school_grade.value,
                age: event.target.age.value,
                notes: event.target.notes.value
            })

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
                            Müşderi Maglumatlaryny Üýtget &nbsp; &nbsp; &nbsp;
                            {
                                (this.props.loading) ? <img src={LoaderImage} /> : ""
                            }
                        </h5>
                        <form noValidate onSubmit={this.submitForm}>

                            <input type="hidden" name="id" id="id" defaultValue={this.props.applicant.id} />

                            <div className="form-group row">
                                <label htmlFor="first_name" className="col-sm-10 col-form-label">Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="first_name" name="first_name" className="form-control" required
                                        defaultValue={this.props.applicant.first_name}
                                        ref={(input) => this.getFirstName = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="last_name" className="col-sm-10 col-form-label">Familiýasy</label>
                                <div className="col-sm-10">
                                    <input type="text" id="last_name" name="last_name" className="form-control" required
                                        defaultValue={this.props.applicant.last_name}
                                        ref={(input) => this.getLastName = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="patronymic" className="col-sm-10 col-form-label">Atasynyň Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="patronymic" name="patronymic" className="form-control" required
                                        defaultValue={this.props.applicant.patronymic}
                                        ref={(input) => this.getPatronymic = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="home_phone" className="col-sm-10 col-form-label">Öý Tel. Belgisi</label>
                                <div className="col-sm-10">
                                    <input type="text" id="home_phone" name="home_phone" className="form-control" required
                                        defaultValue={this.props.applicant.home_phone}
                                        ref={(input) => this.getHomePhone = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="mobile_phone" className="col-sm-10 col-form-label">Mobil Tel. Belgisi</label>
                                <div className="col-sm-10">
                                    <input type="text" id="mobile_phone" name="mobile_phone" className="form-control" required
                                        defaultValue={this.props.applicant.mobile_phone}
                                        ref={(input) => this.getMobilePhone = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="school_grade" className="col-sm-10 col-form-label">Synpy</label>
                                <div className="col-sm-10">
                                    <input type="text" id="school_grade" name="school_grade" className="form-control"
                                        defaultValue={this.props.applicant.school_grade}
                                        ref={(input) => this.getSchoolGrade = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="age" className="col-sm-10 col-form-label">Ýaşy</label>
                                <div className="col-sm-10">
                                    <input type="text" id="age" name="age" className="form-control"
                                        defaultValue={this.props.applicant.age}
                                        ref={(input) => this.getAge = input}
                                    />
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="notes" className="col-sm-10 col-form-label">Bellikler</label>
                                <div className="col-sm-10">
                                    <textarea type="text" id="notes" name="notes" className="form-control" required
                                        defaultValue={this.props.applicant.notes}
                                        ref={(input) => this.getNotes = input}
                                    />
                                </div>
                            </div>

                            <button className="btn btn-primary">Kabul Et</button>
                        </form>
                        <br />
                        <div style={{ color: "red" }}>
                            {this.props.error}
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
        error: state.applicants.error,
        applicant: state.applicants.applicants.find(applicant => applicant.id == state.applicants.editingApplicantId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateApplicant: (applicant) => dispatch(updateApplicant(applicant))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicantEditForm)