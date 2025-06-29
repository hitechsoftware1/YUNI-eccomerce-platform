

import type { 
    Product, 
    HeroSlide, 
    PromoCard, 
    SecondaryPromoGridItem,
    HomepageSection,
    ManagedUser,
    UserReview,
    Order,
    OrderItem,
    PaymentMethod,
    Address,
    Notification
} from '@/lib/types';
import { type CartItem } from '@/contexts/cart-context';
import { promoBannerData } from './promo-banner-data';

// --- INITIAL DATA ---
// This section contains the default data for the application.

const initialProducts: Product[] = [
  { id: '1', name: 'Premium Wireless Headphones', price: 570000, originalPrice: 760000, rating: 4.8, reviewCount: 2450, imageUrl: 'https://images.unsplash.com/photo-1585298723682-7115561c51b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aGVhZHBob25lc3xlbnwwfHx8fDE3NTA2Njk0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'headphones music', description: 'Experience immersive sound with these noise-cancelling wireless headphones. Long-lasting battery and crystal-clear audio for music and calls.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: '2', name: 'Smart Fitness Tracker Watch', price: 342000, rating: 4.6, reviewCount: 1890, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'smartwatch fitness', description: 'Track your fitness goals with this sleek and stylish smartwatch. Monitors heart rate, steps, and sleep patterns, all on your wrist.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: '3', name: 'Professional DSLR Camera', price: 3416000, rating: 4.9, reviewCount: 980, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'camera photography', description: 'Capture stunning, high-resolution photos with this professional-grade DSLR camera. Perfect for both hobbyists and seasoned photographers.', category: 'electronics', status: 'Out of Stock', sellerName: 'YUNI Store' },
  { id: '4', name: 'Organic Green Tea Set', price: 114000, originalPrice: 152000, rating: 4.7, reviewCount: 3120, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'tea set', description: 'A curated selection of premium organic green teas. This set includes a variety of flavors, perfect for any tea lover.', category: 'beverages', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: '5', name: 'Modern Scandinavian Sofa', price: 4940000, rating: 4.8, reviewCount: 450, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'sofa furniture', description: 'Add a touch of minimalist elegance to your living room with this comfortable and stylish Scandinavian sofa. Built with high-quality materials.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: '6', name: 'Ultra-Light Running Shoes', price: 456000, rating: 4.5, reviewCount: 2200, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'running shoes', description: 'Feel like you are running on clouds with these ultra-light and responsive running shoes. Designed for maximum comfort and performance.', category: 'fashion', status: 'Archived', sellerName: 'YUNI Store' },
  { id: '7', name: '4K Ultra-HD Drone', price: 1900000, rating: 4.7, reviewCount: 150, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'drone camera', isNew: true, description: 'Capture breathtaking aerial footage in stunning 4K resolution. This easy-to-fly drone is perfect for capturing your adventures from a new perspective.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: '8', name: 'Aesthetic Ceramic Vase', price: 171000, rating: 4.9, reviewCount: 210, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'vase decor', isNew: true, description: 'A beautiful, handcrafted ceramic vase to elevate your home decor. Its minimalist design complements any interior style.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: '9', name: 'Portable Espresso Maker', price: 249000, rating: 4.6, reviewCount: 340, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'coffee espresso', isNew: true, description: 'Enjoy delicious espresso anywhere, anytime. This compact and lightweight portable espresso maker is your perfect travel companion.', category: 'home-office', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: '10', name: 'Smart Garden System', price: 760000, originalPrice: 950000, rating: 4.8, reviewCount: 180, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'smart garden', isNew: true, description: 'Grow fresh herbs and vegetables indoors with ease. This smart garden system automates watering and lighting for a perfect harvest every time.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: '11', name: 'Vintage Leather Backpack', price: 361000, rating: 4.7, reviewCount: 412, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'backpack leather', isNew: true, description: 'A stylish and durable vintage leather backpack that combines classic design with modern functionality. Perfect for work, travel, or school.', category: 'fashion', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: '12', name: 'Augmented Reality Glasses', price: 3036000, rating: 4.5, reviewCount: 95, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'ar glasses', isNew: true, description: 'Step into the future with these cutting-edge augmented reality glasses. Overlay digital information onto the real world for a new way to interact with your environment.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'fs1', name: 'Smart Air Fryer Pro', price: 342000, originalPrice: 494000, rating: 4.7, reviewCount: 1500, stock: 8, imageUrl: 'https://images.unsplash.com/photo-1714581069109-c5631e17eb00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhaXIlMjBmcnllcnxlbnwwfHx8fDE3NTA4MTEyNDl8MA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'air fryer', description: 'Cook healthier meals with less oil. This smart air fryer features multiple cooking presets and can be controlled from your smartphone.', category: 'home-office', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'fs2', name: 'Noise-Cancelling Earbuds', price: 228000, originalPrice: 380000, rating: 4.5, reviewCount: 2300, stock: 30, imageUrl: 'https://images.unsplash.com/photo-1620360642994-974f7fd8e9b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxlYXJidWRzJTIwYXVkaW98ZW58MHx8fHwxNzUwODExMjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'earbuds audio', description: 'Immerse yourself in your music with these true wireless noise-cancelling earbuds. Compact design with a long-lasting battery.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'fs3', name: 'Robotic Vacuum Cleaner', price: 760000, originalPrice: 1140000, rating: 4.8, reviewCount: 890, stock: 16, imageUrl: 'https://images.unsplash.com/photo-1731985997058-130b8703b8e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHx2YWN1dW0lMjByb2JvdHxlbnwwfHx8fDE3NTA4MTEyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'vacuum robot', description: 'Keep your floors clean without lifting a finger. This robotic vacuum navigates your home intelligently, picking up dust and debris.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: 'fs4', name: 'Portable Power Bank 20000mAh', price: 114000, originalPrice: 190000, rating: 4.6, reviewCount: 5400, stock: 50, imageUrl: 'https://images.unsplash.com/photo-1644571663498-f4f18db66c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cG93ZXIlMjBiYW5rfGVufDB8fHx8MTc1MDgxMTI1MHww&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'power bank', description: 'Never run out of battery again. This high-capacity power bank can charge your devices multiple times on a single charge.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'fs5', name: 'Electric Standing Desk', price: 950000, originalPrice: 1330000, rating: 4.9, reviewCount: 650, stock: 12, imageUrl: 'https://images.unsplash.com/photo-1622131243631-1cf9ff4a8b9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzdGFuZGluZyUyMGRlc2t8ZW58MHx8fHwxNzUwODExMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'standing desk', description: 'Switch between sitting and standing effortlessly with this electric adjustable desk. Improve your posture and productivity.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: 'fs6', name: 'Yoga Mat and Block Set', price: 133000, originalPrice: 228000, rating: 4.7, reviewCount: 1200, stock: 25, imageUrl: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8eW9nYSUyMG1hdHxlbnwwfHx8fDE3NTA4MTEyNTB8MA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'yoga mat', description: 'Everything you need for your yoga practice. This set includes a high-quality, non-slip yoga mat and two supportive foam blocks.', category: 'health', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'lp1', name: 'Hand-woven Area Rug', price: 874000, rating: 4.8, reviewCount: 210, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'rug home', description: 'Add warmth and style to any room with this beautifully hand-woven area rug. Made from natural fibers for a soft and durable finish.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: 'lp2', name: 'Gourmet Coffee Bean Sampler', price: 171000, rating: 4.9, reviewCount: 850, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'coffee beans', description: 'Explore a world of flavor with this gourmet coffee bean sampler. Features beans from three different renowned coffee-growing regions.', category: 'beverages', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'lp3', name: 'Smart LED Light Strip', price: 152000, rating: 4.6, reviewCount: 1800, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'led lights', description: 'Transform your space with customizable lighting. This smart LED strip offers millions of colors and can be synced with music.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'lp4', name: 'Professional Chef\'s Knife', price: 456000, originalPrice: 570000, rating: 4.9, reviewCount: 1100, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'chef knife', description: 'A high-carbon stainless steel chef\'s knife that is a must-have for any kitchen. Perfectly balanced for precision and control.', category: 'home-office', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'lp5', name: 'Silk Pillowcase Set', price: 209000, rating: 4.7, reviewCount: 950, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'silk pillowcase', description: 'Experience the luxury of sleeping on pure silk. These pillowcases are gentle on your skin and hair, reducing friction and bedhead.', category: 'beauty', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'lp6', name: 'Wireless Charging Stand', price: 190000, rating: 4.6, reviewCount: 2200, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'charging stand', description: 'Charge your phone and other compatible devices wirelessly. This sleek stand supports fast charging and looks great on any desk or nightstand.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'lp7', name: 'Insulated Water Bottle', price: 95000, rating: 4.8, reviewCount: 6500, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'water bottle', description: 'Keep your drinks cold for 24 hours or hot for 12. This stainless steel insulated water bottle is perfect for your active lifestyle.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: 'lp8', name: 'Hardcover Fiction Bestseller', price: 72000, rating: 4.9, reviewCount: 3200, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'book fiction', description: 'Get lost in the latest bestselling fiction novel that everyone is talking about. A captivating story from a critically acclaimed author.', category: 'books', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'g1', name: 'Fresh Apples (1kg)', price: 15000, rating: 4.5, reviewCount: 150, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'apples fruit', description: 'Crisp and sweet red apples, perfect for a healthy snack.', category: 'groceries', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'g2', name: 'Whole Wheat Bread', price: 8000, rating: 4.6, reviewCount: 200, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'bread loaf', description: 'Freshly baked whole wheat bread, rich in fiber.', category: 'groceries', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'g3', name: 'Organic Eggs (Dozen)', price: 12000, rating: 4.8, reviewCount: 300, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'eggs carton', description: 'Farm-fresh organic eggs, packed with protein.', category: 'groceries', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'g4', name: 'Cheddar Cheese Block', price: 25000, rating: 4.7, reviewCount: 180, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'cheese block', description: 'A rich and creamy block of cheddar cheese.', category: 'groceries', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'g5', name: 'Pasta (500g)', price: 7000, rating: 4.5, reviewCount: 400, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'pasta uncooked', description: 'Classic Italian pasta, perfect for your favorite sauces.', category: 'groceries', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'g6', name: 'Tomatoes (1kg)', price: 5000, rating: 4.6, reviewCount: 120, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'tomatoes vegetable', description: 'Fresh, juicy tomatoes for salads and cooking.', category: 'groceries', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'b1', name: 'Fanta Orange (500ml)', price: 2500, rating: 4.7, reviewCount: 1200, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'fanta soda', description: 'Bubbly and refreshing orange-flavored soda.', category: 'beverages', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'b2', name: 'Minute Maid Juice (1L)', price: 7000, rating: 4.6, reviewCount: 800, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'juice bottle', description: 'Delicious and pulpy orange juice.', category: 'beverages', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'b3', name: 'Riham Rock Boom', price: 3000, rating: 4.8, reviewCount: 2500, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'energy drink', description: 'Get a boost of energy with this popular energy drink.', category: 'beverages', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'b4', name: 'Mineral Water (1.5L)', price: 2000, rating: 4.9, reviewCount: 3000, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'water bottle', description: 'Pure and refreshing mineral water.', category: 'beverages', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'b5', name: 'Mirinda Fruity (500ml)', price: 2500, rating: 4.6, reviewCount: 900, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'mirinda soda', description: 'A burst of fruity flavor in a bottle.', category: 'beverages', status: 'In Stock', sellerName: 'YUNI Store' },
];

const initialHeroSlides: HeroSlide[] = [
  { id: '1', imageUrl: "https://images.unsplash.com/photo-1685883518316-355533810d68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c2FsZSUyMGZhc2hpb258ZW58MHx8fHwxNzUwNzc3NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080", dataAiHint: "sale fashion", title: "Mega Fashion Sale", subtitle: "Up to 70% off on all brands", link: "/category/fashion" },
  { id: '2', imageUrl: "https://images.unsplash.com/photo-1611120227195-91674b693491?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxuZXclMjBlbGVjdHJvbmljc3xlbnwwfHx8fDE3NTA3Nzc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080", dataAiHint: "new electronics", title: "Latest Gadgets Arrived", subtitle: "Discover cutting-edge technology", link: "/category/electronics" },
  { id: '3', imageUrl: "https://images.unsplash.com/photo-1572048793162-8a36a83f1def?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxob21lJTIwZGVjb3J8ZW58MHx8fHwxNzUwNzc3NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080", dataAiHint: "home decor", title: "Transform Your Home", subtitle: "Find the perfect decor for your space", link: "/category/home-office" },
];

const initialPromoCards: PromoCard[] = [
    { id: 'exp1', category: "electronics", title: "Explore Gadgets", imageUrl: "https://images.unsplash.com/photo-1593344473520-745a5857e1ab?q=80&w=2514&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "gadgets iphone", href: "/category/electronics" },
    { id: 'exp2', category: "beauty", title: "Beauty Deals", imageUrl: "https://images.unsplash.com/photo-1580852300004-15942c754651?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "beauty product", href: "/category/beauty" },
    { id: 'exp3', category: "mobiles", title: "Smartphone Ad", imageUrl: "https://images.unsplash.com/photo-1587426868910-c361a3842137?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "smartphone ad", href: "/search?q=mobiles" },
    { id: 'exp4', category: "groceries", title: "Visit Grocery", imageUrl: "https://images.unsplash.com/photo-1628102390447-e6f5f838724d?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "grocery juice", href: "/category/groceries" },
    { id: 'exp5', category: "events", title: "Watch Event Promo", imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "event promo", href: "/search?q=events" },
    { id: 'exp6', category: "beverages", title: "Beverage Offers", imageUrl: "https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "beverages juice", href: "/category/beverages" },
    { id: 'exp7', category: "fashion", title: "Fashion Spotlight", imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "fashion models", href: "/category/fashion" },
    { id: 'exp8', category: "new-arrivals", title: "New Arrivals Ad", imageUrl: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "new arrival", href: "/search?q=new arrivals" },
    { id: 'exp9', category: "tools", title: "Tech & Tools", imageUrl: "https://images.unsplash.com/photo-1618389041498-c0b784a0d8f8?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "tech tools", href: "/search?q=tools" },
    { id: 'exp10', category: "deals", title: "Deals of the Day", imageUrl: "https://images.unsplash.com/photo-1560250056-07ba64664864?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "office chair", href: "/search?q=deals" },
    { id: 'exp11', category: "showcase", title: "Promo Showcase", imageUrl: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "promo showcase", href: "/search?q=showcase" },
    { id: 'exp12', category: "home-office", title: "Office Furniture", imageUrl: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "office furniture", href: "/category/home-office" },
    { id: 'exp13', category: "branding", title: "Branding Ad", imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "branding ad", href: "/search?q=branding" },
    { id: 'exp14', category: "services", title: "Services", imageUrl: "https://images.unsplash.com/photo-1576092762791-5c0df886071a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", dataAiHint: "delivery service", href: "/search?q=services" },
];

const initialSecondaryPromos: SecondaryPromoGridItem[] = [
  { id: 'promo1', alt: 'Lato Milk Promotion', imageUrl: 'https://images.unsplash.com/photo-1523473827533-2a64d0d36748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtaWxrJTIwcHJvbW90aW9ufGVufDB8fHx8MTc1MDgxMDMxNXww&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'milk promotion', link: '#', aspectRatio: '2/1' },
  { id: 'promo2', alt: 'Tang Promotion', imageUrl: 'https://images.unsplash.com/photo-1727233431592-8baaf337ee44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8anVpY2UlMjBwcm9tb3Rpb258ZW58MHx8fHwxNzUwODEwMzE1fDA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'juice promotion', link: '#', aspectRatio: '2/1' },
  { id: 'promo3', alt: 'Tropical Heat Snack Promotion', imageUrl: 'https://images.unsplash.com/photo-1585704169993-af12385bf3a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzbmFjayUyMHByb21vdGlvbnxlbnwwfHx8fDE3NTA4MTAzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'snack promotion', link: '#', aspectRatio: '4/1' },
];

const initialHomepageSections: HomepageSection[] = [
  { id: 'sec-1', type: 'HeroSlider', title: 'Hero Slider', enabled: true, order: 1 },
  { id: 'sec-2', type: 'AnimatedBanner', title: 'Welcome Banner', enabled: true, order: 2 },
  { id: 'sec-3', type: 'CategoryGrid', title: 'Categories', enabled: true, order: 3 },
  { id: 'sec-4', type: 'FlashSales', title: 'Flash Sales', enabled: true, order: 4 },
  { id: 'sec-5', type: 'PromoBanner', title: 'Main Promo Banner', enabled: true, order: 5 },
  { id: 'sec-6', type: 'ProductSection', title: 'Top Selling Items', enabled: true, order: 6, productSource: 'top-selling' },
  { id: 'sec-7', type: 'ProductSection', title: 'New Arrivals', enabled: true, order: 7, productSource: 'new-arrivals' },
  { id: 'sec-8', type: 'ProductSection', title: 'Groceries', enabled: true, order: 8, productSource: 'groceries' },
  { id: 'sec-9', type: 'ProductSection', title: 'Beverages', enabled: true, order: 9, productSource: 'beverages' },
  { id: 'sec-10', type: 'LatestProducts', title: 'Latest Products Grid', enabled: true, order: 10 },
  { id: 'sec-11', type: 'ExploreMore', title: 'Explore More Grid', enabled: true, order: 11 },
  { id: 'sec-12', type: 'SecondaryPromoGrid', title: 'Secondary Promo Banners', enabled: true, order: 12 },
];

const initialUsers: ManagedUser[] = [
  { id: 'user-1', name: 'Olivia Martin', email: 'olivia.martin@email.com', role: 'Admin', status: 'Active', lastLogin: '2024-05-20T10:00:00Z' },
  { id: 'user-2', name: 'Jackson Lee', email: 'jackson.lee@email.com', role: 'Buyer', status: 'Active', lastLogin: '2024-05-19T14:30:00Z' },
  { id: 'user-3', name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', role: 'Buyer', status: 'Banned', lastLogin: '2024-05-18T09:15:00Z' },
  { id: 'user-4', name: 'William Kim', email: 'will@email.com', role: 'Admin', status: 'Active', lastLogin: '2024-05-20T11:45:00Z' },
  { id: 'user-5', name: 'Sofia Davis', email: 'sofia.davis@email.com', role: 'Seller', status: 'Active', lastLogin: '2024-05-17T20:00:00Z' },
  { id: 'user-6', name: 'Hitech Software', email: 'hitechsoftware03@gmail.com', role: 'Admin', status: 'Active', lastLogin: '2024-05-20T12:00:00Z' },
  { id: 'user-7', name: 'John Doe', email: 'john.doe@example.com', role: 'Buyer', status: 'Active', lastLogin: '2024-05-15T08:00:00Z' },
  { id: 'user-8', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Seller', status: 'Pending Approval', lastLogin: '2024-05-16T18:20:00Z' },
];

const initialUserReviews: UserReview[] = [
  { id: 'rev1', productId: '1', productName: initialProducts.find(p => p.id === '1')?.name || '', productImageUrl: initialProducts.find(p => p.id === '1')?.imageUrl || '', rating: 5, title: 'Absolutely Amazing!', comment: 'The sound quality is out of this world. Noise cancellation works like a charm. Worth every penny!', date: '2023-12-05' },
  { id: 'rev2', productId: '6', productName: initialProducts.find(p => p.id === '6')?.name || '', productImageUrl: initialProducts.find(p => p.id === '6')?.imageUrl || '', rating: 4, title: 'Great for daily runs', comment: 'Very comfortable and light. I use them for my morning runs and they have been great. Good value for money.', date: '2023-11-28' },
];

const mockAddress1: Address = { id: 'addr-1', fullName: 'Olivia Martin', addressLine1: '123 Fictional St', city: 'Kampala', country: 'Uganda', postalCode: '10101', phoneNumber: '+256 700 123456' };
const mockAddress2: Address = { id: 'addr-2', fullName: 'Jackson Lee', addressLine1: '456 Imaginary Ave', city: 'Entebbe', country: 'Uganda', postalCode: '10102', phoneNumber: '+256 700 654321' };
const mockAddress3: Address = { id: 'addr-3', fullName: 'William Kim', addressLine1: '789 Madeup Rd', city: 'Jinja', country: 'Uganda', postalCode: '10103', phoneNumber: '+256 700 789012' };

const mapProductToOrderItem = (product: any, quantity: number): OrderItem => ({ id: product.id, name: product.name, price: product.price, quantity: quantity, imageUrl: product.imageUrl, dataAiHint: product.dataAiHint, sellerName: product.sellerName });

const initialOrders: Order[] = [
    { id: 'ORD001', customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com' }, date: '2023-11-23', status: 'Fulfilled', total: 250000, shippingAddress: mockAddress1, items: [ mapProductToOrderItem(initialProducts.find(p => p.id === '1'), 1), mapProductToOrderItem(initialProducts.find(p => p.id === '4'), 1) ].filter(item => item.id) as OrderItem[] },
    { id: 'ORD002', customer: { name: 'Jackson Lee', email: 'jackson.lee@email.com' }, date: '2023-11-23', status: 'Pending', total: 150000, shippingAddress: mockAddress2, items: [ mapProductToOrderItem(initialProducts.find(p => p.id === 'g1'), 10), ].filter(item => item.id) as OrderItem[] },
    { id: 'ORD003', customer: { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com' }, date: '2023-11-22', status: 'Cancelled', total: 350000, shippingAddress: mockAddress1, items: [ mapProductToOrderItem(initialProducts.find(p => p.id === 'fs2'), 1), ].filter(item => item.id) as OrderItem[] },
    { id: 'ORD004', customer: { name: 'William Kim', email: 'will@email.com' }, date: '2023-11-21', status: 'Fulfilled', total: 550000, shippingAddress: mockAddress3, items: [ mapProductToOrderItem(initialProducts.find(p => p.id === '6'), 1), ].filter(item => item.id) as OrderItem[] },
    { id: 'ORD005', customer: { name: 'Sofia Davis', email: 'sofia.davis@email.com' }, date: '2023-11-20', status: 'Fulfilled', total: 75000, shippingAddress: mockAddress2, items: [ mapProductToOrderItem(initialProducts.find(p => p.id === 'b1'), 30), ].filter(item => item.id) as OrderItem[] },
    { id: 'ORD006', customer: { name: 'Olivia Martin', email: 'olivia.martin@email.com' }, date: '2024-01-15', status: 'Fulfilled', total: 120000, shippingAddress: mockAddress1, items: [ mapProductToOrderItem(initialProducts.find(p => p.id === 'b2'), 10), mapProductToOrderItem(initialProducts.find(p => p.id === 'b3'), 10) ].filter(item => item.id) as OrderItem[] },
    { id: 'ORD007', customer: { name: 'William Kim', email: 'will@email.com' }, date: '2024-02-10', status: 'Pending', total: 89000, shippingAddress: mockAddress3, items: [ mapProductToOrderItem(initialProducts.find(p => p.id === 'lp7'), 1), ].filter(item => item.id) as OrderItem[] }
];

const initialPaymentMethods: PaymentMethod[] = [{ id: 'pm_1', cardholderName: 'John Doe', cardNumber: '4242424242424242', expiryDate: '12/25', cardType: 'visa' }];
const initialUserAddresses: Address[] = [{ id: 'addr-demouser-1', fullName: 'Demo User', addressLine1: '123 Fictional St', city: 'Kampala', country: 'Uganda', postalCode: '10101', phoneNumber: '+256 700 123456', isDefault: true }];

// --- DATABASE SETUP ---

// This setup ensures that in a development environment with hot-reloading,
// our in-memory "database" isn't wiped clean on every file change.
declare global {
  var __db__: {
    products: Product[];
    heroSlides: HeroSlide[];
    promoCards: PromoCard[];
    secondaryPromos: SecondaryPromoGridItem[];
    homepageSections: HomepageSection[];
    users: ManagedUser[];
    userReviews: UserReview[];
    userOrders: Order[];
    paymentMethods: PaymentMethod[];
    userAddresses: Address[];
    cartItems: CartItem[];
    wishlistProductIds: string[];
    allNotifications: Notification[];
    promoBanner: typeof promoBannerData;
  }
}

if (!global.__db__) {
  global.__db__ = {
    products: initialProducts,
    heroSlides: initialHeroSlides,
    promoCards: initialPromoCards,
    secondaryPromos: initialSecondaryPromos,
    homepageSections: initialHomepageSections,
    users: initialUsers,
    userReviews: initialUserReviews,
    userOrders: initialOrders,
    paymentMethods: initialPaymentMethods,
    userAddresses: initialUserAddresses,
    cartItems: [],
    wishlistProductIds: ['1', 'fs6', 'lp2'],
    allNotifications: [],
    promoBanner: promoBannerData,
  };
}

// Export the single instance of our "database"
export const db = global.__db__;
