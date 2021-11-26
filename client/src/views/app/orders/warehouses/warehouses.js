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
  Col,
} from 'reactstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import Select from 'react-select';
import WarehousesListHeading from './warehouse-list-heading';
import WarehousesPageListing from './warehouse-page-listing';
import WarehousesPageHeading from './warehouses-page-heading';
import { NotificationManager } from '../../../../components/common/react-notifications';

const orderOptions = [
  { label: 'Id', value: 'id' },
  { label: 'Name', value: 'name' },
  { label: 'Created By', value: 'userId' },
  { label: 'Created On', value: 'createdAt' },
];

const orderManners = [
  { value: 'ASC', label: 'Ascending' },
  { value: 'DESC', label: 'Descending' },
];

const Warehouses = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(15);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'id',
    label: 'Id',
  });
  const [modalBasic, setModalBasic] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [id, setId] = useState();
  const [orderBy, setOrderBy] = useState({ label: 'Id', value: 'id' });
  const [change, setChange] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [orderManner, setOrderManner] = useState({
    label: 'Ascending',
    value: 'ASC',
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `/api/orders/warehouses/${currentPage}?pageSize=${selectedPageSize}&orderBy=${orderBy.value}&orderManner=${orderManner.value}&searchItem=${searchItem}`
      );
      console.log(data);
      setItems(data.data);
      setTotalItemCount(data.totalCount);
      setTotalPage(data.totalPage);
      setSelectedItems([]);
      setIsLoaded(true);
    })();
  }, [change, currentPage, selectedPageSize, orderBy, orderManner, searchItem]);

  const getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  };
  //const pageSizes = [4, 8, 12, 20];
  const pageSizes = [15, 50, 100, 150, 200];

  // GET THE Category DETAILS AND OPEN THE EDIT MODAL
  const openModal = (e) => {};

  // EDIT WAREHOUSE
  const edit = (id) => {
    console.log('edit' + id);
    setModal(true);
  };

  const view = (id) => {
    console.log('view' + id);
  };

  const deleteObject = (id) => {
    console.log('delete' + id);
    setId(id);
    setModalBasic(true);
  };

  const deleteAll = async () => {
    try {
      await axios.post(`/api/orders/warehouses/delete?id=${selectedItems}`);
      setModalDelete(false);
      setChange(!change);
      return NotificationManager.success(
        'Deleted Successfully',
        'Success',
        3000
      );
    } catch (err) {
      console.log(err);
      return NotificationManager.error('Something went wrong', 'Error', 3000);
    }
  };

  const deleteObj = async () => {
    try {
      await axios.post(`/api/orders/warehouses/delete?id=${id}`);
      setModalBasic(false);
      setChange(!change);
      return NotificationManager.success(
        'Deleted Successfully',
        'Success',
        3000
      );
    } catch (err) {
      console.log(err);
      return NotificationManager.error('Something went wrong', 'Error', 3000);
    }
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
        <WarehousesPageHeading
          setModalDelete={setModalDelete}
          heading="Warehouses"
          addUrl="/app/orders/add-warehouse"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          setOrderBy={setOrderBy}
          setOrderManner={setOrderManner}
          setSearchItem={setSearchItem}
          orderBy={orderBy}
          orderManner={orderManner}
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
          orderManners={orderManners}
          setSearchItem={setSearchItem}
        />
        {items.length == 0 ? (
          ''
        ) : (
          <WarehousesListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}
            orderManners={orderManners}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            setOrderManner={setOrderManner}
            orderManner={orderManner}
          />
        )}

        {items.length == 0 ? (
          <h3>No Records found</h3>
        ) : (
          <WarehousesPageListing
            edit={edit}
            view={view}
            deleteObject={deleteObject}
            items={items}
            openModal={openModal}
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
          />
        )}
        {/* Delete Modal */}
        <Modal isOpen={modalBasic} toggle={() => setModal(!modalBasic)}>
          <ModalHeader>
            <IntlMessages id="Delete" />
          </ModalHeader>
          <ModalBody>Are you sure you want to delete Warehouse?</ModalBody>
          <ModalFooter>
            <Button onClick={deleteObj} color="primary">
              Confirm
            </Button>{' '}
            <Button color="secondary" onClick={() => setModalBasic(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        {/* Delete multiple Modal */}
        <Modal isOpen={modalDelete} toggle={() => setModalDelete(!modalDelete)}>
          <ModalHeader>
            <IntlMessages id="Delete" />
          </ModalHeader>
          <ModalBody>Are you sure you want to delete selected items?</ModalBody>
          <ModalFooter>
            <Button onClick={() => deleteAll()} color="primary">
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

export default Warehouses;
