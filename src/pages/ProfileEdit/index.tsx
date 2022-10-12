import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../features/dashboardSlice';
import { t } from '../../i18n';
import { RootState, AppDispatch } from "../../app/store";
import ProfileEditForm from '../../components/ProfileEditForm';
import Footer from '../../components/Footer';
import {
  ProfileContainer,
  ProfileEditFormContainer,
  SettingHeader,
  SettingContainer,
  ChangePassword,
  Deactivate,
  ProfileArrow,
  ProfileArrowText,
  ProfileArrowContainer,
  ContainerArrow,
  ArrowSmall,
  ProfileSideContainer,
  MobileIconProfile,
  ProfileMobileContainer
} from './styles'
import {
  ArrowIcon33,
  CommonContainer,
  CommonContentContainer,
  IconComp,
  TwoColumnFlexContainer,
  LeftColumnFlexChildren,
  RightColumnFlexChildren
} from '../../globalStyles'

function ProfileEdit() {
  const { language } = useSelector((state: RootState) => state.language)
  const [click, setClick] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  let profileUserId = localStorage.getItem('user')

  const [profile, setProfile] = useState<any>()

  const { dashboard } = useSelector((state: RootState) => state.dashboard)

  const setUserDashboard = useCallback(async() => {
    if (dashboard) {
          if (dashboard.profile) setProfile(dashboard.profile)
        }
  }, [dashboard, setProfile])

  const handleClick = () => setClick(!click);

  useEffect(() => {
    if (profileUserId) dispatch(getDashboard(profileUserId));
  }, [profileUserId, dispatch]);

  useEffect(() => {
    if (dashboard) setUserDashboard();
  }, [dashboard, setUserDashboard]);


  return (
    <CommonContainer>
      <CommonContentContainer>
        <TwoColumnFlexContainer>
          <LeftColumnFlexChildren>
            <SettingHeader>Settings</SettingHeader>
            <SettingContainer>
              <ChangePassword
                onClick={() => navigate('/change/password')}
                style={{ cursor: 'pointer' }}
              >{t('Change Password', language)}</ChangePassword>
              <Deactivate
                onClick={() => navigate('/account/deactivate')}
                style={{ cursor: 'pointer' }}
              >
                {t('Deactivate Account', language)}
              </Deactivate>
            </SettingContainer>
            <ProfileArrowContainer>
              <ContainerArrow>
                <ProfileArrow onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                  <ArrowIcon33
                    src={"https://res.cloudinary.com/dba8ifej6/image/upload/v1643685090/arrow_left_h4s9jg.png"}
                  />
                  <ProfileArrowText>{t('Profile', language)}</ProfileArrowText>
                </ProfileArrow>
              </ContainerArrow>
            </ProfileArrowContainer>
          </LeftColumnFlexChildren>
          <RightColumnFlexChildren>
            {profile ? <>
              <ArrowSmall
                src="https://res.cloudinary.com/dba8ifej6/image/upload/v1644293162/arrow_right_y4gllj.png"
                onClick={handleClick}
              />
              <ProfileContainer>

                <ProfileEditFormContainer>
                  <ProfileEditForm />
                </ProfileEditFormContainer>

              </ProfileContainer>
            </>
              :
              <div>
                <p>....fetching user profile </p>
              </div>
            }
            <ProfileSideContainer click={click}>
              <MobileIconProfile onClick={handleClick}>
                <span style={{fontSize: '18px'}}>X</span>
              </MobileIconProfile>
              <ProfileMobileContainer>
                  <SettingHeader>Settings</SettingHeader>
                  <SettingContainer>
                    <ChangePassword
                      onClick={() => navigate('/change/password')}
                      style={{ cursor: 'pointer' }}
                    >{t('Change Password', language)}</ChangePassword>
                    <Deactivate
                      onClick={() => navigate('/account/deactivate')}
                      style={{ cursor: 'pointer' }}
                    >
                      {t('Deactivate Account', language)}
                    </Deactivate>
                  </SettingContainer>
                  <ProfileArrowContainer>
                    <ContainerArrow>
                      <ProfileArrow onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                        <ArrowIcon33
                          src={"https://res.cloudinary.com/dba8ifej6/image/upload/v1643685090/arrow_left_h4s9jg.png"}
                        />
                        <ProfileArrowText>{t('Profile', language)}</ProfileArrowText>
                      </ProfileArrow>
                    </ContainerArrow>
                  </ProfileArrowContainer>
                </ProfileMobileContainer>
            </ProfileSideContainer>
          </RightColumnFlexChildren>
        </TwoColumnFlexContainer>
      </CommonContentContainer>
      <Footer />
    </CommonContainer>
  )
}

export default ProfileEdit
