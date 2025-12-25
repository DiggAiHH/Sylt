/**
 * Recipe Data for BLUM Cookbook
 * Type-safe recipe data extracted from HTML cookbook
 */

import type { Recipe } from '@sylt/types';

export const recipes: Recipe[] = [
  {
    id: '01',
    title: 'Sylter Royal Austern',
    slug: 'sylter-royal-austern',
    subtitle: 'mit Champagner-Vinaigrette',
    description: 'Frische Sylter Austern mit einer delikaten Champagner-Vinaigrette – ein luxuriöser Genuss der Nordseeküche.',
    category: 'vorspeise',
    difficulty: 'mittel',
    prepTime: 10,
    cookTime: 5,
    servings: 4,
    image: {
      url: '/images/recipes/sylter-austern.jpg',
      alt: 'Sylter Royal Austern mit Champagner-Vinaigrette',
      width: 1200,
      height: 800,
    },
    ingredients: [
      { id: '1', amount: 12, unit: 'Stück', name: 'frische Sylter Royal Austern' },
      { id: '2', amount: 100, unit: 'ml', name: 'Champagner', notes: 'trocken' },
      { id: '3', amount: 2, unit: 'Stück', name: 'Schalotten', notes: 'fein gehackt' },
      { id: '4', amount: 2, unit: 'EL', name: 'weißer Balsamico-Essig' },
      { id: '5', amount: 1, unit: 'EL', name: 'Olivenöl', notes: 'extra nativ' },
      { id: '6', amount: 1, unit: 'TL', name: 'Dijon-Senf' },
      { id: '7', amount: 'nach Geschmack', name: 'Salz und frisch gemahlener Pfeffer' },
      { id: '8', amount: 'zum Garnieren', name: 'frischer Dill' },
      { id: '9', amount: 'zum Servieren', name: 'Zitronenscheiben' },
      { id: '10', amount: 'zum Servieren', name: 'Crushed Ice' },
    ],
    steps: [
      {
        id: '1',
        stepNumber: 1,
        instruction: 'Die Austern gründlich unter kaltem Wasser abspülen und mit einer Austerngabel vorsichtig öffnen. Das Fleisch in der unteren Schale belassen und den Saft auffangen.',
      },
      {
        id: '2',
        stepNumber: 2,
        instruction: 'Für die Champagner-Vinaigrette die Schalotten sehr fein würfeln und in einer kleinen Schüssel mit Champagner, Balsamico-Essig, Olivenöl und Senf vermischen.',
      },
      {
        id: '3',
        stepNumber: 3,
        instruction: 'Die Vinaigrette mit Salz und Pfeffer abschmecken und etwa 10 Minuten ziehen lassen, damit sich die Aromen gut verbinden können.',
        duration: 10,
      },
      {
        id: '4',
        stepNumber: 4,
        instruction: 'Eine große Platte mit Crushed Ice bedecken. Die geöffneten Austern darauf arrangieren und jeweils einen Teelöffel der Champagner-Vinaigrette über jede Auster träufeln.',
      },
      {
        id: '5',
        stepNumber: 5,
        instruction: 'Mit frischem Dill garnieren und mit Zitronenscheiben servieren. Sofort genießen!',
      },
    ],
    tips: [
      'Frische prüfen: Frische Austern sollten fest geschlossen sein. Öffnen sie sich leicht, sind sie nicht mehr genießbar.',
      'Öffnen: Mit einem speziellen Austernmesser am Scharnier ansetzen und vorsichtig drehen. Handschuhe schützen vor Verletzungen.',
      'Serviertemperatur: Austern immer gut gekühlt servieren – das intensiviert den Geschmack.',
      'Wein-Empfehlung: Ein trockener Champagner oder Sylter Weißwein passt perfekt zu diesem Gericht.',
    ],
    tags: ['austern', 'meeresfrüchte', 'champagner', 'vorspeise', 'festlich'],
    featured: true,
    publishedAt: new Date('2025-01-01'),
  },
  {
    id: '02',
    title: 'Krabbensuppe',
    slug: 'krabbensuppe',
    subtitle: 'nach Friesenart',
    description: 'Eine cremige, herzhafte Suppe mit frischen Nordseekrabben – ein Klassiker der friesischen Küche.',
    category: 'suppe',
    difficulty: 'einfach',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    image: {
      url: '/images/recipes/krabbensuppe.jpg',
      alt: 'Krabbensuppe nach Friesenart',
      width: 1200,
      height: 800,
    },
    ingredients: [
      { id: '1', amount: 300, unit: 'g', name: 'Nordseekrabben', notes: 'gepult' },
      { id: '2', amount: 1, unit: 'Stück', name: 'Zwiebel', notes: 'fein gewürfelt' },
      { id: '3', amount: 2, unit: 'Stück', name: 'Karotten', notes: 'gewürfelt' },
      { id: '4', amount: 1, unit: 'Stück', name: 'Stange Lauch', notes: 'in Ringe geschnitten' },
      { id: '5', amount: 30, unit: 'g', name: 'Butter' },
      { id: '6', amount: 2, unit: 'EL', name: 'Mehl' },
      { id: '7', amount: 750, unit: 'ml', name: 'Fischfond' },
      { id: '8', amount: 200, unit: 'ml', name: 'Sahne' },
      { id: '9', amount: 100, unit: 'ml', name: 'Weißwein', notes: 'trocken' },
      { id: '10', amount: 'nach Geschmack', name: 'Salz, Pfeffer, Muskatnuss' },
      { id: '11', amount: 'zum Garnieren', name: 'frische Petersilie' },
    ],
    steps: [
      {
        id: '1',
        stepNumber: 1,
        instruction: 'Butter in einem großen Topf erhitzen und Zwiebel, Karotten und Lauch darin andünsten, bis sie weich sind.',
        duration: 5,
      },
      {
        id: '2',
        stepNumber: 2,
        instruction: 'Mehl einstreuen und unter Rühren kurz anschwitzen lassen. Mit Weißwein ablöschen und etwas einkochen lassen.',
        duration: 2,
      },
      {
        id: '3',
        stepNumber: 3,
        instruction: 'Fischfond zugießen und die Suppe etwa 10 Minuten köcheln lassen.',
        duration: 10,
      },
      {
        id: '4',
        stepNumber: 4,
        instruction: 'Sahne einrühren und die Suppe mit Salz, Pfeffer und einer Prise Muskatnuss abschmecken.',
      },
      {
        id: '5',
        stepNumber: 5,
        instruction: 'Die Nordseekrabben in die Suppe geben und nur kurz erwärmen (nicht kochen, sonst werden sie zäh). Mit gehackter Petersilie garnieren und servieren.',
      },
    ],
    tips: [
      'Krabben immer erst zum Schluss zugeben und nur erwärmen, nicht kochen.',
      'Für extra Geschmack können Sie einige Krabben separat in Butter anbraten und als Topping verwenden.',
      'Die Suppe lässt sich gut vorbereiten – Krabben aber erst kurz vor dem Servieren hinzufügen.',
    ],
    tags: ['krabben', 'suppe', 'nordsee', 'friesisch', 'comfort-food'],
    featured: true,
    publishedAt: new Date('2025-01-01'),
  },
  {
    id: '03',
    title: 'Gebratene Scholle',
    slug: 'gebratene-scholle',
    subtitle: 'Finkenwerder Art',
    description: 'Ein klassisches norddeutsches Fischgericht mit knusprig gebratenem Speck und frischen Krabben.',
    category: 'hauptgericht',
    difficulty: 'einfach',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    image: {
      url: '/images/recipes/gebratene-scholle.jpg',
      alt: 'Gebratene Scholle Finkenwerder Art',
      width: 1200,
      height: 800,
    },
    ingredients: [
      { id: '1', amount: 2, unit: 'Stück', name: 'Schollen', notes: 'küchenfertig, à ca. 400g' },
      { id: '2', amount: 150, unit: 'g', name: 'durchwachsener Speck', notes: 'in Scheiben' },
      { id: '3', amount: 100, unit: 'g', name: 'Nordseekrabben', notes: 'gepult' },
      { id: '4', amount: 50, unit: 'g', name: 'Butter' },
      { id: '5', amount: 'nach Bedarf', name: 'Mehl zum Wenden' },
      { id: '6', amount: 1, unit: 'Stück', name: 'Zitrone' },
      { id: '7', amount: 'nach Geschmack', name: 'Salz und Pfeffer' },
      { id: '8', amount: 'zum Garnieren', name: 'frische Petersilie' },
    ],
    steps: [
      {
        id: '1',
        stepNumber: 1,
        instruction: 'Die Schollen waschen, trocken tupfen und mit Salz und Pfeffer würzen. Anschließend in Mehl wenden und überschüssiges Mehl abklopfen.',
      },
      {
        id: '2',
        stepNumber: 2,
        instruction: 'Den Speck in einer großen Pfanne knusprig ausbraten, dann herausnehmen und warm stellen.',
        duration: 5,
      },
      {
        id: '3',
        stepNumber: 3,
        instruction: 'In dem ausgelassenen Speckfett die Butter schmelzen und die Schollen von beiden Seiten goldbraun braten (ca. 4-5 Minuten pro Seite).',
        duration: 10,
      },
      {
        id: '4',
        stepNumber: 4,
        instruction: 'Die Nordseekrabben in der Pfanne kurz in der restlichen Butter schwenken.',
      },
      {
        id: '5',
        stepNumber: 5,
        instruction: 'Die Schollen auf vorgewärmten Tellern anrichten, mit Speck und Krabben belegen. Mit Zitronenscheiben, Petersilie garnieren und sofort servieren.',
      },
    ],
    tips: [
      'Die Scholle sollte durchgebraten, aber nicht zu trocken sein. Die Gräten sollten sich leicht vom Fleisch lösen.',
      'Traditionell wird das Gericht mit Bratkartoffeln und Gurkensalat serviert.',
      'Achten Sie darauf, dass die Pfanne groß genug ist – die Fische sollten nicht übereinander liegen.',
    ],
    tags: ['scholle', 'fisch', 'hauptgericht', 'norddeutsch', 'klassiker'],
    featured: true,
    publishedAt: new Date('2025-01-01'),
  },
  {
    id: '04',
    title: 'Matjesfilet',
    slug: 'matjesfilet',
    subtitle: 'mit Hausfrauensauce',
    description: 'Zarter Matjes mit einer cremigen Sauce aus Äpfeln, Zwiebeln und Sahne – ein norddeutscher Klassiker.',
    category: 'kalte-platte',
    difficulty: 'einfach',
    prepTime: 20,
    cookTime: 0,
    servings: 4,
    image: {
      url: '/images/recipes/matjesfilet.jpg',
      alt: 'Matjesfilet mit Hausfrauensauce',
      width: 1200,
      height: 800,
    },
    ingredients: [
      { id: '1', amount: 8, unit: 'Stück', name: 'Matjesfilets' },
      { id: '2', amount: 2, unit: 'Stück', name: 'säuerliche Äpfel', notes: 'z.B. Boskop' },
      { id: '3', amount: 2, unit: 'Stück', name: 'Zwiebeln', notes: 'fein gewürfelt' },
      { id: '4', amount: 200, unit: 'ml', name: 'Sahne' },
      { id: '5', amount: 200, unit: 'g', name: 'Schmand' },
      { id: '6', amount: 1, unit: 'EL', name: 'mittelscharfer Senf' },
      { id: '7', amount: 1, unit: 'EL', name: 'Zitronensaft' },
      { id: '8', amount: 'nach Geschmack', name: 'Salz, Pfeffer, Zucker' },
      { id: '9', amount: 'zum Garnieren', name: 'frischer Dill' },
      { id: '10', amount: 'zum Servieren', name: 'Pellkartoffeln' },
    ],
    steps: [
      {
        id: '1',
        stepNumber: 1,
        instruction: 'Die Matjesfilets kalt abspülen, trocken tupfen und in einer Schüssel beiseite stellen.',
      },
      {
        id: '2',
        stepNumber: 2,
        instruction: 'Äpfel schälen, entkernen und in kleine Würfel schneiden. Zwiebeln fein würfeln.',
      },
      {
        id: '3',
        stepNumber: 3,
        instruction: 'Sahne, Schmand, Senf und Zitronensaft in einer Schüssel glatt rühren. Apfel- und Zwiebelwürfel unterheben.',
      },
      {
        id: '4',
        stepNumber: 4,
        instruction: 'Die Sauce mit Salz, Pfeffer und einer Prise Zucker abschmecken. Mindestens 30 Minuten im Kühlschrank ziehen lassen.',
        duration: 30,
      },
      {
        id: '5',
        stepNumber: 5,
        instruction: 'Die Matjesfilets auf Tellern anrichten, großzügig mit der Hausfrauensauce übergießen und mit frischem Dill garnieren. Mit Pellkartoffeln servieren.',
      },
    ],
    tips: [
      'Die Sauce schmeckt am besten, wenn sie mehrere Stunden oder über Nacht durchziehen kann.',
      'Wer es milder mag, kann die Zwiebeln kurz in heißem Wasser blanchieren.',
      'Matjes sollte immer gut gekühlt serviert werden.',
      'Traditionell werden grüne Bohnen als Beilage gereicht.',
    ],
    tags: ['matjes', 'fisch', 'kalte-platte', 'norddeutsch', 'klassiker'],
    featured: false,
    publishedAt: new Date('2025-01-01'),
  },
];

/**
 * Get all recipes
 */
export function getAllRecipes(): Recipe[] {
  return recipes;
}

/**
 * Get a single recipe by slug
 */
export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.slug === slug);
}

/**
 * Get a single recipe by ID
 */
export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id);
}

/**
 * Get featured recipes
 */
export function getFeaturedRecipes(): Recipe[] {
  return recipes.filter((recipe) => recipe.featured);
}

/**
 * Get recipes by category
 */
export function getRecipesByCategory(category: string): Recipe[] {
  return recipes.filter((recipe) => recipe.category === category);
}

/**
 * Get total recipe count
 */
export function getTotalRecipeCount(): number {
  return recipes.length;
}
