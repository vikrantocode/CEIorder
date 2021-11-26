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
      height: '5rem',
      width: '5rem',
      borderRadius: '50%',
    },
   
  };

  // const statusOptions = [
  //   { label: 'Active', value: 'Active', key: 0 },
  //   { label: 'Inactive', value: 'Inactive', key: 1 },
  // ];


  const AddNewBrand= ({modalOpen, toggleModal, change, setchange})=>{

    const [formData, setformData] = React.useState({})
    const [parentbrands, setParentbrands] = useState([]);
    const [brandImage, setBrandImage] = useState(null)
    const [brandImagedata, setBrandImagedata] = useState(null)
    const baseimageurl= "https://cdn.linqusacorp.com"

    const CreateNewBrand = async (e) => {
      e.preventDefault();
      if(!formData.brandShortName){
        return NotificationManager.warning('Brand Short Name is Mandatory', 'Warning', 3000);
      }
      if (brandImagedata) {
        let form = new FormData();
        form.append('imageNameBrandLogo', brandImagedata);
        const fields = Object.keys(formData);
        for (let field of fields) form.append([field], formData[field]);
        for (let item of form.entries()) {
          console.log(item);
        }
        axios.post("/api/inventory/addBrand", form).then(res =>{
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
      else{
        let formdata= {
          brandShortName: formData.brandShortName,
          brandLongName: formData.brandLongName,
          parentId: formData.parentId, 
        }
        axios.post("/api/inventory/addBrand", formdata).then(res =>{
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
    };

    const onChangePicture = (e) => {
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            setBrandImage(reader.result);
        });
          reader.readAsDataURL(e.target.files[0]);
          setBrandImagedata(e.target.files[0]);
        }
      }
    
      useEffect(() => {
        axios.get('/api/inventory/get-brand').then((res) => {
          console.log(res.data.data);
          var brandList = [];
          var singleBrand;
          for (var i of res.data.data) {
            
              singleBrand = {
                label: i.brandShortName,
                value: i.brandShortName,
                key: i.id,
              };
              brandList.push(singleBrand);
          }
          setParentbrands(brandList);
        });
      }, []);

return (
    <Modal
    isOpen={modalOpen}
    toggle={toggleModal}
    wrapClassName="modal-right"
    backdrop="static"
    >
     <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Add New Brand" />
      </ModalHeader>
      <ModalBody>
        <div className='mt-3'>
          <Label>
            <IntlMessages id="Brand Short Name" />
          </Label>
          <Input onChange={(e) => {
            setformData({ ...formData, brandShortName: e.target.value })
          }} />
        </div>
        <div className='mt-3'>
          <Label>
            <IntlMessages id="Brand Long Name" />
          </Label>
          <Input onChange={(e) => {
            setformData({ ...formData, brandLongName: e.target.value })
          }} />
        </div>
        <div className="mt-3">
          <Label>
            <IntlMessages id="Parent Brand" />
          </Label>

          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={parentbrands}
            onChange={(e) => {
              setformData({ ...formData, parentId: e.key });
            }}
          />
        </div>
        <div className="d-flex align-items-center justify-content-center flex-column p-3">
            
            {brandImage ? <img
              style={styles.profileImg}
              src={brandImage}
              alt=""
            /> : <img src="https://icon-library.com/images/category-icon/category-icon-29.jpg"/>}
            <Label className="font-weight-bold edit-profile mt-2" htmlFor="imageNameItem">
              <IntlMessages id="Change Picture" />
            </Label>
            <Input
                    accept='image/*'
                    onChange={onChangePicture}
                    style={{ display: 'none' }}
                    type="file"
                    name="imageNameItem"
                    id="imageNameItem"
                  />
          </div>
        
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button onClick={CreateNewBrand} color="primary">
          <IntlMessages id="Create Brand" />
        </Button>
      </ModalFooter>
    </Modal>
)
  }
  
export default AddNewBrand;