/**
 * Recipe Types for BLUM Cookbook Application
 * Defines type-safe interfaces for recipe data
 */

export interface Recipe {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  image: RecipeImage;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  tips?: string[];
  nutrition?: NutritionInfo;
  tags: string[];
  featured: boolean;
  publishedAt: Date;
  updatedAt?: Date;
}

export type RecipeCategory = 
  | 'vorspeise'
  | 'suppe'
  | 'hauptgericht'
  | 'beilage'
  | 'dessert'
  | 'kalte-platte'
  | 'snack';

export type RecipeDifficulty = 
  | 'einfach'
  | 'mittel'
  | 'schwierig';

export interface RecipeImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
}

export interface Ingredient {
  id: string;
  amount: number | string; // Can be "1 Prise" or 250
  unit?: IngredientUnit;
  name: string;
  notes?: string; // e.g., "in Würfel geschnitten"
  optional?: boolean;
}

export type IngredientUnit = 
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'EL'      // Esslöffel
  | 'TL'      // Teelöffel
  | 'Prise'
  | 'Stück'
  | 'Bund'
  | 'Packung';

export interface RecipeStep {
  id: string;
  stepNumber: number;
  instruction: string;
  duration?: number; // in minutes, for timing-critical steps
  image?: RecipeImage;
  tip?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber?: number; // in grams
  sodium?: number; // in mg
}

/**
 * Filter options for recipe search and display
 */
export interface RecipeFilters {
  category?: RecipeCategory | RecipeCategory[];
  difficulty?: RecipeDifficulty | RecipeDifficulty[];
  maxPrepTime?: number;
  maxCookTime?: number;
  tags?: string[];
  searchQuery?: string;
}

/**
 * Recipe metadata for list views
 */
export interface RecipePreview {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  category: RecipeCategory;
  difficulty: RecipeDifficulty;
  totalTime: number; // prepTime + cookTime
  image: RecipeImage;
  tags: string[];
  featured: boolean;
}

/**
 * Cookbook configuration
 */
export interface CookbookConfig {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  publishedDate: Date;
  totalRecipes: number;
  categories: {
    id: RecipeCategory;
    name: string;
    icon: string;
  }[];
}
