import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { servicePath } from '../../../../../constants/defaultValues';
import CustomSelectInput from '../../../../../components/common/CustomSelectInput';
import ListPageHeading from '../../../../../containers/pages/ListPageHeading';
import useMousetrap from '../../../../../hooks/use-mousetrap';
import ProductPageListing from './ProductPageListing';
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
import { NotificationManager } from '../../../../../components/common/react-notifications';
import IntlMessages from '../../../../../helpers/IntlMessages';
import AddNewVariantModal from '../Variants/add-new-variant';
import VariantListHeading from './VariantListHeading';
import Select from 'react-select';

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
  { column: 'title', label: 'Variant Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

const SurveyApp = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(8);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Variant Name',
  });
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
  
  const deleteModal =(e)=>{
    setModalBasic(true)
  }
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    async function fetchData() {
      axios
        .get(
          `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${selectedOrderOption.column}&search=${search}`
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setTotalPage(data.totalPage);
          setItems(data.data.map(x=>{ return { ...x,img : x.img.replace("img/","img/products/")}}));
          setSelectedItems([]);
          setTotalItemCount(data.totalItem);
          setIsLoaded(true);
        });
    }
    fetchData();
  }, [selectedPageSize, currentPage, selectedOrderOption, search]);


  // GET THE VARIANT DETAILS AND OPEN THE EDIT MODAL
  const openModal = (e) => {
    axios.get("/api/user-details",{params:{id:e}}).then(res=>{
    console.log(res.data.data);
    setDetails(res.data.data)
    console.log(details);
    setModal(true)
    })
    
  };

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
        <ListPageHeading
          heading="Variants"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changeOrderBy={(column) => {
            setSelectedOrderOption(
              orderOptions.find((x) => x.column === column)
            );
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
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
        />
        <AddNewVariantModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
        />
        <VariantListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}
        />
        <ProductPageListing 
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
          onChangePage={setCurrentPage}
        />
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
          <ModalHeader>
            <IntlMessages id="Edit" />
          </ModalHeader>
          <ModalBody>
          <Row>
            <Col className="sm-6">
            <Label>
              <IntlMessages id="Variant Title" />
            </Label>
            <Input onChange={(e) => {
                    setformData({ ...formData, title: e.target.value })
                  }} />

            </Col>
            <Col className="sm-6">
            <Label>
              <IntlMessages id="No. of Stocks" />
            </Label>
            <Input type='number' onChange={(e) => {
                    setformData({ ...formData, stocks: e.target.value })
                  }}/>

            </Col>
            </Row>
            <Label className="mt-4">
              <IntlMessages id="Status" />
            </Label>
            
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              options={categories}
              onChange={(e) => {
                    setformData({ ...formData, status: e.value })
                    
                  }}
            />
            <Label className="mt-4">
              <IntlMessages id="Category" />
            </Label>
            
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name"
              options={categories}
              onChange={(e) => {
                    setformData({ ...formData, Category: e.value })
                    
                  }}
            />
        
          </ModalBody>
          <ModalFooter>
            <Button onClick={()=>edit(details.id)} color="primary">
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
         Are you sure you want to delete Variant?
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => alert('Deleted')} color="primary">
            Confirm
          </Button>{' '}
          <Button color="secondary" onClick={() => setModalBasic(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      </div>
    </>
  );
};

export default SurveyApp;
