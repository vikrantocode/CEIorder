import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import Select from 'react-select';
import { Card, CardBody, Button, Label, Col, Row, Input } from 'reactstrap';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import IntlMessages from '../../../../helpers/IntlMessages';
import { NotificationManager } from '../../../../components/common/react-notifications';

const AssignGroup = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState();
  const [change, setChange] = useState(false);
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({});

  const history = useHistory();

  useEffect(() => {
    setId(match.params.id);
    setIsLoading(true);
    (async () => {
      const { data } = await axios.get('/api/orders/groups');
      const groups = data.map((item) => {
        const group = {};
        group.label = item.name;
        group.value = item.id;
        return group;
      });
      setGroups(groups);
      setIsLoading(false);
    })();
  }, [change]);

  const handleSubmit = async (action) => {
    formData.orderId = id;
    if (action === 'create') {
      try {
        const res = await axios.post(`/api/orders/groups`, formData);
        NotificationManager.success(
          'Order Group Assigned Successfully',
          'Success',
          3000
        );
        history.push(`/app/orders/edit-order/${id}`);
      } catch (error) {
        console.log(error);
        NotificationManager.error('Something went wrong', 'Error', 3000);
      }
    } else {
      try {
        const res = await axios.post(`/api/orders/groups/assign`, formData);
        NotificationManager.success(
          'Order Group Assigned Successfully',
          'Success',
          3000
        );
        history.push(`/app/orders/edit-order/${id}`);
      } catch (error) {
        console.log(error);
        NotificationManager.error('Something went wrong', 'Error', 3000);
      }
    }
  };

  return isLoading ? (
    <div className="loading"></div>
  ) : (
    <>
      <Card>
        <CardBody>
          <h1>Add to Group</h1>
          <Row>
            <Col>
              <Label>
                <IntlMessages id="Choose From Existing Groups" />
              </Label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                options={groups}
                onChange={(e) => {
                  setFormData({ ...formData, orderGroupId: e.value });
                }}
              />
            </Col>
            <Col>
              <Button className="mt-4" onClick={() => handleSubmit('assign')}>
                Add to Group
              </Button>
            </Col>
            <Col></Col>
          </Row>
          <div className="h4 my-2">Or</div>
          <Row>
            <Col>
              <Label>
                <IntlMessages id="Add and Assign to Group" />
              </Label>
              <Input
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </Col>
            <Col>
              <Button className="mt-4" onClick={() => handleSubmit('create')}>
                Create and Assign
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default AssignGroup;
