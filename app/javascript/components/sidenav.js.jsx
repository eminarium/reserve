import React from 'react'
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

class SideNav extends React.Component {
    render() {
        return (

            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/customers" className="nav-link">
                                <i className="fa fa-users"></i> &nbsp; Заказчики <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contractors" className="nav-link">
                                <i className="fa fa-users"></i> &nbsp; Подрядчики
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/customer_orders" className="nav-link">
                                <i className="fa fa-shopping-cart"></i> &nbsp; Проекты Заказчиков
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contractor_orders" className="nav-link">
                                <i className="fa fa-shopping-cart"></i> &nbsp; Проекты Подрядчиков
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/customer_payments" className="nav-link">
                                <i className="fa fa-rub"></i> &nbsp; Платежи от Заказчиков
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contractor_payments" className="nav-link">
                                <i className="fa fa-rub"></i> &nbsp; Платежи Подрядчикам
                            </Link>
                        </li>

                    </ul>

                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span><h6><i className="fa fa-cogs"></i>  &nbsp; НАСТРОЙКИ</h6></span>
                        <a className="d-flex align-items-center text-muted" href="#">
                            <span data-feather="plus-circle"></span>
                        </a>
                    </h6>
                    <ul className="nav flex-column mb-2">
                        <li className="nav-item">
                            <Link to="/job_types" className="nav-link">
                                <i className="fa fa-trello"></i> &nbsp; Виды Работ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/payment_types" className="nav-link">
                                <i className="fa fa-credit-card"></i> &nbsp; Способы Оплаты
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/statuses" className="nav-link">
                                <i className="fa fa-exchange"></i> &nbsp; Статусы
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">
                                <i className="fa fa-user"></i> &nbsp; Пользователи
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

        );
    }

}

export default SideNav;