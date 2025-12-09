import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
  import { keyframes } from "@mui/system";
import { motion } from "framer-motion";
import Slider from "react-slick"; // npm install react-slick slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Collapse } from "@mui/material";
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
const [openServices, setOpenServices] = useState(false);
const [openAbout, setOpenAbout] = useState(false);
const [openContact, setOpenContact] = useState(false);
const images = ["/hero.jpg", "/hero1.png", "/hero2.png"];
  const [current, setCurrent] = useState(0);
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

 
  // Alle 5 Sekunden zum nächsten Bild wechseln
 useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

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
    elevation={0}
    sx={{
       bgcolor: "rgba(255,255,255,0.7)",
      color: "#3E2C1C", // warmes Dunkelbraun
      px: { xs: 2, md: 8 },
      py: 1.2,
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
      borderBottom: "3px solid #C99846", // Goldrand – marokkanischer Akzent
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      zIndex: 120,
      backdropFilter: "blur(8px)",
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
          sx={{
            width: 10,
            height: 40,
            borderRadius: "3px",
           bgcolor: "#25D366",
            boxShadow: "0 0 10px rgba(201,152,70,0.6)",
            animation: "glowBar 3s ease-in-out infinite",
            "@keyframes glowBar": {
              "0%,100%": { opacity: 0.6, transform: "scaleY(1)" },
              "50%": { opacity: 1, transform: "scaleY(1.2)" },
            },
          }}
        />

        {/* 🕌 Logo selbst */}
        <Box
          component="img"
          src="/logoGastroTransparent.png"
          alt="TechGastro"
          sx={{
            height: { xs: 60, sm: 75 },
            width: "auto",
            cursor: "pointer",
            borderRadius: "12px",
            p: 0.5,
            bgcolor: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
            transition: "all 0.4s ease",
            "&:hover": {
              transform: "scale(1.06) rotate(-1deg)",
              boxShadow: "0 6px 20px rgba(201,152,70,0.5)",
              bgcolor: "rgba(255,255,255,0.9)",
            },
            filter:
              "drop-shadow(0 2px 4px rgba(0,0,0,0.25)) brightness(1.1)",
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
              fontSize: "1.4rem",
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
            Services
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
                    sx={{ fontWeight: 700, mb: 2, color: "#25D366",fontSize: "1.4rem", }}
                  >
                    Services
                  </Typography>

                  {[
                    { label: "Self Ordering", id: "self-ordering" },
                    { label: "Kiosque", id: "kiosk" },
                    { label: "Webshop", id: "webshop" },
                    { label: "Réservations de table", id: "tischreservierungen" },
                    { label: "Écrans d’affichage", id: "abholbildschirme" },
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
                    sx={{ fontWeight: 700, mb: 2, color: "#25D366",fontSize: "1.4rem", }}
                  >
                    Domaines
                  </Typography>
                  {[
                    "Service rapide",
                    "Salon",
                    "Aréna & stade",
                    "Hotel",
                    "Gastronomie d’expérience",
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
            { label: "Systèmes de caisse", id: "pos" },
            { label: "À propos de nous", id: "ueberuns" },
            { label: "Contact", id: "nav" },
          ].map((item) => (
            <Button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              sx={{
                fontWeight: 700,
                color: "#0B2341",
               fontSize: "1.4rem",
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
 



{/* Desktop Button (MD+) */}
<Button
  variant="contained"
    href="https://wa.me/491622982160?text=Bonjour!"
  target="_blank"
   sx={{
      bgcolor: "linear-gradient(90deg, #25D366, #1ebe5d)",
      color: "white",
      fontWeight: 700,
      borderRadius: "999px",
      px: { xs: 3.8, md: 5 },
      py: { xs: 1.3, md: 1.5 },
      fontSize: { xs: "1rem", md: "1.1rem" },
      textTransform: "none",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
      "&:hover": {
        bgcolor: "#b78c3d",
        transform: "scale(1.06)",
        boxShadow: "0px 5px 15px rgba(0,0,0,0.25)",
      },
      transition: "all 0.25s ease-in-out",
    }}
>
  Jetzt testen
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
        background: "linear-gradient(160deg, #E8F8EF 0%, #DFF5EA 50%, #D6F2E4 100%)",
        color: "#0b2341",
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
      {/* Header (Logo + Close-Icon optional) */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 6,
        }}
      >
        <Box
          component="img"
          src="/logoGastroTransparent.png"
          alt="GastroSoft Logo"
          sx={{
            height: { xs: 65, sm: 70 },
            width: "auto",
            cursor: "pointer",
            filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.18)) brightness(1.05)",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.08)" },
          }}
        />

        <IconButton onClick={handleClose}>
          <CloseIcon sx={{ color: "#0b2341" }} />
        </IconButton>
      </Box>


{/* Services – Mobile Akkordeon */}
<Box sx={{ width: "100%", mb: 4 }}>
  {/* Header-Zeile (zum Auf-/Zuklappen) */}
  <Box
    onClick={(e) => {
      e.stopPropagation();
      setOpenServices((prev) => !prev);
    }}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      pb: 1.2,
      borderBottom: "1px solid rgba(0,0,0,0.08)",
    }}
  >
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: "0.9rem",
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "#25D366",
      }}
    >
      Services
    </Typography>

    <Box
      component="span"
      sx={{
        fontSize: "1.4rem",
        color: "#0b2341",
        transform: openServices ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }}
    >
      ›
    </Box>
  </Box>

  {/* Inhalt – klappt ein/aus */}
  <Collapse in={openServices} timeout="auto" unmountOnExit>
    <Box sx={{ mt: 1.5 }}>
      {[
        { label: "Self Ordering", id: "self-ordering" },
        { label: "Kiosque", id: "kiosk" },
        { label: "Webshop", id: "webshop" },
        { label: "Réservations de table", id: "tischreservierungen" },
        { label: "Écrans d’affichage", id: "abholbildschirme" },
        { label: "Systèmes de caisse", id: "pos" },
      ].map((item) => (
        <Button
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            handleScrollTo(item.id);
          }}
          sx={{
            color: "#0b2341",
            justifyContent: "space-between",
            width: "100%",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            pb: 0.8,
            "&:hover": {
              color: "#25D366",
              transform: "translateX(4px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {item.label}
          <span style={{ fontSize: "1.2rem", marginLeft: "8px" }}>›</span>
        </Button>
      ))}
    </Box>
  </Collapse>
</Box>


        {/* ===== Services (wie Desktop Mega-Menü, nur als Liste) ===== */}
     {/* Contact – Mobile Akkordeon */}
<Box sx={{ width: "100%", mb: 4 }}>

  {/* Header */}
  <Box
    onClick={(e) => {
      e.stopPropagation();
      setOpenContact((prev) => !prev);
    }}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      pb: 1.2,
      borderBottom: "1px solid rgba(0,0,0,0.08)",
    }}
  >
    <Typography
      sx={{
        fontWeight: 700,
        fontSize: "0.9rem",
        textTransform: "uppercase",
        letterSpacing: 1,
        color: "#25D366",
      }}
    >
      Contact
    </Typography>

    <Box
      component="span"
      sx={{
        fontSize: "1.4rem",
        color: "#0b2341",
        transform: openContact ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }}
    >
      ›
    </Box>
  </Box>

  {/* Inhalt */}
  <Collapse in={openContact} timeout="auto" unmountOnExit>
    <Box sx={{ mt: 1.5 }}>
      {[
        { label: "Contact", id: "nav" },
      ].map((item) => (
        <Button
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            handleScrollTo(item.id);
          }}
          sx={{
            color: "#0b2341",
            justifyContent: "space-between",
            width: "100%",
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 600,
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            pb: 0.8,
            "&:hover": {
              color: "#25D366",
              transform: "translateX(4px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          {item.label}
          <span style={{ fontSize: "1.3rem", marginLeft: "8px" }}>›</span>
        </Button>
      ))}
    </Box>
  </Collapse>
</Box>



      {/* ===== Domaines (nur Anzeige, wie Desktop) ===== */}
      <Box sx={{ width: "100%", mb: 4 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "uppercase",
            letterSpacing: 1,
            color: "#25D366",
            mb: 1.5,
          }}
        >
          Domaines
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {[
            "Service rapide",
            "Salon",
            "Aréna & stade",
            "Hôtel",
            "Gastronomie d’expérience",
          ].map((bereich) => (
            <Box
              key={bereich}
              sx={{
                px: 2,
                py: 0.7,
                borderRadius: "999px",
                bgcolor: "rgba(37,211,102,0.12)",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#0b2341",
              }}
            >
              {bereich}
            </Box>
          ))}
        </Box>
      </Box>

  

      {/* CTA unten */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          mb: 4,
          gap: 1.5,
        }}
      >
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            color: "#0b2341",
            borderColor: "rgba(11,35,65,0.25)",
            fontSize: "0.95rem",
            textTransform: "none",
            borderRadius: "999px",
            px: 3,
            py: 1,
            fontWeight: 500,
            backgroundColor: "rgba(255,255,255,0.6)",
            transition: "all 0.3s ease",
            "&:hover": {
              color: "#25D366",
              borderColor: "#25D366",
              backgroundColor: "rgba(37,211,102,0.12)",
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
            boxShadow: "0 4px 14px rgba(37,211,102,0.35)",
            "&:hover": {
              bgcolor: "#1ebe5d",
              transform: "scale(1.05)",
              boxShadow: "0 6px 18px rgba(37,211,102,0.45)",
            },
            transition: "all 0.3s ease",
          }}
          href="https://wa.me/491622982160?text=Bonjour!"
          target="_blank"
        >
          Kostenlos testen
        </Button>
      </Box>
    </Box>
  )}
</Box>

<Toolbar sx={{ py: 1.5 }} />

          {/* 🩺 HERO SECTION — Text links, Bild rechts, Buttons (gleiches Layout) */}
 {/* Abstandshalter für die fixe AppBar */}


<Box
  sx={{
    position: "relative",
    color: "white",
    overflow: "hidden",
    height: { xs: "90vh", md: "92vh", lg: "88vh" }, // leicht kompakter auf großen Screens
    borderRadius: "30px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
    mx: { xs: 2, md: 8 },
    mt: { xs: 3, md: 7 },
  }}
>
  {/* Hintergrundbilder */}
  {images.map((img, index) => (
    <Box
      key={img}
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: index === current ? 1 : 0,
        transform: index === current ? "scale(1)" : "scale(1.08)",
        transition: "opacity 2s ease-in-out, transform 6s ease-in-out",
      }}
    />
  ))}

  {/* Overlay */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))",
      zIndex: 1,
    }}
  />

  {/* Content */}
  <Container
    maxWidth="lg"
    sx={{
      position: "relative",
      zIndex: 2,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: { xs: "center", md: "flex-start" },
      textAlign: { xs: "center", md: "left" },
      color: "white",
      px: { xs: 2.5, md: 8 },
    }}
  >
    {/* Badge oben */}
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        mb: { xs: 1.3, md: 2 },
        px: { xs: 1.4, md: 1.8 },
        py: { xs: 0.45, md: 0.7 },
        borderRadius: "999px",
        backgroundColor: "rgba(37,211,102,0.18)",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(37,211,102,0.4)",
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "#25D366",
        }}
      />

      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          letterSpacing: { xs: 1.1, md: 1.8 },
          textTransform: "uppercase",
          fontSize: { xs: "0.62rem", sm: "0.68rem", md: "0.8rem" },
        }}
      >
        Plateforme complète pour restaurants & cafés
      </Typography>
    </Box>

    {/* Haupttitel */}
    <Typography
      variant="h2"
      sx={{
        fontWeight: 900,
        fontSize: {
          xs: "1.9rem",   // kleine Handys
          sm: "2.2rem",   // größere Handys
          md: "3.1rem",   // Tablet / kleines Desktop
          lg: "3.5rem",   // normales Desktop
          xl: "3.8rem",   // sehr große Screens
        },
        lineHeight: { xs: 1.25, md: 1.15 },
        mb: { xs: 1.8, md: 2.5 },
        textShadow: "3px 3px 12px rgba(0,0,0,0.6)",
        maxWidth: { xs: "100%", md: 800 },
      }}
    >
      Une plateforme unique.
      <br />
      Tous les modules dont ton restaurant a besoin.
    </Typography>

    {/* Untertitel */}
    <Typography
      variant="body1"
      sx={{
        fontSize: {
          xs: "0.95rem",
          sm: "1rem",
          md: "1.15rem",
          lg: "1.2rem",
        },
        maxWidth: { xs: "100%", md: 650 },
        mb: { xs: 2.8, md: 3.5 },
        color: "rgba(255,255,255,0.95)",
        textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
      }}
    >
      Techgastro réunit <strong>QR-Ordering</strong>, <strong>Kiosque</strong>, 
      <strong> Webshop</strong>, <strong>Moniteur de cuisine (KDS)</strong>, 
      <strong> écran de retrait</strong> et plus encore — une solution unique,
      intégrée et puissante pour moderniser ton établissement.
    </Typography>

    {/* Modul-Leiste */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1.1,
        mb: { xs: 3.2, md: 4.2 },
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      {[
        "QR-Ordering",
        "Kiosque",
        "Webshop",
        "KDS",
        "Écran de retrait",
        "Encaissement digital",
      ].map((item) => (
        <Box
          key={item}
          sx={{
            px: { xs: 1.5, md: 2 },
            py: { xs: 0.45, md: 0.7 },
            borderRadius: "20px",
            backgroundColor: "rgba(37,211,102,0.18)",
            color: "#25D366",
            fontSize: { xs: "0.78rem", md: "0.9rem" },
            fontWeight: 700,
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(37,211,102,0.4)",
            textTransform: "none",
          }}
        >
          {item}
        </Box>
      ))}
    </Box>

    {/* CTA */}
    <Button
      variant="contained"
      sx={{
        bgcolor: "#25D366",
        color: "black",
        fontWeight: 700,
        fontSize: {
          xs: "0.95rem",
          sm: "1rem",
          md: "1.05rem",
          lg: "1.1rem",
        },
        borderRadius: "50px",
        px: { xs: 3.5, md: 5 },
        py: { xs: 1.1, md: 1.4 },
        textTransform: "none",
        boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
        "&:hover": {
          bgcolor: "#1ebe5d",
          transform: "scale(1.04)",
          transition: "all 0.3s ease",
        },
      }}
      href="https://wa.me/491622982160?text=Bonjour!"
      target="_blank"
    >
      Découvrir la plateforme Techgastro
    </Button>
  </Container>
</Box>



         
        </>
      )}

  

{/* 🔄 Self-Ordering */}
<Box
  id="self-ordering"
  sx={{
    py: { xs: 10, md: 16 },
    bgcolor: "rgba(37,211,102,0.05)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* 📱 MOBILE */}
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
    {/* Titre + Badge mobile */}
    <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 }, px: { xs: 2, md: 0 } }}>
      {/* Badge */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          mb: 1.5,
          px: 1.6,
          py: 0.6,
          borderRadius: "999px",
          backgroundColor: "rgba(37,211,102,0.18)",
          border: "1px solid rgba(37,211,102,0.4)",
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "#25D366",
          }}
        />
        <Typography
          variant="overline"
          sx={{
            color: "#25D366",
            fontWeight: 700,
            letterSpacing: 1.3,
            textTransform: "uppercase",
            fontSize: "0.7rem",
          }}
        >
          Module Self-Ordering de Techgastro
        </Typography>
      </Box>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          color: "#2C2C2C",
          mb: 2,
          fontSize: { xs: "2rem", md: "2.8rem" },
        }}
      >
        Self-ordering avec QR-Code –
        <br />
        rapide, simple & sans contact
      </Typography>
    </Box>

    {/* Carte image + texte mobile */}
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: "30px",
        overflow: "hidden",
        width: "100%",
        maxWidth: { xs: "95%", md: 450 },
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 12px 40px rgba(201,152,70,0.3)",
        },
      }}
    >
      {/* Bild */}
      <Box
        component="img"
        src="/selfordering.png"
        alt="Application self-ordering sur iPhone"
        sx={{
          width: "100%",
          height: { xs: 400, md: 280 },
          objectFit: "cover",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          transition: "transform 0.4s ease",
          "&:hover": { transform: "scale(1.05)" },
        }}
      />

      {/* Textbereich */}
      <Box sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}>
        <Typography
          sx={{
            color: "#5a4b3c",
            fontSize: { xs: "1rem", md: "1.05rem" },
            lineHeight: 1.85,
            letterSpacing: "0.2px",
            mb: 3,
          }}
        >
          Le module <strong>QR-Ordering</strong> de la plateforme Techgastro
          permet à tes clients de <strong>commander directement depuis la table</strong>,
          sans attendre le serveur. Ils scannent le QR-Code, voient la carte numérique,
          commandent et paient en quelques secondes.
          <br />
          <br />
          Dès que la commande est prête →{" "}
          <strong>notification WhatsApp automatique</strong> ou affichage sur
          l’<strong>écran de retrait</strong>.
          <br />
          <br />
          Moins d’attente, plus de commandes, et une équipe soulagée –
          idéal en cas de <strong>manque de personnel</strong> ou de forte affluence.
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
            textTransform: "none",
          }}
          href="https://wa.me/491622982160?text=Bonjour!"
          target="_blank"
        >
          ➜ Tester le self-ordering
        </Button>
      </Box>
    </Box>
  </Container>

  {/* 💻 DESKTOP */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
  >
    {/* Texte links */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      {/* Badge Desktop */}
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          mb: 1.5,
          px: 1.6,
          py: 0.6,
          borderRadius: "999px",
          backgroundColor: "rgba(37,211,102,0.18)",
          border: "1px solid rgba(37,211,102,0.4)",
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "#25D366",
          }}
        />
        <Typography
          variant="overline"
          sx={{
            color: "#25D366",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            fontSize: "0.7rem",
          }}
        >
          Module Self-Ordering de la plateforme Techgastro
        </Typography>
      </Box>

      {/* Headline */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "2rem", md: "2.8rem" },
          lineHeight: 1.15,
          mb: 2,
          color: "#0b2341",
        }}
      >
        Self-ordering avec QR-Code –
        <br />
        rapide, simple & sans contact
      </Typography>

      {/* Subtext */}
      <Typography
        sx={{
          fontSize: { xs: "1rem", md: "1.05rem" },
          lineHeight: 1.9,
          color: "rgba(0,0,0,0.78)",
          mb: 3,
          maxWidth: 560,
        }}
      >
        Le module <strong>QR-Ordering</strong> de Techgastro permet à tes clients
        de commander très facilement depuis la table – sans devoir attendre le serveur.
        Ils scannent simplement le QR-Code, consultent ta carte numérique,
        commandent et paient directement.
        <br />
        <br />
        Dès que la commande est prête, le client reçoit automatiquement une{" "}
        <strong>notification WhatsApp</strong> ou voit son numéro sur l’
        <strong>écran de retrait</strong>.
        <br />
        <br />
        Tu réduis ainsi les temps d’attente, tu augmentes la fréquence des commandes
        et tu soulages ton équipe – idéal en cas de{" "}
        <strong>manque de personnel</strong> ou de forte affluence.
      </Typography>

      {/* CTA + Hint */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 1,
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: "#25D366",
            color: "white",
            fontWeight: 700,
            fontSize: { xs: "1rem", md: "1.05rem" },
            px: 5,
            py: 1.4,
            borderRadius: "50px",
            boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#1ebe5d",
              transform: "translateY(-4px)",
            },
          }}
          href="https://wa.me/491622982160?text=Bonjour!"
          target="_blank"
        >
          Tester le self-ordering
        </Button>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: "0.85rem",
            color: "rgba(0,0,0,0.6)",
          }}
        >
          Aucun engagement – simple démonstration via WhatsApp.
        </Typography>
      </Box>
    </motion.div>

    {/* Bild rechts */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 480,
          borderRadius: "30px",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 120%, rgba(37,211,102,0.18), transparent 70%)",
            zIndex: 0,
          }}
        />

        <Box
          component="img"
          src="/selfordering.png"
          alt="Application self-ordering sur iPhone"
          sx={{
            width: "100%",
            borderRadius: "30px",
            position: "relative",
            zIndex: 2,
            boxShadow:
              "0 18px 40px rgba(0,0,0,0.18), 0 6px 20px rgba(37,211,102,0.15)",
            transform: "scale(1)",
            transition:
              "transform 0.45s ease, box-shadow 0.45s ease, filter 0.45s ease",
            "&:hover": {
              transform: "scale(1.04)",
              boxShadow:
                "0 26px 55px rgba(0,0,0,0.22), 0 10px 28px rgba(37,211,102,0.25)",
              filter: "brightness(1.05)",
            },
          }}
        />
      </Box>
    </motion.div>
  </Container>

  {/* Deko-Hintergrund */}
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



{/* 🔥 KSD – Moniteur de cuisine digital */}
<Box
  id="ksd-monitor"
  sx={{
    py: { xs: 12, md: 16 },
    bgcolor: "rgba(37,211,102,0.05)",
    position: "relative",
    overflow: "hidden",
  }}
>

  {/* 📱 LAYOUT MOBILE */}
 <Container
    maxWidth="lg"
    sx={{
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 3, // moins d’espace pour le mobile
      px: 2, // padding pour les petits écrans
    }}
  >
    {/* Titre */}
 {/* Titre */}
<Box sx={{ textAlign: "center", mb: { xs: 8, md: 10 }, px: { xs: 2, md: 0 } }}>
  {/* Badge */}
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 1,
      mb: 1.5,
      px: 1.6,
      py: 0.6,
      borderRadius: "999px",
      backgroundColor: "rgba(37,211,102,0.18)",
      border: "1px solid rgba(37,211,102,0.4)",
    }}
  >
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: "#25D366",
      }}
    />
    <Typography
      variant="overline"
      sx={{
        color: "#25D366",
        fontWeight: 700,
        letterSpacing: 1.3,
        textTransform: "uppercase",
        fontSize: "0.7rem",
      }}
    >
      Module KSD de la plateforme Techgastro
    </Typography>
  </Box>

  <Typography
    variant="h3"
    sx={{
      fontWeight: 800,
      color: "#2C2C2C",
      mb: 2,
      fontSize: { xs: "2rem", md: "2.8rem" },
    }}
  >
    KSD – ton moniteur de cuisine digital –
    <br />
    pour des processus rapides & sans erreur
  </Typography>
</Box>


    {/* Image */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "30px",
                overflow: "hidden",
                width: "100%",
                maxWidth: { xs: "95%", md: 450 }, // 👉 Auf Mobile fast volle Breite
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(201,152,70,0.3)",
                },
              }}
            >
              {/* 🖼️ Bild */}
              <Box
                component="img"
               src="/ksd.png"
    alt="KSD – Moniteur de cuisine"

                sx={{
                  width: "100%",
                  height: { xs: 400, md: 280 },
                  objectFit: "cover",
                  borderTopLeftRadius: "30px",
                  borderTopRightRadius: "30px",
                  transition: "transform 0.4s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
  
              {/* 📋 Textbereich */}
              <Box sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}>
    
 <Typography
  sx={{
    color: "#5a4b3c",
    fontSize: { xs: "1rem", md: "1.05rem" },
    lineHeight: 1.85,
    letterSpacing: "0.2px",
    mb: 3,
  }}
>
  Le module <strong>moniteur de cuisine KSD</strong> de la plateforme
  Techgastro propulse ta cuisine dans l’ère moderne de la restauration –
  complètement <strong>sans imprimante de cuisine</strong>, si tu le souhaites.
  Les commandes apparaissent en quelques secondes, de façon digitale,
  claire et triées par zone.
  <br /><br />
  Plus de tickets papier, plus de chaos, plus de commandes perdues.
  KSD s’intègre parfaitement dans une cuisine efficace et rapide
  et réduit les erreurs au minimum.
  <br /><br />
  Et si tu préfères, tu peux toujours <strong>intégrer des imprimantes de cuisine</strong> –
  aussi flexible que ta cuisine en a besoin.
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
                  href="https://wa.me/491622982160?text=Bonjour!"
                target="_blank"
              >
                  ➜  Découvrir notre KSD 
                </Button>
              </Box>
            </Box>
  </Container>

  {/* 💻 LAYOUT DESKTOP (Image à gauche, texte à droite) */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
  >

    {/* Image */}
 <motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  style={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Box
    sx={{
      position: "relative",
      width: "100%",
      maxWidth: 480,
      borderRadius: "30px",
      overflow: "hidden",
    }}
  >
    {/* ⭐ Soft Ambient Glow */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 120%, rgba(37,211,102,0.18), transparent 70%)",
        zIndex: 0,
      }}
    />

    {/* 📱 Bild */}
    <Box
      component="img"
       src="/ksd.png"
        alt="Moniteur de cuisine digital"

      sx={{
        width: "100%",
        borderRadius: "30px",
        position: "relative",
        zIndex: 2,
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.18), 0 6px 20px rgba(37,211,102,0.15)",
        transform: "scale(1)",
        transition:
          "transform 0.45s ease, box-shadow 0.45s ease, filter 0.45s ease",
        "&:hover": {
          transform: "scale(1.04)", // sanfter Zoom
          boxShadow:
            "0 26px 55px rgba(0,0,0,0.22), 0 10px 28px rgba(37,211,102,0.25)",
          filter: "brightness(1.05)",
        },
      }}
    />
  </Box>
</motion.div>


    {/* Texte */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  style={{ flex: 1 }}
>
  {/* Mini-Badge */}
<Box
  sx={{
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    mb: 1.5,
    px: 1.6,
    py: 0.6,
    borderRadius: "999px",
    backgroundColor: "rgba(37,211,102,0.18)",
    border: "1px solid rgba(37,211,102,0.4)",
  }}
>
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      bgcolor: "#25D366",
    }}
  />
  <Typography
    variant="overline"
    sx={{
      color: "#25D366",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontSize: "0.7rem",
    }}
  >
    Module KSD de la plateforme Techgastro
  </Typography>
</Box>


  {/* Haupttitel */}
  <Typography
    variant="h3"
    sx={{
      fontWeight: 800,
      fontSize: { xs: "2rem", md: "2.8rem" },
      lineHeight: 1.15,
      mb: 2,
      color: "#0b2341",
    }}
  >
    KSD – moniteur de cuisine digital
    <br />
    pour une efficacité & une clarté maximales
  </Typography>

  {/* Beschreibung */}
<Typography
  sx={{
    fontSize: { xs: "1rem", md: "1.05rem" },
    lineHeight: 1.9,
    color: "rgba(0,0,0,0.78)",
    mb: 3,
    maxWidth: 560,
  }}
>
  Le module <strong>moniteur de cuisine KSD</strong> de Techgastro fait arriver
  les commandes dans ta cuisine de manière digitale, claire et sans délai.
  Idéal pour les concepts modernes comme le <strong>self-ordering</strong>,
  le <strong>service au comptoir</strong>, les <strong>fast-foods</strong>,
  les <strong>food-courts</strong> et bien plus encore.
  ...
</Typography>


  {/* CTA-Button + kleiner Hint */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 1,
    }}
  >
    <Button
      variant="contained"
      sx={{
        bgcolor: "#25D366",
        color: "white",
        fontWeight: 700,
        fontSize: { xs: "1rem", md: "1.05rem" },
        px: 5,
        py: 1.4,
        borderRadius: "50px",
        boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
        textTransform: "none",
        "&:hover": {
          bgcolor: "#1ebe5d",
          transform: "translateY(-4px)",
        },
      }}
      href="https://wa.me/491622982160?text=Bonjour!"
      target="_blank"
    >
      Voir KSD en action
    </Button>

    <Typography
      sx={{
        fontSize: "0.85rem",
        color: "rgba(0,0,0,0.6)",
      }}
    >
      Démonstration en direct via WhatsApp.
    </Typography>
  </Box>
</motion.div>

  </Container>

  {/* 🌿 Décoration d’arrière-plan */}
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



{/* 💫 Système de kiosque */}
<Box
  id="kiosk"
  sx={{
    py: { xs: 12, md: 16 },
    bgcolor: "rgba(37,211,102,0.05)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* 📱 LAYOUT MOBILE */}
 <Container
    maxWidth="lg"
    sx={{
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 3, // moins d’espace pour le mobile
      px: 2, // padding pour les petits écrans
    }}
  >
    {/* Titre */}
  <Box sx={{ textAlign: "center", mb: { xs: 8, md: 10 }, px: { xs: 2, md: 0 } }}>
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 1,
      mb: 1.5,
      px: 1.6,
      py: 0.6,
      borderRadius: "999px",
      backgroundColor: "rgba(37,211,102,0.18)",
      border: "1px solid rgba(37,211,102,0.4)",
    }}
  >
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: "#25D366",
      }}
    />
    <Typography
      variant="overline"
      sx={{
        color: "#25D366",
        fontWeight: 700,
        letterSpacing: 1.3,
        textTransform: "uppercase",
        fontSize: "0.7rem",
      }}
    >
      Module kiosque de la plateforme Techgastro
    </Typography>
  </Box>

  <Typography
    variant="h3"
    sx={{
      fontWeight: 800,
      color: "#2C2C2C",
      mb: 2,
      fontSize: { xs: "2rem", md: "2.8rem" },
    }}
  >
    Le <strong>système de kiosque Techgastro</strong> –
    <br />
    rapide, efficace & intuitif
  </Typography>
</Box>


    {/* Image */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "30px",
                overflow: "hidden",
                
                width: "100%",
                maxWidth: { xs: "95%", md: 450 }, // 👉 Auf Mobile fast volle Breite
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(201,152,70,0.3)",
                },
              }}
            >
              {/* 🖼️ Bild */}
              <Box
                component="img"
              src="/kiosk-gastrosoft.png"
        alt="Système de kiosque Gastrosoft"


                sx={{
                  width: "100%",
                  height: { xs: 900, md: 280 },
                  objectFit: "cover",
                  borderTopLeftRadius: "30px",
                  borderTopRightRadius: "30px",
                  transition: "transform 0.4s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
  
              {/* 📋 Textbereich */}
              <Box sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}>
    
<Typography
  sx={{
    color: "#5a4b3c",
    fontSize: { xs: "1rem", md: "1.05rem" },
    lineHeight: 1.85,
    letterSpacing: "0.2px",
    mb: 3,
  }}
>
  Le module <strong>kiosque</strong> de la plateforme Techgastro permet à
  tes clients de commander directement dans le restaurant – sans faire la queue.
  Parfaitement connecté à ta <strong>caisse Techgastro</strong>, les commandes
  arrivent automatiquement dans le système de cuisine.
  ...
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
                  href="https://wa.me/491622982160?text=Bonjour!"
                target="_blank"
              >
                  ➜  Découvrir notre kiosque 
                </Button>
              </Box>
            </Box>
  </Container>

  {/* 💻 LAYOUT DESKTOP (comme avant) */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
  >
    {/* ✨ Zone de texte à gauche */}
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  style={{ flex: 1 }}
>
  {/* Badge oben */}
<Box
  sx={{
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    mb: 1.5,
    px: 1.6,
    py: 0.6,
    borderRadius: "999px",
    backgroundColor: "rgba(37,211,102,0.18)",
    border: "1px solid rgba(37,211,102,0.4)",
  }}
>
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      bgcolor: "#25D366",
    }}
  />
  <Typography
    variant="overline"
    sx={{
      color: "#25D366",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontSize: "0.7rem",
    }}
  >
    Module kiosque de la plateforme Techgastro
  </Typography>
</Box>

  {/* Headline */}
  <Typography
    variant="h3"
    sx={{
      fontWeight: 800,
      fontSize: { xs: "2rem", md: "2.8rem" },
      lineHeight: 1.15,
      mb: 2,
      color: "#0b2341",
    }}
  >
    Le <strong>système de kiosque Techgastro</strong> —
    <br />
    rapide, efficace & intuitif
  </Typography>

  {/* Beschreibung */}
  <Typography
    sx={{
      fontSize: { xs: "1rem", md: "1.05rem" },
      lineHeight: 1.9,
      color: "rgba(0,0,0,0.78)",
      mb: 3,
      maxWidth: 560,
    }}
  >
    Ton <strong>système de kiosque</strong> permet à tes clients de commander
    directement dans le restaurant – sans file d&apos;attente. Le système est
    parfaitement intégré à ta <strong>caisse Techgastro</strong>, de sorte que
    les commandes arrivent automatiquement dans la cuisine.
    <br />
    <br />
    Que ce soit à <strong>l&apos;heure du déjeuner</strong> ou en cas de{" "}
    <strong>forte affluence</strong>, ton équipe reste soulagée pendant que les
    clients commandent et paient rapidement, de manière fluide et sans contact.
  </Typography>

  {/* CTA + kleiner Hinweis */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 1,
    }}
  >
    <Button
      variant="contained"
      sx={{
        bgcolor: "#25D366",
        color: "white",
        fontWeight: 700,
        fontSize: { xs: "1rem", md: "1.05rem" },
        px: 5,
        py: 1.4,
        borderRadius: "50px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        textTransform: "none",
        "&:hover": {
          bgcolor: "#1ebe5d",
          transform: "translateY(-4px)",
        },
      }}
      href="https://wa.me/491622982160?text=Bonjour!"
      target="_blank"
    >
      Découvrir le système de kiosque
    </Button>

    <Typography
      sx={{
        fontSize: "0.85rem",
        color: "rgba(0,0,0,0.6)",
      }}
    >
      Présentation et conseils personnalisés via WhatsApp.
    </Typography>
  </Box>
</motion.div>


    {/* 🖥️ Image à droite */}
 <motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  style={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Box
    sx={{
      position: "relative",
      width: "100%",
      maxWidth: 480,
      borderRadius: "30px",
      overflow: "hidden",
    }}
  >
    {/* ⭐ Soft Ambient Glow */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 120%, rgba(37,211,102,0.18), transparent 70%)",
        zIndex: 0,
      }}
    />

    {/* 📱 Bild */}
    <Box
      component="img"
        src="/kiosk-gastrosoft.png"
        alt="Système de kiosque Gastrosoft"


      sx={{
        width: "100%",
        borderRadius: "30px",
        position: "relative",
        
        zIndex: 2,
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.18), 0 6px 20px rgba(37,211,102,0.15)",
        transform: "scale(1)",
        transition:
          "transform 0.45s ease, box-shadow 0.45s ease, filter 0.45s ease",
        "&:hover": {
          transform: "scale(1.04)", // sanfter Zoom
          boxShadow:
            "0 26px 55px rgba(0,0,0,0.22), 0 10px 28px rgba(37,211,102,0.25)",
          filter: "brightness(1.05)",
        },
      }}
    />
  </Box>
</motion.div>
  </Container>

  {/* 💫 Décoration d’arrière-plan */}
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

{/* Écran de retrait digital*/}

<Box
  sx={{
    py: { xs: 6, md: 10 },
    px: { xs: 2, md: 6 },
    background: "#F8FAFC",
  }}
>
  <Container maxWidth="lg">
    {/* Titelbereich im gleichen Stil wie die anderen Sections */}
    <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
      {/* Badge */}
   <Box
  sx={{
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    mb: 1.5,
    px: 1.6,
    py: 0.6,
    borderRadius: "999px",
    backgroundColor: "rgba(37,211,102,0.18)",
    border: "1px solid rgba(37,211,102,0.4)",
  }}
>
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      bgcolor: "#25D366",
    }}
  />
  <Typography
    variant="overline"
    sx={{
      color: "#25D366",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontSize: "0.7rem",
    }}
  >
    Module écran de retrait de la plateforme Techgastro
  </Typography>
</Box>


      {/* Haupttitel */}
      <Typography
        sx={{
          fontSize: { xs: "2rem", md: "2.8rem" },
          fontWeight: 800,
          color: "#0B2341",
          mb: 2,
        }}
      >
        Écran de retrait digital
      </Typography>

      {/* Untertitel */}
   <Typography
  sx={{
    fontSize: { xs: "1rem", md: "1.05rem" },
    color: "#4A5568",
    textAlign: "center",
    maxWidth: 720,
    mx: "auto",
    lineHeight: 1.9,
  }}
>
  Le module <strong>écran de retrait</strong> affiche les numéros de commande
  de manière claire et lisible. Parfaitement intégré à notre système moderne
  de commande au kiosque – rapide, efficace et orienté client.
</Typography>

    </Box>

    {/* Image + fonctionnalités côte à côte */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: { xs: 4, md: 6 },
      }}
    >
      {/* Bildbereich im gleichen Stil wie die anderen Produktbilder */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/abholbildschirm.png"
          alt="Écran de retrait digital"
          sx={{
            width: "100%",
            maxWidth: 520,
            borderRadius: 4,
            boxShadow: "0 20px 50px rgba(15,23,42,0.25)",
            transition: "transform 0.45s ease, box-shadow 0.45s ease",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 26px 60px rgba(15,23,42,0.3)",
            },
          }}
        />
      </Box>

      {/* Cartes de fonctionnalités à droite */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Helper für Karten-Stil */}
        {[
          {
            title: "Affichage en temps réel",
            text: "Les numéros de commande se mettent à jour en temps réel – sans rechargement.",
          },
          {
            title: "Grande & claire visibilité",
            text: "Parfaitement lisible – même dans des restaurants bruyants et bondés.",
          },
          {
            title: "Synchronisé avec le kiosque",
            text: "La cuisine clique sur « Terminé » → affichage immédiat sur l’écran.",
          },
          {
            title: "Branding personnalisé",
            text: "Couleurs, logo et mise en page s’adaptent à l’identité de ton restaurant.",
          },
        ].map((item) => (
          <Box
            key={item.title}
            sx={{
              p: 3,
              background: "white",
              borderRadius: 3,
              boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
              border: "1px solid #E2E8F0",
            }}
          >
            <Typography
              sx={{
                color: "#0B2341",
                fontWeight: 700,
                mb: 1,
                fontSize: "1.05rem",
              }}
            >
              {item.title}
            </Typography>
            <Typography
              sx={{
                color: "#4A5568",
                lineHeight: 1.7,
                fontSize: "0.95rem",
              }}
            >
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>

    {/* Bouton */}
    <Box sx={{ textAlign: "center", mt: { xs: 5, md: 7 } }}>
      <Button
        variant="contained"
        href="https://wa.me/491622982160?text=Bonjour!"
        target="_blank"
        sx={{
          backgroundImage: "linear-gradient(90deg, #25D366, #1ebe5d)",
          color: "white",
          fontWeight: 700,
          borderRadius: "999px",
          px: { xs: 3, md: 4 },
          py: { xs: 1.1, md: 1.3 },
          fontSize: { xs: "0.95rem", md: "1rem" },
          boxShadow: "0 6px 16px rgba(37,211,102,0.3)",
          textTransform: "none",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 22px rgba(37,211,102,0.4)",
          },
        }}
      >
        Essayer gratuitement
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
  {/* 📱 MOBILE */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 3, // moins d’espace pour le mobile
      px: 2, // padding pour les petits écrans
    }}
  >
    {/* Titre */}
   <Box sx={{ textAlign: "center", mb: { xs: 8, md: 10 }, px: { xs: 2, md: 0 } }}>
  {/* Badge */}
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 1,
      mb: 1.5,
      px: 1.6,
      py: 0.6,
      borderRadius: "999px",
      backgroundColor: "rgba(37,211,102,0.18)",
      border: "1px solid rgba(37,211,102,0.4)",
    }}
  >
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: "#25D366",
      }}
    />
    <Typography
      variant="overline"
      sx={{
        color: "#25D366",
        fontWeight: 700,
        letterSpacing: 1.3,
        textTransform: "uppercase",
        fontSize: "0.7rem",
      }}
    >
      Module Webshop de la plateforme Techgastro
    </Typography>
  </Box>

  <Typography
    variant="h3"
    sx={{
      fontWeight: 800,
      color: "#2C2C2C",
      mb: 2,
      fontSize: { xs: "2rem", md: "2.8rem" },
    }}
  >
    Ta propre boutique en ligne –
    <br />
    moderne, indépendante & sans commission
  </Typography>
</Box>


    {/* Image */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "30px",
                overflow: "hidden",
                width: "100%",
                maxWidth: { xs: "95%", md: 450 }, // 👉 Auf Mobile fast volle Breite
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(201,152,70,0.3)",
                },
              }}
            >
              {/* 🖼️ Bild */}
              <Box
                component="img"
                src="/webshop2.png"
               alt="Aperçu de la boutique en ligne"

                sx={{
                  width: "100%",
                  height: { xs: 400, md: 280 },
                  objectFit: "cover",
                  borderTopLeftRadius: "30px",
                  borderTopRightRadius: "30px",
                  transition: "transform 0.4s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
  
              {/* 📋 Textbereich */}
              <Box sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}>
    
  
<Typography
  sx={{
    color: "#5a4b3c",
    fontSize: { xs: "1rem", md: "1.05rem" },
    lineHeight: 1.85,
    letterSpacing: "0.2px",
    mb: 3,
  }}
>
  Le module <strong>Webshop</strong> de la plateforme Techgastro te permet
  d’atteindre directement tes clients – sans passer par Lieferando, Wolt
  ou Uber Eats. Tu gardes <strong>100&nbsp;% de tes revenus</strong>, tu gardes
  le contrôle total sur <strong>tes données, tes commandes et la relation client</strong>
  et tu restes indépendant.
  <br />
  <br />
  Ton design. Ta marque. Tes clients.
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
                  href="https://wa.me/491622982160?text=Bonjour!"
                target="_blank"
              >
                  ➜ Lancer ma propre boutique en ligne
                </Button>
              </Box>
            </Box>
  </Container>

  {/* 💻 DESKTOP */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 8,
    }}
  >
    {/* Bild Desktop */}
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="img"
          src="/webshop2.png"
          alt="Aperçu de la boutique en ligne"
          sx={{
            width: "100%",
            maxWidth: 720,
            borderRadius: "30px",
            boxShadow: "0 25px 60px rgba(15,23,42,0.28)",
            transition: "transform 0.45s ease, box-shadow 0.45s ease",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0 32px 70px rgba(15,23,42,0.33)",
            },
          }}
        />
      </Box>
    </motion.div>

    {/* Text Desktop */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1 }}
    >
      {/* Badge */}
   <Box
  sx={{
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    mb: 1.5,
    px: 1.6,
    py: 0.6,
    borderRadius: "999px",
    backgroundColor: "rgba(37,211,102,0.18)",
    border: "1px solid rgba(37,211,102,0.4)",
  }}
>
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      bgcolor: "#25D366",
    }}
  />
  <Typography
    variant="overline"
    sx={{
      color: "#25D366",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontSize: "0.7rem",
    }}
  >
    Module Webshop de la plateforme Techgastro
  </Typography>
</Box>


      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "2.2rem", md: "2.8rem" },
          lineHeight: 1.2,
          mb: 3,
          color: "#0b2341",
        }}
      >
        Ta propre boutique en ligne –
        <br />
        moderne, indépendante & sans commission
      </Typography>

   <Typography
  sx={{
    fontSize: { xs: "1rem", md: "1.05rem" },
    lineHeight: 1.9,
    color: "rgba(0,0,0,0.78)",
    mb: 4,
    maxWidth: 560,
  }}
>
  Le module <strong>Webshop</strong> de Techgastro te permet d’atteindre
  directement tes clients – sans passer par Lieferando, Wolt ou Uber Eats.
  Tu gardes <strong>100&nbsp;% de tes revenus</strong>, tu conserves le
  contrôle total sur <strong>tes données, tes commandes et la relation client</strong>
  et tu restes complètement indépendant.
  <br />
  <br />
  Ton design. Ta marque. Tes clients.
</Typography>


      <Button
        variant="contained"
        sx={{
          bgcolor: "#25D366",
          color: "white",
          fontWeight: 700,
          fontSize: { xs: "1rem", md: "1.05rem" },
          px: 5,
          py: 1.4,
          borderRadius: "50px",
          boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
          textTransform: "none",
          "&:hover": { bgcolor: "#1ebe5d", transform: "translateY(-4px)" },
        }}
        href="https://wa.me/491622982160?text=Bonjour!"
        target="_blank"
      >
        Lancer ma propre boutique en ligne
      </Button>
    </motion.div>
  </Container>

  {/* 💫 Deko im Hintergrund */}
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
  id="pos"
  sx={{
    py: { xs: 8, md: 16 },
    background: "linear-gradient(180deg, #ffffff 0%, #f5f9f6 100%)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* 📱 LAYOUT MOBILE */}
<Container
    maxWidth="lg"
    sx={{
      display: { xs: "flex", md: "none" },
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: 3, // moins d’espace pour le mobile
      px: 2, // padding pour les petits écrans
    }}
  >
    {/* Titre */}
   <Box sx={{ textAlign: "center", mb: { xs: 8, md: 10 }, px: { xs: 2, md: 0 } }}>
  {/* Badge */}
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      gap: 1,
      mb: 1.5,
      px: 1.6,
      py: 0.6,
      borderRadius: "999px",
      backgroundColor: "rgba(37,211,102,0.18)",
      border: "1px solid rgba(37,211,102,0.4)",
    }}
  >
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: "#25D366",
      }}
    />
    <Typography
      variant="overline"
      sx={{
        color: "#25D366",
        fontWeight: 700,
        letterSpacing: 1.3,
        textTransform: "uppercase",
        fontSize: "0.7rem",
      }}
    >
      Module d’intégration caisse de Techgastro
    </Typography>
  </Box>

  <Typography
    variant="h3"
    sx={{
      fontWeight: 800,
      color: "#2C2C2C",
      mb: 2,
      fontSize: { xs: "2rem", md: "2.8rem" },
    }}
  >
    Techgastro s’intègre parfaitement à ton système de caisse
  </Typography>
</Box>


    {/* Image */}
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: "30px",
                overflow: "hidden",
                width: "100%",
                maxWidth: { xs: "95%", md: 450 }, // 👉 Auf Mobile fast volle Breite
                boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 40px rgba(201,152,70,0.3)",
                },
              }}
            >
              {/* 🖼️ Bild */}
              <Box
                component="img"
               src="/integration.png"
          alt="Intégration avec les systèmes de caisse"

                sx={{
                  width: "100%",
                  height: { xs: 400, md: 280 },
                  objectFit: "cover",
                  borderTopLeftRadius: "30px",
                  borderTopRightRadius: "30px",
                  transition: "transform 0.4s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />
  
              {/* 📋 Textbereich */}
              <Box sx={{ p: { xs: 3, md: 4 }, textAlign: "center" }}>
    
<Typography
  sx={{
    color: "#5a4b3c",
    fontSize: { xs: "1rem", md: "1.05rem" },
    lineHeight: 1.85,
    letterSpacing: "0.2px",
    mb: 3,
  }}
>
  Le module <strong>d’intégration caisse</strong> de Techgastro fonctionne
  avec <strong>SumUp, Lightspeed, Vectron, Orderbird</strong> et bien d’autres
  systèmes. Toutes les commandes issues du QR-ordering ou du Webshop sont
  transférées directement dans le système de caisse et gérées de façon
  centralisée.
  <br />
  <br />
  Ainsi, tu as <strong>toutes les commandes, les paiements et les rapports</strong>{" "}
  au même endroit – sans double saisie, sans erreurs ni ruptures de média.
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
                  href="https://wa.me/491622982160?text=Bonjour!"
                target="_blank"
              >
                  ➜   Demande d’intégration 
                </Button>
              </Box>
            </Box>
  </Container>


  {/* 💻 DESKTOP */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
  >

    {/* Image */}
 <motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  style={{
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Box
    sx={{
      position: "relative",
      width: "100%",
      maxWidth: 480,
      borderRadius: "30px",
      overflow: "hidden",
    }}
  >
    {/* ⭐ Soft Ambient Glow */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at 50% 120%, rgba(37,211,102,0.18), transparent 70%)",
        zIndex: 0,
      }}
    />

    {/* 📱 Bild */}
    <Box
      component="img"
       s src="/integration.png"
        alt="Intégration avec les systèmes de caisse"

      sx={{
        width: "100%",
        borderRadius: "30px",
        position: "relative",
        zIndex: 2,
        boxShadow:
          "0 18px 40px rgba(0,0,0,0.18), 0 6px 20px rgba(37,211,102,0.15)",
        transform: "scale(1)",
        transition:
          "transform 0.45s ease, box-shadow 0.45s ease, filter 0.45s ease",
        "&:hover": {
          transform: "scale(1.04)", // sanfter Zoom
          boxShadow:
            "0 26px 55px rgba(0,0,0,0.22), 0 10px 28px rgba(37,211,102,0.25)",
          filter: "brightness(1.05)",
        },
      }}
    />
  </Box>
</motion.div>


    {/* Texte */}
<motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
  style={{ flex: 1 }}
>
  {/* Mini-Badge */}
<Box
  sx={{
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    mb: 1.5,
    px: 1.6,
    py: 0.6,
    borderRadius: "999px",
    backgroundColor: "rgba(37,211,102,0.18)",
    border: "1px solid rgba(37,211,102,0.4)",
  }}
>
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      bgcolor: "#25D366",
    }}
  />
  <Typography
    variant="overline"
    sx={{
      color: "#25D366",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      fontSize: "0.7rem",
    }}
  >
    Module d’intégration caisse de la plateforme Techgastro
  </Typography>
</Box>


  {/* Haupttitel */}
  <Typography
    variant="h3"
    sx={{
      fontWeight: 800,
      fontSize: { xs: "2rem", md: "2.8rem" },
      lineHeight: 1.15,
      mb: 2,
      color: "#0b2341",
    }}
  >
    Techgastro s’intègre parfaitement à ton système de caisse
  </Typography>

  {/* Beschreibung */}
<Typography
  sx={{
    fontSize: { xs: "1rem", md: "1.05rem" },
    lineHeight: 1.9,
    color: "rgba(0,0,0,0.78)",
    mb: 3,
    maxWidth: 560,
  }}
>
  Que tu utilises <strong>SumUp, Lightspeed, Vectron, Orderbird</strong> ou
  un autre système de caisse – le module <strong>d’intégration caisse Techgastro</strong>
  s’intègre de manière fluide. Toutes les commandes issues du QR-ordering ou
  du Webshop sont transférées directement dans le système de caisse et gérées
  de façon centralisée.
  <br />
  <br />
  Ainsi, tu as <strong>toutes les commandes, les paiements et les rapports</strong>{" "}
  au même endroit – sans double saisie, sans erreurs ni ruptures de média.
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

  {/* CTA-Button + kleiner Hint */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 1,
    }}
  >
    <Button
      variant="contained"
      sx={{
        bgcolor: "#25D366",
        color: "white",
        fontWeight: 700,
        fontSize: { xs: "1rem", md: "1.05rem" },
        px: 5,
        py: 1.4,
        borderRadius: "50px",
        boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
        textTransform: "none",
        "&:hover": {
          bgcolor: "#1ebe5d",
          transform: "translateY(-4px)",
        },
      }}
      href="https://wa.me/491622982160?text=Bonjour!"
      target="_blank"
    >
      Demande d’intégration 
    </Button>

    <Typography
      sx={{
        fontSize: "0.85rem",
        color: "rgba(0,0,0,0.6)",
      }}
    >
      Démonstration en direct via WhatsApp.
    </Typography>
  </Box>
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
    {/* 🔹 Modul-Badge */}
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        mb: 2,
        px: 1.6,
        py: 0.6,
        borderRadius: "999px",
        backgroundColor: "rgba(37,211,102,0.18)",
        border: "1px solid rgba(37,211,102,0.4)",
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "#25D366",
        }}
      />
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          fontSize: "0.7rem",
        }}
      >
        Module de paiements de la plateforme Techgastro
      </Typography>
    </Box>

    {/* 🧾 Titel */}
    <Typography
      variant="h3"
      sx={{
        fontWeight: 800,
        fontSize: { xs: "1.9rem", md: "2.8rem" },
        lineHeight: 1.2,
        mb: 2,
        color: "#1d3a2d",
      }}
    >
      Moyens de paiement flexibles
      <br />
      pour tes clients
    </Typography>

    {/* 💬 Beschreibung */}
    <Typography
      sx={{
        fontSize: { xs: "1rem", md: "1.1rem" },
        lineHeight: 1.7,
        color: "rgba(0,0,0,0.75)",
        mb: 5,
        maxWidth: { xs: 360, md: 600 },
      }}
    >
      Le module <strong>paiements</strong> de Techgastro te permet de laisser
      tes clients payer <strong>directement à table, au kiosque ou en ligne</strong> –
      rapidement, en toute sécurité et avec une gestion centralisée.
      <br />
      <br />
      Accepte tous les moyens de paiement modernes sans effort supplémentaire
      et garde <strong>toutes les transactions au même endroit</strong>.
    </Typography>

    {/* 💳 Ligne de logos */}
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
              filter:
                "drop-shadow(0px 3px 6px rgba(0,0,0,0.15)) brightness(1.05)",
              transform: "translateZ(15px)",
            }}
            whileHover={{
              scale: 1.05,
              filter:
                "drop-shadow(0px 6px 10px rgba(37,211,102,0.3)) brightness(1.1)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          />
        </motion.div>
      ))}
    </Box>
  </Container>
</Box>

{/* 💫 Barre de services défilante – optimisée pour mobile */}
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
      "0%": {
        background: "linear-gradient(180deg, #e8f8ef 0%, #ffffff 100%)",
      },
      "50%": {
        background: "linear-gradient(180deg, #dff3e9 0%, #f9fdfb 100%)",
      },
      "100%": {
        background: "linear-gradient(180deg, #e8f8ef 0%, #ffffff 100%)",
      },
    },
  }}
>
  {/* Licht-Effekt an den Seiten */}
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

  {/* 🟢 Modul-/Use-Case-Badge oben zentriert */}
  <Box
    sx={{
      position: "relative",
      zIndex: 3,
      textAlign: "center",
      mb: { xs: 3, md: 4 },
    }}
  >
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        px: 1.8,
        py: 0.7,
        borderRadius: "999px",
        backgroundColor: "rgba(37,211,102,0.18)",
        border: "1px solid rgba(37,211,102,0.4)",
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          bgcolor: "#25D366",
        }}
      />
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          fontSize: "0.7rem",
        }}
      >
        Scénarios d’utilisation de la plateforme Techgastro
      </Typography>
    </Box>
  </Box>

  {/* 🔁 Laufband mit Use Cases */}
  <Box
    sx={{
      position: "relative",
      zIndex: 3,
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
          gap: { xs: 3, md: 8 },
          px: { xs: 4, md: 6 },
        }}
      >
        {[
          { icon: "🍔", label: "Kiosque self-ordering" },
          { icon: "🧾", label: "Précommande" },
          { icon: "🚗", label: "Livraison" },
          { icon: "🍽️", label: "Réservation de table" },
          { icon: "📦", label: "Retrait sur place" },
          { icon: "🎫", label: "Affichage des numéros d’attente" },
          { icon: "🛒", label: "Boutique en ligne" },
        ].map((item, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
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
                background:
                  "linear-gradient(135deg, #25D366 0%, #1ebe5d 100%)",
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


   {/* 🔄 Impact */}
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
    {/* 🧭 Titre & Badge avec animation */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        {/* Badge plateforme */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            px: 1.8,
            py: 0.7,
            borderRadius: "999px",
            backgroundColor: "rgba(37,211,102,0.18)",
            border: "1px solid rgba(37,211,102,0.4)",
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "#25D366",
            }}
          />
          <Typography
            variant="overline"
            sx={{
              color: "#25D366",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              fontSize: "0.7rem",
            }}
          >
            L’impact de la plateforme Techgastro
          </Typography>
        </Box>
      </Box>
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
        Plus de chiffre d’affaires. Moins de stress.
        <br />
        Des clients plus satisfaits.
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
        Avec la <strong>plateforme Techgastro</strong> – composée de modules
        comme le <strong>QR-Ordering</strong>, le <strong>kiosque</strong>, le{" "}
        <strong>Webshop</strong>, le <strong>KDS</strong>, l’
        <strong>écran de retrait</strong> et les <strong>paiements intégrés</strong> –  
        tu augmentes ton chiffre d’affaires, réduis ta charge de travail et rends
        tes clients plus heureux.
        <br />
        <br />
        À table, au kiosque ou via QR-code sur le téléphone : la plateforme
        s’adapte à ton établissement – et non l’inverse.
      </Typography>
    </motion.div>

    {/* 🌍 Avantages / indicateurs avec animation */}
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
          href="https://wa.me/491622982160?text=Bonjour!"
          target="_blank"
        >
          Découvrir tous les avantages
        </Button>
      </Box>
    </motion.div>
  </Container>
</Box>



{/* 💎 SECTION — Pourquoi Techgastro */}
<Box
  id="ueberuns"
  sx={{
    py: { xs: 10, md: 16 },
    px: { xs: 2, sm: 4, md: 6, lg: 10 },
    background: "linear-gradient(180deg, #e9f7f1 0%, #ffffff 100%)",
  }}
>
  <Container maxWidth="xl">
    {/* 🩺 Titre principal */}
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
        Notre expérience fait la différence
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
        Pourquoi les professionnels choisissent Techgastro
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
        Développé par des <strong>ingénieur·e·s</strong> et des{" "}
        <strong>expert·e·s de la restauration</strong>,{" "}
        <strong>Techgastro</strong> allie expertise technique et connaissance du terrain.
        Notre solution cloud prend tout en charge – du support continu aux mises à jour automatiques.
      </Typography>
    </Box>

    {/* 🌿 Contenu */}
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
      {/* 🧠 Texte à gauche */}
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
            title: "Hébergement cloud sécurisé",
            desc: "Vos données sont dans le cloud, disponibles à tout moment – avec sauvegardes automatiques et chiffrement complet.",
          },
          {
            icon: "🔄",
            title: "Mises à jour automatiques",
            desc: "Les nouvelles fonctionnalités sont déployées sans interruption de service.",
          },
          {
            icon: "🧑‍💻",
            title: "Support dédié",
            desc: "Notre équipe vous accompagne au quotidien – avec un contrat de support incluant conseil et accompagnement.",
          },
          {
            icon: "💬",
            title: "Automatisation intelligente",
            desc: "Commandes & paiements fonctionnent 24h/24 via WhatsApp et les systèmes de kiosque.",
          },
          {
            icon: "🔒",
            title: "Protection des données & conformité",
            desc: "Conforme aux exigences légales, y compris TSE pour les caisses en Allemagne.",
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

      {/* 🎥 Image à droite */}
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
          href="https://wa.me/491622982160?text=Bonjour!"
        target="_blank"
      >
        Commencer avec Techgastro dès aujourd’hui
      </Button>
    </Box>
  </Container>
</Box>


{/* 🌱 IMPACT / IMPACT */}
<Box
  id="impact"
  sx={{
    py: { xs: 10, md: 14 },
    background: "linear-gradient(180deg, #ffffff 0%, #f1f8f4 100%)",
    color: "#0b2341",
  }}
>
  <Container maxWidth="lg">
    {/* 🩺 Titre principal */}
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
      Notre présence & nos résultats
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
      Techgastro digitalise les établissements de restauration
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
      Notre solution cloud accompagne les restaurants en{" "}
      <strong>Allemagne</strong> et dans la <strong>région DACH</strong>{" "}
      dans la digitalisation de leur quotidien – pour plus d’efficacité,
      de transparence et des processus modernes au service.
    </Typography>

    {/* 🌍 Statistiques */}
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
        { number: "2", suffix: "pays", text: "Région DACH", icon: "🌍" },
        {
          number: "10+",
          suffix: "sites",
          text: "premiers partenaires de restauration",
          icon: "🏪",
        },
        {
          number: "2k+",
          suffix: "commandes",
          text: "traitées chaque mois",
          icon: "🧾",
        },
        {
          number: "+10%",
          suffix: "",
          text: "de gain de temps au service",
          icon: "⏱️",
        },
        {
          number: "+15%",
          suffix: "",
          text: "de gain d’efficacité opérationnelle",
          icon: "⚙️",
        },
        {
          number: "−20%",
          suffix: "",
          text: "d’erreurs de saisie en moins",
          icon: "📉",
        },
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
          href="https://wa.me/491622982160?text=Bonjour!"
        target="_blank"
      >
        Découvrir notre impact
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
            src="/logoGastroTransparent.png"
            alt="Gastrosoft Logo"
            sx={{ width: 150, mb: 2 }}
          />
          <Typography sx={{ opacity: 0.85 }}>
           Votre plateforme intelligente pour une restauration digitalisée – 
           conçue pour simplifier votre quotidien.
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
          {["À propos de nous", "Nous contacter", "Services", "Partenaires", "Actualités"].map(
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
          Contact
        </Typography>
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Typography sx={{ mb: 1 }}>📞 (+49) 1622982162</Typography>
          <Typography sx={{ mb: 1 }}>✉️ kontakt@Techgastro.de</Typography>
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
      © {new Date().getFullYear()} Techgastro — Tous droits réservés.

    </Typography>
  </Container>

  {/* Schwebender WhatsApp-Button */}
       {/* 💬 SCHWEBENDER SOCIAL BUTTON — mittig rechts */}
   <Box
  sx={{
    position: "fixed",
    bottom: 28,       // 👈 Button sitzt jetzt unten
    right: 24,
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
                href="https://wa.me/491622982162?text=Bonjour!"
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

