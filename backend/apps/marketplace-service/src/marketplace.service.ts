import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@frequenc/shared';

@Injectable()
export class MarketplaceService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(filters?: any) {
    const where: any = {};

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.priceMin) {
      where.price = {
        gte: filters.priceMin,
      };
    }

    if (filters?.priceMax) {
      where.price = {
        ...where.price,
        lte: filters.priceMax,
      };
    }

    const products = await this.prisma.product.findMany({
      where,
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                profile: true,
              },
            },
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }

  async getProduct(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                profile: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async createOrder(userId: string, orderData: any) {
    const { products, shippingAddress, paymentMethod } = orderData;

    // Calculate total
    const total = products.reduce((sum: number, product: any) => {
      return sum + product.price * product.quantity;
    }, 0);

    // Create order
    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        status: 'PENDING',
        shippingAddress,
        paymentMethod,
        items: {
          create: products.map((product: any) => ({
            productId: product.id,
            quantity: product.quantity,
            price: product.price,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  }

  async getUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  }

  async searchProducts(query: string, filters?: any) {
    const where: any = {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } },
      ],
    };

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.priceMin) {
      where.price = {
        gte: filters.priceMin,
      };
    }

    if (filters?.priceMax) {
      where.price = {
        ...where.price,
        lte: filters.priceMax,
      };
    }

    const products = await this.prisma.product.findMany({
      where,
      include: {
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                profile: true,
              },
            },
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      take: 20,
    });

    return products;
  }

  async getCategories() {
    const categories = await this.prisma.product.findMany({
      distinct: ['category'],
      select: { category: true },
      where: { isActive: true },
    });
    return categories.map((c) => c.category).filter(Boolean);
  }

  async getOrderDetails(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
      include: {
        items: { include: { product: true } },
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async cancelOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (order.status !== 'PENDING') {
      throw new Error('Only pending orders can be cancelled');
    }
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });
  }

  async createProduct(userId: string, productData: any) {
    // In real app, check permissions (vendor/admin). Here we allow creation.
    const product = await this.prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        stock: productData.stock ?? 0,
        images: productData.images ?? [],
        isActive: true,
      },
    });
    return product;
  }

  async updateProduct(userId: string, productId: string, update: any) {
    const existing = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existing) {
      throw new NotFoundException('Product not found');
    }
    const product = await this.prisma.product.update({
      where: { id: productId },
      data: {
        name: update.name ?? existing.name,
        description: update.description ?? existing.description,
        price: update.price ?? existing.price,
        category: update.category ?? existing.category,
        stock: update.stock ?? existing.stock,
        images: update.images ?? existing.images,
        isActive: update.isActive ?? existing.isActive,
      },
    });
    return product;
  }

  async deleteProduct(userId: string, productId: string) {
    const existing = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existing) {
      throw new NotFoundException('Product not found');
    }
    await this.prisma.orderItem.deleteMany({ where: { productId } });
    await this.prisma.product.delete({ where: { id: productId } });
    return { success: true };
  }
}
