

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
    Notification,
    CuratedItem,
    PromoBannerData
} from '@/lib/types';
import { type CartItem } from '@/contexts/cart-context';
import { curatedForYouItems as initialCuratedForYouItems } from './curated-for-you-data';

// --- INITIAL DATA ---
// This section contains the default data for the application.

const initialProducts: Product[] = [
  { id: '1', name: 'Premium Wireless Headphones', price: 570000, originalPrice: 760000, rating: 4.8, reviewCount: 2450, imageUrl: 'https://i.pinimg.com/564x/e8/e5/7a/e8e57a4e527218617a47535b44085600.jpg', dataAiHint: 'headphones music', description: 'Experience immersive sound with these noise-cancelling wireless headphones. Long-lasting battery and crystal-clear audio for music and calls.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: '2', name: 'Smart Fitness Tracker Watch', price: 342000, rating: 4.6, reviewCount: 1890, imageUrl: 'https://i.pinimg.com/564x/87/a6/e5/87a6e5b1580f4f20818c39b1a8d0554c.jpg', dataAiHint: 'smartwatch fitness', description: 'Track your fitness goals with this sleek and stylish smartwatch. Monitors heart rate, steps, and sleep patterns, all on your wrist.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: '3', name: 'Professional DSLR Camera', price: 3416000, rating: 4.9, reviewCount: 980, imageUrl: 'https://i.pinimg.com/564x/0f/73/45/0f7345331693e507727181f79f222858.jpg', dataAiHint: 'camera photography', description: 'Capture stunning, high-resolution photos with this professional-grade DSLR camera. Perfect for both hobbyists and seasoned photographers.', category: 'electronics', status: 'Out of Stock', sellerName: 'YUNI Store' },
  { id: '4', name: 'Organic Green Tea Set', price: 114000, originalPrice: 152000, rating: 4.7, reviewCount: 3120, imageUrl: 'https://i.pinimg.com/564x/e7/03/c6/e703c6214041720815a557c603a15482.jpg', dataAiHint: 'tea set', description: 'A curated selection of premium organic green teas. This set includes a variety of flavors, perfect for any tea lover.', category: 'beverages', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: '5', name: 'Modern Scandinavian Sofa', price: 4940000, rating: 4.8, reviewCount: 450, imageUrl: 'https://i.pinimg.com/564x/6c/2c/31/6c2c31c099c279a0f5a9f5d342021678.jpg', dataAiHint: 'sofa furniture', description: 'Add a touch of minimalist elegance to your living room with this comfortable and stylish Scandinavian sofa. Built with high-quality materials.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: '6', name: 'Ultra-Light Running Shoes', price: 456000, rating: 4.5, reviewCount: 2200, imageUrl: 'https://i.pinimg.com/564x/0a/69/62/0a6962f3922c1b2c3a59530456a3e5ae.jpg', dataAiHint: 'running shoes', description: 'Feel like you are running on clouds with these ultra-light and responsive running shoes. Designed for maximum comfort and performance.', category: 'fashion', status: 'Archived', sellerName: 'YUNI Store' },
  { id: '7', name: '4K Ultra-HD Drone', price: 1900000, rating: 4.7, reviewCount: 150, imageUrl: 'https://i.pinimg.com/564x/93/29/88/932988cb9b6d8885b5b8c067886477e3.jpg', dataAiHint: 'drone camera', isNew: true, description: 'Capture breathtaking aerial footage in stunning 4K resolution. This easy-to-fly drone is perfect for capturing your adventures from a new perspective.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: '8', name: 'Aesthetic Ceramic Vase', price: 171000, rating: 4.9, reviewCount: 210, imageUrl: 'https://i.pinimg.com/564x/c3/00/f3/c300f33b1e3268b8b200e57e49a850a5.jpg', dataAiHint: 'vase decor', isNew: true, description: 'A beautiful, handcrafted ceramic vase to elevate your home decor. Its minimalist design complements any interior style.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: '9', name: 'Portable Espresso Maker', price: 249000, rating: 4.6, reviewCount: 340, imageUrl: 'https://i.pinimg.com/564x/b8/b1/4b/b8b14b8a4f326177b960b77626a4220c.jpg', dataAiHint: 'coffee espresso', isNew: true, description: 'Enjoy delicious espresso anywhere, anytime. This compact and lightweight portable espresso maker is your perfect travel companion.', category: 'home-office', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: '10', name: 'Smart Garden System', price: 760000, originalPrice: 950000, rating: 4.8, reviewCount: 180, imageUrl: 'https://i.pinimg.com/564x/60/76/3e/60763ee51f4ab4f18d7f287e0048b991.jpg', dataAiHint: 'smart garden', isNew: true, description: 'Grow fresh herbs and vegetables indoors with ease. This smart garden system automates watering and lighting for a perfect harvest every time.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: '11', name: 'Vintage Leather Backpack', price: 361000, rating: 4.7, reviewCount: 412, imageUrl: 'https://i.pinimg.com/564x/3b/b1/34/3bb1349a15f92d47e5b565a5105b4b12.jpg', dataAiHint: 'backpack leather', isNew: true, description: 'A stylish and durable vintage leather backpack that combines classic design with modern functionality. Perfect for work, travel, or school.', category: 'fashion', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: '12', name: 'Augmented Reality Glasses', price: 3036000, rating: 4.5, reviewCount: 95, imageUrl: 'https://i.pinimg.com/564x/42/c4/49/42c449195b280145a33c2a38a371261d.jpg', dataAiHint: 'ar glasses', isNew: true, description: 'Step into the future with these cutting-edge augmented reality glasses. Overlay digital information onto the real world for a new way to interact with your environment.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'fs1', name: 'Smart Air Fryer Pro', price: 342000, originalPrice: 494000, rating: 4.7, reviewCount: 1500, stock: 8, imageUrl: 'https://i.pinimg.com/564x/90/47/41/9047413a968a3563968393539f10a71f.jpg', dataAiHint: 'air fryer', description: 'Cook healthier meals with less oil. This smart air fryer features multiple cooking presets and can be controlled from your smartphone.', category: 'home-office', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'fs2', name: 'Noise-Cancelling Earbuds', price: 228000, originalPrice: 380000, rating: 4.5, reviewCount: 2300, stock: 30, imageUrl: 'https://i.pinimg.com/564x/11/4a/71/114a71343765f02c422205574c86e118.jpg', dataAiHint: 'earbuds audio', description: 'Immerse yourself in your music with these true wireless noise-cancelling earbuds. Compact design with a long-lasting battery.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'fs3', name: 'Robotic Vacuum Cleaner', price: 760000, originalPrice: 1140000, rating: 4.8, reviewCount: 890, stock: 16, imageUrl: 'https://i.pinimg.com/564x/5a/04/4a/5a044a834b67718e8c8949826d76f8f5.jpg', dataAiHint: 'vacuum robot', description: 'Keep your floors clean without lifting a finger. This robotic vacuum navigates your home intelligently, picking up dust and debris.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: 'fs4', name: 'Portable Power Bank 20000mAh', price: 114000, originalPrice: 190000, rating: 4.6, reviewCount: 5400, stock: 50, imageUrl: 'https://i.pinimg.com/564x/32/34/c2/3234c2b9a1033621d91a92e391b72a6c.jpg', dataAiHint: 'power bank', description: 'Never run out of battery again. This high-capacity power bank can charge your devices multiple times on a single charge.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'fs5', name: 'Electric Standing Desk', price: 950000, originalPrice: 1330000, rating: 4.9, reviewCount: 650, stock: 12, imageUrl: 'https://i.pinimg.com/564x/ac/b6/42/acb6422bdee5f68b4221a719c894101e.jpg', dataAiHint: 'standing desk', description: 'Switch between sitting and standing effortlessly with this electric adjustable desk. Improve your posture and productivity.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: 'fs6', name: 'Yoga Mat and Block Set', price: 133000, originalPrice: 228000, rating: 4.7, reviewCount: 1200, stock: 25, imageUrl: 'https://i.pinimg.com/564x/f3/7a/7d/f37a7d41f71a93e3e2304859844299ed.jpg', dataAiHint: 'yoga mat', description: 'Everything you need for your yoga practice. This set includes a high-quality, non-slip yoga mat and two supportive foam blocks.', category: 'health', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'lp1', name: 'Hand-woven Area Rug', price: 874000, rating: 4.8, reviewCount: 210, imageUrl: 'https://i.pinimg.com/564x/9d/28/67/9d2867c293699b0c0348f76fa9fb5431.jpg', dataAiHint: 'rug home', description: 'Add warmth and style to any room with this beautifully hand-woven area rug. Made from natural fibers for a soft and durable finish.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: 'lp2', name: 'Gourmet Coffee Bean Sampler', price: 171000, rating: 4.9, reviewCount: 850, imageUrl: 'https://i.pinimg.com/564x/77/82/a2/7782a297e615e4f208c903332e49c71a.jpg', dataAiHint: 'coffee beans', description: 'Explore a world of flavor with this gourmet coffee bean sampler. Features beans from three different renowned coffee-growing regions.', category: 'beverages', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'lp3', name: 'Smart LED Light Strip', price: 152000, rating: 4.6, reviewCount: 1800, imageUrl: 'https://i.pinimg.com/564x/0f/50/a6/0f50a63116d412036780a1095f681985.jpg', dataAiHint: 'led lights', description: 'Transform your space with customizable lighting. This smart LED strip offers millions of colors and can be synced with music.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'lp4', name: 'Professional Chef\'s Knife', price: 456000, originalPrice: 570000, rating: 4.9, reviewCount: 1100, imageUrl: 'https://i.pinimg.com/564x/08/ee/74/08ee7424075b29841853683a420b996f.jpg', dataAiHint: 'chef knife', description: 'A high-carbon stainless steel chef\'s knife that is a must-have for any kitchen. Perfectly balanced for precision and control.', category: 'home-office', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'lp5', name: 'Silk Pillowcase Set', price: 209000, rating: 4.7, reviewCount: 950, imageUrl: 'https://i.pinimg.com/564x/a4/d1/2f/a4d12f6d2b388ae30a6183e8784bfd19.jpg', dataAiHint: 'silk pillowcase', description: 'Experience the luxury of sleeping on pure silk. These pillowcases are gentle on your skin and hair, reducing friction and bedhead.', category: 'beauty', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'lp6', name: 'Wireless Charging Stand', price: 190000, rating: 4.6, reviewCount: 2200, imageUrl: 'https://i.pinimg.com/564x/c9/4d/99/c94d99432f9d6c753b754e389456570c.jpg', dataAiHint: 'charging stand', description: 'Charge your phone and other compatible devices wirelessly. This sleek stand looks great on any desk or nightstand.', category: 'electronics', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'lp7', name: 'Insulated Water Bottle', price: 95000, rating: 4.8, reviewCount: 6500, imageUrl: 'https://i.pinimg.com/564x/41/55/c2/4155c2c5c9603a110a1727768565259e.jpg', dataAiHint: 'water bottle', description: 'Keep your drinks cold for 24 hours or hot for 12. This stainless steel insulated water bottle is perfect for your active lifestyle.', category: 'home-office', status: 'In Stock', sellerName: 'Jane Smith' },
  { id: 'lp8', name: 'Hardcover Fiction Bestseller', price: 72000, rating: 4.9, reviewCount: 3200, imageUrl: 'https://i.pinimg.com/564x/0f/fe/83/0ffe83f4e3c548f08b39c638e07248e5.jpg', dataAiHint: 'book fiction', description: 'Get lost in the latest bestselling fiction novel that everyone is talking about. A captivating story from a critically acclaimed author.', category: 'books', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'g1', name: 'Fresh Apples (1kg)', price: 15000, rating: 4.5, reviewCount: 150, imageUrl: 'https://i.pinimg.com/564x/c4/ce/d3/c4ced3f4a3311894d8d1e2f753c1533c.jpg', dataAiHint: 'apples fruit', description: 'Crisp and sweet red apples, perfect for a healthy snack.', category: 'groceries', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'g2', name: 'Whole Wheat Bread', price: 8000, rating: 4.6, reviewCount: 200, imageUrl: 'https://i.pinimg.com/564x/4d/52/69/4d526955a5b51a56654e813a3754e7d4.jpg', dataAiHint: 'bread loaf', description: 'Freshly baked whole wheat bread, rich in fiber.', category: 'groceries', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'g3', name: 'Organic Eggs (Dozen)', price: 12000, rating: 4.8, reviewCount: 300, imageUrl: 'https://i.pinimg.com/564x/3d/8c/99/3d8c99f43f05def55c328904128f09b2.jpg', dataAiHint: 'eggs carton', description: 'Farm-fresh organic eggs, packed with protein.', category: 'groceries', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'g4', name: 'Cheddar Cheese Block', price: 25000, rating: 4.7, reviewCount: 180, imageUrl: 'https://i.pinimg.com/564x/78/c6/3d/78c63de062f689e4c1e7a5c78665f80f.jpg', dataAiHint: 'cheese block', description: 'A rich and creamy block of cheddar cheese.', category: 'groceries', status: 'In Stock', sellerName: 'Sofia Davis' },
  { id: 'g5', name: 'Pasta (500g)', price: 7000, rating: 4.5, reviewCount: 400, imageUrl: 'https://i.pinimg.com/564x/31/54/a1/3154a1329c3686e09849514e8b35548c.jpg', dataAiHint: 'pasta uncooked', description: 'Classic Italian pasta, perfect for your favorite sauces.', category: 'groceries', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'g6', name: 'Tomatoes (1kg)', price: 5000, rating: 4.6, reviewCount: 120, imageUrl: 'https://i.pinimg.com/564x/55/84/b3/5584b3e8346b087e594b2f155a00412e.jpg', dataAiHint: 'tomatoes vegetable', description: 'Fresh, juicy tomatoes for salads and cooking.', category: 'groceries', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'b1', name: 'Fanta Orange (500ml)', price: 2500, rating: 4.7, reviewCount: 1200, imageUrl: 'https://i.pinimg.com/564x/57/06/1a/57061a9c331940939527f5413f1d2482.jpg', dataAiHint: 'fanta soda', description: 'Bubbly and refreshing orange-flavored soda.', category: 'beverages', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'b2', name: 'Minute Maid Juice (1L)', price: 7000, rating: 4.6, reviewCount: 800, imageUrl: 'https://i.pinimg.com/564x/c6/8e/58/c68e5863486c2e428c56e30906a5b787.jpg', dataAiHint: 'juice bottle', description: 'Delicious and pulpy orange juice.', category: 'beverages', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'b3', name: 'Riham Rock Boom', price: 3000, rating: 4.8, reviewCount: 2500, imageUrl: 'https://i.pinimg.com/564x/d0/55/e9/d055e9758f27aa51e60f06a0a09e0a6d.jpg', dataAiHint: 'energy drink', description: 'Get a boost of energy with this popular energy drink.', category: 'beverages', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'b4', name: 'Mineral Water (1.5L)', price: 2000, rating: 4.9, reviewCount: 3000, imageUrl: 'https://i.pinimg.com/564x/8e/8b/ee/8e8beef2ba4313f88f1b344733475ac0.jpg', dataAiHint: 'water bottle', description: 'Pure and refreshing mineral water.', category: 'beverages', status: 'In Stock', sellerName: 'YUNI Store' },
  { id: 'b5', name: 'Mirinda Fruity (500ml)', price: 2500, rating: 4.6, reviewCount: 900, imageUrl: 'https://i.pinimg.com/564x/27/9c/68/279c687e148e423531b78298717904e1.jpg', dataAiHint: 'mirinda soda', description: 'A burst of fruity flavor in a bottle.', category: 'beverages', status: 'In Stock', sellerName: 'YUNI Store' },
];

const initialHeroSlides: HeroSlide[] = [
  { id: '1', imageUrl: "https://i.pinimg.com/564x/8e/31/a3/8e31a3a3399b244670a417bf2b12658f.jpg", dataAiHint: "sale fashion", title: "Mega Fashion Sale", subtitle: "Up to 70% off on all brands", link: "/category/fashion", enabled: true },
  { id: '2', imageUrl: "https://i.pinimg.com/564x/f3/09/98/f309983f4368153eb3c93e4219156b69.jpg", dataAiHint: "new electronics", title: "Latest Gadgets Arrived", subtitle: "Discover cutting-edge technology", link: "/category/electronics", enabled: true },
  { id: '3', imageUrl: "https://i.pinimg.com/564x/16/e2/25/16e22557521e1a556da8740c83235313.jpg", dataAiHint: "home decor", title: "Transform Your Home", subtitle: "Find the perfect decor for your space", link: "/category/home-office", enabled: true },
];

const initialPromoCards: PromoCard[] = [
    { id: 'exp1', category: "electronics", title: "Explore Gadgets", imageUrl: "https://i.pinimg.com/564x/6c/e3/37/6ce3378393521b444b04938640742f9d.jpg", dataAiHint: "gadgets iphone", href: "/category/electronics", enabled: true },
    { id: 'exp2', category: "beauty", title: "Beauty Deals", imageUrl: "https://i.pinimg.com/564x/0f/7f/7a/0f7f7a77b09d93b3337905f02c638634.jpg", dataAiHint: "beauty product", href: "/category/beauty", enabled: true },
    { id: 'exp3', category: "mobiles", title: "Smartphone Ad", imageUrl: "https://i.pinimg.com/564x/c2/f0/a8/c2f0a8274d75153229b1192931a153f3.jpg", dataAiHint: "smartphone ad", href: "/search?q=mobiles", enabled: true },
    { id: 'exp4', category: "groceries", title: "Visit Grocery", imageUrl: "https://i.pinimg.com/564x/4b/81/79/4b817924c5e88414434e321528b9c8a9.jpg", dataAiHint: "grocery juice", href: "/category/groceries", enabled: true },
    { id: 'exp5', category: "events", title: "Watch Event Promo", imageUrl: "https://i.pinimg.com/564x/15/8e/31/158e31745428a1924615a137ef2c954b.jpg", dataAiHint: "event promo", href: "/search?q=events", enabled: true },
    { id: 'exp6', category: "beverages", title: "Beverage Offers", imageUrl: "https://i.pinimg.com/564x/1c/9b/6c/1c9b6c0e0b3967d1da50901e16f3d4d4.jpg", dataAiHint: "beverages juice", href: "/category/beverages", enabled: true },
    { id: 'exp7', category: "fashion", title: "Fashion Spotlight", imageUrl: "https://i.pinimg.com/564x/78/34/00/7834005b632646c24b6138676a6e5b88.jpg", dataAiHint: "fashion models", href: "/category/fashion", enabled: true },
    { id: 'exp8', category: "new-arrivals", title: "New Arrivals Ad", imageUrl: "https://i.pinimg.com/564x/87/42/1d/87421d51a659796e62241b1238d35d25.jpg", dataAiHint: "new arrival", href: "/search?q=new arrivals", enabled: true },
    { id: 'exp9', category: "tools", title: "Tech & Tools", imageUrl: "https://i.pinimg.com/564x/27/e6/22/27e62238382103f56b7f3a8b417e997f.jpg", dataAiHint: "tech tools", href: "/search?q=tools", enabled: true },
    { id: 'exp10', category: "deals", title: "Deals of the Day", imageUrl: "https://i.pinimg.com/564x/3b/b1/7d/3bb17d84f884562080a501a357b9ac07.jpg", dataAiHint: "office chair", href: "/search?q=deals", enabled: true },
    { id: 'exp11', category: "showcase", title: "Promo Showcase", imageUrl: "https://i.pinimg.com/564x/2a/3a/0e/2a3a0e1b6f8f0477207604d445218d6e.jpg", dataAiHint: "promo showcase", href: "/search?q=showcase", enabled: true },
    { id: 'exp12', category: "home-office", title: "Office Furniture", imageUrl: "https://i.pinimg.com/564x/84/d4/9f/84d49f6323c2a4f40498e8a7199c0182.jpg", dataAiHint: "office furniture", href: "/category/home-office", enabled: true },
    { id: 'exp13', category: "branding", title: "Branding Ad", imageUrl: "https://i.pinimg.com/564x/72/06/f3/7206f343a41a4a49fe0f1a41551c7a87.jpg", dataAiHint: "branding ad", href: "/search?q=branding", enabled: true },
    { id: 'exp14', category: "services", title: "Services", imageUrl: "https://i.pinimg.com/564x/dd/b5/de/ddb5de2a5b1eba604314c1186b8c9d03.jpg", dataAiHint: "delivery service", href: "/search?q=services", enabled: true },
];

const initialSecondaryPromos: SecondaryPromoGridItem[] = [
  { id: 'promo1', alt: 'Lato Milk Promotion', imageUrl: 'https://i.pinimg.com/564x/e7/87/40/e78740d39e25d2c5e5264b971a7428ac.jpg', dataAiHint: 'milk promotion', link: '#', aspectRatio: '2/1', enabled: true },
  { id: 'promo2', alt: 'Tang Promotion', imageUrl: 'https://i.pinimg.com/564x/a0/0b/49/a00b490f0580436d655f414523c13bb1.jpg', dataAiHint: 'juice promotion', link: '#', aspectRatio: '2/1', enabled: true },
  { id: 'promo3', alt: 'Tropical Heat Snack Promotion', imageUrl: 'https://i.pinimg.com/564x/5b/c9/a1/5bc9a1c1d09292376999a03195f2e6e3.jpg', dataAiHint: 'snack promotion', link: '#', aspectRatio: '4/1', enabled: true },
];

const initialHomepageSections: HomepageSection[] = [
  { id: 'sec-1', type: 'HeroSlider', title: 'Hero Slider', enabled: true, order: 1 },
  { id: 'sec-2', type: 'AnimatedBanner', title: 'Welcome Banner', enabled: true, order: 2 },
  { id: 'sec-3', type: 'CategoryGrid', title: 'Categories', enabled: true, order: 3 },
  { id: 'sec-curated', type: 'CuratedForYou', title: 'Curated For You', enabled: true, order: 4 },
  { id: 'sec-4', type: 'FlashSales', title: 'Flash Sales', enabled: true, order: 5 },
  { id: 'sec-5', type: 'PromoBanner', title: 'Main Promo Banner', enabled: true, order: 6 },
  { id: 'sec-6', type: 'ProductSection', title: 'Top Selling Items', enabled: true, order: 7, productSource: 'top-selling' },
  { id: 'sec-7', type: 'ProductSection', title: 'New Arrivals', enabled: true, order: 8, productSource: 'new-arrivals' },
  { id: 'sec-8', type: 'ProductSection', title: 'Groceries', enabled: true, order: 9, productSource: 'groceries' },
  { id: 'sec-9', type: 'ProductSection', title: 'Beverages', enabled: true, order: 10, productSource: 'beverages' },
  { id: 'sec-10', type: 'LatestProducts', title: 'Latest Products Grid', enabled: true, order: 11 },
  { id: 'sec-11', type: 'ExploreMore', title: 'Explore More Grid', enabled: true, order: 12 },
  { id: 'sec-12', type: 'SecondaryPromoGrid', title: 'Secondary Promo Banners', enabled: true, order: 13 },
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
  { id: 'rev1', userId: 'user-1', userEmail: 'olivia.martin@email.com', userName: 'Olivia Martin', productId: '1', productName: initialProducts.find(p => p.id === '1')?.name || '', productImageUrl: initialProducts.find(p => p.id === '1')?.imageUrl || '', rating: 5, title: 'Absolutely Amazing!', comment: 'The sound quality is out of this world. Noise cancellation works like a charm. Worth every penny!', date: '2023-12-05' },
  { id: 'rev2', userId: 'user-4', userEmail: 'will@email.com', userName: 'William Kim', productId: '6', productName: initialProducts.find(p => p.id === '6')?.name || '', productImageUrl: initialProducts.find(p => p.id === '6')?.imageUrl || '', rating: 4, title: 'Great for daily runs', comment: 'Very comfortable and light. I use them for my morning runs and they have been great. Good value for money.', date: '2023-11-28' },
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

const initialPromoBanners: PromoBannerData[] = [
  {
    id: 'main-promo-1',
    title: 'Fresh Groceries',
    subtitle: 'Get your daily essentials delivered to your doorstep. Quality guaranteed.',
    buttonText: 'Shop Groceries',
    link: '/category/groceries',
    imageUrl: 'https://i.pinimg.com/564x/f2/83/87/f2838797f1f33a18a5f36e3a9c73e878.jpg',
    dataAiHint: 'grocery banner',
    enabled: true,
  }
];

const DB_STORAGE_KEY = 'yuni-app-db';

interface DbType {
    products: Product[];
    heroSlides: HeroSlide[];
    promoCards: PromoCard[];
    promoBanners: PromoBannerData[];
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
    curatedForYouItems: CuratedItem[];
}

const initialDb: DbType = {
    products: initialProducts,
    heroSlides: initialHeroSlides,
    promoCards: initialPromoCards,
    promoBanners: initialPromoBanners,
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
    curatedForYouItems: initialCuratedForYouItems,
};


// --- DATABASE SETUP ---

function loadDb(): DbType {
  if (typeof window !== 'undefined') {
    const savedDb = window.localStorage.getItem(DB_STORAGE_KEY);
    if (savedDb) {
      try {
        const parsedDb = JSON.parse(savedDb);
        // Basic check to see if loaded data is valid
        if (parsedDb && typeof parsedDb === 'object' && 'products' in parsedDb) {
            return parsedDb;
        }
      } catch (e) {
        console.error("Failed to parse DB from localStorage", e);
      }
    }
  }
  return JSON.parse(JSON.stringify(initialDb)); // Return a fresh copy to avoid mutation
}

function saveDb(dbInstance: DbType) {
  if (typeof window !== 'undefined') {
    try {
        window.localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(dbInstance));
    } catch(e) {
        console.error("Failed to save DB to localStorage", e);
    }
  }
}

// Global instance of the DB
export const db = loadDb();

// Persist any changes made to the db object
export function persistDb() {
    saveDb(db);
}
