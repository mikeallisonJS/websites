ALTER TYPE "BlockType" ADD VALUE 'Youtube';--> statement-breakpoint
ALTER TYPE "BlockType" ADD VALUE 'List';--> statement-breakpoint
ALTER TYPE "BlockType" ADD VALUE 'Image';--> statement-breakpoint
ALTER TYPE "BlockType" ADD VALUE 'Soundcloud';--> statement-breakpoint
DROP TABLE "_prisma_migrations";--> statement-breakpoint
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";
--> statement-breakpoint
ALTER TABLE "Download" DROP CONSTRAINT "Download_productId_fkey";
--> statement-breakpoint
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_A_fkey";
--> statement-breakpoint
ALTER TABLE "_OrderToProduct" DROP CONSTRAINT "_OrderToProduct_B_fkey";
--> statement-breakpoint
ALTER TABLE "Link" DROP CONSTRAINT "Link_categoryId_fkey";
--> statement-breakpoint
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";
--> statement-breakpoint
ALTER TABLE "Block" DROP CONSTRAINT "Block_productId_fkey";
--> statement-breakpoint
ALTER TABLE "Order" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "Product" ALTER COLUMN "price" SET DEFAULT '0';--> statement-breakpoint
ALTER TABLE "Product" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "Block" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "Product" ADD COLUMN "testStripeId" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Download" ADD CONSTRAINT "Download_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_A_Order_id_fk" FOREIGN KEY ("A") REFERENCES "public"."Order"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_B_Product_id_fk" FOREIGN KEY ("B") REFERENCES "public"."Product"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Link" ADD CONSTRAINT "Link_categoryId_Category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_Category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Block" ADD CONSTRAINT "Block_productId_Product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
