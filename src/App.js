import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

import HistoryIcon from "@mui/icons-material/History";

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LanguageIcon from "@mui/icons-material/Language";

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

   
} from "@mui/material";
import {
  

  TextField,
  Divider,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaymentIcon from "@mui/icons-material/Payment";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MenuIcon from "@mui/icons-material/Menu";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import {
  AccessTime as AccessTimeIcon,
  PeopleAlt as PeopleAltIcon,
  RecordVoiceOver as RecordVoiceOverIcon,
} from "@mui/icons-material";


// 🎨 Thème principal
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
  const [showIntro, setShowIntro] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
// 🔽 États pour le menu mobile
const [anchorEl, setAnchorEl] = useState(null);


const handleMenu = (e) => setAnchorEl(e.currentTarget);
const handleClose = () => setAnchorEl(null);

// 🔽 Fonction de scroll fluide vers les sections
const handleScrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  handleClose();
};

  // Ferme automatiquement l’intro après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* 🌟 Écran d’intro avec le logo-vidéo */}
{showIntro && (
  <Box
    sx={{
      position: "fixed",
      inset: 0,
      bgcolor: "rgba(11,35,65,0.95)",
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "white",
      p: 3,
      animation: "fadeIn 0.8s ease",
      "@keyframes fadeIn": {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    }}
  >
    {/* 💬 Message de bienvenue */}
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        mb: 2,
        color: "#25D366",
        fontSize: { xs: "1.8rem", md: "2.5rem" },
      }}
    >
      Bienvenue sur SmartDoctors
    </Typography>

    <Typography
      variant="h6"
      sx={{
        maxWidth: 500,
        mb: 5,
        fontWeight: 400,
        color: "rgba(255,255,255,0.9)",
        fontSize: { xs: "1rem", md: "1.25rem" },
        lineHeight: 1.6,
      }}
    >
      La plateforme gratuite et intelligente pour nos partenaires médicaux.
    </Typography>

    {/* 🟢 Bouton CTA */}
    <Button
      variant="contained"
      sx={{
        bgcolor: "#25D366",
        color: "white",
        fontWeight: 700,
        fontSize: { xs: "1rem", md: "1.2rem" },
        px: 5,
        py: 1.5,
        borderRadius: "30px",
        textTransform: "none",
        boxShadow: "0 10px 25px rgba(37,211,102,0.4)",
        "&:hover": {
          bgcolor: "#1ebe5d",
          transform: "scale(1.05)",
        },
        transition: "all 0.3s ease",
      }}
      onClick={() => setShowIntro(false)}
    >
      Commencer
    </Button>
  </Box>
)}


      {/* 🌐 Contenu principal (visible après la vidéo) */}
      {!showIntro && (
        <>
          {/* 🔝 HEADER */}
{/* 🔝 HEADER avec navigation */}
{/* 🔝 HEADER — s’affiche seulement si le menu mobile n’est pas ouvert */}
{!anchorEl && (
  <AppBar
    position="fixed"
    sx={{
      bgcolor: "white",
      color: "#0B2341",
      boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
      px: { xs: 2, md: 8 },
      py: 1,
      zIndex: 10,
    }}
  >
    <Toolbar sx={{ justifyContent: "space-between" }}>
      {/* 🩺 Logo */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          component="img"
          src="/Logo.png"
          alt="SmartDoctors Logo"
          sx={{
            height: { xs: 65, sm: 65, md: 80 },
            width: "auto",
            mr: 1.5,
            cursor: "pointer",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.05)" },
          }}
        />
      </Box>

      {/* 🧭 Menu Desktop */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
        <Button
          color="inherit"
          sx={{
            fontWeight: 600,
            "&:hover": { color: "#25D366" },
          }}
          onClick={() => handleScrollTo("how-it-works")}
        >
          Comment ça marche
        </Button>
        <Button
          color="inherit"
          sx={{
            fontWeight: 600,
            "&:hover": { color: "#25D366" },
          }}
          onClick={() => handleScrollTo("solutions")}
        >
          Nos solutions
        </Button>
        <Button
          color="inherit"
          sx={{
            fontWeight: 600,
            "&:hover": { color: "#25D366" },
          }}
          onClick={() => handleScrollTo("tarifs")}
        >
          Nos tarifs
        </Button>
        <Button
          color="inherit"
          sx={{
            fontWeight: 600,
            "&:hover": { color: "#25D366" },
          }}
          onClick={() => handleScrollTo("about")}
        >
          À propos
        </Button>
      </Box>

{/* 🌍 Langues + WhatsApp CTA */}
{/* 🌍 Langues + WhatsApp CTA + Menüicon */}
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: { xs: 1, md: 2 }, // 👈 enger auf Mobile
  }}
>
  {/* Sprachen */}
  <Typography
    variant="body2"
    sx={{
      fontWeight: 600,
      color: "#0B2341",
      cursor: "pointer",
      "&:hover": { color: "#25D366" },
    }}
  >
    FR
  </Typography>
  <Typography sx={{ color: "gray" }}>|</Typography>
  <Typography
    variant="body2"
    sx={{
      fontWeight: 600,
      color: "#0B2341",
      cursor: "pointer",
      "&:hover": { color: "#25D366" },
    }}
  >
    AR
  </Typography>

  {/* CTA nur Desktop */}
  <Button
    variant="contained"
    sx={{
      display: { xs: "none", md: "inline-flex" },
      bgcolor: "#25D366",
      color: "white",
      fontWeight: 600,
      borderRadius: "999px",
      px: 3,
      py: 1,
      ml: { xs: 0, md: 1 },
      "&:hover": { bgcolor: "#1ebe5d" },
    }}
    href="https://wa.me/212600000000?text=Bonjour%20SmartDoctors!"
    target="_blank"
  >
    ESSAI GRATUIT
  </Button>

  {/* ☰ Menüicon — sichtbar nur auf Mobile */}
  <IconButton
    color="inherit"
    onClick={() => setAnchorEl(true)}
    sx={{
      display: { xs: "flex", md: "none" },
      ml: { xs: 0.5, md: 0 }, // 👈 sehr kleiner Abstand zu FR|AR
    }}
  >
    <MenuIcon sx={{ fontSize: 28 }} />
  </IconButton>
</Box>

    </Toolbar>
  </AppBar>
)}


<Box sx={{ display: { xs: "flex", md: "none" } }}>
  <IconButton color="inherit" onClick={handleMenu}>
    <MenuIcon sx={{ fontSize: 28 }} />
  </IconButton>

  {/* Menu plein écran */}
  {anchorEl && (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "#0B2341",
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
      {/* ✅ Header du menu (Logo + langues) */}
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
          src="/Logo.png"
          alt="SmartDoctors Logo"
          sx={{
            height: { xs: 55, sm: 65, md: 75 },
            width: "auto",
            mr: 1,
            cursor: "pointer",
            filter:
              "brightness(1.3) drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            transition: "transform 0.3s ease",
            "&:hover": { transform: "scale(1.1)" },
          }}
        />

        {/* Sélecteur de langue */}
        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <Typography
            sx={{
              color: "#25D366",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            FR
          </Typography>
          <Typography sx={{ color: "#888" }}>|</Typography>
          <Typography
            sx={{
              color: "#fff",
              opacity: 0.8,
              fontWeight: 500,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            AR
          </Typography>
        </Box>
      </Box>

      {/* ✅ Liens du menu */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {[
          { id: "how-it-works", label: "Comment ça marche" },
          { id: "solutions", label: "Nos solutions" },
          { id: "tarifs", label: "Nos tarifs" },
          { id: "about", label: "À propos" },
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
              alignItems: "center",
              width: "100%",
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              pb: 1,
              "&:hover": {
                color: "#25D366",
              },
            }}
          >
            {item.label}
            <span style={{ fontSize: "1.5rem", marginLeft: "8px" }}>›</span>
          </Button>
        ))}
      </Box>

     {/* 🔹 Fermer + CTA nebeneinander */}
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
      borderColor: "rgba(255,255,255,0.4)",
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
    ✕ Fermer le menu
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
      "&:hover": { bgcolor: "#1ebe5d", transform: "scale(1.05)" },
      transition: "all 0.3s ease",
    }}
    href="https://wa.me/212600000000?text=Bonjour%20SmartDoctors!"
    target="_blank"
  >
    ESSAI GRATUIT
  </Button>
</Box>

    </Box>
  )}
</Box>
{/* 🩺 HERO SECTION — Text links, Bild rechts, Buttons unter dem Bild auf Mobile */}
<Box
  sx={{
    bgcolor: "#0d2b5c",
    color: "white",
    pt: { xs: 12, md: 18 },
    pb: { xs: 10, md: 14 },
    px: { xs: 2, md: 6 },
  }}
>
  <Container maxWidth="lg">
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6,
      }}
    >
      {/* 🧠 Texte - links (Desktop), oben (Mobile) */}
      <Box
        sx={{
          flex: { xs: "1 1 100%", md: "1 1 60%" },
          textAlign: { xs: "center", md: "left" },
          maxWidth: { xs: "100%", md: "650px" },
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "#25D366",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1,
            mb: 2,
            display: "block",
          }}
        >
          • Application médicale
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            mb: { xs: 4, md: 3 },
            lineHeight: 1.2,
            fontSize: { xs: "2rem", md: "2.9rem" },
            color: "white",
          }}
        >
          Vos rendez-vous et paiements automatisés sur{" "}
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              color: "#25D366",
              verticalAlign: "middle",
              animation: "pulseWhatsApp 2s infinite ease-in-out",
              "@keyframes pulseWhatsApp": {
                "0%, 100%": { transform: "scale(1)", opacity: 1 },
                "50%": { transform: "scale(1.15)", opacity: 0.85 },
              },
            }}
          >
            <WhatsAppIcon
              sx={{
                fontSize: { xs: 34, md: 40 },
                ml: 0.5,
                mr: 0.7,
                verticalAlign: "middle",
              }}
            />
          </Box>
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: { xs: 3, md: 5 },
            color: "rgba(255,255,255,0.9)",
            fontSize: { xs: "1rem", md: "1.2rem" },
            lineHeight: 1.6,
            mx: { xs: "auto", md: 0 },
          }}
        >
          Simplifiez votre gestion quotidienne avec{" "}
          <strong>SmartDoctors</strong> — la solution qui permet à vos patients
          de réserver, confirmer et payer leurs rendez-vous directement depuis
          WhatsApp. Un assistant intelligent, simple et rapide, conçu pour les
          professionnels de santé modernes.
        </Typography>

        {/* 🟢 CTA Buttons – nur auf Desktop sichtbar */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-start",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
         <Button
  variant="contained"
  sx={{
    bgcolor: "#25D366",
    color: "white", // Schriftfarbe weiß
    fontSize: { xs: "1.1rem", md: "1.3rem" },
    fontWeight: 700,
    letterSpacing: 0.5,
    borderRadius: "50px",
    px: { xs: 6, md: 8 }, // Breiter
    py: { xs: 2, md: 2.2 },
    textTransform: "none",
    boxShadow: "0 10px 25px rgba(37,211,102,0.4)", // schöner Tiefeneffekt
    transition: "all 0.4s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    "&:hover": {
      bgcolor: "#1ebe5d",
      transform: "translateY(-4px) scale(1.05)",
      boxShadow: "0 15px 35px rgba(37,211,102,0.55)",
    },
    "&:active": {
      transform: "scale(0.98)",
    },
    animation: "glowPulse 3s infinite ease-in-out",
    "@keyframes glowPulse": {
      "0%, 100%": { boxShadow: "0 0 20px rgba(37,211,102,0.4)" },
      "50%": { boxShadow: "0 0 35px rgba(37,211,102,0.7)" },
    },
  }}
  href="https://wa.me/212600000000?text=Bonjour%20SmartDoctors!"
  target="_blank"
>
  <WhatsAppIcon sx={{ fontSize: { xs: 26, md: 30 } }} />
   ESSAI GRATUIT
</Button>



        </Box>
      </Box>

      {/* 📱 Image - rechts (Desktop), in der Mitte (Mobile) */}
      <Box
        sx={{
          flex: { xs: "1 1 100%", md: "1 1 40%" },
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src="/whatsapp-Hero.png"
          alt="SmartDoctors WhatsApp"
          sx={{
            width: { xs: "75%", sm: "70%", md: "70%" },
            maxWidth: 480,
            height: "auto",
            borderRadius: 6,
            boxShadow: "0 15px 45px rgba(0,0,0,0.4)",
            animation: "floatPulse 4.5s ease-in-out infinite",
            transition: "transform 0.5s ease",
            "&:hover": { transform: "scale(1.05)" },
            "@keyframes floatPulse": {
              "0%": { transform: "translateY(0) scale(1)" },
              "50%": { transform: "translateY(-10px) scale(1.03)" },
              "100%": { transform: "translateY(0) scale(1)" },
            },
          }}
        />
      </Box>

      {/* 🟢 CTA Buttons – nur auf Mobile sichtbar (unter dem Bild) */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
          mt: 4,
        }}
      >
            <Button
  variant="contained"
  sx={{
    bgcolor: "#25D366",
    color: "white", // Schriftfarbe weiß
    fontSize: { xs: "1.1rem", md: "1.3rem" },
    fontWeight: 700,
    letterSpacing: 0.5,
    borderRadius: "50px",
    px: { xs: 6, md: 8 }, // Breiter
    py: { xs: 2, md: 2.2 },
    textTransform: "none",
    boxShadow: "0 10px 25px rgba(37,211,102,0.4)", // schöner Tiefeneffekt
    transition: "all 0.4s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    "&:hover": {
      bgcolor: "#1ebe5d",
      transform: "translateY(-4px) scale(1.05)",
      boxShadow: "0 15px 35px rgba(37,211,102,0.55)",
    },
    "&:active": {
      transform: "scale(0.98)",
    },
    animation: "glowPulse 3s infinite ease-in-out",
    "@keyframes glowPulse": {
      "0%, 100%": { boxShadow: "0 0 20px rgba(37,211,102,0.4)" },
      "50%": { boxShadow: "0 0 35px rgba(37,211,102,0.7)" },
    },
  }}
  href="https://wa.me/212600000000?text=Bonjour%20SmartDoctors!"
  target="_blank"
>
  <WhatsAppIcon sx={{ fontSize: { xs: 26, md: 30 } }} />
  ESSAI GRATUIT
</Button>

      </Box>
    </Box>
  </Container>
</Box>


        </>
      )}

{/* 💬 SECTION - Comment ça marche */}
<Box
  id="how-it-works"
  sx={{
    py: { xs: 10, md: 14 },
    bgcolor: "#f8fafc",
    background: "linear-gradient(180deg, #f9f9f9 0%, #ffffff 100%)",
  }}
>
  <Container maxWidth="lg">
    {/* 🔹 Titel */}
  <Box
        sx={{
          flex: { xs: "1 1 100%", md: "1 1 60%" },
          textAlign: { xs: "center", md: "left" },
          maxWidth: { xs: "100%", md: "650px" },
        }}
      >
     <Typography
          variant="overline"
          sx={{
            color: "#25D366",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 1,
            mb: 2,
            display: "block",
          }}
        >
          • Comment ça marche ?
        </Typography>

    {/* 🔹 Haupttitel */}
    <Typography
      variant="h2"
      sx={{
        fontWeight: 700,
        mb: 3,
        lineHeight: 1.2,
        fontSize: { xs: "2rem", md: "2.8rem" },
        textAlign: "center",
      }}
    >
      Réservez, payez et recevez votre numéro d’attente —{" "}
      <Box component="span" sx={{ color: "#25D366" }}>
        tout se fait automatiquement sur WhatsApp 💬
      </Box>
    </Typography>
    </Box>

    {/* 🎥 Vidéo + Étapes */}
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: 6,
        mt: 6,
      }}
    >
      {/* ✅ Étapes */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          pl: { xs: 0, md: 2 },
          order: { xs: 2, md: 1 },
        }}
      >
        {[
          "Envoyez-nous un message sur WhatsApp 📲",
          "Choisissez votre clinique et spécialité 🏥",
          "Consultez la disponibilité de votre médecin en temps réel ⏱️",
          "Sélectionnez la date et payez via Bankily ou Masrivi 💳",
          "Notre chatbot vous envoie le résumé et votre numéro d’attente 🤖",
        ].map((step, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              p: 2,
              borderRadius: 3,
              bgcolor: "rgba(37, 211, 102, 0.05)",
              transition: "background 0.3s ease",
              "&:hover": { bgcolor: "rgba(37,211,102,0.1)" },
            }}
          >
            <Box
              sx={{
                bgcolor: "#25D366",
                color: "white",
                fontWeight: "bold",
                width: 36,
                height: 36,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.1rem",
                color: "text.primary",
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              {step}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 🎬 Vidéo YouTube */}
<Box
  sx={{
    flex: 1,
    position: "relative",
    paddingTop: "56.25%", // 16:9
    borderRadius: 4,
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
    mt: { xs: 4, md: 0 },
    width: "100%",
    order: { xs: 1, md: 2 },
    animation: "glowPulse 4s ease-in-out infinite",
    "@keyframes glowPulse": {
      "0%, 100%": {
        boxShadow: "0 10px 30px rgba(37,211,102,0.25)",
      },
      "50%": {
        boxShadow: "0 20px 40px rgba(37,211,102,0.5)",
      },
    },
  }}
>
  <iframe
    src="https://www.youtube.com/embed/WbF15eyvzLA?rel=0"
    title="SmartDoctors WhatsApp Demo"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      border: 0,
      borderRadius: "8px",
    }}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  ></iframe>
</Box>

    </Box>
  </Container>
</Box>


{/* 🌟 SECTION — Nos Solutions (11 modules SmartDoctors) */}
<Box
  id="solutions"
  sx={{
    py: { xs: 10, md: 16 },
    px: { xs: 2, md: 4 },
    background: "linear-gradient(180deg, #f5f9f6 0%, #ffffff 100%)",
  }}
>
  <Container maxWidth="lg">
    {/* 🩺 TITRE PRINCIPAL */}
    <Box
      sx={{
        textAlign: "center",
        mb: { xs: 8, md: 12 },
        maxWidth: 800,
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
        • Nos Solutions Digitales
      </Typography>

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          color: "#0d2b5c",
          mb: 2,
          fontSize: { xs: "2rem", md: "2.8rem" },
          lineHeight: 1.3,
        }}
      >
        Bien plus qu’une simple plateforme médicale
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          fontSize: { xs: "1rem", md: "1.15rem" },
          lineHeight: 1.8,
        }}
      >
        Avec <strong>SmartDoctors</strong>, simplifiez la gestion de votre clinique :
        rendez-vous, paiements, dossiers, communication et bien plus — tout dans un
        seul espace fluide et intelligent.
      </Typography>
    </Box>

    {/* 💎 MODULES */}
    <Grid
      container
      spacing={4}
      sx={{
        justifyContent: "center",
        rowGap: { xs: 5, md: 8 },
      }}
    >
      {[
        {
          title: "Dossier Patient Numérique",
          desc: "Accédez aux antécédents, diagnostics et traitements en toute sécurité (RGPD-compliant).",
          icon: <FolderSharedIcon sx={{ fontSize: 60, color: "#6A1B9A" }} />,
        },
        {
          title: "Transparence & Historique",
          desc: "Suivez l’historique complet des paiements, rendez-vous et actions médicales pour chaque patient.",
          icon: <HistoryIcon sx={{ fontSize: 60, color: "#1976D2" }} />,
        },
        {
          title: "Rendez-vous WhatsApp",
          desc: "Vos patients réservent, paient et reçoivent leur ticket d’attente automatiquement sur WhatsApp.",
          icon: <WhatsAppIcon sx={{ fontSize: 60, color: "#25D366" }} />,
        },
        {
          title: "Facturation & Paiement",
          desc: "Créez, imprimez et suivez vos factures. Encaissez facilement via Bankily, Masrivi ou espèces.",
          icon: <PaymentIcon sx={{ fontSize: 60, color: "#00897B" }} />,
        },
        {
          title: "Caisse Digitale",
          desc: "Suivez vos revenus, retraits et soldes. Toutes les transactions sont centralisées et sécurisées.",
          icon: <PointOfSaleIcon sx={{ fontSize: 60, color: "#9C27B0" }} />,
        },
        {
          title: "Offre & Devis",
          desc: "Créez des offres professionnelles et envoyez-les à vos patients en un clic, avec suivi et signature.",
          icon: <DescriptionIcon sx={{ fontSize: 60, color: "#F57C00" }} />,
        },
        {
          title: "Compte Patient Virtuel",
          desc: "Permettez aux patients de régler en plusieurs fois grâce à un compte digital intégré.",
          icon: <AccountBalanceWalletIcon sx={{ fontSize: 60, color: "#6A1B9A" }} />,
        },
        {
          title: "WebApp Médicale",
          desc: "SmartDoctors est 100% en ligne. Accédez à vos données depuis n’importe quel appareil.",
          icon: <LanguageIcon sx={{ fontSize: 60, color: "#0288d1" }} />,
        },
        {
          title: "Speech-to-Text Médical",
          desc: "Dictez vos comptes rendus et prescriptions, SmartDoctors les transcrit automatiquement.",
          icon: <RecordVoiceOverIcon sx={{ fontSize: 60, color: "#43A047" }} />,
        },
        {
          title: "Gestion du Personnel",
          desc: "Ajoutez, modifiez et suivez vos collaborateurs avec rôles, départements et présences.",
          icon: <PeopleAltIcon sx={{ fontSize: 60, color: "#00796B" }} />,
        },
        {
          title: "Suivi du Temps & Compte d'heures",
          desc: "Automatisez la gestion des horaires, heures supplémentaires et soldes de congés.",
          icon: <AccessTimeIcon sx={{ fontSize: 60, color: "#FB8C00" }} />,
        },
      ].map((solution, i) => (
        <Grid
          key={i}
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: "30px",
              p: { xs: 4, md: 5 },
              textAlign: "center",
              width: "100%",
              maxWidth: 360,
              boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
              transition: "all 0.45s ease",
              animation: `fadeIn 0.9s ease forwards`,
              animationDelay: `${i * 0.25}s`,
              opacity: 0,
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-10px) scale(1.03)",
                boxShadow: "0 20px 50px rgba(37,211,102,0.25)",
              },
              "@keyframes fadeIn": {
                from: { opacity: 0, transform: "translateY(30px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {/* 🌿 Icône */}
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "center",
                transition: "transform 0.4s",
                "&:hover": { transform: "scale(1.1)" },
              }}
            >
              {solution.icon}
            </Box>

            {/* 🩺 Titre */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                color: "#0d2b5c",
                fontSize: { xs: "1.25rem", md: "1.35rem" },
              }}
            >
              {solution.title}
            </Typography>

            {/* 📄 Description */}
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.95rem", md: "1rem" },
                lineHeight: 1.7,
              }}
            >
              {solution.desc}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>

    {/* ✅ CTA global */}
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
      >
        Découvrir toutes les fonctionnalités
      </Button>
    </Box>
  </Container>
</Box>

{/* 💎 SECTION — Pourquoi SmartDoctors (parfaite sur grands écrans) */}
<Box
  id="why-smartdoctors"
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
        Notre expertise fait la différence
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
        Pourquoi les professionnels choisissent SmartDoctors
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
        Développé par des ingénieurs et experts du domaine médical,{" "}
        <strong>SmartDoctors</strong> allie savoir-faire technique et expérience
        clinique. Notre solution cloud s’occupe de tout — du support continu
        jusqu’aux mises à jour automatiques.
      </Typography>
    </Box>

    {/* 🌿 Contenu principal */}
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
            title: "Hébergement Cloud sécurisé",
            desc: "Vos données sont hébergées dans le Cloud, accessibles à tout moment, avec sauvegardes automatiques et chiffrement complet.",
          },
          {
            icon: "🔄",
            title: "Mises à jour automatiques",
            desc: "Toutes les nouvelles fonctionnalités sont installées sans interruption de service.",
          },
          {
            icon: "🧑‍💻",
            title: "Support technique dédié",
            desc: "Notre équipe vous accompagne au quotidien avec un contrat de support complet incluant assistance et conseil.",
          },
          {
            icon: "💬",
            title: "Automatisation intelligente",
            desc: "Vos réservations et paiements sont gérés 24h/24 via WhatsApp grâce à notre assistant digital.",
          },
          {
            icon: "🔒",
            title: "Sécurité et conformité RGPD",
            desc: "Vos données médicales sont protégées selon les normes européennes les plus strictes.",
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
          alt="SmartDoctors Cloud"
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
      >
        Rejoindre SmartDoctors dès aujourd’hui
      </Button>
    </Box>
  </Container>
</Box>
<Box
  id="impact"
  sx={{
    py: { xs: 10, md: 14 },
    background: "linear-gradient(135deg, #0b2341 0%, #102e57 100%)",
    color: "white",
  }}
>
<Container maxWidth="lg">
  {/* 🩺 TITRE PRINCIPAL */}
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
    Notre présence et nos résultats
  </Typography>

  <Typography
    variant="h3"
    align="center"
    sx={{
      fontWeight: 800,
      mb: 4,
      fontSize: { xs: "2rem", md: "2.8rem" },
    }}
  >
    SmartDoctors transforme la pratique médicale en Afrique
  </Typography>

  <Typography
    align="center"
    sx={{
      mb: 8,
      color: "rgba(255,255,255,0.8)",
      maxWidth: 700,
      mx: "auto",
      fontSize: "1.1rem",
      lineHeight: 1.7,
    }}
  >
    Grâce à notre solution cloud, les professionnels de santé au
    <strong> Maroc </strong> et en <strong> Mauritanie </strong> digitalisent
    leur quotidien et améliorent leurs performances grâce à l’automatisation.
  </Typography>

  {/* 🌍 Statistiques globales */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(2, 1fr)", // 📱 deux colonnes sur mobile
        md: "repeat(3, 1fr)", // 💻 trois colonnes sur desktop
      },
      gap: 4,
      justifyItems: "center",
      alignItems: "stretch",
    }}
  >
    {[
      { number: "2", suffix: "pays", text: "Maroc & Mauritanie", icon: "🌍" },
      { number: "10+", suffix: "cliniques", text: "Cliniques connectées", icon: "🏥" },
      { number: "3000+", suffix: "patients", text: "dossiers digitalisés", icon: "👩‍⚕️" },
      { number: "+20%", suffix: "", text: "de gain de temps quotidien", icon: "⏱️" },
      { number: "+25%", suffix: "", text: "d’efficacité administrative", icon: "⚙️" },
      { number: "−30%", suffix: "", text: "d’appels et d’erreurs manuelles", icon: "📉" },
    ].map((item, i) => (
      <Box
        key={i}
        sx={{
          textAlign: "center",
          bgcolor: "rgba(255,255,255,0.07)",
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
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          animation: "fadeInUp 0.8s ease forwards",
          animationDelay: `${i * 0.15}s`,
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 35px rgba(37,211,102,0.25)",
            bgcolor: "rgba(37,211,102,0.12)",
          },
          "@keyframes fadeInUp": {
            from: { opacity: 0, transform: "translateY(30px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <Typography sx={{ fontSize: "2.4rem", mb: 1 }}>{item.icon}</Typography>
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
          <Box component="span" sx={{ fontSize: "1.2rem", color: "white" }}>
            {" "}
            {item.suffix}
          </Box>
        </Typography>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.9)",
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

  {/* ✅ CTA final */}
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
    >
      Découvrir notre impact
    </Button>
  </Box>
</Container>

</Box>


{/* 💙 FOOTER — style Clinique Kissi modernisé */}
<Box
  sx={{
    bgcolor: "#0B2341",
    color: "white",
    py: { xs: 6, md: 10 },
  }}
>
  <Container maxWidth="lg">
    <Grid
      container
      spacing={6}
      justifyContent="space-between"
      alignItems="flex-start"
    >
      {/* Logo + description */}
      <Grid item xs={12} md={4}>
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Box
            component="img"
            src="/Logo.png"
            alt="SmartDoctors logo"
            sx={{ width: 150, mb: 2 }}
          />
          <Typography sx={{ opacity: 0.8 }}>
            Votre plateforme de gestion médicale intelligente,
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
          {["À propos", "Prendre rendez-vous", "Services", "Partenaires", "Actualité"].map(
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

      {/* Contact rapide */}
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
          <Typography sx={{ mb: 1 }}>📞 (+49) 162 2982160</Typography>
          <Typography sx={{ mb: 1 }}>📞 (+49) 162 2982160</Typography>
          <Typography sx={{ mb: 1 }}>✉️ info@smartdoctors.tech</Typography>
        </Box>
      </Grid>
    </Grid>

    {/* Ligne de séparation */}
    <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.15)" }} />

    {/* Copyright */}
    <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
      © {new Date().getFullYear()} SmartDoctors — Tous droits réservés.
    </Typography>
  </Container>


      {/* Bouton WhatsApp flottant */}
{/* Bouton WhatsApp flottant — links, vertikal zentriert */}
{/* 💬 Bouton WhatsApp animé avec texte pulsant */}
<Box
  sx={{
    position: "fixed",
    top: "50%",
    right: 16,
    transform: "translateY(-50%)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  }}
>
  {/* Texte à gauche du bouton (animé en rythme) */}
  <Box
    sx={{
      bgcolor: "white",
      color: "#0d2b5c",
      px: 2,
      py: 1,
      borderRadius: "25px",
      fontWeight: 600,
      fontSize: "0.9rem",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      animation: "textPulse 2s infinite ease-in-out",
      "@keyframes textPulse": {
        "0%, 100%": { opacity: 0.6, transform: "translateX(0)" },
        "50%": { opacity: 1, transform: "translateX(-5px)" },
      },
      transition: "all 0.3s ease",
      "&:hover": {
        bgcolor: "#25D366",
        color: "white",
        transform: "translateX(-8px)",
      },
    }}
  >
    Questions ?
  </Box>

  {/* Conteneur du bouton + effet */}
  <Box
    sx={{
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Effet de halo pulsant */}
    <Box
      sx={{
        position: "absolute",
        width: 70,
        height: 70,
        borderRadius: "50%",
        bgcolor: "rgba(37, 211, 102, 0.4)",
        animation: "pulse 2s infinite ease-out",
        zIndex: 0,
        "@keyframes pulse": {
          "0%": { transform: "scale(0.9)", opacity: 1 },
          "70%": { transform: "scale(1.6)", opacity: 0 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
      }}
    />

    {/* Bouton principal WhatsApp */}
    <Fab
      color="primary"
      aria-label="WhatsApp"
      sx={{
        bgcolor: "#25D366",
        "&:hover": { bgcolor: "#1ebe5d" },
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        zIndex: 1,
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.1)" },
      }}
      href="https://wa.me/491622982160?text=Bonjour%20SmartDoctors!%20😊"
      target="_blank"
    >
      <WhatsAppIcon sx={{ fontSize: 32 }} />
    </Fab>
  </Box>
</Box>

</Box>



    </ThemeProvider>
  );
}
