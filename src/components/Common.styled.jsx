import { css, styled } from 'styled-components';

const xsButtonStyles = css`
  min-width: 62px;
  width: auto;
  height: 48px;
  padding: 0 16px;
`;

const smButtonStyles = css`
  width: 120px;
  height: 58px;
`;

const mdButtonStyles = css`
  width: 192px;
  height: 64px;
`;

const lgButtonStyles = css`
  width: 320px;
`;

const primaryButtonStyles = css`
  background-color: ${(props) => props.theme.colorPrimary};

  &:hover {
    background-color: ${(props) => props.theme.colorPrimaryHover};
  }
`;

const grayButtonStyles = css`
  background-color: ${(props) => props.theme.colorGray};

  &:hover {
    background-color: ${(props) => props.theme.colorGrayHover};
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  ${mdButtonStyles}
  font-size: ${(props) => props.theme.font};
  font-weight: 700;
  font-style: normal;
  letter-spacing: -0.5px;
  text-align: center;
  ${primaryButtonStyles}
  cursor: pointer;
  transition: all 300ms;
`;

export const ButtonGray = styled(Button)`
  ${grayButtonStyles}
`;

export const ButtonXs = styled(Button)`
  ${xsButtonStyles}
`;
export const ButtonXsGray = styled(ButtonXs)`
  ${grayButtonStyles}
`;

export const ButtonSm = styled(Button)`
  ${smButtonStyles}
`;
export const ButtonSmGray = styled(ButtonSm)`
  ${grayButtonStyles}
`;

export const ButtonLg = styled(Button)`
  ${lgButtonStyles}
`;
export const ButtonLgGray = styled(ButtonLg)`
  ${lgButtonStyles}
`;

export const Title = styled.h2`
  margin: 0 0 36px;
  font-size: 40px;
  font-weight: 600;
`;

export const SubTitle = styled.h3`
  margin: 64px 0 24px;
  font-size: 24px;
  font-weight: 600;

  &:first-child {
    margin-top: 24px;
  }
`;

const commonButtonStyles = css`
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #d5d9de;
  border-radius: ${(props) => props.theme.borderRadius};
  font: inherit;
  font-size: 0.9rem;
  line-height: 50px;
  background-color: #fff;
`;
export const Input = styled.input`
  ${commonButtonStyles}

  &::placeholder {
    color: #abafb2;
  }
`;
export const Select = styled.select`
  ${commonButtonStyles}
`;

export const Textarea = styled.textarea`
  ${commonButtonStyles}
  height: 300px;
`;
