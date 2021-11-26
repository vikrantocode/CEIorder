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
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { NotificationManager } from '../../../../components/common/react-notifications';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useHistory } from 'react-router-dom';

const heading = 'Brands';

const BrandPageHeading = ({
  intl,
  handleChangeSelectAll,
  changeOrderBy,
  changeOrderManner,
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
  manner,
  order,
  orderManners,
  selectedItems,
  change,
  setchange,
  addUrl,
  deleteMultipleModal,
  activate,
  deactivate,
  setData,
  handleUpload,
  importModal,
  setImportModal,
  importing,
  onchangepagesize,
}) => {
  const history = useHistory();
  const { messages } = intl;
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id={heading} />
            </h1>
            <div className="text-zero top-right-button-container">
              {/* <Button
                color="info"
                size="lg"
                className="top-right-button"
                onClick={() => {
                  setImportModal(true);
                }}
              >
                <IntlMessages id="IMPORT .csv" />
              </Button> */}
              {'  '}
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={() => (addUrl ? history.push(addUrl) : toggleModal())}
              >
                {' '}
                <IntlMessages id="ADD BRANDS" />
                {/* {heading.slice(heading.length - 3) === 'ies' ? (
                  <IntlMessages
                    id={`Add ${
                      heading.slice(0, heading.length - 3) + 'y'
                    }`.toUpperCase()}
                  />
                ) : (
                  <IntlMessages
                    id={`Add ${heading.slice(
                      0,
                      heading.length - 1
                    )}`.toUpperCase()}
                  />
                )} */}
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
                    <span>Activate</span>
                  </DropdownItem>
                  <DropdownItem onClick={deactivate}>
                    <span>De-activate</span>
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
                    {order.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderOptions.map((order, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeOrderBy(order)}
                        >
                          {order.label}
                        </DropdownItem>
                      );
                    })}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="Manner : " />
                    {manner.label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {orderManners.map((manner, index) => {
                      return (
                        <DropdownItem
                          key={index}
                          onClick={() => changeOrderManner(manner)}
                        >
                          {manner.label}
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
                    onKeyUp={(e) => onSearchKey(e)}
                  />
                </div>
              </div>
              <div className="float-md-right pt-1">
                <span className="text-muted text-small mr-1">{`${startIndex}-${
                  endIndex > totalItemCount ? totalItemCount : endIndex
                } of ${totalItemCount} `}</span>
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
                            changePageSize(size);
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
          <IntlMessages id="Add Category by importing CSV file." />
        </ModalHeader>
        <ModalBody>
          {/* <CsvModalContent importing={importing} setData={setData} /> */}
          {/* <CsvModalCategory importing={importing} setData={setData} /> */}
        </ModalBody>
        <ModalFooter>
          {!importing && (
            <div>
              <Button onClick={handleUpload} color="primary">
                Import
              </Button>{' '}
              <Button color="secondary" onClick={() => setImportModal(false)}>
                Cancel
              </Button>
            </div>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default injectIntl(BrandPageHeading);
