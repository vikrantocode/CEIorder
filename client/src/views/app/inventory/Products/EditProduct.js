import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import {
  Row,
  Label,
  Input,
  Nav,
  NavItem,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Collapse,
} from 'reactstrap';
import Select from 'react-select';
import IntlMessages from '../../../../helpers/IntlMessages';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import Button from 'reactstrap/lib/Button';
import { useHistory } from 'react-router-dom';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardHeader from 'reactstrap/lib/CardHeader';
import Badge from 'reactstrap/lib/Badge';
import axios from 'axios';
import { NotificationManager } from '../../../../components/common/react-notifications';
import BasicProductDetailForm from './BasicProductDetailForm';
import AdditionalProductDetailForm from './AdditionalProductDetailForm';
import CatalogDetailForm from './CatalogDetailForm';
import PriceAndCostDetailForm from './PriceAndCostDetailForm';
import MeasurementDetailForm from './MeasurementDetailForm';
import SellingDetailForm from './SellingDetailForm';
import UsageDetailForm from './UsageDetailForm';
import UPCDetailForm from './UPCDetailForm';
import ManufacturerDetailForm from './ManufacturerDetailForm';
import SubVendorDetailForm from './SubVendorDetailForm';
import ImageDetailForm from './ImageDetailForm';
import VendorCategoryDetailForm from './VendorCategoryDetailForm';
import BrandDetailForm from './BrandDetailForm';
import VendorDetailForm from './VendorDetailForm';
import SkuDetailForm from './SkuDetailForm';

const BinaryData = [
  { label: 'Active', value: true, key: 0 },
  { label: 'Inactive', value: false, key: 1 },
];

const selectData = [
  { label: 'Small', value: 'Small', key: 0 },
  { label: 'Medium', value: 'Medium', key: 1 },
  { label: 'Large', value: 'Large', key: 2 },
];

const EditProduct = ({ match }) => {
  const [formData, setformData] = useState({});
  const [typeModal, setTypeModal] = useState(false);
  const [name, setName] = useState('');
  const [picture, setPicture] = useState({});
  const [imgData, setImgData] = useState(null);
  const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
  const [productData, setproductData] = useState({});
  const [change, setchange] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState({});
  const [notes, setNotes] = useState([]);
  const [collapseImage, setCollapseImage] = useState(true);
  const [collapseBasic, setCollapseBasic] = useState(false);
  const [collapseAdditional, setCollapseAdditional] = useState(false);
  const [collapseSKU, setCollapseSKU] = useState(false);
  const [collapseCatalog, setCollapseCatalog] = useState(false);
  const [collapseSelling, setCollapseSelling] = useState(false);
  const [collapseUsage, setCollapseUsage] = useState(false);
  const [collapseMeasurement, setCollapseMeasurement] = useState(false);
  const [collapseUPC, setCollapseUPC] = useState(false);
  const [collapseManufacturer, setCollapseManufacturer] = useState(false);
  const [collapseSubVendor, setCollapseSubVendor] = useState(false);
  const [collapseCategory, setCollapseCategory] = useState(false);
  const [collapsePriceAndCost, setCollapsePriceAndCost] = useState(false);
  const [collapseBrand, setCollapseBrand] = useState(false);
  const [collapseVendor, setCollapseVendor] = useState(false);
  const [selectedProCatOptions, setSelectedProCatOptions] = useState([]);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [categories, setcategories] = useState([]);
  const [subVendors, setSubVendors] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [keywords, setKeywords] = useState(productData && productData.keywords);
  const [packageIncludes, setPackageIncludes] = useState(
    productData && productData.packageIncludes
  );
  // States for Indicators
  const [actionI, setActionI] = useState({});
  const [activeI, setActiveI] = useState({});
  const [greenI, setGreenI] = useState({});
  const [airShippableI, setAirShippableI] = useState({});
  const [assemblyI, setAssemblyI] = useState({});
  const [expirationI, setExpirationI] = useState({});
  const [pinkI, setPinkI] = useState({});
  const [privateI, setPrivateI] = useState({});
  const [prop65I, setProp65I] = useState({});
  const [prop65LabelI, setProp65LabelI] = useState({});
  const [recycleI, setRecycleI] = useState({});
  const [stockingI, setStockingI] = useState({});
  const [warrantyI, setwarrantyI] = useState({});
  const [webI, setWebI] = useState({});
  const [UPSI, setUPSI] = useState({});
  const [subVendor, setSubVendor] = useState({});
  const [oldVendor, setOldVendor] = useState({});
  const [brand, setBrand] = useState({});
  const [brands, setBrands] = useState([]);
  const [priceStartDate, setPriceStartDate] = useState('');
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [detail, setDetail] = useState('');
  const [tempPicture, setTempPicture] = useState(null);

  const Editproduct = (e) => {
    e.preventDefault();
    if (!Object.keys(formData).length && !Object.keys(picture).length) {
      history.push('/app/inventory/products');
      return NotificationManager.success('Product Updated', 'Success', 3000);
    }
    const productId = localStorage.getItem('productId');
    const imageForm = new FormData();
    for (let key of Object.keys(formData))
      imageForm.append(key, JSON.stringify(formData[key]));
    for (let index of Object.keys(picture)) {
      for (let image of picture[index]) {
        imageForm.append([index], image);
      }
    }
    axios
      .post('/api/inventory/edit-product', imageForm, {
        params: { id: productId },
      })
      .then((res) => {
        console.log(res);
        history.push('/app/inventory/products');
        NotificationManager.success(
          'Product Details Updated.',
          'Success',
          3000,
          null,
          null,
          ''
        );
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          'Something went Wrong!!!',
          'Error',
          3000,
          null,
          null,
          ''
        );
      });
  };
  const fetchNotes = async () => {
    const productId = localStorage.getItem('productId');
    const { data } = await axios.get(
      `/api/inventory/product-notes/${productId}`
    );
    setNotes(data);
  };
  const fetchBrands = async (selectedBrand) => {
    const { data: brands } = await axios.get(`/api/inventory/get-brands/`);
    let brandList = [];
    let singleBrand;
    for (let brand of brands) {
      singleBrand = {
        label: brand.brandLongName,
        brandShortName: brand.brandShortName,
        brandLongName: brand.brandLongName,
        imageNameBrandLogo: brand.imageNameBrandLogo,
        value: brand.id,
        key: brand.id,
      };
      brandList.push(singleBrand);
    }
    setBrands(brandList);
    if (selectedBrand) {
      // console.log(selectedVendors[0])
      const brandDetail = brandList.find((e) => e.value === selectedBrand);
      setBrand(brandDetail);
    } else {
      setBrand({
        id: 0,
        brandShortName: '',
        brandLongName: '',
      });
    }
  };
  const fetchSubVendors = async (vendorSelected) => {
    const { data: vendors } = await axios.get(
      `/api/inventory/get-all-vendors/`
    );
    let vendorList = [];
    let singleVendor;
    for (let vendor of vendors) {
      singleVendor = {
        label: vendor.vendorAbbreviation,
        vendorAbbreviation: vendor.vendorAbbreviation,
        vendorShortName: vendor.vendorShortName,
        vendorPricerPrintName: vendor.vendorPricerPrintName,
        value: vendor.id,
        key: vendor.id,
      };
      vendorList.push(singleVendor);
    }
    setSubVendors(vendorList);
    if (vendorSelected) {
      // console.log(selectedVendors[0])
      const vendorDetail = vendorList.find((e) => e.value === vendorSelected);
      setSubVendor(vendorDetail);
      setOldVendor(vendorDetail);
    } else {
      setSubVendor({
        id: 0,
        vendorShortName: '',
        vendorPricerPrintName: '',
      });
    }
  };

  const fetchVendors = async (vendorSelected) => {
    const { data: vendors } = await axios.get(
      `/api/inventory/get-each-vendor/`
    );
    let vendorList = [];
    let singleVendor;
    for (let vendor of vendors) {
      singleVendor = {
        label: vendor.name,
        name: vendor.name,
        alias: vendor.alias,
        email: vendor.email,
        value: vendor.id,
        key: vendor.id,
      };
      vendorList.push(singleVendor);
    }
    setVendors(vendorList);
    console.log(vendorList);
    if (vendorSelected) {
      // console.log(selectedVendors[0])
      const vendorDetail = vendorList.find((e) => e.value === vendorSelected);
      setVendor(vendorDetail);
      console.log(vendorDetail);
    } else {
      setVendor({
        label: '',
        name: '',
        alias: '',
        email: '',
        value: '',
        key: 0,
      });
    }
  };

  const fetchCategory = async (selectProCat) => {
    axios.get('/api/inventory/get-category').then((res) => {
      var categoryList = [];
      var singleCategory;
      for (var i of res.data.data) {
        if (i.status) {
          singleCategory = {
            label: i.category,
            value: i.category,
            key: i.id,
          };
          categoryList.push(singleCategory);
        }
      }
      setcategories(categoryList);
      // console.log('categories are', categories);
      var selectedproCat = [];
      // console.log(selectProCat,"===================")
      if (selectProCat) {
        for (var i of selectProCat) {
          selectedproCat.push(categoryList.find((e) => e.key === i));
        }
      }
      setSelectedProCatOptions(selectedproCat);
    });
  };

  useEffect(() => {
    var productId = localStorage.getItem('productId');
    // console.log(productId)
    axios
      .get('/api/inventory/get-product-details', { params: { id: productId } })
      .then((res) => {
        setproductData(res.data.data);
        let vendorIds = [];
        if (res.data.data.vendors.length) {
          vendorIds = res.data.data.vendors.map((elem) => {
            return { key: elem.id, value: elem.id, label: elem.name };
          });
        }
        setSelectedVendors(vendorIds);
        console.log(res.data.data);
        if (
          !res.data.data.upc.UPCRetail ||
          res.data.data.upc.UPCRetail == '0' ||
          res.data.data.upc.UPCRetail === '000000000000'
        ) {
          setMessage("This Product Doesn't have a Valid UPC.");
        } else if (res.data.sameProducts.length > 1) {
          setMessage(`This Product Share the Same UPC as for Product(s) :- `);
          setDetail(
            res.data.sameProducts.map(
              (prod) =>
                prod.id != productId && (
                  <p className="my-2">
                    {prod.id} :: {prod.description25Char}
                    <a href={`/app/inventory/products/detail/${prod.id}`}>
                      <i className="simple-icon-eye font-weight-bold align-middle ml-2"></i>
                    </a>
                  </p>
                )
            )
          );
        }
        setKeywords(res.data.data.keywords);
        setPackageIncludes(res.data.data.packageIncludes);
        setType({
          label: res.data.data.productType,
          value: res.data.data.productType,
          key:
            res.data.data.productType === 'Small'
              ? 0
              : res.data.data.productType === 'Medium'
              ? 1
              : 2,
        });
        console.log(res.data.data);
        const {
          activeIndicator,
          actionIndicator,
          airShippableIndicator,
          assemblyIndicator,
          expirationDateIndicator,
          greenIndicator,
          pinkIndicator,
          privateBrandIndicator,
          prop65Indicator,
          prop65LabelIndicator,
          recycledIndicator,
          stockingIndicator,
          warrantyIndicator,
          webAvailability,
          upc,
          pricesAndCost,
        } = res.data.data;
        activeIndicator
          ? setActiveI({ label: 'Active', value: true, key: 0 })
          : setActiveI({ label: 'Inactive', value: false, key: 1 });
        actionIndicator
          ? setActionI({ label: 'Active', value: true, key: 0 })
          : setActionI({ label: 'Inactive', value: false, key: 1 });
        airShippableIndicator
          ? setAirShippableI({ label: 'Active', value: true, key: 0 })
          : setAirShippableI({ label: 'Inactive', value: false, key: 1 });
        assemblyIndicator
          ? setAssemblyI({ label: 'Active', value: true, key: 0 })
          : setAssemblyI({ label: 'Inactive', value: false, key: 1 });
        expirationDateIndicator
          ? setExpirationI({ label: 'Active', value: true, key: 0 })
          : setExpirationI({ label: 'Inactive', value: false, key: 1 });
        greenIndicator
          ? setGreenI({ label: 'Active', value: true, key: 0 })
          : setGreenI({ label: 'Inactive', value: false, key: 1 });
        pinkIndicator
          ? setPinkI({ label: 'Active', value: true, key: 0 })
          : setPinkI({ label: 'Inactive', value: false, key: 1 });
        privateBrandIndicator
          ? setPrivateI({ label: 'Active', value: true, key: 0 })
          : setPrivateI({ label: 'Inactive', value: false, key: 1 });
        prop65Indicator
          ? setProp65I({ label: 'Active', value: true, key: 0 })
          : setProp65I({ label: 'Inactive', value: false, key: 1 });
        prop65LabelIndicator
          ? setProp65LabelI({ label: 'Active', value: true, key: 0 })
          : setProp65LabelI({ label: 'Inactive', value: false, key: 1 });
        recycledIndicator
          ? setRecycleI({ label: 'Active', value: true, key: 0 })
          : setRecycleI({ label: 'Inactive', value: false, key: 1 });
        stockingIndicator
          ? setStockingI({ label: 'Active', value: true, key: 0 })
          : setStockingI({ label: 'Inactive', value: false, key: 1 });
        warrantyIndicator
          ? setwarrantyI({ label: 'Active', value: true, key: 0 })
          : setwarrantyI({ label: 'Inactive', value: false, key: 1 });
        webAvailability
          ? setWebI({ label: 'Active', value: true, key: 0 })
          : setWebI({ label: 'Inactive', value: false, key: 1 });
        upc.UPSIndicator
          ? setUPSI({ label: 'Active', value: true, key: 0 })
          : setUPSI({ label: 'Inactive', value: false, key: 1 });
        setPriceStartDate(pricesAndCost.priceStartDate);
        fetchCategory(res.data.data.productCategory);
        fetchSubVendors(res.data.data.subVendorId);
        fetchVendors(res.data.data.vendorId);
        fetchBrands(res.data.data.brandId);
        fetchNotes();
      });
  }, [change]);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      console.log('picture: ', e.target.files);
      setPicture(e.target.files[0]);
      console.log(picture);
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addNote = async () => {
    if (!formData.description)
      return NotificationManager.error(
        'Type the note first.',
        'Error',
        3000,
        null,
        null,
        ''
      );
    const data = {
      basicProductDetailProductId: localStorage.getItem('productId'),
      description: formData.description,
    };
    console.log(data);
    try {
      const response = await axios.post('/api/inventory/notes', data);
      NotificationManager.success(
        response.data.success,
        'Success',
        3000,
        null,
        null,
        ''
      );
      formData.description = '';
      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`/api/inventory/notes/${id}`);
      NotificationManager.success(
        response.data.success,
        'Success',
        3000,
        null,
        null,
        ''
      );
      fetchNotes();
    } catch (err) {
      console.log(err);
      NotificationManager.error(
        'Something Went Wrong',
        'Error',
        3000,
        null,
        null,
        ''
      );
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Edit Product" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <div className="d-flex flex-column">
        <Row>
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <Colxx xxs="12">
                  <Row>
                    <Colxx
                      sm="12"
                      xxs="12"
                      md="12"
                      lg="12"
                      xl="12"
                      style={{ borderBottom: '1px solid grey' }}
                      className="py-3"
                    >
                      <Row className="m-0 p-0">
                        <Colxx
                          sm="6"
                          xxs="6"
                          md="6"
                          lg="6"
                          xl="6"
                          className="m-0 p-0"
                        >
                          <Nav className="justify-content-start">
                            <NavItem className="h5 m-0 p-0">
                              <IntlMessages id="Product" /> |{' '}
                              {productData && productData.description25Char}
                            </NavItem>
                          </Nav>
                          <br />
                          <div className="h6">
                            {/* <Badge color="light" pill>
                              <span className="font-weight-bold">SKU : </span>{' '}
                              {productData.itemNumber}
                            </Badge>{' '} */}
                            <Badge color="light" pill>
                              <span className="font-weight-bold">
                                Master SKU :{' '}
                              </span>{' '}
                              {productData.masterSKU}
                            </Badge>{' '}
                            <Badge color="light" pill>
                              <span className="font-weight-bold">
                                UNSELLABLE QTY :{' '}
                              </span>{' '}
                              {productData.packQuantity}
                            </Badge>{' '}
                            <Badge color="light" pill>
                              <span className="font-weight-bold">
                                AVAILABLE QTY :{' '}
                              </span>{' '}
                              {productData.packQuantity}
                            </Badge>{' '}
                          </div>
                        </Colxx>
                        <Colxx
                          sm="6"
                          xxs="6"
                          md="6"
                          lg="6"
                          xl="6"
                          className="m-0 p-0"
                        >
                          <Nav className="justify-content-end">
                            <NavItem className="mx-2">
                              <Button
                                color="warning"
                                onClick={() => setOpen(true)}
                                outline
                              >
                                Notes
                              </Button>
                            </NavItem>
                            <NavItem className="mx-2">
                              <Dropdown
                                isOpen={dropdownBasicOpen}
                                toggle={() =>
                                  setDropdownBasicOpen(!dropdownBasicOpen)
                                }
                                className="mb-5"
                              >
                                <DropdownToggle caret color="secondary" outline>
                                  <IntlMessages id="Actions" />
                                </DropdownToggle>
                                <DropdownMenu>
                                  <DropdownItem header>
                                    <IntlMessages id="dropdowns.header" />
                                  </DropdownItem>
                                  <DropdownItem disabled>
                                    <IntlMessages id="dropdowns.action" />
                                  </DropdownItem>
                                  <DropdownItem>
                                    <IntlMessages id="dropdowns.another-action" />
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                    <IntlMessages id="dropdowns.another-action" />
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </NavItem>
                            <NavItem className="mx-2">
                              <Button
                                color="danger"
                                onClick={() =>
                                  history.push('/app/inventory/products')
                                }
                                outline
                              >
                                Cancel
                              </Button>
                            </NavItem>
                            <NavItem className="mx-2">
                              <Button onClick={Editproduct} color="success">
                                Save
                              </Button>
                            </NavItem>
                          </Nav>
                        </Colxx>
                      </Row>
                    </Colxx>
                    <Colxx sm="6" xxs="6" md="6" lg="6" xl="6" className="pt-3">
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-primary text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              BASIC DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() => setCollapseBasic(!collapseBasic)}
                                className="mb-1"
                              >
                                {collapseBasic ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain Product basic details like :
                            Name, Category, Attribute
                          </label>
                          <Collapse isOpen={collapseBasic}>
                            <BasicProductDetailForm
                              productData={productData}
                              formData={formData}
                              setformData={setformData}
                              selectedProCatOptions={selectedProCatOptions}
                              setSelectedProCatOptions={
                                setSelectedProCatOptions
                              }
                              BinaryData={BinaryData}
                              categories={categories}
                              keywords={keywords}
                              setKeywords={setKeywords}
                              packageIncludes={packageIncludes}
                              setPackageIncludes={setPackageIncludes}
                              activeI={activeI}
                              actionI={actionI}
                              setActionI={setActionI}
                              setActiveI={setActiveI}
                              greenI={greenI}
                              setGreenI={setGreenI}
                              airShippableI={airShippableI}
                              setAirShippableI={setAirShippableI}
                              assemblyI={assemblyI}
                              setAssemblyI={setAssemblyI}
                              expirationI={expirationI}
                              setExpirationI={setExpirationI}
                              pinkI={pinkI}
                              setPinkI={setPinkI}
                              privateI={privateI}
                              setPrivateI={setPrivateI}
                              prop65I={prop65I}
                              setProp65I={setProp65I}
                              prop65LabelI={prop65LabelI}
                              setProp65LabelI={setProp65LabelI}
                              recycleI={recycleI}
                              setRecycleI={setRecycleI}
                              stockingI={stockingI}
                              setStockingI={setStockingI}
                              warrantyI={warrantyI}
                              setwarrantyI={setwarrantyI}
                              webI={webI}
                              setWebI={setWebI}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-info text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              SKU DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() => setCollapseSKU(!collapseSKU)}
                                className="mb-1"
                              >
                                {collapseSKU ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>

                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain all SKU related details like :
                            Master sku etc
                          </label>
                          <Collapse isOpen={collapseSKU}>
                            <SkuDetailForm
                              productData={productData}
                              formData={formData}
                              setformData={setformData}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>

                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-secondary text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              CATALOG DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() =>
                                  setCollapseCatalog(!collapseCatalog)
                                }
                                className="mb-1"
                              >
                                {collapseCatalog ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>

                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain catalog details like : catalog
                            code, name
                          </label>
                          <Collapse isOpen={collapseCatalog}>
                            <CatalogDetailForm
                              productData={
                                productData.catalog ? productData.catalog : {}
                              }
                              formData={formData}
                              setformData={setformData}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-danger text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              MEASUREMENT DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() =>
                                  setCollapseMeasurement(!collapseMeasurement)
                                }
                                className="mb-1"
                              >
                                {collapseMeasurement ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain measurement details like : Box,
                            carton height, width etc
                          </label>
                          <Collapse isOpen={collapseMeasurement}>
                            <MeasurementDetailForm
                              productData={
                                productData.measurement
                                  ? productData.measurement
                                  : {}
                              }
                              formData={formData}
                              setformData={setformData}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-warning text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              USAGE DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() => setCollapseUsage(!collapseUsage)}
                                className="mb-1"
                              >
                                {collapseUsage ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain usage details like : 3 months
                            qty, 1 year qty etc
                          </label>
                          <Collapse isOpen={collapseUsage}>
                            <UsageDetailForm
                              productData={
                                productData.usage ? productData.usage : {}
                              }
                              formData={formData}
                              setformData={setformData}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-success text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              UPC DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() => setCollapseUPC(!collapseUPC)}
                                className="mb-1"
                              >
                                {collapseUPC ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain product UPC details like : UPC,
                            GTIN{' '}
                          </label>
                          <Collapse isOpen={collapseUPC}>
                            <UPCDetailForm
                              productData={
                                productData.upc ? productData.upc : {}
                              }
                              formData={formData}
                              setformData={setformData}
                              BinaryData={BinaryData}
                              UPSI={UPSI}
                              setUPSI={setUPSI}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-info text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              SELLING DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() =>
                                  setCollapseSelling(!collapseSelling)
                                }
                                className="mb-1"
                              >
                                {collapseSelling ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain product selling details like :
                            selling copy, selling point{' '}
                          </label>
                          <Collapse isOpen={collapseSelling}>
                            <SellingDetailForm
                              productData={
                                productData.selling ? productData.selling : {}
                              }
                              formData={formData}
                              setformData={setformData}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-primary text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              MANUFACTURER DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() =>
                                  setCollapseManufacturer(!collapseManufacturer)
                                }
                                className="mb-1"
                              >
                                {collapseManufacturer ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain product manufacturer details
                            like : Name, part number, url{' '}
                          </label>
                          <Collapse isOpen={collapseManufacturer}>
                            <ManufacturerDetailForm
                              productData={
                                productData.manufacturer
                                  ? productData.manufacturer
                                  : {}
                              }
                              formData={formData}
                              setformData={setformData}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-success text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              PRICE AND COST DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() =>
                                  setCollapsePriceAndCost(!collapsePriceAndCost)
                                }
                                className="mb-1"
                              >
                                {collapsePriceAndCost ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain product price details like :
                            unit, price, cost{' '}
                          </label>
                          <Collapse isOpen={collapsePriceAndCost}>
                            <PriceAndCostDetailForm
                              productData={
                                productData.pricesAndCost
                                  ? productData.pricesAndCost
                                  : {}
                              }
                              formData={formData}
                              setformData={setformData}
                              priceStartDate={priceStartDate}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-danger text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              VENDOR CATEGORY DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() =>
                                  setCollapseCategory(!collapseCategory)
                                }
                                className="mb-1"
                              >
                                {collapseCategory ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain Category details like : Name,
                            product_class{' '}
                          </label>
                          <Collapse isOpen={collapseCategory}>
                            <VendorCategoryDetailForm
                              productData={
                                productData.productClass
                                  ? productData.productClass
                                  : {}
                              }
                              formData={formData}
                              setformData={setformData}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-warning">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              BRAND DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() => setCollapseBrand(!collapseBrand)}
                                className="mb-1"
                              >
                                {collapseBrand ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain product Brands details like :
                            logo, name{' '}
                          </label>
                          <Collapse isOpen={collapseBrand}>
                            <BrandDetailForm
                              brands={brands}
                              brand={brand}
                              formData={formData}
                              setformData={setformData}
                              setBrand={setBrand}
                              picture={picture}
                              setPicture={setPicture}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                    </Colxx>
                    <Colxx sm="6" xxs="6" md="6" lg="6" xl="6" className="pt-3">
                      {message && (
                        <p className="alert alert-danger mt-4">
                          {message}
                          {detail}
                        </p>
                      )}
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-info text-light">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              IMAGE DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() => setCollapseImage(!collapseImage)}
                                className="mb-1"
                              >
                                {collapseImage ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain product images detail like :
                            logo, Alt image, group image{' '}
                          </label>
                          <Collapse isOpen={collapseImage}>
                            <ImageDetailForm
                              productData={
                                productData.imageDetail
                                  ? productData.imageDetail
                                  : {}
                              }
                              formData={formData}
                              setformData={setformData}
                              onChangePicture={onChangePicture}
                              imgData={imgData}
                              picture={picture}
                              setPicture={setPicture}
                              setTempPicture={setTempPicture}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-secondary">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              ADDITIONAL DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() =>
                                  setCollapseAdditional(!collapseAdditional)
                                }
                                className="mb-1"
                              >
                                {collapseAdditional ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain product additional details like
                            : description{' '}
                          </label>
                          <Collapse isOpen={collapseAdditional}>
                            <AdditionalProductDetailForm
                              productData={
                                productData.additionalProductDetail
                                  ? productData.additionalProductDetail
                                  : {}
                              }
                              formData={formData}
                              setformData={setformData}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-primary">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              VENDOR DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() =>
                                  setCollapseVendor(!collapseVendor)
                                }
                                className="mb-1"
                              >
                                {collapseVendor ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <label>
                            This Section contain product vendors details like :
                            name, sku, price{' '}
                          </label>
                          <Collapse isOpen={collapseVendor}>
                            <VendorDetailForm
                              vendors={vendors}
                              vendor={vendor}
                              setVendor={setVendor}
                              formData={formData}
                              setformData={setformData}
                              selectedVendors={selectedVendors}
                              setSelectedVendors={setSelectedVendors}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                      <Card className="rounded-top mt-4">
                        <CardHeader className="bg-warning">
                          <CardTitle className="mt-3 mb-0 row">
                            <div className="text-left col-8">
                              <i className="iconsminds-unlock-2 h5 mx-2"></i>
                              SUB VENDOR DETAILS
                            </div>
                            <div className="text-right col-4">
                              <Button
                                color="primary"
                                onClick={() =>
                                  setCollapseSubVendor(!collapseSubVendor)
                                }
                                className="mb-1"
                              >
                                {collapseSubVendor ? (
                                  <IntlMessages id="Close" />
                                ) : (
                                  <IntlMessages id="Edit" />
                                )}
                              </Button>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <Separator />
                        <CardBody>
                          <Collapse isOpen={collapseSubVendor}>
                            <SubVendorDetailForm
                              vendors={subVendors}
                              vendor={subVendor}
                              setVendor={setSubVendor}
                              formData={formData}
                              setformData={setformData}
                            />
                          </Collapse>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
                </Colxx>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
      <Modal isOpen={typeModal} toggle={() => setTypeModal(!typeModal)}>
        <ModalHeader>
          <IntlMessages id="Add New Product Type" />
        </ModalHeader>
        <ModalBody>
          <div>
            <Label>
              <IntlMessages id="Name" />
            </Label>
            <Input
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => alert('Added')} color="primary">
            Add
          </Button>{' '}
          <Button color="secondary" onClick={() => setTypeModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* Notes Modal */}
      <Modal isOpen={open} toggle={() => setOpen(!open)}>
        <ModalHeader>
          <IntlMessages id="Notes" />
        </ModalHeader>
        <ModalBody>
          <div className="mb-3">
            <Label>
              <IntlMessages id="Note Type" />
            </Label>
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              options={selectData}
              onChange={(e) => {
                setformData({ ...formData, reprensiable: e.value });
              }}
            />
          </div>
          {notes.length ? (
            notes.map((note) => (
              <div class="alert alert-info alert-dismissible fade show">
                {note.description}
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  onClick={() => deleteNote(note.id)}
                >
                  <span aria-hidden="true">
                    <i className="simple-icon-trash text-danger"></i>
                  </span>
                </button>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h1>
                {' '}
                <i className="iconsminds-notepad h1"></i>{' '}
              </h1>
              <h6>No Notes to display</h6>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Input
            type="textarea"
            value={formData.description}
            placeholder="Add Note"
            onChange={(e) => {
              setformData({ ...formData, description: e.target.value });
            }}
          />
          <Button color="success" className="ml-2" onClick={addNote}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditProduct;
