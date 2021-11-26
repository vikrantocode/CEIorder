import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  CustomInput,
} from 'reactstrap';
import axios from 'axios'
import {Link} from 'react-router-dom'
import useMousetrap from '../../../../hooks/use-mousetrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import CustomersListHeading from './CustomersListHeading';
import CustomersPageListing from './CustomersPageListing';
import CustomersPageHeading from './CustomersPageHeading';
import sample from '../../inventory/common/sample.csv';
import { NotificationManager } from '../../../../components/common/react-notifications';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const orderOptions = [
  { label : 'Id', column : 'id'},
  { label : 'Name', column : 'firstName'},
  { label : 'Email', column : 'email'},
  { label : 'Orders Count', column : 'orderCount'},
];

const mannerOptions = [
  { label : 'Ascending', value : 'ASC'},
  { label : 'Descending', value : 'DESC'}
]

//const pageSizes = [4, 8, 12, 20];
const pageSizes = [15, 50, 100, 150, 200];

const Customers = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(15);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Category Name',
  });
  const [modalBasic, setModalBasic] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [modal, setModal] = useState(false)
  const [change, setchange] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [customerId, setCustomerId] = useState(0)
  const [importing, setImporting] = useState(false)
  const [importModal, setImportModal] = useState(false)
  const [importFile, setImportFile] = useState(null)
  const [searchItem, setSearchItem] = useState('')
  const [orderBy, setOrderBy] = useState({ label : 'Id', column : 'id'});
  const [orderManner, setOrderManner] = useState({ label : 'Ascending', value : 'ASC'});

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  const getCustomers = async () => {
    try {
      const {data} = await axios.get(`/api/customers/${currentPage}?pageSize=${selectedPageSize}&orderBy=${orderBy.column}&searchItem=${searchItem}&orderManner=${orderManner.value}`)
      console.log(data);
      setItems(data.customers)
      setTotalItemCount(data.count)
      setTotalPage(Math.ceil((data.count)/ selectedPageSize))
      setSelectedItems([]);
      setIsLoaded(true);
      NotificationManager.success(`Customer Details Fetched!!!`, 'Success', 3000)  
    } catch (error) {
      console.log(error);
      NotificationManager.error(`Something Went Wrong!!!`, 'Error', 3000)    
      setIsLoaded(true);  
    }
  }

  useEffect(() => {
    (async () => await getCustomers())()
  }, [change]);
  
  // Function to call for importing Customers
  const importCustomers = async () => {
    if(!importFile){
      return NotificationManager.error(
        `Select File to Import...`,
        'Error',
        3000,
        null,
        null,
        ''
      );
    }
    const data = new FormData();
    // Update the formData object
    data.append(
      "importFile",
      importFile
    );
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    for(let pair of data.entries()){
      console.log(pair[0], " : " ,pair[1])
    }
    // Request made to the backend api
    // Send formData object
    try{
        setImporting(true)
        const res = await axios.post('/api/customers/import', data, config)
        setImporting(false)
        setchange(!change)
        setImportModal(false)
        NotificationManager.success(
          res.data,
          'Success',
          3000,
          null,
          null,
          ''
        );
      } catch(err) {
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

  //DELETE CUSTOMER HANDLER
  const deleteModal = (e) => {
    setCustomerId(e)
    setModalBasic(true)
  }

  // DELETE CUSTOMER API CALL
  const deleteCustomer = async () => {
    try {
      await axios.post(`/api/customers/delete?id=${customerId}`)
      setchange(!change)
      setModalBasic(false)
      NotificationManager.success('Customer Deleted Successfully.','Success', 3000)
    } catch (error) {
      NotificationManager.error('Something Went Wrong!!!','Error', 3000)
    }
  }

  // DELETE MULTIPLE CUSTOMERS
  const deleteMultiple = async () => {
    console.log(selectedItems);
    try {
      await axios.post("/api/customers/delete", null, { params: { id: selectedItems } })
      setchange(!change)
      setModalDelete(false)
      NotificationManager.success(
        'Customer(s) Deleted Successfully.',
        'Success',
        3000,
        null,
        null,
        ''
      );
    } catch (error) {
      console.log(error);
      setModalDelete(false)
      NotificationManager.error(
        'Something Went Wrong!!!',
        'Error',
        3000,
        null,
        null,
        ''
      );
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
    axios.get(`/api/customers/${i}?pageSize=${selectedPageSize}&orderBy=${orderBy.column}&orderManner=${orderManner.value}&searchItem=${searchItem}`).then(res => {
      setItems(res.data.customers)
      setTotalItemCount(res.data.count)
      setTotalPage(Math.ceil((res.data.count)/ selectedPageSize))
      setSelectedItems([]);
      setIsLoaded(true);
    })
  }

  const onchangePagesize = (size) => {
    setCurrentPage(1)
    setSelectedPageSize(size)
    axios.get(`/api/customers/${1}?pageSize=${size}&orderBy=${orderBy.column}&orderManner=${orderManner.value}&searchItem=${searchItem}`).then(res => {
      setItems(res.data.customers)
      setTotalItemCount(res.data.count)
      setTotalPage(Math.ceil((res.data.count)/ size))
      setSelectedItems([]);
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
          <CustomersPageHeading
          setModalDelete={setModalDelete}
          heading="Customers"
            addUrl='/app/customers/add-customer'
            displayMode={displayMode}
            changeDisplayMode={setDisplayMode}
            handleChangeSelectAll={handleChangeSelectAll}
            orderBy = { orderBy }
            orderManner={orderManner}
            changeOrderBy={async (ord) => {
              setOrderBy(ord)
              setCurrentPage(1)
              axios.get(`/api/customers/${1}?pageSize=${selectedPageSize}&searchItem=${searchItem}&orderBy=${ord.column}&orderManner=${orderManner.value}`)
                .then(res => {
                  setTotalItemCount(res.data.count)
                  setTotalPage(Math.ceil(res.data.count / selectedPageSize));
                  setItems(res.data.customers);
                  // setTotalItemCount(data.totalItem);
                })
              }
            }
            changeOrderManner={async (mann) => {
              setOrderManner(mann)
              setCurrentPage(1)
              axios.get(`/api/customers/${1}?pageSize=${selectedPageSize}&searchItem=${searchItem}&orderBy=${orderBy.column}&orderManner=${mann.value}`)
                .then(res => {
                  setTotalItemCount(res.data.count)
                  setTotalPage(Math.ceil(res.data.count / selectedPageSize));
                  setItems(res.data.customers);
                  // setTotalItemCount(data.totalItem);
                })
              }
            }
            onSearchKey={ async (e) => {
              console.log(e.key === 'Enter');
              if (e.key === 'Enter') {
                setSearchItem(e.target.value);
                axios.get(`/api/customers/${1}?pageSize=${selectedPageSize}&searchItem=${e.target.value}&orderBy=${orderBy.column}&orderManner=${orderManner.value}`)
                .then(res => {
                    setTotalItemCount(res.data.count)
                    setTotalPage(Math.ceil(res.data.count / selectedPageSize));
                    setItems(res.data.customers);
                  // setTotalItemCount(data.totalItem);
                  })
                  .catch ( err => {
                    console.log(JSON.stringify(err,null,4));
                    if(err.message.slice(err.message.indexOf('status code ')) === 'status code 404')
                    return NotificationManager.info('No Search Result Found.','Not Found', 3000)
                    else
                    NotificationManager.info('Something Went Wrong!!!')
                  })
                }
              }
            }
            onchangepagesize={onchangePagesize}
            selectedPageSize={selectedPageSize}
            totalItemCount={totalItemCount}
            selectedOrderOption={selectedOrderOption}
            match={match}
            startIndex={startIndex}
            endIndex={endIndex}
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            itemsLength={items ? items.length : 0}
            orderOptions={orderOptions}
            mannerOptions={mannerOptions}
            pageSizes={pageSizes}
            toggleModal={() => setModalOpen(!modalOpen)}
            setImportModal = {setImportModal}
          />
          {items.length == 0 ? "" : <CustomersListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}
            orderManner={orderManner}
            orderBy={orderBy}
            changeOrderBy={async (ord) => {
              setOrderBy(ord)
              setCurrentPage(1)
              if(orderBy.column === ord.column){
                const ind = !(mannerOptions.findIndex(man => man.value===orderManner.value))
                setOrderManner(mannerOptions[ind ? 1 : 0])
                axios.get(`/api/customers/${1}?pagesize=${selectedPageSize}&searchItem=${searchItem}&orderBy=${ord.column}&orderManner=${mannerOptions[ind ? 1 : 0].value}`)
                  .then(res => {
                    setTotalItemCount(res.data.count)
                    setTotalPage(Math.ceil(res.data.count / selectedPageSize));
                    setItems(res.data.customers);
                    // setTotalItemCount(data.totalItem);
                  })
                } else {
                  setOrderManner(mannerOptions[0])
                axios.get(`/api/customers/${1}?pagesize=${selectedPageSize}&searchItem=${searchItem}&orderBy=${ord.column}&orderManner=${mannerOptions[0].value}`)
                .then(res => {
                  setTotalItemCount(res.data.count)
                    setTotalPage(Math.ceil(res.data.count / selectedPageSize));
                    setItems(res.data.customers);
                  // setTotalItemCount(data.totalItem);
                })
              }
              }
            }
          />}

          {items.length == 0 ? <h3>No Records found</h3> : <CustomersPageListing
            items={items}
            displayMode={displayMode}
            selectedItems={selectedItems}
            onCheckItem={onCheckItem}
            currentPage={currentPage}
            totalPage={totalPage}
            onContextMenuClick={onContextMenuClick}
            onContextMenu={onContextMenu}
            onChangePage={changePage}
            pagesize={selectedPageSize}
            setModalBasic={setModalBasic}
            deleteModal = {deleteModal}
          />}

          {/* Delete Modal */}
          <Modal isOpen={modalBasic} toggle={() => setModal(!modalBasic)}>
            <ModalHeader>
              <IntlMessages id="Delete" />
            </ModalHeader>
            <ModalBody>
              Are you sure you want to delete Customer?
        </ModalBody>
            <ModalFooter>
              <Button onClick={deleteCustomer} color="primary">
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
          {/* Customer Import Modal */}
        <Modal isOpen={importModal} toggle={() => setImportModal(!importModal)}>
        <ModalHeader>
          <IntlMessages id="Add Customers by importing CSV file." />
        </ModalHeader>
        <ModalBody>
          <Label>
            <IntlMessages id="Select csv File to Import" />
          </Label>
          <CustomInput
            type="file"
            accept=".csv"
            onChange={ event => { setImportFile(event.target.files[0]) } }
            id="exampleCustomFileBrowser3"
            name="customFile"
          />
          <div className="col-md-12 mt-3 text-right">
            <Link className="h6 text-primary" to={sample} target="_blank" download="sample.csv">Sample CSV <i className="iconsminds-data-download"></i></Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <div>
          {!importing ?
            <div>
              <Button onClick={importCustomers} color="primary">
                Import
              </Button>{' '}
              <Button
                color="secondary"
                onClick={() => setImportModal(false)}
              >
                Cancel
              </Button>
            </div> : 
            <>
              <h4>Importing!!!</h4>
              <h4>Please Wait...</h4>
            </>
          }
          </div>
        </ModalFooter>
      </Modal>
      </>
    );
};

export default Customers;
