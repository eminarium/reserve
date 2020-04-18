import React from 'react'

class NotFoundPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4" style={{color: 'red'}}>
                            <i className="fa fa-exclamation-triangle" style={{ fontSize: 54 }}></i> &nbsp;
                            Beýle Sahypa Tapylmady...
                        </h1>
                        <p className="lead">
                            Siziň talap eden sahypaňyz tapylmady. Çepdäki ýan menýudan başga sahypany saýlap bilersiňiz...
                        </p>
                    </div>
                </div>                
            </div>
        )
    }
}

export default NotFoundPage;