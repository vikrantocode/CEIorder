import React, { useState, useEffect } from 'react';
import { Row, Button, Col, Label, Input, Card, CardBody, CustomInput } from 'reactstrap';
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
  const [orderItems, setOrderItems] = useState([]);
  const [onchange, setOnchange] = useState();
  const [importFile, setImportFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [externalLinkData, setExternalLinkData] = useState({});

  const history = useHistory();



  const onValueChange=(e) => {
    setOnchange(e)
    console.log(e, "---------------------------------------------e")
    history.push('/app/orders/import-bulk-orders');
    
  }

  const ImportFtp = () => {
      console.log(formData, "-----------------------------form Data")
  }

  const ImportExternalLink = () => {
       console.log(externalLinkData.link, "===========================================External Link")
       axios.post('/ordersync//import-from-external-link', null, { params: { link: externalLinkData.link } })
        .then((res) => {
            console.log(res, "=========================================================res")
          if (res.status === 201) {
            NotificationManager.success(
              res.data.success,
              'Success',
              3000,
              null,
              null,
              ''
            );
          } else {
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
       
    //    if (res.status === 201) {
    //     NotificationManager.success(
    //       res.data.success,
    //       'Success',
    //       3000,
    //       null,
    //       null,
    //       ''
    //     );
    //   } else {
    //     NotificationManager.error(
    //       res.data.error,
    //       'Error',
    //       3000,
    //       null,
    //       null,
    //       ''
    //     );
    //   }
}
const ImportUploadfile = () =>{
    console.log(importFile, "============================================================fileData")
}



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
                        accept=".csv"
                        multiple
                        onChange={(event) => {
                          setImportFile(event.target.files[0]);
                        }}
                        id="exampleCustomFileBrowser3"
                        name="customFile"
                      />
                   </Col>

                 </Row>
                 <div style={{ padding: '20px 0px', margin: '20px 0px' }}>
                   <Button
                     color="secondary"
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
                      color="secondary"
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
                      color="secondary"
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
    </>
  );
};

export default BulkOrderOptions;
