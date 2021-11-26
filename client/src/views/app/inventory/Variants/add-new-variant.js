import React, {useState} from 'react';
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
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import IntlMessages from '../../../../helpers/IntlMessages';
import axios from 'axios'
import { NotificationManager } from '../../../../components/common/react-notifications';


const statusOptions = [
  { label: 'Active', value: 'Active', key: 0 },
  { label: 'Inactive', value: 'Inactive', key: 1 }
];
const AddNewVariantModal = ({ modalOpen, toggleModal, categories,change,setchange }) => {
  const [formData,setformData]= React.useState({})
  const [variants, setVariants] = useState([ "" ]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Create new Variant axios call
  const CreateNewVariant=(e)=>{
    e.preventDefault()
    var selectedCategories =[]
    for(var i of selectedOptions){
      selectedCategories.push(i.label)
    }
    if(!formData.name || !formData.status || variants.length==0 || selectedCategories.length==0){
      NotificationManager.error(
        "Please check the details",
        'Error',
        3000,
        null,
        null,
        ''
      );
    }
    else{
      const data = {
        variant:formData.name.toLowerCase(),
        status:formData.status,
        attributes:variants,
        categories:selectedCategories
      }
  
      axios.post("/api/inventory/new-variant",data).then(res=>{
        if(res.data.success){
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
  }
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    console.log(index)
  const list = [...variants];
  list.splice(index, 1);
  console.log(list)
  setVariants(list);
  };
  // handle click event of the Add button
  const handleAddClick = () => {
  setVariants([...variants, { value: "" }]);
  };

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="Add New Variation" />
      </ModalHeader>
      <ModalBody>
        <div className="mt-3">
          <Label>
              <IntlMessages id="Variant Name" />
          </Label>
          <Input onChange={(e) => {
              setformData({ ...formData, name: e.target.value })
              }} />
      </div>      
      {variants.map((variant, i) => {
      return (
        <Row>
          <Col>
            <Label className="mt-4">
                <IntlMessages id="Variant Value" />
            </Label>
            <Input value={variant.value} onChange={(e) => {
                let values = [...variants];
                values[i] = e.target.value;
                setVariants(values)
                }} />
          </Col>
          <div className='mt-5'>
              {variants.length !== 1 && <Button
              color="secondary" outline 
              onClick={() => handleRemoveClick(i)}>Remove</Button>}
          </div>
          </Row>
          );
      })}
      <div className="text-right">
      <Button className='mt-3' color="primary" onClick={handleAddClick}>
          <IntlMessages id="Add More Value" />
      </Button> 
      </div>           
      <div className="">
          <label>
              <IntlMessages id="Select Category" />
          </label>
          <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          isMulti
          name="form-field-name"
          value={selectedOptions}
          onChange={setSelectedOptions}
          options={categories}
        />
      </div>
      <div className="mt-3">
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
      </div>        
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button onClick={CreateNewVariant} color="primary">
          <IntlMessages id="Create Variant" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewVariantModal;

