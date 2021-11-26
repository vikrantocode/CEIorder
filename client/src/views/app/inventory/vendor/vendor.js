import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VendorListHeading from './VendorListHeading';
import VendorPageListing from './VendorPageListing';
import VendorPageHeading from './VendorPageHeading';
import AddNewVendor from './add-new-vendor';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import IntlMessages from '../../../../helpers/IntlMessages';

const orderManners = [
  { value: 'ASC', label: 'Ascending' },
  { value: 'DESC', label: 'Descending' },
];

const Vendor = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [vendorId, setVendorId] = useState('');
  const [modalBasic, setModalBasic] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [selectedItems, setSelectedItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [searchElement, setSearchElement] = useState('');
  const [order, setOrder] = useState({ column: 'id', label: 'Id' });
  const [manner, setManner] = useState({ value: 'ASC', label: 'Ascending' });
  const [items, setItems] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(15);
  const [importModal, setImportModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [change, setchange] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [formData, setformData] = React.useState({});
  const [details, setDetails] = useState({});
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    async function fetchData() {
      axios
        .get(
          `/api/inventory/get-vendors/1?pagesize=${selectedPageSize}&searchItem=${searchElement}&orderBy=${order.column}&orderManner=${manner.value}`
        )
        .then((res) => {
          let data = res.data;
          console.log(data);
          setTotalPage(data.totalPage);
          setItems(
            data.data.map((x) => {
              return { ...x };
            })
          );
          setSelectedItems([]);
          setTotalItemCount(data.all);
          setIsLoaded(true);
        });
    }
    fetchData();
    return () => {
      setIsLoaded(false);
    };
  }, [change]);

  const deleteModal = (e) => {
    setVendorId(e);
    setModalBasic(true);
  };

  // GET THE Vendor DETAILS AND OPEN THE EDIT MODAL
  const openModal = (e) => {
    axios.get('/api/inventory/vendors', { params: { id: e } }).then((res) => {
      if (res.data.data) {
        console.log(res.data.data);
        setDetails(res.data.data);
        setModal(true);
      }
    });
    setVendorId(e);
  };

  const getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  };

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
  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedVendorId = data.data;
    if (!selectedItems.includes(clickedVendorId)) {
      setSelectedItems([clickedVendorId]);
    }

    return true;
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

  const changePage = (i, size) => {
    setCurrentPage(i);
    axios
      .get(
        `/api/inventory/get-vendors/${i}?pagesize=${selectedPageSize}&searchItem=${searchElement}&orderBy=${order.column}&orderManner=${manner.value}`
      )
      .then((res) => {
        setTotalPage(res.data.totalPage);
        setItems(
          res.data.data.map((x) => {
            return { ...x };
          })
        );
        setSelectedItems([]);
        // setTotalItemCount(data.totalItem);
        setIsLoaded(true);
        //setSelectedPageSize(15);
      });
  };

  //DELETE CATEGORY HANDLER
  const deleteVendor = (e) => {
    axios
      .post('/api/inventory/destroy-vendors', null, {
        params: { id: vendorId },
      })
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

  const deleteMultipleModal = (e) => {
    setModalDelete(true);
  };
  // DELETE MULTIPLE vendor
  const deleteMultiple = () => {
    axios
      .post('/api/inventory/destroy-vendors', null, {
        params: { id: selectedItems },
      })
      .then((res) => {
        console.log(res.data);
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

  // edit vendor
  const edit = () => {
    axios
      .post('/api/inventory/edit-vendor', formData, {
        params: { id: vendorId },
      })
      .then((res) => {
        console.log(res);
        setchange(!change);
        setModal(false);
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

  const onchangePagesize = (size) => {
    setCurrentPage(1);
    console.log(selectedPageSize);
    axios
      .get(
        `/api/inventory/get-vendors/${1}?pagesize=${size}&orderBy=${
          order.column
        }&orderManner=${manner.value}`
      )
      .then((res) => {
        setTotalPage(res.data.totalPage);
        setItems(
          res.data.data.map((x) => {
            return { ...x };
          })
        );
        setSelectedItems([]);
        // setTotalItemCount(data.totalItem);
        setIsLoaded(true);
      });
  };

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;
  const pageSizes = [15, 50, 100, 150, 200];

  const heading = 'Vendors';
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <VendorPageHeading
          heading={heading}
          onchangepagesize={onchangePagesize}
          deleteMultipleModal={deleteMultipleModal}
          match={match}
          setImportModal={setImportModal}
          toggleModal={() => setModalOpen(!modalOpen)}
          totalItemCount={totalItemCount}
          startIndex={startIndex}
          endIndex={endIndex}
          pageSizes={pageSizes}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          handleChangeSelectAll={handleChangeSelectAll}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onSearchKey={async (e) => {
            if (e.key === 'Enter') {
              setSearchElement(e.target.value);
              axios
                .get(
                  `/api/inventory/get-vendors/${1}?pagesize=${selectedPageSize}&searchItem=${
                    e.target.value
                  }&orderBy=${order.column}&orderManner=${manner.value}`
                )
                .then((res) => {
                  setTotalItemCount(res.data.all);
                  setTotalPage(res.data.totalPage);
                  setItems(
                    res.data.data.map((x) => {
                      return { ...x };
                    })
                  );
                  // setTotalItemCount(data.totalItem);
                });
            }
          }}
          setchange={setchange}
          change={change}
          order={order}
          manner={manner}
          changeOrderBy={async (ord) => {
            setOrder(ord);
            axios
              .get(
                `/api/inventory/get-vendors/${1}?pagesize=${selectedPageSize}&searchItem=${searchElement}&orderBy=${
                  ord.column
                }&orderManner=${manner.value}`
              )
              .then((res) => {
                setTotalItemCount(res.data.all);
                setTotalPage(res.data.totalPage);
                setItems(
                  res.data.data.map((x) => {
                    return { ...x };
                  })
                );
                // setTotalItemCount(data.totalItem);
              });
          }}
          changeOrderManner={async (man) => {
            setManner(man);
            axios
              .get(
                `/api/inventory/get-vendors/${1}?pagesize=${selectedPageSize}&searchItem=${searchElement}&orderBy=${
                  order.column
                }&orderManner=${man.value}`
              )
              .then((res) => {
                setTotalItemCount(res.data.all);
                setTotalPage(res.data.totalPage);
                setItems(
                  res.data.data.map((x) => {
                    return { ...x };
                  })
                );
                // setTotalItemCount(data.totalItem);
              });
          }}
        />
        <AddNewVendor
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          //categories={categories}
          change={change}
          setchange={setchange}
        />
        {items.length == 0 ? (
          ''
        ) : (
          <VendorListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}
            order={order}
            manner={manner}
            changeOrderBy={async (ord) => {
              setOrder(ord);
              if (order.column === ord.column) {
                const ind = !orderManners.findIndex(
                  (man) => man.value === manner.value
                );
                setManner(orderManners[ind ? 1 : 0]);
                axios
                  .get(
                    `/api/inventory/get-vendors/${1}?pagesize=${selectedPageSize}&searchItem=${searchElement}&orderBy=${
                      ord.column
                    }&orderManner=${orderManners[ind ? 1 : 0].value}`
                  )
                  .then((res) => {
                    setTotalItemCount(res.data.all);
                    setTotalPage(res.data.totalPage);
                    setItems(
                      res.data.data.map((x) => {
                        return { ...x };
                      })
                    );
                    // setTotalItemCount(data.totalItem);
                  });
              } else {
                setManner(orderManners[0]);
                axios
                  .get(
                    `/api/inventory/get-vendors/${1}?pagesize=${selectedPageSize}&searchItem=${searchElement}&orderBy=${
                      ord.column
                    }&orderManner=${orderManners[0].value}`
                  )
                  .then((res) => {
                    setTotalItemCount(res.data.all);
                    setTotalPage(res.data.totalPage);
                    setItems(
                      res.data.data.map((x) => {
                        return { ...x };
                      })
                    );
                    // setTotalItemCount(data.totalItem);
                  });
              }
            }}
          />
        )}

        {items.length == 0 ? (
          <h3>No Records found</h3>
        ) : (
          <VendorPageListing
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
            setVendorId={setVendorId}
            pagesize={selectedPageSize}
            match={match}
            searchElement={searchElement}
          />
        )}

        {/* Edit Modal */}
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
          <ModalHeader>
            <IntlMessages id="Edit" />
          </ModalHeader>
          <ModalBody>
            <div className="mt-3">
              <Label>
                <IntlMessages id="Vendor Abbreviation" />
              </Label>
              <Input
                defaultValue={details.vendorAbbreviation}
                onChange={(e) => {
                  setformData({
                    ...formData,
                    vendorAbbreviation: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mt-3">
              <Label>
                <IntlMessages id="Vendor Short Name" />
              </Label>
              <Input
                defaultValue={details.vendorShortName}
                onChange={(e) => {
                  setformData({ ...formData, vendorShortName: e.target.value });
                }}
              />
            </div>
            <div className="mt-3">
              <Label>
                <IntlMessages id="Vendor Pricer Print Name" />
              </Label>
              <Input
                defaultValue={details.vendorPricerPrintName}
                onChange={(e) => {
                  setformData({
                    ...formData,
                    vendorPricerPrintName: e.target.value,
                  });
                }}
              />
            </div>
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
          <ModalBody>Are you sure you want to delete Vendor?</ModalBody>
          <ModalFooter>
            <Button onClick={deleteVendor} color="primary">
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

export default Vendor;
