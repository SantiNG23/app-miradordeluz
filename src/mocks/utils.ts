/**
 * Utilidades para trabajar con datos mock
 */

/**
 * Genera un ID único para entidades mock
 */
export const generateId = (): string => {
  return `mock_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Genera una fecha ISO string
 */
export const generateISODate = (daysOffset: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString();
};

/**
 * Genera un rango de fechas
 */
export const generateDateRange = (
  startDaysOffset: number,
  endDaysOffset: number
): { start: string; end: string } => {
  return {
    start: generateISODate(startDaysOffset),
    end: generateISODate(endDaysOffset),
  };
};

/**
 * Simula un error de API para testing
 */
export class MockApiError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = "MockApiError";
  }
}

/**
 * Helper para filtrar arrays (simula queries de backend)
 */
export const filterBySearch = <T extends Record<string, any>>(
  items: T[],
  search: string | undefined,
  fields: (keyof T)[]
): T[] => {
  if (!search) return items;

  const lowerSearch = search.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      return value && String(value).toLowerCase().includes(lowerSearch);
    })
  );
};

/**
 * Helper para paginar arrays
 */
export const paginate = <T>(
  items: T[],
  page: number = 1,
  pageSize: number = 10
): {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    data: items.slice(startIndex, endIndex),
    total: items.length,
    page,
    pageSize,
    totalPages: Math.ceil(items.length / pageSize),
  };
};

/**
 * Storage mock en memoria (persiste durante la sesión)
 */
class MockStorage<T extends { id: string }> {
  private items: Map<string, T>;

  constructor(initialData: T[]) {
    this.items = new Map(initialData.map((item) => [item.id, item]));
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  getById(id: string): T | undefined {
    return this.items.get(id);
  }

  create(item: T): T {
    this.items.set(item.id, item);
    return item;
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const item = this.items.get(id);
    if (!item) return undefined;

    const updated = { ...item, ...updates };
    this.items.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }

  reset(data: T[]): void {
    this.items.clear();
    data.forEach((item) => this.items.set(item.id, item));
  }
}

export const createMockStorage = <T extends { id: string }>(
  initialData: T[]
) => {
  return new MockStorage(initialData);
};
