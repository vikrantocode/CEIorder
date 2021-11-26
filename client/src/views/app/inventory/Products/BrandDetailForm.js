import React, { useState} from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';

const defaultImage = 'https://res.cloudinary.com/nikitaocode/image/upload/v1610533300/cart_vaj8qb.png';


const styles = {
    productImage: {
        height: '8rem',
        width: '8rem',
    }
}

const BrandDetailForm = ({
    formData,
    brands,
    brand,
    setBrand,
    setformData,
}) => {

    return ( 
        <>
        <div className="mt-3 text-center col-12">
            <h5 className="mb-3 h6">Product Brand Logo</h5>
                <img
                    style={styles.productImage}
                    src={brand.imageNameBrandLogo ? `https://cdn.linqusacorp.com/productimages/${brand.imageNameBrandLogo}` : defaultImage}
                    alt="Not Found"
                />
            <br />
            {/* <Label
                className="font-weight-bold edit-profile my-3 text-primary text-small"
                for="imageNameBrandLogo"
            >
                <IntlMessages id="Change Brand Logo" />
            </Label>
            <Input
                accept='image/*'
                onChange={onChangePicture}
                style={{ display: 'none' }}
                type="file"
                name='imageNameBrandLogo'
                id="imageNameBrandLogo"
            /> */}
        </div>
        <div className="mt-3">
            <label>
                <IntlMessages id="Select Brand" />
            </label>
            <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                options={brands}
                value={brand}
                onChange={ (e) => {
                    setformData({
                        ...formData,
                        brandId: e.value,
                        });
                        setBrand(e)
                }}
            />
        </div>
        <Row className="mt-3">
            <Col>
                <Label>
                <IntlMessages id="Brand Short Name" />
                </Label>
                <Input
                defaultValue={brand.brandShortName}
                disabled
                />
            </Col>
            <Col>
                <Label>
                <IntlMessages id="Brand Long Name" />
                </Label>
                <Input
                defaultValue={brand.brandLongName}
                disabled
                />
            </Col>
        </Row>
        </>
     );
}
 
export default BrandDetailForm;


/*



*/

