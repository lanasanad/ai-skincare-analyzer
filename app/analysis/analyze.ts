export async function analyzeIngredients(
  productType: string,
  ingredients: string,
  skinConcerns: string,
  setIsLoading: (loading: boolean) => void,
  setResponse: (response: string) => void,
  setRating: (rating: number | null) => void,
  setIsModalOpen: (open: boolean) => void
) {
  setIsLoading(true);
  setResponse("");
  setRating(null);

  try {
    const apiResponse = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productType, ingredients, skinConcerns }),
    });

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json();
      throw new Error(errorData.error || "Unknown API error");
    }

    const data = await apiResponse.json();
    const textResponse = data.response || "";

    const ratingMatch = textResponse.match(/Rating:\s*(\d+)/i);
    const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : null;

    let cleanedResponse = textResponse.replace(/Rating:\s*\d+/i, "").trim();
    cleanedResponse = cleanedResponse.split(". ").join(".\n\n");

    setResponse(cleanedResponse);
    setRating(rating ?? null);

  } catch (error: any) {
    console.error("Analyse error:", error);
    setResponse(`An error occurred while analysing: ${error.message}`);
    setRating(null);
  } finally {
    setIsLoading(false);
    setIsModalOpen(true);
  }
}
