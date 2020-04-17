import React from 'react'
import { connect } from 'react-redux'
import { 
    postSubject,
    fetchSubjectCategories,
    fetchLanguages
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'


class SubjectNewForm extends React.Component {
    constructor() {
        super();

        this.submitForm = this.submitForm.bind(this);
    }

    componentDidMount() {
        this.props.fetchSubjectCategories()
        this.props.fetchLanguages()
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


            this.props.postSubject({
                title: event.target.title.value,
                level: event.target.level.value,
                subject_category_id: event.target.subject_category_id.options[event.target.subject_category_id.selectedIndex].value,
                language_id: event.target.language_id.options[event.target.language_id.selectedIndex].value,
                passing_points: event.target.passing_points.value,
                notes: event.target.notes.value
            })

            if (!this.props.loading)
                this.props.history.push('/subjects')
        }
    }

    render() {
        return (
            <div>

                <div className="card" style={{ width: '28rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">
                            Täze Ders Goş &nbsp; &nbsp; &nbsp; 
                            {
                                (this.props.loading) ? <img src={LoaderImage} /> :""
                            }
                        </h5>
                        <form noValidate onSubmit={this.submitForm}>

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-10 col-form-label">Dersiň Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="title" name="title" className="form-control" required 
                                        ref={(input) => this.getTitle = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="level" className="col-sm-10 col-form-label">Derejesi</label>
                                <div className="col-sm-10">
                                    <input type="text" id="level" name="level" className="form-control" required
                                        ref={(input) => this.getLevelId = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="subject_category_id" className="col-sm-10 col-form-label">Ders Görnüşi</label>
                                <div className="col-sm-10">
                                    <select className="custom-select" id="subject_category_id" name="subject_category_id">
                                        {
                                            this.props.subject_categories.map(sc => {
                                                return (
                                                    <option value={sc.id} key={sc.id}>
                                                        {sc.title}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="language_id" className="col-sm-10 col-form-label">Dili</label>
                                <div className="col-sm-10">
                                    <select className="custom-select" id="language_id" name="language_id">
                                        {
                                            this.props.languages.map(language => {
                                                return (
                                                    <option value={language.id} key={language.id}>
                                                        {language.title}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="passing_points" className="col-sm-10 col-form-label">Geçiş Bahasy</label>
                                <div className="col-sm-10">
                                    <input type="text" id="passing_points" name="passing_points" className="form-control" required
                                        ref={(input) => this.getPassingPoints = input}
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
        loading: state.subjects.loading,
        error: state.subjects.error,
        subject_categories: state.subject_categories.subject_categories,
        languages: state.languages.languages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postSubject: (subject) => dispatch(postSubject(subject)),
        fetchSubjectCategories: () => dispatch(fetchSubjectCategories()),
        fetchLanguages: () => dispatch(fetchLanguages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectNewForm)