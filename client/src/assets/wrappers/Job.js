import styled from "styled-components";

const Wrapper = styled.article`
  background: ${(props) => props.theme.statBg};
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: ${(props) => props.theme.jobIconBg};
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: ${(props) => props.theme.statBg};
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
      color: ${(props) => props.theme.formTextColor};
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: ${(props) => props.theme.formTextColor};
      letter-spacing: var(--letterSpacing);
    }
  }
  .pending {
    background: ${(props) => props.theme.pendingBg};
    color: ${(props) => props.theme.pendingText};
    border: ${(props) => props.theme.pendingBorder};
  }
  .interview {
    background: ${(props) => props.theme.interviewBg};
    color: ${(props) => props.theme.interviewText};
    border: ${(props) => props.theme.pendingBorder};
  }
  .declined {
    background: ${(props) => props.theme.declinedBg};
    color: ${(props) => props.theme.declinedText};
    border: ${(props) => props.theme.pendingBorder};
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    color: ${(props) => props.theme.formTextColor};

    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: ${(props) => props.theme.editBtnText};
    background: ${(props) => props.theme.editBtnBg};
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: ${(props) => props.theme.deleteBtnText};
    background: ${(props) => props.theme.deleteBtnBg};
  }
  .edit-btn:hover {
    color: ${(props) => props.theme.editBtnBg};
    background: ${(props) => props.theme.editBtnText};
    margin-right: 0.5rem;
  }
  .delete-btn:hover {
    color: ${(props) => props.theme.deleteBtnBg};
    background: ${(props) => props.theme.deleteBtnText};
  }

  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
