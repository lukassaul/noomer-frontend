import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import Button from '../Button';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    NavLocation,
    MobileIcon,
    NavLinks,
    NavItem,
    NavItemBtn,
    NavMenu,
    NavBtnLink,
    NavItemIput,
    ProfileName
} from './styles';
import { FormInput, CenteredContainer } from "../../globalStyles"

import { logoutAPI } from '../../api/auth'
import { clearLogState } from '../../features/loginSlice'
import { setSearchProduct, getProductAutosuggest } from "../../features/searchSlice";
import { SuspenseImg } from '../../SuspenseImage'



function NavBar() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const [searchQuery, setSearchQuery] = useState<string | null>('')
    const [isToken, setIsToken] = useState<string | null>('')
    const [userEmail, setUserEmail] = useState<string | null>('')
    const [userFirstName, setUserFirstName] = useState<string | null>('')
    const [userLastName, setUserLastName] = useState<string | null>('')

    const { isLogSuccess } = useSelector((state: RootState) => state.login)



    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();

        let token = localStorage.getItem('token')
        let email = localStorage.getItem('userEmail')
        let first_name = localStorage.getItem('userFirstname')
        let last_name = localStorage.getItem('userLastname')

        setIsToken(token)
        setUserEmail(email)
        setUserFirstName(first_name)
        setUserLastName(last_name)
    }, []);

    useEffect(() => {
      let token = localStorage.getItem('token')
      let email = localStorage.getItem('userEmail')
      let first_name = localStorage.getItem('userFirstname')
      let last_name = localStorage.getItem('userLastname')

      setIsToken(token)
      setUserEmail(email)
      setUserFirstName(first_name)
      setUserLastName(last_name)
    }, [isLogSuccess]);

    window.addEventListener('resize', showButton);

    const handleLogout = () => {
      console.log("logging out")
      localStorage.clear()
      //dispatch(clearRegState())
      dispatch(clearLogState())
      //dispatch(clearAddState())
      //dispatch(clearDashboard())
      setIsToken(null)
      setUserEmail(null)
      setUserFirstName(null)
      setUserLastName(null)
      logoutAPI()
    }

    const handleSearchProduct = (e: any) => {
      console.log("search product")
      e.preventDefault()
      dispatch(setSearchProduct(searchQuery))
      navigate('/listing')
    }


    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to='/'>
                    <SuspenseImg src="https://res.cloudinary.com/dba8ifej6/image/upload/v1664179407/noomer-icon_vpr30i.png"  alt="Noomer logo" className="noomerLogo"/>
                </NavLogo>
                <CenteredContainer style={{width: '30%'}}>
                  <FormInput
                    type="text"
                    placeholder="Search for commodity"
                    onChange={(event) => {
                      setSearchQuery(event.currentTarget.value)
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchProduct(e);
                      }
                    }}
                  />
                </CenteredContainer>
                <MobileIcon onClick={handleClick}>
                    {click ? <span style={{fontSize: '18px'}}>X</span> : <img src="https://res.cloudinary.com/dba8ifej6/image/upload/v1653547266/bars_icon_eqdxv5.png" alt="Menu icon" style={{width: '18px'}}/>}
                </MobileIcon>

                <NavMenu onClick={handleClick} click={click}>
                    <NavItem>
                        <NavLinks to='/faqs' onClick={closeMobileMenu}>
                            FAQs
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='/help' onClick={() => {closeMobileMenu(); }}>
                            Help
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='/about' onClick={closeMobileMenu}>
                            About us
                        </NavLinks>
                    </NavItem>

                    {!isToken ? <>
                        <NavItemBtn>
                            {button ? (
                                <NavBtnLink to='/signup'>
                                    <Button color='noomerRed'>Sign up</Button>
                                </NavBtnLink>
                            ) : (
                                <NavBtnLink to='/signup'>
                                    <Button onClick={closeMobileMenu} color='noomerRed'>
                                        Sign up
                                    </Button>
                                </NavBtnLink>
                            )}
                        </NavItemBtn>
                        <NavItem>
                            <NavLinks to='/login' onClick={closeMobileMenu}>
                                Login
                            </NavLinks>
                        </NavItem>
                    </> :
                    <>
                      <NavItem>
                        <NavLinks to='/priceRecord/create'>
                            Submit Price Record
                        </NavLinks>
                      </NavItem>
                      <NavItem>
                        <NavLinks to='/login' onClick={() => handleLogout()}>
                            logout
                        </NavLinks>
                      </NavItem>
                      <ProfileName onClick={() => navigate("/dashboard")} style={{ cursor: 'pointer' }}>
                          {userFirstName} {userLastName}
                      </ProfileName>
                    </>
                    }
                </NavMenu>
            </NavbarContainer>
        </Nav>
    )
}

export default NavBar;
