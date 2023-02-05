import styled from "styled-components";

const Wrapper = styled.section`
  .form {
    width: 100%;
    max-width: 100%;
    background: ${(props) => props.theme.formBg};
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  h4 {
    color: ${(props) => props.theme.formTextColor};
  }
  label {
    color: ${(props) => props.theme.formTextColor};
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }

  .btn-form {
    background: ${(props) => props.theme.dangerBtnBg};
    color: ${(props) => props.theme.dangerBtnText};
  }
  .btn-form:hover {
    background: ${(props) => props.theme.dangerBtnText};
    color: ${(props) => props.theme.dangerBtnBg};
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
