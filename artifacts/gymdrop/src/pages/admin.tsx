import React, { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import {
  useAdminGetProducts,
  useAdminCreateProduct,
  useAdminUpdateProduct,
  useAdminDeleteProduct,
  getAdminGetProductsQueryKey,
  getGetProductsQueryKey,
} from "@workspace/api-client-react";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

import { LogOut, Plus, Pencil, Trash2, Home } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  badge: z.string().nullable().optional(),
  rating: z.coerce.number().min(0).max(5),
  reviewCount: z.coerce.number().min(0),
  category: z.enum(["trending", "gadgets", "gear"]),
  imageUrl: z.string().min(1, "Image URL is required"),
  active: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function AdminPage() {
  const [authState, setAuthState] = useState<{ checked: boolean; authenticated: boolean; username: string }>({
    checked: false,
    authenticated: false,
    username: "",
  });

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setAuthState({ checked: true, authenticated: !!data.authenticated, username: data.username || "" });
      })
      .catch(() => setAuthState({ checked: true, authenticated: false, username: "" }));
  }, []);

  if (!authState.checked) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Skeleton className="w-12 h-12 rounded-full" />
      </div>
    );
  }

  if (!authState.authenticated) {
    return <AdminLogin onLogin={(username) => setAuthState({ checked: true, authenticated: true, username })} />;
  }

  return <AdminDashboard username={authState.username || "Admin"} onLogout={() => setAuthState({ checked: true, authenticated: false, username: "" })} />;
}

function AdminLogin({ onLogin }: { onLogin: (username: string) => void }) {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsPending(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        setErrorMsg("Nieprawidłowy login lub hasło");
        return;
      }
      const data = await res.json();
      toast({ title: "Zalogowano", description: "Witaj w panelu admina." });
      onLogin(data.username || "Admin");
    } catch {
      setErrorMsg("Błąd połączenia z serwerem");
    } finally {
      setIsPending(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="font-display font-bold text-2xl tracking-widest uppercase text-white">
          Gym<span className="text-[#dc2626]">Drop</span>
        </span>
      </Link>
      
      <div className="w-full max-w-md bg-[#111] border border-white/10 rounded-xl p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl uppercase tracking-widest text-white mb-2">Admin Panel</h1>
          <p className="text-white/50 text-sm">Enter your credentials to access the dashboard</p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Username</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" placeholder="admin" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white/80">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="bg-white/5 border-white/10 text-white placeholder:text-white/30" placeholder="••••••••" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {errorMsg && (
              <p className="text-[#dc2626] text-sm text-center">{errorMsg}</p>
            )}
            <Button 
              type="submit" 
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold"
              disabled={isPending}
            >
              {isPending ? "Logowanie..." : "Login to Dashboard"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function AdminDashboard({ username, onLogout }: { username: string; onLogout: () => void }) {
  const { toast } = useToast();
  
  const { data: products = [], isLoading: productsLoading } = useAdminGetProducts();
  
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch {}
    toast({ title: "Wylogowano", description: "Do zobaczenia!" });
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <header className="h-16 border-b border-white/10 bg-[#0a0a0a] sticky top-0 z-10">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-display font-bold text-xl tracking-widest uppercase">
              Gym<span className="text-[#dc2626]">Drop</span> <span className="text-white/30 text-sm ml-2">Admin</span>
            </span>
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/5">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">Logged in as <span className="text-white">{username}</span></span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-white/10 hover:bg-white/5">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl uppercase tracking-wider">Products</h2>
          <ProductFormDialog mode="create" />
        </div>

        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#111]">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/60">Product</TableHead>
                <TableHead className="text-white/60">Category</TableHead>
                <TableHead className="text-white/60">Price</TableHead>
                <TableHead className="text-white/60">Stats</TableHead>
                <TableHead className="text-white/60">Status</TableHead>
                <TableHead className="text-right text-white/60">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-white/10">
                    <TableCell><Skeleton className="h-6 w-32 bg-white/10" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 bg-white/10" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 bg-white/10" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 bg-white/10" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-12 bg-white/10" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-16 ml-auto bg-white/10" /></TableCell>
                  </TableRow>
                ))
              ) : products.length === 0 ? (
                <TableRow className="border-white/10">
                  <TableCell colSpan={6} className="text-center py-12 text-white/50">
                    No products found. Add your first product.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-white/5 overflow-hidden flex-shrink-0">
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-white/50 truncate max-w-[200px]">{product.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-white/20 capitalize bg-transparent text-white/80">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-white/90">{product.price}</TableCell>
                    <TableCell>
                      <div className="text-sm text-white/70">
                        <span className="text-yellow-500">★</span> {product.rating} <span className="text-white/30">({product.reviewCount})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusToggle product={product} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <ProductFormDialog mode="edit" product={product} />
                        <DeleteProductDialog product={product} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}

function StatusToggle({ product }: { product: any }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const updateProduct = useAdminUpdateProduct();
  
  const handleToggle = (checked: boolean) => {
    updateProduct.mutate({ id: product.id, data: { active: checked } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminGetProductsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetProductsQueryKey() });
        toast({
          title: "Status updated",
          description: `${product.name} is now ${checked ? 'active' : 'inactive'}.`,
        });
      }
    });
  };
  
  return (
    <Switch 
      checked={product.active} 
      onCheckedChange={handleToggle}
      disabled={updateProduct.isPending}
      className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-white/20"
    />
  );
}

function ProductFormDialog({ mode, product }: { mode: 'create' | 'edit', product?: any }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const createProduct = useAdminCreateProduct();
  const updateProduct = useAdminUpdateProduct();
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product ? {
      name: product.name,
      description: product.description,
      price: product.price,
      badge: product.badge || "",
      rating: product.rating,
      reviewCount: product.reviewCount,
      category: product.category,
      imageUrl: product.imageUrl,
      active: product.active,
    } : {
      name: "",
      description: "",
      price: "$0.00",
      badge: "",
      rating: 5,
      reviewCount: 0,
      category: "gear",
      imageUrl: "",
      active: true,
    },
  });

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      form.reset(product ? {
        name: product.name,
        description: product.description,
        price: product.price,
        badge: product.badge || "",
        rating: product.rating,
        reviewCount: product.reviewCount,
        category: product.category,
        imageUrl: product.imageUrl,
        active: product.active,
      } : {
        name: "",
        description: "",
        price: "$0.00",
        badge: "",
        rating: 5,
        reviewCount: 0,
        category: "gear",
        imageUrl: "",
        active: true,
      });
    }
  }, [open, product, form]);

  const onSubmit = (values: ProductFormValues) => {
    if (mode === 'create') {
      createProduct.mutate({ data: {
        ...values,
        badge: values.badge || null,
      } }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getAdminGetProductsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetProductsQueryKey() });
          toast({ title: "Product created", description: `${values.name} has been added.` });
          setOpen(false);
        }
      });
    } else if (product) {
      updateProduct.mutate({ id: product.id, data: {
        ...values,
        badge: values.badge || null,
      } }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getAdminGetProductsQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetProductsQueryKey() });
          toast({ title: "Product updated", description: `${values.name} has been updated.` });
          setOpen(false);
        }
      });
    }
  };

  const isPending = createProduct.isPending || updateProduct.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'create' ? (
          <Button className="bg-white text-black hover:bg-white/90">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
            <Pencil className="w-4 h-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-[#111] border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display uppercase tracking-widest text-xl">
            {mode === 'create' ? 'Add New Product' : 'Edit Product'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-white/10 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#111] border-white/10 text-white">
                        <SelectItem value="trending">Trending</SelectItem>
                        <SelectItem value="gadgets">Gadgets</SelectItem>
                        <SelectItem value="gear">Gear</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-white/5 border-white/10 text-white resize-none" rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (e.g. $49.99)</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white/5 border-white/10 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="badge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Badge (optional, e.g. "NEW", "SALE")</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} className="bg-white/5 border-white/10 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white/5 border-white/10 text-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating (0-5)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} className="bg-white/5 border-white/10 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reviewCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Count</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="bg-white/5 border-white/10 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <div className="text-sm text-white/50">
                      Product will {field.value ? 'be visible' : 'not be visible'} on the storefront
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-white/20"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="text-white hover:bg-white/10">
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="bg-white text-black hover:bg-white/90">
                {isPending ? "Saving..." : "Save Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteProductDialog({ product }: { product: any }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deleteProduct = useAdminDeleteProduct();
  
  const handleDelete = () => {
    deleteProduct.mutate({ id: product.id }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getAdminGetProductsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetProductsQueryKey() });
        toast({ title: "Product deleted", description: `${product.name} has been removed.` });
        setOpen(false);
      }
    });
  };
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-red-500 hover:bg-red-500/10">
          <Trash2 className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#111] border-white/10 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {product.name}?</AlertDialogTitle>
          <AlertDialogDescription className="text-white/60">
            This action cannot be undone. This will permanently delete the product from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete} 
            disabled={deleteProduct.isPending}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {deleteProduct.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
