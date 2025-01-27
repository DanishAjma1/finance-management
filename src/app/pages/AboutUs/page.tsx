import React from "react";
import { Container, Grid2, Typography, Box, Divider, Link } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const AboutUs = () => {
  return (
    <Container sx={{ padding: 4 }}>
      {/* About Us Intro Section */}
      <Box sx={{
        backgroundColor: "white", 
        padding: 4, 
        borderRadius: 2, 
        boxShadow: 3, 
        marginBottom: 4 // Adds some space after the intro box
      }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
          About Us
        </Typography>
        <Typography variant="h6" paragraph sx={{ textAlign: "center" }}>
          We are a passionate team committed to delivering high-quality software solutions. Our mission is to help businesses
          thrive by providing innovative products and services. We believe in the power of technology to change the world and are
          always looking for new ways to push the boundaries of what is possible.
        </Typography>
      </Box>

      <Divider sx={{ marginY: 4 }} />

      <div> {/* Single wrapper div for all content */}
        <Grid2 container spacing={4}>
          {/* "What We Do" Section */}
          <Grid2 size={{xs:12, sm:6}}>
            <Box sx={{
              backgroundColor: "white", 
              padding: 4, 
              borderRadius: 2, 
              boxShadow: 3 
            }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 2,
                  color: "#333", // Dark text color for readability
                }}
              >
                What We Do
              </Typography>
              <Typography variant="h6" gutterBottom>
                Track Expenses:
              </Typography>
              <Typography paragraph>
                Monitor your spending in real-time and identify areas to save.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Set Budgets:
              </Typography>
              <Typography paragraph>
                Create customized budgets tailored to your needs and goals.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Plan Financial Goals:
              </Typography>
              <Typography paragraph>
                From buying your dream home to building your retirement fund, we’re here to help you achieve your aspirations.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Invest Wisely:
              </Typography>
              <Typography paragraph>
                Get insights and suggestions to make informed investment decisions.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Stay Secure:
              </Typography>
              <Typography paragraph>
                Your financial data is safeguarded with top-notch encryption and security measures.
              </Typography>
            </Box>
          </Grid2>

          {/* "Why Choose Us" Section */}
          <Grid2 size={{xs:12, sm:6}}>
            <Box sx={{
              backgroundColor: "white", 
              padding: 4, 
              borderRadius: 2, 
              boxShadow: 3 
            }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 2,
                  color: "#333", // Dark text color for readability
                }}
              >
                Why Choose Us
              </Typography>
              <Typography variant="h6" gutterBottom>
                User-Friendly Design:
              </Typography>
              <Typography paragraph>
                Navigate with ease, no matter your financial expertise.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Personalized Insights:
              </Typography>
              <Typography paragraph>
                Receive tailored advice and insights based on your financial habits.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Cross-Platform Access:
              </Typography>
              <Typography paragraph>
                Manage your finances anytime, anywhere, on any device.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Commitment to Excellence:
              </Typography>
              <Typography paragraph>
                Continuous updates and improvements to meet your growing needs.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Top-Tier Security:
              </Typography>
              <Typography paragraph>
                We prioritize your financial privacy with state-of-the-art encryption and security measures to protect your sensitive data.
              </Typography>
            </Box>
          </Grid2>
        </Grid2>

        <Divider sx={{ marginY: 4 }} />

        <Grid2 container spacing={4}>
          {/* "Our Vision" Section */}
          <Grid2 size={{xs:12, sm:6}}>
            <Box sx={{
              backgroundColor: "white", 
              padding: 4, 
              borderRadius: 2, 
              boxShadow: 3 
            }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 2,
                  color: "#333", // Dark text color for readability
                }}
              >
                Our Vision
              </Typography>
              <Typography paragraph>
                We envision a world where financial freedom is accessible to everyone. Through innovation and user-centric design, [Your
                App Name] aims to simplify personal finance and make financial literacy a standard for all.
              </Typography>
            </Box>
          </Grid2>

          {/* "Join Us on This Journey" Section */}
          <Grid2 size={{xs:12, sm:6}}>
            <Box sx={{
              backgroundColor: "white", 
              padding: 4, 
              borderRadius: 2, 
              boxShadow: 3 
            }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: 2,
                  color: "#333", // Dark text color for readability
                }}
              >
                Join Us on This Journey
              </Typography>
              <Typography paragraph>
                Whether you're looking to save more, invest smarter, or simply get better at managing your money, [Your App Name] is here to
                support you every step of the way. Together, let’s create a future where financial stress is a thing of the past.
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </div> {/* End of single wrapper div */}

      {/* Footer Section */}
      <Box sx={{
        backgroundColor: "black", 
        padding: 4, 
        color: "white",
        borderRadius: 2, 
        boxShadow: 3, 
        marginTop: 4
      }}>
        <Container>
          <Grid2 container spacing={4} justifyContent="space-between">
            {/* Footer Column 1: About */}
            <Grid2 size={{xs:12, sm:3}}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
                About Us
              </Typography>
              <Typography variant="body2" paragraph sx={{ textAlign: "center" }}>
                We are committed to providing innovative financial solutions to help you manage your finances better.
              </Typography>
            </Grid2>

            {/* Footer Column 2: Quick Links */}
            <Grid2 size={{xs:12, sm:3}}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
                Quick Links
              </Typography>
              <Box sx={{ textAlign: "center" }}>
                <Link href="#" color="inherit" sx={{ display: 'block',textDecoration:'none', marginBottom: 1 }}>
                  Home
                </Link>
                <Link href="#about" color="inherit" sx={{ display: 'block',textDecoration:'none', marginBottom: 1 }}>
                  About Us
                </Link>
                <Link href="#services" color="inherit" sx={{ display: 'block',textDecoration:'none', marginBottom: 1 }}>
                  Services
                </Link>
                <Link href="#contact" color="inherit" sx={{ display: 'block',textDecoration:'none' }}>
                  Contact Us
                </Link>
              </Box>
            </Grid2>

            {/* Footer Column 3: Follow Us */}
            <Grid2 size={{xs:12, sm:3}}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
                Follow Us
              </Typography>
              <Box sx={{ textAlign: "center" }}>
                <Link href="https://www.instagram.com/u_n_24_01?igsh=cWdicHV6ZmUxeDNi&utm_source=qr" target="_blank" color="inherit" sx={{ margin: 1 }}>
                  <Facebook />
                </Link>
                <Link href="https://www.twitter.com" target="_blank" color="inherit" sx={{ margin: 1 }}>
                  <Twitter />
                </Link>
                <Link href="https://www.instagram.com" target="_blank" color="inherit" sx={{ margin: 1 }}>
                  <Instagram />
                </Link>
                <Link href="https://www.linkedin.com" target="_blank" color="inherit" sx={{ margin: 1 }}>
                  <LinkedIn />
                </Link>
              </Box>
            </Grid2>

            {/* Footer Column 4: Contact */}
            <Grid2 size={{xs:12, sm:3}}>
              <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                danishajmalbutt@gmail.com
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                umarnadeem24@icloud.com
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Phone: +45 2199 7481
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                Phone: +92 318 7325159
              </Typography>
            </Grid2>
          </Grid2>

          <Divider sx={{ marginY: 4 }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2">
              &copy; {new Date().getFullYear()} Finance Management System. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Container>
  );
};

export default AboutUs;
