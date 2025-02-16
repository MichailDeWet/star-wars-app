import styled from "styled-components";
import { TSortable, TSortDirection } from "../../models/types";
import { getIconColors } from "../../utils/tableUtils";

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
  sortableType?: TSortable;
  sortDirection?: TSortDirection;
}>`
  ${({ sortableType }) => sortableType && `cursor: pointer;`}
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.headingColor};

  &:hover {
    background-color: ${({ theme }) => theme.tableHeadingHoverBackgroundColor};
    color: ${({ theme }) => theme.tableHeadingHoverColor};

    svg {
      fill: ${({ sortableType, theme }) =>
        getIconColors({ theme, isFill: true, onHover: false, sortableType })};

      path,
      circle {
        stroke: ${({ sortableType, theme }) =>
          getIconColors({ theme, isFill: false, onHover: true, sortableType })};
      }
    }

    .sort-direction path {
      fill: ${({ theme }) =>
        getIconColors({ theme, isFill: true, onHover: true })};
    }
  }

  svg {
    width: 1.2rem;
    aspect-ratio: 1;
    float: right;

    fill: ${({ sortableType, theme }) =>
      getIconColors({ theme, isFill: true, onHover: false, sortableType })};

    path,
    circle {
      stroke: ${({ sortableType, theme }) =>
        getIconColors({ theme, isFill: false, onHover: false, sortableType })};
    }
  }

  .sort-direction {
    width: 0.75rem;
    margin-top: 3px;
    ${({ sortDirection }) =>
      sortDirection === "desc" && `transform: scale(-1, 1);`}

    path {
      fill: ${({ theme }) =>
        getIconColors({ theme, isFill: true, onHover: false })};
    }
  }
`;
