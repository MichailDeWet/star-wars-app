import { IErrorMessage } from "../models/interfaces";
import styled from "styled-components";

const ErrorContainer = styled.div`
  margin: 1rem 0;
`;

const ErrorMessage = ({ message }: IErrorMessage) => {
  return <ErrorContainer>{message}</ErrorContainer>;
};

export default ErrorMessage;
