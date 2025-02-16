import { JSX } from "react";
import styled from "styled-components";

const CrawlContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${({ theme }) => `calc(100vh - ${theme.headerHeight})`};
  perspective: 1000px;
  background-image: url("/assets/hero-background.webp");
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const CrawlText = styled.div`
  font-family: ${({ theme }) => theme.crawlFont};
  font-size: 28px;
  font-weight: bold;
  color: ${({ theme }) => theme.crawlColor};
  text-align: center;
  position: relative;
  bottom: -100%;
  width: 80%;
  animation: crawl 40s linear infinite;
  justify-self: anchor-center;

  @keyframes crawl {
    0% {
      bottom: -100%;
      transform: rotateX(20deg) translateZ(0);
      opacity: 1;
    }

    90% {
      opacity: 1;
    }

    100% {
      bottom: 500rem;
      transform: rotateX(35deg) translateZ(-150rem);
      opacity: 0;
    }
  }
`;

export const Hero = (): JSX.Element => (
  <CrawlContainer>
    <CrawlText>
      <h1>Testing Header</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        pretium imperdiet mollis. Praesent laoreet, urna nec aliquam facilisis,
        est velit efficitur nibh, nec laoreet leo mauris sed turpis. Donec nec
        vehicula neque. Phasellus vitae dignissim enim. Pellentesque varius arcu
        ut magna eleifend consectetur.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        pretium imperdiet mollis. Praesent laoreet, urna nec aliquam facilisis,
        est velit efficitur nibh, nec laoreet leo mauris sed turpis. Donec nec
        vehicula neque. Phasellus vitae dignissim enim. Pellentesque varius arcu
        ut magna eleifend consectetur.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        pretium imperdiet mollis. Praesent laoreet, urna nec aliquam facilisis,
        est velit efficitur nibh, nec laoreet leo mauris sed turpis. Donec nec
        vehicula neque. Phasellus vitae dignissim enim. Pellentesque varius arcu
        ut magna eleifend consectetur.
      </p>
    </CrawlText>
  </CrawlContainer>
);
