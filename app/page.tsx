"use client";

import React, { useState } from "react";
import "./page.css";
import StarIcon from "@mui/icons-material/Star";


function App() {
  async function callBackendAPI() {
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
    } finally {
    }
  }
}

export default App;