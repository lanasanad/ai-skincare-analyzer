"use client";

import React, { useState } from "react";
import "./page.css";
import {
  TextField,
  Box,
  Autocomplete,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D8BFD8",
      dark: "#C8A2C8",
    },
  },
});

function App() {
  const [productType, setProductType] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string>("");
  const [skinConcerns, setSkinConcerns] = useState<string>("");

  const productTypes = [
    "Cleanser",
    "Cleansing Balm",
    "Cleansing Oil",
    "Cream Cleanser",
    "Face Wash",
    "Foaming Cleanser",
    "Under eye Mask",
    "Face Mist",
    "Day Cream",
    "Eye Cream",
    "Face Cream",
    "Gel cream",
    "Hand Cream",
    "Intensive Moisturizer",
    "Cooling Gel",
    "Glycolic Acid",
    "Hyaluronic Acid Serum",
    "Pore Minimizer",
    "Spot Treatment",
    "Body Butter",
    "Body Lotion",
    "Body Oil",
    "Body Scrub",
    "Micellar Water",
    "Face Balm",
    "Toner",
    "Witch Hazel Toner",
  ];

  async function callBackendAPI() {
    try {
      const apiResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productType, ingredients, skinConcerns }),
      });

      if (!apiResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await apiResponse.json();
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Typography
          marginTop="77px"
          className="red-hat-display"
          gutterBottom
          fontSize="650%"
          sx={{
            fontWeight: "600",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            letterSpacing: "19px",  
            wordSpacing: "20px", 
          }}
        >
          Skincare Analyser
        </Typography>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                marginBottom: 2,
              }}
            >
              <Autocomplete
                value={productType}
                onChange={(event, newValue) => setProductType(newValue)}
                onInputChange={(event, newInputValue) =>
                  setProductType(newInputValue)
                }
                options={productTypes}
               
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Type"
                    variant="outlined"
                    margin="normal"
                  />
                )}
              />
              <TextField
                fullWidth
                label="Skin Concerns"
                variant="outlined"
                margin="normal"
                value={skinConcerns}
                onChange={(e) => setSkinConcerns(e.target.value)}
              />
            </Box>
            <TextField
              fullWidth
              multiline
              minRows={7}
              label="Ingredients"
              variant="outlined"
              margin="normal"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
