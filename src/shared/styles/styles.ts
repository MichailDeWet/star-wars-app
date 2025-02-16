import styled from "styled-components";
import { TSortable, TSortDirection } from "../../models/types";

export const PageTitle = styled.h1`
  margin: 1rem 0;
  color: ${({ theme }) => theme.headingColor};
`;

export const PageContainer = styled.div`
  margin: 0 3rem 3rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.color};
  }

  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.background};
  }

  tr:nth-child(odd) {
    background-color: ${({ theme }) => theme.tableOddRowColor};
  }
`;

export const StyledTH = styled.th<{
  width: string;
  sortableType?: TSortable;
  sortDirection?: TSortDirection;
}>`
  ${({ sortableType }) => sortableType && `cursor: pointer;`}
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.headingColor};
  width: ${({ width }) => width};

  &:hover {
    background-color: ${({ theme }) => theme.tableHeadingHoverBackgroundColor};
    color: ${({ theme }) => theme.tableHeadingHoverColor};

    .alpha,
    .number {
      fill: ${({ theme }) => theme.tableHeadingHoverColor};
    }

    .alpha path,
    .time path,
    .time circle {
      stroke: ${({ theme }) => theme.tableHeadingHoverColor};
    }

    .sort-direction path {
      fill: ${({ theme }) => theme.tableHeadingHoverColor};
    }
  }

  svg {
    aspect-ratio: 1;
    float: right;
  }

  .alpha,
  .number,
  .time {
    width: 1.2rem;
  }

  .alpha,
  .number {
    fill: ${({ theme }) => theme.headingColor};
  }

  .alpha path,
  .time path,
  .time circle {
    stroke: ${({ theme }) => theme.headingColor};
  }

  .sort-direction {
    width: 0.75rem;
    margin-top: 3px;
    ${({ sortDirection }) =>
      sortDirection === "desc" && `transform: scale(-1, 1);`}

    path {
      fill: ${({ theme }) => theme.headingColor};
    }
  }
`;
