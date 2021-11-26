import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const PriceAndCostDetailForm = ({
    productData, 
    formData, 
    setformData,
    priceStartDate
}) => {
    return ( 
        <>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Unit Of Measure" />
                    </Label>
                    <Input
                    defaultValue={productData.unitOfMeasure}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        unitOfMeasure: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="List Price" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.listPrice}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        listPrice: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="List Price Effective Date" />
                    </Label>
                    
                    <Input
                    type='date'
                    defaultValue={productData.listPriceEffectiveDate?.split("T")[0]}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        listPriceEffectiveDate: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Price Plan" />
                    </Label>
                    <Input
                    defaultValue={productData.pricePlan}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        pricePlan: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Price Plan Name" />
                    </Label>
                    <Input
                    defaultValue={productData.pricePlanName}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        pricePlanName: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Price Plan Type" />
                    </Label>
                    <Input
                    defaultValue={productData.pricePlanType}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        pricePlanType: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Price Start Date" />
                    </Label>
                    <Input
                    type='date'
                   // value={priceStartDate}
                    defaultValue={productData.priceStartDate?.split("T")[0]}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        priceStartDate: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Price End Date" />
                    </Label>
                    <Input
                    type='date'
                    //value={productData.priceEndDate}
                    defaultValue={productData.priceEndDate?.split("T")[0]}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        priceEndDate: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Cost Column 1 Quantity" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.costColumn1Quantity}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        costColumn1Quantity: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Cost Column 1 Price" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.costColumn1Price}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        costColumn1Price: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Cost Column 2 Quantity" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.costColumn2Quantity}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        costColumn2Quantity: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Cost Column 2 Price" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.costColumn2Price}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        costColumn2Price: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Cost Column Type" />
                    </Label>
                    <Input
                    defaultValue={productData.costColumnType}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        costColumnType: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Cost Facility Code" />
                    </Label>
                    <Input
                    defaultValue={productData.costFacilityCode}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        costFacilityCode: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Cost Start Column" />
                    </Label>
                    <Input
                    defaultValue={productData.costStartColumn}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        costStartColumn: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Cost Stop Column" />
                    </Label>
                    <Input
                    defaultValue={productData.costStopColumn}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        costStopColumn: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Cost Type Code" />
                    </Label>
                    <Input
                    defaultValue={productData.costTypeCode}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        costTypeCode: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Last Invoiced Amount" />
                    </Label>
                    <Input
                    defaultValue={productData.lastInvoicedAmount}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        lastInvoicedAmount: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Last Invoiced Date" />
                    </Label>
                    <Input
                    type='date'
                    defaultValue={productData.lastInvoicedDate}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        lastInvoicedDate: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Last Invoiced Number" />
                    </Label>
                    <Input
                    defaultValue={productData.lastInvoicedNumber}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        lastInvoicedNumber: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Last Invoiced Price Plan" />
                    </Label>
                    <Input
                    type='date'
                    defaultValue={productData.lastInvoicedPricePlan}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        lastInvoicedPricePlan: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Azerty Calc Cons Price 1" />
                    </Label>
                    <Input
                    defaultValue={productData.azertyCalcConsPrice1}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        azertyCalcConsPrice1: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Azerty Calc Cons Price 2" />
                    </Label>
                    <Input
                    type='date'
                    defaultValue={productData.azertyCalcConsPrice2}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        azertyCalcConsPrice2: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Azerty Margin Formula" />
                    </Label>
                    <Input
                    defaultValue={productData.azertyMarginFormula}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        azertyMarginFormula: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default PriceAndCostDetailForm;