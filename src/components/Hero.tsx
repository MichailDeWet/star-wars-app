import { Fragment, JSX } from "react";
import styled from "styled-components";
import { IHeroPage } from "../models/interfaces";

const CrawlContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ theme }) => `calc(100vh - ${theme.headerHeight})`};
  perspective: 1000px;
  background-image: ${({ theme }) => `url(${theme.heroBackground})`};
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const CrawlText = styled.div`
  font-family: ${({ theme }) => theme.crawlFont};
  font-size: 4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.crawlColor};
  text-align: center;
  position: relative;
  bottom: -100%;
  animation: crawl 10s linear infinite;
  justify-self: anchor-center;
  z-index: 0;

  @keyframes crawl {
    0% {
      transform: rotateX(45deg) translateZ(0);
      opacity: 1;
    }

    90% {
      opacity: 1;
    }

    100% {
      bottom: 240rem;
      transform: rotateX(50deg) translateZ(-150rem);
      opacity: 0;
    }
  }
`;

const CrawlParagraph = styled.p`
  margin-top: 6rem;
  text-align: justify;
  text-align-last: justify;
`;

/* This will split the crawl text on newlines and allow use to style the paragraphs true to source */
const convertToHTML = (text: string) => {
  const paragraphs = text.split(/\r\n\r\n/);

  return paragraphs.map((para, index) => (
    <CrawlParagraph key={`${index}-${para[0]}`}>
      {para.split(/\r\n/).map((line, lineIndex) => (
        <Fragment key={`${lineIndex}-${line[0]}`}>
          {line}
          {lineIndex !== para.split(/\r\n/).length - 1 && <br />}
        </Fragment>
      ))}
    </CrawlParagraph>
  ));
};

export const Hero = ({
  children,
  opening_crawl,
  heading,
  subHeading,
}: IHeroPage): JSX.Element => {
  return (
    <CrawlContainer>
      {children}
      <CrawlText>
        <h1>{heading}</h1>
        <h2>{subHeading}</h2>
        {convertToHTML(opening_crawl || "")}
      </CrawlText>
    </CrawlContainer>
  );
};
