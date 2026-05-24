import { Router, type IRouter } from "express";
import { db, productsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  GetProductsResponseItem,
  AdminGetProductsResponseItem,
  AdminCreateProductBody,
  AdminUpdateProductBody,
  AdminUpdateProductResponse,
} from "@workspace/api-zod";
import { requireAuth } from "../../lib/auth";

const router: IRouter = Router();

// GET /products — list all active products (public)
router.get("/products", async (_req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.active, true))
    .orderBy(productsTable.createdAt);
  
  // Need to handle price being number in DB but string in OpenAPI spec
  const formattedProducts = products.map(p => ({
    ...p,
    id: p.id.toString(),
    price: p.price.toString(),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));
  
  res.json(formattedProducts.map(p => GetProductsResponseItem.parse(p)));
});

// GET /admin/products — list all products including inactive (auth required)
router.get("/admin/products", requireAuth, async (_req, res): Promise<void> => {
  const products = await db
    .select()
    .from(productsTable)
    .orderBy(productsTable.createdAt);

  const formattedProducts = products.map(p => ({
    ...p,
    id: p.id.toString(),
    price: p.price.toString(),
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  res.json(formattedProducts.map(p => AdminGetProductsResponseItem.parse(p)));
});

// POST /admin/products — create product (auth required)
router.post("/admin/products", requireAuth, async (req, res): Promise<void> => {
  const parsed = AdminCreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [product] = await db.insert(productsTable).values({
    ...parsed.data,
    price: parseFloat(parsed.data.price),
  }).returning();

  const formattedProduct = {
    ...product,
    id: product.id.toString(),
    price: product.price.toString(),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  res.status(201).json(AdminUpdateProductResponse.parse(formattedProduct));
});

// PATCH /admin/products/{id} — update product (auth required)
router.patch("/admin/products/:id", requireAuth, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const parsed = AdminUpdateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const updateData: any = { ...parsed.data };
  if (parsed.data.price !== undefined) {
    updateData.price = parseFloat(parsed.data.price);
  }

  const [product] = await db
    .update(productsTable)
    .set(updateData)
    .where(eq(productsTable.id, id))
    .returning();

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const formattedProduct = {
    ...product,
    id: product.id.toString(),
    price: product.price.toString(),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  res.json(AdminUpdateProductResponse.parse(formattedProduct));
});

// DELETE /admin/products/{id} — delete product (auth required)
router.delete("/admin/products/:id", requireAuth, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [product] = await db
    .delete(productsTable)
    .where(eq(productsTable.id, id))
    .returning();

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
