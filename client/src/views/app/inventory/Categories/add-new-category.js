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
  Col,
} from 'reactstrap';
import Select from 'react-select';
import IntlMessages from '../../../../helpers/IntlMessages';
import axios from 'axios';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { NotificationManager } from '../../../../components/common/react-notifications';

const styles = {
  profileImg: {
    height: '3rem',
    width: '3rem',
    borderRadius: '50%',
  },
};

const statusOptions = [
  { label: 'Active', value: 'Active', key: 0 },
  { label: 'Inactive', value: 'Inactive', key: 1 },
];
const AddNewCategoryModal = ({
  modalOpen,
  toggleModal,
  categories,
  change,
  setchange,
}) => {
  const [formData, setformData] = React.useState({});
  const [parentcategories, setParentcategories] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryImagedata, setCategoryImagedata] = useState(null);
  const baseimageurl = 'https://cdn.linqusacorp.com';

  const createCategory = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      return NotificationManager.warning('Name is Mandatory', 'Warning', 3000);
    }
    
    if (categoryImagedata) {
      let form = new FormData();
      form.append('categoryimg', categoryImagedata);
      form.append('name', formData.name);
      form.append('parentId', formData.parentId);
      form.append('status', formData.status);
      try {
        const { data } = await axios.post('/api/inventory/add-Category', form);
        console.log(data);
        setchange(!change);
        NotificationManager.success(
          'Category Created',
          'Success',
          3000,
          null,
          null,
          ''
        );
        toggleModal();
        setformData({});
      } catch (error) {
        console.log(error);
        NotificationManager.error(
          'Something Went Wrong!',
          'Error',
          3000,
          null,
          null,
          ''
        );
      }
    }
  };

  // Create new Category

  const CreateNewCategory = (e) => {
    e.preventDefault();
    if (categoryImagedata) {
      let imgform = new FormData();
      imgform.append('categoryimg', categoryImagedata);
      axios
        .post('https://cdn.linqusacorp.com/categoryimage', imgform)
        .then((data) => {
          //axios.post("http://localhost:3001/categoryimage",imgform).then(data => {
          if (data.data.success) {
            let path = `${baseimageurl}/category/${data.data.data.filename}`;
            let fordata = {
              status: formData.status,
              name: formData.name,
              parentId: formData.parentId,
              categoryimg: path,
            };
            if (formData.status && formData.name) {
              console.log('database call');
              axios.post('/api/inventory/add-Category', fordata).then((res) => {
                if (res.data.success) {
                  toggleModal();
                  setchange(!change);
                  NotificationManager.success(
                    res.data.success,
                    'Success',
                    3000,
                    null,
                    null,
                    ''
                  );
                  setformData({});
                }
              });
            }
          }
        });
    } else if (formData.status && formData.name && formData.parentId) {
      axios.post('/api/inventory/add-Category', formData).then((res) => {
        if (res.data.success) {
          toggleModal();
          setchange(!change);
          NotificationManager.success(
            res.data.success,
            'Success',
            3000,
            null,
            null,
            ''
          );
          setformData({});
        }
      });
    }
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setCategoryImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setCategoryImagedata(e.target.files[0]);
    }
  };

  useEffect(() => {
    axios.get('/api/inventory/get-category').then((res) => {
      console.log(res.data.data);
      var categoryList = [];
      var singleCategory;
      for (var i of res.data.data) {
        if (i.status) {
          singleCategory = {
            label: i.category,
            value: i.category,
            key: i.id,
          };
          categoryList.push(singleCategory);
        }
      }
      setParentcategories(categoryList);
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
        <IntlMessages id="Add New Category" />
      </ModalHeader>
      <ModalBody>
        <div className="mt-3">
          <Label>
            <IntlMessages id="Category Name" />
          </Label>
          <Input
            onChange={(e) => {
              setformData({ ...formData, name: e.target.value });
            }}
          />
        </div>
        <div className="mt-3">
          <Label>
            <IntlMessages id="Parent Category" />
          </Label>

          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={parentcategories}
            onChange={(e) => {
              setformData({ ...formData, parentId: e.key });
            }}
          />
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
          <Col className="sm-6">
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
                setformData({ ...formData, status: e.value });
              }}
            />
          </Col>
        </Row>
        <div className="d-flex align-items-center justify-content-center flex-column p-3">
          {categoryImage ? (
            <img style={styles.profileImg} src={categoryImage} alt="" />
          ) : (
            <img src="https://icon-library.com/images/category-icon/category-icon-29.jpg" />
          )}
          <Label
            className="font-weight-bold edit-profile mt-2"
            htmlFor="imageNameItem"
          >
            <IntlMessages id="Change Picture" />
          </Label>
          <Input
            accept="image/*"
            onChange={onChangePicture}
            style={{ display: 'none' }}
            type="file"
            name="imageNameItem"
            id="imageNameItem"
          />
        </div>
        {/* <div className="mt-3">
        <Colxx
                    sm="4"
                    xxs="4"
                    md="4"
                    lg="4"
                    xl="4"
                    className="text-center"
                >
                <h5 className="mb-3 h6">Product Image</h5>
                {categoryImage ? (
                <img style={{height:'8rem',width: '8rem'}} src={categoryImage} alt="" />
                ) : (
                    // <img
                    //     style={styles.productImage}
                    //     src={productData.imageNameItem ? 
                    //     `http://cdn.linqusacorp.com/productimages/${productData.imageNameItem}` : 
                    //     defaultImage}
                    //     alt="Not Found"
                    // />
                    null
                )}
                <br />
                <Label
                className="font-weight-bold edit-profile my-3 text-primary text-small"
                for="imageNameItem"
                >
                <IntlMessages id="Change Image" />
                </Label>
                <Input
                    accept='image/*'
                    onChange={onChangePicture}
                    style={{ display: 'none' }}
                    type="file"
                    name="imageNameItem"
                    id="imageNameItem"
                />
            </Colxx>
        </div> */}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button onClick={createCategory} color="primary">
          <IntlMessages id="Create Category" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewCategoryModal;
