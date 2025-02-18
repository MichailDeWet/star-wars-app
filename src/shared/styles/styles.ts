import styled from "styled-components";
import { TSortable, TSortDirection } from "../../models/types";
import { Link } from "react-router-dom";
import { DeviceSizes } from "../../models/enums";

export const PageTitle = styled.h1`
  margin: 1rem 0;
  color: ${({ theme }) => theme.headingColor};
`;

export const PageContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isHero",
})<{ isHero?: boolean }>`
  padding: 1rem 3rem 3rem;
  z-index: ${({ isHero }) => (isHero ? 10 : 0)};
  position: relative;

  @media (max-width: ${DeviceSizes.TABLET}) {
    padding: 1rem 1rem 3rem;
  }
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

export const StyledTH = styled.th.withConfig({
  shouldForwardProp: (prop) =>
    prop !== "sortableType" && prop !== "sortDirection",
})<{
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
  font-style: ${({ isTableLink }) => (isTableLink ? "italic" : "unset")};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.linkColor};
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  min-height: 250px;
  padding: 20px;
  border: 4px solid ${({ theme }) => theme.borderColor};
  border-radius: 20px;
  box-shadow: 0px 10px 7px 0px ${({ theme }) => theme.boxShadow};

  .main-icon {
    @media (min-width: ${DeviceSizes.MOBILE_LARGE}) {
      float: left;
      max-height: 200px;
      margin-right: 2rem;
      margin-bottom: 2rem;
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
  .movie-icon,
  .profile-icon,
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
`;

export const ValueContainer = styled.div`
  margin-top: 5px;
  justify-self: left;
  text-transform: capitalize;
  font-weight: bold;
  white-space: nowrap;
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
