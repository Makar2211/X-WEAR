export const useCategoryProduct = (categoryId: number) => {
  switch (categoryId) {
    case 1:
      return "sneakers";
    case 2:
      return "clothes";
    case 3:
      return "accessories";
    default:
      console.error(`Category not found for id: ${categoryId}`);
      return null;
  }
};
