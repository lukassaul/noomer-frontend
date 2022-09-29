import React, { useState } from 'react';
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
import { FormError } from '../../globalStyles'
import Button from '../Button'

// Import modal components
import { Modal } from '../../components/ReusableModal/Modal';
import { TermsOfUseModal } from '../../components/ReusableModal/TermsOfUseModal';
import { PolicyModal } from '../../components/ReusableModal/PolicyModal';
import { useModal } from '../../components/ReusableModal/useModal';

function RegistrationForm() {

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
                {/* {message ? <><p>{message}</p><Link to="/login">login</Link></> : null} */}
                <WholeWrapper>
                    <RegHeaderWrapper>
                        <RegistrationTitle>Create an account</RegistrationTitle>
                        <RegisterLoginText>Already Have An Account?<RegisterLoginLink to={'/login'}>Log in</RegisterLoginLink></RegisterLoginText>
                    </RegHeaderWrapper>
                    <RegisterInput
                        {...register("email")}
                        name="email"
                        type="email"
                        placeholder='E-mail' />
                    <FormError>{errors.email?.message}</FormError>
                    <RegisterButtonWrapper>
                        <Button type="submit" color='fifth'>CREATE ACCOUNT</Button>
                    </RegisterButtonWrapper>
                    <RegisterTermWrapper>
                        <RegisterTerms
                            {...register("acceptTerms")}
                            name="acceptTerms"
                            type="checkbox"
                            //disabled={agree ? false : true}
                        />

                        {/**agree ? <GreenCheckIcon src="https://res.cloudinary.com/dba8ifej6/image/upload/v1646033061/green_check_q24k1a.png"/> : null**/}
                        <TextTermWrapper>
                            <TextProcceed>Before proceeding, make sure you agree to Dailai's <span className='linkText' onClick={()=> {setModalTextContent('TERMS');toggle()}}>Terms Of Use</span> and acknowledge that you have
                            read the <span className='linkText' onClick={()=> {setModalTextContent('POLICY');toggle()}}>Privacy Policy</span></TextProcceed>
                            <FormError>{errors.acceptTerms?.message}</FormError>
                        </TextTermWrapper>
                    </RegisterTermWrapper>

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
