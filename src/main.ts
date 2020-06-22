import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Helmet can help protect your app from some 
  // well-known web vulnerabilities by setting HTTP headers appropriately
  app.use(helmet());

  // CORS is a mechanism that allows resources to be requested from another domain.
  app.enableCors();

  // Cross-site request forgery (also known as CSRF or XSRF) is a type of malicious 
  // exploit of a website where unauthorized commands are transmitted from a user 
  // that the web application trusts. To mitigate this kind of attack you can 
  // use the csurf package.
  app.use(csurf());

  // express-rate-limit
  // A common technique to protect applications from brute-force attacks is rate-limiting. 
  // Many Express packages exist to provide a rate-limiting feature
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  await app.listen(3000);
}
bootstrap();
