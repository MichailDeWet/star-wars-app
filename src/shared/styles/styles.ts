import styled from "styled-components";
import { TSortable, TSortDirection } from "../../models/types";
import { Link } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";
import { profile } from "console";
import { size } from "lodash-es";
import path from "path";
import { text } from "stream/consumers";

export const PageTitle = styled.h1`
  margin: 1rem 0;
  color: ${({ theme }) => theme.headingColor};
`;

export const PageContainer = styled.div`
  padding: 1rem 3rem 3rem;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.borderColor};

  th,
  td {
    padding: 0.5rem;
  }

  th:not(:first-child),
  td:not(:first-child) {
    border-left: 1px solid ${({ theme }) => theme.tableOddRowColor};
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

export const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== "isTableLink",
})<{ isTableLink?: boolean }>`
  font-size: ${({ theme }) => theme.headerLinkSize};
  color: ${({ theme, isTableLink }) =>
    isTableLink ? theme.color : theme.linkColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.linkColor};
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  padding: 20px;
  border: 4px solid ${({ theme }) => theme.borderColor};
  border-radius: 20px;

  .main-icon {
    float: left;
    max-height: 200px;
    margin-right: 2rem;

    path {
      fill: ${({ theme }) => theme.detailedIconColor};
    }
  }

  .gravity-icon,
  .rotation-icon {
    zoom: 1.5;
  }

  .orbit-icon {
    zoom: 1.2;
  }

  svg:not(.main-icon) {
    height: 13px;
  }

  .planet-icon,
  .mass-icon,
  .hair-icon,
  .hand-icon,
  .gender-icon,
  .height-icon,
  .orbit-icon,
  .compass-icon,
  .thermometer-icon,
  .terrain-icon,
  .water-icon,
  .population-icon,
  .eye-icon {
    path {
      fill: ${({ theme }) => theme.detailedIconColor};
    }
  }

  .gravity-icon,
  .rotation-icon,
  .calendar-icon {
    path,
    circle {
      stroke: ${({ theme }) => theme.detailedIconColor} !important;
    }
  }
`;

export const StatContainer = styled.div`
  display: flex;
  gap: 45px;
  flex-flow: wrap;

  > div {
    flex: 1 1 0;
  }
`;

export const ValueContainer = styled.div`
  margin-top: 5px;
  justify-self: left;
  text-transform: capitalize;
  font-weight: bold;
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: anchor-center;
  gap: 8px;
  white-space: nowrap;

  p {
    color: ${({ theme }) => theme.headingColor};
  }
`;
