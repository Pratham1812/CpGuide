"use client"
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FaGlobe } from "react-icons/fa";
import { SiCodeforces, SiLeetcode } from "react-icons/si";

const HomeContainer = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom, #1A202C, #2D3748); /* Gradient Background */
  color: #E2E8F0; /* Text color */
`;

const Title = styled(motion.h1)`
  font-size: 48px;
  color: #E2E8F0;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Description = styled(motion.p)`
  font-size: 20px;
  color: #E2E8F0;
  text-align: center;
  max-width: 600px;
  margin-bottom: 40px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const BounceArrow = styled(FiArrowDownCircle)`
  font-size: 48px;
  color: #ff6600;
  cursor: pointer;
`;

const GlobeIcon = styled(FaGlobe)`
  font-size: 64px;
  color: #E2E8F0;
  cursor: pointer;
  margin-top: 40px;
  animation: spin 10s linear infinite;
  @keyframes spin {
    100% {
      transform: rotateY(360deg);
    }
  }
`;

const Sidebar = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 40px;
  background: linear-gradient(to bottom, #1A202C, #2D3748); /* Gradient Background */
  box-shadow: -4px 0px 10px rgba(0, 0, 0, 0.2);
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-bottom: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
`;

const InspiredFrom = styled(motion.p)`
  font-size: 16px;
  color: #E2E8F0;
  margin: 0;
  margin-bottom: 10px;
`;

const HomePage: React.FC = () => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
      });
    }
  }, [controls, inView]);

  return (
    <HomeContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
      >
        Welcome to CpGuide
      </Title>
      <Description
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
      >
        Learn Competitive Programming with us!
      </Description>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <BounceArrow />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
      >
        Join us to learn Competitive Programming.
      </motion.p>
      <Sidebar
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, delay: 2.5, ease: "easeInOut" }}
      >
        <InspiredFrom>Inspired From:</InspiredFrom>
        <IconWrapper whileHover={{ scale: 1.1 }}>
          <SiCodeforces size={32} color="#E2E8F0" />
        </IconWrapper>
        <IconWrapper whileHover={{ scale: 1.1 }}>
          <SiLeetcode size={32} color="#E2E8F0" />
        </IconWrapper>
        {/* Add more 3D icons here */}
      </Sidebar>
      <GlobeIcon />
    </HomeContainer>
  );
};

export default HomePage;
