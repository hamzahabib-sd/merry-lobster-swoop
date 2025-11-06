from models import Restaurant, MenuItem

mock_restaurants = [
    Restaurant(
        id="1",
        name="The Green Leaf",
        distance=2,
        menu=[
            MenuItem(id="1-1", name="Avocado Toast", description="Smashed avocado on whole wheat toast.", calories=350),
            MenuItem(id="1-2", name="Quinoa Salad", description="Quinoa with mixed greens, cherry tomatoes, and a lemon vinaigrette.", calories=450),
            MenuItem(id="1-3", name="Green Smoothie", description="Spinach, kale, banana, and almond milk.", calories=300),
        ],
    ),
    Restaurant(
        id="2",
        name="Pizza Palace",
        distance=4,
        menu=[
            MenuItem(id="2-1", name="Margherita Pizza", description="Classic pizza with fresh mozzarella, tomatoes, and basil.", calories=800),
            MenuItem(id="2-2", name="Pepperoni Pizza", description="A classic favorite with spicy pepperoni.", calories=1000),
            MenuItem(id="2-3", name="Garlic Bread", description="Toasted bread with garlic, butter, and herbs.", calories=400),
        ],
    ),
    Restaurant(
        id="3",
        name="Burger Barn",
        distance=1,
        menu=[
            MenuItem(id="3-1", name="Cheeseburger", description="Juicy beef patty with cheddar cheese, lettuce, and tomato.", calories=600),
            MenuItem(id="3-2", name="Fries", description="Crispy golden fries.", calories=400),
            MenuItem(id="3-3", name="Milkshake", description="Thick and creamy vanilla milkshake.", calories=500),
        ],
    ),
    Restaurant(
        id="4",
        name="Taco Town",
        distance=3,
        menu=[
            MenuItem(id="4-1", name="Carne Asada Tacos", description="Grilled steak tacos with onions and cilantro.", calories=550),
            MenuItem(id="4-2", name="Chicken Burrito", description="Grilled chicken, rice, beans, and salsa in a flour tortilla.", calories=700),
            MenuItem(id="4-3", name="Chips and Guacamole", description="Freshly made guacamole with crispy tortilla chips.", calories=450),
        ],
    ),
    Restaurant(
        id="5",
        name="Sushi Station",
        distance=5,
        menu=[
            MenuItem(id="5-1", name="California Roll", description="Crab, avocado, and cucumber rolled in seaweed and rice.", calories=300),
            MenuItem(id="5-2", name="Spicy Tuna Roll", description="Tuna, spicy mayo, and cucumber.", calories=350),
            MenuItem(id="5-3", name="Miso Soup", description="Traditional Japanese soup with tofu and seaweed.", calories=100),
        ],
    ),
    Restaurant(
        id="6",
        name="Pasta Place",
        distance=2,
        menu=[
            MenuItem(id="6-1", name="Spaghetti Carbonara", description="Pasta with eggs, cheese, pancetta, and black pepper.", calories=850),
            MenuItem(id="6-2", name="Fettuccine Alfredo", description="Fettuccine pasta in a creamy parmesan sauce.", calories=950),
            MenuItem(id="6-3", name="Caesar Salad", description="Romaine lettuce with Caesar dressing, croutons, and parmesan cheese.", calories=400),
        ],
    ),
    Restaurant(
        id="7",
        name="The Golden Wok",
        distance=4,
        menu=[
            MenuItem(id="7-1", name="General Tso's Chicken", description="Sweet and spicy deep-fried chicken.", calories=1100),
            MenuItem(id="7-2", name="Beef and Broccoli", description="Stir-fried beef and broccoli in a savory sauce.", calories=700),
            MenuItem(id="7-3", name="Egg Rolls", description="Crispy fried rolls filled with vegetables and meat.", calories=350),
        ],
    ),
    Restaurant(
        id="8",
        name="Steakhouse Supreme",
        distance=5,
        menu=[
            MenuItem(id="8-1", name="Ribeye Steak", description="A tender and juicy 12oz ribeye steak.", calories=1200),
            MenuItem(id="8-2", name="Loaded Baked Potato", description="Baked potato with butter, sour cream, cheese, and bacon.", calories=600),
            MenuItem(id="8-3", name="Creamed Spinach", description="Creamy and delicious spinach side dish.", calories=450),
        ],
    ),
    Restaurant(
        id="9",
        name="The Breakfast Club",
        distance=1,
        menu=[
            MenuItem(id="9-1", name="Pancakes", description="Fluffy pancakes with maple syrup and butter.", calories=700),
            MenuItem(id="9-2", name="Omelette", description="Three-egg omelette with your choice of fillings.", calories=500),
            MenuItem(id="9-3", name="Bacon", description="Crispy strips of bacon.", calories=300),
        ],
    ),
    Restaurant(
        id="10",
        name="Mediterranean Grill",
        distance=3,
        menu=[
            MenuItem(id="10-1", name="Gyro Wrap", description="Lamb and beef gyro with tzatziki sauce in a pita.", calories=650),
            MenuItem(id="10-2", name="Hummus and Pita", description="Creamy hummus with warm pita bread.", calories=400),
            MenuItem(id="10-3", name="Greek Salad", description="Tomatoes, cucumbers, onions, olives, and feta cheese.", calories=350),
        ],
    ),
    Restaurant(
        id="11",
        name="The Curry House",
        distance=4,
        menu=[
            MenuItem(id="11-1", name="Chicken Tikka Masala", description="Creamy and flavorful chicken curry.", calories=900),
            MenuItem(id="11-2", name="Naan Bread", description="Soft and chewy Indian bread.", calories=300),
            MenuItem(id="11-3", name="Samosas", description="Fried pastry with a savory filling of spiced potatoes and peas.", calories=400),
        ],
    ),
    Restaurant(
        id="12",
        name="The Sandwich Shop",
        distance=1,
        menu=[
            MenuItem(id="12-1", name="Turkey Club", description="Turkey, bacon, lettuce, and tomato on toasted bread.", calories=700),
            MenuItem(id="12-2", name="Italian Sub", description="Salami, ham, provolone, and vegetables on a sub roll.", calories=800),
            MenuItem(id="12-3", name="Tomato Soup", description="Creamy tomato soup.", calories=300),
        ],
    ),
    Restaurant(
        id="13",
        name="The Seafood Shack",
        distance=5,
        menu=[
            MenuItem(id="13-1", name="Fish and Chips", description="Battered and fried fish with crispy fries.", calories=1000),
            MenuItem(id="13-2", name="Lobster Roll", description="Lobster meat with mayo on a toasted roll.", calories=600),
            MenuItem(id="13-3", name="Clam Chowder", description="Creamy New England style clam chowder.", calories=500),
        ],
    ),
    Restaurant(
        id="14",
        name="The Ramen Bar",
        distance=2,
        menu=[
            MenuItem(id="14-1", name="Tonkotsu Ramen", description="Rich and creamy pork broth ramen.", calories=900),
            MenuItem(id="14-2", name="Shoyu Ramen", description="Soy sauce based chicken broth ramen.", calories=700),
            MenuItem(id="14-3", name="Gyoza", description="Pan-fried pork dumplings.", calories=400),
        ],
    ),
    Restaurant(
        id="15",
        name="The BBQ Pit",
        distance=4,
        menu=[
            MenuItem(id="15-1", name="Pulled Pork Sandwich", description="Slow-smoked pulled pork on a bun.", calories=800),
            MenuItem(id="15-2", name="Brisket", description="Tender and juicy smoked brisket.", calories=1000),
            MenuItem(id="15-3", name="Mac and Cheese", description="Creamy and cheesy macaroni.", calories=600),
        ],
    ),
    Restaurant(
        id="16",
        name="The Healthy Hub",
        distance=1,
        menu=[
            MenuItem(id="16-1", name="Grilled Chicken Salad", description="Grilled chicken breast over mixed greens.", calories=500),
            MenuItem(id="16-2", name="Veggie Wrap", description="Assorted vegetables in a whole wheat wrap.", calories=400),
            MenuItem(id="16-3", name="Fruit Bowl", description="A mix of fresh seasonal fruits.", calories=200),
        ],
    ),
    Restaurant(
        id="17",
        name="The Noodle House",
        distance=3,
        menu=[
            MenuItem(id="17-1", name="Pad Thai", description="Stir-fried rice noodles with shrimp, tofu, and peanuts.", calories=800),
            MenuItem(id="17-2", name="Pho", description="Vietnamese noodle soup with beef.", calories=700),
            MenuItem(id="17-3", name="Spring Rolls", description="Fresh spring rolls with shrimp and vegetables.", calories=300),
        ],
    ),
    Restaurant(
        id="18",
        name="The Coffee Corner",
        distance=1,
        menu=[
            MenuItem(id="18-1", name="Latte", description="Espresso with steamed milk.", calories=200),
            MenuItem(id="18-2", name="Croissant", description="Buttery and flaky croissant.", calories=300),
            MenuItem(id="18-3", name="Muffin", description="Blueberry muffin.", calories=400),
        ],
    ),
    Restaurant(
        id="19",
        name="The Ice Cream Shop",
        distance=2,
        menu=[
            MenuItem(id="19-1", name="Chocolate Ice Cream", description="Rich and creamy chocolate ice cream.", calories=400),
            MenuItem(id="19-2", name="Vanilla Ice Cream", description="Classic vanilla bean ice cream.", calories=350),
            MenuItem(id="19-3", name="Sundae", description="Ice cream with chocolate sauce, whipped cream, and a cherry.", calories=600),
        ],
    ),
    Restaurant(
        id="20",
        name="The Donut Den",
        distance=3,
        menu=[
            MenuItem(id="20-1", name="Glazed Donut", description="Classic glazed donut.", calories=300),
            MenuItem(id="20-2", name="Chocolate Donut", description="Chocolate frosted donut.", calories=350),
            MenuItem(id="20-3", name="Jelly Donut", description="Donut filled with raspberry jelly.", calories=400),
        ],
    ),
    Restaurant(
        id="21",
        name="The Bagel Bakery",
        distance=1,
        menu=[
            MenuItem(id="21-1", name="Everything Bagel", description="Bagel with everything seasoning.", calories=300),
            MenuItem(id="21-2", name="Cream Cheese", description="Plain cream cheese.", calories=100),
            MenuItem(id="21-3", name="Lox and Bagel", description="Smoked salmon, cream cheese, and capers on a bagel.", calories=500),
        ],
    ),
    Restaurant(
        id="22",
        name="The Smoothie Spot",
        distance=2,
        menu=[
            MenuItem(id="22-1", name="Strawberry Banana Smoothie", description="Strawberries, bananas, and yogurt.", calories=350),
            MenuItem(id="22-2", name="Mango Pineapple Smoothie", description="Mango, pineapple, and coconut milk.", calories=400),
            MenuItem(id="22-3", name="Protein Shake", description="Whey protein, banana, and almond milk.", calories=450),
        ],
    ),
    Restaurant(
        id="23",
        name="The Crepe Cafe",
        distance=4,
        menu=[
            MenuItem(id="23-1", name="Nutella Crepe", description="Crepe filled with Nutella and bananas.", calories=600),
            MenuItem(id="23-2", name="Ham and Cheese Crepe", description="Savory crepe with ham and swiss cheese.", calories=500),
            MenuItem(id="23-3", name="Sugar and Lemon Crepe", description="Classic crepe with sugar and lemon juice.", calories=400),
        ],
    ),
    Restaurant(
        id="24",
        name="The Falafel Stand",
        distance=3,
        menu=[
            MenuItem(id="24-1", name="Falafel Pita", description="Falafel balls in a pita with tahini sauce.", calories=500),
            MenuItem(id="24-2", name="Falafel Plate", description="Falafel balls with hummus, pita, and salad.", calories=700),
            MenuItem(id="24-3", name="Baklava", description="Sweet pastry with nuts and honey.", calories=400),
        ],
    ),
    Restaurant(
        id="25",
        name="The Dumpling House",
        distance=5,
        menu=[
            MenuItem(id="25-1", name="Pork Dumplings", description="Steamed or pan-fried pork dumplings.", calories=500),
            MenuItem(id="25-2", name="Vegetable Dumplings", description="Steamed or pan-fried vegetable dumplings.", calories=400),
            MenuItem(id="25-3", name="Soup Dumplings", description="Dumplings filled with hot soup.", calories=600),
        ],
    ),
    Restaurant(
        id="26",
        name="The Acai Bowl Bar",
        distance=2,
        menu=[
            MenuItem(id="26-1", name="Classic Acai Bowl", description="Acai puree with granola, banana, and honey.", calories=500),
            MenuItem(id="26-2", name="Tropical Acai Bowl", description="Acai puree with mango, pineapple, and coconut.", calories=550),
            MenuItem(id="26-3", name="Berry Acai Bowl", description="Acai puree with mixed berries and granola.", calories=520),
        ],
    ),
    Restaurant(
        id="27",
        name="The Poke Place",
        distance=4,
        menu=[
            MenuItem(id="27-1", name="Tuna Poke Bowl", description="Raw tuna over rice with various toppings.", calories=600),
            MenuItem(id="27-2", name="Salmon Poke Bowl", description="Raw salmon over rice with various toppings.", calories=650),
            MenuItem(id="27-3", name="Tofu Poke Bowl", description="Tofu over rice with various toppings.", calories=500),
        ],
    ),
    Restaurant(
        id="28",
        name="The Juice Joint",
        distance=1,
        menu=[
            MenuItem(id="28-1", name="Green Juice", description="Kale, spinach, apple, and celery.", calories=150),
            MenuItem(id="28-2", name="Carrot Ginger Juice", description="Carrot, ginger, and apple.", calories=200),
            MenuItem(id="28-3", name="Beet Juice", description="Beet, apple, and lemon.", calories=180),
        ],
    ),
    Restaurant(
        id="29",
        name="The Waffle Window",
        distance=3,
        menu=[
            MenuItem(id="29-1", name="Belgian Waffle", description="Thick and fluffy waffle with powdered sugar.", calories=500),
            MenuItem(id="29-2", name="Chicken and Waffles", description="Fried chicken on a Belgian waffle.", calories=900),
            MenuItem(id="29-3", name="Fruit Waffle", description="Waffle with fresh berries and whipped cream.", calories=650),
        ],
    ),
    Restaurant(
        id="30",
        name="The Kebab King",
        distance=5,
        menu=[
            MenuItem(id="30-1", name="Chicken Kebab", description="Grilled chicken skewers.", calories=500),
            MenuItem(id="30-2", name="Lamb Kebab", description="Grilled lamb skewers.", calories=600),
            MenuItem(id="30-3", name="Rice Pilaf", description="Buttered rice with vermicelli.", calories=300),
        ],
    ),
]
