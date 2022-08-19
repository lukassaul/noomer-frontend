import React from 'react'
import { StyledSpinner, StyledSpinnerContainer } from './styles'

function Spinner() {
    return (
        <StyledSpinnerContainer>
            <StyledSpinner viewBox="0 0 50 50">
                <circle
                    className="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="4"
                />
            </StyledSpinner>
        </StyledSpinnerContainer>
    )
}

export default Spinner