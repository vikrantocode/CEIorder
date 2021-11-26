import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const UsageDetailForm = ({
    productData, 
    formData, 
    setformData
}) => {
    return (
        <>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Usage Current YTD $" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.usageCurrentYTD}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageCurrentYTD: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Usage Current YTD QTY" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.usageCurrentYTDQTY}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageCurrentYTDQTY: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Usage Last 3 Months $" />
                    </Label>
                    <Input
                    type='number'
                    rows='3'
                    defaultValue={productData.usageLast3Months}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageLast3Months: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Usage Last 3 Months QTY" />
                    </Label>
                    <Input
                    type='number'
                    rows='5'
                    defaultValue={productData.sellingCopyLong}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingCopyLong: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Usage Last 6 Months $" />
                    </Label>
                    <Input
                    type='number'
                    rows='2'
                    defaultValue={productData.usageLast6Months$}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageLast6Months$: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Usage Last 6 Months QTY" />
                    </Label>
                    <Input
                    type='number'
                    rows='2'
                    defaultValue={productData.usageLast6MonthsQTY}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageLast6MonthsQTY: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Usage Last 12 Months $" />
                    </Label>
                    <Input
                    type='number'
                    rows='2'
                    defaultValue={productData.usageLast12Months$}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageLast12Months$: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Usage Last 12 Months QTY" />
                    </Label>
                    <Input
                    type='number'
                    rows='2'
                    defaultValue={productData.usageLast12MonthsQTY}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageLast12MonthsQTY: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Usage Last Year $" />
                    </Label>
                    <Input
                    type='number'
                    rows='2'
                    defaultValue={productData.usageLastYear$}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageLastYear$: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Usage Last Year QTY" />
                    </Label>
                    <Input
                    type='number'
                    rows='2'
                    defaultValue={productData.usageLastYearQTY}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageLastYearQTY: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Usage Last YTD $" />
                    </Label>
                    <Input
                    type='number'
                    rows='2'
                    defaultValue={productData.usageLastYTD$}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageLastYTD$: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Usage Last YTD QTY" />
                    </Label>
                    <Input
                    type='number'
                    rows='2'
                    defaultValue={productData.usageLastYTDQTY}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        usageLastYTDQTY: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default UsageDetailForm;