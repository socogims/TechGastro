import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
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
  const [showIntro, setShowIntro] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  // 🔽 States für das mobile Menü
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // 🔽 Sanfter Scroll zu Sektionen
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    handleClose();
  };

  // Intro nach 5s automatisch schließen
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 5000);
    return () => clearTimeout(timer);
  }, []);

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
                bgcolor: "white",
                color: "#0B2341",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
                px: { xs: 2, md: 8 },
                py: 1,
                zIndex: 10,
              }}
            >
              <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* 🧭 Logo */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    component="img"
                    src="/logoGastro.png"
                    alt="Gastrosoft Logo"
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

                {/* 🧭 Menü Desktop */}
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
                  <Button
                    color="inherit"
                    sx={{
                      fontWeight: 600,
                      "&:hover": { color: "#25D366" },
                    }}
                    onClick={() => handleScrollTo("how-it-works")}
                  >
                    Wie es funktioniert
                  </Button>
                  <Button
                    color="inherit"
                    sx={{
                      fontWeight: 600,
                      "&:hover": { color: "#25D366" },
                    }}
                    onClick={() => handleScrollTo("solutions")}
                  >
                    Unsere Lösungen
                  </Button>
                  <Button
                    color="inherit"
                    sx={{
                      fontWeight: 600,
                      "&:hover": { color: "#25D366" },
                    }}
                    onClick={() => handleScrollTo("tarifs")}
                  >
                    Preise
                  </Button>
                  <Button
                    color="inherit"
                    sx={{
                      fontWeight: 600,
                      "&:hover": { color: "#25D366" },
                    }}
                    onClick={() => handleScrollTo("about")}
                  >
                    Über uns
                  </Button>
                </Box>

                {/* 🌍 Sprachen + WhatsApp CTA + Menüicon */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1, md: 2 },
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
                    DE
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
                    EN
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
                    href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!"
                    target="_blank"
                  >
                    Kostenlos testen
                  </Button>

                  {/* ☰ Menüicon — nur auf Mobile sichtbar */}
                  <IconButton
                    color="inherit"
                    onClick={() => setAnchorEl(true)}
                    sx={{
                      display: { xs: "flex", md: "none" },
                      ml: { xs: 0.5, md: 0 },
                    }}
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
                    src="/logo.png"
                    alt="Gastrosoft Logo"
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
                      <span style={{ fontSize: "1.5rem", marginLeft: "8px" }}>
                        ›
                      </span>
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
                      "&:hover": { bgcolor: "#1ebe5d", transform: "scale(1.05)" },
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
          {/* HERO SECTION mit Hintergrundbild */}
<Box
  sx={{
    position: "relative",
    color: "white",
    pt: { xs: 16, md: 22 },
    pb: { xs: 14, md: 20 },
    px: { xs: 3, md: 10 },
    backgroundImage: "url('/hero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* Dunkles Overlay für bessere Lesbarkeit */}
  <Box
    sx={{
      position: "absolute",
      inset: 0,
      bgcolor: "rgba(0,0,0,0.55)",
      zIndex: 1,
    }}
  />

  <Container
    maxWidth="lg"
    sx={{
      position: "relative",
      zIndex: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: { xs: "center", md: "flex-start" },
      textAlign: { xs: "center", md: "left" },
    }}
  >
    <Typography
      variant="overline"
      sx={{
        color: "#25D366",
        fontWeight: 600,
        letterSpacing: 1.5,
        mb: 2,
        textTransform: "uppercase",
      }}
    >
      Ideal für Strandbar
    </Typography>

    <Typography
      variant="h2"
      sx={{
        fontWeight: 800,
        fontSize: { xs: "2.4rem", md: "4rem" },
        mb: 3,
        lineHeight: 1.1,
      }}
    >
      Bye Bye<br />Kellnermangel!
    </Typography>

    <Typography
      variant="body1"
      sx={{
        fontSize: { xs: "1.1rem", md: "1.3rem" },
        maxWidth: 600,
        mb: 5,
        color: "rgba(255,255,255,0.9)",
      }}
    >
      Gib deinen Gästen die zusätzliche Möglichkeit,{" "}
      <strong>digital zu bestellen und zu bezahlen</strong>, entlaste dich und
      dein Team und profitiere von{" "}
      <strong>mehr Bestellungen & glücklicheren Gästen.</strong>
    </Typography>

    <Button
      variant="contained"
      sx={{
        bgcolor: "#25D366",
        color: "white",
        fontWeight: 700,
        fontSize: "1.1rem",
        borderRadius: "50px",
        px: 5,
        py: 1.5,
        "&:hover": { bgcolor: "#1ebe5d" },
      }}
      href="https://wa.me/49123456789?text=Hallo%20Gastrosoft!"
      target="_blank"
    >
      Jetzt starten
    </Button>
  </Container>
</Box>

         
        </>
      )}
{/* WIRKUNG / ERGEBNISSE */}
<Box
  id="impact"
  sx={{
    py: { xs: 10, md: 14 },
    background: "linear-gradient(180deg, #f5f9f6 0%, #ffffff 100%)",
    color: "#0b2341",
  }}
>
  <Container maxWidth="lg">
    {/* 🧭 Abschnittstitel */}
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

    {/* 🏪 Haupttitel */}
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

    {/* 📝 Beschreibung */}
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
      Mit <strong>Gastrosoft Self-Ordering</strong> bestellst du dir mehr Umsatz, 
      weniger Aufwand und glückliche Gäste – ganz ohne teure Hardware oder 
      komplizierte Systeme. Ob am Tisch, am Kiosk oder per QR-Code am Handy: 
      Unsere Lösung passt sich deinem Betrieb an – nicht umgekehrt.
    </Typography>

    {/* 🌍 Vorteile / Kennzahlen */}
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
        { number: "+35%", suffix: "", text: "mehr Bestellungen durch einfaches Self-Ordering", icon: "📈" },
        { number: "−50%", suffix: "", text: "weniger Wartezeit für Gäste", icon: "⏱️" },
        { number: "−20%", suffix: "", text: "geringerer Personaleinsatz im Service", icon: "👩‍🍳" },
        { number: "+15%", suffix: "", text: "höherer durchschnittlicher Bestellwert", icon: "💶" },
        { number: "+10%", suffix: "", text: "mehr Trinkgeld durch schnelleren Service", icon: "💁‍♂️" },
        { number: "100%", suffix: "", text: "zufriedenere Gäste durch transparente Abläufe", icon: "🌟" },
      ].map((item, i) => (
        <Box
          key={i}
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
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: `${i * 0.15}s`,
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 12px 35px rgba(37,211,102,0.2)",
              bgcolor: "rgba(37,211,102,0.12)",
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

    {/* ✅ Call to Action */}
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
        Jetzt Vorteile entdecken
      </Button>
    </Box>
  </Container>
</Box>
{/* 🔄 Laufende Service-Leiste */}
<Box
  sx={{
    overflow: "hidden",
    whiteSpace: "nowrap",
    background: "linear-gradient(180deg, #ffffff 0%, #f9f9f9 100%)",
    py: 5,
    borderTop: "1px solid #e0e0e0",
    borderBottom: "1px solid #e0e0e0",
  }}
>
  <Box
    sx={{
      display: "inline-block",
      whiteSpace: "nowrap",
      animation: "scroll 30s linear infinite",
      "@keyframes scroll": {
        "0%": { transform: "translateX(0)" },
        "100%": { transform: "translateX(-50%)" },
      },
    }}
  >
    {/* Inhalte doppelt rendern für nahtlosen Loop */}
    {[...Array(2)].map((_, loopIndex) => (
      <Box
        key={loopIndex}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12, // Abstand zwischen den Elementen
          px: 6,
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
              gap: 3,
              color: "#0b2341",
              fontWeight: 600,
              fontSize: { xs: "1.6rem", md: "1.8rem" },
              minWidth: { xs: "90vw", md: "33vw" }, // nur 3 gleichzeitig sichtbar
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#dbe5df",
                width: 70,
                height: 70,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2.5rem",
                flexShrink: 0,
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

      
      {/* 💬 SECTION - Wie es funktioniert */}
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
              • Wie es funktioniert
            </Typography>

            {/* Haupttitel */}
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
              Bestellen, bezahlen und Abholnummer erhalten —{" "}
              <Box component="span" sx={{ color: "#25D366" }}>
                alles läuft automatisch über WhatsApp 💬
              </Box>
            </Typography>
          </Box>

          {/* 🎥 Video + Schritte */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 6,
              mt: 6,
            }}
          >
            {/* ✅ Schritte */}
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
                "Nachricht an uns auf WhatsApp senden 📲",
                "Restaurant/Standort & Kategorie wählen 🍽️",
                "Verfügbarkeit in Echtzeit sehen ⏱️",
                "Bestellung abschicken & digital bezahlen 💳",
                "Chatbot sendet Bestellübersicht & Abhol-/Tischnummer 🤖",
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

            {/* 🎬 YouTube-Video */}
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
                title="Gastrosoft WhatsApp Demo"
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

      {/* 🌟 SECTION — Unsere Lösungen (6 Module, Premium-Design) */}
      <Box
        id="solutions"
        sx={{
          py: { xs: 10, md: 16 },
          px: { xs: 2, md: 4 },
          background: "linear-gradient(180deg, #f5f9f6 0%, #ffffff 100%)",
        }}
      >
        <Container maxWidth="lg">
          {/* 🩺 Haupttitel */}
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
              • Unsere intelligenten Lösungen
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
              Mehr als nur eine Gastro-Plattform
            </Typography>

            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.15rem" },
                lineHeight: 1.8,
              }}
            >
              Mit <strong>Gastrosoft</strong> vereinfachen Sie die Verwaltung Ihres
              Betriebs: Bestellungen, Zahlungen, Küche, Lager, Kommunikation und
              mehr — alles in einem flüssigen, intelligenten System.
            </Typography>
          </Box>

          {/* 💎 Module */}
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
                title: "WhatsApp-Bestellung",
                desc: "Gäste bestellen, bezahlen und erhalten ihre Abholnummer automatisch über WhatsApp.",
                img: "/whatsapp-icon.svg",
              },
              {
                title: "Digitales Kassenbuch (TSE)",
                desc: "Rechtskonforme, schnelle und sichere Kasse – mit automatischen Belegen.",
                img: "/payment.svg",
              },
              {
                title: "Kiosk & Selbstbestellung",
                desc: "Moderne Self-Order-Terminals reduzieren Wartezeiten und erhöhen den Umsatz.",
                img: "/agenda.svg",
              },
              {
                title: "Küchenmonitor & Nummernanzeige",
                desc: "Bestellungen in Echtzeit – klare Prozesse für Küche, Theke und Abholung.",
                img: "/stats.svg",
              },
              {
                title: "Statistiken & Reporting",
                desc: "Umsätze, Bestseller, Stoßzeiten, Personaleinsatz – alles im Blick.",
                img: "/stats.svg",
              },
              {
                title: "Kundenbindung & Aktionen",
                desc: "Gutscheine, Deals und treue Gäste – direkt aus der Plattform.",
                img: "/collaboration.svg",
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
                  {/* 🌿 Icon */}
                  <Box
                    component="img"
                    src={solution.img}
                    alt={solution.title}
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 3,
                      filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.1))",
                      transition: "transform 0.4s",
                      "&:hover": { transform: "scale(1.1)" },
                    }}
                  />
                  {/* 🩺 Titel */}
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
                  {/* 📄 Beschreibung */}
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

          {/* ✅ Globaler CTA */}
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
              Alle Funktionen entdecken
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 💎 SECTION — Warum Gastrosoft */}
      <Box
        id="why-smartdoctors"
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

      {/* IMPACT / WIRKUNG */}
      <Box
        id="impact"
        sx={{
          py: { xs: 10, md: 14 },
          background: "linear-gradient(135deg, #0b2341 0%, #102e57 100%)",
          color: "white",
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
            }}
          >
            Gastrosoft digitalisiert Gastronomie-Betriebe
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
            Dank unserer Cloud-Lösung digitalisieren Restaurants in{" "}
            <strong>Deutschland</strong> und in der <strong>DACH-Region</strong>{" "}
            ihren Alltag und steigern Leistung & Servicequalität durch
            Automatisierung.
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
              { number: "3", suffix: "Länder", text: "DACH-Region", icon: "🌍" },
              { number: "50+", suffix: "Standorte", text: "Gastronomie-Partner", icon: "🏪" },
              { number: "30k+", suffix: "Bestellungen", text: "monatlich verarbeitet", icon: "🧾" },
              { number: "+20%", suffix: "", text: "Zeitersparnis im Service", icon: "⏱️" },
              { number: "+25%", suffix: "", text: "höhere Prozesseffizienz", icon: "⚙️" },
              { number: "−30%", suffix: "", text: "weniger Fehlbuchungen", icon: "📉" },
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
              href="https://wa.me/212600000000?text=Hallo%20Gastrosoft!"
              target="_blank"
            >
              Unsere Wirkung entdecken
            </Button>
          </Box>
        </Container>
      </Box>

      {/* 💙 FOOTER — unverändertes Layout */}
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
            {/* Logo + Beschreibung */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                <Box
                  component="img"
                  src="/logo.png"
                  alt="Gastrosoft Logo"
                  sx={{ width: 150, mb: 2 }}
                />
                <Typography sx={{ opacity: 0.8 }}>
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

            {/* Schneller Kontakt */}
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
                <Typography sx={{ mb: 1 }}>📞 (+49) 123 456 789</Typography>
                <Typography sx={{ mb: 1 }}>📞 (+49) 987 654 321</Typography>
                <Typography sx={{ mb: 1 }}>✉️ kontakt@gastrosoft.de</Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Linie */}
          <Divider sx={{ my: 6, borderColor: "rgba(255,255,255,0.15)" }} />

          {/* Copyright */}
          <Typography variant="body2" align="center" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} Gastrosoft — Alle Rechte vorbehalten.
          </Typography>
        </Container>

        {/* Schwebender WhatsApp-Button */}
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
          {/* Text links vom Button */}
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
            Fragen?
          </Box>

          {/* Button + Haloeffekt */}
          <Box
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Halo */}
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

            {/* Haupt-WhatsApp-Button */}
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
              href="https://wa.me/33123456789?text=Hallo%20Gastrosoft!"
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

