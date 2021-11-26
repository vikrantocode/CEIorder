import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useMousetrap from '../../../../hooks/use-mousetrap';
import ArchiveProductListHeading from './ArchiveProductListHeadings';
import ArchiveProductPageListing from './ArchiveProductPageListing';
import {useHistory} from 'react-router-dom'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import IntlMessages from '../../../../helpers/IntlMessages';
import ArchiveProductPageHeading from './ArchiveProductPageHeading';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const orderOptions = [
  { column: 'name', label: 'Product Name' },
  { column: 'SKU', label: 'SKU' },
  { column: 'retailPrice', label: 'Cost' },
];
const pageSizes = [15, 30, 60];

const orderManners = [
  { value : 'ASC', label : 'Ascending'},
  { value : 'DESC', label : 'Descending'},
]

const ArchiveProduct = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(15);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });
  const [formData,setformData]= React.useState({})
  const [modalBasic, setModalBasic] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [productId, setproductId] = useState("")
  const [modalDelete, setModalDelete] = useState(false)
  const [change,setchange]= useState(false)
  const [importModal, setImportModal] = useState(false)
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false)
  const [importFile, setImportFile] = useState(null)
  const [importing, setImporting] = useState(false)
  const [processingFile, setProcessingFile] = useState(false)
  const history = useHistory()
  const [searchItem, setSearchItem] = useState('')
  const [order, setOrder] = useState({ column: 'id', label: 'Id' })
  const [manner, setManner] = useState({ value : 'ASC', label : 'Ascending'})
  const [brand, setbrand] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [status, setStatus] = useState('default');
  var brandid = []
const [filterOptionsopen,setfilterOptionsopen]= useState(false)
  //const [brandsId, setbrandsId] = useState([]);
  // To Open Delete Modal
  const deleteMultipleModal = (e) => {
    setModalDelete(true)
  }

  const deleteModal = (e) => {
    setproductId(e)
    setModalBasic(true)
  }

    // DELETE MULTIPLE PRODUCTS
    const deleteMultiple = () => {
      axios.post("/api/inventory/delete-product", null, { params: { id: selectedItems } }).then(res => {
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
    //DELETE PRODUCT HANDLER
    const deleteproduct = (e) => {
      axios
        .post('/api/inventory/delete-product', null, { params: { id: productId } })
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
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  const importProducts = async () => {
    if(formData.vendorId && importFile){
      const data = new FormData();
    
    // Update the formData object
    data.append(
      "vendorId",
      formData.vendorId
    );
    data.append(
      "importFile",
      importFile
    );
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
          }
      };
  
    // Details of the uploaded file
    console.log(importFile);
    
    for(let pair of data.entries()){
      console.log(pair[0], " : " ,pair[1])
    }
    // Request made to the backend api
    // Send formData object
    try{
        setImporting(true)
        const res = await axios.post('/api/inventory/import-products', data, config)
        if(res.status === 201){
          setImporting(false)
          setchange(!change)
          setImportModal(false)
          NotificationManager.success(
            res.data.success,
            'Success',
            3000,
            null,
            null,
            ''
          );
        }else{
          setImporting(false)
          NotificationManager.error(
            res.data.error,
            'Error',
            3000,
            null,
            null,
            ''
          );
        }
        console.log(res)
      }catch(err){
        console.log(err)
        setImporting(false)
          NotificationManager.error(
            `Something Wrong With CSV`,
            'Error',
            3000,
            null,
            null,
            ''
          );
      }
    }
    else {
      NotificationManager.error(
        `Select Vendor and File to Import...`,
        'Error',
        3000,
        null,
        null,
        ''
      );
    }
  }

////filter data 
  const filter =(filterdata) => {
    setfilterdata(filterdata)
    
    setStatus('processing');
    brandid=[]
    console.log(filterdata)
    if(filterdata.itemNumber?.length>0 || filterdata.brandId?.length>0 || filterdata.vendor?.length>0 || filterdata.productCategory?.length>0){
      axios.post(`/api/inventory/filterProduct/${currentPage}/?pagesize=${selectedPageSize}`,filterdata)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setStatus('processing');
        setTotalPage(data.totalPage);
        console.log(data.data);
        data.data.map(x=> !brandid.includes(x.brandId) ? brandid.push(x.brandId) : null )
        axios.get(`/api/inventory/getBrand?id=${brandid}`).then(res =>{
          console.log(res)
          setbrand(res.data.data?.map(x=>{return {...x}}))
          setItems(data.data?.map(x=>{ return { ...x}}));
          setIsLoaded(true);
          setStatus('success');
        })
        setSelectedItems([]);
        setTotalItemCount(data.totalItem);

        
      })
      .catch((err)=>{
            setStatus('fail');
          })
          .finally(()=>{
            setTimeout(() => {
              setStatus('default');
              //setMessageShow(false);
            }, 3000);
          })
    } else{
        setStatus('default');
    }
    
  }

  async function fetchData(filterOptionsIsOpen) {

    setfilterOptionsopen(filterOptionsIsOpen)
    //if(Object.getOwnPropertyNames(filterdata).length <= 1){
      axios
      .get(
        `/api/inventory/archive-products/${currentPage}?searchItem=${searchItem}&pagesize=${selectedPageSize}&orderBy=${order.column}&orderManner=${manner.value}`
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setTotalPage(data.totalPage);
        console.log(data.data);
        setItems(data.data.map(x=>{ return { ...x}}));
        data.data.map(x=> !brandid.includes(x.brandId) ? brandid.push(x.brandId) : null )
        setSelectedItems([]);
        setTotalItemCount(data.totalItem);
        
      }).then(()=>{
        axios.get(`/api/inventory/getBrand?id=${brandid}`).then(res =>{
          setbrand(res.data.data?.map(x=>{return {...x}}))
          setIsLoaded(true);
        })
      })
   // }
    
  }

  // Fetching products via axios call
  useEffect(() => {
    //fetchData();
    console.log(filterdata,"zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    console.log(typeof filterdata,"zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    console.log(Object.getOwnPropertyNames(filterdata))
    if(Object.getOwnPropertyNames(filterdata).length > 1){
      filter(filterdata)
      console.log("full")
      console.log(filterdata)
    } else{
      console.log("empty")
      fetchData();
    }
    
  }, [change]);


  const EditProduct =(e)=>{
    localStorage.setItem("productId", e);
    history.push("/app/inventory/products/edit")
  }

  // EDIT HANDLER
  const edit=(e)=>{
    console.log(e);
    axios.post("/api/edit-user",formData,{params:{id:e}}).then(res=>{
      console.log(res);
      if (res.data.success) {
        setModal(false)
        NotificationManager.success(res.data.success, 'Success', 3000, null, null, '');
        window.location.reload()
      }
    })
  }
// When check an product item.
  const onCheckItem = (event, id) => {
    console.log(id)
    console.log(selectedItems);
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

  // Bulk Selection handler.
  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
    }
    document.activeElement.blur();
    console.log(selectedItems)
    return false;
  };

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
      {/* Page Heading with Navigations */}
        <ArchiveProductPageHeading
        filter={filter}
        status={status}
        fetchData={fetchData}
        setfilterdata={setfilterdata}
        //brandsre={setbrandsId}
          processingFile={processingFile}
          setProcessingFile={setProcessingFile}
          importing={importing}
          setData={setData}
          setItems = {setItems}
          heading="Archive Products"
          addUrl='/app/inventory/add-new-product'
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changeOrderBy={async (ord) => {
            setOrder(ord)
            axios.get(`/api/inventory/archive-products/${1}?pagesize=${selectedPageSize}&searchItem=${searchItem}&orderBy=${ord.column}&orderManner=${manner.value}`)
              .then(res => {
                setTotalItemCount(res.data.totalItem)
                setTotalPage(res.data.totalPage);
                setItems(res.data.data.map(x => { return { ...x } }));
                // setTotalItemCount(data.totalItem);
              })
            }
          }
          changeOrderManner={async (man) => {
              setManner(man)
              axios.get(`/api/inventory/archive-products/${1}?pagesize=${selectedPageSize}&searchItem=${searchItem}&orderBy=${order.column}&orderManner=${man.value}`)
              .then(res => {
                setTotalItemCount(res.data.totalItem)
                setTotalPage(res.data.totalPage);
                setItems(res.data.data.map(x => { return { ...x } }));
                // setTotalItemCount(data.totalItem);
              })
            }
          }
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          selectedOrderOption={selectedOrderOption}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          change={change}
          setchange={setchange}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearchItem(e.target.value);
              axios.get(`/api/inventory/archive-products/1?pagesize=${selectedPageSize}&searchItem=${e.target.value}&orderBy=${order.column}&orderManner=${manner.value}`)
              .then( res => {
                setTotalItemCount(res.data.totalItem)
                setTotalPage(res.data.totalPage);
                setItems(res.data.data.map(x => { return { ...x } }));
              })
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          deleteMultipleModal={deleteMultipleModal}
          importModal = {importModal} 
          setImportModal = {setImportModal}
          setImportFile= {setImportFile}
          importProducts={importProducts}
          formData={formData}
          setformData={setformData}
          order={order}
          manner={manner}
        />
        {/* Table List Headings */}
        {items.length==0 ? "" :<ArchiveProductListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}
            manner={manner}
            order={order}
            changeOrderBy={async (ord) => {
              setOrder(ord)
              if(order.column === ord.column){
                const ind = !(orderManners.findIndex(man => man.value===manner.value))
                setManner(orderManners[ind ? 1 : 0])
                axios.get(`/api/inventory/archive-products/${1}?pagesize=${selectedPageSize}&searchItem=${searchItem}&orderBy=${ord.column}&orderManner=${orderManners[ind ? 1 : 0].value}`)
                .then(res => {
                  setTotalItemCount(res.data.totalItem)
                  setTotalPage(res.data.totalPage);
                  setItems(res.data.data.map(x => { return { ...x } }));
                  // setTotalItemCount(data.totalItem);
                })
                } else {
                  setManner(orderManners[0])
                axios.get(`/api/inventory/archive-products/${1}?pagesize=${selectedPageSize}&searchItem=${searchItem}&orderBy=${ord.column}&orderManner=${orderManners[0].value}`)
                .then(res => {
                  setTotalItemCount(res.data.totalItem)
                  setTotalPage(res.data.totalPage); 
                  setItems(res.data.data.map(x => { return { ...x } }));
                  // setTotalItemCount(data.totalItem);
                })
              }
            }
          }
        />}
        
        {/* Actual List of Categories */}
        {items.length==0 ? <h3>No Records Found</h3> : <ArchiveProductPageListing 
        // {...console.log(brand,"ooooooooooooooooooooooooooooooooooooooooo")}
          items={items}
          brand={brand}
          deleteModal={deleteModal}
          displayMode={displayMode}
          selectedItems={selectedItems}
          onCheckItem={onCheckItem}
          currentPage={currentPage}
          totalPage={totalPage}
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
          onChangePage={setCurrentPage}
          EditProduct={EditProduct}
          setchange={setchange}
          change={change}
        />}
        {/* Delete Modal */}
        <Modal isOpen={modalBasic} toggle={() => setModal(!modalBasic)}>
        <ModalHeader>
          <IntlMessages id="Delete" />
        </ModalHeader>
        <ModalBody>
         Are you sure you want to delete Product?
        </ModalBody>
        <ModalFooter>
          <Button onClick={deleteproduct} color="primary">
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

export default ArchiveProduct;
