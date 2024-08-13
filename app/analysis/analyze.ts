export async function analyzeIngredients(productType: string, ingredients: string, skinConcerns: string, setIsLoading: (loading: boolean) => void, setResponse: (response: string) => void, setRating: (rating: number) => void, setIsModalOpen: (open: boolean) => void) {
    
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