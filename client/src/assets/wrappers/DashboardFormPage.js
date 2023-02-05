import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: ${(props) => props.theme.formBg};
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
    color: ${(props) => props.theme.formTextColor};
  }

  label {
    color: ${(props) => props.theme.formTextColor};
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    background: ${(props) => props.theme.formBg};
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .submit-btn {
    background: ${(props) => props.theme.saveSubBtnBg};
    color: ${(props) => props.theme.saveSubBtnText};
  }
  .submit-btn:hover {
    background: ${(props) => props.theme.saveSubBtnText};
    color: ${(props) => props.theme.saveSubBtnBg};
  }
  .save-btn {
    background: ${(props) => props.theme.saveSubBtnBg};
    color: ${(props) => props.theme.saveSubBtnText};
  }
  .save-btn:hover {
    background: ${(props) => props.theme.saveSubBtnText};
    color: ${(props) => props.theme.saveSubBtnBg};
  }
  .clear-btn {
    background: var(--grey-500);
    color: black;
  }
  .clear-btn:hover {
    background: var(--black);
    color: white;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
