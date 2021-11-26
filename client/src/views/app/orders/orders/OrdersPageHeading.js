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
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import sample from '../sample.csv';

const OrdersPageHeading = ({
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
  addUrl,
  deleteMultipleModal,
  activate,
  deactivate,
  onchangepagesize,
  setModalDelete,
  importModal,
  setImportModal,
  importing,
  setImportFile,
  importOrders,
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const history = useHistory()
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
              color="info"
              size="lg"
              className="top-right-button"
              onClick={()=> {setImportModal(true);}}
            > 
              <IntlMessages id="IMPORT .csv" />
            </Button>
            {'  '}
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
                {}
                <DropdownItem onClick={() => setModalDelete(true)}>
                  <IntlMessages onClick={()=>setModalDelete(true)} id="Delete" />
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
                  Name
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
              <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                <input
                  type="text"
                  name="keyword"
                  id="search"
                  placeholder={messages['menu.search']}
                  onChange={(e) => onSearchKey(e)}
                />
              </div>
            </div>
            <div className="float-md-right pt-1">
              <span className="text-muted text-small mr-1">{`${startIndex}-${endIndex > totalItemCount ? totalItemCount : endIndex} of ${totalItemCount} `}</span>
              <UncontrolledDropdown className="d-inline-block">
                <DropdownToggle caret color="outline-dark" size="xs">
                  {selectedPageSize}
                </DropdownToggle>
                <DropdownMenu right>
                  {pageSizes.map((size, index) => {
                    return (
                      <DropdownItem
                        key={index}
                        onClick={() => {
                          changePageSize(size)
                          onchangepagesize(size)
                        }}
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
    <Modal isOpen={importModal} toggle={() => setImportModal(!importModal)}>
        <ModalHeader>
          <IntlMessages id="Add Orders by importing CSV file." />
        </ModalHeader>
        <ModalBody>
          <Label>
            <IntlMessages id="Select csv File to Import" />
          </Label>
          <CustomInput
            type="file"
            accept=".csv"
            onChange={(event) => {
              setImportFile(event.target.files[0]);
            }}
            id="exampleCustomFileBrowser3"
            name="customFile"
          />
          <div className="col-md-12 mt-3 text-right">
            <Link
              className="h6 text-primary"
              to={sample}
              target="_blank"
              download="sample.csv"
            >
              Sample CSV <i className="iconsminds-data-download"></i>
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            {!importing ? (
              <div>
                <Button onClick={importOrders} color="primary">
                  Import
                </Button>{' '}
                <Button color="secondary" onClick={() => setImportModal(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <h4>Importing!!!</h4>
                <h4>Please Wait...</h4>
              </>
            )}
          </div>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default injectIntl(OrdersPageHeading);
