import { IErrorMessage } from "../models/interfaces";
import styled from "styled-components";

const ErrorContainer = styled.div<Pick<IErrorMessage, "marginLeft">>`
  margin: 1rem 0;
  margin-left: ${({ marginLeft }) => marginLeft ?? "unset"};
`;

const ErrorMessage = ({ message, marginLeft }: IErrorMessage) => {
  return <ErrorContainer marginLeft={marginLeft}>{message}</ErrorContainer>;
};

export default ErrorMessage;
