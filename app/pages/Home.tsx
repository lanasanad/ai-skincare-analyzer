"use client";
import React, { useState } from "react";
import { productTypes } from "../client/constants";
import { analyzeIngredients } from "../analysis/analyze";
import "/app/page.css";

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
import StarIcon from "@mui/icons-material/Star";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D8BFD8",
      dark: "#C8A2C8",
    },
  },
});

function Home() {
  const [productType, setProductType] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string>("");
  const [skinConcerns, setSkinConcerns] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);

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
                      placeholder="Enter product type"
                      variant="outlined"
                      margin="normal"
                    />
                  )}
                />

                <TextField
                  fullWidth
                  label="Skin Concerns"
                  variant="outlined"
                  placeholder="Describe your skin concerns"
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
              </Box >
              <TextField
                fullWidth
                multiline
                minRows={7}
                maxRows={10}
                label="Ingredients"
                placeholder="Paste the ingredients list here"
                variant="outlined"
                margin="normal"
                sx={{
                  minHeight: '200px',
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
                    height: '100%',
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
                onClick={() =>
                  analyzeIngredients(
                    productType || "",
                    ingredients,
                    skinConcerns,
                    setIsLoading,
                    setResponse,
                    setRating,
                    setIsModalOpen
                  )
                }
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
              maxWidth: "720px",
              height: "67vh",
              backgroundColor: "#cabeca",
              borderRadius: "10px",
              padding: "10px",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <DialogTitle className="dialog-title">ANALYSIS RESULT</DialogTitle>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Typography
              className="response"
              sx={{
                flexGrow: 1,
                overflow: "auto",
                lineHeight: 1.6,
                marginTop: "50px",
                "& p": {
                  marginBottom: "1em",
                },
                "& p:last-child": {
                  marginBottom: 0,
                },
                "& br": {
                  display: "block",
                  content: '""',
                  marginTop: "0.5em",
                },
              }}
            >
              {response.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                mb: 3,
              }}
            >
              <Rating
                name="product-rating"
                value={rating}
                max={5}
                readOnly
                precision={0.5}
                size="large"
                icon={<StarIcon style={{ fontSize: "3.4rem" }} />}
                emptyIcon={<StarIcon style={{ fontSize: "3.4rem" }} />}
                sx={{
                  "& .MuiRating-iconEmpty": {
                    color: "#edecf093",
                  },
                  "& .MuiRating-iconFilled": {
                    color: "#ffffff",
                    filter:
                      "drop-shadow(0 0 5px #ffc400) drop-shadow(0 0 10px #ffc400) drop-shadow(0 0 15px #ffc400)",
                    animation: "star-glow 1.5s ease-in-out infinite alternate",
                  },
                  "& .MuiRating-icon": {
                    marginRight: "1rem",
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

export default Home;
