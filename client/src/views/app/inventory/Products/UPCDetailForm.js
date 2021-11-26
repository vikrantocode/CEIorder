import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import Select from 'react-select'
import IntlMessages from '../../../../helpers/IntlMessages';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';

const UPCDetailForm = ({
    productData, 
    formData, 
    BinaryData,
    setformData,
    setUPSI,
    UPSI
}) => {
    return (
        <>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="UPC Retail" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.UPCRetail}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        UPCRetail: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="UPC Item GTIN" />
                    </Label>
                    <Input
                    type='number'
                    defaultValue={productData.UPCItemGTIN}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        UPCItemGTIN: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="UPC Box GTIN" />
                    </Label>
                    <Input
                    type='number'
                    rows='3'
                    defaultValue={productData.UPCBoxGTIN}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        UPCBoxGTIN: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="UPC Carton GTIN" />
                    </Label>
                    <Input
                    type='number'
                    rows='5'
                    defaultValue={productData.UPCCartonGTIN}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        UPCCartonGTIN: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="UPS Indicator" />
                    </Label>
                    <Select
                    components={{ Input: CustomSelectInput }}
                    value={UPSI}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    options={BinaryData}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        UPSIndicator: e.value,
                        });
                        setUPSI(e)
                    }}
                />
                </Col>
            </Row>
        </>
    )
}

export default UPCDetailForm;