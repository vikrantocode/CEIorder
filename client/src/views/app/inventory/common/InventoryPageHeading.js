/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Row,
  Button,
  ButtonDropdown,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  CustomInput,
  Collapse,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { NotificationManager } from '../../../../components/common/react-notifications';
import IntlMessages from '../../../../helpers/IntlMessages';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import axios from 'axios'

import { useHistory } from 'react-router-dom';

const InventoryPageHeading = ({
  intl,
  handleChangeSelectAll,
  changeOrderBy,
  changePageSize,
  selectedPageSize,
  totalItemCount,
  match,
  startIndex,
  endIndex,
  selectedItemsLength,
  itemsLength,
  onSearchKey,
  orderOptions,
  pageSizes,
  toggleModal,
  heading,
  selectedItems,
  change,
  setchange,
  addUrl,
  deleteMultipleModal,
  orderBy,
  orderManner,
  orderManners
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [modalBasic, setModalBasic] = useState(false);
  const history = useHistory()
  // To Delete 
  const deleteUsers =(e)=>{
    axios.post("/api/delete-user",null,{params:{id:selectedItems}}).then(res=>{
      console.log(res.data)
      setchange(!change)
      setModalBasic(false)
      NotificationManager.success(
            res.data.success,
            'Success',
            3000,
            null,
            null,
            ''
          );
    })
  }

  const deactivate =(e)=>{
    axios.post("/api/deactivate",null,{params:{id:selectedItems}}).then(res=>{
      if(res.data.success){
        setchange(!change)
        NotificationManager.success(
            res.data.success,
            'Success',
            3000,
            null,
            null,
            ''
          );
      }
    })
  }
  const activate =(e)=>{
    axios.post("/api/activate",null,{params:{id:selectedItems}}).then(res=>{
      if(res.data.success){
        setchange(!change)
        NotificationManager.success(
            res.data.success,
            'Success',
            3000,
            null,
            null,
            ''
          );
      }
    })
  }
  const { messages } = intl;

  return (
    <>
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id={heading} />
          </h1>

          <div className="text-zero top-right-button-container">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={()=> addUrl ? history.push(addUrl) : toggleModal()}
            > {heading.slice(heading.length - 3, ) === 'ies' ? 
              <IntlMessages id={`Add ${heading.slice(0,heading.length - 3) + 'y' }`.toUpperCase()} />
              :
              <IntlMessages id={`Add ${heading.slice(0, heading.length - 1)}`.toUpperCase()} />
            }
            </Button>
            {'  '}
            <ButtonDropdown
              isOpen={dropdownSplitOpen}
              toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
            >
              <div className="btn btn-primary btn-lg pl-4 pr-0 check-button check-all">
                <CustomInput
                  className="custom-checkbox mb-0 d-inline-block"
                  type="checkbox"
                  id="checkAll"
                  checked={selectedItemsLength >= itemsLength}
                  onChange={() => handleChangeSelectAll(true)}
                  label={
                    <span
                      className={`custom-control-label ${
                        selectedItemsLength > 0 &&
                        selectedItemsLength < itemsLength
                          ? 'indeterminate'
                          : ''
                      }`}
                    />
                  }
                />
              </div>
              <DropdownToggle
                caret
                color="primary"
                className="dropdown-toggle-split btn-lg"
              />
              <DropdownMenu right>
                <DropdownItem onClick={deleteMultipleModal}>
                <span>Delete</span>
                  {/* <IntlMessages onClick={()=>setModalBasic(true)} id="pages.delete" /> */}
                </DropdownItem>
                <DropdownItem onClick={activate}>
                <span >Activate</span>
                </DropdownItem>
                <DropdownItem onClick={deactivate}>
                <span >De-activate</span>
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <Breadcrumb match={match} />
        </div>

        <div className="mb-2">
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
          >
            <IntlMessages id="pages.display-options" />{' '}
            <i className="simple-icon-arrow-down align-middle" />
          </Button>
          <Collapse
            isOpen={displayOptionsIsOpen}
            className="d-md-block"
            id="displayOptions"
          >
            {/* <span className="mr-3 d-inline-block float-md-left">
              <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'list' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('list')}
              >
                <DataListIcon />
              </a>
              <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'thumblist' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('thumblist')}
              >
                <ThumbListIcon />
              </a>
              <a
                href="#/"
                className={`mr-2 view-icon ${
                  displayMode === 'imagelist' ? 'active' : ''
                }`}
                onClick={() => changeDisplayMode('imagelist')}
              >
                <ImageListIcon />
              </a>
            </span> */}

            <div className="d-block d-md-inline-block pt-1">
              <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                <DropdownToggle caret color="outline-dark" size="xs">
                  <IntlMessages id="pages.orderby" />
                  {orderBy.label}
                </DropdownToggle>
                <DropdownMenu>
                  {orderOptions.map((order, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changeOrderBy(order.column)}
                      >
                        {order.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                <DropdownToggle caret color="outline-dark" size="xs">
                  <IntlMessages id="Order Manner : " />
                  {orderManner.label}
                </DropdownToggle>
                <DropdownMenu>
                  {orderManners.map((order, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changeOrderBy(order.column)}
                      >
                        {order.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder={messages['menu.search']}
                  onKeyPress={(e) => onSearchKey(e)}
                />
              </div>
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex} of ${totalItemCount} `}</span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {selectedPageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => changePageSize(size)}
                      >
                        {size}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Collapse>
        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    {/* <Modal isOpen={modalBasic} toggle={() => setModalBasic(!modalBasic)}>
        <ModalHeader>
          <IntlMessages id="Delete" />
        </ModalHeader>
        <ModalBody>
         Are you sure you want to delete user?
        </ModalBody>
        <ModalFooter>
          <Button onClick={deleteUsers} color="primary">
            Confirm
          </Button>{' '}
          <Button color="secondary" onClick={() => setModalBasic(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal> */}
    </>
  );
};

export default injectIntl(InventoryPageHeading);
