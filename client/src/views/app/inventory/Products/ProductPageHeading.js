/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import {
  Row,
  Col,
  Input,
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
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { NotificationManager } from '../../../../components/common/react-notifications';
import IntlMessages from '../../../../helpers/IntlMessages';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import sample from '../common/sample.csv';

const orderOptions = [
  { column: 'itemNumber', label: 'SKU' },
  { column: 'description25Char', label: 'Product Name' },
  { column: 'priceAndCost.listPrice', label: 'Product Price' },
  { column: 'priceAndCost.costColumn1Price', label: 'Product Cost' },
  { column: 'packQuantity', label: 'Qty' },
];

const orderManners = [
  { value: 'ASC', label: 'Ascending' },
  { value: 'DESC', label: 'Descending' },
];

const exportOptions = [
  { label: 'Export All', value: 'all' },
  { label: 'Export 100', value: '100' },
  { label: 'Export 1000', value: '1000' },
  { label: 'Export 10000', value: '10000' },
  { label: 'Export 100000', value: '100000' },
];

const ProductPageHeading = ({
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
  pageSizes,
  toggleModal,
  heading,
  selectedItems,
  change,
  setchange,
  addUrl,
  deleteMultipleModal,
  importModal,
  setImportModal,
  importing,
  filter,
  status,
  fetchData,
  setfilterdata,
  setImportFile,
  importProducts,
  formData,
  setformData,
  order,
  manner,
  changeOrderManner,
}) => {
  const [dropdownSplitOpen, setDropdownSplitOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  const [filterOptionsIsOpen, setfilterOptionsIsOpen] = useState(false);
  const [modalBasic, setModalBasic] = useState(false);
  const [parentcategories, setParentcategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [sku, setSku] = useState([]);
  const [brand, setBrand] = useState([]);
  const [selectedSkuOptions, setSelectedSkuOptions] = useState([]);
  const [selectedbrandOptions, setSelectedbrandOptions] = useState([]);
  const [selectedvendorOptions, setSelectedvendorOptions] = useState([]);
  const [selectedcategoryOptions, setSelectedcategoryOptions] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const [exportModal, setExportModal] = useState(false);
  const [exportValue, setExportValue] = useState('');
  const [initialId, setInitialId] = useState(1);
  const [exportData, setExportData] = useState([]);
  const [exportStatus, setExportStatus] = useState('');
  const history = useHistory();
  //const [status, setStatus] = useState('default');

  useEffect(() => {
    console.log(selectedcategoryOptions);
    axios.get('/api/inventory/get-each-vendor').then(({ data }) => {
      const arr = [];
      data.map((item) => {
        arr.push({
          key: item.id,
          value: `${item.id}, ${item.name}`,
          label: item.name,
        });
      });
      setVendorList(arr);
    });
  }, [selectedcategoryOptions]);

  const deactivate = (e) => {
    axios
      .post('/api/deactivate', null, { params: { id: selectedItems } })
      .then((res) => {
        if (res.data.success) {
          setchange(!change);
          NotificationManager.success(
            res.data.success,
            'Success',
            3000,
            null,
            null,
            ''
          );
        }
      });
  };
  const activate = (e) => {
    axios
      .post('/api/activate', null, { params: { id: selectedItems } })
      .then((res) => {
        if (res.data.success) {
          setchange(!change);
          NotificationManager.success(
            res.data.success,
            'Success',
            3000,
            null,
            null,
            ''
          );
        }
      });
  };

  // filter all data (sku, brand, vendor, category)
  function getAllData(params) {
    if (filterOptionsIsOpen) {
      fetchData(filterOptionsIsOpen);
    }
  }

  const handleExport = async () => {
    if (!exportValue)
      return NotificationManager.warning(
        'Select One of the Options to Export.',
        'Warning',
        3000
      );
    try {
      setExportStatus('Pending');
      const { data } = await axios.get(
        `/api/inventory/export-products?exportValue=${exportValue}&initialId=${initialId}`
      );
      setExportData(data.products);
      setExportStatus('Completed');
    } catch (error) {
      console.log(error);
      return NotificationManager.error('Something went wrong', 'Error', 3000);
    }
  };

  function filterProduct() {
    //setStatus('processing');
    var sku = [];
    var brand = [];
    var vendor = [];
    var category = [];
    let brandid = [];
    if (selectedSkuOptions) {
      selectedSkuOptions.map((sk) => sku.push(sk.label));
    }
    if (selectedbrandOptions) {
      selectedbrandOptions.map((bd) => brand.push(bd.key));
    }
    if (selectedvendorOptions) {
      selectedvendorOptions.map((ve) => vendor.push(ve.key));
    }
    if (selectedcategoryOptions) {
      selectedcategoryOptions.map((cat) => category.push(cat.key));
    }
    var data = {
      itemNumber: sku,
      brandId: brand,
      vendor: vendor,
      productCategory: category,
    };
    filter(data);
    console.log(data);
  }

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
                className="mr-1"
                onClick={() => {
                  console.log(filterOptionsIsOpen);
                  setfilterOptionsIsOpen(!filterOptionsIsOpen);
                  getAllData();
                  setSelectedSkuOptions([]);
                  setSelectedbrandOptions([]);
                  setSelectedvendorOptions([]);
                  setSelectedcategoryOptions([]);
                  setchange(true);
                  setfilterdata([]);
                }}
              >
                <IntlMessages id="FILTER" />{' '}
                <i className="simple-icon-arrow-down align-middle" />
              </Button>
              <Button
                color="info"
                size="lg"
                className="top-right-button"
                onClick={() => {
                  setImportModal(true);
                }}
              >
                <IntlMessages id="IMPORT .csv/.xlsx" />
              </Button>
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={() => setExportModal(true)}
              >
                <IntlMessages id="EXPORT" />
              </Button>
              {'  '}
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={() => (addUrl ? history.push(addUrl) : toggleModal())}
              >
                {' '}
                {heading.slice(heading.length - 3) === 'ies' ? (
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
                )}
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
          {/* filter section */}

          <Collapse
            isOpen={filterOptionsIsOpen}
            className="pl-3"
            id="displayOptions"
          >
            <Row className="mb-3 mt-3">
              <div className="w-20 pr-1">
                <label>
                  <IntlMessages id="SKU" />
                </label>
                {/* <Input
                  //value={SKU}
                  onChange={(e) => {
                    console.log(e.target.value);
                    // setSKU(e.target.value);
                    // setformData({ ...formData, itemNumber: e.target.value });
                  }}
                /> */}
                <Select
                  placeholder="Type To Search SKU"
                  isLoading={isLoading}
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  isMulti
                  name="form-field-name"
                  value={selectedSkuOptions}
                  onChange={setSelectedSkuOptions}
                  options={sku}
                  onMenuScrollToBottom={(e) => console.log(e)}
                  onInputChange={(e) => {
                    console.log(e);
                    let searchs = encodeURIComponent(e.toLowerCase()).replace(
                      /%20/g,
                      '+'
                    );
                    if (e) {
                      setisLoading(true);
                      axios
                        .get('/api/inventory/skuSearch', {
                          params: { search: searchs },
                        })
                        .then((res) => {
                          let sku = [];
                          var singleSkuData;
                          console.log(res);
                          for (var i of res.data.data) {
                            // console.log(i)
                            singleSkuData = {
                              label: i.itemNumber,
                              value: i.itemNumber,
                              key: i.id,
                            };
                            sku.push(singleSkuData);
                          }
                          setisLoading(false);
                          setSku(sku);
                        });
                    }
                  }}
                />
              </div>
              <div className="w-20 pr-1">
                <label>
                  <IntlMessages id="Brand" />
                </label>
                <Select
                  placeholder="Type To Search Brand"
                  isLoading={isLoading}
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  isMulti
                  name="form-field-name"
                  value={selectedbrandOptions}
                  onChange={setSelectedbrandOptions}
                  options={brand}
                  onInputChange={(e) => {
                    console.log(e);
                    let searchs = encodeURIComponent(e.toLowerCase()).replace(
                      /%20/g,
                      '+'
                    );
                    if (e) {
                      setisLoading(true);
                      axios
                        .get('/api/inventory/brandSearchfilter', {
                          params: { search: searchs },
                        })
                        .then((res) => {
                          let brand = [];
                          var singlebrandData;
                          console.log(res);
                          for (var i of res.data.data) {
                            // console.log(i)
                            singlebrandData = {
                              label: i.brandShortName,
                              value: i.brandShortName,
                              key: i.id,
                            };
                            brand.push(singlebrandData);
                          }
                          setBrand(brand);
                          setisLoading(false);
                        });
                    }
                  }}
                />
              </div>
              <div className="w-20 pr-1">
                <label>
                  <IntlMessages id="Vendor" />
                </label>
                <Select
                  placeholder="Type To Search Vendors"
                  isLoading={isLoading}
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  isMulti
                  name="form-field-name"
                  value={selectedvendorOptions}
                  onChange={setSelectedvendorOptions}
                  options={vendors}
                  onInputChange={(e) => {
                    console.log(e);
                    let searchs = encodeURIComponent(e.toLowerCase()).replace(
                      /%20/g,
                      '+'
                    );
                    if (e) {
                      setisLoading(true);
                      axios
                        .get('/api/inventory/vendorSearchfilter', {
                          params: { search: searchs },
                        })
                        .then((res) => {
                          let vendors = [];
                          var singlevendorData;
                          console.log(res);
                          for (var i of res.data.data) {
                            // console.log(i)
                            singlevendorData = {
                              label: i.name,
                              value: i.name,
                              key: i.id,
                            };
                            vendors.push(singlevendorData);
                          }
                          setVendors(vendors);
                          setisLoading(false);
                        });
                    }
                  }}
                />
              </div>
              <div className="w-20 pr-1">
                <label>
                  <IntlMessages id="Category" />
                </label>
                <Select
                  placeholder="Type To Search Category"
                  isLoading={isLoading}
                  onMenuOpen={() => console.log('menu')}
                  onMenuScrollToBottom={(e) => console.log('bottom', e)}
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  isMulti
                  name="form-field-name"
                  value={selectedcategoryOptions}
                  onChange={setSelectedcategoryOptions}
                  options={parentcategories}
                  onInputChange={(e) => {
                    console.log(e);
                    let searchs = encodeURIComponent(e.toLowerCase()).replace(
                      /%20/g,
                      '+'
                    );
                    if (e) {
                      setisLoading(true);
                      axios
                        .get('/api/inventory/CategorySearchfilter', {
                          params: { search: searchs },
                        })
                        .then((res) => {
                          let categoryList = [];
                          var singlecategoryData;
                          console.log(res);
                          for (var i of res.data.data) {
                            // console.log(i)
                            singlecategoryData = {
                              label: i.category,
                              value: i.category,
                              key: i.id,
                            };
                            categoryList.push(singlecategoryData);
                          }
                          setParentcategories(categoryList);
                          setisLoading(false);
                        });
                    }
                  }}
                />
              </div>

              <div style={{ height: 20 }} className="align-self-baseline mt-4">
                <Button
                  id="filter"
                  style={{ color: 'white' }}
                  size="lg"
                  onClick={() => {
                    filterProduct();
                  }}
                  className={`btn-multiple-state  ${classnames({
                    'show-spinner': status === 'processing',
                    'show-success': status === 'success',
                    'show-fail': status === 'fail',
                  })}`}
                  disabled={status !== 'default'}
                >
                  {/* <IntlMessages id="Filter" /> */}

                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="icon success">
                    <i className="simple-icon-check" />
                  </span>
                  <span className="icon fail">
                    <i className="simple-icon-exclamation" />
                  </span>
                  <span className="label">Filter</span>
                </Button>
              </div>
            </Row>
          </Collapse>

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
                    placeholder="Search And Hit Enter"
                    onKeyUp={(e) => onSearchKey(e)}
                  />
                </div>
              </div>
              <div className="float-md-right pt-1">
                <span className="text-muted text-small mr-1">{`${startIndex}-${
                  totalItemCount > endIndex ? endIndex : totalItemCount
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
                            setchange(!change);
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
          <IntlMessages id="Add Products by importing CSV file." />
        </ModalHeader>
        <ModalBody>
          {/* <CsvModalContent
            setProcessingFile={setProcessingFile}
            setData={setData}
            importing={importing}
          /> */}
          <div className="mb-3">
            <Label>
              <IntlMessages id="Select Vendor" />
            </Label>
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              options={vendorList}
              onChange={(e) => {
                setformData({ ...formData, vendorId: e.value });
              }}
            />
          </div>
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
                <Button onClick={importProducts} color="primary">
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
      <Modal isOpen={exportModal} toggle={() => setExportModal(!exportModal)}>
        <ModalHeader>
          <IntlMessages id="Export Products" />
        </ModalHeader>
        <ModalBody>
          {exportStatus === '' ? (
            <>
              <Row>
                <Col>
                  <div className="mb-3">
                    <Label>
                      <IntlMessages id="Select Count" />
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={exportOptions}
                      onChange={(e) => {
                        setExportValue(e.value);
                      }}
                    />
                  </div>
                </Col>
                {exportValue !== '' && exportValue !== 'all' && (
                  <Col>
                    <div className="mb-3">
                      <Label>
                        <IntlMessages id="Start From(id)" />
                      </Label>
                      <Input
                        type="number"
                        placeholder="default : 1"
                        onChange={(e) => {
                          setInitialId(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                )}
              </Row>
              <div className="ml-1">
                <Button onClick={handleExport}>Export </Button>
              </div>{' '}
            </>
          ) : exportStatus === 'Pending' ? (
            <div>
              <h5 className="text-center mt-4">Please Wait</h5>
              <p className="text-center">Export is in Progress</p>
            </div>
          ) : exportStatus === 'Completed' ? (
            <div>
              <h5 className="text-center mt-4">Export Completed.</h5>
              <div className="text-center mt-2">
                <CSVLink
                  className="btn btn-primary mr-3"
                  data={exportData}
                  filename={`exported_products.csv`}
                >
                  Download CSV
                </CSVLink>
                <Button
                  onClick={() => {
                    setExportData([]);
                    setExportStatus('');
                  }}
                >
                  Export Again
                </Button>
              </div>
            </div>
          ) : (
            ''
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default injectIntl(ProductPageHeading);
