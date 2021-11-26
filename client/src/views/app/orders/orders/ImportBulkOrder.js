import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import OrdersListHeading from './BulkOrdersListHeading';
import OrdersPageListing from './BulkOrdersPageListing';
import OrdersPageHeading from './BulkOrderPageHeading';

const ImportBulkOrder = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [modalBasic, setModalBasic] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);


  const [change, setchange] = useState(false);

  const [fileName, setFileName] = useState('');
  const [importFile, setImportFile] = useState(null);
  const [importModal, setImportModal] = useState(false);
  const [importsModal, setImportsModal] = useState(false);
  const [importing, setImporting] = useState(false);



  const deleteModal = (e) => {
    setFileName(e);
    setModalBasic(true);
  };

  useEffect(() => {
    axios.get(`/ordersync/filename`).then(({ data }) => {
      setItems(data.files);
      setIsLoaded(true);
    });
  }, [change]);

  const deleteOrder = async (e) => {
      console.log(fileName, "--------------------------------called ")
    axios
      .post('/ordersync/delete', null, { params: { name: fileName } })
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
  const importOrder = async () => {
    axios.get(`/ordersync/filename`).then(({ data }) => {
      let files = []
      data.files.map((item)=> {
        files.push("./uploads/"+item)
      })
      for (let i=0; i<files.length; i++){
        console.log(files[i])
        setImportsModal(true);
        axios.post('/ordersync/import-order', null, { params: { name: files[i] } })
        .then((res) => {
          if (res.status === 201) {
            setImportsModal(false);
            NotificationManager.success(
              res.data.success,
              'Success',
              3000,
              null,
              null,
              ''
            );
          } else {
            setImportsModal(false);
            NotificationManager.error(
              res.data.error,
              'Error',
              3000,
              null,
              null,
              ''
            );
          }
        })
      }// for 

    })
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
          '/ordersync/import',
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

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <OrdersPageHeading
          heading="Orders"
          addUrl="/app/orders/add-order"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          match={match}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          toggleModal={() => setModalOpen(!modalOpen)}
          setImportFile={setImportFile}
          importModal={importModal}
          setImportModal={setImportModal}
          importsModal={importsModal}
          setImportsModal={setImportsModal}
          importOrders={importOrders}
          importOrder = {importOrder}
          importing={importing}
        />
        {items.length == 0 ? (
          ''
        ) : (
          <OrdersListHeading
            selectedItemsLength={selectedItems ? selectedItems.length : 0}
            itemsLength={items ? items.length : 0}
          />
        )}

        {items.length == 0 ? (
          <h3>No Records found</h3>
        ) : (
          <OrdersPageListing
            items={items}
            itemsLength={items ? items.length : 0}
            deleteModal={deleteModal}
            displayMode={displayMode}
            selectedItems={selectedItems}
            onContextMenu={onContextMenu}
            setFileName={setFileName}
            setModalBasic={setModalBasic}
          />
        )}      
        {/* Delete Modal */}
        <Modal isOpen={modalBasic}>
          <ModalHeader>
            <IntlMessages id="Delete" />
          </ModalHeader>
          <ModalBody>{`Are you sure you want to Delete ${fileName}`}</ModalBody>
          <ModalFooter>
            <Button onClick={deleteOrder} color="primary">
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

export default ImportBulkOrder;
