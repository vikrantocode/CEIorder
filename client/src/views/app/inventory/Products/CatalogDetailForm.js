import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const CatalogDetailForm = ({
    productData, 
    formData, 
    setformData
}) => {
    return ( 
        <>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Code 1" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogCode1}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogCode1: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Name 1" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogName1}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogName1: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Page 1 Current Year" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogPage1CurrentYear}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogPage1CurrentYear: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Page 1 Next Year" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogPage1NextYear}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogPage1NextYear: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Page 1 Prior Year" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogPage1PriorYear}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogPage1PriorYear: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Unit 1" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogUnit1}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogUnit1: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Code 2" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogCode2}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogCode2: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Name 2" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogName2}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogName2: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Page 2 Current Year" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogPage2CurrentYear}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogPage2CurrentYear: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Page 2 Next Year" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogPage2NextYear}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogPage2NextYear: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Page 2 Prior Year" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogPage2PriorYear}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogPage2PriorYear: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Unit 2" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogUnit2}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogUnit2: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Code 3" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogCode3}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogCode3: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Name 3" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogName3}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogName3: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Page 3 Current Year" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogPage3CurrentYear}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogPage3CurrentYear: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Page 3 Next Year" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogPage3NextYear}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogPage3NextYear: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Page 3 Prior Year" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogPage3PriorYear}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogPage3PriorYear: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Catalog Unit 3" />
                    </Label>
                    <Input
                    defaultValue={productData.catalogUnit3}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        catalogUnit3: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default CatalogDetailForm;