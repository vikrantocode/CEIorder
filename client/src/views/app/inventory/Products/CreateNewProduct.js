import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import React, { useState, useEffect } from 'react';
import { NotificationManager } from '../../../../components/common/react-notifications';
import {
    Row,
    Col,
    Label,
    Input,
    Card,
    CardBody,
    Form,
    FormGroup,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
  } from 'reactstrap';
import Select from 'react-select'
import IntlMessages from '../../../../helpers/IntlMessages';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import Button from 'reactstrap/lib/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const selectData = [
  { label: 'Small', value: 'Small', key: 0 },
  { label: 'Medium', value: 'Medium', key: 1 },
  { label: 'Large', value: 'Large', key: 2 }
]

const Newproduct = ({ match }) => {
  const [formData, setformData] = useState({})
  const [user, setUser] = useState('user')
  const [typeModal, setTypeModal] = useState(false)
  const [pname, setpName] = useState('')
  const [SKU,setSKU] = useState("")
  const [brands, setBrands] = useState([])
  const [name,setName] = ""
  const [change, setChange] = useState(false)
  const history = useHistory()

  const fetchBrands = async () => {
    const { data : brands } = await axios.get(
      `/api/inventory/get-brands/`
    )
    let brandList = [];
    let singleBrand;
    for(let brand of brands){
      singleBrand = {
        label: brand.brandLongName,
        brandShortName : brand.brandShortName,
        brandLongName : brand.brandLongName,
        imageNameBrandLogo : brand.imageNameBrandLogo,
        value: brand.id,
        key: brand.id,
      }
      console.log(singleBrand)
      brandList.push(singleBrand)
    }
    setBrands(brandList)
  };
  useEffect(() => {
        fetchBrands()
  }, [change]);

  const CreateNewProduct = (e) => {
    e.preventDefault();
    const {description25Char,itemNumber} = formData
    console.log(description25Char)
    console.log(itemNumber)
    if(!description25Char || !itemNumber){
      return NotificationManager.error(
        'Product Name And SKU Are Mandatory',
        'Error',
        3000,
        null,
        null,
        ''
      );
    }
    // var data = {
    //   name: formData.name.toLowerCase(),
    //   SKU: SKU,
    //   company:formData.company,
    //   productType:formData.ptype,
    //   buyer:formData.buyer,
    //   description:formData.description
    // }
    axios.post("/api/inventory/new-product",formData).then(res=>{
      console.log(res)
      NotificationManager.success(
        res.data.success,
        'Success',
        3000,
        null,
        null,
        ''
      );
      history.push("/app/inventory/products")
    })
  }

  const generateSKU =()=>{
    const sku = pname.substring(0,3).toUpperCase()+Math.floor(Math.random() * 1000); 
    setSKU(sku)
    setformData({...formData, itemNumber: sku})
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <Breadcrumb heading="Add New Product" match={match} />
            <Separator className="mb-5" />
        </Colxx>
      </Row>
      <div className="d-flex flex-column">
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <Colxx xxs="12" className="mb-5">
                  <h3 className="mb-4">Product Form</h3>
                  <Form>
                    <FormGroup>
                      <Row className="mt-3">
                        <Col>
                          <Label>
                              <IntlMessages id="Brand" />
                          </Label>
                          <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={brands}
                            onChange={(e) => {
                                    setformData({ ...formData, brandId : e.value })    
                                }}
                          />
                        </Col>
                        <Col>
                          <Label>
                              <IntlMessages id="Product Type" />
                          </Label>
                          <div style={{display:'flex'}}>
                            <div style={{flex:1}}>
                              <Select
                                components={{ Input: CustomSelectInput }}
                                className="react-select"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                options={selectData}
                                onChange={(e) => {
                                        setformData({ ...formData, ptype: e.value })    
                                    }}
                              />
                            </div>
                            <Button
                            style={{flex:0}}
                            className='ml-1'
                            color="secondary" outline 
                            onClick={() => {setTypeModal(true)}}>Add</Button>
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                            <Label>
                                <IntlMessages id="Product Name" />
                            </Label>
                            <Input onChange={(e) => {
                                setformData({ ...formData, description25Char: e.target.value })
                                setpName(e.target.value)
                                }} />
                        </Col>
                        <Col>
                          <Label>
                              <IntlMessages id="Product SKU" />
                          </Label>
                          <div style={{display:'flex'}}>
                            <div style={{flex:1}}>
                            <Input
                              value = {SKU}
                             onChange={(e) => {
                               console.log(e.target.value)
                                setSKU(e.target.value)
                                setformData({ ...formData, itemNumber: e.target.value })
                                }} />
                            </div>
                            <Button
                            // style={{flex:1}}
                            className='ml-1'
                            color="secondary" outline 
                            onClick={generateSKU}>Auto-generate</Button>
                          </div>
                        </Col>
                        {/* <Col>
                            <Label>
                                <IntlMessages id="Product SKU" />
                            </Label>
                            <Input onChange={(e) => {
                                setformData({ ...formData, pSKU: e.target.value })
                                }} />
                        </Col> */}
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Label>
                            <IntlMessages id="Unit Of Measure" />
                          </Label>
                          <Input type='text' onChange={(e) => {
                              setformData({ ...formData, unitOfMeasure : e.target.value })
                              }} />
                        </Col>
                        <Col>
                          <Label>
                            <IntlMessages id="List Price" />
                          </Label>
                          <Input type='text' onChange={(e) => {
                              setformData({ ...formData, listPrice: e.target.value })
                              }} />
                        </Col>
                        <Col>
                          <Label>
                            <IntlMessages id="Cost Column 1 Price" />
                          </Label>
                          <Input type='text' onChange={(e) => {
                              setformData({ ...formData, costColumn1Price : e.target.value })
                              }} />
                        </Col>
                      </Row>
                      <div className="mt-3">
                        <Label>
                          <IntlMessages id="Product Description" />
                        </Label>
                        <Input type='textarea' onChange={(e) => {
                            setformData({ ...formData, description125Character: e.target.value })
                            }} />
                      </div>
                    </FormGroup>
                    <div className="mt-3">
                      <Button className='mr-2' color="secondary" outline onClick={() => {history.push('/app/inventory/products')}}>
                        <IntlMessages id="pages.cancel" />
                      </Button>
                      <Button color="primary" onClick={CreateNewProduct}>
                        <IntlMessages id="Create Product" />
                      </Button>
                    </div>
                  </Form>
                </Colxx>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        </div>
        <Modal isOpen={typeModal} toggle={() => setTypeModal(!typeModal)}>
          <ModalHeader>
            <IntlMessages id="Add New Product Type" />
          </ModalHeader>
          <ModalBody>
            <div>
              <Label>
                <IntlMessages id="Name" />
              </Label>
              <Input onChange={(e) => {
                  setName(e.target.value)
                  }} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => alert('Added')} color="primary">
              Add
            </Button>{' '}
            <Button color="secondary" onClick={() => setTypeModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
};

export default Newproduct;

