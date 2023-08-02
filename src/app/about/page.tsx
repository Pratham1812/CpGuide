"use client"

import { Container, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { FiCheckCircle } from "react-icons/fi";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Box } from "@mui/system";

// Define the dark theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#6B46C1",
    },
    secondary: {
      main: "#805AD5",
    },
    background: {
      default: "#1A202C",
    },
    text: {
      primary: "#E2E8F0",
    },
  },
  typography: {
    h4: {
      color: "#00bfff",
    },
  },
});

// Styled Container with Gradient Background
const StyledContainer = styled(Container)(({ theme }) => ({
  background: `linear-gradient(to bottom, #232323, ${theme.palette.background.default})`,
  padding: "2rem",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  color: "#fff",
}));

// Styled body with Background Color
const StyledBody = styled("div")(({ theme }) => ({
  background: theme.palette.background.default,
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function AboutPage() {
  return (
    <ThemeProvider theme={theme}>
      <StyledBody>
        <StyledContainer maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom>
            About CpGuide
          </Typography>
          <Typography variant="body1" gutterBottom>
            CpGuide is your ultimate companion in the world of Competitive Programming. Whether you are a seasoned
            competitive coder or just starting your journey, we are here to boost your problem-solving skills and
            algorithmic knowledge to new heights!
          </Typography>
          <Typography variant="body1" gutterBottom>
            At CpGuide, we offer a wide range of resources and tools to help you succeed in competitive programming
            challenges and coding competitions.
          </Typography>
          <Typography variant="body1" gutterBottom>
            What you can expect from CpGuide:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <FiCheckCircle style={{ color: theme.palette.secondary.main, marginRight: "8px" }} />
              </ListItemIcon>
              <ListItemText primary="Comprehensive Competitive Programming Courses" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FiCheckCircle style={{ color: theme.palette.secondary.main, marginRight: "8px" }} />
              </ListItemIcon>
              <ListItemText primary="A Vast Collection of Practice Problems" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FiCheckCircle style={{ color: theme.palette.secondary.main, marginRight: "8px" }} />
              </ListItemIcon>
              <ListItemText primary="Interactive Coding Challenges" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FiCheckCircle style={{ color: theme.palette.secondary.main, marginRight: "8px" }} />
              </ListItemIcon>
              <ListItemText primary="Regular Updates with Latest Algorithms" />
            </ListItem>
          </List>
          <Typography variant="body1">
            Our mission is to equip you with the skills and confidence to conquer any competitive programming contest and
            excel in technical interviews.
          </Typography>
        </StyledContainer>
      </StyledBody>
    </ThemeProvider>
  );
}
