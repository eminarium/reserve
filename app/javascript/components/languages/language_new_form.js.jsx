import React from 'react'
import { connect } from 'react-redux'
import { postLanguage } from '../../redux-store'
import LoaderImage from 'images/loader.gif'


class LanguageNewForm extends React.Component {
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


            this.props.postLanguage({
                title: event.target.title.value,
                notes: event.target.notes.value
            })

            this.props.history.push('/languages')
        }
    }

    render() {
        return (
            <div>

                <div className="card" style={{ width: '28rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">Täze Dil Goş</h5>
                        <form noValidate onSubmit={this.submitForm}>

                            <div className="form-group row">
                                <label htmlFor="title" className="col-sm-3 col-form-label">Diliň Ady</label>
                                <div className="col-sm-10">
                                    <input type="text" id="title" name="title" className="form-control" required 
                                        ref={(input) => this.getTitle = input}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="notes" className="col-sm-3 col-form-label">Bellikler</label>
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
        loading: state.languages.loading,
        error: state.languages.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postLanguage: (language) => dispatch(postLanguage(language))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageNewForm)