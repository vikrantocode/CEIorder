import React from 'react'
import {
    Row,
    Col,
    Label,
    Input,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';

const SkuDetailForm = ({productData,formData,setformData}) => {
    return ( 
        <>
            <Row className="mt-3">
                <Col>
                    <Label>
                    <IntlMessages id="Master SKU" />
                    </Label>
                    <Input
                    defaultValue={productData.masterSKU}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        masterSKU: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                    <IntlMessages id="Item Prefix" />
                    </Label>
                    <Input
                    defaultValue={productData.itemPrefix}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemPrefix: e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                    <IntlMessages id="SKU" />
                    </Label>
                    <Input
                    defaultValue={productData.itemNumber}
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        itemNumber: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Label>
                    <IntlMessages id="Amazon SKU" />
                    </Label>
                    <Input
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        amazonSKU : e.target.value,
                        });
                    }}
                    />
                </Col>
                <Col>
                    <Label>
                    <IntlMessages id="Ebay SKU" />
                    </Label>
                    <Input
                    onChange={(e) => {
                        setformData({
                        ...formData,
                        ebaySKU: e.target.value,
                        });
                    }}
                    />
                </Col>
            </Row>
        </>
    );
}
 
export default SkuDetailForm;