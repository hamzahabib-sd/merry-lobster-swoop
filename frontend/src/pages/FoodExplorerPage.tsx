import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockFoodCategories, FoodItem } from "@/data/mockFoodCategories";
import { Leaf } from "lucide-react";

const FoodExplorerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto pt-8 pb-4">
        <h2 className="text-4xl font-bold text-center mb-10 drop-shadow-md flex items-center justify-center">
          <Leaf className="h-10 w-10 text-green-300 mr-3" /> Food Explorer
        </h2>
        <p className="text-xl text-center mb-12 font-light max-w-2xl mx-auto">
          Dive into a world of flavors and discover new dishes across various categories and cuisines.
        </p>

        <Tabs defaultValue={mockFoodCategories[0].id} className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 py-3 px-4 rounded-lg">
            {mockFoodCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-base font-semibold text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-teal-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-200 py-2 px-2 rounded-full flex items-center justify-center"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {mockFoodCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item: FoodItem) => (
                  <Card key={item.id} className="bg-white/10 border-white/20 text-white shadow-xl backdrop-blur-sm overflow-hidden">
                    <CardHeader className="p-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-2xl font-bold mb-2">{item.name}</CardTitle>
                      <CardDescription className="text-gray-200 mb-4">{item.description}</CardDescription>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags?.map((tag) => (
                          <span key={tag} className="bg-green-500/20 text-green-200 text-xs px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {item.calories && (
                        <p className="text-lg font-semibold text-green-300">
                          {item.calories} kcal
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FoodExplorerPage;