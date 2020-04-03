import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Customers from './customers/customers.js'
import CustomerInfo from './customers/customer_info.js'
import CustomerEditForm from './customers/customer_edit_form.js'
import CustomerNewForm from './customers/customer_new_form.js'

import Contractors from './contractors/contractors.js'
import ContractorInfo from './contractors/contractor_info.js'
import ContractorEditForm from './contractors/contractor_edit_form.js'
import ContractorNewForm from './contractors/contractor_new_form.js'

import CustomerOrders from './customer_orders/customer_orders.js'
import CustomerOrderInfo from './customer_orders/customer_order_info.js'
import CustomerOrderEditForm from './customer_orders/customer_order_edit_form.js'
import CustomerOrderNewForm from './customer_orders/customer_order_new_form.js'

import CustomerPayments from './customer_payments/customer_payments.js'
import CustomerPaymentInfo from './customer_payments/customer_payment_info.js'
import CustomerPaymentNewForm from './customer_payments/customer_payment_new_form.js'
import CustomerPaymentEditForm from './customer_payments/customer_payment_edit_form.js'

import ContractorOrders from './contractor_orders/contractor_orders.js'
import ContractorOrderInfo from './contractor_orders/contractor_order_info.js'
import ContractorOrderEditForm from './contractor_orders/contractor_order_edit_form.js'
import ContractorOrderNewForm from './contractor_orders/contractor_order_new_form.js'

import ContractorPayments from './contractor_payments/contractor_payments.js'
import ContractorPaymentInfo from './contractor_payments/contractor_payment_info.js'
import ContractorPaymentNewForm from './contractor_payments/contractor_payment_new_form.js'
import ContractorPaymentEditForm from './contractor_payments/contractor_payment_edit_form.js'

import JobTypes from './job_types/job_types.js'
import JobTypeInfo from './job_types/job_type_info.js'
import JobTypeEditForm from './job_types/job_type_edit_form.js'
import JobTypeNewForm from './job_types/job_type_new_form.js'

import Statuses from './statuses/statuses.js'
import StatusInfo from './statuses/status_info.js'
import StatusEditForm from './statuses/status_edit_form.js'
import StatusNewForm from './statuses/status_new_form.js'

import PaymentTypes from './payment_types/payment_types.js'
import PaymentTypeInfo from './payment_types/payment_type_info.js'
import PaymentTypeEditForm from './payment_types/payment_type_edit_form.js'
import PaymentTypeNewForm from './payment_types/payment_type_new_form.js'

import Users from './users/users.js'
import UserNewForm from './users/user_new_form.js'

import Dashboard from './dashboard.js.jsx'

class Content extends React.Component  {
    render() {
        return (
                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    <Switch>
                        <Route exact path="/" 
                            render={ ({location}) => {
                                    { if (location.pathname == '/') return <Dashboard /> }
                                }
                            }
                        
                        />
                        
                        <Route exact path="/customers" component={Customers} />
                        <Route exact path="/customers/new" component={CustomerNewForm} /> 
                        <Route exact path="/customers/:customerId" component={CustomerInfo} />
                        <Route exact path="/customers/:customerId/edit" component={CustomerEditForm} />                                                

                        <Route exact path="/contractors" component={Contractors} />
                        <Route exact path="/contractors/new" component={ContractorNewForm} />                         
                        <Route exact path="/contractors/:contractorId" component={ContractorInfo} />
                        <Route exact path="/contractors/:contractorId/edit" component={ContractorEditForm} />                                                                    
                        
                        <Route exact path="/customer_orders" component={CustomerOrders} />
                        <Route exact path="/customer_orders/new" component={CustomerOrderNewForm} />
                        <Route exact path="/customer_orders/:customerOrderId" component={CustomerOrderInfo} />
                        <Route exact path="/customer_orders/:customerOrderId/edit" component={CustomerOrderEditForm} />
                        
                        <Route exact path="/customer_payments" component={CustomerPayments} />
                        <Route exact path="/customer_orders/:customerOrderId/customer_payments/new" component={CustomerPaymentNewForm} />
                        <Route exact path="/customer_orders/:customerOrderId/customer_payments/:customerPaymentId/edit" component={CustomerPaymentEditForm} />
                        <Route exact path="/customer_payments/:customerPaymentId" component={CustomerPaymentInfo} />                        
                        
                        <Route exact path="/contractor_orders" component={ContractorOrders} />
                        <Route exact path="/contractor_orders/new" component={ContractorOrderNewForm} />
                        <Route exact path="/contractor_orders/:contractorOrderId" component={ContractorOrderInfo} />                        
                        <Route exact path="/contractor_orders/:contractorOrderId/edit" component={ContractorOrderEditForm} />                        
                        
                        <Route exact path="/contractor_payments" component={ContractorPayments} />
                        <Route exact path="/contractor_orders/:contractorOrderId/contractor_payments/new" component={ContractorPaymentNewForm} />
                        <Route exact path="/contractor_orders/:contractorOrderId/contractor_payments/:contractorPaymentId/edit" component={ContractorPaymentEditForm} />
                        <Route exact path="/contractor_payments/:contractorPaymentId" component={ContractorPaymentInfo} />                                                
                        
                        <Route exact path="/job_types" component={JobTypes} />
                        <Route exact path="/job_types/new" component={JobTypeNewForm} />
                        <Route exact path="/job_types/:jobTypeId" component={JobTypeInfo} />
                        <Route exact path="/job_types/:jobTypeId/edit" component={JobTypeEditForm} />                                                
                        
                        <Route exact path="/statuses" component={Statuses} />
                        <Route exact path="/statuses/new" component={StatusNewForm} />
                        <Route exact path="/statuses/:statusId" component={StatusInfo} />
                        <Route exact path="/statuses/:statusId/edit" component={StatusEditForm} />
                        
                        <Route exact path="/payment_types" component={PaymentTypes} />
                        <Route exact path="/payment_types/new" component={PaymentTypeNewForm} />
                        <Route exact path="/payment_types/:paymentTypeId" component={PaymentTypeInfo} />
                        <Route exact path="/payment_types/:paymentTypeId/edit" component={PaymentTypeEditForm} />                        

                        <Route exact path="/users" component={Users} />
                        <Route exact path="/users/new" component={UserNewForm} />
                    
                    </Switch>
                </main>
        );
    }
}

export default Content;