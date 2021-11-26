import React, { useState, useEffect } from 'react';

import axios from 'axios';

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
import Select from 'react-select';
import ProductTypeListHeading from './ProductTypeListHeading';
import ProductTypePageListing from './ProductTypePageListing';
import InventoryPageHeading from '../common/InventoryPageHeading';
import { Separator } from '../../../../components/common/CustomBootstrap';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};
const statusOptions = [
    { label: 'Active', value: 'Active', key: 0 },
    { label: 'Inactive', value: 'Inactive', key: 1 },
  ];
const apiUrl = `${servicePath}/cakes/paging`;

const orderOptions = [
  { column: 'id', label: 'Id' },
  { column: 'category', label: 'Category Name' },
  { column: 'status', label: 'Status' },
];

const orderManners = [
  { value : 'ASC', label : 'Ascending'},
  { value : 'DESC', label : 'Descending'}
]

const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

const ProductType = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Category Name',
  });
  const [orderBy, setOrderBy] = useState({ column: 'id', label: 'Id'})
  const [orderManner, setOrderManner] = useState({ value : 'ASC', label : 'Ascending'})
  const [formData,setformData]= React.useState({})
  const [modalBasic, setModalBasic] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [modal,setModal]= useState(false)
  const [details,setDetails] = useState({})
  const [change,setchange] = useState(false)
  const [categoryId,setCategoryId] = useState("")
  const [modalDelete,setModalDelete] = useState(false)

  const deleteMultipleModal = (e)=>{
    setModalDelete(true)
    
  }
  
  const deleteModal =(e)=>{
    setCategoryId(e)
    setModalBasic(true)
  }
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    async function fetchData() {
      const {data} = await axios.get('/api/inventory/product-types')
      console.log(data)
      setItems(data.map(x=>{ return { ...x}}));
      setSelectedItems([]);
      // setTotalItemCount(data.totalItem);
      setIsLoaded(true);
    }
    fetchData();
  }, [change]);


  // GET THE Category DETAILS AND OPEN THE EDIT MODAL
  const openModal = (e) => {
    console.log(e);
    setModal(true)
  };

  //DELETE CATEGORY HANDLER
  const deleteCategory = (e) => {
    axios
      .post('/api/inventory/delete-category', null, { params: { id: categoryId } })
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
// EDIT CATEGORY 
const edit =()=>{
  const data = new FormData()
 
  axios.post("/api/inventory/edit-category",formData,{params:{id:categoryId}}).then(res=>{
    console.log(res)
    setchange(!change)
    setModal(false)
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
// DELETE MULTIPLE CATEGORIES
  const deleteMultiple = ()=>{
    axios.post("/api/inventory/delete-category",null,{params:{id:selectedItems}}).then(res=>{
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
  const deactivate =(e)=>{
    axios.post("/api/inventory/deactivate-category",null,{params:{id:selectedItems}}).then(res=>{
      if(res.data.success){
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
  const activate =(e)=>{
    axios.post("/api/inventory/activate-category",null,{params:{id:selectedItems}}).then(res=>{
      if(res.data.success){
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

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const changePage = (i) => {
    setCurrentPage(i)
    axios.get(`/api/inventory/get-categories/${i}`).then(res => {
      setTotalPage(res.data.totalPage);
      setItems(res.data.data.map(x => { return { ...x } }));
      setSelectedItems([]);
      // setTotalItemCount(data.totalItem);
      setIsLoaded(true);
    })
  }

  const onContextMenu = (e, data) => {
    const clickedCategoryId = data.data;
    if (!selectedItems.includes(clickedCategoryId)) {
      setSelectedItems([clickedCategoryId]);
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
        <InventoryPageHeading
          orderManners={orderManners}
          heading='Product Types'
          addUrl='/app/inventory/add-new-type'
          deleteMultipleModal={deleteMultipleModal}
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changeOrderBy={(column) => {
              setSelectedOrderOption(
                orderOptions.find((x) => x.column === column)
              );
              axios.get("/api/inventory/get-categories/1", { params: { sortby: column } }).then(res => {
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
                axios.get("/api/inventory/get-categories/1", { params: { search: e.target.value.toLowerCase() } }).then((res) => {
                  setItems(res.data.data.map(x => { return { ...x } }));
                  setSelectedItems([]);
                  // setTotalItemCount(res.data.totalItem);
                  setIsLoaded(true);
                })
              }
            }}
          orderOptions={orderOptions}
          orderManners={orderManners}
          orderBy={orderBy}
          orderManner={orderManner}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          activate={activate}
          deactivate={deactivate}
        />
        {items.length==0 ? "": <ProductTypeListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}
            orderBy={orderBy}
            orderManner={orderManner}
            changeOrderBy={async (ord) => {
              setOrderBy(ord)
              if(orderBy.column === ord.column){
                const ind = !(orderManners.findIndex(man => man.value===orderManner.value))
                setOrderManner(orderManners[ind ? 1 : 0])
                } else {
                  setOrderManner(orderManners[0])
                  }
                }
              }
        /> }
      
        {items.length==0 ? <h3>No Records found</h3> :  <ProductTypePageListing 
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
            setCategoryId={setCategoryId}
        /> }
        {/* Edit Modal */}
        <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
          <ModalHeader>
            <IntlMessages id="Edit" />
          </ModalHeader>
          <ModalBody>
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
                  options={categories}
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
                  options={categories}
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
                  options={categories}
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
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    options={categories}
                    onChange={(e) => {
                            setformData({ ...formData, scatg: e.value })    
                        }}
                  />
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
                  options={categories}
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
                  options={categories}
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
                  options={categories}
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
                  options={categories}
                  onChange={(e) => {
                          setformData({ ...formData, bocatg: e.value })    
                      }}
                  />
              </Col>
              <Col>
                  <Label>
                      <IntlMessages id="Reverb Category" />
                  </Label>
                  <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={categories}
                      onChange={(e) => {
                              setformData({ ...formData, revcatg: e.value })    
                          }}
                  />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                  <Label>
                      <IntlMessages id="GoogleExpress Taxonomy" />
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    options={categories}
                    onChange={(e) => {
                            setformData({ ...formData, getax: e.value })    
                        }}
                  />
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
                          options={categories}
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
                          options={categories}
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
                  options={categories }
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
                  options={categories}
                  onChange={(e) => {
                          setformData({ ...formData, site: e.value })    
                      }}
                  />
              </Col>
              <Col>
                  <Label>
                      <IntlMessages id="eBay Category" />
                  </Label>
                  <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={categories}
                      onChange={(e) => {
                              setformData({ ...formData, ebaycatg: e.value })    
                          }}
                  />
              </Col>
          </Row>
          <Row className="mt-3">
              <Col>
                  <Label>
                      <IntlMessages id="eBay Category 2" />
                  </Label>
                  <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      options={categories}
                      onChange={(e) => {
                              setformData({ ...formData, ebaycatg2: e.value })    
                          }}
                  />
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
                  options={categories}
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
                  options={categories}
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
                  options={categories}
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
                  options={categories}
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
                  options={categories}
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
                  options={categories}
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
                  options={categories}
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
                  options={categories}
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
                  options={categories}
                  onChange={(e) => {
                          setformData({ ...formData, itemspecscatg: e.value })    
                      }}
                  />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button onClick={edit} color="primary">
              Save Changes
            </Button>{' '}
            <Button color="secondary" onClick={() => setModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
          </Modal>
        {/* Delete Modal */}
        <Modal isOpen={modalBasic} toggle={() => setModal(!modalBasic)}>
        <ModalHeader>
          <IntlMessages id="Delete" />
        </ModalHeader>
        <ModalBody>
         Are you sure you want to delete Product Type?
        </ModalBody>
        <ModalFooter>
          <Button onClick={deleteCategory} color="primary">
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

export default ProductType;
