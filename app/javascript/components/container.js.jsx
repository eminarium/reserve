import React from 'react'
import SideNav from './sidenav.js.jsx'
import Content from './content.js.jsx'

class Container extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <SideNav />
                    <Content />
                </div>
            </div>
        );
    }
}

export default Container;