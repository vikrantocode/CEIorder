import React, {useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import IntlMessages from '../../../../helpers/IntlMessages';
import axios from 'axios'
import { NotificationManager } from '../../../../components/common/react-notifications';


const statusOptions = [
  { label: 'Active', value: 'Active', key: 0 },
  { label: 'Inactive', value: 'Inactive', key: 1 }
];
const AddNewProductGroupModal = ({ modalOpen, toggleModal, setFormData, formData, CreateNewProductGroup }) => {

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Add New Product Group" />
      </ModalHeader>
      <ModalBody>
        <div className="mt-3">
          <Label>
              <IntlMessages id="Group Name" />
          </Label>
          <Input onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              }} />
      </div>           
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button onClick={CreateNewProductGroup} color="primary">
          <IntlMessages id="Create Group" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewProductGroupModal;

