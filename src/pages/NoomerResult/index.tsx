import React, {useCallback, useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '../../app/store'

import moment from 'moment'
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Alert from '../../components/AlertMessage'

import Footer from '../../components/Footer';
import {
  NoomerEqualityLogo,
  DetailsLabel,
  DetailsValue,
  CenteredContainer,
  CenteredContainerColBordered,
  CommonContainer,
  Container,
  LeftLinkContainer,
  LinkParagraph,
  FormSeparatorGray,
  FlexContainer,
  TitleThree,
  TitleThreeNoPad,
} from '../../globalStyles'

function NoomerResult() {

  const navigate = useNavigate()

  const { noomer } = useSelector((state: RootState) => state.comparison)
  console.log("noomer: ", noomer)
  let isToken = localStorage.getItem('token')
  let userEmail = localStorage.getItem('userEmail')
  let user = localStorage.getItem('user')

  const Stats = () =>
    <FlexContainer style={{width: '100%', justifyContent: 'space-around'}}>
      <div style={{ padding: '1em', width: '40%' }}>
        <TitleThree>Product A</TitleThree>
        <table className="table table-striped" width="100%">
          <tbody>
            <tr><td width="25%"><DetailsLabel>Classification: </DetailsLabel></td><td width="75%"><DetailsValue>{noomer.productA}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Location: </DetailsLabel></td><td><DetailsValue>{noomer.locationA}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Highest: </DetailsLabel></td><td><DetailsValue>{noomer.statsA && noomer.statsA.highest ? noomer.statsA.highest : "No record"}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Lowest: </DetailsLabel></td><td><DetailsValue>{noomer.statsA && noomer.statsA.lowest ? noomer.statsA.lowest : "No record"}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Average: </DetailsLabel></td><td><DetailsValue>{noomer.statsA && noomer.statsA.mean ? noomer.statsA.mean : "No record"}</DetailsValue></td></tr>
          </tbody>
        </table>
      </div>

      <div style={{ padding: '1em', width: '40%' }}>
        <TitleThree>Product B</TitleThree>
        <table className="table table-striped" width="100%">
          <tbody>
            <tr><td width="25%"><DetailsLabel>Classification: </DetailsLabel></td><td width="75%"><DetailsValue>{noomer.productB}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Location: </DetailsLabel></td><td><DetailsValue>{noomer.locationB}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Highest: </DetailsLabel></td><td><DetailsValue>{noomer.statsB && noomer.statsB.highest ? noomer.statsB.highest : "No record"}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Lowest: </DetailsLabel></td><td><DetailsValue>{noomer.statsB && noomer.statsB.lowest ? noomer.statsB.lowest : "No record"}</DetailsValue></td></tr>
            <tr><td style={{marginRight:"1em"}}><DetailsLabel>Average: </DetailsLabel></td><td><DetailsValue>{noomer.statsB && noomer.statsB.mean ? noomer.statsB.mean : "No record"}</DetailsValue></td></tr>
          </tbody>
        </table>
      </div>
    </FlexContainer>


  const Noomer = () =>
    <Container>
      <CenteredContainerColBordered>
        <TitleThreeNoPad>{noomer.noomer.productA}</TitleThreeNoPad>
        <NoomerEqualityLogo src="https://res.cloudinary.com/dba8ifej6/image/upload/v1664316799/noomer-equality-icon_fprazy.png" />
        <TitleThreeNoPad>{noomer.noomer.productB}</TitleThreeNoPad>
      </CenteredContainerColBordered>
    </Container>

  return (
    <>
      <CommonContainer>
        <CenteredContainer>
          <Container style={{padding: '1em 2em'}}>

              <LeftLinkContainer onClick={() => navigate(-1)}>
                <BsFillArrowLeftCircleFill size="1.5em" style={{cursor: "pointer", marginRight: "1em", color: '#E8505B'}}/>
                <LinkParagraph >Back to homepage</LinkParagraph>
              </LeftLinkContainer>

              {noomer && noomer.noomer ? Noomer() : null}
              <FormSeparatorGray/>
              {noomer ? Stats() : "Please login to vote"}

          </Container>
        </CenteredContainer>
      </CommonContainer>

      <Footer />
    </>
  )

}

export default NoomerResult;
