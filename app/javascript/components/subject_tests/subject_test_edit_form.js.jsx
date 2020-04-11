import React from 'react'
import { connect } from 'react-redux'
import { 
    updateSubject,
    fetchSubjectCategories,
    fetchLanguages
} from '../../redux-store'
import LoaderImage from 'images/loader.gif'


class SubjectEditForm extends React.Component {
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
            console.log("Event Target : " + event.target.id.value + " " + event.target.title.value + " " + event.target.notes.value);
            //console.log("Reference : " + this.getTitle.value + " " + this.getNotes.value);
            console.log("Indexes : " + event.target.subject_category_id.selectedIndex + " " + event.target.language_id.selectedIndex);

            var scid = event.target.subject_category_id.options[event.target.subject_category_id.selectedIndex]
            var lid = event.target.language_id.options[event.target.language_id.selectedIndex]

            this.props.updateSubject({
                id: event.target.id.value,
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
                            Ders Maglumatlaryny Üýtget &nbsp; &nbsp; &nbsp;
                            {
                                (this.props.loading) ? <img src={LoaderImage} /> : ""
                            }
                        </h5>
                        <form noValidate onSubmit={this.submitForm}>

                            <input type="hidden" name="id" id="id" defaultValue={this.props.subject.id} />

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-10 col-form-label">Dersiň Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="title" name="title" className="form-control" required
                                        defaultValue={this.props.subject.title}
                                        ref={(input) => this.getTitle = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="level" className="col-sm-10 col-form-label">Derejesi</label>
                                <div className="col-sm-10">
                                    <input type="text" id="level" name="level" className="form-control" required
                                        defaultValue={this.props.subject.level}
                                        ref={(input) => this.getLevelId = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="subject_category_id" className="col-sm-10 col-form-label">Dili</label>
                                <div className="col-sm-10">
                                    <select className="custom-select" id="subject_category_id" name="subject_category_id">
                                        {
                                            this.props.subject_categories.map(sc => {
                                                return (
                                                    <option selected={sc.id === this.props.subject.subject_category.id} value={sc.id} key={sc.id}>
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
                                            this.props.languages.map( language => {
                                                return (
                                                    <option selected={language.id === this.props.subject.language.id} value={language.id} key={language.id}>
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
                                        defaultValue={this.props.subject.passing_points}
                                        ref={(input) => this.getPassingPoints = input}
                                    />
                                </div>
                            </div>


                            <div className="form-group row">
                                <label htmlFor="notes" className="col-sm-10 col-form-label">Bellikler</label>
                                <div className="col-sm-10">
                                    <textarea type="text" id="notes" name="notes" className="form-control" required 
                                        defaultValue={this.props.subject.notes}
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
        subject: state.subjects.subjects.find(subject => subject.id == state.subjects.editingSubjectId),
        subject_categories: state.subject_categories.subject_categories,        
        languages: state.languages.languages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSubject: (subject) => dispatch(updateSubject(subject)),
        fetchSubjectCategories: () => dispatch(fetchSubjectCategories()),
        fetchLanguages: () => dispatch(fetchLanguages())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectEditForm)