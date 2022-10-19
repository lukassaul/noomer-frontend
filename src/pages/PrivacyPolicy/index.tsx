import Footer from '../../components/Footer';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { t } from '../../i18n';
import PrivacyPolicy from '../../components/PrivacyPolicy';

import {
  DarkHeader,
  DarkHeaderText,
  CenteredContainer,
  CommonContentContainer,
  SecurityContainer
} from '../../globalStyles';


function Policy() {
  const { language } = useSelector((state: RootState) => state.language)
  return (
    <CommonContentContainer>
      <CenteredContainer style={{marginBottom: '2em'}}>
        <DarkHeader>
          <DarkHeaderText>{t("PRIVACY POLICY", language)}</DarkHeaderText>
        </DarkHeader>
      </CenteredContainer>
      <SecurityContainer>
        <PrivacyPolicy />
      </SecurityContainer>
      <Footer />
    </CommonContentContainer>
  )
}

export default Policy;
