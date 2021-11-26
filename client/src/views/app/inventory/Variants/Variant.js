import React, { useState, useEffect } from 'react';
import 'react-tagsinput/react-tagsinput.css';
import axios from 'axios';
import TagsInput from 'react-tagsinput';
import { servicePath } from '../../../../constants/defaultValues';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import useMousetrap from '../../../../hooks/use-mousetrap';
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
import { NotificationManager } from '../../../../components/common/react-notifications';
import IntlMessages from '../../../../helpers/IntlMessages';
import AddNewVariantModal from './add-new-variant';
import VariantListHeading from './VariantListHeading';
import Select from 'react-select';
import VariantPageHeadings from './VariantPageHeadings';
import VariantPageListing from './VariantPageListing';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const apiUrl = `${servicePath}/cakes/paging`;

const orderOptions = [
  { column: 'variant', label: 'Variant name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [4, 8, 12, 20];
const statusOptions = [
  { label: 'Active', value: 'Active', key: 0 },
  { label: 'Inactive', value: 'Inactive', key: 1 }
];
const Variant = ({ match }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Variant Name',
  });
  const [formData, setformData] = React.useState({})
  const [modalBasic, setModalBasic] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [modal, setModal] = useState(false)
  const [details, setDetails] = useState({})
  const [categories, setcategories] = useState([])
  const [change, setchange] = useState(false)
  const [variantId, setvariantId] = useState("")
  const [modalDelete, setModalDelete] = useState(false)
  const [tags,setTags] = useState([])

  const deleteMultipleModal = (e) => {
    setModalDelete(true)
  }

  const deleteModal = (e) => {
    setvariantId(e)
    setModalBasic(true)
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    async function fetchData() {
      axios
        .get(
          `/api/inventory/get-variants/1`
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setTotalPage(data.totalPage);
          setItems(data.data.map(x => { return { ...x } }));
          setSelectedItems([]);
          // setTotalItemCount(data.totalItem);
          setIsLoaded(true);
        });
    }
    fetchData();
  }, [change]);
  // DELETE MULTIPLE VARIANTS
  const deleteMultiple = () => {
    axios.post("/api/inventory/delete-variant", null, { params: { id: selectedItems } }).then(res => {
      console.log(res.data)
      setchange(!change)
      setModalDelete(false)
      NotificationManager.success(
        res.data.success,
        'Success',
        3000,
        null,
        null,
        ''
      );
    })
  }

  // BULK STATUS CHANGE
  const deactivate = (e) => {
    axios.post("/api/inventory/deactivate-variant", null, { params: { id: selectedItems } }).then(res => {
      if (res.data.success) {
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
  const activate = (e) => {
    axios.post("/api/inventory/activate-variant", null, { params: { id: selectedItems } }).then(res => {
      if (res.data.success) {
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

  useEffect(() => {
    axios.get("/api/inventory/get-category").then(res => {
      console.log(res.data.data)
      var categoryList = []
      var singleCategory
      for (var i of res.data.data) {
        if (i.status) {
          singleCategory = {
            label: i.category,
            value: i.category,
            key: i.id
          }
          categoryList.push(singleCategory)
        }

      }
      setcategories(categoryList)
      console.log("categories are", categories)
    })
  }, [])


  // GET THE VARIANT DETAILS AND OPEN THE EDIT MODAL
  const openModal = (e) => {
    axios.get("/api/inventory/variant-details", { params: { id: e } }).then(res => {
      console.log(res.data.data);
      setDetails(res.data.data)
      var selectedData = []
      console.log(details);
      for(var i of res.data.data.categories){
        var obj = {
          label:i,
          value:i
        }
        selectedData.push(obj)
      }
      setSelectedOptions(selectedData)
      setTags(res.data.data.attributes)
      setModal(true)
    })

  };
  //DELETE Varint HANDLER
  const deleteVariant = (e) => {
    axios
      .post('/api/inventory/delete-variant', null, { params: { id: variantId } })
      .then((res) => {
        setchange(!change)
        setModalBasic(false);
        NotificationManager.success(
          res.data.success,
          'Success',
          3000,
          null,
          null,
          ''
        );
      });
  };

  // EDIT HANDLER
  const edit = (e) => {
    console.log(e);
    const data = {}
    var selectedCategories = []
    if (formData.name) {
      data.variant = formData.name.toLowerCase()
    }
    if (formData.status) {
      if (formData.status == "Active") {
        data.status = true
      }
      else {
        data.status = false
      }
    }
    if (tags) {
      data.attributes = tags
    }
    if(selectedOptions.length>0){
      for(var i of selectedOptions){
         selectedCategories.push(i.value)
      }
      data.categories=selectedCategories
    }
    console.log(data)
    axios.post("/api/inventory/edit-variant", data, { params: { id: e } }).then(res => {
      console.log(res);
      if (res.data.success) {
        setModal(false)
        setchange(!change)
        NotificationManager.success(res.data.success, 'Success', 3000, null, null, '');
      }

    })
  }

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...items];
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastChecked, newItems, 'id');
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  const changePage = (i) => {
    setCurrentPage(i)
    axios.get(`/api/inventory/get-variants/${i}`).then(res => {
      setTotalPage(res.data.totalPage);
      setItems(res.data.data.map(x => { return { ...x } }));
      setSelectedItems([]);
      // setTotalItemCount(data.totalItem);
      setIsLoaded(true);
    })
  }

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return !isLoaded ? (
    <div className="loading" />
  ) : (
      <>
        <div className="disable-text-selection">
          <VariantPageHeadings
            deleteMultipleModal={deleteMultipleModal}
            activate={activate}
            deactivate={deactivate}
            heading="Attribute"
            displayMode={displayMode}
            changeDisplayMode={setDisplayMode}
            handleChangeSelectAll={handleChangeSelectAll}
            changeOrderBy={(column) => {
              setSelectedOrderOption(
                orderOptions.find((x) => x.column === column)
              );
              axios.get("/api/inventory/get-variants/1", { params: { sortby: column } }).then(res => {
                setItems(res.data.data.map(x => { return { ...x } }));
                setSelectedItems([]);
                setIsLoaded(true);
              })
            }}
            changePageSize={setSelectedPageSize}
            selectedPageSize={selectedPageSize}
            totalItemCount={totalItemCount}
            selectedOrderOption={selectedOrderOption}
            match={match}
            startIndex={startIndex}
            endIndex={endIndex}
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            itemsLength={items ? items.length : 0}
            onSearchKey={(e) => {
              if (e.key === 'Enter') {
                setSearch(e.target.value.toLowerCase());
                axios.get("/api/inventory/get-variants/1", { params: { search: e.target.value.toLowerCase() } }).then((res) => {
                  setItems(res.data.data.map(x => { return { ...x } }));
                  setSelectedItems([]);
                  // setTotalItemCount(res.data.totalItem);
                  setIsLoaded(true);
                })
              }
            }}
            orderOptions={orderOptions}
            pageSizes={pageSizes}
            toggleModal={() => setModalOpen(!modalOpen)}
          />
          <AddNewVariantModal
            change={change}
            setchange={setchange}
            modalOpen={modalOpen}
            toggleModal={() => setModalOpen(!modalOpen)}
            categories={categories}
          />
          {items.length==0 ? "":<VariantListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}
          />}
          {items.length== 0 ? <h3>No Records Found</h3> :<VariantPageListing
            items={items}
            deleteModal={deleteModal}
            openModal={openModal}
            displayMode={displayMode}
            selectedItems={selectedItems}
            onCheckItem={onCheckItem}
            currentPage={currentPage}
            totalPage={totalPage}
            onContextMenuClick={onContextMenuClick}
            onContextMenu={onContextMenu}
            onChangePage={changePage}
          /> }
          <Modal isOpen={modal} toggle={() => setModal(!modal)}>
            <ModalHeader>
              <IntlMessages id="Edit" />
            </ModalHeader>
            <ModalBody>
              <Row className='mt-3'>
                <Col>
                  <Label>
                    <IntlMessages id="Attribute Name" />
                  </Label>
                  <Input onChange={(e) => {
                    setformData({ ...formData, name: e.target.value })
                  }}
                    defaultValue={details.variant} />
                </Col>
                <Col>
                  <Label>
                    <IntlMessages id="Attribute Values" />
                  </Label>
                  <TagsInput
                    value={tags}
                    onChange={(val) => setTags(val)}
                    inputProps={{ placeholder: '' }}
                  />
                </Col>
              </Row>
              <Row className='mt-3'>
                <Col>
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
                  //   defaultValue={details.categories ? details.categories.map(item=>{
                  //   return ({label:item, value:item})
                  // }):""}
                  />
                </Col>
                <Col>
                  <Label>
                    <IntlMessages id="Status" />
                  </Label>

                  <Select
                    defaultValue={details.status ? {label: 'Active', value: 'Active'} : {label: 'Inactive', value: 'Inactive'}}
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    options={statusOptions}
                    onChange={(e) => {
                      setformData({ ...formData, status: e.value })

                    }}
                  />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => edit(details.id)} color="primary">
                Save Changes
            </Button>{' '}
              <Button color="secondary" onClick={() => setModal(false)}>
                Cancel
            </Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={modalBasic} toggle={() => setModal(!modalBasic)}>
            <ModalHeader>
              <IntlMessages id="Delete" />
            </ModalHeader>
            <ModalBody>
              Are you sure you want to delete attribute?
        </ModalBody>
            <ModalFooter>
              <Button onClick={deleteVariant} color="primary">
                Confirm
          </Button>{' '}
              <Button color="secondary" onClick={() => setModalBasic(false)}>
                Cancel
          </Button>
            </ModalFooter>
          </Modal>
          {/* Delete multiple Modal */}
          <Modal isOpen={modalDelete} toggle={() => setModal(!modalDelete)}>
            <ModalHeader>
              <IntlMessages id="Delete" />
            </ModalHeader>
            <ModalBody>
              Are you sure you want to delete selected items?
        </ModalBody>
            <ModalFooter>
              <Button onClick={deleteMultiple} color="primary">
                Confirm
          </Button>{' '}
              <Button color="secondary" onClick={() => setModalDelete(false)}>
                Cancel
          </Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
};

export default Variant;
