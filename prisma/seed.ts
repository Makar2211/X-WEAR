import { PrismaClient } from "@prisma/client";
import {
  Brand,
  Category,
  CategoryProduct,
  Colors,
  productOnColor,
  productOnSize,
  productsData,
  Size,
} from "./constants";
const prisma = new PrismaClient();
async function up() {
  await prisma.category.createMany({
    data: Category,
  });

  await prisma.categoryProduct.createMany({
    data: CategoryProduct,
  });

  await prisma.color.createMany({
    data: Colors,
  });

  await prisma.size.createMany({
    data: Size,
  }),
    await prisma.brand.createMany({
      data: Brand,
    });

  await prisma.product.createMany({
    data: productsData,
  });

  await prisma.productOnColor.createMany({
    data: productOnColor,
  });
  await prisma.productOnSize.createMany({
    data: productOnSize,
  });

  await prisma.user.create({
    data: {
      email: "0k5dA@example.com",
      password: "121123",
      emailVerified: false,
    },
  });

  await prisma.adress.create({
    data: {
      userId: 1,
      neighborhoods: "neighborhoods",
      index: "index",
      apartment: "apartment",
      name_of_company: "name_of_company",
      street: "street",
      city: "city",
      country: "country",
    },
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Brand" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Color" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductOnColor" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductOnSize" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Size" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CategoryProduct" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Adress" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
}
async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
