import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import React, { useState } from 'react';
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

const selectData = [
  { label: 'Small', value: 'Small', key: 0 },
  { label: 'Medium', value: 'Medium', key: 1 },
  { label: 'Large', value: 'Large', key: 2 }
]

const NewType = ({ match }) => {
  const [formData, setformData] = useState({})
  const [user, setUser] = useState('user')
  const [typeModal, setTypeModal] = useState(false)
  const [name, setName] = useState('')
  const history = useHistory()
  const CreateNewType = (e) => {
    e.preventDefault();
    alert('Submitted')
  }

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <Breadcrumb heading="Add New Product Type" match={match} />
            <Separator className="mb-5" />
        </Colxx>
      </Row>
      <div className="d-flex flex-column">
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <Colxx xxs="12" className="mb-5">
                  <h3 className="mb-4">Product Type Form</h3>
                  <Form>
                    <FormGroup>
                      <Row className="mt-3">
                        <Col>
                            <Label>
                                <IntlMessages id="Type Name" />
                            </Label>
                            <Input onChange={(e) => {
                                setformData({ ...formData, name: e.target.value })
                                }} />
                        </Col>
                        <Col>
                            <Label>  
                              <IntlMessages id="Amazon Tax Code" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, ataxcode: e.value })    
                                }}
                            />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                            <Label>  
                              <IntlMessages id="Amazon Category" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, acatg: e.value })    
                                }}
                            />
                        </Col>
                        <Col>
                            <Label>  
                              <IntlMessages id="Amazon Sub Category" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, asubcatg: e.value })    
                                }}
                            />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                            <Label>
                                <IntlMessages id="Sears Category" />
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
                                            setformData({ ...formData, scatg: e.value })    
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
                        <Col>
                            <Label>  
                              <IntlMessages id="NewEgg.com Category Industry" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, necatg: e.value })    
                                }}
                            />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                            <Label>  
                              <IntlMessages id="NewEgg.com Sub Category" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, nescatg: e.value })    
                                }}
                            />
                        </Col>
                        <Col>
                            <Label>  
                              <IntlMessages id="NewEgg.com Template" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, netempl: e.value })    
                                }}
                            />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                            <Label>  
                              <IntlMessages id="Bonanza Category" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, bocatg: e.value })    
                                }}
                            />
                        </Col>
                        <Col>
                            <Label>
                                <IntlMessages id="Reverb Category" />
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
                                            setformData({ ...formData, revcatg: e.value })    
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
                                <IntlMessages id="GoogleExpress Taxonomy" />
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
                                            setformData({ ...formData, getax: e.value })    
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
                        <Col>
                            <Label>  
                              <IntlMessages id="Walmart Marketplace Category" />
                            </Label>
                            <Row>
                                <Col>
                                    <Select
                                    components={{ Input: CustomSelectInput }}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    options={selectData}
                                    onChange={(e) => {
                                            setformData({ ...formData, wmpcatg: e.value })    
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                    components={{ Input: CustomSelectInput }}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    name="form-field-name"
                                    options={selectData}
                                    onChange={(e) => {
                                            setformData({ ...formData, wmccatg: e.value })    
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                            <Label>
                                <IntlMessages id="Has Prop Warning -  52 " />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData }
                            onChange={(e) => {
                                    setformData({ ...formData, haswarning: e.value })
                            }}
                            />
                        </Col>
                        <Col>
                            {formData.haswarning && 
                            <>
                            <Label>
                                <IntlMessages id="Prop - 52 Warning Message" />
                            </Label>
                            <Input onChange={(e) => {
                                    setformData({ ...formData, warmessage: e.value })
                            }}/>
                            </>
                            }
                        </Col>
                    </Row>
                    <h3 className="mt-4">eBay Defaults</h3>
                    <Separator className="mt-3" />
                    <Row className="mt-3">
                        <Col>
                            <Label>  
                              <IntlMessages id="Select Site" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, site: e.value })    
                                }}
                            />
                        </Col>
                        <Col>
                            <Label>
                                <IntlMessages id="eBay Category" />
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
                                            setformData({ ...formData, ebaycatg: e.value })    
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
                                <IntlMessages id="eBay Category 2" />
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
                                            setformData({ ...formData, ebaycatg2: e.value })    
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
                        <Col>
                            <Label>  
                              <IntlMessages id="eBay Store Category" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, ebaystcatg: e.value })    
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col>
                            <Label>  
                              <IntlMessages id="eBay Store Category 2" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, ebaystcatg2: e.value })    
                                }}
                            />
                        </Col>
                        <Col>
                            <Label>  
                              <IntlMessages id="eBay Item Condition" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, ebayitemcondn: e.value })    
                                }}
                            />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                            <Label>  
                              <IntlMessages id="Description Template" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, desctempl: e.value })    
                                }}
                            />
                        </Col>
                        <Col>
                            <Label>  
                              <IntlMessages id="Description Template (Kit)" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, desctemplkit: e.value })    
                                }}
                            />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                            <Label>  
                              <IntlMessages id="Payment Profile" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, payprof: e.value })    
                                }}
                            />
                        </Col>
                        <Col>
                            <Label>  
                              <IntlMessages id="Shipping Profile" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, shipprof: e.value })    
                                }}
                            />
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                            <Label>  
                              <IntlMessages id="Return Policy Profile" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, returnpolicyprof: e.value })    
                                }}
                            />
                        </Col>
                        <Col>
                            <Label>  
                              <IntlMessages id="Item Specifics Category" />
                            </Label>
                            <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            options={selectData}
                            onChange={(e) => {
                                    setformData({ ...formData, itemspecscatg: e.value })    
                                }}
                            />
                        </Col>
                      </Row>
                    </FormGroup>
                    <div className="mt-3">
                      <Button className='mr-2' color="secondary" outline onClick={() => {history.push('/app/inventory/product-types')}}>
                        <IntlMessages id="pages.cancel" />
                      </Button>
                      <Button color="primary" onClick={CreateNewType}>
                        <IntlMessages id="Create Product Type" />
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

export default NewType;

