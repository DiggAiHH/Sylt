import Link from 'next/link';
import { getAllRecipes } from '@/lib/data/recipes';
import type { Recipe } from '@sylt/types';

// Generate static metadata for SEO
export const metadata = {
  title: 'BLUM Fisch-Kochbuch | 20 Exklusive Sylter Rezepte',
  description: 'Entdecken Sie 20 authentische Rezepte der norddeutschen Fisch-Küche. Von Austern über Krabbensuppe bis Matjes – mit Schritt-für-Schritt-Anleitungen.',
  keywords: 'Kochbuch, Fischrezepte, Sylt, Nordsee, Matjes, Krabben, Scholle',
};

/**
 * Helper function to format cooking time
 */
function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} Min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

/**
 * Helper function to translate difficulty
 */
function getDifficultyLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    'einfach': 'Einfach',
    'mittel': 'Mittel',
    'schwierig': 'Schwierig',
  };
  return labels[difficulty] || difficulty;
}

/**
 * Helper function to translate category
 */
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'vorspeise': 'Vorspeise',
    'suppe': 'Suppe',
    'hauptgericht': 'Hauptgericht',
    'beilage': 'Beilage',
    'dessert': 'Dessert',
    'kalte-platte': 'Kalte Platte',
    'snack': 'Snack',
  };
  return labels[category] || category;
}

/**
 * Helper function to get category emoji
 */
function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    'vorspeise': '🦪',
    'suppe': '🍲',
    'hauptgericht': '🐟',
    'beilage': '🥔',
    'dessert': '🍰',
    'kalte-platte': '🍽️',
    'snack': '🥨',
  };
  return emojis[category] || '🍽️';
}

/**
 * Recipe Card Component
 * Displays a single recipe in the grid
 */
function RecipeCard({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  
  return (
    <Link
      href={`/kochbuch/${recipe.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-deep-sea-blue-200"
    >
      <div className="relative h-64 bg-gray-200">
        {/* Image placeholder - will be replaced with actual images */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-sea-blue-300 to-rich-gold-200 flex items-center justify-center">
          <span className="text-6xl">{getCategoryEmoji(recipe.category)}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-serif text-deep-sea-blue mb-2 group-hover:text-rich-gold transition-colors">
          {recipe.title}
        </h3>
        
        {recipe.subtitle && (
          <p className="text-rich-gold font-semibold mb-3">{recipe.subtitle}</p>
        )}
        
        <p className="text-deep-sea-blue-700 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-block px-3 py-1 bg-deep-sea-blue-100 text-deep-sea-blue-700 text-xs font-semibold rounded-full">
            {getCategoryLabel(recipe.category)}
          </span>
          <span className="inline-block px-3 py-1 bg-rich-gold-100 text-rich-gold-700 text-xs font-semibold rounded-full">
            {formatTime(totalTime)}
          </span>
          <span className="inline-block px-3 py-1 bg-deep-sea-blue-100 text-deep-sea-blue-700 text-xs font-semibold rounded-full">
            {getDifficultyLabel(recipe.difficulty)}
          </span>
        </div>
        
        <div className="flex items-center text-rich-gold font-bold group-hover:translate-x-2 transition-transform">
          Zum Rezept
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/**
 * Cookbook Main Page
 * Displays all recipes in a grid layout
 */
export default function KochbuchPage() {
  const recipes = getAllRecipes();
  const featuredRecipes = recipes.filter(r => r.featured);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-deep-sea-blue-50">
      {/* Header */}
      <section className="bg-gradient-to-b from-deep-sea-blue to-deep-sea-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-rich-gold transition-colors mb-8"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zur Hauptseite
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Das BLUM Fisch-Kochbuch
          </h1>
          
          <p className="text-xl md:text-2xl text-white max-w-3xl leading-relaxed font-light mb-8">
            {recipes.length} exklusive Rezepte der Sylter Fisch-Spezialitäten
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl">
            <div className="flex items-start gap-3">
              <span className="text-3xl">💡</span>
              <div>
                <p className="text-white font-semibold mb-2">Tipp für die Ferienwohnung:</p>
                <p className="text-white/90 leading-relaxed">
                  Entdecken Sie die kulinarische Vielfalt der Nordsee mit unseren sorgfältig ausgewählten 
                  Rezepten. Von traditionellen Klassikern bis zu modernen Interpretationen – 
                  jedes Rezept wurde mit Liebe zum Detail entwickelt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      {featuredRecipes.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-serif text-deep-sea-blue mb-10 text-center">
              ⭐ Besonders beliebt
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Recipes */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-serif text-deep-sea-blue mb-10 text-center">
            Alle Rezepte
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 bg-deep-sea-blue text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-lg mb-4">
            💡 <strong>Drucktipp:</strong> Nutzen Sie die Druckfunktion Ihres Browsers (Strg+P / Cmd+P), 
            um einzelne Rezepte als PDF zu speichern!
          </p>
          <p className="text-white/80">
            &copy; 2025 BLUM Fisch-Spezialitäten. Alle Rechte vorbehalten.
          </p>
        </div>
      </section>
    </div>
  );
}
