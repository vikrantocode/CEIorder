import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const VendorCategoryDetailForm = ({
    productData, 
    formData, 
    setformData,
}) => {
    return ( 
        <>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Product Class Code" />
                    </Label>
                    <Input
                    defaultValue={productData.productClassCode}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        productClassCode: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Product Class Cat1 Code" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.productClassCat1Code}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        productClassCat1Code: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Product Class Cat2 Code" />
                    </Label>
                    <Input
                    defaultValue={productData.productClassCat2Code}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        productClassCat2Code: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Product Class Cat3 Code" />
                    </Label>
                    <Input
                    defaultValue={productData.productClassCat3Code}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        productClassCat3Code: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Product Class Cat4 Code" />
                    </Label>
                    <Input
                    defaultValue={productData.productClassCat4Code}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        productClassCat4Code: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Product Class Description" />
                    </Label>
                    <Input
                    value={productData.productClassDescription}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        productClassDescription: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Product Class Cat1 Description" />
                    </Label>
                    <Input
                    defaultValue={productData.productClassCat1Description}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        productClassCat1Description: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Product Class Cat2 Description" />
                    </Label>
                    <Input
                    defaultValue={productData.productClassCat2Description}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        productClassCat2Description: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Product Class Cat3 Description" />
                    </Label>
                    <Input
                    defaultValue={productData.productClassCat3Description}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        productClassCat3Description: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Product Class Cat4 Description" />
                    </Label>
                    <Input
                    defaultValue={productData.productClassCat4Description}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        productClassCat4Description: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default VendorCategoryDetailForm;