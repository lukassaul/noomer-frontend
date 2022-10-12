import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { t } from '../../i18n'
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store"
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
  CenteredContainer
} from '../../globalStyles'


function DeactivateAccount() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { language } = useSelector((state: RootState) => state.language)
    let profileUserId = localStorage.getItem('user')

    const [profile, setProfile] = useState<any>()

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
        const result: any = await DeactivateAccountAPI(profile.user)

        if (result && result.status === 200) {
            localStorage.clear()
            dispatch(clearRegState())
            dispatch(clearLogState())
            dispatch(clearAddState())
            logoutAPI()

            navigate('/login')
        } else {
          console.log("error deactivating the account")
        }
      }
    };
    const onCancel = () => toggle();

    return (
      <>
        <CommonContainer>
          <CenteredContainer>
            <DeactivateWrapper>
              <div style={{display: 'flex', justifyContent: 'flex-start', margin: '1em 0', width: '100%'}}>
                <Button onClick={() => navigate(-1)}>Back</Button>
              </div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <DeactivateTitle>{t('Deactivate Account', language)}</DeactivateTitle>
                <Button onClick={() => toggle()} color='secondaryRed'>{t('Proceed', language)}</Button>
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
