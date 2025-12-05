import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
  import { keyframes } from "@mui/system";
import { motion } from "framer-motion";
import Slider from "react-slick"; // npm install react-slick slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Fab,
  CircularProgress,
    Zoom,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  TextField,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShareIcon from "@mui/icons-material/Share";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

// 🎨 Hauptthema
const theme = createTheme({
  palette: {
    primary: { main: "#25D366" },
    secondary: { main: "#1e88e5" },
    background: { default: "#f7f7f7" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    body1: { color: "#555" },
  },
});

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  // 🔽 States für das mobile Menü
  const [anchorEl, setAnchorEl] = useState(null);
 const [open, setOpen] = useState(false);
  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
const [openMegaMenu, setOpenMegaMenu] = useState(false);

let closeTimeout = null;

const openMenu = () => {
  if (closeTimeout) clearTimeout(closeTimeout);
  setOpenMegaMenu(true);
};

const closeMenu = () => {
  // 150ms Delay verhindert unerwünschtes Schließen
  closeTimeout = setTimeout(() => {
    setOpenMegaMenu(false);
  }, 150);
};

  // 🔽 Sanfter Scroll zu Sektionen
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    handleClose();
  };

    const paymentLogos = [
    { src: "/logos/paypal.png", alt: "PayPal" },
    { src: "/logos/apple-pay.png", alt: "Apple Pay" },
    { src: "/logos/google-pay.png", alt: "Google Pay" },
    { src: "/logos/visa.png", alt: "VISA" },
    { src: "/logos/mastercard.png", alt: "MasterCard" },
    { src: "/logos/sepa.png", alt: "SEPA Lastschrift" },
    { src: "/logos/klarna.png", alt: "Klarna" },
    { src: "/logos/maestro.png", alt: "Maestro" },
  ];

   const items = [
    { number: "+35%", text: "mehr Bestellungen durch einfaches Self-Ordering", icon: "📈" },
    { number: "−50%", text: "weniger Wartezeit für Gäste", icon: "⏱️" },
    { number: "−20%", text: "geringerer Personaleinsatz im Service", icon: "👩‍🍳" },
    { number: "+15%", text: "höherer durchschnittlicher Bestellwert", icon: "💶" },
    { number: "+10%", text: "mehr Trinkgeld durch schnelleren Service", icon: "💁‍♂️" },
    { number: "100%", text: "zufriedenere Gäste durch transparente Abläufe", icon: "🌟" },
  ];

  // Intro nach 5s automatisch schließen
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);


// Keyframes für Animationen
const zoomIn = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.08); }
`;

  const shopUrls = [
    "https://restaurantmarrakesch.de/",
    "https://www.plantpowerfastfood.com/",
    "https://pizzeria-roma.gastrosoft.app/",];
    

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    arrows: false,
    pauseOnHover: true,
  };

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* 🌟 Intro-Bildschirm mit Video */}
      {showIntro && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "black",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: { xs: "90%", sm: "70%", md: "50%" },
              aspectRatio: "16/9",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 0 40px rgba(0,0,0,0.6)",
            }}
          >
            <ReactPlayer
              url="/intro.mp4" // 🎥 lokales Video unter /public
              playing
              muted
              width="100%"
              height="100%"
              onReady={() => setVideoReady(true)}
              onEnded={() => {
                const fade = document.getElementById("intro-screen");
                if (fade) {
                  fade.style.opacity = 0;
                  setTimeout(() => setShowIntro(false), 800);
                } else {
                  setShowIntro(false);
                }
              }}
            />
          </Box>

          {!videoReady && (
            <CircularProgress sx={{ color: "white", mt: 3 }} />
          )}

          {/* Button "Video überspringen" */}
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "white",
              mt: 3,
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              py: 0.8,
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
            onClick={() => setShowIntro(false)}
          >
            Video überspringen
          </Button>
        </Box>
      )}

      {/* 🌐 Hauptinhalt (sichtbar nach dem Video) */}
      {!showIntro && (
        <>
          {/* 🔝 HEADER — nur sichtbar, wenn das mobile Menü nicht offen ist */}
          {!anchorEl && (
               <AppBar
      position="fixed"
      sx={{
        bgcolor: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        color: "#0B2341",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        px: { xs: 2, md: 8 },
        transition: "all 0.4s ease",
        zIndex: 20,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          py: 1.5,
          px: { xs: 2, md: 6 },
        }}
      >
        {/* 🍽️ LOGO */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            component="img"
            src="/logoGastroTransparent.png"
            alt="Gastro Soft Logo"
            sx={{
              height: { xs: 50, md: 60 },
              cursor: "pointer",
              transition: "transform 0.4s ease, filter 0.4s ease",
              "&:hover": {
                transform: "scale(1.06)",
                filter: "drop-shadow(0 4px 8px rgba(37,211,102,0.3))",
              },
            }}
          />
        </Box>

        {/* 🧭 NAVIGATION */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Leistungen mit Mega-Menü */}
          <Box
            onMouseEnter={() => setOpenMegaMenu(true)}
            onMouseLeave={() => setOpenMegaMenu(false)}
            sx={{ position: "relative" }}
          >
            <Button
    onMouseEnter={openMenu}
    onMouseLeave={closeMenu}
    sx={{
      fontWeight: 700,
      color: "#0B2341",
      textTransform: "none",
      position: "relative",
      fontSize: "1.05rem",
      letterSpacing: "0.3px",
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: -6,
        left: 0,
        width: 0,
        height: 2,
        bgcolor: "#25D366",
        transition: "width 0.3s ease",
        borderRadius: 1,
      },
      "&:hover::after": { width: "100%" },
    }}
  >
    Leistungen
  </Button>

           {openMegaMenu && (
<Paper
  elevation={0}
  onMouseEnter={openMenu}
  onMouseLeave={closeMenu}
  sx={{
    position: "absolute",
    top: "100%",
    left: 0,
    mt: 1,
    p: 4,
    width: "900px",
    borderRadius: "20px",
    display: "flex",
    gap: 6,

    /* 🌟 Glass-Effect */
    backgroundColor: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(14px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.6)",

    /* 🌟 Premium Shadow */
    boxShadow:
      "0 8px 30px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",

    /* 💫 Subtle fade-in */
    animation: "fadeIn 0.35s ease",

    /* 🔥 Slight border-glow on hover */
    transition: "all 0.25s ease",
    "&:hover": {
      boxShadow:
        "0 12px 40px rgba(0,0,0,0.12), 0 6px 18px rgba(0,0,0,0.06)",
      border: "1px solid rgba(255,255,255,0.85)",
    },
  }}
>

                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 2, color: "#25D366" }}
                  >
                    Leistungen
                  </Typography>

                  {[
                    { label: "Self Ordering", id: "self-ordering" },
                    { label: "Kiosk", id: "kiosk" },
                    { label: "Webshop", id: "webshop" },
                    { label: "Tisch Reservierungen", id: "tischreservierungen" },
                    { label: "Abholbildschirme", id: "abholbildschirme" },
                  ].map((item) => (
                    <Typography
                      key={item.id}
                      onClick={() => handleScrollTo(item.id)}
                      sx={{
                        cursor: "pointer",
                        color: "#0B2341",
                        mb: 1.2,
                        position: "relative",
                        width: "fit-content",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          bottom: "-2px",
                          width: "0%",
                          height: "2px",
                          backgroundColor: "#25D366",
                          transition: "width 0.3s ease",
                        },
                        "&:hover::after": {
                          width: "100%",
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  ))}
                </Box>



                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 2, color: "#25D366" }}
                  >
                    Bereiche
                  </Typography>
                  {[
                    "Quick Service",
                    "Messe",
                    "Arena & Stadion",
                    "Hotel",
                    "Biergarten",
                    "Erlebnisgastronomie",
                  ].map((bereich) => (
                    <Typography
                      key={bereich}
                      sx={{
                        cursor: "pointer",
                        color: "#0B2341",
                        mb: 1.2,
                        "&:hover": { color: "#25D366", pl: 0.5 },
                        transition: "all 0.2s ease",
                      }}
                    >
                      {bereich}
                    </Typography>
                  ))}
                </Box>

                {/* 💡 CTA im Mega-Menü */}
                <Box
                  sx={{
                    flex: 1.4,
                    backgroundImage: 'url("/images/umsatzplus.jpg")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 2,
                    color: "white",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: "rgba(0,0,0,0.4)",
                      borderRadius: 2,
                    }}
                  />
                  <Box sx={{ position: "relative", zIndex: 1 }}>
                    <Typography variant="h6" fontWeight={800}>
                      Berechne dein Umsatzplus
                    </Typography>
                    <Typography sx={{ mt: 1, fontSize: "0.9rem" }}>
                      Erfahre, wie du mit Gastro Soft deinen Umsatz steigerst.
                    </Typography>
                    <Button
                      variant="text"
                      sx={{
                        mt: 1.5,
                        color: "#25D366",
                        fontWeight: 700,
                        textTransform: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Jetzt berechnen →
                    </Button>
                  </Box>
                </Box>
              </Paper>
            )}
          </Box>

          {/* Andere Menüpunkte */}
          {[
            { label: "Kassensysteme", id: "pos" },
            { label: "Über uns", id: "ueberuns" },
            { label: "Kontakt", id: "nav" },
          ].map((item) => (
            <Button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              sx={{
                fontWeight: 700,
                color: "#0B2341",
                fontSize: "1.05rem",
                textTransform: "none",
                "&:hover": {
                  color: "#25D366",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* 🌍 CTA + Sprache */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {["DE", "EN"].map((lang, i) => (
              <React.Fragment key={lang}>
                <Typography
                  variant="body2"
                  sx={{
                    display: { xs: "none", sm: "flex" }, // 👈 ab Tablet sichtbar
                    fontWeight: 600,
                    color: "#0B2341",
                    cursor: "pointer",
                    "&:hover": { color: "#25D366" },
                  }}
                >
                  {lang}
                </Typography>
                {i === 0 && (
                  <Typography sx={{ color: "gray", display: { xs: "none", sm: "block" } }}>
                    |
                  </Typography>
                )}

              </React.Fragment>
            ))}
          </Box>

{/* Mobile Button (XS–SM) */}
<Button
  variant="contained"
  href="https://wa.me/212600000000?text=Hallo%20GastroSoft!"
  target="_blank"
  sx={{
    display: { xs: "flex", md: "none" }, // 👉 nur auf Mobile sichtbar
    bgcolor: "linear-gradient(90deg, #25D366, #1ebe5d)",
    color: "white",
    fontWeight: 700,
    borderRadius: "999px",
    px: 2.2,          // kleiner
    py: 0.9,          // kompakt
    fontSize: "0.85rem",
    boxShadow: "0 5px 12px rgba(37,211,102,0.25)",
    textTransform: "none",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 6px 16px rgba(37,211,102,0.35)",
    },
  }}
>
  Jetzt testen
</Button>

{/* Desktop Button (MD+) */}
<Button
  variant="contained"
  href="https://wa.me/212600000000?text=Hallo%20GastroSoft!"
  target="_blank"
  sx={{
    display: { xs: "none", md: "flex" }, // 👉 nur Desktop sichtbar
    bgcolor: "linear-gradient(90deg, #25D366, #1ebe5d)",
    color: "white",
    fontWeight: 700,
    borderRadius: "999px",
    px: 3.5,
    py: 1.2,
    fontSize: "1rem",
    boxShadow: "0 6px 16px rgba(37,211,102,0.3)",
    textTransform: "none",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 20px rgba(37,211,102,0.4)",
    },
  }}
>
  Kostenlos testen
</Button>



          <IconButton
            color="inherit"
            onClick={() => setAnchorEl(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
          )}

    {/* Mobiles Vollbild-Menü */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton color="inherit" onClick={handleMenu}>
          <MenuIcon sx={{ fontSize: 28 }} />
        </IconButton>

        {anchorEl && (
          <Box
          sx={{
            position: "fixed",
            inset: 0,
            background: "linear-gradient(160deg, #081A2B 0%, #0B2341 60%, #071523 100%)", // 👈 Fix!
            color: "white",
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            pt: 6,
            px: 3,
            overflowY: "auto",
            animation: "fadeIn 0.4s ease",
          }}
          onClick={handleClose}
        >


      {/* Header des Menüs (Logo + Sprachen) */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 8,
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/logo-transparent.png"
          alt="GastroSoft Logo"
          sx={{
            height: { xs: 55, sm: 65, md: 75 },
            width: "auto",
            mr: 1,
            cursor: "pointer",
            filter:
              "drop-shadow(0 3px 6px rgba(0,0,0,0.3)) brightness(1.1)",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.1)" },
          }}
        />

        {/* Sprachwahl */}
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <Typography
            sx={{
              color: "#25D366",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            DE
          </Typography>
          <Typography sx={{ color: "#555" }}>|</Typography>
          <Typography
            sx={{
              color: "white",
              opacity: 0.8,
              fontWeight: 500,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            EN
          </Typography>
        </Box>
      </Box>

      {/* Menülinks */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {[
          { id: "how-it-works", label: "Wie es funktioniert" },
          { id: "solutions", label: "Unsere Lösungen" },
          { id: "tarifs", label: "Preise" },
          { id: "about", label: "Über uns" },
        ].map((item) => (
          <Button
            key={item.id}
            onClick={(e) => {
              e.stopPropagation();
              handleScrollTo(item.id);
            }}
            sx={{
              color: "white",
              justifyContent: "space-between",
              width: "100%",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              pb: 1,
              "&:hover": {
                color: "#25D366",
                transform: "translateX(4px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {item.label}
            <span style={{ fontSize: "1.5rem", marginLeft: "8px" }}>›</span>
          </Button>
        ))}
      </Box>

      {/* Schließen + CTA nebeneinander */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 6,
          gap: 1.5,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            color: "white",
            borderColor: "rgba(255,255,255,0.3)",
            fontSize: "0.95rem",
            textTransform: "none",
            borderRadius: "999px",
            px: 3,
            py: 1,
            fontWeight: 500,
            transition: "all 0.3s ease",
            "&:hover": {
              color: "#25D366",
              borderColor: "#25D366",
              backgroundColor: "rgba(37,211,102,0.08)",
              transform: "scale(1.05)",
            },
          }}
        >
          ✕ Menü schließen
        </Button>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#25D366",
            color: "white",
            fontWeight: 600,
            borderRadius: "999px",
            px: 3,
            py: 1,
            boxShadow: "0 4px 14px rgba(37,211,102,0.4)",
            "&:hover": {
              bgcolor: "#1ebe5d",
              transform: "scale(1.05)",
              boxShadow: "0 6px 18px rgba(37,211,102,0.5)",
            },
            transition: "all 0.3s ease",
          }}
          href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!"
          target="_blank"
        >
          Kostenlos testen
        </Button>
      </Box>
    </Box>
    )}
  </Box>


          {/* 🩺 HERO SECTION — Text links, Bild rechts, Buttons (gleiches Layout) */}
 <Box
  sx={{
    position: "relative",
    color: "white",
    overflow: "hidden",
    pt: { xs: 10, md: 22 },  // kleineres Padding oben für Mobile
    pb: { xs: 8, md: 20 },   // kleineres Padding unten für Mobile
    px: { xs: 2, md: 10 },   // kompaktere seitliche Abstände für Mobile
  }}
>
  {/* Animiertes Hintergrundbild */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      backgroundImage: "url('/hero.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      animation: `${zoomIn} 20s ease-in-out infinite alternate`,
      transformOrigin: "center",
      zIndex: 0,
    }}
  />

  {/* Overlay */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      bgcolor: "rgba(0,0,0,0.55)",
      zIndex: 1,
    }}
  />

  {/* Content */}
  <Container
    maxWidth="lg"
    sx={{
      position: "relative",
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: { xs: "center", md: "flex-start" },
      textAlign: { xs: "center", md: "left" },
      animation: `${fadeInUp} 1.2s ease-out forwards`,
    }}
  >
    <Typography
      variant="overline"
      sx={{
        color: "#25D366",
        fontWeight: 600,
        letterSpacing: 1.2,
        mb: { xs: 1.5, md: 2 },
        fontSize: { xs: "0.7rem", md: "0.875rem" },
        textTransform: "uppercase",
      }}
    >
      Für Restaurants & Cafés von heute
    </Typography>

    <Typography
      variant="h2"
      sx={{
        fontWeight: 800,
        fontSize: { xs: "1.8rem", md: "3.6rem" }, // kleiner auf Mobile
        mb: { xs: 2, md: 3 },
        lineHeight: 1.2,
      }}
    >
      Wenn Service knapp ist,<br />springt Gastrosoft ein.
    </Typography>

    <Typography
      variant="h5"
      sx={{
        fontWeight: 400,
        color: "rgba(255,255,255,0.95)",
        mb: { xs: 3, md: 4 },
        maxWidth: { xs: "90%", md: 600 },
        fontSize: { xs: "0.9rem", md: "1.25rem" }, // kleiner für Mobile
        lineHeight: 1.4,
      }}
    >
      Digital bestellen. Schnell bezahlen. Entspannt genießen. <br />
      <strong>Gastrosoft</strong> – die smarte Lösung für moderne Restaurants & Cafés.
    </Typography>

    <Button
      variant="contained"
      sx={{
        bgcolor: "#25D366",
        color: "white",
        fontWeight: 700,
        fontSize: { xs: "0.9rem", md: "1.1rem" }, // kleiner auf Mobile
        borderRadius: "50px",
        px: { xs: 4, md: 5 },
        py: { xs: 1, md: 1.5 },
        "&:hover": { bgcolor: "#1ebe5d" },
      }}
      href="https://wa.me/49123456789?text=Hallo%20Gastrosoft!"
      target="_blank"
    >
      Jetzt Gastrosoft entdecken
    </Button>
  </Container>
</Box>


         
        </>
      )}

  


{/* 🔄 Self Ordering */}
<Box
  id="self-ordering"
  sx={{
    py: { xs: 12, md: 16 },
    bgcolor: "rgba(37,211,102,0.05)",
    position: "relative",
    overflow: "hidden",
  }}
>

  {/* 📱 MOBILE LAYOUT (Titel → Bild → Beschreibung) */}
    {/* 📱 MOBILE LAYOUT */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 3, // weniger Abstand für Mobile
      px: 2, // Padding für kleine Screens
    }}
  >
    {/* Titel */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontSize: "0.8rem",
        }}
      >
        Digital bestellen leicht gemacht
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: "1.6rem",
          lineHeight: 1.3,
          mt: 1,
          mb: 2,
          color: "#0b2341",
        }}
      >
        Self-Ordering mit QR-Code – <br />
        schnell, einfach & kontaktlos
      </Typography>
    </motion.div>

    {/* Bild */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Box
        component="img"
        src="/selfordering.png"
        alt="Self-Ordering App auf iPhone"
        sx={{
          width: "100%",
          maxWidth: 320, // kleiner für Mobile
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
          transform: "rotate(-4deg)",
          transition: "transform 0.5s ease",
          "&:hover": {
            transform: "rotate(0deg) scale(1.03)",
          },
        }}
      />
    </motion.div>

    {/* Beschreibung */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ maxWidth: 360 }}
    >
      <Typography
        sx={{
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: "rgba(0,0,0,0.75)",
          mb: 3,
        }}
      >
        Mit <strong>Gastrosoft QR-Ordering</strong> bestellen deine Gäste bequem vom Tisch aus – ohne auf den Kellner warten zu müssen.  
        QR-Code scannen, digitale Speisekarte sehen, bestellen und direkt bezahlen.  
        <br /><br />
        Bestellung fertig → automatische <strong>WhatsApp-Benachrichtigung</strong> oder Anzeige auf dem <strong>Abholbildschirm</strong>.  
        <br /><br />
        Wartezeiten reduzieren, Bestellfrequenz erhöhen, Team entlasten – ideal bei <strong>Kellnermangel</strong> oder hohem Gästeaufkommen.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1rem",
          px: 4,
          py: 1.2,
          borderRadius: "50px",
          boxShadow: "0 6px 20px rgba(37,211,102,0.25)",
          "&:hover": {
            bgcolor: "#1ebe5d",
            transform: "translateY(-3px)",
          },
          width: "100%", // Button auf Mobile volle Breite
          maxWidth: 280,
          mx: "auto",
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!"
        target="_blank"
      >
        Jetzt Self-Ordering testen
      </Button>
    </motion.div>
  </Container>

  {/* 💻 DESKTOP LAYOUT (Bild links, Text rechts) */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
  >
    {/* Bild links */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src="/selfordering.png"
        alt="Self-Ordering App auf iPhone"
        sx={{
          width: "100%",
          maxWidth: 460,
          borderRadius: "30px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
          transform: "rotate(-4deg)",
          transition: "transform 0.5s ease",
          "&:hover": {
            transform: "rotate(0deg) scale(1.03)",
          },
        }}
      />
    </motion.div>

    {/* Text rechts */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        Digital bestellen leicht gemacht
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: { md: "2.8rem" },
          lineHeight: 1.2,
          mb: 3,
          color: "#0b2341",
        }}
      >
        Self-Ordering mit QR-Code –  
        <br />
        schnell, einfach & kontaktlos
      </Typography>

      <Typography
        sx={{
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "rgba(0,0,0,0.75)",
          mb: 4,
          maxWidth: 550,
        }}
      >
        Mit <strong>Gastrosoft QR-Ordering</strong> bestellen deine Gäste ganz bequem
        vom Tisch aus – ohne auf den Kellner warten zu müssen.  
        Sie scannen einfach den QR-Code, sehen deine digitale Speisekarte,
        bestellen und bezahlen direkt per Karte oder Bar.  

        <br /><br />
        Sobald die Bestellung fertig ist, erhält der Gast automatisch eine 
        <strong> WhatsApp-Benachrichtigung </strong> oder sieht seine Nummer auf dem 
        <strong> Abholbildschirm </strong> – ganz ohne manuelle Zwischenrufe oder Wartechaos.  

        <br /><br />
        So reduzierst du Wartezeiten, erhöhst die Bestellfrequenz
        und entlastest dein Team – ideal bei <strong>Kellnermangel</strong> oder hohem Gästeaufkommen.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1.1rem",
          px: 5,
          py: 1.5,
          borderRadius: "50px",
          boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
          "&:hover": {
            bgcolor: "#1ebe5d",
            transform: "translateY(-4px)",
          },
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!"
        target="_blank"
      >
        Jetzt Self-Ordering testen
      </Button>
    </motion.div>
  </Container>

  {/* 🌿 Hintergrund-Deko */}
  <motion.div
    style={{
      position: "absolute",
      top: "10%",
      right: "-5%",
      width: 300,
      height: 300,
      borderRadius: "50%",
      background: "rgba(37,211,102,0.1)",
      filter: "blur(60px)",
    }}
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.6, 0.8, 0.6],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</Box>


{/* 🔥 KSD – Digitaler Küchenmonitor */}
<Box
  id="ksd-monitor"
  sx={{
    py: { xs: 12, md: 16 },
    bgcolor: "rgba(37,211,102,0.05)",
    position: "relative",
    overflow: "hidden",
  }}
>

  {/* 📱 MOBILE LAYOUT */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 3,
      px: 2,
    }}
  >

    {/* Titel */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          letterSpacing: 1.2,
          fontSize: "0.8rem",
        }}
      >
        Moderne Küche. Digital organisiert.
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: "1.6rem",
          lineHeight: 1.3,
          mt: 1,
          mb: 2,
          color: "#0b2341",
        }}
      >
        KSD – Dein digitaler Küchenmonitor  
        für schnelle & fehlerfreie Abläufe
      </Typography>
    </motion.div>

    {/* Bild */}
 
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  style={{ width: "100%", display: "flex", justifyContent: "center" }}
>
  <Box
    component="img"
    src="/ksd.png"
    alt="Self-Ordering App auf iPhone"
    sx={{
      width: { xs: "90%", sm: "80%", md: "70%" },   // <-- deutlich größer auf kleinen Screens
      maxWidth: { xs: 420, sm: 480, md: 520 },      // <-- Mobile: bis zu 420px groß
      borderRadius: "20px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
      transform: "rotate(-4deg) scale(1.08)",       // <-- Grund-Zoom für bessere Sichtbarkeit
      transformOrigin: "center",
      transition: "transform 0.5s ease",
      "&:hover": {
        transform: "rotate(0deg) scale(1.12)",
      },
    }}
  />
</motion.div>


    {/* Beschreibung */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ maxWidth: 360 }}
    >
      <Typography
        sx={{
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: "rgba(0,0,0,0.75)",
          mb: 3,
        }}
      >
        Unser <strong>KSD Küchenmonitor</strong> bringt deine Küche in das moderne
        Gastro-Zeitalter – komplett <strong>ohne Küchen­drucker</strong>, wenn du willst.  
        Bestellungen erscheinen sekundenschnell digital, übersichtlich und sortiert nach Bereich.  

        <br /><br />
        Keine Bons mehr, kein Papierchaos, keine verlorenen Bestellungen.  
        KSD passt perfekt zu einer effizienten, schnellen Küche und reduziert Fehler auf ein Minimum.

        <br /><br />
        Auf Wunsch kannst du trotzdem <strong>Küchendrucker integrieren</strong> – flexibel, wie deine Küche es braucht.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1rem",
          px: 4,
          py: 1.2,
          borderRadius: "50px",
          boxShadow: "0 6px 20px rgba(37,211,102,0.25)",
          "&:hover": { bgcolor: "#1ebe5d", transform: "translateY(-3px)" },
          width: "100%",
          maxWidth: 280,
          mx: "auto",
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!"
        target="_blank"
      >
        KSD jetzt kennenlernen
      </Button>
    </motion.div>
  </Container>

  {/* 💻 DESKTOP LAYOUT (Bild links, Text rechts) */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
  >

    {/* Bild */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1, display: "flex", justifyContent: "center" }}
    >
  <Box
  component="img"
  src="/ksd.png"
  alt="Digitaler Küchenmonitor"
  sx={{
    width: "100%",
    maxWidth: 600,        // <-- vorher 460, jetzt größer
    borderRadius: "30px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
    transform: "rotate(-3deg)",
    transition: "transform 0.5s ease",
    "&:hover": { transform: "rotate(0deg) scale(1.03)" },
  }}
/>

    </motion.div>

    {/* Text */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          letterSpacing: 1.5,
        }}
      >
        Moderne Küchenorganisation
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: { md: "2.8rem" },
          lineHeight: 1.2,
          mb: 3,
          color: "#0b2341",
        }}
      >
        KSD – Digitaler Küchenmonitor  
        für maximale Effizienz & Klarheit
      </Typography>

      <Typography
        sx={{
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "rgba(0,0,0,0.75)",
          mb: 4,
          maxWidth: 550,
        }}
      >
        Mit dem <strong>KSD Küchenmonitor</strong> laufen Bestellungen digital,
        übersichtlich und ohne Verzögerung in deiner Küche ein.  
        Ideal für moderne Konzepte wie <strong>Self-Ordering, Thekenservice,
        Schnellrestaurants, Foodcourts</strong> und mehr.

        <br /><br />
        Verabschiede dich vom Papierchaos:  
        <strong>100% digital, kein Drucker notwendig</strong> – außer du möchtest einen.

        <br /><br />
        KSD sorgt für weniger Fehler, schnellere Abläufe und ein ruhigeres,
        strukturierteres Team – selbst bei hohem Bestellaufkommen.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1.1rem",
          px: 5,
          py: 1.5,
          borderRadius: "50px",
          boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
          "&:hover": { bgcolor: "#1ebe5d", transform: "translateY(-4px)" },
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!"
        target="_blank"
      >
        KSD live sehen
      </Button>
    </motion.div>
  </Container>

  {/* 🌿 Hintergrund-Deko */}
  <motion.div
    style={{
      position: "absolute",
      top: "10%",
      right: "-5%",
      width: 300,
      height: 300,
      borderRadius: "50%",
      background: "rgba(37,211,102,0.1)",
      filter: "blur(60px)",
    }}
    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
</Box>


{/* 💫 Kiosk-System */}
<Box
  id="kiosk"
  sx={{
    py: { xs: 12, md: 16 },
    bgcolor: "rgba(37,211,102,0.05)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* 📱 MOBILE LAYOUT */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 3, // etwas kompakter auf Mobile
      px: 2,
    }}
  >
    {/* Titel */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontSize: "0.8rem",
        }}
      >
        Modernes Bestellen am Kiosk
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: "1.6rem",
          lineHeight: 1.3,
          mt: 1,
          mb: 2,
          color: "#0b2341",
        }}
      >
        Das <strong>Gastrosoft Kiosk-System</strong> – <br />
        schnell, effizient & intuitiv
      </Typography>
    </motion.div>

    {/* Bild */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Box
        component="img"
        src="/kiosk-gastrosoft.png"
        alt="Gastrosoft Kiosk-System"
        sx={{
          width: "100%",
          maxWidth: 320, // kleiner für Mobile
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
          transform: "rotate(1deg)",
          transition: "transform 0.5s ease",
          "&:hover": {
            transform: "rotate(0deg) scale(1.03)",
          },
        }}
      />
    </motion.div>

    {/* Beschreibung */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ maxWidth: 360 }}
    >
      <Typography
        sx={{
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: "rgba(0,0,0,0.75)",
          mb: 3,
        }}
      >
        Dein <strong>Kiosk-System</strong> ermöglicht es Gästen, direkt im Restaurant
        selbst zu bestellen – ganz ohne Warteschlange.  
        Nahtlos verbunden mit deiner <strong>Gastrosoft-Kasse</strong>, fließen Bestellungen automatisch ins Küchensystem.  
        <br /><br />
        Ob zur <strong>Mittagszeit</strong> oder bei <strong>großem Andrang</strong> – dein Team bleibt entlastet, während Gäste schnell und kontaktlos bestellen und bezahlen.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1rem",
          px: 4,
          py: 1.2,
          borderRadius: "50px",
          boxShadow: "0 6px 20px rgba(37,211,102,0.25)",
          "&:hover": {
            bgcolor: "#1ebe5d",
            transform: "translateY(-3px)",
          },
          width: "100%", // volle Breite auf Mobile
          maxWidth: 280,
          mx: "auto",
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!%20Ich%20möchte%20mehr%20über%20das%20Kiosk-System%20erfahren."
        target="_blank"
      >
        Jetzt Kiosk-System entdecken
      </Button>
    </motion.div>
  </Container>

  {/* 💻 DESKTOP LAYOUT (wie bisher) */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
  >
    {/* ✨ Textbereich links */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        Modernes Bestellen am Kiosk
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: { md: "2.8rem" },
          lineHeight: 1.2,
          mb: 3,
          color: "#0b2341",
        }}
      >
        Das <strong>Gastrosoft Kiosk-System</strong> –  
        <br />
        schnell, effizient & intuitiv
      </Typography>

      <Typography
        sx={{
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "rgba(0,0,0,0.75)",
          mb: 4,
          maxWidth: 550,
        }}
      >
        Dein <strong>Kiosk-System</strong> ermöglicht es Gästen, direkt im Restaurant
        selbst zu bestellen – ganz ohne Warteschlange.  
        Das System ist nahtlos mit deiner <strong>Gastrosoft-Kasse</strong> verbunden,
        sodass Bestellungen automatisch ins Küchensystem fließen.  
        <br /><br />
        Ob zur <strong>Mittagszeit</strong> oder bei <strong>großem Andrang</strong> – dein Team
        bleibt entlastet, während Gäste schnell und kontaktlos bestellen und bezahlen.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1.1rem",
          px: 5,
          py: 1.5,
          borderRadius: "50px",
          boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
          "&:hover": {
            bgcolor: "#1ebe5d",
            transform: "translateY(-4px)",
          },
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!%20Ich%20möchte%20mehr%20über%20das%20Kiosk-System%20erfahren."
        target="_blank"
      >
        Jetzt Kiosk-System entdecken
      </Button>
    </motion.div>

    {/* 🖥️ Bild rechts */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="img"
        src="/kiosk-gastrosoft.png"
        alt="Gastrosoft Kiosk-System"
        sx={{
          width: "100%",
          maxWidth: 520,
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
          transform: "rotate(1deg)",
          transition: "transform 0.6s ease",
          "&:hover": {
            transform: "rotate(0deg) scale(1.04)",
          },
        }}
      />
    </motion.div>
  </Container>

  {/* 💫 Hintergrund-Deko */}
  <motion.div
    style={{
      position: "absolute",
      bottom: "-10%",
      right: "-5%",
      width: 350,
      height: 350,
      borderRadius: "50%",
      background: "rgba(37,211,102,0.12)",
      filter: "blur(80px)",
    }}
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.6, 0.8, 0.6],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
</Box>

<Box
  sx={{
    py: { xs: 6, md: 10 },
    px: { xs: 2, md: 6 },
    background: "#F8FAFC",
  }}
>
  <Container maxWidth="lg">
    {/* Titel */}
    <Typography
      sx={{
        fontSize: { xs: "1.8rem", md: "3rem" },
        fontWeight: 800,
        color: "#0B2341",
        textAlign: "center",
        mb: 4,
      }}
    >
      Digitaler Abholbildschirm
    </Typography>

    <Typography
      sx={{
        fontSize: { xs: "1rem", md: "1.2rem" },
        color: "#4A5568",
        textAlign: "center",
        maxWidth: "700px",
        mx: "auto",
        mb: 6,
      }}
    >
      Zeige Bestellnummern klar und übersichtlich an. Perfekt integriert in
      unser modernes Kiosk-Bestellsystem – schnell, effizient und kundenfreundlich.
    </Typography>

    {/* Bild + Features nebeneinander */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: 5,
      }}
    >
 <Box
  component="img"
  src="/abholbildschirm.png"
  alt="Digitaler Abholbildschirm"
  sx={{
    width: { xs: "120%", md: "60%" },  // <-- mehr Platz einnehmen
    borderRadius: 4,
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  }}
/>


      {/* Feature Cards rechts */}
      <Box
        sx={{
          width: { xs: "100%", md: "48%" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Card 1 */}
        <Box
          sx={{
            p: 3,
            background: "white",
            borderRadius: 3,
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            sx={{ color: "#25D366", fontWeight: 700, mb: 1, fontSize: "1.2rem" }}
          >
            Live-Anzeige
          </Typography>
          <Typography sx={{ color: "#4A5568", lineHeight: 1.6 }}>
            Die Bestellnummern aktualisieren sich in Echtzeit – ohne Neuladen.
          </Typography>
        </Box>

        {/* Card 2 */}
        <Box
          sx={{
            p: 3,
            background: "white",
            borderRadius: 3,
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            sx={{ color: "#25D366", fontWeight: 700, mb: 1, fontSize: "1.2rem" }}
          >
            Große & klare Darstellung
          </Typography>
          <Typography sx={{ color: "#4A5568", lineHeight: 1.6 }}>
            Perfekt sichtbar – selbst in lauten und vollen Restaurants.
          </Typography>
        </Box>

        {/* Card 3 */}
        <Box
          sx={{
            p: 3,
            background: "white",
            borderRadius: 3,
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            sx={{ color: "#25D366", fontWeight: 700, mb: 1, fontSize: "1.2rem" }}
          >
            Synchronisiert mit Kiosk
          </Typography>
          <Typography sx={{ color: "#4A5568", lineHeight: 1.6 }}>
            Küche klickt auf „Fertig“ → sofort auf dem Bildschirm sichtbar.
          </Typography>
        </Box>

        {/* Card 4 */}
        <Box
          sx={{
            p: 3,
            background: "white",
            borderRadius: 3,
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography
            sx={{ color: "#25D366", fontWeight: 700, mb: 1, fontSize: "1.2rem" }}
          >
            Individuelles Branding
          </Typography>
          <Typography sx={{ color: "#4A5568", lineHeight: 1.6 }}>
            Farben, Logo und Layout passen sich deinem Restaurant an.
          </Typography>
        </Box>
      </Box>
    </Box>

    {/* Button */}
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Button
        variant="contained"
        href="https://wa.me/212600000000?text=Hallo%20GastroSoft!"
        target="_blank"
        sx={{
          bgcolor: "linear-gradient(90deg, #25D366, #1ebe5d)",
          color: "white",
          fontWeight: 700,
          borderRadius: "999px",
          px: { xs: 2, md: 4 },
          py: { xs: 1, md: 1.4 },
          fontSize: { xs: "0.75rem", md: "1rem" },
          boxShadow: "0 6px 16px rgba(37,211,102,0.3)",
          textTransform: "none",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(37,211,102,0.4)",
          },
        }}
      >
        <Box sx={{ display: { xs: "block", md: "none" } }}>Testen</Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          Kostenlos testen
        </Box>
      </Button>
    </Box>
  </Container>
</Box>


{/* 🌐 Webshop Showcase Section */}

<Box
  id="webshop"
  sx={{
    py: { xs: 8, md: 18 },
    background: "linear-gradient(180deg, #ffffff 0%, #f5f9f6 100%)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* 📱 MOBILE LAYOUT */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 4,
      px: 2,
    }}
  >
    {/* Titel */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontSize: "0.8rem",
        }}
      >
        Verkaufe online – ohne Provision
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: "1.6rem",
          lineHeight: 1.3,
          mb: 2,
          mt: 1,
          color: "#0b2341",
        }}
      >
        Dein eigener Webshop –<br /> modern, unabhängig & provisionsfrei
      </Typography>
    </motion.div>

    {/* Bild unter Titel */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Box
        component="img"
        src="/webshop2.png"
        alt="Webshop Showcase"
        sx={{
          width: "100%",
          maxWidth: 320,
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        }}
      />
    </motion.div>

    {/* Beschreibung */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ maxWidth: 360 }}
    >
      <Typography
        sx={{
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: "rgba(0,0,0,0.75)",
          mb: 3,
          mx: "auto",
        }}
      >
        Mit dem <strong>Gastrosoft Webshop</strong> erreichst du deine Kunden direkt –  
        ohne Lieferando, Wolt oder Uber Eats.  
        Du behältst <strong>100 % deiner Einnahmen</strong>,  
        hast volle Kontrolle über <strong>Daten, Bestellungen und Kundenkontakt</strong>  
        und bleibst unabhängig.  
        <br />
        <br />
        Dein Design. Deine Marke. Deine Kunden.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1rem",
          px: 4,
          py: 1.2,
          borderRadius: "50px",
          boxShadow: "0 6px 20px rgba(37,211,102,0.25)",
          "&:hover": { bgcolor: "#1ebe5d", transform: "translateY(-3px)" },
          width: "100%",
          maxWidth: 280,
          mx: "auto",
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!%20Ich%20möchte%20mehr%20über%20den%20Webshop%20erfahren."
        target="_blank"
      >
        Jetzt eigenen Webshop starten
      </Button>
    </motion.div>
  </Container>

  {/* 💻 DESKTOP bleibt unverändert */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 10,
    }}
  >
    {/* Desktop Bild */}
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/webshop2.png"
          alt="Webshop Showcase"
          sx={{
            width: "100%",
            maxWidth: 750,
            borderRadius: "30px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          }}
        />
      </Box>
    </motion.div>

    {/* Desktop Text */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        Verkaufe online – ohne Provision
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: "2.8rem",
          lineHeight: 1.2,
          mb: 3,
          color: "#0b2341",
        }}
      >
        Dein eigener Webshop –<br /> modern, unabhängig & provisionsfrei
      </Typography>

      <Typography
        sx={{
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "rgba(0,0,0,0.75)",
          mb: 4,
          maxWidth: 550,
        }}
      >
        Mit dem <strong>Gastrosoft Webshop</strong> erreichst du deine Kunden direkt –  
        ohne Lieferando, Wolt oder Uber Eats.  
        Du behältst <strong>100 % deiner Einnahmen</strong>,  
        hast volle Kontrolle über <strong>Daten, Bestellungen und Kundenkontakt</strong>  
        und bleibst unabhängig.  
        <br />
        <br />
        Dein Design. Deine Marke. Deine Kunden.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1.1rem",
          px: 5,
          py: 1.5,
          borderRadius: "50px",
          boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
          "&:hover": { bgcolor: "#1ebe5d", transform: "translateY(-4px)" },
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!%20Ich%20möchte%20mehr%20über%20den%20Webshop%20erfahren."
        target="_blank"
      >
        Jetzt eigenen Webshop starten
      </Button>
    </motion.div>
  </Container>

  {/* 💫 Deko-Hintergrund */}
  <motion.div
    style={{
      position: "absolute",
      bottom: "5%",
      right: "-5%",
      width: 300,
      height: 300,
      borderRadius: "50%",
      background: "rgba(37,211,102,0.15)",
      filter: "blur(70px)",
    }}
    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
  />
</Box>


<Box
  id="tischreservierungen"
  sx={{
    py: { xs: 8, md: 16 },
    // backgroundImage: "url('/table-bg.jpg')", // optional
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
    color: "#0b2341",
  }}
>
  {/* Overlay für Lesbarkeit */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      bgcolor: "rgba(37,211,102,0.05)",
      zIndex: 1,
    }}
  />

  {/* 📱 MOBILE LAYOUT */}
  <Container
    maxWidth="lg"
    sx={{
      position: "relative",
      zIndex: 2,
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 4,
      px: 2,
    }}
  >
    {/* Textbereich */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontSize: "0.8rem",
        }}
      >
        Online-Tischreservierung
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: "1.6rem",
          lineHeight: 1.3,
          mb: 2,
          mt: 1,
          color: "#0b2341",
        }}
      >
        Nie wieder verpasste Reservierungen –<br /> digital, schnell und automatisch.
      </Typography>

          {/* Bild unter Text */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
    <Box
  component="img"
  src="/table-bg.jpg"
  alt="Digitale Tischreservierung"
  sx={{
    width: "100%",
    maxWidth: 320,
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    transform: "rotate(2deg)",
    transition: "transform 0.5s ease",
    mb: 4,                // 👉 Abstand nach unten
    "&:hover": { transform: "rotate(0deg) scale(1.03)" },
  }}
/>

    </motion.div>

      <Typography
        sx={{
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: "rgba(0,0,0,0.75)",
          mb: 3,
          maxWidth: 360,
          mx: "auto",
        }}
      >
        Mit <strong>Gastrosoft Tischreservierung</strong> können Gäste rund um die Uhr
        <strong> online reservieren</strong> – ob über deine Webseite, den Webshop oder
        einen <strong>QR-Code</strong> am Eingang.  
        Du erhältst automatisch eine Benachrichtigung, und der Tisch wird direkt im System
        blockiert.  
        So sparst du Zeit, vermeidest Doppelbuchungen und begeisterst deine Gäste mit
        modernem Service.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1rem",
          px: 4,
          py: 1.2,
          borderRadius: "50px",
          boxShadow: "0 6px 20px rgba(37,211,102,0.25)",
          "&:hover": { bgcolor: "#1ebe5d", transform: "translateY(-3px)" },
          width: "100%",
          maxWidth: 280,
          mx: "auto",
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!%20Ich%20möchte%20mehr%20über%20die%20Tischreservierung%20erfahren."
        target="_blank"
      >
        Jetzt Tischreservierung
      </Button>
    </motion.div>


  </Container>

  {/* 💻 DESKTOP bleibt unverändert */}
  <Container
    maxWidth="lg"
    sx={{
      position: "relative",
      zIndex: 2,
      display: { xs: "none", md: "flex" },
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
  >
    {/* Textbereich links */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        Online-Tischreservierung
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: "2.8rem",
          lineHeight: 1.2,
          mb: 3,
          color: "#0b2341",
        }}
      >
        Nie wieder verpasste Reservierungen –<br /> digital, schnell und automatisch.
      </Typography>

      <Typography
        sx={{
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "rgba(0,0,0,0.75)",
          mb: 4,
          maxWidth: 550,
        }}
      >
        Mit <strong>Gastrosoft Tischreservierung</strong> können Gäste rund um die Uhr
        <strong> online reservieren</strong> – ob über deine Webseite, den Webshop oder
        einen <strong>QR-Code</strong> am Eingang.  
        Du erhältst automatisch eine Benachrichtigung, und der Tisch wird direkt im System
        blockiert.  
        So sparst du Zeit, vermeidest Doppelbuchungen und begeisterst deine Gäste mit
        modernem Service.
      </Typography>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1.1rem",
          px: 5,
          py: 1.5,
          borderRadius: "50px",
          boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
          "&:hover": { bgcolor: "#1ebe5d", transform: "translateY(-4px)" },
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!%20Ich%20möchte%20mehr%20über%20die%20Tischreservierung%20erfahren."
        target="_blank"
      >
        Jetzt Tischreservierung
      </Button>
    </motion.div>

    {/* Bild rechts */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1, display: "flex", justifyContent: "center" }}
    >
      <Box
        component="img"
        src="/table-bg.jpg"
        alt="Digitale Tischreservierung"
        sx={{
          width: "100%",
          maxWidth: 480,
          borderRadius: "25px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
          transform: "rotate(2deg)",
          transition: "transform 0.5s ease",
          "&:hover": { transform: "rotate(0deg) scale(1.03)" },
        }}
      />
    </motion.div>
  </Container>
</Box>


<Box
  id="pos"
  sx={{
    py: { xs: 8, md: 16 },
    background: "linear-gradient(180deg, #ffffff 0%, #f5f9f6 100%)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* 📱 MOBILE LAYOUT */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 4,
      px: 2,
      position: "relative",
      zIndex: 2,
    }}
  >
    {/* Text */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.2,
          fontSize: "0.8rem",
        }}
      >
        Kompatibel mit jedem Kassensystem
      </Typography>
       
       
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          fontSize: "1.6rem",
          lineHeight: 1.3,
          mb: 2,
          mt: 1,
          color: "#0b2341",
        }}
      >
        Gastrosoft integriert sich nahtlos in dein Kassensystem
      </Typography>
 
          {/* Bild unter Text */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
    <Box
  component="img"
      src="/integration.png"
        alt="Integration mit Kassensystemen"
  sx={{
    width: "100%",
    maxWidth: 320,
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
    transform: "rotate(2deg)",
    transition: "transform 0.5s ease",
    mb: 4,                // 👉 Abstand nach unten
    "&:hover": { transform: "rotate(0deg) scale(1.03)" },
  }}
/>

    </motion.div>
      <Typography
        sx={{
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: "rgba(0,0,0,0.75)",
          mb: 3,
          maxWidth: 360,
          mx: "auto",
        }}
      >
        Egal ob du <strong>SumUp, Lightspeed, Vectron, Orderbird</strong> oder ein anderes
        Kassensystem nutzt – <strong>Gastrosoft</strong> fügt sich nahtlos ein.  
        Alle Bestellungen aus dem QR-Ordering oder Webshop werden direkt ins Kassensystem
        übertragen und zentral verwaltet.  
        <br /><br />
        So hast du <strong>alle Bestellungen, Zahlungen und Reports</strong> an einem Ort –  
        ohne doppelte Eingaben, Fehler oder Medienbrüche.
      </Typography>

      <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", justifyContent: "center", mb: 4 }}>
        {["SumUp", "Lightspeed", "Orderbird", "Vectron"].map((brand, i) => (
          <Box
            key={i}
            sx={{
              bgcolor: "rgba(37,211,102,0.08)",
              px: 2.5,
              py: 0.8,
              borderRadius: "30px",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#0b2341",
            }}
          >
            {brand}
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1rem",
          px: 4,
          py: 1.2,
          borderRadius: "50px",
          boxShadow: "0 6px 20px rgba(37,211,102,0.25)",
          "&:hover": { bgcolor: "#1ebe5d", transform: "translateY(-3px)" },
          width: "100%",
          maxWidth: 280,
          mx: "auto",
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!%20Ich%20möchte%20mehr%20über%20die%20Integration%20mit%20meinem%20Kassensystem%20erfahren."
        target="_blank"
      >
        Jetzt Integration anfragen
      </Button>
    </motion.div>
  </Container>

  {/* 💻 DESKTOP bleibt unverändert */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
  >
    {/* Bild links */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1, display: "flex", justifyContent: "center" }}
    >
      <Box
        component="img"
        src="/integration.png"
        alt="Integration mit Kassensystemen"
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: "25px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
          transform: "rotate(-2deg)",
          transition: "transform 0.5s ease",
          "&:hover": { transform: "rotate(0deg) scale(1.03)" },
        }}
      />
    </motion.div>

    {/* Text rechts */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        Kompatibel mit jedem Kassensystem
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: "2.8rem",
          lineHeight: 1.2,
          mb: 3,
          color: "#0b2341",
        }}
      >
        Gastrosoft integriert sich nahtlos in dein Kassensystem
      </Typography>

      <Typography
        sx={{
          fontSize: "1.1rem",
          lineHeight: 1.8,
          color: "rgba(0,0,0,0.75)",
          mb: 4,
          maxWidth: 550,
        }}
      >
        Egal ob du <strong>SumUp, Lightspeed, Vectron, Orderbird</strong> oder ein anderes
        Kassensystem nutzt – <strong>Gastrosoft</strong> fügt sich nahtlos ein.  
        Alle Bestellungen aus dem QR-Ordering oder Webshop werden direkt ins Kassensystem
        übertragen und zentral verwaltet.  
        <br /><br />
        So hast du <strong>alle Bestellungen, Zahlungen und Reports</strong> an einem Ort –  
        ohne doppelte Eingaben, Fehler oder Medienbrüche.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {["SumUp", "Lightspeed", "Orderbird", "Vectron"].map((brand, i) => (
          <Box
            key={i}
            sx={{
              bgcolor: "rgba(37,211,102,0.08)",
              px: 3,
              py: 1,
              borderRadius: "30px",
              fontWeight: 600,
              fontSize: "1rem",
              color: "#0b2341",
            }}
          >
            {brand}
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        sx={{
          mt: 5,
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: "1.1rem",
          px: 5,
          py: 1.5,
          borderRadius: "50px",
          boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
          "&:hover": { bgcolor: "#1ebe5d", transform: "translateY(-4px)" },
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!%20Ich%20möchte%20mehr%20über%20die%20Integration%20mit%20meinem%20Kassensystem%20erfahren."
        target="_blank"
      >
        Jetzt Integration anfragen
      </Button>
    </motion.div>
  </Container>
</Box>

<Box
  id="payment"
  sx={{
    py: { xs: 8, md: 14 },
    bgcolor: "rgba(37,211,102,0.05)",
  }}
>
  <Container
    maxWidth="lg"
    sx={{
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      px: { xs: 2, md: 0 },
    }}
  >
    <Typography
      variant="h3"
      sx={{
        fontWeight: 800,
        fontSize: { xs: "1.8rem", md: "2.8rem" },
        lineHeight: 1.2,
        mb: 2,
        color: "#1d3a2d",
      }}
    >
      Flexible Bezahlmöglichkeiten <br /> für deine Gäste
    </Typography>

    <Typography
      sx={{
        fontSize: { xs: "1rem", md: "1.1rem" },
        lineHeight: 1.6,
        color: "rgba(0,0,0,0.75)",
        mb: 5,
        maxWidth: { xs: 360, md: 600 },
      }}
    >
      Lass deine Gäste direkt am Tisch oder online bezahlen – schnell,
      sicher und zentral verwaltet. <br />
      Akzeptiere alle modernen Zahlungsmethoden, ganz ohne Aufwand.
    </Typography>

    {/* 💳 Logo-Reihe */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: { xs: 2, md: 5 },
      }}
    >
      {paymentLogos.map((logo, i) => (
        <motion.div
          key={i}
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "white",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 25px rgba(0,0,0,0.12)",
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            scale: 1.15,
            y: -8,
            boxShadow: "0 15px 35px rgba(37,211,102,0.3)",
          }}
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <motion.img
            src={logo.src}
            alt={logo.alt}
            style={{
              width: "50px",
              height: "auto",
              filter: "drop-shadow(0px 3px 6px rgba(0,0,0,0.15)) brightness(1.05)",
              transform: "translateZ(15px)",
            }}
            whileHover={{
              scale: 1.05,
              filter: "drop-shadow(0px 6px 10px rgba(37,211,102,0.3)) brightness(1.1)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          />
        </motion.div>
      ))}
    </Box>
  </Container>
</Box>

{/* 💫 Laufende Service-Leiste – Mobile optimiert */}
<Box
  sx={{
    overflow: "hidden",
    position: "relative",
    py: { xs: 6, md: 10 },
    borderTop: "1px solid rgba(37,211,102,0.2)",
    borderBottom: "1px solid rgba(37,211,102,0.2)",
    background: "linear-gradient(180deg, #e8f8ef 0%, #ffffff 100%)",
    animation: "pulseBg 10s ease-in-out infinite",
    "@keyframes pulseBg": {
      "0%": { background: "linear-gradient(180deg, #e8f8ef 0%, #ffffff 100%)" },
      "50%": { background: "linear-gradient(180deg, #dff3e9 0%, #f9fdfb 100%)" },
      "100%": { background: "linear-gradient(180deg, #e8f8ef 0%, #ffffff 100%)" },
    },
  }}
>
  {/* Seitliche Glanzeffekte */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 6%, rgba(255,255,255,0) 94%, rgba(255,255,255,1) 100%)",
      pointerEvents: "none",
      zIndex: 2,
    }}
  />

  <Box
    sx={{
      display: "inline-block",
      whiteSpace: "nowrap",
      animation: "scroll 38s linear infinite",
      "&:hover": { animationPlayState: "paused" },
      "@keyframes scroll": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" },
      },
    }}
  >
    {[...Array(2)].map((_, loopIndex) => (
      <Box
        key={loopIndex}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: { xs: 3, md: 8 }, // enger auf Mobile
          px: { xs: 4, md: 6 },
        }}
      >
        {[
          { icon: "🍔", label: "Self-Ordering-Kiosk" },
          { icon: "🧾", label: "Vorbestellung" },
          { icon: "🚗", label: "Lieferung" },
          { icon: "🍽️", label: "Tischreservierung" },
          { icon: "📦", label: "Selbstabholung" },
          { icon: "🎫", label: "Wartenummer-Anzeige" },
          { icon: "🛒", label: "Webshop" },
        ].map((item, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5, // etwas enger auf Mobile
              color: "#0b2341",
              fontWeight: 600,
              fontSize: { xs: "1.3rem", md: "1.9rem" },
              minWidth: { xs: "70vw", md: "28vw" },
              justifyContent: "center",
              transition: "transform 0.5s ease, box-shadow 0.5s ease",
              "&:hover": { transform: "scale(1.08)" },
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)",
                width: { xs: 60, md: 80 },
                height: { xs: 60, md: 80 },
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: { xs: "2rem", md: "2.8rem" },
                flexShrink: 0,
                boxShadow: "0 6px 18px rgba(37,211,102,0.25)",
                transition: "all 0.5s ease",
                "&:hover": {
                  boxShadow: "0 10px 28px rgba(37,211,102,0.4)",
                  transform: "rotate(5deg) scale(1.1)",
                },
              }}
            >
              {item.icon}
            </Box>
            <Typography
              component="span"
              sx={{
                fontWeight: 800,
                color: "#1d3a2d",
                letterSpacing: "0.5px",
                textShadow: "0 1px 1px rgba(0,0,0,0.1)",
              }}
            >
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    ))}
  </Box>
</Box>

   
  {/* 🔄 Wirkung */}
   <Box
      id="impact"
      sx={{
        py: { xs: 10, md: 14 },
        background: "linear-gradient(180deg, #ffffff 0%, #f1f8f4 100%)",
        color: "#0b2341",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* 🧭 Titel & Text mit Motion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography
            variant="overline"
            sx={{
              display: "block",
              color: "#25D366",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 1,
              textAlign: "center",
              mb: 2,
            }}
          >
            Unsere Wirkung in der Gastronomie
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: 800,
              mb: 4,
              fontSize: { xs: "2rem", md: "2.8rem" },
              color: "#0b2341",
            }}
          >
            Mehr Umsatz. Weniger Stress. Zufriedenere Gäste.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Typography
            align="center"
            sx={{
              mb: 8,
              color: "rgba(0,0,0,0.7)",
              maxWidth: 700,
              mx: "auto",
              fontSize: "1.1rem",
              lineHeight: 1.7,
            }}
          >
            Mit <strong>Gastrosoft Self-Ordering</strong> bekommst du mehr Umsatz, 
            weniger Aufwand und glückliche Gäste – ganz ohne teure Hardware oder 
            komplizierte Systeme. Ob am Tisch, am Kiosk oder per QR-Code am Handy: 
            Unsere Lösung passt sich deinem Betrieb an – nicht umgekehrt.
          </Typography>
        </motion.div>

        {/* 🌍 Vorteile / Kennzahlen mit Animation */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 4,
            justifyItems: "center",
            alignItems: "stretch",
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                delay: i * 0.25,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  bgcolor: "rgba(37,211,102,0.05)",
                  borderRadius: "20px",
                  p: { xs: 3, md: 4 },
                  width: "100%",
                  maxWidth: 320,
                  minHeight: 240,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  transition: "transform 0.6s ease, box-shadow 0.6s ease",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 35px rgba(37,211,102,0.25)",
                    bgcolor: "rgba(37,211,102,0.12)",
                  },
                }}
              >
                <Typography sx={{ fontSize: "2.4rem", mb: 1 }}>
                  {item.icon}
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "#25D366",
                    mb: 1,
                    fontSize: { xs: "2rem", md: "2.6rem" },
                  }}
                >
                  {item.number}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(0,0,0,0.75)",
                    fontSize: "1rem",
                    fontWeight: 500,
                    lineHeight: 1.6,
                    maxWidth: 250,
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* ✅ Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: "center", mt: 10 }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#25D366",
                color: "white",
                px: { xs: 5, md: 8 },
                py: { xs: 1.6, md: 2 },
                fontWeight: 700,
                borderRadius: "50px",
                fontSize: { xs: "1rem", md: "1.1rem" },
                textTransform: "none",
                boxShadow: "0 10px 25px rgba(37,211,102,0.3)",
                transition: "all 0.4s ease",
                "&:hover": {
                  bgcolor: "#1ebe5d",
                  transform: "translateY(-4px)",
                  boxShadow: "0 15px 35px rgba(37,211,102,0.45)",
                },
              }}
              href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!"
              target="_blank"
            >
              Jetzt Vorteile entdecken
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>


      

      {/* 💎 SECTION — Warum Gastrosoft */}
      <Box
        id="ueberuns"
        sx={{
          py: { xs: 10, md: 16 },
          px: { xs: 2, sm: 4, md: 6, lg: 10 },
          background: "linear-gradient(180deg, #e9f7f1 0%, #ffffff 100%)",
        }}
      >
        <Container maxWidth="xl">
          {/* 🩺 Haupttitel */}
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 8, md: 12 },
              maxWidth: 900,
              mx: "auto",
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: "#25D366",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: 1,
                mb: 1.5,
                display: "block",
              }}
            >
              Unsere Erfahrung macht den Unterschied
            </Typography>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "#0d2b5c",
                mb: 2,
                fontSize: { xs: "2rem", md: "2.8rem", lg: "3rem" },
                lineHeight: 1.3,
              }}
            >
              Warum Profis auf Gastrosoft setzen
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.15rem" },
                lineHeight: 1.8,
                maxWidth: 750,
                mx: "auto",
              }}
            >
              Entwickelt von Ingenieur:innen und Gastro-Expert:innen verbindet{" "}
              <strong>Gastrosoft</strong> technisches Know-how mit
              Branchenerfahrung. Unsere Cloud-Lösung übernimmt alles – von
              kontinuierlichem Support bis zu automatischen Updates.
            </Typography>
          </Box>

          {/* 🌿 Inhalte */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: 6, md: 10 },
              maxWidth: "1400px",
              mx: "auto",
            }}
          >
            {/* 🧠 Text links */}
            <Box
              sx={{
                flex: { xs: "1 1 100%", md: "1 1 50%" },
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {[
                {
                  icon: "☁️",
                  title: "Sicheres Cloud-Hosting",
                  desc: "Ihre Daten sind in der Cloud, jederzeit verfügbar – mit automatischen Backups und Vollverschlüsselung.",
                },
                {
                  icon: "🔄",
                  title: "Automatische Updates",
                  desc: "Neue Funktionen werden ohne Unterbrechung eingespielt.",
                },
                {
                  icon: "🧑‍💻",
                  title: "Dedizierter Support",
                  desc: "Unser Team begleitet Sie täglich – mit Support-Vertrag inkl. Beratung.",
                },
                {
                  icon: "💬",
                  title: "Intelligente Automatisierung",
                  desc: "Bestellungen & Zahlungen laufen 24/7 über WhatsApp und Kiosksysteme.",
                },
                {
                  icon: "🔒",
                  title: "Datenschutz & Compliance",
                  desc: "Rechtskonform, inkl. TSE für Kassen in Deutschland.",
                },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(4px)",
                    transition: "background 0.3s ease, transform 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.9)",
                      transform: "translateX(6px)",
                      boxShadow: "0 6px 20px rgba(37,211,102,0.15)",
                    },
                  }}
                >
                  <Box sx={{ fontSize: "1.8rem", flexShrink: 0 }}>{item.icon}</Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#0d2b5c",
                        mb: 0.5,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        fontSize: "1rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* 🎥 Bild rechts */}
            <Box
              sx={{
                flex: { xs: "1 1 100%", md: "1 1 50%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src="/cloud-support.webp"
                alt="Gastrosoft Cloud & Support"
                sx={{
                  width: "100%",
                  maxWidth: { xs: 420, md: 520, lg: 580 },
                  borderRadius: "24px",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                  objectFit: "cover",
                  transition: "transform 0.6s ease, box-shadow 0.6s ease",
                  animation: "float 6s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                  },
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 25px 60px rgba(37,211,102,0.3)",
                  },
                }}
              />
            </Box>
          </Box>

          {/* ✅ CTA final */}
          <Box sx={{ textAlign: "center", mt: { xs: 10, md: 14 } }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#25D366",
                color: "white",
                px: { xs: 6, md: 8 },
                py: { xs: 1.6, md: 2 },
                fontWeight: 700,
                borderRadius: "50px",
                fontSize: { xs: "1rem", md: "1.15rem" },
                textTransform: "none",
                boxShadow: "0 10px 25px rgba(37,211,102,0.3)",
                "&:hover": {
                  bgcolor: "#1ebe5d",
                  transform: "translateY(-4px)",
                  boxShadow: "0 15px 35px rgba(37,211,102,0.45)",
                },
              }}
              href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!"
              target="_blank"
            >
              Noch heute mit Gastrosoft starten
            </Button>
          </Box>
        </Container>
      </Box>

   {/* 🌱 IMPACT / WIRKUNG */}
<Box
  id="impact"
  sx={{
    py: { xs: 10, md: 14 },
    background: "linear-gradient(180deg, #ffffff 0%, #f1f8f4 100%)",
    color: "#0b2341",
  }}
>
  <Container maxWidth="lg">
    {/* 🩺 Haupttitel */}
    <Typography
      variant="overline"
      sx={{
        display: "block",
        color: "#25D366",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 1,
        textAlign: "center",
        mb: 2,
      }}
    >
      Unsere Präsenz & Ergebnisse
    </Typography>

    <Typography
      variant="h3"
      align="center"
      sx={{
        fontWeight: 800,
        mb: 4,
        fontSize: { xs: "2rem", md: "2.8rem" },
        color: "#0b2341",
      }}
    >
      Gastrosoft digitalisiert Gastronomie-Betriebe
    </Typography>

    <Typography
      align="center"
      sx={{
        mb: 8,
        color: "rgba(0,0,0,0.7)",
        maxWidth: 700,
        mx: "auto",
        fontSize: "1.1rem",
        lineHeight: 1.7,
      }}
    >
      Unsere Cloud-Lösung unterstützt Restaurants in{" "}
      <strong>Deutschland</strong> und der <strong>DACH-Region</strong>  
      bei der Digitalisierung des Alltags – für mehr Effizienz, Transparenz  
      und einen modernen Serviceablauf.
    </Typography>

    {/* 🌍 Statistiken */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 4,
        justifyItems: "center",
        alignItems: "stretch",
      }}
    >
      {[
        { number: "2", suffix: "Länder", text: "DACH-Region", icon: "🌍" },
        { number: "10+", suffix: "Standorte", text: "erste Gastronomie-Partner", icon: "🏪" },
        { number: "2k+", suffix: "Bestellungen", text: "monatlich verarbeitet", icon: "🧾" },
        { number: "+10%", suffix: "", text: "Zeitersparnis im Service", icon: "⏱️" },
        { number: "+15%", suffix: "", text: "höhere Prozesseffizienz", icon: "⚙️" },
        { number: "−20%", suffix: "", text: "weniger Fehlbuchungen", icon: "📉" },
      ].map((item, i) => (
        <Box
          key={i}
          sx={{
            textAlign: "center",
            bgcolor: "white",
            borderRadius: "20px",
            p: { xs: 3, md: 4 },
            width: "100%",
            maxWidth: 320,
            minHeight: 240,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: `${i * 0.15}s`,
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 12px 35px rgba(37,211,102,0.25)",
              bgcolor: "rgba(37,211,102,0.06)",
            },
            "@keyframes fadeInUp": {
              from: { opacity: 0, transform: "translateY(30px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Typography sx={{ fontSize: "2.4rem", mb: 1 }}>
            {item.icon}
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: "#25D366",
              mb: 1,
              fontSize: { xs: "2rem", md: "2.6rem" },
            }}
          >
            {item.number}
            <Box component="span" sx={{ fontSize: "1.2rem", color: "#0b2341" }}>
              {" "}
              {item.suffix}
            </Box>
          </Typography>
          <Typography
            sx={{
              color: "rgba(0,0,0,0.75)",
              fontSize: "1rem",
              fontWeight: 500,
              lineHeight: 1.6,
              maxWidth: 250,
            }}
          >
            {item.text}
          </Typography>
        </Box>
      ))}
    </Box>

    {/* ✅ CTA */}
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          px: { xs: 5, md: 8 },
          py: { xs: 1.6, md: 2 },
          fontWeight: 700,
          borderRadius: "50px",
          fontSize: { xs: "1rem", md: "1.1rem" },
          textTransform: "none",
          boxShadow: "0 10px 25px rgba(37,211,102,0.3)",
          "&:hover": {
            bgcolor: "#1ebe5d",
            transform: "translateY(-4px)",
            boxShadow: "0 15px 35px rgba(37,211,102,0.45)",
          },
        }}
        href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!"
        target="_blank"
      >
        Unsere Wirkung entdecken
      </Button>
    </Box>
  </Container>
</Box>
{/* 💚 FOOTER — heller, moderner Stil */}
<Box
  id="nav"
  sx={{
    background: `
      linear-gradient(180deg, #f8fbf9 0%, #f1f8f4 60%, #e6f2ed 100%)
    `,
    color: "#0b2341",
    py: { xs: 6, md: 10 },
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* sanfter grüner Glow */}
  <Box
    sx={{
      position: "absolute",
      top: "-10%",
      left: "-10%",
      width: 400,
      height: 400,
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(37,211,102,0.15), transparent 70%)",
      filter: "blur(100px)",
    }}
  />

  {/* zarter blauer Akzent unten */}
  <Box
    sx={{
      position: "absolute",
      bottom: "-15%",
      right: "-10%",
      width: 300,
      height: 300,
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(11,35,65,0.08), transparent 70%)",
      filter: "blur(100px)",
    }}
  />

  <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
    <Grid
      container
      spacing={6}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      {/* Logo + Beschreibung */}
      <Grid item xs={12} md={4}>
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Box
            component="img"
            src="/logo.png"
            alt="Gastrosoft Logo"
            sx={{ width: 150, mb: 2 }}
          />
          <Typography sx={{ opacity: 0.85 }}>
            Ihre intelligente Plattform für die digitale Gastronomie –  
            entwickelt, um Ihren Alltag zu vereinfachen.
          </Typography>
        </Box>
      </Grid>

      {/* Navigation */}
      <Grid item xs={12} md={4}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "#25D366",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Navigation
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          {["Über uns", "Kontakt aufnehmen", "Leistungen", "Partner", "Neuigkeiten"].map(
            (link, i) => (
              <Typography
                key={i}
                sx={{
                  cursor: "pointer",
                  opacity: 0.85,
                  "&:hover": { color: "#25D366", opacity: 1 },
                }}
              >
                {link}
              </Typography>
            )
          )}
        </Box>
      </Grid>

      {/* Kontakt */}
      <Grid item xs={12} md={4}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "#25D366",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Kontakt
        </Typography>
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography sx={{ mb: 1 }}>📞 (+49) 1622982162</Typography>
          <Typography sx={{ mb: 1 }}>✉️ kontakt@gastrosoft.de</Typography>
        </Box>
      </Grid>
    </Grid>

    {/* Linie */}
    <Divider sx={{ my: 6, borderColor: "rgba(0,0,0,0.1)" }} />

    {/* Copyright */}
    <Typography
      variant="body2"
      align="center"
      sx={{ opacity: 0.8, color: "rgba(0,0,0,0.7)" }}
    >
      © {new Date().getFullYear()} Gastrosoft — Alle Rechte vorbehalten.
    </Typography>
  </Container>

  {/* Schwebender WhatsApp-Button */}
       {/* 💬 SCHWEBENDER SOCIAL BUTTON — mittig rechts */}
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          right: 24,
          transform: "translateY(-50%)",
          zIndex: 1500,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {/* 💬 Textfeld „Fragen?“ links vom Button */}
        {!open && (
   <Box
  onClick={() => setOpen(!open)}
  sx={{
    position: "relative",
    bgcolor: "rgba(255, 255, 255, 0.2)", // halbtransparent
    color: "black",
    backdropFilter: "blur(6px)", // weicher Glas-Effekt
    border: "1.5px solid rgba(255, 255, 255, 0.4)",
    px: 3,
    py: 1.3,
    borderRadius: "30px",
    fontWeight: 600,
    fontSize: "1rem",
    textShadow: "0 0 8px rgba(255,255,255,0.6)", // leichter Glanz
    boxShadow: "0 6px 20px rgba(201,152,70,0.3)", // goldener Schatten
    cursor: "pointer",
    overflow: "hidden",
    transition: "all 0.4s ease",
    animation: "floatText 3s ease-in-out infinite",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 25px rgba(201,152,70,0.5)",
      background: "rgba(255, 255, 255, 0.3)",
    },

    // ✨ sanftes Schweben
    "@keyframes floatText": {
      "0%, 100%": { transform: "translateX(0)" },
      "50%": { transform: "translateX(-6px)" },
    },

    // 🌈 Schimmernder Lichteffekt (mit pseudo-Element)
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent)",
      animation: "shine 3s infinite",
    },
    "@keyframes shine": {
      "0%": { left: "-100%" },
      "50%": { left: "100%" },
      "100%": { left: "100%" },
    },
  }}
>
  🌟 Social Media
</Box>

        )}

        {/* 🌍 Haupt-Button mit Glow & Pulse */}
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Halo-Effekt */}
          <Box
            sx={{
              position: "absolute",
              width: 70,
              height: 70,
              borderRadius: "50%",
              bgcolor: "rgba(201, 152, 70, 0.35)",
              animation: "pulseGold 2s infinite ease-out",
              zIndex: 0,
              "@keyframes pulseGold": {
                "0%": { transform: "scale(0.9)", opacity: 1 },
                "70%": { transform: "scale(1.6)", opacity: 0 },
                "100%": { transform: "scale(0.9)", opacity: 0 },
              },
            }}
          />

          <Fab
            onClick={() => setOpen(!open)}
            sx={{
              bgcolor: "#C99846",
              color: "white",
              "&:hover": { bgcolor: "#b6873e" },
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              zIndex: 1,
              transform: open ? "rotate(45deg)" : "scale(1)",
              transition: "all 0.4s ease",
              animation: !open ? "floatBtn 3s ease-in-out infinite" : "none",
              "@keyframes floatBtn": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(-4px)" },
              },
            }}
          >
            {open ? <CloseIcon /> : <ShareIcon sx={{ fontSize: 28 }} />}
          </Fab>
        </Box>

        {/* ✨ Social Media Buttons — horizontal nach links */}
        <Box
          sx={{
            position: "absolute",
            right: 80,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Zoom in={open}>
            <Tooltip title="Instagram" placement="top">
              <Fab
                size="medium"
                sx={{
                  bgcolor: "white",
                  border: "2px solid #C99846",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                  "&:hover": {
                    transform: "scale(1.15)",
                    boxShadow: "0 10px 25px rgba(201,152,70,0.5)",
                  },
                  transition: "all 0.3s ease",
                }}
                href="https://www.instagram.com/marrakesch_restaurant/"
                target="_blank"
              >
                <Box
                  component="img"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  sx={{ width: 30, height: 30 }}
                />
              </Fab>
            </Tooltip>
          </Zoom>

          <Zoom in={open}>
            <Tooltip title="TikTok" placement="top">
              <Fab
                size="medium"
                sx={{
                  bgcolor: "white",
                  border: "2px solid #C99846",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                  "&:hover": {
                    transform: "scale(1.15)",
                    boxShadow: "0 10px 25px rgba(201,152,70,0.5)",
                  },
                  transition: "all 0.3s ease",
                }}
                href="https://www.tiktok.com/discover/marrakesch-restaurant-dortmund"
                target="_blank"
              >
                <Box
                  component="img"
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg"
                  alt="TikTok"
                  sx={{
                    width: 28,
                    height: 28,
                    filter:
                      "invert(12%) sepia(92%) saturate(7481%) hue-rotate(340deg) brightness(90%) contrast(107%)",
                  }}
                />
              </Fab>
            </Tooltip>
          </Zoom>

          <Zoom in={open}>
            <Tooltip title="WhatsApp" placement="top">
              <Fab
                size="medium"
                sx={{
                  bgcolor: "#25D366",
                  color: "white",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                  "&:hover": { bgcolor: "#1ebe5d", transform: "scale(1.15)" },
                  transition: "all 0.3s ease",
                }}
                href="https://wa.me/49123456789?text=Hallo%20Restaurant%20Marrakech!"
                target="_blank"
              >
                <WhatsAppIcon sx={{ fontSize: 28 }} />
              </Fab>
            </Tooltip>
          </Zoom>
        </Box>
      </Box>
</Box>

    </ThemeProvider>
  );
}

