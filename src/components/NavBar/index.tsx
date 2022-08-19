import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
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
import { DailaiLogo, IconComp } from "../../globalStyles"
//import { SuspenseImg } from '../../SuspenseImage'



function NavBar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const isToken = true;

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
    }, []);

    window.addEventListener('resize', showButton);

    const handleLogout = () => {
        console.log("logging out")
    }


    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to='/'>
                    Noomer
                </NavLogo>
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
                        <NavLinks to='/blog/list' onClick={closeMobileMenu}>
                            Blogs
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
                                    <Button>Sign up</Button>
                                </NavBtnLink>
                            ) : (
                                <NavBtnLink to='/signup'>
                                    <Button onClick={closeMobileMenu} color='secondary'>
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
                    </> : <><NavItem>
                        <NavLinks to='/login' onClick={() => handleLogout()}>
                            logout
                        </NavLinks>
                    </NavItem>
                        <ProfileName onClick={() => console.log("go to profile")} style={{ cursor: 'pointer' }}>
                            Jonathan Gludo
                        </ProfileName>
                    </>
                    }
                </NavMenu>
            </NavbarContainer>
        </Nav>
    )
}

export default NavBar;
