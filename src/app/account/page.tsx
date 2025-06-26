
'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, LayoutDashboard, ShoppingBag, EyeOff, Heart, UserCog, BookUser, Wand2, Pencil, Loader2, ChevronRight, Bell, AlertTriangle, ShieldCheck, Monitor, Smartphone, Palette, CreditCard, Undo2, PlusCircle, Trash2, Gift, Copy } from 'lucide-react';
import { getOrdersByEmail } from '@/lib/user-orders';
import type { Order, Product, Address, UserReview, LoginActivity, PaymentMethod, UserReturn } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ProductCard } from '@/components/product-card';
import { recommendProducts } from '@/ai/flows/product-recommendations';
import { useToast } from '@/hooks/use-toast';
import { PersonalDetailsModal } from '@/components/personal-details-modal';
import { AddressBookModal } from '@/components/address-book-modal';
import { getAddresses, saveAddresses } from '@/lib/user-addresses';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { DeactivateAccountDialog } from '@/components/deactivate-account-dialog';
import { getReviewsByEmail } from '@/lib/user-reviews';
import { getLoginActivity } from '@/lib/login-activity';
import { UserReviewCard } from '@/components/user-review-card';
import { useTheme } from 'next-themes';
import { getPaymentMethods, savePaymentMethods } from '@/lib/payment-methods';
import { AddPaymentMethodModal } from '@/components/add-payment-method-modal';
import { VisaIcon } from '@/components/icons/visa-icon';
import { MastercardIcon } from '@/components/icons/mastercard-icon';
import { getRecentlyViewedItems } from '@/lib/recently-viewed';
import { EditReviewModal } from '@/components/edit-review-modal';
import { DeleteReviewDialog } from '@/components/delete-review-dialog';
import { getReturnsForUser } from '@/lib/user-returns';
import { isAdmin } from '@/lib/admins';


export default function AccountPage() {
  const { currentUser, loading, logOut, updateUserProfile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [recentlyViewed, setRecentlyViewed] = React.useState<Product[]>([]);
  const [recommendations, setRecommendations] = React.useState<string[]>([]);
  const [isRecsLoading, setIsRecsLoading] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = React.useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = React.useState(false);
  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = React.useState(false);
  const [reviews, setReviews] = React.useState<UserReview[]>([]);
  const [loginActivity, setLoginActivity] = React.useState<LoginActivity[]>([]);
  const { theme, setTheme } = useTheme();
  
  // Mock state for notification preferences
  const [promoEmails, setPromoEmails] = React.useState(true);
  const [orderUpdates, setOrderUpdates] = React.useState(true);
  const [newsletter, setNewsletter] = React.useState(false);

  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = React.useState(false);
  const [isDeletingPayment, setIsDeletingPayment] = React.useState<string | null>(null);
  
  const [isEditReviewModalOpen, setIsEditReviewModalOpen] = React.useState(false);
  const [reviewToEdit, setReviewToEdit] = React.useState<UserReview | null>(null);
  const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] = React.useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = React.useState<string | null>(null);

  const [returns, setReturns] = React.useState<UserReturn[]>([]);


  React.useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/');
    }
    if (currentUser) {
        // In a real app, these would be API calls.
        setOrders(getOrdersByEmail(currentUser.email));
        setRecentlyViewed(getRecentlyViewedItems());
        setAddresses(getAddresses());
        setReviews(getReviewsByEmail(currentUser.email));
        setLoginActivity(getLoginActivity());
        setPaymentMethods(getPaymentMethods());
        setReturns(getReturnsForUser(currentUser.email));
    }
  }, [currentUser, loading, router]);
  
  const handleProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        toast({ title: "Invalid File", description: "Please select an image file.", variant: "destructive" });
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        toast({ title: "File Too Large", description: "Please select an image smaller than 2MB.", variant: "destructive" });
        return;
    }
    
    setIsUploading(true);

    try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64data = reader.result as string;
            // In a real app, you'd upload to a storage service and get a URL.
            // Here, we use a data URL for demonstration.
            await updateUserProfile({ photoURL: base64data });
        };
        reader.onerror = () => {
             throw new Error("Failed to read file.");
        }
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      toast({
        variant: 'destructive',
        title: 'Upload Error',
        description: 'Could not upload your profile picture.',
      });
    } finally {
        setIsUploading(false);
        if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleGetRecommendations = async () => {
    if (recentlyViewed.length === 0) {
        toast({
            title: "Not enough data",
            description: "View some products first to get personalized recommendations.",
        });
        return;
    }
    
    setIsRecsLoading(true);
    setRecommendations([]);

    try {
        const history = `User has recently viewed the following products: ${recentlyViewed.map(p => p.name).join(', ')}.`;
        const result = await recommendProducts({
            browsingHistory: history,
            searchQueries: "products similar to browsing history or complementary to them"
        });
        setRecommendations(result.recommendedProducts);
        if (result.recommendedProducts.length === 0) {
            toast({
                title: "No recommendations found",
                description: "We couldn't find specific recommendations based on your history.",
            });
        }
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      toast({
        variant: 'destructive',
        title: 'Recommendation Error',
        description: 'Could not fetch recommendations at this time.',
      });
    } finally {
        setIsRecsLoading(false);
    }
  };
  
  const handleAddressesUpdate = (updatedAddresses: Address[]) => {
    saveAddresses(updatedAddresses);
    setAddresses(updatedAddresses);
    toast({
        title: "Address Book Updated",
        description: "Your address list has been saved."
    });
  };
  
  const handleDeactivateConfirm = () => {
    // In a real app, this would trigger a backend process.
    // For now, we just show a toast and log out.
    setIsDeactivateDialogOpen(false);
    toast({
        title: "Account Deactivation Initiated",
        description: "Your account is scheduled for deactivation. You have been logged out."
    });
    logOut();
  };

  const handlePaymentMethodsUpdate = (updatedMethods: PaymentMethod[]) => {
    savePaymentMethods(updatedMethods);
    setPaymentMethods(updatedMethods);
  };

  const handleAddPaymentMethod = (newMethod: PaymentMethod) => {
    const updatedMethods = [...paymentMethods, newMethod];
    handlePaymentMethodsUpdate(updatedMethods);
    toast({ title: "Payment Method Added", description: "Your new card has been saved." });
  };

  const handleDeletePaymentMethod = (id: string) => {
    setIsDeletingPayment(id);
    // simulate async delete
    setTimeout(() => {
      const updatedMethods = paymentMethods.filter(pm => pm.id !== id);
      handlePaymentMethodsUpdate(updatedMethods);
      setIsDeletingPayment(null);
      toast({ title: "Payment Method Removed", description: "The card has been deleted." });
    }, 500);
  };

  const handleEditReview = (review: UserReview) => {
    setReviewToEdit(review);
    setIsEditReviewModalOpen(true);
  };

  const handleDeleteReviewClick = (reviewId: string) => {
    setReviewIdToDelete(reviewId);
    setIsDeleteReviewDialogOpen(true);
  };

  const onReviewUpdate = (updatedReview: UserReview) => {
    setReviews(prevReviews => 
        prevReviews.map(r => r.id === updatedReview.id ? updatedReview : r)
    );
  };

  const onReviewDeleted = (deletedReviewId: string) => {
    setReviews(prevReviews => prevReviews.filter(r => r.id !== deletedReviewId));
    setReviewIdToDelete(null);
  };


  if (loading || !currentUser) {
    return (
      <div className="bg-background text-foreground">
        <Header />
        <main className="pt-16 md:pt-20">
            <div className="container mx-auto px-2 py-6 sm:px-4 md:py-8 md:px-6 space-y-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-[250px]" />
                                <Skeleton className="h-6 w-[200px]" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Skeleton className="h-10 w-32" />
                            <Skeleton className="h-10 w-40" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-32 w-full" />
                    </CardContent>
                </Card>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const isUserAdmin = isAdmin(currentUser.email);

  return (
    <div className="bg-background text-foreground">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-2 py-6 sm:px-4 md:py-8 md:px-6 space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                            <Avatar className="h-full w-full">
                                <AvatarImage src={currentUser.photoURL || ''} alt={currentUser.displayName || 'User'} />
                                <AvatarFallback className="text-2xl sm:text-3xl">
                                    {getInitials(currentUser.displayName || currentUser.email)}
                                </AvatarFallback>
                            </Avatar>
                            <Button
                                size="icon"
                                variant="outline"
                                className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background group"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                aria-label="Upload profile picture"
                            >
                                {isUploading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Pencil className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                                )}
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleProfilePictureChange}
                                className="hidden"
                                accept="image/png, image/jpeg, image/webp"
                                disabled={isUploading}
                            />
                        </div>
                        <div>
                            <CardTitle className="text-2xl sm:text-3xl font-headline">{currentUser.displayName || 'Welcome!'}</CardTitle>
                            <CardDescription className="text-base sm:text-lg">{currentUser.email}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-4">
                        <Button onClick={logOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                        {isUserAdmin && (
                             <Button asChild variant="outline">
                                <Link href="/admin/dashboard">
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Admin Dashboard
                                </Link>
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-xl font-bold font-headline">Account Dashboard</h2>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <Link href="#order-history" className="block group">
                        <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                            <CardContent className="p-4 flex flex-col items-center text-center">
                                <ShoppingBag className="h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold">My Orders</h3>
                                <p className="text-xs text-muted-foreground">View & track orders</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/wishlist" className="block group">
                        <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                             <CardContent className="p-4 flex flex-col items-center text-center">
                                <Heart className="h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold">Wishlist</h3>
                                <p className="text-xs text-muted-foreground">Your saved items</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <button
                        className="block group text-left w-full"
                        onClick={() => setIsDetailsModalOpen(true)}
                    >
                        <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                            <CardContent className="p-4 flex flex-col items-center text-center">
                                <UserCog className="h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold">Personal Details</h3>
                                <p className="text-xs text-muted-foreground">Update your info</p>
                            </CardContent>
                        </Card>
                    </button>
                    <button
                        className="block group text-left w-full"
                        onClick={() => setIsAddressModalOpen(true)}
                    >
                        <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                            <CardContent className="p-4 flex flex-col items-center text-center">
                                <BookUser className="h-8 w-8 text-primary mb-2" />
                                <h3 className="font-semibold">Address Book</h3>
                                <p className="text-xs text-muted-foreground">Manage addresses</p>
                            </CardContent>
                        </Card>
                    </button>
                </div>
            </div>

            <Card id="order-history">
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>View the status of your recent orders.</CardDescription>
                </CardHeader>
                <CardContent>
                    {orders.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    <TableHead className="w-[50px]"><span className="sr-only">View</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id} className="cursor-pointer" onClick={() => router.push(`/account/orders/${order.id}`)}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{new Date(order.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={order.status === 'Cancelled' ? 'destructive' : 'secondary'}
                                                className={cn('capitalize',
                                                    order.status === 'Fulfilled' && 'bg-green-600 text-primary-foreground hover:bg-green-600/80',
                                                    order.status === 'Pending' && 'bg-yellow-500 text-primary-foreground hover:bg-yellow-500/80'
                                                )}
                                            >
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">UGX {order.total.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-10 rounded-lg bg-secondary/50">
                            <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">No orders yet</h3>
                            <p className="mt-1 text-sm text-muted-foreground">You haven't placed any orders with us. Let's change that!</p>
                            <Button asChild className="mt-4">
                                <Link href="/">Start Shopping</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Recently Viewed</CardTitle>
                    <CardDescription>Items you have recently looked at.</CardDescription>
                </CardHeader>
                <CardContent>
                    {recentlyViewed.length > 0 ? (
                        <div className="product-carousel -mx-2 flex overflow-x-auto pb-4">
                            <div className="flex gap-4 px-2">
                                {recentlyViewed.map((product) => (
                                    <div key={product.id} className="w-36 sm:w-44 flex-shrink-0">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-10 rounded-lg bg-secondary/50">
                            <EyeOff className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">Nothing to see here</h3>
                            <p className="mt-1 text-sm text-muted-foreground">You haven't viewed any items recently.</p>
                            <Button asChild className="mt-4">
                                <Link href="/">Start Browsing</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

             <Card className="bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                            <Wand2 className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <CardTitle>AI Personalized For You</CardTitle>
                            <CardDescription>Get recommendations based on your viewing history.</CardDescription>
                        </div>
                        <Button onClick={handleGetRecommendations} disabled={isRecsLoading} className="w-full sm:w-auto">
                            <Wand2 className="mr-2 h-4 w-4" />
                            {isRecsLoading ? 'Generating...' : 'Get Recommendations'}
                        </Button>
                    </div>
                </CardHeader>
                { (isRecsLoading || recommendations.length > 0) && (
                    <CardContent>
                        {isRecsLoading ? (
                            <div className="space-y-3">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-5 w-1/2" />
                                <Skeleton className="h-5 w-2/3" />
                            </div>
                        ) : (
                             recommendations.length > 0 && (
                                <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                                    {recommendations.map((rec, index) => (
                                        <li key={index}>{rec}</li>
                                    ))}
                                </ul>
                            )
                        )}
                    </CardContent>
                )}
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>My Reviews</CardTitle>
                    <CardDescription>Reviews you have written for products.</CardDescription>
                </CardHeader>
                <CardContent>
                    {reviews.length > 0 ? (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <UserReviewCard 
                                    key={review.id} 
                                    review={review}
                                    onEdit={handleEditReview}
                                    onDelete={handleDeleteReviewClick}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-10 rounded-lg bg-secondary/50">
                            <Pencil className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">No reviews yet</h3>
                            <p className="mt-1 text-sm text-muted-foreground">You haven't reviewed any products yet.</p>
                            <Button asChild className="mt-4">
                                <Link href="#order-history">Review a purchased item</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card id="appearance">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Palette className="h-6 w-6 text-primary" />
                        <CardTitle>Appearance</CardTitle>
                    </div>
                     <CardDescription>Customize the look and feel of the app.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                            <span>Dark Mode</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Switch between light and dark themes.
                            </span>
                        </Label>
                        <Switch 
                            id="dark-mode" 
                            checked={theme === 'dark'} 
                            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
                        />
                    </div>
                </CardContent>
            </Card>
            
            <Card id="login-security">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="h-6 w-6 text-primary" />
                        <CardTitle>Login & Security</CardTitle>
                    </div>
                    <CardDescription>Manage your password, 2FA, and session activity.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-semibold">Password</p>
                            <p className="text-sm text-muted-foreground">Last changed: 3 months ago</p>
                        </div>
                        <Button variant="outline" onClick={() => toast({ title: "Feature not available", description: "Password change will be implemented soon."})}>Change</Button>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="2fa-switch" className="flex flex-col space-y-1">
                            <span>Two-Factor Authentication</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Add an extra layer of security to your account.
                            </span>
                        </Label>
                        <Switch id="2fa-switch" disabled />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Recent Login Activity</h3>
                        <div className="space-y-4">
                            {loginActivity.map(activity => (
                                <div key={activity.id} className="flex items-center justify-between rounded-lg border p-3">
                                    <div className="flex items-center gap-4">
                                        {activity.deviceType === 'desktop' ? <Monitor className="h-6 w-6 text-muted-foreground" /> : <Smartphone className="h-6 w-6 text-muted-foreground" />}
                                        <div>
                                            <p className="font-semibold text-sm">{activity.device} {activity.isCurrent && <Badge variant="secondary" className="ml-2">Current</Badge>}</p>
                                            <p className="text-xs text-muted-foreground">{activity.location} &middot; IP: {activity.ipAddress}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-semibold">Sign Out Everywhere</p>
                            <p className="text-sm text-muted-foreground">Log out from all other active sessions.</p>
                        </div>
                        <Button variant="outline" onClick={() => toast({ title: "Feature not available", description: "This will be implemented soon."})}>Sign Out</Button>
                    </div>
                </CardContent>
            </Card>

            <Card id="payment-methods">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <CreditCard className="h-6 w-6 text-primary" />
                            <CardTitle>Payment Methods</CardTitle>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setIsPaymentModalOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Card
                        </Button>
                    </div>
                     <CardDescription>Manage your saved payment methods.</CardDescription>
                </CardHeader>
                <CardContent>
                    {paymentMethods.length > 0 ? (
                        <div className="space-y-4">
                            {paymentMethods.map((pm) => (
                                <div key={pm.id} className="flex items-center justify-between rounded-lg border p-3">
                                    <div className="flex items-center gap-4">
                                        {pm.cardType === 'visa' && <VisaIcon />}
                                        {pm.cardType === 'mastercard' && <MastercardIcon />}
                                        {pm.cardType !== 'visa' && pm.cardType !== 'mastercard' && <CreditCard className="h-8 w-8 text-muted-foreground" />}
                                        <div>
                                            <p className="font-semibold text-sm">{pm.cardholderName}</p>
                                            <p className="text-xs text-muted-foreground">
                                                **** **** **** {pm.cardNumber.slice(-4)}
                                                <span className="ml-4">Expires {pm.expiryDate}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-destructive hover:text-destructive"
                                        onClick={() => handleDeletePaymentMethod(pm.id)}
                                        disabled={isDeletingPayment === pm.id}
                                    >
                                        {isDeletingPayment === pm.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center py-10 rounded-lg bg-secondary/50">
                            <p className="text-sm text-muted-foreground mb-4">You have no saved payment methods.</p>
                            <Button onClick={() => setIsPaymentModalOpen(true)}>Add New Card</Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Undo2 className="h-6 w-6 text-primary" />
                        <CardTitle>Returns & Refunds</CardTitle>
                    </div>
                     <CardDescription>Manage your returns and track refund status.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold">Recent Returns</h3>
                         {returns.length > 0 ? (
                            <div className="space-y-2">
                                {returns.map((ret) => (
                                    <div key={ret.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div>
                                            <p className="font-medium text-sm">Order #{ret.orderId}</p>
                                            <p className="text-xs text-muted-foreground">
                                                Status: <Badge
                                                    variant={ret.status === 'Rejected' ? 'destructive' : 'secondary'}
                                                    className={cn('capitalize',
                                                        ret.status === 'Refunded' && 'bg-green-600 text-primary-foreground hover:bg-green-600/80',
                                                        ret.status === 'Processing' && 'bg-yellow-500 text-primary-foreground hover:bg-yellow-500/80',
                                                        ret.status === 'Approved' && 'bg-blue-500 text-primary-foreground hover:bg-blue-500/80'
                                                    )}
                                                >
                                                    {ret.status}
                                                </Badge>
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => toast({ title: "Coming Soon!", description: "This feature will be available soon."})}>
                                            View Details
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <div className="flex flex-col items-center justify-center text-center py-6 rounded-lg bg-secondary/50">
                                <p className="text-sm text-muted-foreground">You have no returns or refund requests.</p>
                            </div>
                        )}
                    </div>
                     <div className="flex flex-col items-start gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="font-semibold">Need to return an item?</h3>
                            <p className="text-sm text-muted-foreground">
                                Check our return policy before you proceed.
                            </p>
                        </div>
                        <Button variant="outline" onClick={() => toast({title: "Coming soon!"})}>View Policy</Button>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Gift className="h-6 w-6 text-primary" />
                        <CardTitle>Refer & Earn</CardTitle>
                    </div>
                        <CardDescription>Share YUNI with friends and earn rewards.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border bg-secondary/50 p-4">
                        <p className="font-mono text-lg text-muted-foreground">YUNI-REF-{currentUser.uid.slice(0, 8).toUpperCase()}</p>
                        <Button variant="outline" onClick={() => {
                            navigator.clipboard.writeText(`YUNI-REF-${currentUser.uid.slice(0, 8).toUpperCase()}`);
                            toast({ title: "Copied!", description: "Referral code copied to clipboard." });
                        }}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Code
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Your friends get 10% off their first order, and you get UGX 10,000 in credits for each successful referral.
                    </p>
                </CardContent>
            </Card>

            <Card id="notification-preferences">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Bell className="h-6 w-6 text-primary" />
                        <CardTitle>Notification Preferences</CardTitle>
                    </div>
                     <CardDescription>Manage how we communicate with you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="promo-emails" className="flex flex-col space-y-1">
                            <span>Promotional Emails</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Receive discounts, offers, and new product announcements.
                            </span>
                        </Label>
                        <Switch id="promo-emails" checked={promoEmails} onCheckedChange={setPromoEmails} />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="order-updates" className="flex flex-col space-y-1">
                            <span>Order Updates</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Get notified about your order status, shipping, and delivery.
                            </span>
                        </Label>
                        <Switch id="order-updates" checked={orderUpdates} onCheckedChange={setOrderUpdates} />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="newsletter" className="flex flex-col space-y-1">
                            <span>YUNI Newsletter</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Subscribe to our weekly newsletter for tips and trends.
                            </span>
                        </Label>
                        <Switch id="newsletter" checked={newsletter} onCheckedChange={setNewsletter} />
                    </div>
                </CardContent>
            </Card>

            <Card className="border-destructive/50" id="danger-zone">
                <CardHeader>
                    <div className="flex items-center gap-3">
                         <AlertTriangle className="h-6 w-6 text-destructive" />
                         <CardTitle className="text-destructive">Danger Zone</CardTitle>
                    </div>
                    <CardDescription>Manage sensitive account actions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-start gap-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="font-semibold">Deactivate Account</h3>
                            <p className="text-sm text-muted-foreground">
                                This will permanently delete your account and all associated data. This action cannot be undone.
                            </p>
                        </div>
                        <Button variant="destructive" onClick={() => setIsDeactivateDialogOpen(true)}>
                            Deactivate
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
       {currentUser && (
        <PersonalDetailsModal
            isOpen={isDetailsModalOpen}
            onOpenChange={setIsDetailsModalOpen}
            user={currentUser}
            onSave={updateUserProfile}
        />
      )}
       <AddressBookModal
          isOpen={isAddressModalOpen}
          onOpenChange={setIsAddressModalOpen}
          addresses={addresses}
          onAddressesUpdate={handleAddressesUpdate}
       />
        <DeactivateAccountDialog
            isOpen={isDeactivateDialogOpen}
            onOpenChange={setIsDeactivateDialogOpen}
            onConfirm={handleDeactivateConfirm}
        />
        <AddPaymentMethodModal 
            isOpen={isPaymentModalOpen}
            onOpenChange={setIsPaymentModalOpen}
            onSave={handleAddPaymentMethod}
        />
        <EditReviewModal
            isOpen={isEditReviewModalOpen}
            onOpenChange={setIsEditReviewModalOpen}
            review={reviewToEdit}
            onReviewUpdate={onReviewUpdate}
        />
        <DeleteReviewDialog
            isOpen={isDeleteReviewDialogOpen}
            onOpenChange={setIsDeleteReviewDialogOpen}
            reviewId={reviewIdToDelete}
            onReviewDeleted={onReviewDeleted}
        />
    </div>
  );
}
