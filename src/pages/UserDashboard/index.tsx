import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { t } from '../../i18n';
import { RootState, AppDispatch } from "../../app/store";
import { getDashboard } from '../../features/dashboardSlice';
import { getAllCities, getAllCurrencies } from '../../features/selectOptionsSlice';
import Button from '../../components/Button'
import {
  ProfileImg,
  DashContainer,
  DashHeader,
  ProfileButtonContainer
} from './styles'
import {
  CenteredContainer,
  TwoColumnFlexContainer,
  LeftColumnFlexChildrenNegativeMargin,
  RightColumnFlexDashNPChildren
} from '../../globalStyles'

import Tabs from "../../components/DashboardTabs/Tabs";
import Footer from "../../components/Footer";
// Tabs Components
import TabPosts from "../../components/DashboardTabs/SubmittedRecordsTab";
import TabRecievedRatings from "../../components/DashboardTabs/ReceivedRatingsTab";
import TabGivenRatings from "../../components/DashboardTabs/GivenRatingsTab";

type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{}>;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: "Price Records",
    index: 1,
    Component: TabPosts
  },
  {
    label: "Given reviews",
    index: 2,
    Component: TabGivenRatings
  },
  {
    label: "Received reviews",
    index: 3,
    Component: TabRecievedRatings
  }
];

function UserDashboard() {
  const { language } = useSelector((state: RootState) => state.language)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  let profileUserId = localStorage.getItem('user')

  const [profile, setProfile] = useState<any>()
  const {dashboard } = useSelector((state: RootState) => state.dashboard)

  const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);


  /**
    Fetch the citySelectOption and currencySelectOption in the redux state
  **/
  // useEffect(() => {
  //   console.log("FETCH cities: ", citySelectOption.length)
  //   console.log("FETCH currencies: ", currencySelectOption.length)
  //   if(citySelectOption.length === 0) dispatch(getAllCities('cities'))
  //   if(currencySelectOption.length === 0) dispatch(getAllCurrencies('currencies'))
  // }, [dispatch])
  /**
    End of cities and currencies fetch
  **/


  const setUserDashboard = useCallback(async() => {
    if (dashboard) {
        console.log("dashboard: ", dashboard)
        if (dashboard.profile) setProfile(dashboard.profile)
      }
  }, [dashboard]);

  useEffect(() => {
    if(profileUserId) dispatch(getDashboard(profileUserId));

  }, [profileUserId, dispatch]);

  useEffect(() => {
    if(dashboard) setUserDashboard();
  }, [dashboard, setUserDashboard]);

  const handleEditProfile = () => {
    navigate('/profile/edit')
  }

  return (
    <>
    <DashContainer>
      <DashHeader></DashHeader>
      <TwoColumnFlexContainer>
        <LeftColumnFlexChildrenNegativeMargin>
          {profile ?
            <CenteredContainer style={{flexDirection: 'column'}}>

                {profile.profile_pic && profile.profile_pic !== 'undefined' ?
                  <ProfileImg background={profile.profile_pic} /> :
                  <ProfileImg background={"https://res.cloudinary.com/dba8ifej6/image/upload/v1644472150/default_user_bw3qde.png"} />
                }

                <p style={{fontSize: '20px', fontWeight: 'bold'}}>{profile.first_name} {profile.last_name}</p>

                {profile.reputation ? <p style={{marginLeft: '12px'}}>Reputation: {profile.reputation}</p> : null}
                
                <br />

                <br />
                <ProfileButtonContainer>
                  <p style={{cursor: 'pointer'}} onClick={() => handleEditProfile()}>Edit Profile</p>
                  <Button onClick={() => navigate('/createpost')}>{t("Create Post", language)}</Button>
                </ProfileButtonContainer>

            </CenteredContainer>

            :
            <div>
              <p>....fetching user dashboard </p>
            </div>
          }
        </LeftColumnFlexChildrenNegativeMargin>
        <RightColumnFlexDashNPChildren>
          <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} />
        </RightColumnFlexDashNPChildren>
      </TwoColumnFlexContainer>


    </DashContainer>
    <Footer />
    </>
  )
}

export default UserDashboard
