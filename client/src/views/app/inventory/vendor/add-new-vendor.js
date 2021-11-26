import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap';
import Select from 'react-select';
import IntlMessages from '../../../../helpers/IntlMessages';
import axios from 'axios'
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { NotificationManager } from '../../../../components/common/react-notifications';

const styles = {
  
    profileImg: {
      height: '3rem',
      width: '3rem',
      borderRadius: '50%',
    },
   
  };

  // const statusOptions = [
  //   { label: 'Active', value: 'Active', key: 0 },
  //   { label: 'Inactive', value: 'Inactive', key: 1 },
  // ];


  const AddNewVendor= ({modalOpen, toggleModal, change, setchange})=>{

    const [formData, setformData] = React.useState({})


    const CreateNewVendor = (e) =>{
      console.log("aaaaaaa")
        e.preventDefault();
      if(formData.vendorAbbreviation && formData.vendorShortName && formData.vendorPricerPrintName){
        axios.post("/api/inventory/add-vendor", formData).then(res =>{
          if (res.data.success) {
            toggleModal()
            setchange(!change)
            NotificationManager.success(
              res.data.success,
              'Success',
              3000,
              null,
              null,
              ''
            );
          }
        })
      }
        setformData({});
    }



return (
    <Modal
    isOpen={modalOpen}
    toggle={toggleModal}
    wrapClassName="modal-right"
    backdrop="static"
    >
     <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Add New Vendor" />
      </ModalHeader>
      <ModalBody>
        <div className='mt-3'>
          <Label>
            <IntlMessages id="Vendor Abbreviation" />
          </Label>
          <Input onChange={(e) => {
            setformData({ ...formData, vendorAbbreviation: e.target.value })
          }} />
        </div>
        <div className='mt-3'>
          <Label>
            <IntlMessages id="Vendor Short Name" />
          </Label>
          <Input onChange={(e) => {
            setformData({ ...formData, vendorShortName: e.target.value })
          }} />
        </div>
        <div className='mt-3'>
          <Label>
            <IntlMessages id="Vendor Pricer Print Name" />
          </Label>
          <Input onChange={(e) => {
            setformData({ ...formData, vendorPricerPrintName: e.target.value })
          }} />
        </div>
        <Row className="mt-3">
          {/* <Col className="sm-6">
            <Label>
            <IntlMessages id="Slug" />
            </Label>
            <Input onChange={(e) => {
                    setformData({ ...formData, slug: e.target.value })
                }}/>
            </Col> */}
          {/* <Col className="sm-6">
            <Label>
              <IntlMessages id="Status" />
            </Label>

            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              options={statusOptions}
              onChange={(e) => {
                setformData({ ...formData, status: e.value })

              }}
            />
          </Col> */}
        </Row>
    
        
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button onClick={CreateNewVendor} color="primary">
          <IntlMessages id="Create Vendor" />
        </Button>
      </ModalFooter>
    </Modal>
)
  }
  
export default AddNewVendor;