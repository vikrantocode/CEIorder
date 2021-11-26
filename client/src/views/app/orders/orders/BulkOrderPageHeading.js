/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import {
  Row,
  Button,
  CustomInput,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';
import { Link } from 'react-router-dom';
import sample from '../sample.csv';

const OrdersPageHeading = ({
  match,
  toggleModal,
  heading,
  addUrl,
  importModal,
  setImportModal,
  importsModal,
  setImportsModal,
  importing,
  setImportFile,
  importOrders,
  importOrder,
}) => {
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  return (
    <>
    <Row>
      <Colxx xxs="12">
        <div className="mb-2">
          <h1>
            <IntlMessages id={heading} />
          </h1>

          <div className="text-zero top-right-button-container">
            <Button
              color="info"
              size="lg"
              className="top-right-button"
              onClick={()=> {setImportModal(true);}}
            > 
              <IntlMessages id="Upload File" />
            </Button>
            {'  '}
         
            {'  '}
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={importOrder}
            > 
              <IntlMessages id="Import Files" />
            </Button>
            {'  '}
          </div>
          <Breadcrumb match={match} />
        </div>
        <div className="mb-2">
          <Button
            color="empty"
            className="pt-0 pl-0 d-inline-block d-md-none"
            onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
          >
            <IntlMessages id="pages.display-options" />{' '}
            <i className="simple-icon-arrow-down align-middle" />
          </Button>

        </div>
        <Separator className="mb-5" />
      </Colxx>
    </Row>
    <Modal isOpen={importModal} toggle={() => setImportModal(!importModal)}>
        <ModalHeader>
          <IntlMessages id="Add Orders by importing CSV file." />
        </ModalHeader>
        <ModalBody>
          <Label>
            <IntlMessages id="Select csv File to Import" />
          </Label>
          <CustomInput
            type="file"
            accept=".csv"
            multiple
            onChange={(event) => {
              setImportFile(event.target.files);
            }}
            id="exampleCustomFileBrowser3"
            name="customFile"
          />
          <div className="col-md-12 mt-3 text-right">
            <Link
              className="h6 text-primary"
              to={sample}
              target="_blank"
              download="sample.csv"
            >
              Sample CSV <i className="iconsminds-data-download"></i>
            </Link>
          </div>
        </ModalBody>
        <ModalFooter>
          <div>
            {!importing ? (
              <div>
                <Button onClick={importOrders} color="primary">
                  Import
                </Button>{' '}
                <Button color="secondary" onClick={() => setImportModal(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <h4>Importing!!!</h4>
                <h4>Please Wait...</h4>
              </>
            )}
          </div>
        </ModalFooter>
        {/* Import Model */}
      </Modal>
      <Modal isOpen={importsModal} toggle={() => setImportsModal(!importsModal)}>
        <ModalHeader>
          <IntlMessages id="Importing!!!." />
        </ModalHeader>
        <ModalBody>
        <div className="col-md-12 mt-3 text-right">
          
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default injectIntl(OrdersPageHeading);
