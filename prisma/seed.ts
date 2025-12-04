import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ============================================
// MENU ITEMS DATA
// Preserved from the original menuItems.ts
// ============================================
const menuItems = [
    // Starters
    {
        name: "Bruschetta al Pomodoro",
        description: "Toasted sourdough topped with fresh tomatoes, garlic, basil, and extra virgin olive oil.",
        price: 12,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1506280754576-f6fa8a873550?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },
    {
        name: "Crispy Calamari",
        description: "Golden fried squid rings served with lemon wedges and homemade tartare sauce.",
        price: 16,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },
    {
        name: "Truffle Arancini",
        description: "Crispy risotto balls infused with black truffle and mozzarella, served with marinara.",
        price: 14,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },
    {
        name: "Caprese Salad",
        description: "Fresh mozzarella, vine-ripened tomatoes, and basil, drizzled with balsamic glaze.",
        price: 15,
        category: "Starters",
        image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },

    // Mains
    {
        name: "Wagyu Beef Burger",
        description: "Premium Wagyu patty, brioche bun, aged cheddar, caramelized onions, and truffle mayo.",
        price: 28,
        category: "Mains",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },
    {
        name: "Pan-Seared Salmon",
        description: "Fresh Atlantic salmon fillet served with asparagus, roasted potatoes, and lemon butter sauce.",
        price: 32,
        category: "Mains",
        image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },
    {
        name: "Truffle Mushroom Risotto",
        description: "Creamy arborio rice cooked with wild mushrooms, parmesan, and a drizzle of truffle oil.",
        price: 26,
        category: "Mains",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },
    {
        name: "Ribeye Steak",
        description: "300g grass-fed Ribeye steak, grilled to perfection, served with peppercorn sauce and fries.",
        price: 45,
        category: "Mains",
        image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },

    // Desserts
    {
        name: "Classic Tiramisu",
        description: "Layers of coffee-soaked ladyfingers and mascarpone cream, dusted with cocoa powder.",
        price: 12,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },
    {
        name: "Molten Chocolate Lava Cake",
        description: "Warm chocolate cake with a gooey center, served with vanilla bean ice cream.",
        price: 14,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },
    {
        name: "New York Cheesecake",
        description: "Rich and creamy cheesecake with a graham cracker crust, topped with fresh berry compote.",
        price: 13,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },
    {
        name: "Panna Cotta",
        description: "Silky vanilla bean panna cotta served with a tart raspberry coulis.",
        price: 11,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
        isAvailable: true,
    },
];

async function main() {
    console.log("🌱 Starting Urban Bites database seed...");

    // Clear existing menu items
    await prisma.menuItem.deleteMany();
    console.log("🗑️  Cleared existing menu items");

    // Insert menu items
    for (const item of menuItems) {
        await prisma.menuItem.create({
            data: item,
        });
        console.log(`✅ Added: ${item.name}`);
    }

    console.log(`\n🎉 Seed completed! Added ${menuItems.length} menu items.`);
    console.log("\n📊 Summary:");
    console.log(`   - Starters: ${menuItems.filter(i => i.category === "Starters").length}`);
    console.log(`   - Mains: ${menuItems.filter(i => i.category === "Mains").length}`);
    console.log(`   - Desserts: ${menuItems.filter(i => i.category === "Desserts").length}`);
}

main()
    .catch((e) => {
        console.error("❌ Seed failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
