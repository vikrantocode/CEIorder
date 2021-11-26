import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const MeasurementDetailForm = ({
    productData, 
    formData, 
    setformData
}) => {
    return (
        <>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Box Pack Quantity" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.boxPackQuantity}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        boxPackQuantity: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Box Pack Unit" />
                    </Label>
                    <Input
                    defaultValue={productData.boxPackUnit}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        boxPackUnit: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Box Depth" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.boxDepth}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        boxDepth: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Box Height" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.boxHeight}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        boxHeight: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Box Width" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.boxWidth}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        boxWidth: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Box Expanded Weight" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.boxExpandedWeight}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        boxExpandedWeight: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Carton Pack Quantity" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.cartonPackQuantity}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        cartonPackQuantity: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Carton Pack Unit" />
                    </Label>
                    <Input
                    defaultValue={productData.cartonPackUnit}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        cartonPackUnit: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Carton Depth" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.cartonDepth}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        cartonDepth: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Carton Height" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.cartonHeight}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        cartonHeight: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Carton Width" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.cartonWidth}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        cartonWidth: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Carton Expanded Weight" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.cartonExpandedWeight}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        cartonExpandedWeight: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Carton Rounded Weight" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.cartonRoundedWeight}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        cartonRoundedWeight: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Item Cubic Feet" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.itemCubicFeet}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemCubicFeet: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Item Cubic Inches" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.itemCubicInches}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemCubicInches: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Item Depth" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.itemDepth}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemDepth: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Item Height" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.itemHeight}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemHeight: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Item Width" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.itemWidth}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemWidth: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Item Weight" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.itemWeight}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemWeight: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default MeasurementDetailForm;