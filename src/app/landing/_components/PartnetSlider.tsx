"use client";
import {
  AwsLogo,
  GoogleLogo,
  LinkedinLogo,
  McDonalLogo,
  ITViecLogo,
  UdacityLogo,
  UdemyLogo,
} from "@/_images/svgs/brandLogo";
import { Box, Container, Text } from "@chakra-ui/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const PartnerSlider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const listLogos = [
    { name: "AWS", component: AwsLogo, boxSize: 24 },
    { name: "Google", component: GoogleLogo, boxSize: 20 },
    { name: "LinkedIn", component: LinkedinLogo, boxSize: 20 },
    { name: "Udemy", component: UdemyLogo, boxSize: 20 },
    { name: "Udacity", component: UdacityLogo, boxSize: 20 },
    { name: "McDonald's", component: McDonalLogo, boxSize: 36 },
    { name: "ITViec", component: ITViecLogo, boxSize: 28 },
  ];

  return (
    <Box>
      <Container mb="4rem" maxW="7xl">
        <Text textStyle="4xl" fontWeight={700}>
          Our Partners
        </Text>
        <Text>
          Empower yourself with our partner to maximize your opportunities
        </Text>
      </Container>
      <Box ml="7.3%">
        <Carousel
          swipeable={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="transform 300ms ease-in-out"
          transitionDuration={3000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-30-px"
        >
          {listLogos.map((logo, index) => (
            <Box key={index}>
              <logo.component boxSize={logo.boxSize} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};
