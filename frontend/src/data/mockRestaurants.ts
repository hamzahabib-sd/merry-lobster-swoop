export interface MenuItem {
  id: string;
  name: string;
  calories: number;
  description?: string;
  imageUrl?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  distance: number; // in miles, for mock purposes
  menu: MenuItem[];
}

export const mockRestaurants: Restaurant[] = [
  {
    id: "mcdonalds",
    name: "McDonald's",
    cuisine: "Fast Food",
    distance: 0.8,
    menu: [
      { id: "mc-double", name: "McDouble", calories: 400, description: "Classic burger with two beef patties." },
      { id: "mcchicken", name: "McChicken", calories: 400, description: "Crispy chicken patty with lettuce and mayo." },
      { id: "small-fries", name: "Small Fries", calories: 230, description: "World Famous Fries, small." },
      { id: "apple-slices", name: "Apple Slices", calories: 15, description: "Fresh apple slices." },
      { id: "coke-zero", name: "Coke Zero Sugar", calories: 0, description: "Zero calorie soda." },
      { id: "big-mac", name: "Big Mac", calories: 590, description: "Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun." },
      { id: "quarter-pounder", name: "Quarter Pounder with Cheese", calories: 520, description: "100% fresh beef quarter pound patty with cheese." },
      { id: "chicken-nuggets-6", name: "6 pc Chicken McNuggets", calories: 250, description: "Tender, juicy Chicken McNuggets." },
      { id: "side-salad", name: "Side Salad", calories: 15, description: "Fresh greens with no dressing." },
      { id: "hot-fudge-sundae", name: "Hot Fudge Sundae", calories: 330, description: "Vanilla soft serve with hot fudge." },
      { id: "egg-mcmuffin", name: "Egg McMuffin", calories: 310, description: "Classic breakfast sandwich." },
      { id: "hash-brown", name: "Hash Brown", calories: 150, description: "Crispy, golden hash brown." },
    ],
  },
  {
    id: "burger-king",
    name: "Burger King",
    cuisine: "Fast Food",
    distance: 1.2,
    menu: [
      { id: "whopper-jr", name: "Whopper Jr.", calories: 340, description: "Flame-grilled beef patty with classic toppings." },
      { id: "chicken-fries-6", name: "6 pc Chicken Fries", calories: 260, description: "Fun-to-eat chicken fries." },
      { id: "garden-side-salad", name: "Garden Side Salad", calories: 30, description: "Mixed greens with no dressing." },
      { id: "diet-coke", name: "Diet Coke", calories: 0, description: "Zero calorie soda." },
      { id: "whopper", name: "Whopper", calories: 670, description: "Flame-grilled beef patty with all the fixings." },
      { id: "impossible-whopper", name: "Impossible Whopper", calories: 630, description: "Plant-based patty with classic Whopper toppings." },
      { id: "crispy-chicken", name: "Crispy Chicken Sandwich", calories: 600, description: "Crispy chicken fillet with lettuce and mayo." },
      { id: "onion-rings-small", name: "Small Onion Rings", calories: 300, description: "Crispy, golden onion rings." },
      { id: "soft-serve-cone", name: "Soft Serve Cone", calories: 140, description: "Vanilla soft serve in a cone." },
    ],
  },
  {
    id: "subway",
    name: "Subway",
    cuisine: "Sandwiches",
    distance: 0.5,
    menu: [
      { id: "6-inch-turkey", name: "6-inch Turkey Breast Sub", calories: 250, description: "Turkey breast, lettuce, tomatoes, onions, green peppers, cucumbers." },
      { id: "6-inch-veg", name: "6-inch Veggie Delite Sub", calories: 200, description: "Fresh veggies, lettuce, tomatoes, onions, green peppers, cucumbers." },
      { id: "apple-slices-subway", name: "Apple Slices", calories: 50, description: "Fresh apple slices." },
      { id: "water", name: "Bottled Water", calories: 0, description: "Pure bottled water." },
      { id: "footlong-steak-cheese", name: "Footlong Steak & Cheese", calories: 700, description: "Steak and melted cheese on a footlong sub." },
      { id: "6-inch-italian-bmt", name: "6-inch Italian B.M.T.", calories: 380, description: "Pepperoni, salami, and ham." },
      { id: "6-inch-chicken-teriyaki", name: "6-inch Sweet Onion Chicken Teriyaki", calories: 330, description: "Chicken strips with sweet onion teriyaki sauce." },
      { id: "cookies", name: "Chocolate Chip Cookie", calories: 200, description: "Classic chocolate chip cookie." },
    ],
  },
  {
    id: "taco-bell",
    name: "Taco Bell",
    cuisine: "Mexican Fast Food",
    distance: 1.5,
    menu: [
      { id: "fresco-crunchy-taco", name: "Fresco Crunchy Taco", calories: 140, description: "Crunchy taco shell with seasoned beef, lettuce, and pico de gallo." },
      { id: "fresco-soft-taco", name: "Fresco Soft Taco", calories: 160, description: "Soft tortilla with seasoned beef, lettuce, and pico de gallo." },
      { id: "black-beans", name: "Black Beans", calories: 80, description: "Seasoned black beans." },
      { id: "diet-pepsi", name: "Diet Pepsi", calories: 0, description: "Zero calorie soda." },
      { id: "crunchwrap-supreme", name: "Crunchwrap Supreme", calories: 530, description: "Seasoned beef, nacho cheese sauce, crunchy tostada shell, sour cream, lettuce, and tomato." },
      { id: "cheesy-gordita-crunch", name: "Cheesy Gordita Crunch", calories: 500, description: "Hard taco shell, soft flatbread, and a blend of cheeses." },
      { id: "nacho-fries", name: "Nacho Fries", calories: 320, description: "Crispy fries seasoned with bold Mexican spices." },
      { id: "cinnamon-twists", name: "Cinnamon Twists", calories: 170, description: "Crispy, puffy, cinnamon-sugar twists." },
    ],
  },
  {
    id: "chick-fil-a",
    name: "Chick-fil-A",
    cuisine: "Fast Food",
    distance: 2.1,
    menu: [
      { id: "grilled-chicken-sandwich", name: "Grilled Chicken Sandwich", calories: 380, description: "Grilled chicken breast, lettuce, tomato on a multigrain bun." },
      { id: "chicken-nuggets-8", name: "8 pc Grilled Chicken Nuggets", calories: 130, description: "Bite-sized pieces of grilled chicken breast." },
      { id: "fruit-cup", name: "Fruit Cup", calories: 60, description: "Freshly prepared fruit." },
      { id: "diet-lemonade", name: "Diet Lemonade", calories: 30, description: "Freshly squeezed diet lemonade." },
      { id: "spicy-chicken-sandwich", name: "Spicy Chicken Sandwich", calories: 460, description: "Spicy chicken breast, pickles on a toasted bun." },
      { id: "waffle-fries-medium", name: "Medium Waffle Potato Fries", calories: 420, description: "Waffle-cut potatoes cooked in canola oil." },
      { id: "cobb-salad", name: "Cobb Salad with Grilled Nuggets", calories: 510, description: "Mixed greens, grilled chicken, corn, cheese, bacon, eggs." },
      { id: "chocolate-milkshake", name: "Chocolate Milkshake", calories: 600, description: "Hand-spun chocolate milkshake." },
    ],
  },
];