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
              height: { xs: 65, md: 90 },
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
                    sx={{ fontWeight: 700, mb: 2, color: "#25D366" }}
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
                    sx={{ fontWeight: 700, mb: 2, color: "#25D366" }}
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
 

{/* Mobile Button (XS–SM) */}
<Button
  variant="contained"
    href="https://wa.me/491622982160?text=Bonjour!"
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
    href="https://wa.me/491622982160?text=Bonjour!"
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
      Pour les restaurants & cafés d’aujourd’hui
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
    Lorsque les équipes sont débordées, <br />Techgastro assure la continuité du service.
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
     Commander en digital. Payer rapidement. Profiter en toute tranquillité. <br />
<strong>Techgastro</strong> – la solution intelligente pour les restaurants & cafés modernes.
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
      href="https://wa.me/491622982160?text=Bonjour!"
      target="_blank"
    >
Découvrir Techgastro maintenant
    </Button>
  </Container>
</Box>


         
        </>
      )}

  

{/* 🔄 Self-Ordering */}
<Box
  id="self-ordering"
  sx={{
    py: { xs: 12, md: 16 },
    bgcolor: "rgba(37,211,102,0.05)",
    position: "relative",
    overflow: "hidden",
  }}
>

  {/* 📱 LAYOUT MOBILE (Titre → Image → Description) */}
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
        Commander digitalement en toute simplicité
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
        Self-ordering avec QR-Code – <br />
        rapide, simple & sans contact
      </Typography>
    </motion.div>

    {/* Image */}
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
        alt="Application self-ordering sur iPhone"
        sx={{
          width: "100%",
          maxWidth: 320, // plus petit pour le mobile
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

    {/* Description */}
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
        Avec <strong>Techgastro QR-Ordering</strong>, vos clients commandent
        confortablement depuis la table – sans devoir attendre le serveur.  
        Ils scannent le QR-Code, consultent la carte numérique, commandent
        et paient directement.  
        <br /><br />
        Commande prête → <strong>notification WhatsApp automatique</strong> 
        ou affichage sur l’<strong>écran de retrait</strong>.  
        <br /><br />
        Réduisez les temps d’attente, augmentez la fréquence des commandes
        et soulagez votre équipe – idéal en cas de <strong>manque de personnel</strong>
        ou de forte affluence.
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
          width: "100%", // bouton en pleine largeur sur mobile
          maxWidth: 280,
          mx: "auto",
        }}
          href="https://wa.me/491622982160?text=Bonjour!"
        target="_blank"
      >
        Tester le self-ordering maintenant
      </Button>
    </motion.div>
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

  {/* Texte à gauche */}
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
      Commander digitalement en toute simplicité
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
      Self-ordering avec QR-Code –  
      <br />
      rapide, simple & sans contact
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
      Avec <strong>Techgastro QR-Ordering</strong>, vos clients commandent
      très facilement depuis la table – sans devoir attendre le serveur.  
      Ils scannent simplement le QR-Code, voient votre carte numérique,
      commandent et paient directement.

      <br /><br />
      Dès que la commande est prête, le client reçoit automatiquement une 
      <strong> notification WhatsApp </strong> ou voit son numéro sur
      l’<strong> écran de retrait </strong>.

      <br /><br />
      Vous réduisez ainsi les temps d’attente, augmentez la fréquence des commandes
      et soulagez votre équipe – idéal en cas de <strong>manque de personnel</strong>
      ou de forte affluence.
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
      href="https://wa.me/491622982160?text=Bonjour!"
      target="_blank"
    >
      Tester le self-ordering
    </Button>
  </motion.div>

  {/* Image à droite */}
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
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
      alt="Application self-ordering sur iPhone"
      sx={{
        width: "100%",
        maxWidth: 460,
        borderRadius: "30px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
        transform: "rotate(4deg)", // 👉 leichte Gegenrotation für visuelles Gleichgewicht
        transition: "transform 0.5s ease",
        "&:hover": {
          transform: "rotate(0deg) scale(1.03)",
        },
      }}
    />
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
      gap: 3,
      px: 2,
    }}
  >

    {/* Titre */}
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
        Cuisine moderne. Organisation digitale.
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
        KSD – ton moniteur de cuisine digital  
        pour des processus rapides & sans erreur
      </Typography>
    </motion.div>

    {/* Image */}
   {/* Image — optimisé pour mobile */}
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
    alt="KSD – Moniteur de cuisine"
    sx={{
      width: { xs: "75%", sm: "70%" },   // 👉 kleiner & eleganter
      maxWidth: 320,                     // 👉 statt 420–520px
      borderRadius: "18px",
      boxShadow: "0 12px 30px rgba(0,0,0,0.10)",
      transform: "rotate(-3deg) scale(1.02)",   // 👉 subtiler
      transition: "transform 0.45s ease",
      "&:hover": {
        transform: "rotate(0deg) scale(1.05)",  // sanftes Hover
      },
    }}
  />
</motion.div>


    {/* Description */}
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
        Notre <strong>moniteur de cuisine KSD</strong> propulse ta cuisine 
        dans l’ère moderne de la restauration – complètement 
        <strong> sans imprimante de cuisine </strong>, si tu le souhaites.  
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
        Découvrir KSD maintenant
      </Button>
    </motion.div>
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      style={{ flex: 1, display: "flex", justifyContent: "center" }}
    >
      <Box
        component="img"
        src="/ksd.png"
        alt="Moniteur de cuisine digital"
        sx={{
          width: "100%",
          maxWidth: 600,        // auparavant 460, maintenant plus grand
          borderRadius: "30px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
          transform: "rotate(-3deg)",
          transition: "transform 0.5s ease",
          "&:hover": { transform: "rotate(0deg) scale(1.03)" },
        }}
      />
    </motion.div>

    {/* Texte */}
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
        Organisation moderne de la cuisine
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
        KSD – moniteur de cuisine digital  
        pour une efficacité & une clarté maximales
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
        Avec le <strong>moniteur de cuisine KSD</strong>, les commandes arrivent
        dans ta cuisine de manière digitale, claire et sans délai.  
        Idéal pour les concepts modernes comme le <strong>self-ordering, service au comptoir,
        fast-food, food-courts</strong> et bien plus encore.

        <br /><br />
        Dis adieu au chaos des tickets papier :  
        <strong>100% digital, aucune imprimante nécessaire</strong> – sauf si tu en veux une.

        <br /><br />
        KSD réduit les erreurs, accélère les processus et apporte plus de calme
        et de structure à ton équipe – même en période de forte affluence.
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
          href="https://wa.me/491622982160?text=Bonjour!"
        target="_blank"
      >
        Voir KSD en action
      </Button>
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
      gap: 3, // un peu plus compact sur mobile
      px: 2,
    }}
  >
    {/* Titre */}
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
        Commande moderne au kiosque
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
        Le <strong>système de kiosque Techgastro</strong> – <br />
        rapide, efficace & intuitif
      </Typography>
    </motion.div>

    {/* Image */}
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
        alt="Système de kiosque Gastrosoft"
        sx={{
          width: "100%",
          maxWidth: 320, // plus petit pour mobile
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

    {/* Description */}
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
        Ton <strong>système de kiosque</strong> permet à tes clients de commander
        directement dans le restaurant – sans faire la queue.  
        Parfaitement connecté à ta <strong>caisse Techgastro</strong>, les commandes
        arrivent automatiquement dans le système de cuisine.  
        <br /><br />
        Que ce soit à <strong>l’heure du déjeuner</strong> ou en période de <strong>forte affluence</strong> –
        ton équipe reste soulagée, pendant que les clients commandent et paient
        rapidement et sans contact.
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
          boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
          "&:hover": {
            bgcolor: "#1ebe5d",
            transform: "translateY(-3px)",
          },
          width: "100%", // pleine largeur sur mobile
          maxWidth: 280,
          mx: "auto",
        }}
         href="https://wa.me/491622982160?text=Bonjour!"
        target="_blank"
      >
        Découvrir le système de kiosque
      </Button>
    </motion.div>
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
      <Typography
        variant="overline"
        sx={{
          color: "#25D366",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        Commande moderne au kiosque
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
        Le <strong>système de kiosque Techgastro</strong> –  
        <br />
        rapide, efficace & intuitif
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
        Ton <strong>système de kiosque</strong> permet à tes clients de commander
        directement dans le restaurant – sans file d’attente.  
        Le système est parfaitement intégré à ta <strong>caisse Techgastro</strong>,
        de sorte que les commandes arrivent automatiquement dans la cuisine.  
        <br /><br />
        Que ce soit à <strong>l’heure du déjeuner</strong> ou en cas de <strong>forte affluence</strong> –
        ton équipe reste soulagée, pendant que les clients commandent et paient
        rapidement et sans contact.
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
          boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
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
    </motion.div>

    {/* 🖥️ Image à droite */}
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
        alt="Système de kiosque Gastrosoft"
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



<Box
  sx={{
    py: { xs: 6, md: 10 },
    px: { xs: 2, md: 6 },
    background: "#F8FAFC",
  }}
>
  <Container maxWidth="lg">
    {/* Titre */}
    <Typography
      sx={{
        fontSize: { xs: "1.8rem", md: "3rem" },
        fontWeight: 800,
        color: "#0B2341",
        textAlign: "center",
        mb: 4,
      }}
    >
      Écran de retrait digital
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
      Affiche les numéros de commande de manière claire et lisible.
      Parfaitement intégré à notre système moderne de commande au kiosque –
      rapide, efficace et orienté client.
    </Typography>

    {/* Image + fonctionnalités côte à côte */}
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
        alt="Écran de retrait digital"
        sx={{
          width: { xs: "120%", md: "60%" },
          borderRadius: 4,
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        }}
      />

      {/* Cartes de fonctionnalités à droite */}
      <Box
        sx={{
          width: { xs: "100%", md: "48%" },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Carte 1 */}
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
            Affichage en temps réel
          </Typography>
          <Typography sx={{ color: "#4A5568", lineHeight: 1.6 }}>
            Les numéros de commande se mettent à jour en temps réel – sans rechargement.
          </Typography>
        </Box>

        {/* Carte 2 */}
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
            Grande & claire visibilité
          </Typography>
          <Typography sx={{ color: "#4A5568", lineHeight: 1.6 }}>
            Parfaitement lisible – même dans des restaurants bruyants et bondés.
          </Typography>
        </Box>

        {/* Carte 3 */}
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
            Synchronisé avec le kiosque
          </Typography>
          <Typography sx={{ color: "#4A5568", lineHeight: 1.6 }}>
            La cuisine clique sur « Terminé » → affichage immédiat sur l’écran.
          </Typography>
        </Box>

        {/* Carte 4 */}
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
            Branding personnalisé
          </Typography>
          <Typography sx={{ color: "#4A5568", lineHeight: 1.6 }}>
            Couleurs, logo et mise en page s’adaptent à l’identité de ton restaurant.
          </Typography>
        </Box>
      </Box>
    </Box>

    {/* Bouton */}
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Button
        variant="contained"
        href="https://wa.me/491622982160?text=Bonjour!"
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
        <Box sx={{ display: { xs: "block", md: "none" } }}>Essayer</Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          Essayer gratuitement
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
  {/* 📱 LAYOUT MOBILE */}
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
    {/* Titre */}
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
        Vendre en ligne – sans commission
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
        Ta propre boutique en ligne –<br /> moderne, indépendante & sans commission
      </Typography>
    </motion.div>

    {/* Image sous le titre */}
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
        alt="Aperçu de la boutique en ligne"
        sx={{
          width: "100%",
          maxWidth: 320,
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        }}
      />
    </motion.div>

    {/* Description */}
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
        Avec le <strong>Webshop Techgastro</strong>, tu atteins directement tes clients –  
        sans passer par Lieferando, Wolt ou Uber Eats.  
        Tu gardes <strong>100 % de tes revenus</strong>,  
        tu gardes le contrôle total sur <strong>tes données, tes commandes et la relation client</strong>  
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
        Lancer ma propre boutique en ligne
      </Button>
    </motion.div>
  </Container>

  {/* 💻 DESKTOP reste identique en layout */}
  <Container
    maxWidth="lg"
    sx={{
      display: { xs: "none", md: "flex" },
      flexDirection: "row-reverse",
      alignItems: "center",
      gap: 10,
    }}
  >
    {/* Image Desktop */}
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
          alt="Aperçu de la boutique en ligne"
          sx={{
            width: "100%",
            maxWidth: 750,
            borderRadius: "30px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.2)",
          }}
        />
      </Box>
    </motion.div>

    {/* Texte Desktop */}
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
        Vendre en ligne – sans commission
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
        Ta propre boutique en ligne –<br /> moderne, indépendante & sans commission
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
        Avec le <strong>Webshop Techgastro</strong>, tu atteins directement tes clients –  
        sans passer par Lieferando, Wolt ou Uber Eats.  
        Tu gardes <strong>100 % de tes revenus</strong>,  
        tu gardes le contrôle total sur <strong>tes données, tes commandes et la relation client</strong>  
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
          fontSize: "1.1rem",
          px: 5,
          py: 1.5,
          borderRadius: "50px",
          boxShadow: "0 8px 25px rgba(37,211,102,0.3)",
          "&:hover": { bgcolor: "#1ebe5d", transform: "translateY(-4px)" },
        }}
         href="https://wa.me/491622982160?text=Bonjour!"
        target="_blank"
      >
        Lancer ma propre boutique en ligne
      </Button>
    </motion.div>
  </Container>

  {/* 💫 Décor de fond */}
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
    // backgroundImage: "url('/table-bg.jpg')", // optionnel
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    overflow: "hidden",
    color: "#0b2341",
  }}
>
  {/* Overlay pour la lisibilité */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      bgcolor: "rgba(37,211,102,0.05)",
      zIndex: 1,
    }}
  />

  {/* 📱 LAYOUT MOBILE */}
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
    {/* Zone de texte */}
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
        Réservation de table en ligne
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
        Plus jamais de réservations manquées –<br /> digital, rapide et automatisé.
      </Typography>

      {/* Image sous le texte */}
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
          alt="Réservation de table digitale"
          sx={{
            width: "100%",
            maxWidth: 320,
            borderRadius: "20px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
            transform: "rotate(2deg)",
            transition: "transform 0.5s ease",
            mb: 4,
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
        Avec la <strong>réservation de tables Techgastro</strong>, tes clients peuvent réserver
        <strong> en ligne 24h/24</strong> – via ton site, la boutique en ligne ou
        un <strong>QR-code</strong> à l’entrée.  
        Tu reçois automatiquement une notification, et la table est immédiatement
        bloquée dans le système.  
        Tu gagnes du temps, tu évites les doubles réservations et tu impressionnes
        tes clients avec un service moderne.
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
        Activer la réservation de tables
      </Button>
    </motion.div>
  </Container>

  {/* 💻 DESKTOP */}
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
    {/* Texte à gauche */}
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
        Réservation de table en ligne
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
        Plus jamais de réservations manquées –<br /> digital, rapide et automatisé.
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
        Avec la <strong>réservation de tables Techgastro</strong>, tes clients peuvent réserver
        <strong> en ligne 24h/24</strong> – via ton site, la boutique en ligne ou
        un <strong>QR-code</strong> à l’entrée.  
        Tu reçois automatiquement une notification, et la table est immédiatement
        bloquée dans le système.  
        Tu gagnes du temps, tu évites les doubles réservations et tu impressionnes
        tes clients avec un service moderne.
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
          href="https://wa.me/491622982160?text=Bonjour!"
        target="_blank"
      >
        Activer la réservation de tables
      </Button>
    </motion.div>

    {/* Image à droite */}
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
        alt="Réservation de table digitale"
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
  {/* 📱 LAYOUT MOBILE */}
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
    {/* Texte */}
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
        Compatible avec tous les systèmes de caisse
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
        Techgastro s’intègre parfaitement à ton système de caisse
      </Typography>

      {/* Image sous le texte */}
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
          alt="Intégration avec les systèmes de caisse"
          sx={{
            width: "100%",
            maxWidth: 320,
            borderRadius: "20px",
            boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
            transform: "rotate(2deg)",
            transition: "transform 0.5s ease",
            mb: 4,
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
        Que tu utilises <strong>SumUp, Lightspeed, Vectron, Orderbird</strong> ou un autre
        système de caisse – <strong>Techgastro</strong> s’intègre de manière fluide.  
        Toutes les commandes issues du QR-ordering ou du Webshop sont transférées
        directement dans le système de caisse et gérées de façon centralisée.  
        <br /><br />
        Ainsi, tu as <strong>toutes les commandes, les paiements et les rapports</strong> au même endroit –  
        sans double saisie, sans erreurs ni ruptures de média.
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
        Demander l’intégration maintenant
      </Button>
    </motion.div>
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
    {/* Image à gauche */}
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
        alt="Intégration avec les systèmes de caisse"
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

    {/* Texte à droite */}
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
        Compatible avec tous les systèmes de caisse
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
        Techgastro s’intègre parfaitement à ton système de caisse
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
        Que tu utilises <strong>SumUp, Lightspeed, Vectron, Orderbird</strong> ou un autre
        système de caisse – <strong>Techgastro</strong> s’intègre de manière fluide.  
        Toutes les commandes issues du QR-ordering ou du Webshop sont transférées
        directement dans le système de caisse et gérées de façon centralisée.  
        <br /><br />
        Ainsi, tu as <strong>toutes les commandes, les paiements et les rapports</strong> au même endroit –  
        sans double saisie, sans erreurs ni ruptures de média.
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
         href="https://wa.me/491622982160?text=Bonjour!"
        target="_blank"
      >
        Demander l’intégration maintenant
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
      Moyens de paiement flexibles <br /> pour tes clients
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
      Laisse tes clients payer directement à table ou en ligne – rapidement,
      en toute sécurité et avec une gestion centralisée. <br />
      Accepte tous les moyens de paiement modernes, sans effort supplémentaire.
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
      "0%": { background: "linear-gradient(180deg, #e8f8ef 0%, #ffffff 100%)" },
      "50%": { background: "linear-gradient(180deg, #dff3e9 0%, #f9fdfb 100%)" },
      "100%": { background: "linear-gradient(180deg, #e8f8ef 0%, #ffffff 100%)" },
    },
  }}
>
  {/* Effets de brillance latéraux */}
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
    {/* 🧭 Titre & texte avec animation */}
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
        Notre impact dans la restauration
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
        Plus de chiffre d’affaires. Moins de stress. Des clients plus satisfaits.
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
        Avec <strong>Techgastro Self-Ordering</strong>, tu augmentes ton chiffre d’affaires,
        réduis ta charge de travail et rends tes clients plus heureux – sans matériel coûteux
        ni systèmes compliqués. À table, au kiosque ou via QR-code sur le téléphone :
        notre solution s’adapte à ton établissement – et non l’inverse.
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
                href="https://wa.me/491622982160?text=Bonjour!"
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

