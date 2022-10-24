import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { t } from '../../i18n'
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { RootState, AppDispatch } from "../../app/store"
import Alert from '../../components/AlertMessage';
import Button from '../../components/Button';
import Footer from '../../components/Footer';
import { getDashboard } from '../../features/dashboardSlice';
import { DeactivateAccountAPI } from '../../api/auth';
import { logoutAPI } from '../../api/auth'
import { clearLogState } from '../../features/loginSlice'
import { clearAddState } from '../../features/addPasswordSlice'
import { clearRegState } from '../../features/registrationSlice'

// Import modal components
import { Modal } from '../../components/ReusableModal/Modal';
import { ConfirmationModal } from '../../components/ReusableModal/ConfirmationModal';
import { useModal } from '../../components/ReusableModal/useModal';
import { DeactivateTitle, DeactivateWrapper} from './styles'
import {
  CommonContainer,
  CenteredContainer,
  LeftLinkContainer,
  LinkParagraph
} from '../../globalStyles'


function DeactivateAccount() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { language } = useSelector((state: RootState) => state.language)
    let profileUserId = localStorage.getItem('user')

    const [profile, setProfile] = useState<any>()
    const [deactivateError, setDeactivateError] = useState(false)
    const [deactivateErrorMessage, setDeactivateErrorMessage] = useState<string>('')

    const {dashboard} = useSelector((state: RootState) => state.dashboard)

    const setUserDashboard = async() => {

      if (dashboard) {
        if (dashboard.profile) setProfile(dashboard.profile)
      }

    };

    useEffect(() => {
      if(profileUserId) dispatch(getDashboard(profileUserId));
    }, [profileUserId, dispatch]);

    useEffect(() => {
      if(dashboard) setUserDashboard();
    }, [dashboard]);

    // Modal functionalities
    const { isShown, toggle } = useModal();

    const onConfirm = async() => {
      toggle();

      // call deactivate account api
      // if success, logout user
      // if error, display error
      if(profile) {
        const result: any = await DeactivateAccountAPI(profile._id)

        if (result && result.status === 200) {
            localStorage.clear()
            dispatch(clearRegState())
            dispatch(clearLogState())
            dispatch(clearAddState())
            logoutAPI()

            navigate('/login')
        } else {
          console.log("error deactivating the account")
          setDeactivateError(true)
          setDeactivateErrorMessage("Error deactivating the account. Please try again.")
        }
      }
    };
    const onCancel = () => toggle();

    return (
      <>
        <CommonContainer>
          <LeftLinkContainer style={{padding: '2em'}}>
            <BsFillArrowLeftCircleFill size="1.5em" style={{marginRight: "1em", color: '#E8505B', cursor: 'pointer'}} onClick={() => navigate(-1)}/>
            <LinkParagraph onClick={() => navigate(-1)}>Back</LinkParagraph>
          </LeftLinkContainer>
          <CenteredContainer>
            <DeactivateWrapper>
              {deactivateError ?
                  <Alert
                      text={deactivateErrorMessage}
                      bgColor="#f8d7da"
                      txtColor="#721c24"
                  /> : null
              }

              <div style={{display: 'flex', flexDirection: 'column'}}>
                <DeactivateTitle>{t('Deactivate Account', language)}</DeactivateTitle>
                <Button
                  onClick={() => {
                    setDeactivateError(false)
                    setDeactivateErrorMessage("")
                    toggle()
                  }}
                  color='secondaryRed'
                  >
                  {t('Proceed', language)}
                </Button>
              </div>

              <Modal
                isShown={isShown}
                hide={toggle}
                headerText="Account Deactivation"
                modalContent={
                  <ConfirmationModal
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                    message="Are you sure you want to deactivate your account?"
                  />
                }
              />
            </DeactivateWrapper>
          </CenteredContainer>
        </CommonContainer>
        <Footer />
      </>
    )
}

export default DeactivateAccount
