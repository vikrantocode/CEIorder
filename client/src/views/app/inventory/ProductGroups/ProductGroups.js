import React, { useState, useEffect } from 'react';
import 'react-tagsinput/react-tagsinput.css';
import axios from 'axios';
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
import AddNewProductGroupModal from './add-new-group';
import ProductGroupListHeading from './ProductGroupListHeading';
import ProductGroupPageHeadings from './ProductGroupPageHeadings';
import ProductGroupPageListing from './ProductGroupPageListing';
import ProductPageListing from './ProductsPageListing'
import ProductsListHeading from './ProductsListHeading'


const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const orderOptions = [
  { column: 'id', label: 'Id' },
  { column: 'name', label: 'Name' },
  { column: 'productsCount', label: 'Product Count' },
];

const orderManners  = [
  { value: 'ASC', label: 'Ascending' },
  { value: 'DESC', label: 'Descending' }
]

const pageSizes = [10, 15, 30, 100];


const ProductGroup = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(15);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Variant Name',
  });
  const [formData, setFormData] = React.useState({})
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
  const [id, setId] = useState(0)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalAdd, setModalAdd] = useState(false)
  const [loadingData, setLoadingData] = useState(false);
  const [user, setUser] = useState({})
  const [orderBy, setOrderBy] = useState({ column : 'id', label: 'Id'})
  const [orderManner, setOrderManner] = useState({ value : 'ASC', label : 'Ascending' })
  //? Products States
  const [products, setProducts] = useState([])
  const [productCurrentPage, setProductCurrentPage] = useState(1)
  const [lastProduct, setLastProduct] = useState(null)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [productTotalPage, setProductTotalPage] = useState(0)
  const [productCount, setProductCount] = useState(0)
  const [productIds, setProductIds] = useState([])
  const [searchItem, setSearchItem] = useState('')

  const deleteMultipleModal = (e) => {
    setModalDelete(true)
  }

  const CreateNewProductGroup = async e => {
    e.preventDefault();
    let data = formData
    const userId = localStorage.getItem('userId')
    data.userId = parseInt(userId)
    try {
      await axios.post('/api/inventory/product-groups', data)
      setModalOpen(false);
      setchange(!change);
      return NotificationManager.success('Product Group Created Successfully', 'Success', 3000)
    } catch (error) {
      console.log(error);
      return NotificationManager.error(error.response.message, 'Error', 3000) 
    }
  }

  const deleteModal = (e) => {
    setModalBasic(true)
    setId(e);
  }

  const addModal = async (e) => {
    setLoadingData(true)
    setModalAdd(true)
    try {
      const {data} = await axios.get(`/api/inventory/product-groups/${e}`)
      console.log(data)
      setDetails(data.data)
      setSelectedProducts(data.products.map(x => x.id))
      const {data : user} = await axios.get(`/api/user-details?id=${data.data.userId}`)
      setUser(user.data)
      setLoadingData(false)
    } catch (error) {
      console.log(error)
      setModalAdd(false)
      setLoadingData(false)
      return NotificationManager.error(error.response.message)
    }
  }

  useEffect(() => {
    setLoadingData(true)
    axios.get(`/api/inventory/get-products/${productCurrentPage}?searchItem=${searchItem}`)
      .then(res => {
        setProducts(res.data.data)
        setProductCount(res.data.totalItem)
        setProductTotalPage(res.data.totalPage)
        const arr = []
        res.data.data.map(product => arr.push(product.id))
        setProductIds(arr)
        setLoadingData(false)
      })
      .catch(ex => {
        console.log(ex);
        return NotificationManager.error(ex.response.message, 'Error', 3000)
      })
  }, [productCurrentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    function fetchData() {
      axios
        .get(
          `/api/inventory/product-groups?page=${currentPage}&pageSize=${selectedPageSize}&searchItem=${search}&orderBy=${orderBy.column}&orderManner=${orderManner.value}`
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          console.log(data.data);
          setTotalPage(Math.ceil(data.count/selectedPageSize));
          setItems(data.data.map(x => { return { ...x } }));
          // setSelectedItems([]);
          setTotalItemCount(data.count);
          setIsLoaded(true);
        });
    }
    fetchData();
  }, [change]);
  // DELETE MULTIPLE VARIANTS
  const deleteMultiple = async () => {
    axios.delete("/api/inventory/product-groups", { params: { id: selectedItems } }).then(res => {
      console.log(res.data)
      setchange(!change)
      setModalDelete(false)
      NotificationManager.success(
        'Product Groups Deleted Successfully',
        'Success',
        3000,
        null,
        null,
        ''
      );
    })
  }

  // GET THE PRODUCT GROUP DETAILS AND OPEN THE EDIT MODAL
  const openModal = (id, name) => {
    setDetails({ id, name})
    setModal(true)
  };
  
  //DELETE Product Group HANDLER
  const deleteProductGroup = async () => {
    try {
      await axios.delete(`/api/inventory/product-groups?id=${id}`)
      setchange(!change)
      setModalBasic(false)
      return NotificationManager.success('Product Group Deleted Successfully', 'Success', 3000)
    } catch (error) {
      console.log(error)
      return NotificationManager.error(error.response.message, 'Error', 3000)
    }
  };

  // EDIT HANDLER
  const edit = async (e) => {
    let data = {}
    data.name = formData.name
    data.userId = parseInt(localStorage.getItem('userId'))
    try {
      await axios.put(`/api/inventory/product-groups/${e}`, data)
      setModal(false)
      setchange(!change)
      return NotificationManager.success('Product Group Updated Successfully', 'Success', 3000)
    } catch (error) {
      console.log(error);
      return NotificationManager.error(error.response.message, 'Error', 3000)
    }
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


  //? Products Check
  const onProductCheck = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastProduct(id);
    }

    let selectedList = [...selectedProducts];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedProducts(selectedList);

    if (event.shiftKey) {
      let newItems = [...products];
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastProduct, newItems, 'id');
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedProducts.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedProducts));
      setSelectedProducts(selectedList);
    }
    document.activeElement.blur();
    return false;
  };

  const checker = (master, target) => target.every(item => master.includes(item))

  //? Handle All Products Selection
  const handleProductSelectAll = (isToggle) => {
    if (checker(selectedProducts,productIds)) {
      if (isToggle) {
            let arr = []
            arr = selectedProducts.filter(itemId => !productIds.includes(itemId) )
            setSelectedProducts(arr);
      }
    } else {
        let arr = selectedProducts
      products.map((x) => arr.push(x.id));
      setSelectedProducts(Array.from(new Set(arr)))
    }
    
    document.activeElement.blur();
    return false;
  };

  //? Assign Products to group
  const assignGroup = async (req, res) => {
    console.log(typeof(selectedProducts))
    const userId = localStorage.getItem('userId')
    try {
      await axios.put(`/api/inventory/product-groups/${details.id}/products/modify`, { productIds : selectedProducts, userId })
      setSelectedProducts([]);
      setModalAdd(false);
      setchange(!change);
      return NotificationManager.success('Product(s) Assigned/Removed to Group Successfully.', 'Success', 3000)
    } catch (error) {
      console.log(error);
      return NotificationManager.error(error.response.message, 'Error', 3000)
    }
  }

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
    axios.get(`/api/inventory/product-groups?page=${i}&pageSize=${selectedPageSize}&searchItem=${search}&orderBy=${orderBy.column}&orderManner=${orderManner.value}`).then(res => {
      setTotalPage(res.data.count / selectedPageSize);
      setItems(res.data.data.map(x => { return { ...x } }));
      setSelectedItems([]);
      setTotalItemCount(res.data.count);
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
          <ProductGroupPageHeadings
            deleteMultipleModal={deleteMultipleModal}
            heading="Product Groups"
            orderBy={orderBy}
            orderManner={orderManner}
            displayMode={displayMode}
            changeDisplayMode={setDisplayMode}
            orderManners={orderManners}
            handleChangeSelectAll={handleChangeSelectAll}
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
                setSearch(e.target.value);
                axios.get(`/api/inventory/product-groups?page=${currentPage}&pageSize=${selectedPageSize}&searchItem=${e.target.value}&orderBy=${orderBy.column}&orderManner=${orderManner.value}`)
                .then( res => {
                  setTotalPage(res.data.count / selectedPageSize);
                  setItems(res.data.data.map(x => { return { ...x } }));
                  setTotalItemCount(res.data.count);
                  setIsLoaded(true);
                })
              }
            }}
            changeOrderBy={ (ord) => {
              setOrderBy(ord)
                axios.get(`/api/inventory/product-groups?page=${currentPage}&pageSize=${selectedPageSize}&searchItem=${search}&orderBy=${ord.column}&orderManner=${orderManner.value}`)
                  .then(res => {
                    setTotalPage(res.data.count / selectedPageSize);
                    setItems(res.data.data.map(x => { return { ...x } }));
                    setTotalItemCount(res.data.count);
                  })
                }
              }
              changeOrderManner={async (man) => {
                  setOrderManner(man)
                  axios.get(`/api/inventory/product-groups?page=${currentPage}&pageSize=${selectedPageSize}&searchItem=${search}&orderBy=${orderBy.column}&orderManner=${man.value}`)
                  .then(res => {
                    setTotalPage(res.data.count / selectedPageSize);
                    setItems(res.data.data.map(x => { return { ...x } }));
                    setTotalItemCount(res.data.count);
                  })
                }
              }
            orderOptions={orderOptions}
            pageSizes={pageSizes}
            toggleModal={() => setModalOpen(!modalOpen)}
          />
          <AddNewProductGroupModal
            change={change}
            setchange={setchange}
            modalOpen={modalOpen}
            CreateNewProductGroup={CreateNewProductGroup}
            formData = {formData}
            setFormData={setFormData}
            toggleModal={() => setModalOpen(!modalOpen)}
            categories={categories}
          />
          {items.length==0 ? "":<ProductGroupListHeading
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
                axios.get(`/api/inventory/product-groups?page=${currentPage}&pageSize=${selectedPageSize}&searchItem=${search}&orderBy=${ord.column}&orderManner=${orderManners[ind ? 1 : 0].value}`)
                .then(res => {
                  setTotalPage(res.data.count / selectedPageSize);
                  setItems(res.data.data.map(x => { return { ...x } }));
                  setTotalItemCount(res.data.count);
                })
                } else {
                  setOrderManner(orderManners[0])
                axios.get(`/api/inventory/product-groups?page=${currentPage}&pageSize=${selectedPageSize}&searchItem=${search}&orderBy=${ord.column}&orderManner=${orderManners[0].value}`)
                .then(res => {
                  setTotalPage(res.data.count / selectedPageSize);
                  setItems(res.data.data.map(x => { return { ...x } }));
                  setTotalItemCount(res.data.count);
                })
              }
            }
          }
          />}
          {items.length== 0 ? <h3>No Records Found</h3> :<ProductGroupPageListing
            items={items}
            deleteModal={deleteModal}
            openModal={openModal}
            addModal={addModal}
            displayMode={displayMode}
            selectedItems={selectedItems}
            onCheckItem={onCheckItem}
            currentPage={currentPage}
            totalPage={totalPage}
            onContextMenuClick={onContextMenuClick}
            onContextMenu={onContextMenu}
            onChangePage={changePage}
          /> }
          {/* Edit Modal */}
          <Modal isOpen={modal} toggle={() => setModal(!modal)}>
            <ModalHeader>
              <IntlMessages id="Edit" />
            </ModalHeader>
            <ModalBody>
              <Row className='mt-3'>
                <Col>
                  <Label>
                    <IntlMessages id="Group Name" />
                  </Label>
                  <Input onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                  }}
                    defaultValue={details.name} />
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
              Are you sure you want to delete product group?
            </ModalBody>
            <ModalFooter>
              <Button onClick={deleteProductGroup} color="primary">
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
          <Modal isOpen={modalAdd} size="xl">
            <ModalHeader toggle={() => setModalAdd(false)}>
              <IntlMessages id="Add Products to Group" />
            </ModalHeader>
            <ModalBody>
            {loadingData ? <div className="loading"></div> : 
            <>
              <Row>
                <Col>
                  <p className="h6">Product Name : <span className="font-weight-bold">{details.name}</span></p>
                </Col>
                <Col>
                  <p className="h6">Modified On : <span className="font-weight-bold">{details.updatedAt}</span></p>
                </Col>
                <Col>
                  <p className="h6">Modified By : <span className="font-weight-bold">{user.email}</span></p>
                </Col>
              </Row>
              <Row className='mt-3'>
                <Col>
                <Input 
                  placeholder='Search for SKU(s), Name(s)'
                  onKeyUp = {(e) => {
                    if (e.key === 'Enter') {
                      setSearchItem(e.target.value);
                      axios.get(`/api/inventory/get-products/1?searchItem=${e.target.value}`)
                      .then( res => {
                        setProducts(res.data.data)
                        setProductCount(res.data.totalItem)
                        setProductTotalPage(res.data.totalPage)
                        const arr = []
                        res.data.data.map(product => arr.push(product.id))
                        setProductIds(arr)
                        NotificationManager.success('Search Completed.', 'Success', 3000)
                      })
                    }
                  }}
                  />
                </Col>
              </Row>
              <p className="mt-2 h6 text-right">Listing {productCount} Product(s)</p>
              {productCount ? <>
                <ProductsListHeading
                  checker={checker}
                  productIds={productIds}
                  selectedProducts={selectedProducts}
                  handleChangeSelectAll={handleProductSelectAll}
                />
                {items && <ProductPageListing
                  items={products}
                  selectedItems={selectedProducts}
                  onCheckItem={onProductCheck}
                  currentPage={productCurrentPage}
                  totalPage={productTotalPage}
                  onChangePage={setProductCurrentPage}
                />}
              </> : <h4 className="text-center">No Products</h4>}
              </> }
            </ModalBody>
            <ModalFooter>
              <p className="alert alert-primary rounded mx-2 mt-3">{selectedProducts.length} Product(s) Selected</p>
              <Button color="primary" disabled={!selectedProducts.length} onClick={assignGroup}>
                Assign
              </Button>{' '}
              <Button color="secondary" onClick={() => setModalAdd(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    );
};

export default ProductGroup;
