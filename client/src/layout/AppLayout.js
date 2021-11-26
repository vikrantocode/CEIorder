import React,{useEffect,useState,useContext} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import userManagement from '../constants/menu';
import TopNav from '../containers/navs/Topnav';
import Sidebar from '../containers/navs/Sidebar';
import Footer from '../containers/navs/Footer';
import Authservice from "../AuthHeader/authheader"
import { NotificationManager } from '../components/common/react-notifications';
import {UserContext} from "../Context/UserContext"

import axios from 'axios'
const AppLayout = ({ containerClassnames, children, history }) => {
  const [menuItems,setmenuItems] = useState([])
  const [user, setUser] = useContext(UserContext)
  
  // GET THE USER DATA
  useEffect(()=>{
      setmenuItems(userManagement())
      console.log(menuItems)
  },[])
  useEffect(()=>{
    const getuserData =async ()=>{
      const user = Authservice.getCurrentUser()
      await axios.get("/api/userData",{params:{id:user.user.id}}).then(res=>{
          console.log(res.data)
              setUser(res.data.data)
      })
    }  
    getuserData()
  },[])

     

  // if not user, then redirect to login page
  useEffect(() => {
    const checkAuthentication=async ()=>{
      await axios.get("/api/dashboard-page", { headers: Authservice.authHeader() }).then(res => {
        console.log("Response is",res.data)
        if(res.data.error){
          history.push("/user/login")
        }
        else if(res.data.success){
          console.log("loggedd in");
          
        }
    })
  }
    checkAuthentication()
  },[])
  
  // useEffect(()=>{

  // })
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} user={user}/>
      <Sidebar menuItems={menuItems} />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );

}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(AppLayout)
);
