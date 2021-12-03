import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { Row,
         Button,
         Col,
         Label,
         Input,
         Card,
         CardBody,
         CustomInput,
         Modal,
         ModalBody,
         ModalFooter,
         ModalHeader
         } from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router';
import {
  Colxx,
  Separator,
} from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import IntlMessages from '../../../../helpers/IntlMessages';
import { NotificationManager } from '../../../../components/common/react-notifications';



const BulkOrderOptions = ({ match }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [onchange, setOnchange] = useState();
  const [importFile, setImportFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [externalLinkData, setExternalLinkData] = useState({});
  const [importsModal, setImportsModal] = useState(false);
  const [ftpModal, setFTPModal] = useState(false);
  const [fileName, setFileName] = useState('');


  const history = useHistory();

  const onValueChange=(e) => {
    setOnchange(e)
    history.push('/app/orders/import-bulk-orders');
  }

  const ImportFtp = () => {
      try{
        setFTPModal(true);
        // stablish connection
        axios.post('/ordersync/import-from-ftp', formData)
          .then((res) => {
            if (res.status === 201) {
              console.log(res.data, "-------------------------------------------------------------")
              for(let i=0;i<res.data.length; i++){
                console.log(res.data[i], "-------------------------------------------------------------")
                setFileName(res.data[i])
                setImportsModal(true);
                setFTPModal(false);
                // import file into database 
                axios.post('/ordersync/import-order', null, { params: { name: `${res.data[i]}` } })
                .then((res) => {
                  if (res.status === 201) {
                    setImportsModal(false)
                    NotificationManager.success(
                      res.data,
                      'Success',
                      3000,
                      null,
                      null,
                      ''
                    );
                  } else {
                    setImportsModal(false)
                    NotificationManager.error(
                      res.data,
                      'Error',
                      3000,
                      null,
                      null,
                      ''
                    );
                  }
                })
              }
            } else {
              setFTPModal(false);
              NotificationManager.error(
                res.data,
                'Error',
                3000,
                null,
                null,
                ''
              );
            }
          })
        }catch{
          setFTPModal(false);
          NotificationManager.error(
            "Somthing went Wrong",
            'Error',
            3000,
            null,
            null,
            ''
          );
        }
              
  }

  const ImportExternalLink = () => {
    if (externalLinkData.link && externalLinkData.link.split("/")[0] in ['https:', 'http:']){
      try{
        axios.post('/ordersync/import-from-external-link', null, { params: { link: externalLinkData.link } })
          .then((res) => {
            if (res.status === 201) {
              NotificationManager.success(
                res.data,
                'Success',
                3000,
                null,
                null,
                ''
              );
            } else {
              NotificationManager.error(
                res.data,
                'Error',
                3000,
                null,
                null,
                ''
              );
            }
          })
        }catch{
          NotificationManager.error(
            "Somthing went Wrong",
            'Error',
            3000,
            null,
            null,
            ''
          );
        }
      }else{
        NotificationManager.error(
          `Please Enter a valid link ...`,
          'Error',
          3000,
          null,
          null,
          ''
        );
      }
}

const ImportUploadfile = async () => {
  if (importFile) {
    for(let i=0;i<importFile.length; i++){
      setFileName(importFile[i].name);
      const data = new FormData();
    data.append('importFile', importFile[i]);
    
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
      setImportsModal(true);
      const res = await axios.post(
        '/ordersync/import-order-file',
        data,
        config
      );
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
      console.log(res);
    } catch (err) {
      console.log(err);
      setImportsModal(false);
      NotificationManager.error(
        `Something Wrong With File`,
        'Error',
        3000,
        null,
        null,
        ''
      );
    }
    }
    // Update the formData object
    
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


  return isLoading ? (
    <div className="loading" />
  ) : (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading={'Import Order'} match={match} />
          <div className="text-zero">{'  '}</div>

          <Separator className="mb-5" />
        </Colxx>
      </Row>
      
      <div className="d-flex flex-column">
        <Row className="mb-4">
        <Colxx xxs="3">
            <Card>
              <CardBody>
                <div className="h5">Select Options</div>
                <hr />
                <Col className="m-2 p-2">

                      <Input
                        type="radio"
                        value = "1"
                        name = "options"
                        onChange={() => {
                            onValueChange(1);
                          }}

                      /> 
                      <h6>Direct Upload</h6>
                </Col>
                <Col className="m-2 p-2">

                <Input
                type="radio"
                value = "2"
                name = "options"
                onChange={() => {
                    onValueChange(2);
                  }}

                /> 
                <h6>Using FTP/SSH</h6>
                </Col>
                <Col className="m-2 p-2">

                <Input
                type="radio"
                value = "3"
                name = "options"
                onChange={() => {
                    onValueChange(3);
                  }}

                /> 
                <h6>External Links</h6>
                </Col>
              </CardBody>
            </Card>
          </Colxx>
          {onchange ==1 ? (
           <Colxx xxs="9">
           <Card>
             <CardBody>
               <Colxx xxs="12" className="mb-5">
                 <h3 className="mb-4">DIRECT UPLOAD</h3>
                 <Row className="mt-3">
                   <Col>
                   <Label>
                        <IntlMessages id="Select csv File to Import" />
                      </Label>
                      <CustomInput
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        multiple
                        onChange={(event) => {
                          setImportFile(event.target.files);
                        }}
                        id="exampleCustomFileBrowser3"
                        name="customFile"
                      />
                   </Col>

                 </Row>
                 <div style={{ padding: '20px 0px', margin: '20px 0px' }}>
                   <Button
                     color="primary"
                     onClick={() => {
                        ImportUploadfile();
                     }}
                     className="mt-3"
                   >
                     Add File
                   </Button>
                 </div>
               </Colxx>
             </CardBody>
           </Card>
         </Colxx>
          ):( onchange ==2 ? (
            <Colxx xxs="9">
            <Card>
              <CardBody>
                <Colxx xxs="12" className="mb-5">
                  <h3 className="mb-4">USING FTP/SSH</h3>
                  <Row className="mt-3">
                    <Col>
                      <Label>
                        <IntlMessages id="Host Name" />
                      </Label>
                      <Input
                        type="text"
                        onChange={(e) => {
                            setFormData({
                              ...formData,
                              host: e.target.value,
                            });
                          }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Port No." />
                      </Label>
                      <Input
                        type="number"
                        onChange={(e) => {
                            setFormData({
                              ...formData,
                              port: e.target.value,
                            });
                          }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Label>
                        <IntlMessages id="User Name" />
                      </Label>
                      <Input
                        type="text"
                        onChange={(e) => {
                            setFormData({
                              ...formData,
                              uname: e.target.value,
                            });
                          }}
                      />
                    </Col>
                    <Col>
                      <Label>
                        <IntlMessages id="Password" />
                      </Label>
                      <Input
                        type="password"
                        onChange={(e) => {
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            });
                          }}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Label>
                        <IntlMessages id="Directory Path" />
                      </Label>
                      <Input
                        type="text"
                        onChange={(e) => {
                            setFormData({
                              ...formData,
                              path: e.target.value,
                            });
                          }}
                      />
                    </Col>
                  </Row>
                  <div style={{ padding: '20px 0px', margin: '20px 0px' }}>
                    <Button
                      color="primary"
                      className="mt-3"
                      onClick={ImportFtp}
                    >
                      Import
                    </Button>
                  </div>
                </Colxx>
              </CardBody>
            </Card>
          </Colxx>
          ): (onchange ==3 ? (
            <Colxx xxs="9">
            <Card>
              <CardBody>
                <Colxx xxs="12" className="mb-5">
                  <h3 className="mb-4">EXTERNAL LINK</h3>
                  <Row className="mt-3">
                    <Col>
                      <Label>
                        <IntlMessages id="External Link" />
                      </Label>
                      <Input
                        type="text"
                        onChange={(e) => {
                            setExternalLinkData({
                              ...externalLinkData,
                              link: e.target.value,
                            });
                          }}
                      />
                    </Col>
                  </Row>
                  <div style={{ padding: '20px 0px', margin: '20px 0px' }}>
                    <Button
                      color="primary"
                      className="mt-3"
                      onClick = {ImportExternalLink}
                    >
                      Import
                    </Button>
                  </div>
                </Colxx>
              </CardBody>
            </Card>
          </Colxx>
          ):(
          ""
           )
          )     
        )
        }
        </Row>
      </div>
      
      <Modal isOpen={importsModal} 
      backdrop="static"
      toggle={() => setImportsModal(!importsModal)}>
        <ModalHeader>
          <h5>{fileName}</h5> <h6>Importing !!!</h6>
        </ModalHeader>
        <ModalBody>
        <div className="col-md-12 text-center">
         
          <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
       
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={ftpModal} 
      backdrop="static"
      toggle={() => setFTPModal(!ftpModal)}>
        <ModalHeader>

          <h3>Please Wait!!! Trying to Stablish Connection</h3>

        </ModalHeader>
        <ModalBody>
        <div className="col-md-12 text-center">

          <Loader type="TailSpin" color="#00BFFF" height={80} width={80} /> 
        
        </div>
        </ModalBody>
                
      </Modal>
    </>
  );
};

export default BulkOrderOptions;
