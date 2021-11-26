import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Label,
    Input,
    Card,
    CardBody,
    Form,
    FormGroup,
    Button,
    Nav,
    NavItem,
    TabContent, CardSubtitle,
    TabPane,
} from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { NavLink, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import IntlMessages from '../../../../helpers/IntlMessages';
import VendorAddress from '../vendor/VendorAddress'
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { useLocation } from "react-router-dom";
import axios from 'axios'
import ProductHeading from './ProductHeading';
import ProductsList from './ProductsList';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { useParams } from 'react-router'
import { ceil } from 'lodash-contrib';

const getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  };

const AddNewVendor = ({ match }) => {
    const [activeTab, setActiveTab] = useState('VENDORINFO');
    const [data, setData] = useState([]);
    const [formData, setformData] = useState({})
    const [items, setItems] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [change, setchange] = useState(false)
    const [pageChange, setPageChange] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [lastChecked, setLastChecked] = useState(null);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [searchItem, setSearchItem] = useState('')
    const [totalSearchCount, setTotalSearchCount] = useState(0)
    const [lastSearched, setLastSearched] = useState('')
    const [itemIds, setItemIds] = useState([])
    const [restockPast, setRestockPast] = useState({
        key:0,
        value:"",
        label:"Choose Restock Past"
    })
    const [restockFuture, setRestockFuture] = useState({
        key:0,
        value:"",
        label:"Choose Restock Future"
    })
    const Righticon = "simple-icon-arrow-right-circle"
    const Lefticon = "simple-icon-arrow-left-circle"
    const Leftposition = "left"
    const Rightposition = "Right"
    const RestockPast =[
        {key:1,value:"0Days",label:"0 Days"},
        {key:2,value:"1Days",label:"1 Days"},
        {key:3,value:"2Days",label:"2 Days"},
        {key:4,value:"3Days",label:"3 Days"},
        {key:5,value:"4Days",label:"4 Days"},
        {key:6,value:"5Days",label:"5 Days"},
    ]

    let { id } = useParams();
    const search = async () => {
        if(!isLoading){
            if(searchItem.length){
                try{
                    const {data} = await axios.get(`/api/inventory/search-products/?searchItem=${searchItem}`)
                    setItems(data.products)
                    console.log(data)
                    setIsLoading(false)
                    setTotalSearchCount(data.totalCount)
                    setTotalPage(ceil(data.totalCount / 15))
                    setCurrentPage(1)
                    NotificationManager.success(data.success,'Success')
                    setLastSearched(searchItem)
                    setSearchItem('')
                }catch(ex){
                    console.log(ex)
                    NotificationManager.error('No Match Found...','Error',3000,null,null)
                }
            }
            else {
                NotificationManager.error('Enter Something to Search...','Error',3000,null,null)
            }
        } else {
            NotificationManager.error('Wait for products to get loaded first...','Error',3000,null,null)
        }
    }
    const checker = (master, target) => target.every(item => master.includes(item))
    const handleChangeSelectAll = (isToggle) => {
        console.log(itemIds)
        console.log(selectedItems)
        if (checker(selectedItems,itemIds)) {
          if (isToggle) {
                let arr = []
                arr = selectedItems.filter(itemId => !itemIds.includes(itemId) )
                setSelectedItems(arr);
          }
        } else {
            let arr = selectedItems
          items.map((x) => arr.push(x.id));
          setSelectedItems(Array.from(new Set(arr)))
        }
        document.activeElement.blur();
        return false;
      };
      const onCheckItem = (event, id) => {
        console.log(id)
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
    const history = useHistory();
    useEffect(() => {
        setIsLoading(true)
        axios.get(`/api/inventory/get-products/${currentPage}?orderBy=id&orderManner=DESC`).then(res => {
            setTotalPage(res.data.totalPage);
            setItems(res.data.data.map(x => { return { ...x } }));
            const arr = []
            console.log(res.data.data)
            res.data.data.map(product => arr.push(product.id))
            setItemIds(arr)
            setIsLoading(false)
          })
        if(id)
        axios.get(`/api/inventory/get-vendor/${id}`).then(res => {
            console.log(res.data)
            setData(res.data.vendor);
            const arr = []
            console.log(res.data.productIds)
            res.data.productIds.map(product => arr.push(product.id))
            console.log(arr)
            setSelectedItems(arr)
            setRestockFuture({
                key : 0,
                value : res.data.restockFuture,
                label : res.data.restockFuture
            })
            setRestockPast({
                key : 0,
                value : res.data.restockPast,
                label : res.data.restockPast
            })
            setformData(res.data.vendor.vendorAddress)
        })
      }, [change]);

      const handleClearSearch = () => {
          setCurrentPage(1);
          setLastSearched('');
          setSearchItem('');
          getData(1,'');
      }

      const getData = async (i, searchitem=lastSearched) => {
            setIsLoading(true)
            try{
                const {data} = await axios.get(`/api/inventory/search-products/?searchItem=${searchitem}&page=${i}`)
                setItems(data.products)
                const arr = []
                console.log(data.products)
                data.products.map(product => arr.push(product.id))
                setItemIds(arr)
                setTotalSearchCount(data.totalCount)
                setTotalPage(ceil(data.totalCount / 15))
                NotificationManager.success(data.success,'Success')
                setSearchItem('')
                setIsLoading(false)
            }catch(ex){
                console.log(ex)
                NotificationManager.error('No Match Found...','Error',3000,null,null)
            }
      }

      const handleSave = () => {
          if(data.name && (formData.name === '' || formData.name === undefined)){
              formData.name = data.name
          }
          if(!formData.name){
            return NotificationManager.error(`Vendor Name is Mandatory`, 'Error', 3000, null, null, '')
          }
          if(selectedItems.length){
              formData.productIds = selectedItems
            }else {
                formData.productIds = []
            }
            if(formData.email){
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formData.email))){
                    return NotificationManager.error(`Enter a Valid Email`, 'Error', 3000, null, null, '')
                }
            }
            if(formData.emailCC){
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formData.emailCC))){
                    return NotificationManager.error(`Enter a Valid Email CC`, 'Error', 3000, null, null, '')
                }
            }
            if(!id)
                axios.post('/api/inventory/add-new-vendor', formData)
                .then(res => {
                    console.log(res);
                    NotificationManager.success(res.data.success, 'Success', 3000, null, null, '');
                    history.push('/app/inventory/vendors/')
                })
            else{
                axios.post(`/api/inventory/update-vendor/?id=${id}`, formData,)
                .then(res => {
                    console.log(res);
                    NotificationManager.success(res.data.success, 'Success', 3000, null, null, '');
                    history.push('/app/inventory/vendors/')
                })
            }
      }

    return (
        <>
            <Row>
                {/* <Colxx xxs="12">
                    <Breadcrumb heading="Add New Vendor" match={match} />
                    <Separator className="mb-5" />
                </Colxx> */}
                <Colxx xxs="12">
                    <h1>{id ? "Edit Vendor" : "Add New Vendor"}</h1>{'   '}
                    <Breadcrumb match={match} />
                    <Nav tabs className="separator-tabs ml-0 mb-5">
                        <NavItem>
                            <NavLink
                                location={{}}
                                to="#"
                                className={classnames({
                                    active: activeTab === 'VENDORINFO',
                                    'nav-link': true,
                                })}
                                onClick={() => setActiveTab('VENDORINFO')}
                            >
                                <IntlMessages id="VENDORINFO" />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                location={{}}
                                to="#"
                                className={classnames({
                                    active: activeTab === 'ADDRESS',
                                    'nav-link': true,
                                })}
                                onClick={() => setActiveTab('ADDRESS')}
                            >
                                <IntlMessages id="ADDRESS" />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                location={{}}
                                to="#"
                                className={classnames({
                                    active: activeTab === 'PRODUCTS',
                                    'nav-link': true,
                                })}
                                onClick={() => setActiveTab('PRODUCTS')}
                            >
                                <IntlMessages id="PRODUCTS" />
                            </NavLink>
                        </NavItem>
                        <div className="ml-auto">
                        <NavItem   className="d-inline">
                            <Button color="warning" onClick={ () => history.push('/app/inventory/vendors')} className='mr-2 mb-3' >
                            <IntlMessages id="Cancel" />
                            </Button>
                        </NavItem>
                        
                        <NavItem  className="d-inline">
                            <Button color="success" className='mb-3' onClick={handleSave}>
                            <IntlMessages id="Save" />
                            </Button>
                        </NavItem>
                        </div>
                    </Nav>


                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="VENDORINFO">

                            <Row>
                                <Colxx xxs="12" lg="6" className="mb-4">
                                    <Card className="mb-4">
                                        <CardBody>
                                            <p className="text-muted text-small mb-2">
                                                <IntlMessages id="GENERAL" />
                                            </p>
                                            <Form>
                                                <FormGroup>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Vendor Name" />
                                                            </Label>
                                                            <Input 
                                                            defaultValue={data.name}
                                                            placeholder="Enter Vendor Name"
                                                            onChange={(e) => {
                                                                setformData({ ...formData, name: e.target.value })
                                                            }} />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Alias" />
                                                            </Label>
                                                            <Input defaultValue={data.alias} placeholder="Vendor Alias" onChange={(e) => {
                                                                setformData({ ...formData, alias: e.target.value })
                                                            }} />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Account Number" />
                                                            </Label>
                                                            <Input defaultValue={data.accountNumber} placeholder="Account Number" onChange={(e) => {
                                                                setformData({ ...formData, accountNumber: e.target.value })
                                                            }} />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Email" />
                                                            </Label>
                                                            <Input defaultValue={data.email} placeholder="email@domain.com" onChange={(e) => {
                                                                setformData({ ...formData, email: e.target.value })
                                                            }} />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Email Cc" />
                                                            </Label>
                                                            <Input
                                                                defaultValue={data.emailCC}
                                                                placeholder="email@domain.com" onChange={(e) => {
                                                                setformData({ ...formData, emailCC: e.target.value })
                                                            }} />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Website" />
                                                            </Label>
                                                            <Input 
                                                                defaultValue={data.website}
                                                                placeholder="www.domain.com" onChange={(e) => {
                                                                setformData({ ...formData, website: e.target.value })
                                                            }} />
                                                        </Col>
                                                        
                                                </FormGroup>
                                            </Form>
                                            
                                        </CardBody>
                                    </Card>
                                </Colxx>
                                <Colxx xxs="12" lg="6" className="mb-4">
                                    <Card className="mb-4">
                                        <CardBody>
                                            <p className="text-muted text-small mb-2">
                                                <IntlMessages id="PAYMENT" />
                                            </p>
                                            <Form>
                                                <FormGroup>
                                                    
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Payment Terms" />
                                                            </Label>
                                                            <Input placeholder="www.domain.com" onChange={(e) => {
                                                                setformData({ ...formData, paymentTerm: e.target.value })
                                                            }} 
                                                                defaultValue={data.paymentTerm}
                                                            />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Restock Past" />
                                                            </Label>
                                                        <Select
                                                            components={{ Input: CustomSelectInput }}
                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            name="form-field-name"
                                                            value={restockPast}
                                                            onChange={e => {setRestockPast(e); setformData({ ...formData, restockPast : e.value})}}
                                                            options={RestockPast}
                                                        />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Restock Future" />
                                                            </Label>
                                                            <Select
                                                            components={{ Input: CustomSelectInput }}
                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            name="form-field-name"
                                                            value={restockFuture}
                                                            onChange={e => {setRestockFuture(e); setformData({ ...formData, restockFuture : e.value})}}
                                                            options={RestockPast}
                                                        />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Free Shipping Over" />
                                                            </Label>
                                                            <Input
                                                            defaultValue={data.freeShippingOver}
                                                             onChange={(e) => {
                                                                setformData({ ...formData, freeShippingOver: e.target.value })
                                                            }} />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Small Order Threshold" />
                                                            </Label>
                                                            <Input
                                                            defaultValue={data.smallOrderThreshold}
                                                             onChange={(e) => {
                                                                setformData({ ...formData, smallOrderThreshold: e.target.value })
                                                            }} />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Small Order Fee" />
                                                            </Label>
                                                            <Input
                                                            defaultValue={data.smallOrderFee}
                                                            onChange={(e) => {
                                                                setformData({ ...formData, smallOrderFee: e.target.value })
                                                            }} />
                                                        </Col>
                                                        <Col className="mb-1">
                                                            <Label>
                                                                <IntlMessages id="Lead Time To Ship" />
                                                            </Label>
                                                            <Input
                                                            defaultValue={data.leadTimeToShip}
                                                            placeholder="0 Days"
                                                             onChange={(e) => {
                                                                setformData({ ...formData, leadTimeToShip: e.target.value })
                                                            }} />
                                                        </Col>
                                                </FormGroup>
                                            </Form>
                                            <i className={Righticon} style={{float:Rightposition,fontSize:35,color:"#922c88",cursor:"pointer"}} onClick={() => {
                                                setActiveTab('ADDRESS')
                                                window.scrollTo(0, 0)
                                                }}/>
                                        </CardBody>
                                    </Card>
                                </Colxx>
                            </Row>
                        </TabPane>
                        <TabPane tabId="ADDRESS">
                            <Row>
                            <VendorAddress billing={1} formData={formData} setformData={setformData} heading="BILLING ADDRESS" icon={Lefticon} position={Leftposition} setActiveTab={setActiveTab} move="VENDORINFO"/>
                            <VendorAddress billing={0} formData={formData} setformData={setformData} heading="SHIPPING ADDRESS" icon={Righticon} position={Rightposition} setActiveTab={setActiveTab} move="PRODUCTS"/>
                            </Row>
                        </TabPane>
                        <TabPane tabId="PRODUCTS">
                            <Card>
                                <CardSubtitle className='px-5 pt-3'>
                                    <div className="d-flex">
                                        <Input type='text' className='flex-1' value={searchItem} onChange={e => setSearchItem(e.target.value)} placeholder="Type Name/SKU to Search..."/>
                                        <Button className='flex-1 px-3 ml-1' onClick={search} color='primary'><i className="simple-icon-magnifier"></i></Button>
                                    </div>
                                </CardSubtitle>
                                <CardBody style={{display:"grid"}}>
                                {items.length==0 ? "" :
                                <>
                                <h3 className='h3 text-center font-weight-bold'>Add Product(s) to Vendor</h3>
                                <div className="d-flex col-12">
                                    <div className="flex-1">
                                        {lastSearched && <b className='h5 text-left pl-3 mb-3'>{`Showing ${totalSearchCount} Results for : ${lastSearched}`}</b>}
                                    </div>
                                    <div className="flex-0">
                                        {lastSearched && <Button className='ml-2' color='secondary' onClick={handleClearSearch}>Clear Searches</Button>}
                                    </div>
                                </div>
                                <ProductHeading
                                    selectedItemsLength={selectedItems ? selectedItems.length : 0}
                                    handleChangeSelectAll={handleChangeSelectAll}
                                    itemsLength={items ? items.length : 0}
                                    selectedItems={selectedItems}
                                    itemIds={itemIds}
                                />
                                </>
                                }
                                {isLoading ? <h4 className='text-center'>
                                    Loading Products...
                                </h4> : (items.length==0 ? <h3 className='text-center'>No Records Found</h3> : 
                                <div>
                                    <ProductsList 
                                    // {...console.log(brand,"ooooooooooooooooooooooooooooooooooooooooo")}
                                    items={items}
                                    selectedItems={selectedItems}
                                    onCheckItem={onCheckItem}
                                    currentPage={currentPage}
                                    totalPage={totalPage}
                                    onChangePage={setCurrentPage}
                                    setchange={setchange}
                                    change={change}
                                    lastSearched={lastSearched}
                                    getData={getData}
                                    />
                                </div>
                                )}
                                </CardBody>
                                <i className={Lefticon} style={{float:Leftposition,fontSize:35,color:"#922c88",cursor:"pointer", margin:10}} onClick={() => {
                                                setActiveTab('ADDRESS')
                                                window.scrollTo(0, 0)
                                                }}/>
                            </Card>
                        </TabPane>
                    </TabContent>
                </Colxx>
            </Row>

        </>
    );
}

export default AddNewVendor;