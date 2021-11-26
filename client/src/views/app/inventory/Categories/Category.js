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
import { NotificationManager } from '../../../../components/common/react-notifications';
import IntlMessages from '../../../../helpers/IntlMessages';
import Select from 'react-select';
import InventoryPageHeading from '../common/InventoryPageHeading';
import AddNewCategoryModal from './add-new-category';
import CategoryListHeading from './CategoryListHeading';
import CategoryPageListing from './CategoryPageListing';
import CategoryPageHeadings from './CategoryPageHeadings';

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
  { value: 'ASC', label: 'Ascending' },
  { value: 'DESC', label: 'Descending' },
];
//const pageSizes = [4, 8, 12, 20];
const pageSizes = [15, 50, 100, 150, 200];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

const Category = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(15);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Category Name',
  });
  const [formData, setformData] = React.useState({});
  const [modalBasic, setModalBasic] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState({});
  const [change, setchange] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [modalDelete, setModalDelete] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [importing, setImporting] = useState(false);
  const [data, setData] = useState(null);
  const [parentcategories, setParentcategories] = useState([]);
  const [selectedparentcategories, setSelectedParentcategories] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [categorysearch, setCategorysearch] = useState([]);
  const [categoryImage, setCategoryImage] = useState(null);
  const [categoryImagedata, setCategoryImagedata] = useState(null);
  const [orderBy, setOrderBy] = useState({ column: 'id', label: 'Id' });
  const [orderManner, setOrderManner] = useState({
    value: 'ASC',
    label: 'Ascending',
  });

  const allcat = [];
  const baseimageurl = 'https://cdn.linqusacorp.com';

  const styles = {
    profileImg: {
      height: '3rem',
      width: '3rem',
      borderRadius: '50%',
    },
  };

  const handleUpload = async () => {
    if (!data)
      return NotificationManager.info(
        'Select CSV file first',
        'Warning',
        3000,
        null,
        null,
        ''
      );
    setImporting(true);
    console.log(data);
    try {
      const res = await axios.post('/api/inventory/import-category', data);
      console.log(res);
      NotificationManager.success(
        res.data.success,
        'Success',
        3000,
        null,
        null,
        ''
      );
      setchange(!change);
      setImportModal(false);
      setImporting(false);
    } catch (err) {
      console.log(err);
      NotificationManager.error(
        'Something wrong with CSV',
        'Error',
        3000,
        null,
        null,
        ''
      );
      setImporting(false);
    }
  };

  const deleteMultipleModal = (e) => {
    setModalDelete(true);
  };

  const deleteModal = (e) => {
    setCategoryId(e);
    setModalBasic(true);
  };

  useEffect(() => {
    setCategoryImage(null);
  }, [modal]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    async function fetchData() {
      axios
        .get(
          `/api/inventory/get-categories/1?pageSize=${selectedPageSize}&orderBy=${orderBy.column}&orderManner=${orderManner.value}`
        )
        .then((res) => {
          //console.log(res.data)
          return res.data;
        })
        .then((data) => {
          console.log(data);
          setTotalPage(parseInt(data.count / selectedPageSize));
          setItems(
            data.data.map((x) => {
              return { ...x };
            })
          );
          setSelectedItems([]);
          setTotalItemCount(data.count);
          setIsLoaded(true);
        });
    }
    fetchData();
    allcategory();
  }, [change]);

  // all active category
  function allcategory() {
    axios.get('/api/inventory/get-category').then((res) => {
      var categoryList = [];
      res.data.data.map((x) => {
        allcat.push(x);
      });
      console.log(res.data.data);
      var singleCategory;
      for (var i of res.data.data) {
        if (i.status) {
          singleCategory = {
            label: i.category,
            value: i.category,
            key: i.id,
          };
          categoryList.push(singleCategory);
        }
      }

      setParentcategories(categoryList);
      setCategorysearch(allcat);
      console.log(allcat);
    });
  }

  // GET THE Category DETAILS AND OPEN THE EDIT MODAL
  const openModal = (e) => {
    axios
      .get('/api/inventory/category-details', { params: { id: e } })
      .then((res) => {
        if (res.data.data) {
          console.log(res.data.data);
          setDetails(res.data.data);
          setModal(true);
          res.data.data.status
            ? setSelectedStatus({ label: 'Active', value: 'Active', key: 0 })
            : setSelectedStatus({
                label: 'Inactive',
                value: 'Inactive',
                key: 1,
              });
          setSelectedParentcategories(
            parentcategories.find((e) => e.key == res.data.data.parentId)
          );
        }
      });
    setCategoryId(e);
  };

  //DELETE CATEGORY HANDLER
  const deleteCategory = (e) => {
    axios
      .post('/api/inventory/delete-category', null, {
        params: { id: categoryId },
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
  // EDIT CATEGORY
  const edit = () => {
    if (categoryImagedata) {
      let imgform = new FormData();
      imgform.append('categoryimg', categoryImagedata);
      if (formData.status) {
        if (formData.status == 'Active') imgform.append('status', true);
        else imgform.append('status', false);
      }
      if (formData.name) {
        imgform.append('name', formData.name);
      }
      if (formData.parentId) {
        imgform.append('name', selectedparentcategories.key);
      }
      console.log('database call');
      axios
        .post('/api/inventory/edit-category', imgform, {
          params: { id: categoryId },
        })
        .then((res) => {
          console.log(res);
          setchange(!change);
          setModal(false);
          NotificationManager.success(
            'Category Updated',
            'Success',
            3000,
            null,
            null,
            ''
          );
        });
    } else {
      if (formData.status) {
        if (formData.status == 'Active') formData.status = true;
        else formData.status = false;
      }
      formData.category = formData.name;
      axios
        .post('/api/inventory/edit-category', formData, {
          params: { id: categoryId },
        })
        .then((res) => {
          console.log(res);
          setchange(!change);
          setModal(false);
          NotificationManager.success(
            'Category Updated',
            'Success',
            3000,
            null,
            null,
            ''
          );
        });
    }
  };
  // DELETE MULTIPLE CATEGORIES
  const deleteMultiple = () => {
    axios
      .post('/api/inventory/delete-category', null, {
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

  // BULK STATUS CHANGE
  const deactivate = (e) => {
    axios
      .post('/api/inventory/deactivate-category', null, {
        params: { id: selectedItems },
      })
      .then((res) => {
        if (res.data.success) {
          setchange(!change);
          NotificationManager.success(
            res.data.success,
            'Success',
            3000,
            null,
            null,
            ''
          );
        }
      });
  };
  const activate = (e) => {
    axios
      .post('/api/inventory/activate-category', null, {
        params: { id: selectedItems },
      })
      .then((res) => {
        if (res.data.success) {
          setchange(!change);
          NotificationManager.success(
            res.data.success,
            'Success',
            3000,
            null,
            null,
            ''
          );
        }
      });
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setCategoryImage(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
      setCategoryImagedata(e.target.files[0]);
    }
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
    axios
      .get(
        `/api/inventory/get-categories/${i}?pagesize=${size}&orderBy=${orderBy.column}&orderManner=${orderManner.value}&searchItem=${search}`
      )
      .then((res) => {
        setTotalPage(parseInt(res.data.count / size));
        setItems(
          res.data.data.map((x) => {
            return { ...x };
          })
        );
        // setTotalItemCount(data.totalItem);
        setIsLoaded(true);
        //setSelectedPageSize(15);
      });
  };
  const onchangePagesize = (size) => {
    setCurrentPage(1);
    setSelectedPageSize(size);
    axios
      .get(
        `/api/inventory/get-categories/${1}?pageSize=${size}&orderBy=${
          orderBy.column
        }&orderManner=${orderManner.value}&searchItem=${search}`
      )
      .then((res) => {
        setTotalPage(parseInt(res.data.count / size));
        setItems(
          res.data.data.map((x) => {
            return { ...x };
          })
        );
        console.log('changed');
        setIsLoaded(true);
      });
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
        <CategoryPageHeadings
          deleteMultipleModal={deleteMultipleModal}
          heading="Categories"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changeOrderBy={(order) => {
            setOrderBy(orderOptions.find((x) => x.column === order.column));
            axios
              .get(
                `/api/inventory/get-categories/1?pageSize=${selectedPageSize}&orderBy=${order.column}&orderManner=${orderManner.value}&searchItem=${search}`
              )
              .then((res) => {
                setItems(
                  res.data.data.map((x) => {
                    return { ...x };
                  })
                );
                setSelectedItems([]);
                setIsLoaded(true);
              });
          }}
          changeOrderManner={(manner) => {
            setOrderManner(manner);
            axios
              .get(
                `/api/inventory/get-categories/1?pageSize=${selectedPageSize}&orderBy=${orderBy.column}&orderManner=${manner.value}&searchItem=${search}`
              )
              .then((res) => {
                setItems(
                  res.data.data.map((x) => {
                    return { ...x };
                  })
                );
                setSelectedItems([]);
                setIsLoaded(true);
              });
          }}
          orderBy={orderBy}
          orderManner={orderManner}
          orderManners={orderManners}
          onchangepagesize={onchangePagesize}
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
              axios
                .get(
                  `/api/inventory/get-categories/1?searchItem=${e.target.value}&pageSize=${selectedPageSize}&orderBy=${orderBy.column}&orderManner=${orderManner.value}`
                )
                .then((res) => {
                  setCurrentPage(1);
                  setTotalItemCount(res.data.count);
                  setTotalPage(parseInt(res.data.count / selectedPageSize));
                  setItems(
                    res.data.data.map((x) => {
                      return { ...x };
                    })
                  );
                });
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          activate={activate}
          deactivate={deactivate}
          setData={setData}
          handleUpload={handleUpload}
          importModal={importModal}
          setImportModal={setImportModal}
          importing={importing}
        />
        <AddNewCategoryModal
          modalOpen={modalOpen}
          toggleModal={() => setModalOpen(!modalOpen)}
          categories={categories}
          change={change}
          setchange={setchange}
        />
        {items.length == 0 ? (
          ''
        ) : (
          <CategoryListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            handleChangeSelectAll={handleChangeSelectAll}
            itemsLength={items ? items.length : 0}
            orderBy={orderBy}
            orderManner={orderManner}
            changeOrderBy={async (ord) => {
              setOrderBy(ord);
              if (orderBy.column === ord.column) {
                const ind = !orderManners.findIndex(
                  (man) => man.value === orderManner.value
                );
                setOrderManner(orderManners[ind ? 1 : 0]);
                axios
                  .get(
                    `/api/inventory/get-categories/${1}?pageSize=${selectedPageSize}&searchItem=${search}&orderBy=${
                      ord.column
                    }&orderManner=${orderManners[ind ? 1 : 0].value}`
                  )
                  .then((res) => {
                    setCurrentPage(1);
                    setTotalItemCount(res.data.count);
                    setTotalPage(parseInt(res.data.count / selectedPageSize));
                    setItems(
                      res.data.data.map((x) => {
                        return { ...x };
                      })
                    );
                  });
              } else {
                setOrderManner(orderManners[0]);
                axios
                  .get(
                    `/api/inventory/get-categories/${1}?pagesize=${selectedPageSize}&searchItem=${search}&orderBy=${
                      ord.column
                    }&orderManner=${orderManners[0].value}`
                  )
                  .then((res) => {
                    setCurrentPage(1);
                    setTotalItemCount(res.data.count);
                    setTotalPage(parseInt(res.data.count / selectedPageSize));
                    setItems(
                      res.data.data.map((x) => {
                        return { ...x };
                      })
                    );
                  });
              }
            }}
          />
        )}

        {items.length == 0 ? (
          <h3>No Records found</h3>
        ) : (
          <CategoryPageListing
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
              {categoryImage ? (
                <img style={styles.profileImg} src={categoryImage} alt="" />
              ) : details.categoryimg != null ? (
                <img
                  style={styles.profileImg}
                  src={details.categoryimg}
                  alt=""
                />
              ) : (
                <img src="https://icon-library.com/images/category-icon/category-icon-29.jpg" />
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
                <IntlMessages id="Category Name" />
              </Label>
              <Input
                defaultValue={details.category}
                onChange={(e) => {
                  setformData({ ...formData, name: e.target.value });
                }}
              />
            </div>
            <Row className="mt-3">
              {/* <Col className="sm-6">
                <Label>
                <IntlMessages id="Slug" />
                </Label>
                <Input defaultValue={details.slug} onChange={(e) => {
                        setformData({ ...formData, slug: e.target.value })
                    }}/>
                </Col> */}
              <Col className="sm-6">
                <Label>
                  <IntlMessages id="Parent Category" />
                </Label>

                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  options={parentcategories}
                  value={selectedparentcategories}
                  onChange={setSelectedParentcategories}
                />
              </Col>
              <Col className="sm-6">
                <Label>
                  <IntlMessages id="Status" />
                </Label>

                {console.log(details.status, 'status')}
                <Select
                  value={selectedStatus}
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  options={statusOptions}
                  onChange={(e) => {
                    setformData({ ...formData, status: e.value });
                    setSelectedStatus(e);
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
          <ModalBody>Are you sure you want to delete Category?</ModalBody>
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

export default Category;
