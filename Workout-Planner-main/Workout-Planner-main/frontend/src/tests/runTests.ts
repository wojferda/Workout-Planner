import { runFullTest } from './integrationTests';

(async () => {
  try {
    await runFullTest();
    process.exit(0);
  } catch (error) {
    console.error('Tests failed:', error);
    process.exit(1);
  }
})(); 