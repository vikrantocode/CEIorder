import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';

const SubVendorDetailForm = ({
    vendors,
    vendor,
    setVendor,
    formData,
    setformData
}) => {
    return (
        <>
        <div className="mt-3">
            <label>
                <IntlMessages id="Sub Vendor" />
            </label>
            <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                options={vendors}
                value={vendor}
                onChange={ (e) => {
                    setformData({
                        ...formData,
                        subVendorId: e.value,
                        });
                        console.log(e.value)
                    setVendor(e)
                }}
            />
        </div>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Sub Vendor Abbreviation" />
                    </Label>
                    <Input
                    disabled
                    defaultValue={vendor && vendor.vendorAbbreviation}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Sub Vendor Short Name" />
                    </Label>
                    <Input
                    disabled
                    defaultValue={vendor && vendor.vendorShortName}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Sub Vendor Pricer Print Name" />
                    </Label>
                    <Input
                    disabled
                    defaultValue={vendor && vendor.vendorPricerPrintName}
                    />
                </Col>
            </Row>
        </>
    )
}

export default SubVendorDetailForm;