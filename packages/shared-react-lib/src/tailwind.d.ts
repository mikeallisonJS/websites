declare module 'tailwindcss' {
  export interface Config {
    darkMode?: 'media' | 'class' | ['class', string];
    content: string[];
    theme?: {
      extend?: Record<string, any>;
      [key: string]: any;
    };
    plugins?: any[];
    [key: string]: any;
  }
} 