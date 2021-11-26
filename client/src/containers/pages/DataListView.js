import React, { useState } from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { NotificationManager } from '../../components/common/react-notifications';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../components/common/CustomBootstrap';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import IntlMessages from '../../helpers/IntlMessages';
import axios from 'axios';
import Select from 'react-select';
import CustomSelectInput from '../../components/common/CustomSelectInput';

import {
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

const DataListView = ({
  product,
  isSelect,
  collect,
  onCheckItem,
  categories,
  change,
  setchange,
  index,
}) => {
  const [formData, setformData] = React.useState({});
  const [modalBasic, setModalBasic] = useState(false);
  const [details, setDetails] = useState({});
  const [deleteId, setdeleteId] = useState('');
  const [modal, setModal] = useState(false);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const baseUrl = 'https://cdn.linqusacorp.com';
  // GET THE USER DETAILS AND OPEN THE EDIT MODAL
  const openModal = (e) => {
    axios.get('/api/user-details', { params: { id: e } }).then((res) => {
      console.log(res.data.data);
      setDetails(res.data.data);
      console.log(details);
      setModal(true);
    });
  };
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log('picture: ', e.target.files);
      setPicture(e.target.files[0]);
      console.log(picture);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
        console.log(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const styles = {
    active: {
      color: 'green',
    },
    inactive: {
      color: 'red',
    },
    profileImg: {
      height: '3rem',
      width: '3rem',
      borderRadius: '50%',
    },
    editprofileImage: {
      height: '5rem',
      width: '5rem',
      borderRadius: '50%',
    },
  };

  const setRole = (role) => {
    if (role === 'user') return { label: 'User', value: 'user', key: 0 };
    else if (role === 'admin')
      return { label: 'Admin', value: 'admin', key: 1 };
    else if (role === 'magentoUser')
      return { label: 'Magento User', value: 'magentoUser', key: 1 };
  };

  // EDIT HANDLER
  const edit = async (e) => {
    console.log(e);
    if (picture) {
      const data = new FormData();
      if (formData.firstName) {
        data.append('firstName', formData.firstName);
      }
      if (formData.lastName) {
        data.append('lastName', formData.lastName);
      }
      if (formData.email) {
        data.append('email', formData.email);
      }
      if (formData.phone) {
        data.append('phone', formData.phone);
      }
      if (formData.role) {
        data.append('role', formData.role);
      }
      if (formData.address) {
        data.append('address', formData.address);
      }
      data.append('profileImage', picture);
      try {
        await axios.post(`/api/edit-user?id=${e}`, data);
        setModal(false);
        setchange(!change);
        return NotificationManager.success(
          'User Details Updated',
          'Success',
          3000
        );
      } catch (err) {
        console.log(err);
        return NotificationManager.error('Something Went Wrong', 'Error', 3000);
      }
    } else {
      try {
        await axios.post(`/api/edit-user?id=${e}`, formData);
        setModal(false);
        setchange(!change);
        return NotificationManager.success(
          'User Details Updated',
          'Success',
          3000
        );
      } catch (err) {
        console.log(err);
        return NotificationManager.error('Something Went Wrong', 'Error', 3000);
      }
    }
  };

  const deleteModal = (e) => {
    setdeleteId(e);
    setModalBasic(true);
  };

  // DELETE SINGLE USER
  const deleteUser = (e) => {
    axios
      .post('/api/delete-user', null, { params: { id: deleteId } })
      .then((res) => {
        setchange(!change);
        setModalBasic(false);
        NotificationManager.success(
          res.data.success,
          'Success',
          3000,
          null,
          null,
          ''
        );
      });
  };
  return (
    <>
      <Colxx xxs="12" className="mb-3">
        <ContextMenuTrigger id="menu_id" data={product.id} collect={collect}>
          <Card>
            <div className="pl-2 d-flex flex-grow-1 min-width-zero">
              <div
                style={{ padding: '.5rem' }}
                className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
              >
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  <CustomInput
                    className="item-check mb-0"
                    type="checkbox"
                    id={`check_${product.id}`}
                    checked={isSelect}
                    onChange={(event) => onCheckItem(event, product.id)}
                    className={classnames('d-flex flex-row', {
                      active: isSelect,
                    })}
                    label=""
                  />
                </div>
                <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                  {index + 1}
                </div>
                <div className="custom-control pl-1 align-self-center pr-4">
                  <img
                    style={styles.profileImg}
                    src={
                      product.profileImage
                        ? 'http://d3o5w1w6u67fah.cloudfront.net/' +
                          product.profileImage
                        : 'http://d3o5w1w6u67fah.cloudfront.net/userImages/user.png'
                    }
                    alt=""
                  />
                </div>
                <NavLink to={`?p=${product.id}`} className="w-15 w-sm-100">
                  <p
                    style={{ textTransform: 'capitalize' }}
                    className="list-item-heading mb-1 truncate"
                  >
                    {product.firstName}
                  </p>
                </NavLink>
                <p className="mb-1 text-muted text-small w-15 w-sm-100 list-item-heading">
                  {' '}
                  {product.lastName}
                </p>
                <p className="mb-1 text-muted text-small w-20 w-sm-100 list-item-heading">
                  {' '}
                  {product.email}
                </p>
                <p className="mb-1 w-10 w-sm-100 list-item-heading truncate text-capitalize">
                  {product.role}
                </p>
                {/* {product.status ? (
                  <p
                    style={styles.active}
                    className="mb-1 w-10 w-sm-100 list-item-heading truncate"
                  >
                    Active
                  </p>
                ) : (
                  <p
                    style={styles.inactive}
                    className="mb-1 w-10 w-sm-100 list-item-heading truncate"
                  >
                    Inactive
                  </p>
                )} */}
                <div className="mb-1 w-10 w-sm-100 list-item-heading truncate">
                  {product.status ? (
                    <Badge color="success" pill>
                      Active
                    </Badge>
                  ) : (
                    <Badge color="warning" pill>
                      Inactive
                    </Badge>
                  )}
                </div>
                <FaEdit
                  onClick={() => openModal(product.id)}
                  // style={{ cursor: 'pointer' }}
                  id={product.id}
                  className="mb-1 w-2 w-sm-100 list-item-heading action-icon "
                />

                <FaTrash
                  onClick={() => deleteModal(product.id)}
                  value={product.id}
                  // style={{ cursor: 'pointer' }}
                  className="mb-1 w-2 w-sm-100 list-item-heading action-icon"
                />
              </div>
            </div>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader>
          <IntlMessages id="Edit" />
        </ModalHeader>
        <ModalBody>
          <div className="d-flex align-items-center justify-content-center flex-column p-3">
            {imgData ? (
              <img style={styles.profileImg} src={imgData} alt="" />
            ) : (
              <img
                style={styles.profileImg}
                src={
                  details.profileImage
                    ? 'http://d3o5w1w6u67fah.cloudfront.net/' +
                      details.profileImage
                    : 'http://d3o5w1w6u67fah.cloudfront.net/userImages/user.png'
                }
                alt=""
              />
            )}
            <Label className="font-weight-bold edit-profile" htmlFor="profile">
              <IntlMessages id="Change Picture" />
            </Label>
            <Input
              onChange={onChangePicture}
              style={{ display: 'none' }}
              id="profile"
              type="file"
            />
          </div>
          <Row className="p-1">
            <Col className="sm-6">
              <Label>
                <IntlMessages id="First name" />
              </Label>
              <Input
                defaultValue={details.firstName}
                onChange={(e) => {
                  setformData({
                    ...formData,
                    firstName: e.target.value.toLowerCase(),
                  });
                }}
              />
            </Col>
            <Col className="sm-6">
              <Label>
                <IntlMessages id="Last name" />
              </Label>
              <Input
                defaultValue={details.lastName}
                onChange={(e) => {
                  setformData({
                    ...formData,
                    lastName: e.target.value.toLowerCase(),
                  });
                }}
              />
            </Col>
          </Row>
          <Row className="p-1">
            <Col className="sm-8">
              <Label>
                <IntlMessages id="Email" />
              </Label>
              <Input
                defaultValue={details.email}
                onChange={(e) => {
                  setformData({ ...formData, email: e.target.value });
                }}
              />
            </Col>
            <Col className="sm-4">
              <Label>
                <IntlMessages id="Phone" />
              </Label>
              <Input
                defaultValue={details.phone}
                name="text"
                onChange={(e) => {
                  setformData({ ...formData, phone: e.target.value });
                }}
              />
            </Col>
          </Row>
          <Row className="p-1">
            <Col className="sm-6">
              <Label>
                <IntlMessages id="Address" />
              </Label>
              <Input
                defaultValue={details.address}
                name="text"
                onChange={(e) => {
                  setformData({ ...formData, address: e.target.value });
                }}
              />
            </Col>
            <Col className="sm-6">
              <Label>
                <IntlMessages id="Role" />
              </Label>

              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                defaultValue={setRole(details.role)}
                options={categories}
                onChange={(e) => {
                  setformData({ ...formData, role: e.value });
                }}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => edit(details.id)} color="primary">
            Save Changes
          </Button>{' '}
          <Button color="secondary" onClick={() => setModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalBasic} toggle={() => setModal(!modalBasic)}>
        <ModalHeader>
          <IntlMessages id="Delete" />
        </ModalHeader>
        <ModalBody>Are you sure you want to delete user?</ModalBody>
        <ModalFooter>
          <Button onClick={deleteUser} color="primary">
            Confirm
          </Button>{' '}
          <Button color="secondary" onClick={() => setModalBasic(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(DataListView);
