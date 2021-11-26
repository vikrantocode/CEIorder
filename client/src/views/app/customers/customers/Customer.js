import React, { useEffect, useState } from 'react';
import { Row, Button, Col, Card, CardBody, Table } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';
import { NotificationManager } from '../../../../components/common/react-notifications';

const Customer = ({ match }) => {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [id, setId] = useState(0);
  const [change, setChange] = useState(false);
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    setId(match.params.id);
    axios
      .get(`/api/customers/details/${match.params.id}`)
      .then((res) => {
        setData(res.data.customer);
        setOrders(res.data.orders);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err.response);
        return NotificationManager.error(
          'Something Went Wrong!!!',
          'Error',
          3000
        );
      });
  }, [change]);
  var date = new Date().toString().slice(4, 15).replace(/-/g, '/');

  const getTotalPrice = () => {
    let sum = 0;
    orders.forEach((order) => (sum += order.paymentDetail.grandTotal));
    return sum.toFixed(2);
  };

  const getLastOrderTotal = () => {
    let max = 0;
    orders.forEach(({ paymentDetail }) => {
      if (paymentDetail.grandTotal > max) max = paymentDetail.grandTotal;
    });
    return max;
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading={`${data.username}`} match={match} />
          <div className="text-zero top-right-button-container">
            <Button
              color="danger"
              size="lg"
              outline
              className="top-right-button"
              onClick={() => {
                history.push('/app/customers');
              }}
            >
              <IntlMessages id="Back" />
            </Button>
            {'  '}
          </div>
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <div className="d-flex flex-column">
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <Table>
                      <tbody>
                        {data.firstName && (
                          <tr>
                            <th>First Name</th>
                            <td>{data.firstName}</td>
                          </tr>
                        )}
                        {data.email && (
                          <tr>
                            <th>Email</th>
                            <td>{data.email}</td>
                          </tr>
                        )}
                        {data.address1 && (
                          <tr>
                            <th>Address 1</th>
                            <td>{data.address1}</td>
                          </tr>
                        )}
                        {data.city && (
                          <tr>
                            <th>City</th>
                            <td>{data.city}</td>
                          </tr>
                        )}
                        {data.country && (
                          <tr>
                            <th>Country</th>
                            <td>{data.country}</td>
                          </tr>
                        )}
                        {data.phone && (
                          <tr>
                            <th>Phone</th>
                            <td>{data.phone}</td>
                          </tr>
                        )}
                        {data.creditTerm && (
                          <tr>
                            <th>Credit Term</th>
                            <td>{data.creditTerm}</td>
                          </tr>
                        )}
                        {data.userPhone1 && (
                          <tr>
                            <th>User Phone 1</th>
                            <td>{data.userPhone1}</td>
                          </tr>
                        )}
                        {data.userPhone3 && (
                          <tr>
                            <th>User Phone 3</th>
                            <td>{data.userPhone3}</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Col>
                  <Col>
                    <Table>
                      <tbody>
                        {data.lastName && (
                          <tr>
                            <th>Last Name</th>
                            <td>{data.lastName}</td>
                          </tr>
                        )}
                        {data.emailCC && (
                          <tr>
                            <th>Email CC</th>
                            <td>{data.emailCC}</td>
                          </tr>
                        )}
                        {data.address2 && (
                          <tr>
                            <th>Address 2</th>
                            <td>{data.address2}</td>
                          </tr>
                        )}
                        {data.state && (
                          <tr>
                            <th>State</th>
                            <td>{data.state}</td>
                          </tr>
                        )}
                        {data.zipCode && (
                          <tr>
                            <th>Zip Code</th>
                            <td>{data.zipCode}</td>
                          </tr>
                        )}
                        {data.businessName ? (
                          <tr>
                            <th>Business Name</th>
                            <td>{data.businessName}</td>
                          </tr>
                        ) : (
                          ''
                        )}
                        {data.creditLimit ? (
                          <tr>
                            <th>Credit Limit</th>
                            <td>{data.creditLimit}</td>
                          </tr>
                        ) : (
                          ''
                        )}
                        {data.userPhone2 ? (
                          <tr>
                            <th>User Phone 2</th>
                            <td>{data.userPhone2}</td>
                          </tr>
                        ) : (
                          ''
                        )}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col></Col>
                  <Col>
                    {data.createdAt && (
                      <div>
                        <span className="font-weight-bold mr-3 mt-2">
                          Joined Us On :
                        </span>{' '}
                        {new Date(data.createdAt).toString()}
                      </div>
                    )}
                    <div>
                      <span className="font-weight-bold mr-3 mt-2">
                        Last Order Total :{' '}
                      </span>{' '}
                      $ {getLastOrderTotal()}
                    </div>
                    <div>
                      <span className="font-weight-bold mr-3 mt-2">
                        Total No. Of Orders :
                      </span>{' '}
                      {orders.length}
                    </div>
                    <div>
                      <span className="font-weight-bold mr-3 mt-2">
                        Order Grand Total ( Till {date} ) :{' '}
                      </span>{' '}
                      $ {getTotalPrice()}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    </>
  );
};

export default Customer;
