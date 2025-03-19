export class IdGenerator {
  private static instance: IdGenerator;
  private counters: Map<string, number> = new Map();
  
  private constructor() {}
  
  public static getInstance(): IdGenerator {
    if (!IdGenerator.instance) {
      IdGenerator.instance = new IdGenerator();
    }
    return IdGenerator.instance;
  }
  
  // 生成特定前缀的 ID
  public generate(prefix: string): string {
    if (!this.counters.has(prefix)) {
      this.counters.set(prefix, 1);
    }
    
    const id = `${prefix}_${this.counters.get(prefix)}`;
    this.counters.set(prefix, (this.counters.get(prefix) || 0) + 1);
    
    return id;
  }
  
  // 重置特定前缀的计数器
  public reset(prefix: string): void {
    this.counters.set(prefix, 1);
  }
  
  // 重置所有计数器
  public resetAll(): void {
    this.counters.clear();
  }
} 