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

const VendorDetailForm = ({
    vendors,
    vendor,
    setVendor,
    formData,
    setformData,
    selectedVendors,
    setSelectedVendors,
}) => {
    return (
        <>
        <div className="mt-3">
            <label>
                <IntlMessages id="Vendors" />
            </label>
            <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                isMulti
                name="form-field-name"
                value={selectedVendors}
                onChange={e => {formData.vendors = e; setSelectedVendors(e)}}
                options={vendors}
            />
        </div>
        <div className="mt-3">
            <label>
                <IntlMessages id="Vendor" />
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
                        vendorId: e.value,
                        });
                        console.log(e.value)
                    setVendor(e)
                }}
            />
        </div>
            <Row className="mt-3">
                <Col>
                    <Label>
                        <IntlMessages id="Vendor Name" />
                    </Label>
                    <Input
                    disabled
                    defaultValue={vendor && vendor.name}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Vendor SKU" />
                    </Label>
                    <Input
                    disabled
                    defaultValue={vendor && vendor.alias}
                    />
                </Col>
                <Col>
                    <Label>
                        <IntlMessages id="Vendor Price" />
                    </Label>
                    <Input
                    disabled
                    defaultValue={vendor && vendor.email}
                    />
                </Col>
            </Row>
        </>
    )
}

export default VendorDetailForm;