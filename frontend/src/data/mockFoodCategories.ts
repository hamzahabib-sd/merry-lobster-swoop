export interface FoodItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  calories?: number;
  tags?: string[];
}

export interface FoodCategory {
  id: string;
  name: string;
  items: FoodItem[];
}

export const mockFoodCategories: FoodCategory[] = [
  {
    id: "fast-food",
    name: "Fast Food",
    items: [
      {
        id: "burger",
        name: "Classic Cheeseburger",
        description: "A timeless classic with a juicy beef patty, melted cheese, pickles, onions, and special sauce.",
        imageUrl: "/placeholder.svg",
        calories: 300,
        tags: ["burger", "beef", "cheese"],
      },
      {
        id: "fries",
        name: "Crispy French Fries",
        description: "Golden, crispy potato fries, perfectly salted. A classic side for any meal.",
        imageUrl: "/placeholder.svg",
        calories: 250,
        tags: ["potato", "fried", "side"],
      },
      {
        id: "chicken-nuggets",
        name: "Chicken Nuggets",
        description: "Bite-sized pieces of tender chicken, breaded and fried to perfection.",
        imageUrl: "/placeholder.svg",
        calories: 280,
        tags: ["chicken", "fried"],
      },
      {
        id: "pizza-slice",
        name: "Pepperoni Pizza Slice",
        description: "A classic slice of pizza topped with savory pepperoni and melted mozzarella cheese.",
        imageUrl: "/placeholder.svg",
        calories: 350,
        tags: ["pizza", "pepperoni", "cheese"],
      },
    ],
  },
  {
    id: "healthy-foods",
    name: "Healthy Foods",
    items: [
      {
        id: "grilled-salmon",
        name: "Grilled Salmon with Asparagus",
        description: "Flaky grilled salmon fillet served with tender, steamed asparagus. Rich in Omega-3s.",
        imageUrl: "/placeholder.svg",
        calories: 400,
        tags: ["fish", "protein", "vegetables"],
      },
      {
        id: "quinoa-bowl",
        name: "Mediterranean Quinoa Bowl",
        description: "A vibrant bowl with quinoa, chickpeas, cucumber, tomatoes, olives, and a lemon-herb dressing.",
        imageUrl: "/placeholder.svg",
        calories: 380,
        tags: ["vegan", "grain", "mediterranean"],
      },
      {
        id: "chicken-breast",
        name: "Baked Chicken Breast with Sweet Potato",
        description: "Lean baked chicken breast paired with a nutritious baked sweet potato.",
        imageUrl: "/placeholder.svg",
        calories: 350,
        tags: ["chicken", "protein", "vegetable"],
      },
      {
        id: "avocado-toast",
        name: "Avocado Toast with Egg",
        description: "Toasted whole-grain bread topped with mashed avocado and a perfectly poached egg.",
        imageUrl: "/placeholder.svg",
        calories: 320,
        tags: ["vegetarian", "breakfast", "healthy fats"],
      },
    ],
  },
  {
    id: "salads",
    name: "Salads",
    items: [
      {
        id: "caesar-salad",
        name: "Classic Caesar Salad",
        description: "Crisp romaine lettuce, croutons, parmesan cheese, and creamy Caesar dressing.",
        imageUrl: "/placeholder.svg",
        calories: 280,
        tags: ["vegetarian", "classic"],
      },
      {
        id: "cobb-salad",
        name: "Hearty Cobb Salad",
        description: "Mixed greens with grilled chicken, bacon, hard-boiled egg, avocado, tomatoes, and blue cheese.",
        imageUrl: "/placeholder.svg",
        calories: 450,
        tags: ["chicken", "protein", "greens"],
      },
      {
        id: "greek-salad",
        name: "Fresh Greek Salad",
        description: "Tomatoes, cucumbers, red onion, feta cheese, and olives, dressed with olive oil and oregano.",
        imageUrl: "/placeholder.svg",
        calories: 300,
        tags: ["vegetarian", "mediterranean"],
      },
      {
        id: "spinach-berry-salad",
        name: "Spinach Berry Salad",
        description: "Fresh spinach, mixed berries, goat cheese, candied pecans, and a light vinaigrette.",
        imageUrl: "/placeholder.svg",
        calories: 290,
        tags: ["vegetarian", "fruit", "sweet"],
      },
    ],
  },
  {
    id: "cuisines",
    name: "Different Cuisines",
    items: [
      {
        id: "tacos",
        name: "Authentic Street Tacos",
        description: "Soft corn tortillas filled with seasoned carne asada, onions, cilantro, and a squeeze of lime.",
        imageUrl: "/placeholder.svg",
        calories: 200,
        tags: ["mexican", "beef", "street food"],
      },
      {
        id: "sushi-roll",
        name: "Spicy Tuna Roll",
        description: "Fresh tuna, spicy mayo, and cucumber rolled in sushi rice and nori.",
        imageUrl: "/placeholder.svg",
        calories: 280,
        tags: ["japanese", "fish", "sushi"],
      },
      {
        id: "pasta-carbonara",
        name: "Creamy Pasta Carbonara",
        description: "Classic Italian pasta dish with eggs, hard cheese, cured pork, and black pepper.",
        imageUrl: "/placeholder.svg",
        calories: 600,
        tags: ["italian", "pasta", "pork"],
      },
      {
        id: "curry",
        name: "Indian Chicken Curry",
        description: "Tender chicken pieces simmered in a rich, aromatic, and spicy tomato-based curry sauce.",
        imageUrl: "/placeholder.svg",
        calories: 550,
        tags: ["indian", "chicken", "spicy"],
      },
      {
        id: "pho",
        name: "Vietnamese Pho",
        description: "A fragrant beef noodle soup, served with fresh herbs, bean sprouts, and lime.",
        imageUrl: "/placeholder.svg",
        calories: 450,
        tags: ["vietnamese", "soup", "beef"],
      },
    ],
  },
];