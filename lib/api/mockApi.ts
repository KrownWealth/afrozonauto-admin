import {
  mockUsers,
  mockCars,
  mockOrders,
  mockPayments,
  mockActivities,
} from "@/lib/mock/data";
import {
  User,
  Car,
  Order,
  Payment,
  DashboardStats,
  Activity,
  CarCondition,
  CarSource,
} from "@/types";

// Simulated API delay to mimic real network requests
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// DASHBOARD API
// ============================================
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    await delay(600);
    // Recalculate stats based on current data
    const stats: DashboardStats = {
      totalUsers: mockUsers.length,
      totalCars: mockCars.length,
      totalOrders: mockOrders.length,
      totalRevenue: mockOrders
        .filter((order) => order.status === "paid")
        .reduce((sum, order) => sum + order.amount, 0),
      pendingOrders: mockOrders.filter((order) => order.status === "pending")
        .length,
      apiCars: mockCars.filter((car) => car.source === "api").length,
      manualCars: mockCars.filter((car) => car.source === "manual").length,
    };
    return stats;
  },

  getRecentActivities: async (): Promise<Activity[]> => {
    await delay(400);
    // Return latest 10 activities sorted by timestamp
    return mockActivities
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 10);
  },
};

// ============================================
// USERS API
// ============================================
export const usersApi = {
  getAll: async (): Promise<User[]> => {
    await delay(500);
    return [...mockUsers].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getById: async (id: string): Promise<User | undefined> => {
    await delay(300);
    return mockUsers.find((u) => u.id === id);
  },

  toggleStatus: async (id: string): Promise<User> => {
    await delay(400);
    const user = mockUsers.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    user.status = user.status === "active" ? "inactive" : "active";
    return user;
  },

  create: async (data: Omit<User, "id" | "createdAt">): Promise<User> => {
    await delay(600);
    const newUser: User = {
      ...data,
      id: `user-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return newUser;
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    await delay(500);
    const index = mockUsers.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found");

    mockUsers[index] = {
      ...mockUsers[index],
      ...data,
    };
    return mockUsers[index];
  },
};

// ============================================
// CARS API
// ============================================

export const carsApi = {
  getAll: async (): Promise<Car[]> => {
    await delay(600);
    return [...mockCars].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getById: async (id: string): Promise<Car | undefined> => {
    await delay(300);
    return mockCars.find((c) => c.id === id);
  },

  create: async (data: FormData): Promise<Car> => {
    await delay(700);

    const sourceValue = data.get("source") as string | null;

    // Extract fields from FormData
    const make = data.get("make") as string;
    const model = data.get("model") as string;
    const year = Number(data.get("year"));
    const price = Number(data.get("price"));
    const mileage = Number(data.get("mileage"));
    const location = data.get("location") as string;
    const country = data.get("country") as string;
    const description = data.get("description") as string;
    const condition = data.get("condition") as CarCondition;
    const featured = data.get("featured") === "true";
    const available = data.get("available") === "true";
    const source: CarSource = sourceValue === "api" ? "api" : "manual";

    // Handle file (mock URL)
    const imageFile = data.get("images") as File | null;
    const images = imageFile ? [URL.createObjectURL(imageFile)] : [];

    const newCar: Car = {
      id: `car-${Date.now()}`,
      make,
      model,
      year,
      price,
      mileage,
      location,
      country,
      description,
      condition,
      featured,
      available,
      images,
      source,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockCars.push(newCar);

    // Add activity
    mockActivities.unshift({
      id: `act-${Date.now()}`,
      type: "car",
      description: `New car added: ${make} ${model}`,
      timestamp: new Date().toISOString(),
    });

    return newCar;
  },

  update: async (id: string, data: Partial<Car>): Promise<Car> => {
    await delay(600);
    const index = mockCars.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Car not found");

    mockCars[index] = {
      ...mockCars[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockCars[index];
  },

  toggleFeatured: async (id: string): Promise<Car> => {
    await delay(400);
    const car = mockCars.find((c) => c.id === id);
    if (!car) throw new Error("Car not found");
    car.featured = !car.featured;
    car.updatedAt = new Date().toISOString();
    return car;
  },

  toggleAvailability: async (id: string): Promise<Car> => {
    await delay(400);
    const car = mockCars.find((c) => c.id === id);
    if (!car) throw new Error("Car not found");
    car.available = !car.available;
    car.updatedAt = new Date().toISOString();
    return car;
  },

  delete: async (id: string): Promise<void> => {
    await delay(500);
    const index = mockCars.findIndex((c) => c.id === id);
    if (index === -1) throw new Error("Car not found");
    mockCars.splice(index, 1);
  },
};

// ============================================
// ORDERS API
// ============================================
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    await delay(600);
    return [...mockOrders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getById: async (id: string): Promise<Order | undefined> => {
    await delay(300);
    return mockOrders.find((o) => o.id === id);
  },

  updateStatus: async (id: string, status: Order["status"]): Promise<Order> => {
    await delay(500);
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");
    order.status = status;
    order.updatedAt = new Date().toISOString();

    // Add activity
    mockActivities.unshift({
      id: `act-${Date.now()}`,
      type: "order",
      description: `Order ${status} for ${order.carDetails.make} ${order.carDetails.model}`,
      timestamp: new Date().toISOString(),
      userId: order.userId,
      userName: order.userName,
    });

    return order;
  },

  addNote: async (id: string, note: string): Promise<Order> => {
    await delay(400);
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");
    order.notes = note;
    order.updatedAt = new Date().toISOString();
    return order;
  },

  cancel: async (id: string): Promise<Order> => {
    await delay(600);
    const order = mockOrders.find((o) => o.id === id);
    if (!order) throw new Error("Order not found");
    order.status = "cancelled";
    order.paymentStatus = "refunded";
    order.updatedAt = new Date().toISOString();

    // Update related payment
    const payment = mockPayments.find((p) => p.orderId === id);
    if (payment) {
      payment.status = "refunded";
      payment.refundAmount = payment.amount;
      payment.refundedAt = new Date().toISOString();
    }

    // Add activity
    mockActivities.unshift({
      id: `act-${Date.now()}`,
      type: "order",
      description: `Order cancelled for ${order.carDetails.make} ${order.carDetails.model}`,
      timestamp: new Date().toISOString(),
      userId: order.userId,
      userName: order.userName,
    });

    return order;
  },

  create: async (
    data: Omit<Order, "id" | "createdAt" | "updatedAt">
  ): Promise<Order> => {
    await delay(700);
    const newOrder: Order = {
      ...data,
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockOrders.push(newOrder);

    // Add activity
    mockActivities.unshift({
      id: `act-${Date.now()}`,
      type: "order",
      description: `New order placed for ${data.carDetails.make} ${data.carDetails.model}`,
      timestamp: new Date().toISOString(),
      userId: data.userId,
      userName: data.userName,
    });

    return newOrder;
  },
};

// ============================================
// PAYMENTS API
// ============================================
export const paymentsApi = {
  getAll: async (): Promise<Payment[]> => {
    await delay(600);
    return [...mockPayments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getById: async (id: string): Promise<Payment | undefined> => {
    await delay(300);
    return mockPayments.find((p) => p.id === id);
  },

  getByOrderId: async (orderId: string): Promise<Payment | undefined> => {
    await delay(300);
    return mockPayments.find((p) => p.orderId === orderId);
  },

  initiateRefund: async (
    paymentId: string,
    amount: number
  ): Promise<Payment> => {
    await delay(800);
    const payment = mockPayments.find((p) => p.id === paymentId);
    if (!payment) throw new Error("Payment not found");

    payment.status = "refunded";
    payment.refundAmount = amount;
    payment.refundedAt = new Date().toISOString();

    // Update related order
    const order = mockOrders.find((o) => o.id === payment.orderId);
    if (order) {
      order.paymentStatus = "refunded";
      order.status = "cancelled";
      order.updatedAt = new Date().toISOString();
    }

    // Add activity
    mockActivities.unshift({
      id: `act-${Date.now()}`,
      type: "payment",
      description: `Refund processed for payment ${payment.transactionId}`,
      timestamp: new Date().toISOString(),
    });

    return payment;
  },

  create: async (data: Omit<Payment, "id" | "createdAt">): Promise<Payment> => {
    await delay(600);
    const newPayment: Payment = {
      ...data,
      id: `pay-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    mockPayments.push(newPayment);

    // Add activity if completed
    if (data.status === "completed") {
      mockActivities.unshift({
        id: `act-${Date.now()}`,
        type: "payment",
        description: `Payment completed for order #${data.orderId}`,
        timestamp: new Date().toISOString(),
      });
    }

    return newPayment;
  },

  updateStatus: async (
    id: string,
    status: Payment["status"]
  ): Promise<Payment> => {
    await delay(500);
    const payment = mockPayments.find((p) => p.id === id);
    if (!payment) throw new Error("Payment not found");

    payment.status = status;

    // Update related order payment status
    const order = mockOrders.find((o) => o.id === payment.orderId);
    if (order) {
      order.paymentStatus = status;
      if (status === "completed") {
        order.status = "paid";
      }
      order.updatedAt = new Date().toISOString();
    }

    return payment;
  },
};
