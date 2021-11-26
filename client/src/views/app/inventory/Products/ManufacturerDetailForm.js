import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const ManufacturerDetailForm = ({
    productData, 
    formData, 
    setformData
}) => {
    return (
        <>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Manufacturer Short Name" />
                    </Label>
                    <Input
                    defaultValue={productData.manufacturerShortName}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        manufacturerShortName: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Manufacturer Long Name" />
                    </Label>
                    <Input
                    defaultValue={productData.manufacturerLongName}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        manufacturerLongName: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Manufacturer Part Number" />
                    </Label>
                    <Input
                    rows='3'
                    defaultValue={productData.manufacturerPartNumber}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        manufacturerPartNumber: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Manufacturer Url" />
                    </Label>
                    <Input
                    rows='5'
                    defaultValue={productData.manufacturerUrl}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        manufacturerUrl: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
        </>
    )
}

export default ManufacturerDetailForm;