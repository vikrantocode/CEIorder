import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  CardHeader,
  Table,
} from 'reactstrap';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import axios from 'axios';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import {
  Separator,
  Colxx,
} from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import GlideComponentThumbs from '../../../../components/carousel/GlideComponentThumbs';
import { detailThumbs } from '../../../../data/carouselItems';

const styles = {
  Image: {
    height: '8rem',
    width: '8rem',
  },
};

const ProductDetail = ({ match, intl }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [activeTab2, setActiveTab2] = useState('Additional');
  const [change, setChange] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [additionalDetail, setAdditionalDetail] = useState({});
  const [catalogDetail, setCatalogDetail] = useState({});
  const [measurementDetail, setmeasurementDetail] = useState({});
  const [manufacturerDetail, setManufacturerDetail] = useState({});
  const [pricesAndCostDetail, setPricesAndCostDetail] = useState({});
  const [productClassDetail, setProductClassDetail] = useState({});
  const [sellingDetail, setSellingDetail] = useState({});
  const [upcDetail, setUpcDetail] = useState({});
  const [usageDetail, setUsageDetail] = useState({});
  const [brandDetail, setBrandDetail] = useState({});
  const [vendorDetails, setVendorDetails] = useState([]);
  const [detailImages, setDetailImages] = useState([]);
  const [detailThumbs, setDetailThumbs] = useState([]);
  const [subVendorDetails, setSubVendorDetails] = useState([]);
  const { id } = useParams();
  const [productCategory, setProductCategory] = useState('');

  const imageServer = 'https://d3o5w1w6u67fah.cloudfront.net/';  

  const getCategoryName = async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(
          `/api/inventory/category-details?id=${id}`
        );
        resolve(`${data?.data?.category}`);
      } catch (error) {
        console.log(error);
        resolve('');
      }
    });
  };

  const getCategoryNames = async (ids) => {
    const categories = [];
    for (let id of ids) {
      const data = await getCategoryName(id);
      categories.push(data);
    }
    setProductCategory(ids.length ? categories.join(', ') : '');
  };

  const history = useHistory();

  const fetchBrandDetails = async (id) => {
    const { data } = await axios.get(`/api/inventory/getBrand/?id=${id}`);
    setBrandDetail(data.data[0]);
    
  };

  const fetchSubVendorDetails = async (id) => {
    const { data } = await axios.get(`/api/inventory/vendors/?id=${id}`);
    setSubVendorDetails(data.data);
    console.log(data);
  };

  let images = [];  

  const fetchProductDetails = async () => {
    const { data } = await axios.get('/api/inventory/get-product-details', {
      params: { id },
    });
    setProductDetail(data.data);
    console.log(data.data);
    setAdditionalDetail(data.data.additionalProductDetail);
    setCatalogDetail(data.data.catalog);
    setmeasurementDetail(data.data.measurement);
    setManufacturerDetail(data.data.manufacturer);
    setPricesAndCostDetail(data.data.pricesAndCost);
    setProductClassDetail(data.data.productClass);
    setSellingDetail(data.data.selling);
    setUpcDetail(data.data.upc);
    setUsageDetail(data.data.usage);
    setVendorDetails(data.data.vendors);
    if (data.data.brandId) await fetchBrandDetails(data.data.brandId);
    if (data.data.subVendorId)
      await fetchSubVendorDetails(data.data.subVendorId);
    const imagesObj = _.omit(data.data.imageDetail, [
      'id',
      'createdAt',
      'updatedAt',
      'basicProductDetailId',
      'itemPictureId',
      'imageText',
    ]);
    for (let prop of Object.keys(imagesObj)) {
      if (
        typeof data.data.imageDetail[prop] === 'string' &&
        data.data.imageDetail[prop].includes(',')
      )
        images = images.concat(data.data.imageDetail[prop].split(', '));
      else images.push(data.data.imageDetail[prop]);
    }
    images = images.filter((image) => image !== '');
    const arr = [];
    const arr2 = [];
    images.forEach((image, index) => {
      const obj = {};
      const obj2 = {};
      obj.id = `large${index}`;
      obj2.id = `thumb${index}`;
      if (image) {
        if (image.startsWith('https://images.truevalue.com/')) {
          obj.img = `${image}&ImageType=1&NoImageType=3&ColorImageSize=2&LineArtImageSize=2`;
          obj2.img = `${image}&ImageType=1&NoImageType=3&ColorImageSize=2&LineArtImageSize=2`;
        } else if (
          image.startsWith('https://hoshizakiamerica.com/') ||
          image.startsWith('https://images.globalindustrial.com/')
        ) {
          obj.img = `${image}`;
          obj2.img = `${image}`;
        } else if (
          image.startsWith('test-image/') ||
          image.startsWith('productimages/') ||
          image.startsWith('kroll/')
        ) {
          obj.img = `${imageServer}${image}`;
          obj2.img = `${imageServer}${image}`;
        } else {
          obj.img = `${imageServer}productimages/${image}`;
          obj2.img = `${imageServer}productimages/${image}`;
        }
        arr.push(obj);
        arr2.push(obj2);
      } 
    });
    setDetailImages(arr);
    setDetailThumbs(arr2);
  };
  useEffect(() => {
    fetchProductDetails();
  }, [change]);
  
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>{productDetail.description25Char}</h1>
          <Breadcrumb match={match} />
          <Separator className="mb-5" />

          <Row>
            <Colxx xxs="12" xl="8" className="col-left">
              <Card className="mb-4">
                <CardBody>
                  <GlideComponentThumbs
                    settingsImages={{
                      bound: true,
                      rewind: false,
                      focusAt: 0,
                      startAt: 0,
                      gap: 5,
                      perView: 1,
                      data: detailImages,
                      brand : brandDetail,
                    }}
                    settingsThumbs={{
                      bound: true,
                      rewind: false,
                      focusAt: 0,
                      startAt: 0,
                      gap: 10,
                      perView: 5,
                      data: detailThumbs,
                      breakpoints: {
                        576: {
                          perView: 4,
                        },
                        420: {
                          perView: 3,
                        },
                      },
                    }}
                  />
                </CardBody>
              </Card>
              <Card className="mb-4">
                <CardHeader>
                  <Nav tabs className="card-header-tabs ">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'basic',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('basic')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="Basic" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'SKU',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('SKU')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="SKU" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'Catalog',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('Catalog')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="Catalog" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'Measurement',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('Measurement')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="Measurement" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === 'Manufacturer',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab('Manufacturer')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="Manufacturer" />
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="SKU">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <h4 className="mb-5">SKU Details</h4>
                          <Row>
                            <Colxx xs="12" xl="12">
                              <Table>
                                <tbody>
                                  {productDetail.masterSKU && (
                                    <tr>
                                      <th scope="row">Master SKU </th>
                                      <td>{productDetail.masterSKU}</td>
                                    </tr>
                                  )}
                                  {productDetail.itemNumber && (
                                    <tr>
                                      <th scope="row">Item SKU</th>
                                      <td>{productDetail.itemNumber}</td>
                                    </tr>
                                  )}
                                  {productDetail.itemPrefix && (
                                    <tr>
                                      <th scope="row">Item Prefix </th>
                                      <td>{productDetail.itemPrefix}</td>
                                    </tr>
                                  )}
                                  {productDetail.amazonSKU && (
                                    <tr>
                                      <th scope="row">Amazon SKU</th>
                                      <td>{productDetail.amazonSKU}</td>
                                    </tr>
                                  )}
                                  {productDetail.ebaySKU && (
                                    <tr>
                                      <th scope="row">E-bay SKU </th>
                                      <td>{productDetail.ebaySKU}</td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="basic">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <h4 className="mb-5">Basic Details</h4>
                          <Row>
                            <Colxx sm="12" xl="6">
                              <Table hover>
                                <tbody>
                                  {productDetail.businessUnit && (
                                    <tr>
                                      <th scope="row">Bussiness Unit</th>
                                      <td>{productDetail.businessUnit}</td>
                                    </tr>
                                  )}
                                  {productDetail.hazardousMaterialCode && (
                                    <tr>
                                      <th scope="row">
                                        Hazardous Material Code
                                      </th>
                                      <td>
                                        {productDetail.hazardousMaterialCode ===
                                        'false'
                                          ? `No Code`
                                          : productDetail.hazardousMaterialCode}
                                      </td>
                                    </tr>
                                  )}
                                  {productDetail.countryOriginCode && (
                                    <tr>
                                      <th scope="row">
                                        Country Of Origin Code
                                      </th>
                                      <td>{productDetail.countryOriginCode}</td>
                                    </tr>
                                  )}
                                  {productDetail.countryOriginName && (
                                    <tr>
                                      <th scope="row">
                                        Country Of Origin Name
                                      </th>
                                      <td>{productDetail.countryOriginName}</td>
                                    </tr>
                                  )}
                                  {productDetail.greenIndicator !== '' &&
                                    productDetail.greenIndicator !==
                                      undefined &&
                                    productDetail.greenIndicator !== null && (
                                      <tr>
                                        <th scope="row">Green Indicator</th>
                                        <td>
                                          {productDetail.greenIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.greenInformation && (
                                    <tr>
                                      <th scope="row">Green Information</th>
                                      <td>{productDetail.greenInformation}</td>
                                    </tr>
                                  )}
                                  {productDetail.productCategory &&
                                    getCategoryNames(
                                      productDetail.productCategory
                                    ) && (
                                      <tr>
                                        <th scope="row">
                                          Master Product Category
                                        </th>
                                        <td>{productCategory}</td>
                                      </tr>
                                    )}
                                  {productDetail.actionIndicator !== '' &&
                                    productDetail.actionIndicator !==
                                      undefined &&
                                    productDetail.actionIndicator !== null && (
                                      <tr>
                                        <th scope="row">Action Indicator</th>
                                        <td>
                                          {productDetail.actionIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.activeIndicator !== '' &&
                                    productDetail.actionIndicator !==
                                      undefined &&
                                    productDetail.actionIndicator !== null && (
                                      <tr>
                                        <th scope="row">Active Indicator</th>
                                        <td>
                                          {productDetail.activeIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.airShippableIndicator &&
                                    productDetail.activeIndicator !==
                                      undefined &&
                                    productDetail.activeIndicator !== null && (
                                      <tr>
                                        <th scope="row">
                                          Air Shippable Indicator
                                        </th>
                                        <td>
                                          {productDetail.airShippableIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.assemblyIndicator !== '' &&
                                    productDetail.assemblyIndicator !==
                                      undefined &&
                                    productDetail.assemblyIndicator !==
                                      null && (
                                      <tr>
                                        <th scope="row">Assembly Indicator</th>
                                        <td>
                                          {productDetail.airShippableIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.expirationDateIndicator !==
                                    '' &&
                                    productDetail.expirationDateIndicator !==
                                      undefined &&
                                    productDetail.expirationDateIndicator !==
                                      null && (
                                      <tr>
                                        <th scope="row">
                                          Expiration Date Indicator
                                        </th>
                                        <td>
                                          {productDetail.expirationDateIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.facilityTotalOnHandQty && (
                                    <tr>
                                      <th scope="row">
                                        Facility Total On Hand Qty
                                      </th>
                                      <td>
                                        {productDetail.facilityTotalOnHandQty}
                                      </td>
                                    </tr>
                                  )}
                                  {productDetail.hubSupplier !== '' &&
                                    productDetail.hubSupplier !== null &&
                                    productDetail.hubSupplier !== undefined && (
                                      <tr>
                                        <th scope="row">Hub Supplier</th>
                                        <td>
                                          {productDetail.hubSupplier === 'false'
                                            ? `No Supplier`
                                            : productDetail.hubSupplier}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.webAvailability !== '' &&
                                    productDetail.webAvailability !==
                                      undefined &&
                                    productDetail.webAvailability !== null && (
                                      <tr>
                                        <th scope="row">Web Availability</th>
                                        <td>
                                          {productDetail.webAvailability
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                </tbody>
                              </Table>
                            </Colxx>
                            <Colxx sm="12" xl="6">
                              <Table hover>
                                <tbody>
                                  {productDetail.nationalStockNumber && (
                                    <tr>
                                      <th scope="row">National Stock Number</th>
                                      <td>
                                        {productDetail.nationalStockNumber}
                                      </td>
                                    </tr>
                                  )}
                                  {productDetail.pinkIndicator !== '' &&
                                    productDetail.pinkIndicator !== undefined &&
                                    productDetail.pinkIndicator !== null && (
                                      <tr>
                                        <th scope="row">Pink Indicator </th>
                                        <td>
                                          {productDetail.pinkIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.privateBrandIndicator !== '' &&
                                    productDetail.privateBrandIndicator !==
                                      undefined &&
                                    productDetail.privateBrandIndicator !==
                                      null && (
                                      <tr>
                                        <th scope="row">
                                          Private Brand Indicator
                                        </th>
                                        <td>
                                          {productDetail.privateBrandIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.prop65Indicator !== '' &&
                                    productDetail.prop65Indicator !==
                                      undefined &&
                                    productDetail.prop65Indicator !== null && (
                                      <tr>
                                        <th scope="row">Prop65 Indicator</th>
                                        <td>
                                          {productDetail.prop65Indicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.prop65LabelIndicator !== '' &&
                                    productDetail.prop65LabelIndicator !==
                                      undefined &&
                                    productDetail.prop65LabelIndicator !==
                                      null && (
                                      <tr>
                                        <th scope="row">
                                          Prop65 Label Indicator
                                        </th>
                                        <td>
                                          {productDetail.prop65LabelIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.packQuantity !== '' &&
                                    productDetail.packQuantity !== undefined &&
                                    productDetail.packQuantity !== null && (
                                      <tr>
                                        <th scope="row">Pack Quantity</th>
                                        <td>{productDetail.packQuantity}</td>
                                      </tr>
                                    )}
                                  {productDetail.packUnit && (
                                    <tr>
                                      <th scope="row">Pack Unit</th>
                                      <td>{productDetail.packUnit}</td>
                                    </tr>
                                  )}
                                  {productDetail.prop65ToxicityChemical && (
                                    <tr>
                                      <th scope="row">
                                        Prop65 Toxicity Chemical
                                      </th>
                                      <td>
                                        {productDetail.prop65ToxicityChemical}
                                      </td>
                                    </tr>
                                  )}
                                  {productDetail.prop65WarningMessage && (
                                    <tr>
                                      <th scope="row">
                                        Prop65 Warning Message
                                      </th>
                                      <td>
                                        {productDetail.prop65WarningMessage}
                                      </td>
                                    </tr>
                                  )}
                                  {productDetail.specialFeatBenefitStmt && (
                                    <tr>
                                      <th scope="row">
                                        Special Feat Benefit Stmt
                                      </th>
                                      <td>
                                        {productDetail.specialFeatBenefitStmt}
                                      </td>
                                    </tr>
                                  )}
                                  {productDetail.recycledIndicator !== '' &&
                                    productDetail.recycledIndicator !==
                                      undefined &&
                                    productDetail.recycledIndicator !==
                                      null && (
                                      <tr>
                                        <th scope="row">Recycle Indicator</th>
                                        <td>
                                          {productDetail.recycledIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.serialNumbrRequiredInd && (
                                    <tr>
                                      <th scope="row">
                                        Serial Numbr Required Ind
                                      </th>
                                      <td>
                                        {productDetail.serialNumbrRequiredInd}
                                      </td>
                                    </tr>
                                  )}
                                  {productDetail.stockingIndicator !== '' &&
                                    productDetail.stockingIndicator !==
                                      undefined &&
                                    productDetail.stockingIndicator !==
                                      null && (
                                      <tr>
                                        <th scope="row">Stocking Indicator</th>
                                        <td>
                                          {productDetail.stockingIndicator
                                            ? 'True'
                                            : 'False'}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.warrantyIndicator !== '' &&
                                    productDetail.warrantyIndicator !==
                                      undefined &&
                                    productDetail.warrantyIndicator !==
                                      null && (
                                      <tr>
                                        <th scope="row">Warranty Indicator</th>
                                        <td>
                                          {productDetail.warrantyIndicator
                                            ? 'True'
                                            : 'False'}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.warrantyComments !== '' &&
                                    productDetail.warrantyComments !==
                                      undefined &&
                                    productDetail.warrantyComments !== null && (
                                      <tr>
                                        <th scope="row">Warranty Comments</th>
                                        <td>
                                          {productDetail.warrantyComments}
                                        </td>
                                      </tr>
                                    )}
                                  {productDetail.valuePack !== '' &&
                                    productDetail.valuePack !== undefined &&
                                    productDetail.valuePack !== null && (
                                      <tr>
                                        <th scope="row">Value Pack</th>
                                        <td>{productDetail.valuePack}</td>
                                      </tr>
                                    )}
                                </tbody>
                              </Table>
                            </Colxx>
                            {productDetail.keywords &&
                            productDetail.keywords.length ? (
                              <Colxx sm="12" xl="6">
                                <h5 className="mt-3 ml-3 font-weight-bold">
                                  Keywords :{' '}
                                </h5>
                                <ol style={{ fontSize: '1.0rem' }}>
                                  {productDetail.keywords &&
                                    productDetail.keywords.map((keyword) => (
                                      <li>{keyword}</li>
                                    ))}
                                </ol>
                              </Colxx>
                            ) : (
                              ''
                            )}
                            {productDetail.packageIncludes &&
                              (productDetail.packageIncludes.length ? (
                                <Colxx sm="12" xl="6">
                                  <h5 className="mt-3 ml-3 font-weight-bold">
                                    Package Includes :{' '}
                                  </h5>
                                  <ol style={{ fontSize: '1.0rem' }}>
                                    {productDetail.packageIncludes &&
                                      productDetail.packageIncludes.map(
                                        (item) => <li>{item}</li>
                                      )}
                                  </ol>
                                </Colxx>
                              ) : (
                                ''
                              ))}
                          </Row>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="Catalog">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <h4 className="mb-5">Catalog Details</h4>
                          <Row>
                            <Colxx sm="12" xl="6">
                              <Table hover>
                                <tbody>
                                  {catalogDetail.catalogCode1 && (
                                    <tr>
                                      <th scope="row">Catalog Code 1</th>
                                      <td>{catalogDetail.catalogCode1}</td>
                                    </tr>
                                  )}{' '}
                                  {catalogDetail.catalogPage1CurrentYear && (
                                    <tr>
                                      <th scope="row">
                                        Catalog Page 1 Current Year
                                      </th>
                                      <td>
                                        {catalogDetail.catalogPage1CurrentYear}
                                      </td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogPage1PriorYear && (
                                    <tr>
                                      <th scope="row">
                                        Catalog Page 1 Prior Year
                                      </th>
                                      <td>
                                        {catalogDetail.catalogPage1PriorYear}
                                      </td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogCode2 && (
                                    <tr>
                                      <th scope="row">Catalog Code 2</th>
                                      <td>{catalogDetail.catalogCode2}</td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogPage2CurrentYear && (
                                    <tr>
                                      <th scope="row">
                                        Catalog Page 2 Current Year
                                      </th>
                                      <td>
                                        {catalogDetail.catalogPage2CurrentYear}
                                      </td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogPage2PriorYear && (
                                    <tr>
                                      <th scope="row">
                                        Catalog Page 2 Prior Year
                                      </th>
                                      <td>
                                        {catalogDetail.catalogPage2PriorYear}
                                      </td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogCode3 && (
                                    <tr>
                                      <th scope="row">Catalog Code 3</th>
                                      <td>{catalogDetail.catalogCode3}</td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogPage3CurrentYear && (
                                    <tr>
                                      <th scope="row">
                                        Catalog Page 3 Current Year
                                      </th>
                                      <td>
                                        {catalogDetail.catalogPage3CurrentYear}
                                      </td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogPage3PriorYear && (
                                    <tr>
                                      <th scope="row">
                                        Catalog Page 3 Prior Year
                                      </th>
                                      <td>
                                        {catalogDetail.catalogPage3PriorYear}
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </Colxx>
                            <Colxx sm="12" xl="6">
                              <Table hover>
                                <tbody>
                                  {catalogDetail.catalogName1 && (
                                    <tr>
                                      <th scope="row">Catalog Name 1</th>
                                      <td>{catalogDetail.catalogName1}</td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogPage1NextYear && (
                                    <tr>
                                      <th scope="row">
                                        Catalog Page 1 Next Year
                                      </th>
                                      <td>
                                        {catalogDetail.catalogPage1NextYear}
                                      </td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogUnit1 && (
                                    <tr>
                                      <th scope="row">Catalog Unit 1</th>
                                      <td>{catalogDetail.catalogUnit1}</td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogName2 && (
                                    <tr>
                                      <th scope="row">Catalog Name 2</th>
                                      <td>{catalogDetail.catalogName2}</td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogPage2NextYear && (
                                    <tr>
                                      <th scope="row">
                                        Catalog Page 2 Next Year
                                      </th>
                                      <td>
                                        {catalogDetail.catalogPage2NextYear}
                                      </td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogUnit2 && (
                                    <tr>
                                      <th scope="row">Catalog Unit 2</th>
                                      <td>{catalogDetail.catalogUnit2}</td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogName3 && (
                                    <tr>
                                      <th scope="row">Catalog Name 3</th>
                                      <td>{catalogDetail.catalogName3}</td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogPage3NextYear && (
                                    <tr>
                                      <th scope="row">
                                        Catalog Page 3 Next Year
                                      </th>
                                      <td>
                                        {catalogDetail.catalogPage3NextYear}
                                      </td>
                                    </tr>
                                  )}
                                  {catalogDetail.catalogUnit3 && (
                                    <tr>
                                      <th scope="row">Catalog Unit 3</th>
                                      <td>{catalogDetail.catalogUnit3}</td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="Measurement">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <h4 className="mb-5">Measurement Details</h4>
                          <Row>
                            <Colxx sm="12" xl="12">
                              <Table hover>
                                <tbody>
                                  {measurementDetail.boxPackQuantity && (
                                    <tr>
                                      <th scope="row">
                                        Box Pack Quantity & Unit
                                      </th>
                                      <td>{`${measurementDetail.boxPackQuantity} ${measurementDetail.boxPackUnit}`}</td>
                                    </tr>
                                  )}
                                  {(measurementDetail.boxDepth ||
                                    measurementDetail.boxHeight ||
                                    measurementDetail.boxWidth) && (
                                    <tr>
                                      <th scope="row">
                                        Box Depth || Height || Width
                                      </th>
                                      <td>{`${measurementDetail.boxDepth}  ||  ${measurementDetail.boxHeight}  ||  ${measurementDetail.boxWidth}`}</td>
                                    </tr>
                                  )}
                                  {measurementDetail.boxExpandedWeight && (
                                    <tr>
                                      <th scope="row">Box Expanded Weight</th>
                                      <td>
                                        {measurementDetail.boxExpandedWeight}
                                      </td>
                                    </tr>
                                  )}
                                  {measurementDetail.cartonPackQuantity && (
                                    <tr>
                                      <th scope="row">
                                        Carton Pack Quantity & Unit
                                      </th>
                                      <td>
                                        {measurementDetail.cartonPackQuantity}
                                      </td>
                                    </tr>
                                  )}
                                  {(measurementDetail.cartonDepth ||
                                    measurementDetail.cartonHeight ||
                                    measurementDetail.cartonWidth) && (
                                    <tr>
                                      <th scope="row">
                                        Carton Depth || Height || Width
                                      </th>
                                      <td>{`${measurementDetail.cartonDepth}  ||  ${measurementDetail.cartonHeight}  ||  ${measurementDetail.cartonWidth}`}</td>
                                    </tr>
                                  )}
                                  {(measurementDetail.cartonExpandedWeight ||
                                    measurementDetail.cartonRoundedWeight) && (
                                    <tr>
                                      <th scope="row">
                                        Carton Expanded Weight || Rounded Weigh
                                      </th>
                                      <td>{`${measurementDetail.cartonExpandedWeight} || ${measurementDetail.cartonRoundedWeight}`}</td>
                                    </tr>
                                  )}
                                  {(measurementDetail.itemCubicFeet ||
                                    measurementDetail.itemCubicInches) && (
                                    <tr>
                                      <th scope="row">
                                        Item Cubic Feet || Cubic Inches
                                      </th>
                                      <td>{`${measurementDetail.itemCubicFeet} || ${measurementDetail.itemCubicInches}`}</td>
                                    </tr>
                                  )}
                                  {(measurementDetail.itemDepth ||
                                    measurementDetail.itemHeight ||
                                    measurementDetail.itemWidth) && (
                                    <tr>
                                      <th scope="row">
                                        Item Depth || Height || Width
                                      </th>
                                      <td>{`${measurementDetail.itemDepth}  ||  ${measurementDetail.itemHeight}  ||  ${measurementDetail.itemWidth}`}</td>
                                    </tr>
                                  )}
                                  {measurementDetail.itemWeight && (
                                    <tr>
                                      <th scope="row">Item Weight</th>
                                      <td>{measurementDetail.itemWeight}</td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="Manufacturer">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <h4 className="mb-5">Manufacturer Details</h4>
                          <Row>
                            <Colxx xs="12" xl="12">
                              <Table>
                                <tbody>
                                  {manufacturerDetail.manufacturerShortName && (
                                    <tr>
                                      <th scope="row">
                                        Manufacturer Short Name
                                      </th>
                                      <td>
                                        {
                                          manufacturerDetail.manufacturerShortName
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {manufacturerDetail.manufacturerLongName && (
                                    <tr>
                                      <th scope="row">
                                        Manufacturer Long Name
                                      </th>
                                      <td>
                                        {
                                          manufacturerDetail.manufacturerLongName
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {manufacturerDetail.manufacturerPartNumber && (
                                    <tr>
                                      <th scope="row">
                                        Manufacturer Part Number{' '}
                                      </th>
                                      <td>
                                        {
                                          manufacturerDetail.manufacturerPartNumber
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {manufacturerDetail.manufacturerUrl && (
                                    <tr>
                                      <th scope="row">Manufacturer URL</th>
                                      <td>
                                        {manufacturerDetail.manufacturerUrl}
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                </TabContent>
              </Card>
              <Card className="mb-4">
                <CardHeader>
                  <Nav tabs className="card-header-tabs ">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab2 === 'Additional',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab2('Additional')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="Additional" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab2 === 'PriceAndCost',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab2('PriceAndCost')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="Price And Cost" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab2 === 'Usage',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab2('Usage')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="Usage" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab2 === 'UPC',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab2('UPC')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="UPC" />
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab2 === 'VendorCategory',
                          'nav-link': true,
                        })}
                        onClick={() => setActiveTab2('VendorCategory')}
                        to="#"
                        location={{}}
                      >
                        <IntlMessages id="Vendor Category" />
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>

                <TabContent activeTab={activeTab2}>
                  <TabPane tabId="Additional">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <h4 className="mb-5">Additional Details</h4>
                          <Row>
                            <Colxx xs="12" xl="6">
                              <Table>
                                <tbody>
                                  {additionalDetail.dualSKUNumber && (
                                    <tr>
                                      <th scope="row">Dual SKU Number</th>
                                      <td>{additionalDetail.dualSKUNumber}</td>
                                    </tr>
                                  )}
                                  {additionalDetail.dualSKUSequence && (
                                    <tr>
                                      <th scope="row">Dual SKU Sequence</th>
                                      <td>
                                        {additionalDetail.dualSKUSequence}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.energyStarRatedCode && (
                                    <tr>
                                      <th scope="row">
                                        Energy Star Rated Code{' '}
                                      </th>
                                      <td>
                                        {additionalDetail.energyStarRatedCode}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.EPAOrCPGCode && (
                                    <tr>
                                      <th scope="row">EPA/CPG Code</th>
                                      <td>{additionalDetail.EPAOrCPGCode}</td>
                                    </tr>
                                  )}
                                  {additionalDetail.itemReferenceCode && (
                                    <tr>
                                      <th scope="row">Item Reference Code </th>
                                      <td>
                                        {additionalDetail.itemReferenceCode}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.itemQtyPreAuthCode && (
                                    <tr>
                                      <th scope="row">
                                        Item Qty Pre Auth Code
                                      </th>
                                      <td>
                                        {additionalDetail.itemQtyPreAuthCode}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.itemVideoUrl && (
                                    <tr>
                                      <th scope="row">Item Video Url</th>
                                      <td>{additionalDetail.itemVideoUrl}</td>
                                    </tr>
                                  )}
                                  {additionalDetail.contentQualityClass && (
                                    <tr>
                                      <th scope="row">Content Quality Class</th>
                                      <td>
                                        {additionalDetail.contentQualityClass}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.discontinuedToBeDisco && (
                                    <tr>
                                      <th scope="row">
                                        Discontinued To Be - Disco{' '}
                                      </th>
                                      <td>
                                        {additionalDetail.discontinuedToBeDisco}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.discontinuedDate && (
                                    <tr>
                                      <th scope="row">Discontinued Date</th>
                                      <td>
                                        {additionalDetail.discontinuedDate}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.discontinuedSource && (
                                    <tr>
                                      <th scope="row">Discontinued Source</th>
                                      <td>
                                        {additionalDetail.discontinuedSource}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.MSDSCode && (
                                    <tr>
                                      <th scope="row">MSDS Code</th>
                                      <td>{additionalDetail.MSDSCode}</td>
                                    </tr>
                                  )}
                                  {additionalDetail.nonReturnabeCode && (
                                    <tr>
                                      <th scope="row">Non-Returnabe Code </th>
                                      <td>
                                        {additionalDetail.nonReturnabeCode}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.recycleCtntPrcntgPreCons && (
                                    <tr>
                                      <th scope="row">
                                        Recycle Ctnt Prcntg Pre Cons
                                      </th>
                                      <td>
                                        {
                                          additionalDetail.recycleCtntPrcntgPreCons
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.recycleCtntPrcntgPostCons && (
                                    <tr>
                                      <th scope="row">
                                        Recycle Ctnt Prcntg Post Cons
                                      </th>
                                      <td>
                                        {
                                          additionalDetail.recycleCtntPrcntgPostCons
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.recycleCtntPrcntgTotal && (
                                    <tr>
                                      <th scope="row">
                                        Recycle Ctnt Prcntg Total
                                      </th>
                                      <td>
                                        {
                                          additionalDetail.recycleCtntPrcntgTotal
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.shippingClassCode && (
                                    <tr>
                                      <th scope="row">Shipping Class Code</th>
                                      <td>
                                        {additionalDetail.shippingClassCode}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.SKUGroupId && (
                                    <tr>
                                      <th scope="row">SKU Group Id</th>
                                      <td>{additionalDetail.SKUGroupId}</td>
                                    </tr>
                                  )}
                                  {additionalDetail.SKUGroupName && (
                                    <tr>
                                      <th scope="row">SKU Group Name</th>
                                      <td>{additionalDetail.SKUGroupName}</td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </Colxx>
                            <Colxx xs="12" xl="6">
                              <Table>
                                <tbody>
                                  {additionalDetail.itemNumberRevised && (
                                    <tr>
                                      <th scope="row">Item Number Revised</th>
                                      <td>
                                        {additionalDetail.itemNumberRevised}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.itemNumberSubstitute && (
                                    <tr>
                                      <th scope="row">
                                        Item Number Substitute
                                      </th>
                                      <td>
                                        {additionalDetail.itemNumberSubstitute}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.SKUGroupVideoUrl && (
                                    <tr>
                                      <th scope="row">SKU Group Video Url</th>
                                      <td>
                                        {additionalDetail.SKUGroupVideoUrl}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.stateRestrictionCode && (
                                    <tr>
                                      <th scope="row">
                                        State Restriction Code
                                      </th>
                                      <td>
                                        {additionalDetail.stateRestrictionCode}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.stockStatusCode && (
                                    <tr>
                                      <th scope="row">Stock Status Code</th>
                                      <td>
                                        {additionalDetail.stockStatusCode}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.stockingIndicatorDescr && (
                                    <tr>
                                      <th scope="row">
                                        Stocking Indicator Description
                                      </th>
                                      <td>
                                        {
                                          additionalDetail.stockingIndicatorDescr
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.TAAOrGSACode && (
                                    <tr>
                                      <th scope="row">TAA/GSA Code</th>
                                      <td>{additionalDetail.TAAOrGSACode}</td>
                                    </tr>
                                  )}
                                  {additionalDetail.ULCode && (
                                    <tr>
                                      <th scope="row">UL Code</th>
                                      <td>{additionalDetail.ULCode}</td>
                                    </tr>
                                  )}
                                  {additionalDetail.unitConversionFactor && (
                                    <tr>
                                      <th scope="row">
                                        Unit Conversion Factor
                                      </th>
                                      <td>
                                        {additionalDetail.unitConversionFactor}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.unitConversionQty && (
                                    <tr>
                                      <th scope="row">Unit Conversion Qty</th>
                                      <td>
                                        {additionalDetail.unitConversionQty}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.unitOfMeasureQty && (
                                    <tr>
                                      <th scope="row">Unit Of Measure Qty</th>
                                      <td>
                                        {additionalDetail.unitOfMeasureQty}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.unitConversionQty && (
                                    <tr>
                                      <th scope="row">Unit Within UOM</th>
                                      <td>
                                        {additionalDetail.unitConversionQty}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.UNSPSC && (
                                    <tr>
                                      <th scope="row">UNSPSC</th>
                                      <td>{additionalDetail.UNSPSC}</td>
                                    </tr>
                                  )}
                                  {additionalDetail.stockStatusALBANALB16 && (
                                    <tr>
                                      <th scope="row">
                                        Stock Status ALBAN-ALB-16
                                      </th>
                                      <td>
                                        {additionalDetail.stockStatusALBANALB16}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.onHandQtyALBANALB16 !==
                                    '' &&
                                    additionalDetail.onHandQtyALBANALB16 !==
                                      null &&
                                    additionalDetail.onHandQtyALBANALB16 !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">
                                          On Hand Qty ALBAN-ALB-16
                                        </th>
                                        <td>
                                          {additionalDetail.onHandQtyALBANALB16}
                                        </td>
                                      </tr>
                                    )}
                                  {additionalDetail.stockStatusATLANATL01 && (
                                    <tr>
                                      <th scope="row">
                                        Stock Status ATLAN-ATL-01
                                      </th>
                                      <td>
                                        {additionalDetail.stockStatusATLANATL01}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.onHandQtyATLANATL01 && (
                                    <tr>
                                      <th scope="row">
                                        On Hand Qty ATLAN-ATL-01
                                      </th>
                                      <td>
                                        {additionalDetail.onHandQtyATLANATL01}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.stockStatusATLANAGA40 && (
                                    <tr>
                                      <th scope="row">
                                        Stock Status ATLAN-AGA-40
                                      </th>
                                      <td>
                                        {additionalDetail.stockStatusATLANAGA40}
                                      </td>
                                    </tr>
                                  )}
                                  {additionalDetail.onHandQtyATLANAGA40 && (
                                    <tr>
                                      <th scope="row">
                                        On Hand Qty ATLAN-AGA-40
                                      </th>
                                      <td>
                                        {additionalDetail.onHandQtyATLANAGA40}
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                          {additionalDetail.description125Character && (
                            <div>
                              <h5 className="mt-3 mx-2 font-weight-bold">
                                Product Description :{' '}
                              </h5>
                              <p className="mx-2 text-justify">
                                {additionalDetail.description125Character}
                              </p>
                            </div>
                          )}
                          {additionalDetail.consolidatedItemCopy && (
                            <div>
                              <h5 className="mt-3 mx-2 font-weight-bold">
                                Consolidated Item Copy :{' '}
                              </h5>
                              <p className="mx-2 text-justify">
                                {additionalDetail.consolidatedItemCopy}
                              </p>
                            </div>
                          )}
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="PriceAndCost">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <h4 className="mb-5">Price And Cost Details</h4>
                          <Row>
                            <Colxx xs="12" xl="6">
                              <Table>
                                <tbody>
                                  {pricesAndCostDetail.listPrice && (
                                    <tr>
                                      <th scope="row">
                                        List Price & Unit for Measure
                                      </th>
                                      <td>{`${pricesAndCostDetail.listPrice} ${pricesAndCostDetail.unitOfMeasure}`}</td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.listPriceEffectiveDate && (
                                    <tr>
                                      <th scope="row">
                                        List Price Effective Date
                                      </th>
                                      <td>
                                        {
                                          pricesAndCostDetail.listPriceEffectiveDate
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.pricePlan && (
                                    <tr>
                                      <th scope="row">Price Plan</th>
                                      <td>{pricesAndCostDetail.pricePlan}</td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.pricePlanName && (
                                    <tr>
                                      <th scope="row">Price Plan Name</th>
                                      <td>
                                        {pricesAndCostDetail.pricePlanName}
                                      </td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.pricePlanType && (
                                    <tr>
                                      <th scope="row">Price Plan Type</th>
                                      <td>
                                        {pricesAndCostDetail.pricePlanType}
                                      </td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.priceStartDate && (
                                    <tr>
                                      <th scope="row">Price Start Date</th>
                                      <td>
                                        {pricesAndCostDetail.priceStartDate}
                                      </td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.priceEndDate && (
                                    <tr>
                                      <th scope="row">Price End Date</th>
                                      <td>
                                        {pricesAndCostDetail.priceEndDate}
                                      </td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.costColumn1Quantity !==
                                    '' &&
                                    pricesAndCostDetail.costColumn1Quantity !==
                                      null &&
                                    pricesAndCostDetail.costColumn1Quantity !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">
                                          Cost Column 1 Quantity
                                        </th>
                                        <td>
                                          {
                                            pricesAndCostDetail.costColumn1Quantity
                                          }
                                        </td>
                                      </tr>
                                    )}
                                  {pricesAndCostDetail.costColumn1Price !==
                                    '' &&
                                    pricesAndCostDetail.costColumn1Price !==
                                      null &&
                                    pricesAndCostDetail.costColumn1Price !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">Cost Column 1 Price</th>
                                        <td>
                                          {pricesAndCostDetail.costColumn1Price}
                                        </td>
                                      </tr>
                                    )}
                                  {pricesAndCostDetail.costColumn2Quantity !==
                                    '' &&
                                    pricesAndCostDetail.costColumn2Quantity !==
                                      null &&
                                    pricesAndCostDetail.costColumn2Quantity !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">
                                          Cost Column 2 Quantity
                                        </th>
                                        <td>
                                          {
                                            pricesAndCostDetail.costColumn2Quantity
                                          }
                                        </td>
                                      </tr>
                                    )}
                                  {pricesAndCostDetail.costColumn2Price !==
                                    '' &&
                                    pricesAndCostDetail.costColumn2Price !==
                                      null &&
                                    pricesAndCostDetail.costColumn2Price !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">Cost Column 2 Price</th>
                                        <td>
                                          {pricesAndCostDetail.costColumn2Price}
                                        </td>
                                      </tr>
                                    )}
                                </tbody>
                              </Table>
                            </Colxx>
                            <Colxx xs="12" xl="6">
                              <Table>
                                <tbody>
                                  {pricesAndCostDetail.costColumnType && (
                                    <tr>
                                      <th scope="row">Cost Column Type</th>
                                      <td>
                                        {pricesAndCostDetail.costColumnType}
                                      </td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.costFacilityCode && (
                                    <tr>
                                      <th scope="row">Cost Facility Code</th>
                                      <td>
                                        {pricesAndCostDetail.costFacilityCode}
                                      </td>
                                    </tr>
                                  )}
                                  {(pricesAndCostDetail.costStartColumn ||
                                    pricesAndCostDetail.costStopColumn) && (
                                    <tr>
                                      <th scope="row">
                                        Cost Start - End Column
                                      </th>
                                      <td>{`${pricesAndCostDetail.costStartColumn} - ${pricesAndCostDetail.costStopColumn}`}</td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.costTypeCode && (
                                    <tr>
                                      <th scope="row">Cost Type Code</th>
                                      <td>
                                        {pricesAndCostDetail.costTypeCode}
                                      </td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.lastInvoicedNumber &&
                                    (pricesAndCostDetail.lastInvoicedAmount !==
                                      '' ||
                                      pricesAndCostDetail.lastInvoicedAmount !==
                                        undefined) && (
                                      <tr>
                                        <th scope="row">
                                          Last Invoiced Number & Amount
                                        </th>
                                        <td>
                                          {
                                            pricesAndCostDetail.lastInvoicedAmount
                                          }{' '}
                                          ||{' '}
                                          {
                                            pricesAndCostDetail.lastInvoicedAmount
                                          }
                                        </td>
                                      </tr>
                                    )}
                                  {pricesAndCostDetail.lastInvoicedDate && (
                                    <tr>
                                      <th scope="row">Last Invoiced Date</th>
                                      <td>
                                        {pricesAndCostDetail.lastInvoicedDate}
                                      </td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.lastInvoicedPricePlan && (
                                    <tr>
                                      <th scope="row">
                                        Last Invoiced Price Plan
                                      </th>
                                      <td>
                                        {
                                          pricesAndCostDetail.lastInvoicedPricePlan
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.azertyCalcConsPrice1 && (
                                    <tr>
                                      <th scope="row">
                                        Azerty Calc Cons Price 1
                                      </th>
                                      <td>
                                        {
                                          pricesAndCostDetail.azertyCalcConsPrice1
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {pricesAndCostDetail.azertyCalcConsPrice2 && (
                                    <tr>
                                      <th scope="row">
                                        Azerty Calc Cons Price 2
                                      </th>
                                      <td>
                                        {
                                          pricesAndCostDetail.azertyCalcConsPrice2
                                        }
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="UPC">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <h4 className="mb-5">UPC Details</h4>
                          <Row>
                            <Colxx xs="12" xl="12">
                              <Table>
                                <tbody>
                                  {upcDetail.UPCRetail && (
                                    <tr>
                                      <th scope="row">UPC Retail</th>
                                      <td>{upcDetail.UPCRetail}</td>
                                    </tr>
                                  )}
                                  {upcDetail.UPCItemGTIN && (
                                    <tr>
                                      <th scope="row">UPC Item GTIN</th>
                                      <td>{upcDetail.UPCItemGTIN}</td>
                                    </tr>
                                  )}
                                  {upcDetail.UPCBoxGTIN && (
                                    <tr>
                                      <th scope="row">UPC Box GTIN </th>
                                      <td>{upcDetail.UPCBoxGTIN}</td>
                                    </tr>
                                  )}
                                  {upcDetail.UPCCartonGTIN && (
                                    <tr>
                                      <th scope="row">UPC Carton GTIN</th>
                                      <td>{upcDetail.UPCCartonGTIN}</td>
                                    </tr>
                                  )}
                                  {upcDetail.UPSIndicator !== '' &&
                                    upcDetail.UPSIndicator !== undefined &&
                                    upcDetail.UPSIndicator !== null && (
                                      <tr>
                                        <th scope="row">UPS Indicator</th>
                                        <td>
                                          {upcDetail.UPSIndicator
                                            ? `True`
                                            : `False`}
                                        </td>
                                      </tr>
                                    )}
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="Usage">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <h4 className="mb-5">Usage Details</h4>
                          <Row>
                            <Colxx xs="12" xl="6">
                              <Table>
                                <tbody>
                                  {usageDetail.usageCurrentYTD$ &&
                                    usageDetail.usageCurrentYTD$ !== '' &&
                                    usageDetail.usageCurrentYTD$ !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">Usage Current YTD $</th>
                                        <td>{usageDetail.usageCurrentYTD$}</td>
                                      </tr>
                                    )}
                                  {usageDetail.usageCurrentYTDQTY &&
                                    usageDetail.usageCurrentYTDQTY !== '' &&
                                    usageDetail.usageCurrentYTDQTY !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">
                                          Usage Current YTD QTY
                                        </th>
                                        <td>
                                          {usageDetail.usageCurrentYTDQTY}
                                        </td>
                                      </tr>
                                    )}
                                  {usageDetail.usageLast3Months$ &&
                                    usageDetail.usageLast3Months$ !== '' &&
                                    usageDetail.usageLast3Months$ !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">
                                          Usage Last 3 Months ${' '}
                                        </th>
                                        <td>{usageDetail.usageLast3Months$}</td>
                                      </tr>
                                    )}
                                  {usageDetail.usageLast3MonthsQTY &&
                                    usageDetail.usageLast3MonthsQTY !== '' &&
                                    usageDetail.usageLast3MonthsQTY !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">
                                          Usage Last 3 Months QTY
                                        </th>
                                        <td>
                                          {usageDetail.usageLast3MonthsQTY}
                                        </td>
                                      </tr>
                                    )}
                                  {usageDetail.usageLast6Months$ &&
                                    usageDetail.usageLast6Months$ !== '' &&
                                    usageDetail.usageLast6Months$ !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">
                                          Usage Last 6 Months $
                                        </th>
                                        <td>{usageDetail.usageLast6Months$}</td>
                                      </tr>
                                    )}
                                </tbody>
                              </Table>
                            </Colxx>
                            <Colxx xs="12" xl="6">
                              <Table>
                                <tbody>
                                  {usageDetail.usageLastYear$ &&
                                    usageDetail.usageLastYear$ !== '' &&
                                    usageDetail.usageLastYear$ !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">Usage Last Year $ </th>
                                        <td>{usageDetail.usageLastYear$}</td>
                                      </tr>
                                    )}
                                  {usageDetail.usageLastYearQTY &&
                                    usageDetail.usageLastYearQTY !== '' &&
                                    usageDetail.usageLastYearQTY !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">Usage Last Year QTY</th>
                                        <td>{usageDetail.usageLastYearQTY}</td>
                                      </tr>
                                    )}
                                  {usageDetail.usageLastYTD$ &&
                                    usageDetail.usageLastYTD$ !== '' &&
                                    usageDetail.usageLastYTD$ !== undefined && (
                                      <tr>
                                        <th scope="row">Usage Last YTD $ </th>
                                        <td>{usageDetail.usageLastYTD$}</td>
                                      </tr>
                                    )}
                                  {usageDetail.usageLastYTDQTY &&
                                    usageDetail.usageLastYTDQTY !== '' &&
                                    usageDetail.usageLastYTDQTY !==
                                      undefined && (
                                      <tr>
                                        <th scope="row">Usage Last YTD QTY</th>
                                        <td>{usageDetail.usageLastYTDQTY}</td>
                                      </tr>
                                    )}
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                  <TabPane tabId="VendorCategory">
                    <Row>
                      <Colxx sm="12">
                        <CardBody>
                          <h4 className="mb-5">Vendor Category Details</h4>
                          <Table>
                            <tbody>
                              {productDetail.vendorCategory && (
                                <tr>
                                  <th scope="row">Vendor Category</th>
                                  <td>{productDetail.vendorCategory}</td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                          <Row>
                            <Colxx xs="12" xl="12">
                              <Table>
                                <tbody>
                                  {productClassDetail.productClassCode && (
                                    <tr>
                                      <th scope="row">Product Class Code</th>
                                      <td>
                                        {productClassDetail.productClassCode}
                                      </td>
                                    </tr>
                                  )}
                                  {productClassDetail.productClassCat1Code && (
                                    <tr>
                                      <th scope="row">
                                        Product Class Cat1 Code
                                      </th>
                                      <td>
                                        {
                                          productClassDetail.productClassCat1Code
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {productClassDetail.productClassCat2Code && (
                                    <tr>
                                      <th scope="row">
                                        Product Class Cat2 Code{' '}
                                      </th>
                                      <td>
                                        {
                                          productClassDetail.productClassCat2Code
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {productClassDetail.productClassCat3Code && (
                                    <tr>
                                      <th scope="row">
                                        Product Class Cat3 Code
                                      </th>
                                      <td>
                                        {
                                          productClassDetail.productClassCat3Code
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {productClassDetail.productClassCat4Code && (
                                    <tr>
                                      <th scope="row">
                                        Product Class Cat4 Code
                                      </th>
                                      <td>
                                        {
                                          productClassDetail.productClassCat4Code
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {productClassDetail.productClassDescription && (
                                    <tr>
                                      <th scope="row">
                                        Product Class Description
                                      </th>
                                      <td>
                                        {
                                          productClassDetail.productClassDescription
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {productClassDetail.productClassCat1Description && (
                                    <tr>
                                      <th scope="row">
                                        Product Class Cat1 Description
                                      </th>
                                      <td>
                                        {
                                          productClassDetail.productClassCat1Description
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {productClassDetail.productClassCat2Description && (
                                    <tr>
                                      <th scope="row">
                                        Product Class Cat2 Description{' '}
                                      </th>
                                      <td>
                                        {
                                          productClassDetail.productClassCat2Description
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {productClassDetail.productClassCat3Description && (
                                    <tr>
                                      <th scope="row">
                                        Product Class Cat3 Description
                                      </th>
                                      <td>
                                        {
                                          productClassDetail.productClassCat3Description
                                        }
                                      </td>
                                    </tr>
                                  )}
                                  {productClassDetail.productClassCat4Description && (
                                    <tr>
                                      <th scope="row">
                                        Product Class Cat4 Description
                                      </th>
                                      <td>
                                        {
                                          productClassDetail.productClassCat4Description
                                        }
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Colxx>
                    </Row>
                  </TabPane>
                </TabContent>
              </Card>
            </Colxx>
            <Colxx xxs="12" xl="4" className="col-right">
              <Card className="mb-4">
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Brand Details" />
                  </CardTitle>
                  <Separator className="mb-4" />
                  {brandDetail.imageNameBrandLogo !== '' &&
                    brandDetail.imageNameBrandLogo !== undefined && (
                      <div className="mt-3 text-center col-12">
                        <h5 className="mb-3 h6">Product Brand Logo</h5>
                        <img
                          style={styles.Image}
                          src={`${imageServer}productimages/${brandDetail.imageNameBrandLogo}`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              'https://img.icons8.com/plasticine/2x/no-image.png';
                          }}
                        />
                        <br />
                      </div>
                    )}
                  <Row>
                    <Colxx xs="12" xl="12">
                      <Table>
                        <tbody>
                          {brandDetail.id && (
                            <tr>
                              <th scope="row">Brand Id</th>
                              <td>{brandDetail.id}</td>
                            </tr>
                          )}
                          {brandDetail.brandShortName && (
                            <tr>
                              <th scope="row">Brand Short Name </th>
                              <td>{brandDetail.brandShortName}</td>
                            </tr>
                          )}
                          {brandDetail.brandLongName && (
                            <tr>
                              <th scope="row">Brand Long Name</th>
                              <td>{brandDetail.brandLongName}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Vendor Details" />
                  </CardTitle>
                  <Separator className="mb-4" />
                  <Row>
                    <Colxx xs="12" xl="12">
                      <Table>
                        <tbody>
                          {vendorDetails.map((vendor, index) => {
                            return (
                              <>
                                {vendor.id && (
                                  <tr className="mt-2">
                                    <th scope="row">
                                      {`${index + 1} : `}Vendor Id
                                    </th>
                                    <td>{vendor.id}</td>
                                  </tr>
                                )}
                                {vendor.name && (
                                  <tr>
                                    <th scope="row">Vendor Name</th>
                                    <td
                                      onClick={() =>
                                        history.push(
                                          `/app/inventory/vendors/detail/${vendor.id}`
                                        )
                                      }
                                      style={{ cursor: 'pointer' }}
                                    >
                                      {vendor.name}
                                    </td>
                                  </tr>
                                )}
                                {vendor.alias && (
                                  <tr>
                                    <th scope="row">Vendor Alias</th>
                                    <td>{vendor.alias}</td>
                                  </tr>
                                )}
                                {vendor.email && (
                                  <tr>
                                    <th scope="row">Vendor Email</th>
                                    <td>{vendor.email}</td>
                                  </tr>
                                )}
                              </>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Sub Vendor Details" />
                  </CardTitle>
                  <Separator className="mb-4" />
                  <Row>
                    <Colxx xs="12" xl="12">
                      <Table>
                        <tbody>
                          {subVendorDetails.id && (
                            <tr>
                              <th scope="row">Sub Vendor Id</th>
                              <td>{subVendorDetails.id}</td>
                            </tr>
                          )}
                          {subVendorDetails.vendorAbbreviation && (
                            <tr>
                              <th scope="row">Sub Vendor Abbreviation</th>
                              <td>{subVendorDetails.vendorAbbreviation}</td>
                            </tr>
                          )}
                          {subVendorDetails.vendorShortName && (
                            <tr>
                              <th scope="row">Sub Vendor Short Name </th>
                              <td>{subVendorDetails.vendorShortName}</td>
                            </tr>
                          )}
                          {subVendorDetails.vendorPricerPrintName && (
                            <tr>
                              <th scope="row">Sub Vendor Print Name</th>
                              <td>{subVendorDetails.vendorPricerPrintName}</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
              <Card className="mb-4">
                <CardBody>
                  <CardTitle>
                    <IntlMessages id="Selling Details" />
                  </CardTitle>
                  <Separator className="mb-4" />
                  {sellingDetail.sellingCopyShort && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Copy Short :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingCopyShort}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingCopyMedium && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Copy Medium :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingCopyMedium}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingCopyLong && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Copy Long :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingCopyLong}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingPoint1 && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Point 1 :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingPoint1}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingPoint2 && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Point 2 :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingPoint2}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingPoint3 && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Point 3 :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingPoint3}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingPoint4 && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Point 4 :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingPoint4}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingPoint5 && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Point 5 :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingPoint5}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingPoint6 && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Point 6 :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingPoint6}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingPoint7 && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Point 7 :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingPoint7}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingPoint8 && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Point 8 :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingPoint8}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingPoint9 && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Point 9 :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingPoint9}
                      </p>
                    </div>
                  )}
                  {sellingDetail.sellingPoint10 && (
                    <div>
                      <h5 className="mt-3 ml-2 font-weight-bold">
                        Selling Point 10 :{' '}
                      </h5>
                      <p className="ml-2 text-justify">
                        {sellingDetail.sellingPoint10}
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </Colxx>
      </Row>
    </>
  );
};
export default injectIntl(ProductDetail);
