import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllRecipes, getRecipeBySlug } from '@/lib/data/recipes';
import type { Ingredient, RecipeStep } from '@sylt/types';
import PrintButton from '@/components/PrintButton';

// Generate static params for all recipes
export async function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((recipe) => ({
    recipeId: recipe.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { recipeId: string } }) {
  const recipe = getRecipeBySlug(params.recipeId);
  
  if (!recipe) {
    return {
      title: 'Rezept nicht gefunden',
    };
  }
  
  return {
    title: `${recipe.title} ${recipe.subtitle ? '- ' + recipe.subtitle : ''} | BLUM Kochbuch`,
    description: recipe.description,
    keywords: recipe.tags.join(', '),
  };
}

/**
 * Helper to format ingredient display
 */
function formatIngredient(ingredient: Ingredient): string {
  const parts: string[] = [];
  
  if (typeof ingredient.amount === 'number') {
    parts.push(ingredient.amount.toString());
  } else {
    parts.push(ingredient.amount);
  }
  
  if (ingredient.unit) {
    parts.push(ingredient.unit);
  }
  
  parts.push(ingredient.name);
  
  if (ingredient.notes) {
    parts.push(`(${ingredient.notes})`);
  }
  
  return parts.join(' ');
}

/**
 * Ingredient List Component
 */
function IngredientsList({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-deep-sea-blue-200">
      <h2 className="text-3xl font-serif text-deep-sea-blue mb-6">Zutaten</h2>
      <ul className="space-y-3">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.id}
            className="flex items-start gap-3 text-deep-sea-blue-700"
          >
            <span className="text-rich-gold mt-1">▪</span>
            <span className="flex-1">{formatIngredient(ingredient)}</span>
            {ingredient.optional && (
              <span className="text-xs text-deep-sea-blue-400 italic">optional</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Recipe Steps Component
 */
function RecipeSteps({ steps }: { steps: RecipeStep[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif text-deep-sea-blue mb-6">Zubereitung</h2>
      
      {steps.map((step) => (
        <div
          key={step.id}
          className="bg-white rounded-2xl p-6 shadow-sm border border-deep-sea-blue-200"
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-rich-gold rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-deep-sea-blue">
                  {step.stepNumber}
                </span>
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-deep-sea-blue-700 leading-relaxed text-lg">
                {step.instruction}
              </p>
              
              {step.duration && (
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-rich-gold font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {step.duration} Minuten
                </div>
              )}
              
              {step.tip && (
                <div className="mt-3 p-3 bg-rich-gold-50 rounded-lg border-l-4 border-rich-gold">
                  <p className="text-sm text-deep-sea-blue-700">
                    <span className="font-semibold">💡 Tipp:</span> {step.tip}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Recipe Tips Component
 */
function RecipeTips({ tips }: { tips: string[] }) {
  if (tips.length === 0) return null;
  
  return (
    <div className="bg-rich-gold-50 rounded-2xl p-8 border-2 border-rich-gold">
      <h3 className="text-2xl font-serif text-deep-sea-blue mb-6 flex items-center gap-3">
        <span className="text-3xl">💡</span>
        Profi-Tipps
      </h3>
      
      <div className="space-y-4">
        {tips.map((tip, index) => {
          // Parse tip format: "Label: Content" or just "Content"
          const colonIndex = tip.indexOf(':');
          const hasLabel = colonIndex > 0 && colonIndex < 30; // Reasonable label length
          
          if (hasLabel) {
            const label = tip.substring(0, colonIndex);
            const content = tip.substring(colonIndex + 1).trim();
            
            return (
              <div key={index} className="text-deep-sea-blue-700">
                <strong className="text-deep-sea-blue">{label}:</strong> {content}
              </div>
            );
          }
          
          return (
            <p key={index} className="text-deep-sea-blue-700">
              {tip}
            </p>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Recipe Detail Page
 */
export default function RecipeDetailPage({ params }: { params: { recipeId: string } }) {
  const recipe = getRecipeBySlug(params.recipeId);
  
  // Return 404 if recipe not found
  if (!recipe) {
    notFound();
  }
  
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-deep-sea-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/kochbuch"
            className="inline-flex items-center text-white hover:text-rich-gold transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zum Kochbuch
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
            {recipe.title}
          </h1>
          
          {recipe.subtitle && (
            <p className="text-2xl text-rich-gold font-light mb-8">
              {recipe.subtitle}
            </p>
          )}
          
          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 text-lg">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{totalTime} Minuten</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{recipe.servings} Personen</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Description */}
        {recipe.description && (
          <p className="text-xl text-deep-sea-blue-700 leading-relaxed mb-12">
            {recipe.description}
          </p>
        )}
        
        {/* Two Column Layout for Ingredients and Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Ingredients - Sticky on larger screens */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <IngredientsList ingredients={recipe.ingredients} />
            </div>
          </div>
          
          {/* Steps */}
          <div className="lg:col-span-2">
            <RecipeSteps steps={recipe.steps} />
          </div>
        </div>
        
        {/* Tips */}
        {recipe.tips && recipe.tips.length > 0 && (
          <div className="mb-12">
            <RecipeTips tips={recipe.tips} />
          </div>
        )}
        
        {/* Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-deep-sea-blue mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-deep-sea-blue-100 text-deep-sea-blue-700 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-deep-sea-blue-200">
          <Link
            href="/kochbuch"
            className="inline-flex items-center px-6 py-3 bg-deep-sea-blue text-white rounded-xl hover:bg-deep-sea-blue-700 transition-colors font-semibold"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zur Übersicht
          </Link>
          
          <PrintButton />
        </div>
      </main>
    </div>
  );
}
