import React from 'react';
import { Row, Col, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';
import IntlMessages from '../../../../helpers/IntlMessages';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { Colxx } from '../../../../components/common/CustomBootstrap';

const BinaryData = [
  { label: 'Active', value: true, key: 0 },
  { label: 'Inactive', value: false, key: 1 },
];

const BasicProductDetailForm = ({
  productData,
  formData,
  setformData,
  selectedProCatOptions,
  setSelectedProCatOptions,
  categories,
  keywords,
  setKeywords,
  packageIncludes,
  setPackageIncludes,
  activeI,
  setActiveI,
  actionI,
  setActionI,
  greenI,
  setGreenI,
  airShippableI,
  setAirShippableI,
  assemblyI,
  setAssemblyI,
  expirationI,
  setExpirationI,
  pinkI,
  setPinkI,
  privateI,
  setPrivateI,
  prop65I,
  setProp65I,
  prop65LabelI,
  setProp65LabelI,
  recycleI,
  setRecycleI,
  stockingI,
  setStockingI,
  warrantyI,
  setwarrantyI,
  webI,
  setWebI,
}) => {
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    console.log(index);
    const list = [...keywords];
    list.splice(index, 1);
    console.log(list);
    setKeywords(list);
    console.log(productData);
    console.log(productData.packageIncludes);
  };
  // handle click event of the Add button
  const handleAddClick = () => {
    setKeywords([...keywords, '']);
  };
  const handleAddPackageIncludes = () => {
    setPackageIncludes([...packageIncludes, '']);
  };
  const handleRemovePackageIncludes = (index) => {
    const list = [...packageIncludes];
    list.splice(index, 1);
    console.log(list);
    setPackageIncludes(list);
  };

  return (
    <>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Product Name" />
          </Label>
          <Input
            defaultValue={productData.description25Char}
            onChange={(e) => {
              setformData({
                ...formData,
                description25Char: e.target.value,
              });
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Bussiness Unit" />
          </Label>
          <Input
            defaultValue={productData.bussinessUnit}
            onChange={(e) => {
              setformData({
                ...formData,
                bussinessUnit: e.target.value,
              });
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Hazardous Material Code" />
          </Label>
          <Input
            defaultValue={productData.hazardousMaterialCode}
            onChange={(e) => {
              setformData({
                ...formData,
                hazardousMaterialCode: e.target.value,
              });
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Country Of Origin Code" />
          </Label>
          <Input
            defaultValue={productData.countryOriginCode}
            onChange={(e) => {
              setformData({
                ...formData,
                countryOriginCode: e.target.value,
              });
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Country Of Origin Name " />
          </Label>
          <Input
            defaultValue={productData.countryOriginName}
            onChange={(e) => {
              setformData({
                ...formData,
                countryOriginName: e.target.value,
              });
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Green Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={greenI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                greenIndicator: e.value,
              });
              setGreenI(e);
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Green Information" />
          </Label>
          <Input
            defaultValue={productData.greenInformation}
            onChange={(e) => {
              setformData({
                ...formData,
                greenInformation: e.target.value,
              });
            }}
          />
        </Col>
      </Row>
      <div className="mt-3">
        <label>
          <IntlMessages id="Master Product Category" />
        </label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          isMulti
          name="form-field-name"
          value={selectedProCatOptions}
          onChange={setSelectedProCatOptions}
          options={categories}
        />
      </div>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Action Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={actionI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                actionIndicator: e.value,
              });
              setActionI(e);
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Active Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={activeI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                activeIndicator: e.value,
              });
              setActiveI(e);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Air Shippable Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={airShippableI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                airShippableIndicator: e.value,
              });
              setAirShippableI(e);
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Assembly Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={assemblyI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                assemblyIndicator: e.value,
              });
              setAssemblyI(e);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Expiration Date Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={expirationI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                expirationDateIndicator: e.value,
              });
              setExpirationI(e);
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Facility Total On Hand Qty" />
          </Label>
          <Input
            defaultValue={productData.facilityTotalOnHandQty}
            onChange={(e) => {
              setformData({
                ...formData,
                facilityTotalOnHandQty: e.target.value,
              });
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Hub Supplier" />
          </Label>
          <Input
            defaultValue={productData.hubSupplier}
            onChange={(e) => {
              setformData({
                ...formData,
                hubSupplier: e.target.value,
              });
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="National Stock Number" />
          </Label>
          <Input
            defaultValue={productData.nationalStockNumber}
            onChange={(e) => {
              setformData({
                ...formData,
                nationalStockNumber: e.target.value,
              });
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Pink Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={pinkI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                pinkIndicator: e.value,
              });
              setPinkI(e);
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Private Brand Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={privateI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                privateBrandIndicator: e.value,
              });
              setPrivateI(e);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Prop65 Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={prop65I}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                prop65Indicator: e.value,
              });
              setProp65I(e);
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Prop65 Label Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={prop65LabelI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                prop65LabelIndicator: e.value,
              });
              setProp65LabelI(e);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Pack Quantity" />
          </Label>
          <Input
            defaultValue={productData.packQuantity}
            onChange={(e) => {
              setformData({
                ...formData,
                packQuantity: e.target.value,
              });
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Pack Unit" />
          </Label>
          <Input
            defaultValue={productData.packUnit}
            onChange={(e) => {
              setformData({
                ...formData,
                packUnit: e.target.value,
              });
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Prop65 Toxicity Chemical" />
          </Label>
          <Input
            defaultValue={productData.prop65ToxicityChemical}
            onChange={(e) => {
              setformData({
                ...formData,
                prop65ToxicityChemical: e.target.value,
              });
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Prop65 Warning Message" />
          </Label>
          <Input
            defaultValue={productData.prop65WarningMessage}
            onChange={(e) => {
              setformData({
                ...formData,
                prop65WarningMessage: e.target.value,
              });
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Special Feat Benefit Stmt" />
          </Label>
          <Input
            defaultValue={productData.specialFeatBenefitStmt}
            onChange={(e) => {
              setformData({
                ...formData,
                specialFeatBenefitStmt: e.target.value,
              });
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Recycle Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={recycleI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                recycledIndicator: e.value,
              });
              setRecycleI(e);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Serial Numbr Required Ind" />
          </Label>
          <Input
            defaultValue={productData.serialNumbrRequiredInd}
            onChange={(e) => {
              setformData({
                ...formData,
                serialNumbrRequiredInd: e.target.value,
              });
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Stocking Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={stockingI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                stockingIndicator: e.value,
              });
              setStockingI(e);
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Warranty Indicator" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={warrantyI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                warrantyIndicator: e.value,
              });
              setwarrantyI(e);
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Warranty Comments" />
          </Label>
          <Input
            defaultValue={productData.warrantyComments}
            onChange={(e) => {
              setformData({
                ...formData,
                warrantyComments: e.target.value,
              });
            }}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Label>
            <IntlMessages id="Value Pack" />
          </Label>
          <Input
            defaultValue={productData.valuePack}
            onChange={(e) => {
              setformData({
                ...formData,
                valuePack: e.target.value,
              });
            }}
          />
        </Col>
        <Col>
          <Label>
            <IntlMessages id="Web Availability" />
          </Label>
          <Select
            components={{ Input: CustomSelectInput }}
            value={webI}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={BinaryData}
            onChange={(e) => {
              setformData({
                ...formData,
                webAvailability: e.value,
              });
              setWebI(e);
            }}
          />
        </Col>
      </Row>
      <Label className="mt-4 mb-0">
        <IntlMessages id="Keywords" />
      </Label>
      <Row>
        {keywords &&
          keywords.map((keyword, i) => {
            return (
              <Colxx sm="6" xxs="6" md="6" lg="6" xl="6">
                <Row>
                  <Col>
                    <Label className="mt-4">
                      <IntlMessages id={`Value ${i + 1} : `} />
                    </Label>
                    <Input
                      value={keyword}
                      onChange={(e) => {
                        let values = [...keywords];
                        values[i] = e.target.value;
                        setKeywords(values);
                      }}
                    />
                  </Col>
                  <div className="mt-5">
                    {keywords.length !== 1 && (
                      <Button
                        color="danger"
                        outline
                        onClick={() => handleRemoveClick(i)}
                      >
                        {' '}
                        <i className="simple-icon-trash"></i>{' '}
                      </Button>
                    )}
                  </div>
                </Row>
              </Colxx>
            );
          })}
      </Row>
      <div className="text-right">
        <Button className="mt-3" color="primary" onClick={handleAddClick}>
          <IntlMessages id="Add More Keyword" />
        </Button>
      </div>
      <Label className="mt-4 mb-0">
        <IntlMessages id="Package Includes" />
      </Label>
      <Row>
        {packageIncludes &&
          packageIncludes.map((packageInclude, i) => {
            return (
              <Colxx sm="6" xxs="6" md="6" lg="6" xl="6">
                <Row>
                  <Col>
                    <Label className="mt-4">
                      <IntlMessages id={`Value ${i + 1} : `} />
                    </Label>
                    <Input
                      value={packageInclude}
                      onChange={(e) => {
                        let values = [...packageIncludes];
                        values[i] = e.target.value;
                        setPackageIncludes(values);
                      }}
                    />
                  </Col>
                  <div className="mt-5">
                    {packageIncludes.length !== 1 && (
                      <Button
                        color="danger"
                        outline
                        onClick={() => handleRemovePackageIncludes(i)}
                      >
                        {' '}
                        <i className="simple-icon-trash"></i>{' '}
                      </Button>
                    )}
                  </div>
                </Row>
              </Colxx>
            );
          })}
      </Row>
      <div className="text-right">
        <Button
          className="mt-3"
          color="primary"
          onClick={handleAddPackageIncludes}
        >
          <IntlMessages id="Add More Item" />
        </Button>
      </div>
    </>
  );
};

export default BasicProductDetailForm;
