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
        background: `url(spill1.jpg) repeat-x center center`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "3rem", sm: "5rem", md: "6rem" },
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          glow ai
        </Typography>

        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "800px",
              gap: 2,
              mx: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
                flexWrap: "wrap",
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
                  flex: "1 1 48%",
                  minWidth: "120px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderWidth: "5px", borderColor: "#987998" },
                    "&:hover fieldset": { borderColor: "#845584" },
                    "&.Mui-focused fieldset": { borderColor: "#845584" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#987998",
                    "&.Mui-focused": { color: "#845584" },
                  },
                  "& .MuiInputLabel-shrink": { color: "#845584" },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Product Type"
                    placeholder="Enter product type"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />

              <TextField
                label="Skin Concerns"
                variant="outlined"
                placeholder="Describe your skin concerns"
                value={skinConcerns}
                onChange={(e) => setSkinConcerns(e.target.value)}
                sx={{
                  flex: "1 1 48%",
                  minWidth: "120px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderWidth: "5px", borderColor: "#987998" },
                    "&:hover fieldset": { borderColor: "#845584" },
                    "&.Mui-focused fieldset": { borderColor: "#845584" },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#987998",
                    "&.Mui-focused": { color: "#845584" },
                  },
                  "& .MuiInputLabel-shrink": { color: "#845584" },
                }}
              />
            </Box>

            <TextField
              fullWidth
              multiline
              minRows={7}
              maxRows={10}
              label="Ingredients"
              placeholder="Paste the ingredients list here"
              variant="outlined"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderWidth: "5px", borderColor: "#987998" },
                  "&:hover fieldset": { borderColor: "#845584" },
                  "&.Mui-focused fieldset": { borderColor: "#845584" },
                },
                "& .MuiInputLabel-root": {
                  color: "#987998",
                  "&.Mui-focused": { color: "#845584" },
                },
                "& .MuiInputLabel-shrink": { color: "#845584" },
              }}
            />

            <Button
              className="analyze-button"
              sx={{
                height: "60px",
                fontSize: "20px",
                padding: "2px 4px",
                mt: 10,
                textTransform: "none",
                width: "200px",
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
            >
              {isLoading ? (
                <CircularProgress size={28} color="inherit" />
              ) : (
                "ANALYZE"
              )}
            </Button>
          </Box>
        </Container>

        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          PaperProps={{
            sx: {
              width: "90vw",
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
                "& p": { marginBottom: "1em" },
                "& p:last-child": { marginBottom: 0 },
                "& br": { display: "block", content: '""', marginTop: "0.5em" },
              }}
            >
              {response.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </Typography>

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
                "& .MuiRating-iconEmpty": { color: "#edecf093" },
                "& .MuiRating-iconFilled": {
                  color: "#ffffff",
                  filter:
                    "drop-shadow(0 0 5px #ffc400) drop-shadow(0 0 10px #ffc400) drop-shadow(0 0 15px #ffc400)",
                  animation: "star-glow 1.3s ease-in-out infinite alternate",
                },
                "& .MuiRating-icon": { marginRight: "1rem" },
              }}
            />
          </DialogContent>
          <DialogActions>
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
