import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CustomInput } from 'reactstrap';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from '../../../components/common/CustomBootstrap'
import { servicePath } from "../../../constants/defaultValues";
import ListPageHeading from '../../../containers/pages/ListPageHeading';
import AddNewModal from '../../../containers/pages/AddNewModal';
import ListPageListing from '../../../containers/pages/ListPageListing';
import useMousetrap from '../../../hooks/use-mousetrap';
import ListHeadings from "../../../containers/pages/ListHeadings"
import { FaEthereum } from 'react-icons/fa';
const getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  };
  
//   const apiUrl = `${servicePath}/cakes/paging`;
  
  const orderOptions = [
    { column: 'firstName', label: 'Name' },
    
  ];
  const pageSizes = [4, 8, 12, 20];
  
  const categories = [
    { label: 'User', value: 'user', key: 0 },
    { label: 'Admin', value: 'admin', key: 1 },
    { label: 'Magento User', value: 'magentoUser', key: 2 },
  ];
const ManageUsers = ({ intl, match }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [displayMode, setDisplayMode] = useState('list');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPageSize, setSelectedPageSize] = useState(8);
    const [selectedOrderOption, setSelectedOrderOption] = useState({
      column: 'title',
      label: 'Product Name',
    });
    const [change,setchange] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [search, setSearch] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [items, setItems] = useState([]);
    const [lastChecked, setLastChecked] = useState(null);
    const [sortby,setsortby] = useState("")
  
    useEffect(() => {
      setCurrentPage(1);
    }, [selectedPageSize, selectedOrderOption]);
  
    useEffect(() => {
      async function fetchData() {
        await axios
          .get(
           "/api/users/1"
          )
          .then((res) => {
            // console.log(res.data)
            return res.data
          })
          .then((data) => {
            setTotalPage(data.totalPage);
            setItems(data.data.map(x=>{ return { ...x}}));
            setSelectedItems([]);
            // setTotalItemCount(data.totalItem);
            setIsLoaded(true);
          });
      }
      fetchData();
    }, [change]);
   
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
    const changePage=(i)=>{
        setCurrentPage(i)
        axios.get(`/api/users/${i}`).then(res=>{
          setTotalPage(res.data.totalPage);
            setItems(res.data.data.map(x=>{ return { ...x}}));
            setSelectedItems([]);
            // setTotalItemCount(data.totalItem);
            setIsLoaded(true);
        })
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
  
    const onContextMenuClick = (e, data) => {
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
          change={change}
          setchange={setchange}
            heading="Users"
            displayMode={displayMode}
            changeDisplayMode={setDisplayMode}
            handleChangeSelectAll={handleChangeSelectAll}
            changeOrderBy={(column) => {
              setSelectedOrderOption(
                orderOptions.find((x) => x.column === column)
              );
              setsortby(column)
              axios.get("/api/users/1",{params:{sortby:column}}).then(res=>{
                setItems(res.data.data.map(x=>{ return { ...x}}));
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
                axios.get("/api/users/1",{params:{search:e.target.value.toLowerCase()}}).then((res)=>{
                  setItems(res.data.data.map(x=>{ return { ...x}}));
                  setSelectedItems([]);
                  // setTotalItemCount(res.data.totalItem);
                  setIsLoaded(true);
                })
              }
            }}
            orderOptions={orderOptions}
            pageSizes={pageSizes}
            toggleModal={() => setModalOpen(!modalOpen)}
            selectedItems={selectedItems}
          />
          <AddNewModal
          change={change}
          setchange={setchange}
            modalOpen={modalOpen}
            toggleModal={() => setModalOpen(!modalOpen)}
            categories={categories}
          />
         {items.length==0 ? "" :<ListHeadings
         change={change}
          setchange={setchange}
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}

         /> }
         {items.length==0 ? <h3>No Records Found</h3> :  <ListPageListing
          change={change}
          setchange={setchange}
            items={items}
            setItems ={setItems}
            displayMode={displayMode}
            selectedItems={selectedItems}
            onCheckItem={onCheckItem}
            currentPage={currentPage}
            totalPage={totalPage}
            onContextMenuClick={onContextMenuClick}
            onContextMenu={onContextMenu}
            onChangePage={changePage}
            categories={categories}
            // deleteUser={deleteUser}
          />}
         
        </div>
      </>
    );
};
export default ManageUsers;
