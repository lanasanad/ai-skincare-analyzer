"use client";

import React, { useState } from "react";
import {
  TextField,
  Box,
  Autocomplete,
  Button,
  Typography,
  Container,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  createTheme,
  Rating,
  ThemeProvider,
} from "@mui/material";
import "./page.css";
import StarIcon from "@mui/icons-material/Star";

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
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

  const productTypes = [
    "Cleanser",
    "Cleansing Balm",
    "Cleansing Oil",
    "Cream Cleanser",
    "Face Wash",
    "Foaming Cleanser",
    "Gel Cleanser",
    "Oil Cleanser",
    "Chemical Exfoliator",
    "Peel",
    "Physical Exfoliator / Scrub",
    "Charcoal Mask",
    "Clay Mask",
    "Detox Mask",
    "Mask",
    "Mud Mask",
    "Sheet Mask",
    "Sleeping Mask",
    "Under eye Mask",
    "Face Mist",
    "Day Cream",
    "Eye Cream",
    "Face Cream",
    "Gel cream",
    "Hand Cream",
    "Intensive Moisturizer",
    "Lip Balm",
    "Lip Mask",
    "Lip Oil",
    "Lip Scrub",
    "Face Moisturizer",
    "Night Cream",
    "Tinted Moisturizer",
    "Face Oil",
    "Squalane",
    "AHA (Alpha Hydroxy Acid) Serum",
    "Antioxidant Serum",
    "Azelaic Acid",
    "BHA (Beta Hydroxy Acid) Serum",
    "Brightening Serum",
    "Collagen Serum",
    "Cooling Gel",
    "Glycolic Acid",
    "Hyaluronic Acid Serum",
    "Niacinamide Serum",
    "Peptide Serum",
    "PHA (Polyhydroxy Acid) Serum",
    "Probiotic Serum",
    "Quercetin Serum",
    "Retinol",
    "Rosehip Oil",
    "Serum",
    "Vitamin C Serum",
    "Vitamin E Oil",
    "Sunscreen",
    "Acne Spot Treatment",
    "Pore Minimizer",
    "Spot Treatment",
    "Body Butter",
    "Body Lotion",
    "Body Oil",
    "Body Scrub",
    "Body Moisturizer",
    "Calamine Lotion",
    "Makeup Remover",
    "Micellar Water",
    "Face Balm",
    "Toner",
    "Witch Hazel Toner",
  ];

  async function callBackendAPI() {
    setIsLoading(true);

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
      console.log("API Response:", data);
      setResponse(data.response);
      setRating(data.rating);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An error occurred while analyzing.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  }

  function handleRefresh() {
    setProductType(null);
    setIngredients("");
    setSkinConcerns("");
    setResponse("");
    setRating(null);
    setIsModalOpen(false);
  }

  return (
    <div
      style={{
        background: `url(spill1.jpg) repeat-x center center fixed`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
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
              letterSpacing: "27px",
              wordSpacing: "20px",
            }}
          >
            GLOW AI
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
                  sx={{
                    width: "393px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderWidth: "5px",
                        borderColor: "#987998",
                      },
                      "&:hover fieldset": {
                        borderColor: "#845584",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#845584",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#987998",
                      "&.Mui-focused": {
                        color: "#845584",
                      },
                    },
                    "& .MuiInputLabel-shrink": {
                      color: "#845584",
                    },
                    margin: "normal",
                  }}
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
                  className="text-field-outline"
                  sx={{
                    width: "390px",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderWidth: "5px",
                        borderColor: "#987998",
                      },
                      "&:hover fieldset": {
                        borderColor: "#845584",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#845584",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#987998",
                      "&.Mui-focused": {
                        color: "#845584",
                      },
                    },
                    "& .MuiInputLabel-shrink": {
                      color: "#845584",
                    },
                  }}
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
                sx={{
                  width: "800px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderWidth: "5px",
                      borderColor: "#987998",
                    },
                    "&:hover fieldset": {
                      borderColor: "#845584",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#845584",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#987998",
                    "&.Mui-focused": {
                      color: "#845584",
                    },
                  },
                  "& .MuiInputLabel-shrink": {
                    color: "#845584",
                  },
                }}
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{
                  height: "60px",
                  fontSize: "20px",
                  padding: "2px 4px",
                  mt: 10,
                  textTransform: "none",
                  width: "200px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderWidth: "8px", color: "#dcd8d8" },
                    "&:hover fieldset": { borderWidth: "2px" },
                    "&.Mui-focused fieldset": { borderWidth: "2px" },
                  },
                }}
                onClick={callBackendAPI}
                disabled={isLoading}
                className="analyze-button"
              >
                {isLoading ? (
                  <CircularProgress size={28} color="inherit" />
                ) : (
                  "ANALYZE"
                )}
              </Button>
            </Box>
          </Container>
        </div>
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          PaperProps={{
            sx: {
              width: "900vw",
              maxWidth: "700px",
              height: "40vh",
              backgroundColor: "#b6a1b6",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <DialogTitle className="dialog-title">ANALYSIS RESULT</DialogTitle>
          <DialogContent>
            <Typography className="response">{response}</Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <Rating
                name="product-rating"
                value={rating}
                max={5}
                readOnly
                precision={0.5}
                size="large"
                icon={<StarIcon style={{ fontSize: "4rem" }} />}
                emptyIcon={<StarIcon style={{ fontSize: "4rem" }} />}
                sx={{
                  "& .MuiRating-iconEmpty": {
                    color: "#edecf093",
                  },
                  "& .MuiRating-iconFilled": {
                    color: "#d3c5008f",
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions className="dialog-buttons">
            <Button
              onClick={() => setIsModalOpen(false)}
              color="primary"
              className="custom-button"
            >
              Close
            </Button>
            <Button onClick={handleRefresh} className="dialog-buttons">
              Refresh
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          PaperProps={{
            sx: {
              width: "900vw",
              maxWidth: "700px",
              height: "55vh",
              backgroundColor: "#cabeca",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <DialogTitle className="dialog-title">ANALYSIS RESULT</DialogTitle>
          <DialogContent>
            <Typography className="response">{response}</Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <Rating
                name="product-rating"
                value={rating}
                max={5}
                readOnly
                precision={0.5}
                size="large"
                icon={<StarIcon style={{ fontSize: "4rem" }} />}
                emptyIcon={<StarIcon style={{ fontSize: "4rem" }} />}
                sx={{
                  "& .MuiRating-iconEmpty": {
                    color: "#edecf093", 
                  },
                  "& .MuiRating-iconFilled": {
                    color: "#fbff00", 
                    filter:
                      "drop-shadow(0 0 5px #ffc400) drop-shadow(0 0 10px #ffc400) drop-shadow(0 0 15px #ffc400)",
                    animation: "star-glow 1.5s ease-in-out infinite alternate",
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions className="dialog-buttons">
            <Button
              onClick={() => setIsModalOpen(false)}
              color="primary"
              className="custom-button"
            >
              Close
            </Button>
            <Button onClick={handleRefresh} className="dialog-buttons">
              Refresh
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}

export default App;
