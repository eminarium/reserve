import React from 'react'
import { connect } from 'react-redux'
import { updateLanguage } from '../../redux-store'
import LoaderImage from 'images/loader.gif'


class LanguageEditForm extends React.Component {
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
            console.log("Event Target : " + event.target.id.value + " " + event.target.title.value + " " + event.target.notes.value);
            console.log("Reference : " + this.getTitle.value + " " + this.getNotes.value);


            this.props.updateLanguage({
                id: event.target.id.value,
                title: event.target.title.value,
                notes: event.target.notes.value
            })

            if (!this.props.loading)
                this.props.history.push('/languages')
        }
    }

    render() {
        return (
            <div>

                <div className="card" style={{ width: '28rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">
                            Dil Maglumatlaryny Üýtget &nbsp; &nbsp; &nbsp;
                            {
                                (this.props.loading) ? <img src={LoaderImage} /> : ""
                            }
                        </h5>
                        <form noValidate onSubmit={this.submitForm}>

                            <input type="hidden" name="id" id="id" defaultValue={this.props.language.id} />

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-10 col-form-label">Diliň Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="title" name="title" className="form-control" required
                                        defaultValue={this.props.language.title}
                                        ref={(input) => this.getTitle = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="notes" className="col-sm-10 col-form-label">Bellikler</label>
                                <div className="col-sm-10">
                                    <textarea type="text" id="notes" name="notes" className="form-control" required 
                                        defaultValue={this.props.language.notes}
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
        loading: state.languages.loading,
        error: state.languages.error,
        language: state.languages.languages.find(lang => lang.id == state.languages.editingLanguageId)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateLanguage: (language) => dispatch(updateLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageEditForm)