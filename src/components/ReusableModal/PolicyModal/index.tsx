import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { t } from '../../../i18n';
import { RootState } from "../../../app/store";
import PrivacyPolicy from "../../PrivacyPolicy";
import {
	ConfirmationButtons,
	Message,
	//YesButton,
	NoButton,
	Content,
} from './styles';

interface TermsOfUseModalProps {
	onConfirm: () => void;
	onCancel: () => void;
  message: string;
}


export const PolicyModal: FunctionComponent<
	TermsOfUseModalProps
> = props => {
	const { language } = useSelector((state: RootState) => state.language)

	return (
		<React.Fragment>
			<Content>

				<Message>{t("Dailai Privacy Policy", language)}</Message>
				<PrivacyPolicy />

			</Content>
      <ConfirmationButtons>
        {/**<YesButton onClick={props.onConfirm}>I Agree</YesButton>**/}
        <NoButton onClick={props.onCancel}>Close</NoButton>
      </ConfirmationButtons>
		</React.Fragment>
	);
};
