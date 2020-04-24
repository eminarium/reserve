import React from 'react'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

class SideNav extends React.Component {
    render() {
        return (

            <nav className="col-md-3 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">

                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span><h6><i className="fa fa-user"></i>  &nbsp; <u>MÜŞDERILER</u> </h6></span>
                        <a className="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>

                    <ul className="nav flex-column" style={extraStyle}>
                        <li className="nav-item">
                            <Link to="/applicants/search" className="nav-link">
                                <i className="fa fa-search"></i> &nbsp; Müşderi Gözlegi <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/applicants" className="nav-link">
                                <i className="fa fa-list"></i> &nbsp; Müşderiler <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/applicants/new" className="nav-link">
                                <i className="fa fa-plus-circle"></i> &nbsp; Täze Müşderi
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span><h6><i className="fa fa-trophy"></i>  &nbsp; <u>SYNAGLAR</u> </h6></span>
                        <a className="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>

                    <ul className="nav flex-column" style={extraStyle}>
                        <li className="nav-item">
                            <Link to="/subject_tests/search" className="nav-link">
                                <i className="fa fa-search"></i> &nbsp; Synag Gözlegi <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/subject_tests" className="nav-link">
                                <i className="fa fa-list-ul"></i> &nbsp; Synag Sanawy
                            </Link>
                        </li>
                    </ul>

                    <hr />
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span><h6><i className="fa fa-archive"></i>  &nbsp; <u>REZERWLER</u> </h6></span>
                        <a className="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>

                    <ul className="nav flex-column" style={extraStyle}>
                        <li className="nav-item">
                            <Link to="/reservations/search" className="nav-link">
                                <i className="fa fa-search"></i> &nbsp; Rezerw Gözlegi <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reservations" className="nav-link">
                                <i className="fa fa-list-ul"></i> &nbsp; Rezerw Sanawy
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reservations/report-detailed" className="nav-link">
                                <i className="fa fa-bar-chart"></i> &nbsp; Rezerw Hasabaty
                            </Link>
                        </li>
                    </ul>
                    <hr />
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span><h6><i className="fa fa-cogs"></i>  &nbsp; <u>НАСТРОЙКИ</u></h6></span>
                        <a className="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2" style={extraStyle}>
                        <li className="nav-item">
                            <Link to="/seasons" className="nav-link">
                                <i className="fa fa-calendar"></i> &nbsp; Tapgyrlar
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/shifts" className="nav-link">
                                <i className="fa fa-hourglass-half"></i> &nbsp; Wagtlar (Smenalar)
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/languages" className="nav-link">
                                <i className="fa fa-language"></i> &nbsp; Diller
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/subject_categories" className="nav-link">
                                <i className="fa fa-tasks"></i> &nbsp; Ders Görnüşleri
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/subjects" className="nav-link">
                                <i className="fa fa-tasks"></i> &nbsp; Dersler
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">
                                <i className="fa fa-user"></i> &nbsp; Ulanyjylar
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    }

}

export default SideNav;

const extraStyle = {
    paddingLeft: 15,
}