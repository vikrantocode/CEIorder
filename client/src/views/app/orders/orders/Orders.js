import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { servicePath } from '../../../../constants/defaultValues';
import useMousetrap from '../../../../hooks/use-mousetrap';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import IntlMessages from '../../../../helpers/IntlMessages';
import OrdersListHeading from './OrdersListHeading';
import OrdersPageListing from './OrdersPageListing';
import OrdersPageHeading from './OrdersPageHeading';

const Orders = ({ match }) => {
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
  const [modal, setModal] = useState(false);
  const [change, setchange] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [importFile, setImportFile] = useState(null);
  const [importModal, setImportModal] = useState(false);
  const [importing, setImporting] = useState(false);

  const styles = {
    profileImg: {
      height: '3rem',
      width: '3rem',
      borderRadius: '50%',
    },
  };

  const deleteModal = (e) => {
    setOrderId(e);
    setModalBasic(true);
  };


  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    axios.get(`/api/orders/${currentPage}`).then(({ data }) => {
      console.log(data);
      setItems(data.orders);
      setTotalItemCount(data.count);
      setTotalPage(Math.ceil(data.count / selectedPageSize));
      setSelectedItems([]);
      setIsLoaded(true);
    });
  }, [change]);

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
    { column: 'category', label: 'Category Name' },
    { column: 'status', label: 'Status' },
  ];
  // const pageSizes = [4, 8, 12, 20];
  const pageSizes = [15, 50, 100, 150, 200];

  // GET THE Category DETAILS AND OPEN THE EDIT MODAL
  const openModal = (e) => {};

  const deleteOrder = async (e) => {
    axios
      .post('/api/orders/delete', null, { params: { id: orderId } })
      .then((res) => {
        setchange(!change);
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
  const edit = () => {};
  // DELETE MULTIPLE Orders
  const deleteSelectedOrders = async (e) => {
    axios
      .post('/api/orders/delete', null, { params: { id: selectedItems } })
      .then((res) => {
        setchange(!change);
        setModalDelete(false);
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

  // BULK STATUS CHANGE
  const deactivate = (e) => {};
  const activate = (e) => {};

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

  const changePage = (i, size) => {
    setCurrentPage(i);
    setSelectedPageSize(size);
  };
  const onchangePagesize = (size) => {
    setCurrentPage(1);
    setSelectedPageSize(size);
  };

  const importOrders = async () => {
    if (importFile) {
      // Update the formData object
      const data = new FormData();
      data.append('importFile', importFile);
      const config = {
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        // Details of the uploaded file
      for (let pair of data.entries()) {
        console.log(pair[0], ' : ', pair[1], "-------------pair-----------------------");
      }
      // Request made to the backend api
      // Send formData object 
      try {
        setImporting(true);
        const res = await axios.post(
          '/api/orders/import',
          data,
          config
        );
        if (res.status === 201) {
          setImporting(false);
          setchange(!change);
          setImportModal(false);
          NotificationManager.success(
            res.data.success,
            'Success',
            3000,
            null,
            null,
            ''
          );
        } else {
          setImporting(false);
          NotificationManager.error(
            res.data.error,
            'Error',
            3000,
            null,
            null,
            ''
          );
        }
        console.log(res);
      } catch (err) {
        console.log(err);
        setImporting(false);
        NotificationManager.error(
          `Something Wrong With CSV`,
          'Error',
          3000,
          null,
          null,
          ''
        );
      }
    } else {
      NotificationManager.error(
        `Select File to Import...`,
        'Error',
        3000,
        null,
        null,
        ''
      );
    }
  };

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
        <OrdersPageHeading
          setModalDelete={setModalDelete}
          heading="Orders"
          addUrl="/app/orders/add-order"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changeOrderBy={(column) => {
            setSelectedOrderOption(
              orderOptions.find((x) => x.column === column)
            );
          }}
          onchangepagesize={onchangePagesize}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          selectedOrderOption={selectedOrderOption}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          activate={activate}
          deactivate={deactivate}
          setImportFile={setImportFile}
          importModal={importModal}
          setImportModal={setImportModal}
          importOrders={importOrders}
          importing={importing}
        />
        {items.length == 0 ? (
          ''
        ) : (
          <OrdersListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}
          />
        )}

        {items.length == 0 ? (
          <h3>No Records found</h3>
        ) : (
          <OrdersPageListing
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
            setOrderId={setOrderId}
            pagesize={selectedPageSize}
            setModalBasic={setModalBasic}
          />
        )}

        {/* Edit Modal */}
      
        {/* Delete Modal */}
        <Modal isOpen={modalBasic} toggle={() => setModal(!modalBasic)}>
          <ModalHeader>
            <IntlMessages id="Delete" />
          </ModalHeader>
          <ModalBody>Are you sure you want to delete Order?</ModalBody>
          <ModalFooter>
            <Button onClick={deleteOrder} color="primary">
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
          <ModalBody>Are you sure you want to delete selected items?</ModalBody>
          <ModalFooter>
            <Button onClick={deleteSelectedOrders} color="primary">
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

export default Orders;
