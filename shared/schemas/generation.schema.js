export const generationInputSchema = {
  productName: "string|required",
  productDetails: "string|optional",
  category: "string|optional",
  tone: "string|optional",
  marketplaces: "array|optional",
  imageCount: "number|optional"
};
