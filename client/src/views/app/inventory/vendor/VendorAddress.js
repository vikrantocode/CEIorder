import React, { useState } from 'react';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import {
    Card,
    CardBody,
    Col,
    Label,
    Input,
    Form,
    FormGroup,
    Row,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Nav,
    NavItem,
    TabContent, CardSubtitle, CardText,
    TabPane,
    heading
} from 'reactstrap';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

const VendorAddress = ({heading, icon, position, formData, setformData, setActiveTab, move, billing}) => {
    const [checkedPrimarySmall, setCheckedPrimarySmall] = useState(false);
    const handleCopy = primary => {
        if(primary){
            console.log(primary)
            console.log(formData.billingFirstName)
            console.log(formData.shippingFirstName)
            formData.shippingFirstName = formData.billingFirstName
            formData.shippingLastName = formData.billingLastName
            formData.shippingBusiness = formData.billingBusiness
            formData.shippingCountry = formData.billingCountry
            formData.shippingAddress = formData.billingAddress
            formData.shippingZipCode = formData.billingZipCode
            formData.shippingCity = formData.billingCity
            formData.shippingState = formData.billingState
            formData.shippingPhone = formData.billingPhone
            formData.shippingFax = formData.billingFax
        }
        setCheckedPrimarySmall(primary)
    }
    return (
        <Colxx>
            <Card className="mb-4">
                <CardBody>
                    <p className="text-muted text-small mb-2">
                       
                        <IntlMessages id={heading} />
                        { heading === "SHIPPING ADDRESS" ? <Row style={{float:"right"}}>
                            
                                
                                <IntlMessages id="Same as Billing" />
                            
                            <Switch 
                                className="ml-2 mr-1 custom-switch custom-switch-primary custom-switch-small"
                                checked={checkedPrimarySmall}
                                onChange={(primary) => {handleCopy(primary);}}
                            />
                                
                        <i className="simple-icon-location-pin" style={{float:"right",fontSize:25,color:"#922c88",cursor:"pointer"}} onClick={() => {}}/>
                        </Row> : null}
                    </p>
                    <Form>
                        <FormGroup>
                            <Col className="mb-1">
                                <Label>
                                    <IntlMessages id="First Name" />
                                </Label>
                                <Input
                                placeholder="Enter First Name"
                                defaultValue={billing ? formData.billingFirstName : formData.shippingFirstName}
                                onChange={(e) => {
                                    billing ? setformData({ ...formData, billingFirstName: e.target.value }) : 
                                    setformData({ ...formData, shippingFirstName: e.target.value })
                                }} />
                            </Col>
                            <Col className="mb-1">
                                <Label>
                                    <IntlMessages id="Last Name" />
                                </Label>
                                <Input
                                placeholder="Enter Last Name"
                                defaultValue={billing ? formData.billingLastName : formData.shippingLastName}
                                onChange={(e) => {
                                    billing ? setformData({ ...formData, billingLastName: e.target.value }) : 
                                    setformData({ ...formData, shippingLastName: e.target.value })
                                }} />
                            </Col>
                            <Col className="mb-1">
                                <Label>
                                    <IntlMessages id="Business" />
                                </Label>
                                <Input
                                placeholder="Enter Business Name"
                                defaultValue={billing ? formData.billingBusiness : formData.shippingBusiness}
                                onChange={(e) => {
                                    billing ? setformData({ ...formData, billingBusiness: e.target.value }) : 
                                    setformData({ ...formData, shippingBusiness: e.target.value })
                                }} />
                            </Col>
                            <Col className="mb-1">
                                <Label>
                                    <IntlMessages id="Country" />
                                </Label>
                                <Input
                                placeholder="Enter Country"
                                defaultValue={billing ? formData.billingCountry : formData.shippingCountry}
                                onChange={(e) => {
                                    billing ? setformData({ ...formData, billingCountry: e.target.value }) : 
                                    setformData({ ...formData, shippingCountry: e.target.value })
                                }} />
                            </Col>
                            <Col className="mb-1">
                                <Label>
                                    <IntlMessages id="Address" />
                                </Label>
                                <Input
                                placeholder="Enter Address"
                                defaultValue={billing ? formData.billingAddress : formData.shippingAddress}
                                onChange={(e) => {
                                    billing ? setformData({ ...formData, billingAddress: e.target.value }) : 
                                    setformData({ ...formData, shippingAddress: e.target.value })
                                }} />
                            </Col>
                            <Col className="mb-1">
                                <Label>
                                    <IntlMessages id="Zip Code" />
                                </Label>
                                <Input
                                placeholder="Enter Zip Code"
                                defaultValue={billing ? formData.billingZipCode : formData.shippingZipCode}
                                onChange={(e) => {
                                    billing ? setformData({ ...formData, billingZipCode: e.target.value }) : 
                                    setformData({ ...formData, shippingZipCode: e.target.value })
                                }} />
                            </Col>
                            <Col className="mb-1">
                                <Label>
                                    <IntlMessages id="City" />
                                </Label>
                                <Input
                                placeholder="Enter City"
                                defaultValue={billing ? formData.billingCity : formData.shippingCity}
                                onChange={(e) => {
                                    billing ? setformData({ ...formData, billingCity: e.target.value }) : 
                                    setformData({ ...formData, shippingCity: e.target.value })
                                }} />
                            </Col>
                            <Col className="mb-1">
                                <Label>
                                    <IntlMessages id="State" />
                                </Label>
                                <Input
                                placeholder="Enter State"
                                defaultValue={billing ? formData.billingState : formData.shippingState}
                                onChange={(e) => {
                                    billing ? setformData({ ...formData, billingState: e.target.value }) : 
                                    setformData({ ...formData, shippingState: e.target.value })
                                }} />
                            </Col>
                            <Col className="mb-1">
                                <Label>
                                    <IntlMessages id="Phone" />
                                </Label>
                                <Input
                                placeholder="Enter Phone Number"
                                defaultValue={billing ? formData.billingPhone : formData.shippingPhone}
                                onChange={(e) => {
                                    billing ? setformData({ ...formData, billingPhone: e.target.value }) : 
                                    setformData({ ...formData, shippingPhone: e.target.value })
                                }} />
                            </Col>
                            <Col className="mb-1">
                                <Label>
                                    <IntlMessages id="Fax" />
                                </Label>
                                <Input
                                placeholder="Enter Fax Number XXX-XXX-XXXX"
                                defaultValue={billing ? formData.billingFax : formData.shippingFax}
                                onChange={(e) => {
                                    billing ? setformData({ ...formData, billingFax: e.target.value }) : 
                                    setformData({ ...formData, shippingFax: e.target.value })
                                }} />
                            </Col>
                        </FormGroup>
                    </Form>
                    <i className={icon} style={{float:position,fontSize:35,color:"#922c88",cursor:"pointer"}} onClick={()=>{
                        setActiveTab(move)
                        window.scrollTo(0, 0)}
                        } />
                </CardBody></Card>
        </Colxx>
    );
}

export default VendorAddress;