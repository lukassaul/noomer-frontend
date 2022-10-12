import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { t } from '../../i18n'
import useRegistrationForm from '../../hooks/useRegistrationForm';
import {
    RegisterInput,
    RegHeaderWrapper,
    WholeWrapper,
    RegistrationTitle,
    RegisterLoginText,
    RegisterLoginLink,
    RegisterButtonWrapper,
    RegisterTerms,
    RegisterTermWrapper,
    TextTermWrapper,
    TextProcceed
} from './styles';
import {
  FormError,
  FormInputWhole,
  FormLabel,
  FormLabelContainer
} from '../../globalStyles'
import Button from '../Button'

// Import modal components
import { Modal } from '../../components/ReusableModal/Modal';
import { TermsOfUseModal } from '../../components/ReusableModal/TermsOfUseModal';
import { PolicyModal } from '../../components/ReusableModal/PolicyModal';
import { useModal } from '../../components/ReusableModal/useModal';

function RegistrationForm() {

    const { language } = useSelector((state: RootState) => state.language)

    const { register, onSubmit, setValue, errors } = useRegistrationForm();
    //const [agree, setAgree] = useState<boolean>(false)
    const [modalTextContent, setModalTextContent] = useState<string>('')

    // Modal functionalities
    const { isShown, toggle } = useModal();

    const onConfirm = async() => {
      toggle();
      console.log("terms and condition")
      setValue("acceptTerms", true)
      //setAgree(true)
    };
    const onCancel = () => toggle();

    return (
        <>
            <form onSubmit={onSubmit} aria-label="form">
                <WholeWrapper>
                    <FormLabelContainer>
                      <FormLabel>{t('Email address', language)}</FormLabel>
                    </FormLabelContainer>
                    <FormInputWhole
                        {...register("email")}
                        name="email"
                        type="email"
                        placeholder='E-mail' />
                    <FormError>{errors.email?.message}</FormError>

                    <RegisterTermWrapper style={{margin: '2em 0'}}>
                        <RegisterTerms
                            {...register("acceptTerms")}
                            name="acceptTerms"
                            type="checkbox"
                            //disabled={agree ? false : true}
                        />

                        {/**agree ? <GreenCheckIcon src="https://res.cloudinary.com/dba8ifej6/image/upload/v1646033061/green_check_q24k1a.png"/> : null**/}
                        <TextTermWrapper>
                            <TextProcceed>Before proceeding, make sure you agree to Noomer's <span className='linkText' onClick={()=> {setModalTextContent('TERMS');toggle()}}>Terms Of Use</span> and acknowledge that you have
                            read the <span className='linkText' onClick={()=> {setModalTextContent('POLICY');toggle()}}>Privacy Policy</span></TextProcceed>
                            <FormError>{errors.acceptTerms?.message}</FormError>
                        </TextTermWrapper>
                    </RegisterTermWrapper>

                    <RegisterButtonWrapper>
                        <Button type="submit" color='fifthRed'>{t('Sign up', language)}</Button>
                    </RegisterButtonWrapper>


                </WholeWrapper>
            </form>

            <Modal
              isShown={isShown}
              hide={toggle}
              headerText={modalTextContent === "TERMS" ? "Terms of Use" : "Privacy Policy"}
              modalContent={
                modalTextContent === "TERMS" ?
                <TermsOfUseModal
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                  message="Terms of Use"
                />
                :
                <PolicyModal
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                  message="Privacy Policy"
                />
              }
            />
        </>
    )
}

export default RegistrationForm
