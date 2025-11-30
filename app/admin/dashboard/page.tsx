"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Pencil, Trash2, LogOut, Package } from "lucide-react"
import { toast } from "sonner"
import type { Product } from "@/src/lib/types"

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    description: "",
    features: "",
    categories: "",
    mainImage: "",
    inStock: true,
    isFeatured: false,
    isOnSale: false,
  })

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem("admin_authenticated")
    if (!isAuthenticated) {
      router.push("/admin")
      return
    }

    fetchProducts()
  }, [router])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/products?limit=100")
      const data = await res.json()
      if (data.success) {
        setProducts(data.data?.items || [])
      }
    } catch (error) {
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    router.push("/admin")
  }

  const openAddDialog = () => {
    setEditingProduct(null)
    setImagePreview(null)
    setFormData({
      title: "",
      price: "",
      originalPrice: "",
      description: "",
      features: "",
      categories: "",
      mainImage: "",
      inStock: true,
      isFeatured: false,
      isOnSale: false,
    })
    setIsDialogOpen(true)
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setImagePreview(product.mainImage || null)
    setFormData({
      title: product.title,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      description: product.description,
      features: product.features.join(", "),
      categories: product.categories.join(", "),
      mainImage: product.mainImage,
      inStock: product.inStock,
      isFeatured: product.isFeatured || false,
      isOnSale: product.isOnSale || false,
    })
    setIsDialogOpen(true)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }

    try {
      setUploading(true)
      
      // Show preview immediately
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Cloudinary
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      if (data.success) {
        setFormData((prev) => ({ ...prev, mainImage: data.data.url }))
        toast.success("Image uploaded successfully")
      } else {
        toast.error(data.error || "Failed to upload image")
        setImagePreview(null)
      }
    } catch (error) {
      toast.error("Failed to upload image")
      setImagePreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
      categories: formData.categories.split(",").map((c) => c.trim()).filter(Boolean),
    }

    try {
      if (editingProduct) {
        // Update existing product
        const res = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: editingProduct._id, ...productData }),
        })
        const data = await res.json()
        if (data.success) {
          toast.success("Product updated successfully")
          fetchProducts()
          setIsDialogOpen(false)
        } else {
          toast.error(data.error || "Failed to update product")
        }
      } else {
        // Create new product
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        })
        const data = await res.json()
        if (data.success) {
          toast.success("Product created successfully")
          fetchProducts()
          setIsDialogOpen(false)
        } else {
          toast.error(data.error || "Failed to create product")
        }
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return
    }

    try {
      const res = await fetch(`/api/products?id=${productId}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success) {
        toast.success("Product deleted successfully")
        fetchProducts()
      } else {
        toast.error(data.error || "Failed to delete product")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Products Management</CardTitle>
                <CardDescription>Add, edit, or delete products</CardDescription>
              </div>
              <Button onClick={openAddDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8">Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">No products found</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">{product.title}</TableCell>
                        <TableCell>₨ {product.price.toLocaleString()}</TableCell>
                        <TableCell>{product.categories.join(", ")}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              product.inStock
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </TableCell>
                        <TableCell>{product.isFeatured ? "Yes" : "No"}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="icon-sm"
                            variant="outline"
                            onClick={() => openEditDialog(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="destructive"
                            onClick={() => handleDelete(product._id!)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update product details" : "Fill in the product information"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g., Premium Leather Laptop Bag"
                />
                <p className="text-xs text-muted-foreground">
                  A unique URL will be automatically generated from this title
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₨) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Original Price (₨)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma separated)</Label>
                <Input
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categories">Categories (comma separated)</Label>
                <Input
                  id="categories"
                  value={formData.categories}
                  onChange={(e) => setFormData({ ...formData, categories: e.target.value })}
                  placeholder="trolley-bags, laptop-bags"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainImage">Product Image *</Label>
                <div className="space-y-2">
                  <Input
                    id="mainImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 800x800px, Max size: 5MB (JPG, PNG, WebP)
                  </p>
                  {uploading && (
                    <p className="text-sm text-blue-600">Uploading image...</p>
                  )}
                  {imagePreview && (
                    <div className="mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, inStock: checked as boolean })
                      }
                      className="mt-1"
                    />
                    <div className="space-y-0.5">
                      <Label htmlFor="inStock" className="cursor-pointer">
                        In Stock
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Product available hai? (✓ = Available, ✗ = Out of Stock)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isFeatured: checked as boolean })
                      }
                      className="mt-1"
                    />
                    <div className="space-y-0.5">
                      <Label htmlFor="isFeatured" className="cursor-pointer">
                        Featured Product
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Homepage pe "Featured Products" section mein show hoga
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="isOnSale"
                      checked={formData.isOnSale}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isOnSale: checked as boolean })
                      }
                      className="mt-1"
                    />
                    <div className="space-y-0.5">
                      <Label htmlFor="isOnSale" className="cursor-pointer">
                        On Sale (Discount)
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Sale badge show hoga. Original Price strikethrough dikhayi dega
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">{editingProduct ? "Update" : "Create"} Product</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
