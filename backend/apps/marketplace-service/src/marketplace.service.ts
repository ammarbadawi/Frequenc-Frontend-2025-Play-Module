import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../libs/shared/src/prisma/prisma.service';

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
        gte: filters.priceMin
      };
    }

    if (filters?.priceMax) {
      where.price = {
        ...where.price,
        lte: filters.priceMax
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
                profile: true
              }
            }
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
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
                profile: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      }
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
      return sum + (product.price * product.quantity);
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
            price: product.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return order;
  }

  async getUserOrders(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return orders;
  }

  async searchProducts(query: string, filters?: any) {
    const where: any = {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { category: { contains: query, mode: 'insensitive' } }
      ]
    };

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.priceMin) {
      where.price = {
        gte: filters.priceMin
      };
    }

    if (filters?.priceMax) {
      where.price = {
        ...where.price,
        lte: filters.priceMax
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
                profile: true
              }
            }
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      take: 20
    });

    return products;
  }
} 