import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { LOGOUT, USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import LoadingSubmit from "../Loading/Loading";
import  Cookie  from 'cookie-universal';
export default function TopBar() {
  const menu = useContext(Menu);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setisOpen = menu.setIsOpen;
  const [name , setName] = useState('');
  const cookie = Cookie();
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name)).catch(()=> navigate('/login',{replace:true}));
  }, []);
  async function handleLogOut(){
    setLoading(true)
    try {
       const res = await Axios.get(`/${LOGOUT}`)
       cookie.remove('e-commerce');
       window.location.pathname="/login"
       setLoading(false)
    } catch (err) {
        console.log(err)
        setLoading(false)   
    }
}
  return (
    <>
   {loading  && (<LoadingSubmit />)}
    <div className="top-bar">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-5">
        <h3>E-commerce</h3>
        <FontAwesomeIcon
          onClick={() => setisOpen((prev) => !prev)}
          cursor={"pointer"}
          icon={faBars}
        />
        </div>
        <div>
          
            <DropdownButton id="dropdown-basic-button" title={`${name}`}>
              <Dropdown.Item onClick={handleLogOut}>LogOut</Dropdown.Item>
            </DropdownButton>
        </div>
      </div>
    </div>
    </>
  );
}
