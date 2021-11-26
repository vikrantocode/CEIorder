import React from 'react';
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../components/common/CustomSelectInput';
import IntlMessages from '../../helpers/IntlMessages';
import axios from 'axios';
import { NotificationManager } from '../../components/common/react-notifications';

const AddNewModal = ({
  modalOpen,
  toggleModal,
  categories,
  change,
  setchange,
}) => {
  const [formData, setformData] = React.useState({});

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  // Create new user
  const CreateNewUser = (e) => {
    e.preventDefault();
    axios.post('/api/new-user', formData).then((res) => {
      console.log(res);
      setchange(!change);
      toggleModal();
      NotificationManager.success(
        'User Created',
        'Success',
        3000,
        null,
        null,
        ''
      );
    });
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Add New User" />
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col className="sm-6">
            <Label>
              <IntlMessages id="First name" />
            </Label>
            <Input
              onChange={(e) => {
                setformData({ ...formData, firstname: e.target.value });
              }}
            />
          </Col>
          <Col className="sm-6">
            <Label>
              <IntlMessages id="Last name" />
            </Label>
            <Input
              onChange={(e) => {
                setformData({ ...formData, lastname: e.target.value });
              }}
            />
          </Col>
        </Row>
        <Label className="mt-4">
          <IntlMessages id="Email" />
        </Label>
        <Input
          onChange={(e) => {
            setformData({ ...formData, email: e.target.value });
          }}
        />
        <Label className="mt-4">
          <IntlMessages id="Phone" />
        </Label>
        <Input
          name="text"
          onChange={(e) => {
            setformData({ ...formData, phone: e.target.value });
          }}
        />
        <Label className="mt-4">
          <IntlMessages id="Role" />
        </Label>

        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={categories}
          onChange={(e) => {
            setformData({ ...formData, role: e.value });
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button onClick={CreateNewUser} color="primary">
          <IntlMessages id="Create Account" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
