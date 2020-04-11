import React from 'react'
import { connect } from 'react-redux'
import { updateSubjectCategory } from '../../redux-store'
import LoaderImage from 'images/loader.gif'


class SubjectCategoryEditForm extends React.Component {
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
            console.log("Event Target : " + event.target.id.value + " " + (event.target.is_kids.checked) + " " + event.target.title.value + " " + event.target.notes.value);
            console.log("Reference : " + this.getTitle.value + " " + this.getNotes.value);


            this.props.updateSubjectCategory({
                id: event.target.id.value,
                title: event.target.title.value,
                is_kids: event.target.is_kids.checked,
                notes: event.target.notes.value
            })

            if (!this.props.loading)
                this.props.history.push('/subject_categories')
        }
    }

    render() {
        return (
            <div>

                <div className="card" style={{ width: '28rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">
                            Ders Görnüşiniň Maglumatlaryny Üýtget &nbsp; &nbsp; &nbsp;
                            {
                                (this.props.loading) ? <img src={LoaderImage} /> : ""
                            }
                        </h5>
                        <form noValidate onSubmit={this.submitForm}>

                            <input type="hidden" name="id" id="id" defaultValue={this.props.subject_category.id} />

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-10 col-form-label">Ders Görnüşiniň Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="title" name="title" className="form-control" required
                                        defaultValue={this.props.subject_category.title}
                                        ref={(input) => this.getTitle = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="is_kids" className="col-sm-10 col-form-label">Çaga Toparymy ?</label>
                                <div className="col-sm-10">
                                    <input type="checkbox" id="is_kids" name="is_kids" className="form-control"
                                        defaultChecked={this.props.subject_category.is_kids}
                                        ref={(input) => this.getIsKids = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="notes" className="col-sm-10 col-form-label">Bellikler</label>
                                <div className="col-sm-10">
                                    <textarea type="text" id="notes" name="notes" className="form-control" required 
                                        defaultValue={this.props.subject_category.notes}
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
        loading: state.subject_categories.loading,
        error: state.subject_categories.error,
        subject_category: state.subject_categories.subject_categories.find(sc => sc.id == state.subject_categories.editingSubjectCategoryId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSubjectCategory: (sc) => dispatch(updateSubjectCategory(sc))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectCategoryEditForm)