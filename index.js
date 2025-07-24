require('dotenv').config();
const app = require('./src/app');

function bootstrap() {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
      console.log(`🚀 Dekamond OTP auth Server is running on port ${PORT}`);
  });
}

bootstrap();