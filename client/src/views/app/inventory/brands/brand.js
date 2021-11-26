import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { servicePath } from '../../../../constants/defaultValues';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
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
import Select from 'react-select';
import BrandPageHeading from './brandPageHeading';
import BrandListHeading from './BrandListHeading';
import BrandPageListing from './BrandPageListing';
import AddNewBrand from './add-new-brand';

const orderOptions = [
  { column: 'id', label: 'Id' },
  { column: 'brandShortName', label: 'Short Name' },
  { column: 'brandLongName', label: 'Long Name' },
  { column: 'productscount', label: 'Products Count' },
];

const orderManners = [
  { value: 'ASC', label: 'Ascending' },
  { value: 'DESC', label: 'Descending' },
];

const styles = {
  profileImg: {
    height: '3rem',
    width: '3rem',
    borderRadius: '50%',
  },
};
const imageServer = 'https://d3o5w1w6u67fah.cloudfront.net/';

const Brand = ({ match }) => {
  const [selectedPageSize, setSelectedPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [brandId, setBrandId] = useState('');
  const [lastChecked, setLastChecked] = useState(null);
  const [modalBasic, setModalBasic] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [totalPage, setTotalPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [formData, setformData] = React.useState({});
  const [details, setDetails] = useState({});
  const [modalDelete, setModalDelete] = useState(false);
  const [change, setchange] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;
  const pageSizes = [15, 50, 100, 150, 200];
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [brandImagedata, setBrandImagedata] = useState(null);
  const [brandImage, setBrandImage] = useState(null);
  const [delImage, setdelImage] = useState(null);
  const [multidelImage, setMultidelImage] = useState([]);
  const [activeId, setActiveId] = useState(1);
  const [order, setOrder] = useState({ column: 'id', label: 'Id' });
  const [manner, setManner] = useState({ value: 'ASC', label: 'Ascending' });
  const [searchItem, setSearchItem] = useState('');
  const [parentbrands, setParentbrands] = useState([]);
  const [selectedparentbrands, setSelectedParentbrands] = useState({});


  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
        setMultidelImage([]);
        console.log(multidelImage);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
      setMultidelImage(items.map((x) => x.imageNameBrandLogo));
      console.log(multidelImage);
    }
    document.activeElement.blur();
    return false;
  };

  const deleteModal = (e, img) => {
    setBrandId(e);
    setdelImage(img);
    setModalBasic(true);
  };

  const getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  };

  useEffect(() => {
    async function fetchData() {
      axios
        .get(`/api/inventory/get-all-brands/1?pagesize=${selectedPageSize}`)
        .then((res) => {
          let data = res.data;
          setTotalPage(data.totalPage);
          setItems(
            data.data.map((x) => {
              return { ...x };
            })
          );
          setSelectedItems([]);
          setTotalItemCount(data.all);
          setIsLoaded(true);
          console.log(data);
        });
    }
    fetchData();
    return () => {
      setIsLoaded(false);
    };
  }, [change, selectedPageSize]);

// Get All Brands for parent prand 
  useEffect(() => {
    axios.get('/api/inventory/get-brand').then((res) => {
      console.log(res.data.data);
      var brandList = [];
      var singleBrand;
      for (var i of res.data.data) {
        
          singleBrand = {
            label: i.brandShortName,
            value: i.brandShortName,
            key: i.id,
          };
          brandList.push(singleBrand);
      }
      setParentbrands(brandList);
    });
  }, []);

  // GET THE Brand DETAILS AND OPEN THE EDIT MODAL
  const openModal = (e) => {
    setActiveId(e);
    setBrandImage(null);
    axios.get('/api/inventory/getBrand', { params: { id: e } }).then((res) => {
      if (res.data.data) {
        console.log(res.data.data[0]);
        setDetails(res.data.data[0]);
        setModal(true);
        setSelectedParentbrands(
          parentbrands.find((e) => e.key == res.data.data.parentId)
        );
      }
    });
    setBrandId(e);
  };

  const changePage = (i, size) => {
    setCurrentPage(i);
    axios
      .get(`/api/inventory/get-all-brands/${i}?pagesize=${selectedPageSize}`)
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

  //DELETE BRAND HANDLER
  const deleteBrand = async (e) => {
    var formdata = new FormData();
    await axios.post(`/delete?path=${delImage}`, formdata);
    axios
      .post('/api/inventory/deleteBrand', null, { params: { id: brandId } })
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
  // DELETE MULTIPLE vendor  multidelImage

  const deleteMultiple = async () => {
    console.log(multidelImage);
    var formdata = new FormData();
    formdata.append('oldimg', multidelImage);
    formdata.append('img', 'multidelImage');

    await axios.post(`/delete`, { oldimg: multidelImage });

    axios
      .post('/api/inventory/deleteBrand', null, {
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

  // edit Brand 
  const edit = async () => {
    try {
      if (brandImagedata) {
        let form = new FormData();
        form.append('imageNameBrandLogo', brandImagedata);   
        const fields = Object.keys(formData);
        for (let field of fields) form.append([field], formData[field]);
        for (let item of form.entries()) {
          console.log(item);
        }
        const res = await axios.post(
          `/api/inventory/editBrand/${activeId}`,
          form
        );
        console.log(res);
        NotificationManager.success(res.data.message, 'Success', 3000);
      } else {
        //? Directly Make Call.
        const res = await axios.post(
          `/api/inventory/editBrand/${activeId}`,
          formData
        );
        console.log(res);
        NotificationManager.success(res.data.message, 'Success', 3000);

      }
      
      setModal(false);
      setchange(!change);
    } catch (error) {
      console.log(error);
      NotificationManager.error('Something Went Wrong!', 'Error', 3000);
    }
  };
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setBrandImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setBrandImagedata(e.target.files[0]);
    }
  };

  const onCheckItem = (event, id, img) => {
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

    let selectedimgList = [...multidelImage];
    if (selectedimgList.includes(img)) {
      selectedimgList = selectedimgList.filter((x) => x !== img);
    } else {
      selectedimgList.push(img);
    }
    setMultidelImage(selectedimgList);
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
    const clickedBrandId = data.data;
    console.log(clickedBrandId);
    if (!selectedItems.includes(clickedBrandId)) {
      setSelectedItems([clickedBrandId]);
    }

    return true;
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <BrandPageHeading
          match={match}
          pageSizes={pageSizes}
          startIndex={startIndex}
          endIndex={endIndex}
          pageSizes={pageSizes}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          handleChangeSelectAll={handleChangeSelectAll}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          deleteMultipleModal={deleteMultipleModal}
          toggleModal={() => setModalOpen(!modalOpen)}
          totalItemCount={totalItemCount}
          orderOptions={orderOptions}
          orderManners={orderManners}
          onSearchKey={(e) => {
            console.log(e.target);
            if (e.key === 'Enter') {
              let searchs = encodeURIComponent(
                e.target.value.toLowerCase()
              ).replace(/%20/g, '+');
              axios
                .get('/api/inventory/get-all-brands/1', {
                  params: { search: searchs },
                })
                .then((res) => {
                  setItems(
                    res.data.data.map((x) => {
                      return { ...x };
                    })
                  );
                  setSelectedItems([]);
                  setTotalPage(res.data.totalPage);
                  setTotalItemCount(res.data.all);
                  setIsLoaded(true);
                });
            }
          }}
          changeOrderBy={async (ord) => {
            setOrder(ord);
            axios
              .get(
                `/api/inventory/get-all-brands/${1}?pagesize=${selectedPageSize}&search=${searchItem}&orderBy=${
                  ord.column
                }&orderManner=${manner.value}`
              )
              .then((res) => {
                setTotalItemCount(res.data.totalItem);
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
                `/api/inventory/get-all-brands/${1}?pagesize=${selectedPageSize}&search=${searchItem}&orderBy=${
                  order.column
                }&orderManner=${man.value}`
              )
              .then((res) => {
                setTotalItemCount(res.data.totalItem);
                setTotalPage(res.data.totalPage);
                setItems(
                  res.data.data.map((x) => {
                    return { ...x };
                  })
                );
                // setTotalItemCount(data.totalItem);
              });
          }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          order={order}
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
              axios
                .get(
                  `/api/inventory/get-all-brands/1?pagesize=${selectedPageSize}&search=${e.target.value}&orderBy=${order.column}&orderManner=${manner.value}`
                )
                .then((res) => {
                  setTotalItemCount(res.data.totalItem);
                  setTotalPage(res.data.totalPage);
                  setItems(
                    res.data.data.map((x) => {
                      return { ...x };
                    })
                  );
                });
            }
          }}
          order={order}
          manner={manner}
        />

        <AddNewBrand
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          change={change}
          setchange={setchange}
        />

        {items.length == 0 ? (
          ''
        ) : (
          <BrandListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}
            changeOrderBy={async (ord) => {
              let man;
              if (order.column === ord.column) {
                if (manner.value == 'ASC') {
                  setManner({ label: 'Descending', value: 'DESC' });
                  man = 'DESC';
                } else {
                  setManner({ label: 'Ascending', value: 'ASC' });
                  man = 'ASC';
                }
              } else man = manner.value;
              setOrder(ord);
              axios
                .get(
                  `/api/inventory/get-all-brands/${1}?pagesize=${selectedPageSize}&search=${searchItem}&orderBy=${
                    ord.column
                  }&orderManner=${man}`
                )
                .then((res) => {
                  setTotalItemCount(res.data.totalItem);
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
                  `/api/inventory/get-all-brands/${1}?pagesize=${selectedPageSize}&search=${searchItem}&orderBy=${
                    order.column
                  }&orderManner=${man.value}`
                )
                .then((res) => {
                  setTotalItemCount(res.data.totalItem);
                  setTotalPage(res.data.totalPage);
                  setItems(
                    res.data.data.map((x) => {
                      return { ...x };
                    })
                  );
                  // setTotalItemCount(data.totalItem);
                });
            }}
            order={order}
            manner={manner}
          />
        )}

        {items.length == 0 ? (
          <h3>No Records found</h3>
        ) : (
          <BrandPageListing
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
            setBrandId={setBrandId}
            pagesize={selectedPageSize}
          />
        )}

        {/* Edit Modal */}
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
          <ModalHeader>
            <IntlMessages id="Edit" />
          </ModalHeader>
          <ModalBody>
            <div className="d-flex align-items-center justify-content-center flex-column p-3">
              {brandImage ? (
                <img style={styles.profileImg} src={brandImage} alt="" />
              ) : (
                <img
                  style={styles.profileImg}
                  src={`${imageServer}productimages/${details.imageNameBrandLogo}`}
                  alt=""
                />
              )}
              <Label
                className="font-weight-bold edit-profile"
                htmlFor="imageNameItem"
              >
                <IntlMessages id="Change Picture" />
              </Label>
              <Input
                accept="image/*"
                onChange={onChangePicture}
                style={{ display: 'none' }}
                type="file"
                name="imageNameItem"
                id="imageNameItem"
              />
            </div>

            <div className="mt-3">
              <Label>
                <IntlMessages id="Brand Short Name" />
              </Label>
              <Input
                defaultValue={details.brandShortName}
                onChange={(e) => {
                  setformData({
                    ...formData,
                    brandShortName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="mt-3">
              <Label>
                <IntlMessages id="Brand Long Name" />
              </Label>
              <Input
                defaultValue={details.brandLongName}
                onChange={(e) => {
                  setformData({ ...formData, brandLongName: e.target.value });
                }}
              />
            </div>
            <div className="mt-3">
          <Label>
            <IntlMessages id="Parent Brand" />
          </Label>

          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            options={parentbrands}
            value={selectedparentbrands}
            onChange={(e) => {
              setformData({ ...formData, parentId: e.key });
            }}
          />
        </div>

          </ModalBody>
          <ModalFooter>
            <Button onClick={edit} color="primary">
              Save Changes
            </Button>{' '}
            <Button
              color="secondary"
              onClick={() => {
                setBrandImage(null);
                setModal(false);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* Delete Modal */}
        <Modal isOpen={modalBasic} toggle={() => setModal(!modalBasic)}>
          <ModalHeader>
            <IntlMessages id="Delete" />
          </ModalHeader>
          <ModalBody>Are you sure you want to delete Brand?</ModalBody>
          <ModalFooter>
            <Button onClick={deleteBrand} color="primary">
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
export default Brand;
