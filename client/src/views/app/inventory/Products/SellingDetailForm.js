import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const SellingDetailForm = ({
    productData, 
    formData, 
    setformData
}) => {
    return (
        <>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Selling Copy Short" />
                    </Label>
                    <Input
                    type='textarea'
                    defaultValue={productData.sellingCopyShort}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingCopyShort: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Selling Copy Medium" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='3'
                    defaultValue={productData.sellingCopyMedium}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingCopyMedium: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Selling Copy Long" />
                    </Label>
                    <Input
                    type='textarea'
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
                        <IntlMessages id="Selling Point 1" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingPoint1}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingPoint1: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Selling Point 2" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingPoint2}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingPoint2: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Selling Point 3" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingPoint3}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingPoint3: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Selling Point 4" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingPoint4}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingPoint4: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Selling Point 5" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingPoint5}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingPoint5: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Selling Point 6" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingPoint6}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingPoint6: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>
                        <IntlMessages id="Selling Point 7" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingPoint7}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingPoint7: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Selling Point 8" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingPoint8}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingPoint8: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>
                        <IntlMessages id="Selling Point 9" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingPoint9}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingPoint9: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Selling Point 10" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingPoint10}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingPoint10: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label>
                        <IntlMessages id="Selling Statement Summary" />
                    </Label>
                    <Input
                    type='textarea'
                    rows='2'
                    defaultValue={productData.sellingStatementSummary}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        sellingStatementSummary: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default SellingDetailForm;