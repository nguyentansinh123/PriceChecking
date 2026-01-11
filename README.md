![White Knight Logo](https://github.com/nguyentansinh123/PriceChecking/blob/ccade6fbafd2e375356ee0a1365e71f418123205/logo.png)
![White Knight Logo](https://github.com/nguyentansinh123/PriceChecking/blob/ccade6fbafd2e375356ee0a1365e71f418123205/logo.png)

# 🛒 PriceChecking - Australian Supermarket Price Comparison Platform

A full-stack web application for comparing product prices across major Australian supermarkets:  **Coles**, **Woolworths**, and **IGA**. Built with **TypeScript**, **React**, and **Express**, featuring real-time web scraping, product search, price comparison, and watchlist functionality.

## 🌟 Features

### 🔍 Core Functionality
- **Multi-Store Price Comparison**: Compare prices across Coles, Woolworths, and IGA in real-time
- **Advanced Search**: Search for products across all stores simultaneously
- **Product Watchlist**: Track your favorite products and monitor price changes
- **Half-Price Specials**: Browse current half-price deals from all stores
- **Detailed Product Information**: View nutrition facts, ingredients, images, and more
- **Responsive UI**: Modern, mobile-friendly interface built with React and TailwindCSS

### 👤 User Features
- **Authentication System**: 
  - Email/Password registration and login
  - OAuth integration (Google, Facebook, GitHub)
  - JWT-based session management
  - Email verification with OTP
- **User Profile Management**:
  - Avatar upload with Cloudinary integration
  - Account settings
  - Watchlist management

### 🤖 Web Scraping Engine
Powered by **Puppeteer** with stealth mode to extract: 
- Product titles, prices, and images
- Nutritional information
- Ingredients and product details
- Special offers and promotions
- Stock availability

## 📸 Screenshots

> _Add your application screenshots here_

## 🏗️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Build tool
- **TailwindCSS 4** - Styling
- **Framer Motion** - Animations
- **React Router v7** - Navigation
- **TanStack Query** - Data fetching & caching
- **Zustand** - State management
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Toastify** - Notifications

### Backend
- **Node.js** with **Express 5**
- **TypeScript**
- **MongoDB** with Mongoose - Database
- **Puppeteer & Puppeteer-Extra** - Web scraping
- **Passport.js** - OAuth authentication
- **JWT** - Token-based authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **MJML** - Email templates
- **Cloudinary** - Image storage
- **Multer** - File uploads

## 📦 Prerequisites

- **Node.js** v18 or higher
- **MongoDB** (local or Atlas)
- **npm** or **yarn**
- **Cloudinary** account (for image uploads)
- OAuth credentials (optional, for social login):
  - Google OAuth
  - Facebook OAuth
  - GitHub OAuth

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nguyentansinh123/PriceChecking.git
cd PriceChecking
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure `.env` file:**

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/pricecheck
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster. mongodb.net/pricecheck

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
SESSION_SECRET=your_session_secret_here

# Frontend URL
FRONTEND_URL=http://localhost:5173

# OAuth - Google
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# OAuth - Facebook
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# OAuth - GitHub
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Email Service (Nodemailer)
SENDER_EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Start Backend:**

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm start
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure `.env` file:**

```env
VITE_API_URL=http://localhost:5000/api/v1
```

**Start Frontend:**

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run preview
```

Frontend will run on `http://localhost:5173`

## 📚 Project Structure

```
PriceChecking/
├── backend/
│   ├── src/
│   │   ├── controller/
│   │   │   ├── auth.controller.ts        # Authentication logic
│   │   │   ├── tpAuth.controller.ts      # OAuth (Google, FB, GitHub)
│   │   │   ├── user.controller.ts        # User management
│   │   │   ├── product.controller.ts     # Product endpoints
│   │   │   └── func/                     # Scraping functions
│   │   │       ├── Coles/
│   │   │       │   ├── halfPrice.ts
│   │   │       │   ├── singleProduct.ts
│   │   │       │   ├── specialsCatalogs.ts
│   │   │       │   └── searchProduct.ts
│   │   │       ├── Woolworths/
│   │   │       │   ├── halfPrice. ts
│   │   │       │   ├── singleProduct.ts
│   │   │       │   ├── SearchProduct.ts
│   │   │       │   └── specialsOnline.ts
│   │   │       └── IGA/
│   │   │           ├── halfPrice.ts
│   │   │           └── singleProduct.ts
│   │   ├── routes/
│   │   │   ├── auth. route.ts
│   │   │   ├── user.route. ts
│   │   │   └── product.route.ts
│   │   ├── models/
│   │   │   ├── user.model.ts
│   │   │   └── product.model.ts
│   │   ├── lib/
│   │   │   ├── connectDB.ts
│   │   │   ├── cloudinary.ts
│   │   │   └── nodemailer.ts
│   │   ├── template/                     # Email templates (MJML)
│   │   ├── types/
│   │   │   └── product.types.ts
│   │   └── app.ts                        # Express app entry
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── comps/                        # React components
│   │   │   └── Products/
│   │   │       ├── ProductCard.tsx
│   │   │       └── rightColumn/
│   │   ├── lib/
│   │   │   ├── axios.ts
│   │   │   └── productapi.tsx            # API functions
│   │   ├── types/
│   │   │   └── productTypes.ts
│   │   └── App.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
└── README.md
```

## 🔧 API Endpoints

### Authentication

```
POST   /api/v1/auth/register           - Register new user
POST   /api/v1/auth/login              - Login with email/password
POST   /api/v1/auth/logout             - Logout user
GET    /api/v1/auth/google             - Google OAuth login
GET    /api/v1/auth/facebook           - Facebook OAuth login
GET    /api/v1/auth/github             - GitHub OAuth login
POST   /api/v1/auth/verify-email       - Verify email with OTP
POST   /api/v1/auth/forgot-password    - Request password reset
POST   /api/v1/auth/reset-password     - Reset password with OTP
```

### User Management

```
GET    /api/v1/user/me                 - Get current user details
GET    /api/v1/user/all                - Get all users (admin)
DELETE /api/v1/user/delete             - Delete account
PUT    /api/v1/user/avatar             - Update avatar
```

### Products & Scraping

```
# Coles
GET    /api/v1/product/coles/singleProduct? url={url}  - Scrape single Coles product
GET    /api/v1/product/coles/specialCatalog           - Scrape Coles specials
GET    /api/v1/product/coles/halfPrice                - Scrape Coles half-price
GET    /api/v1/product/coles/search? q={query}         - Search Coles products

# Woolworths
GET    /api/v1/product/WW/singleProduct?url={url}     - Scrape single WW product
GET    /api/v1/product/WW/halfPrice                   - Scrape WW half-price
GET    /api/v1/product/WW/specials                    - Scrape WW specials
GET    /api/v1/product/WW/search?q={query}            - Search WW products

# IGA
GET    /api/v1/product/IGA/singleProduct?url={url}    - Scrape single IGA product
GET    /api/v1/product/IGA/SpecialCatalog             - Scrape IGA specials

# General
GET    /api/v1/product/search?q={query}&store={store} - Search all stores
GET    /api/v1/product/products? page={page}&limit={limit} - Get all products
POST   /api/v1/product/compare                        - Compare products
GET    /api/v1/product/watchlist                      - Get user watchlist
POST   /api/v1/product/watchlist/add                  - Add to watchlist
DELETE /api/v1/product/watchlist/remove/{id}          - Remove from watchlist
```

## 🕷️ How Web Scraping Works

The application uses **Puppeteer-extra with Stealth Plugin** to scrape data from Australian supermarket websites.  Here's the technical approach:

### Core Scraping Technologies

1. **Puppeteer**:  Headless Chrome automation
2. **Puppeteer-Extra**: Plugin system for enhanced functionality
3. **Stealth Plugin**: Bypasses bot detection mechanisms
4. **TypeScript**: Type-safe scraping functions

### Scraping Patterns

#### 1. **Coles Scraping** (with Stealth Mode)

```typescript
// Geolocation spoofing for location-based pricing
await page.setGeolocation({ latitude: -33.8688, longitude: 151.2093 });

// Extract product data
const title = await page.$eval('.product__title', el => el.textContent?. trim());
const price = await page.$eval('.price__value', el => el.textContent?. trim());

// Handle pagination
while (! isDisabled) {
  // Scrape current page
  // Check if next button is disabled
  // Navigate to next page
}
```

#### 2. **Woolworths Scraping** (Shadow DOM)

```typescript
// Access shadow DOM elements
const shadowRoot = await productHandle.evaluateHandle((el) => el.shadowRoot);

// Query inside shadow DOM
const title = await shadowRoot.$eval(
  "section . product-title-container a",
  el => el.textContent. trim()
);
```

#### 3. **IGA Scraping** (Modal Handling)

```typescript
// Dismiss guest modal if present
try {
  await page.waitForSelector("button[data-modal-close]", { timeout: 5000 });
  await page.click("button[data-modal-close]");
} catch {
  console.log("No modal to dismiss");
}

// Traverse DOM to find product cards
const card = el. closest('[data-product-card]');
const title = card?. querySelector('a[data-variant="link"] span')?.textContent;
```

### Data Persistence

Scraped data is stored in MongoDB with automatic upsert logic:

```typescript
const prepareProductForDB = (data: any, source: string, store: string) => ({
  title: data.title || "Unknown Product",
  price: data.price || "0.00",
  originalPrice: data.originalPrice || null,
  image: data.image || "",
  productId: data.productId || `${source}-${Date.now()}`,
  href: data.href || null,
  source,
  store
});

// Upsert to prevent duplicates
await Product.findOneAndUpdate(
  { productId:  productToSave.productId },
  productToSave,
  { upsert: true, new: true }
);
```

### Anti-Detection Measures

- **Stealth Plugin**: Evades headless browser detection
- **Geolocation Override**: Mimics real user location (Sydney)
- **User Data Directory**: Maintains cookies and sessions
- **Network Idle Wait**: Ensures JavaScript content loads
- **Timeout Protection**: Prevents infinite hangs (30s-260s timeouts)

## 📊 Data Models

### User Schema

```typescript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  isOAuthUser: Boolean,
  oauthProvider: String,
  oauthId: String,
  isAccountVerified: Boolean,
  accountVerifyToken: String,
  accountVerifyTokenExpiry: Date,
  resetToken: String,
  resetTokenExpiry: Date
}
```

### Product Schema

```typescript
{
  title: String (required),
  price: String (required),
  originalPrice: String,
  image: String (required),
  productId: String (required, unique),
  href: String,
  source: String (required),
  store: String (enum: ['Coles', 'IGA', 'Woolworths', 'Other'])
}
```

## 🎨 Frontend Features

### Component Architecture

- **ProductCard**: Reusable product display component
- **TanStack Query**: Data fetching with automatic caching and refetching
- **Zustand**:  Lightweight global state management
- **Framer Motion**: Smooth animations and transitions
- **React Router v7**: Client-side routing

### API Integration

```typescript
// Example: Search products across stores
export const searchProducts = async (query:  string) => {
  const response = await axiosInstance.get(
    `/product/search?q=${encodeURIComponent(query)}`
  );
  return response. data;
};

// Example: Add to watchlist
export const addToWatchlist = async (productId: string) => {
  const response = await axiosInstance.post(
    "/product/watchlist/add",
    { productId }
  );
  return response.data;
};
```

## ⚙️ Environment Variables

### Backend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/pricecheck` |
| `JWT_SECRET` | JWT signing secret | `your_jwt_secret` |
| `SESSION_SECRET` | Session encryption secret | `your_session_secret` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `your_google_id` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret | `your_google_secret` |
| `FACEBOOK_APP_ID` | Facebook OAuth app ID | `your_fb_id` |
| `FACEBOOK_APP_SECRET` | Facebook OAuth secret | `your_fb_secret` |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | `your_github_id` |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth secret | `your_github_secret` |
| `SENDER_EMAIL` | Email for notifications | `your@email.com` |
| `EMAIL_PASSWORD` | Email app password | `app_password` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your_cloud` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `your_api_key` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_api_secret` |

### Frontend Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api/v1` |

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **bcrypt Password Hashing**: Industry-standard password encryption
- **HTTP-Only Cookies**: Prevents XSS attacks
- **CORS Configuration**: Restricts cross-origin requests
- **OAuth 2.0**: Secure third-party authentication
- **Rate Limiting**: (Add if implemented)
- **Input Validation**: (Add if implemented)

## 🐛 Troubleshooting

### Common Issues

**1. Puppeteer/Chrome Issues**

```bash
# Clean up Puppeteer resources
rm -rf backend/tmp/SingletonLock
rm -rf backend/tmp/SingletonCookie
pkill -f "chromium|chrome"
```

**2. MongoDB Connection Issues**

- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (if using Atlas)

**3. OAuth Not Working**

- Verify callback URLs in OAuth provider dashboards
- Check client IDs and secrets
- Ensure HTTPS in production

**4. Scraping Timeouts**

- Websites may have changed their structure
- Check browser DevTools for current selectors
- Increase timeout values in scraper functions

**5. CORS Errors**

- Verify `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `app.ts`

## 🚀 Deployment

### Backend Deployment (e.g., Railway, Render, Heroku)

1. Set all environment variables
2. Ensure MongoDB Atlas is configured
3. Build TypeScript:  `npm run build`
4. Start server: `npm start`

### Frontend Deployment (e.g., Vercel, Netlify)

1. Set `VITE_API_URL` to production backend URL
2. Build:  `npm run build`
3. Deploy `dist` folder

### Docker Deployment (Optional)

```dockerfile
# Add Dockerfile for containerization
# Example for backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 Scraping Base Repository

This project uses web scraping techniques from: 
**[Scraping-Coles-Woolworths-IGA](https://github.com/nguyentansinh123/Scraping-Coles-Woolworths-IGA)**

The scraping base includes:
- Puppeteer-based scraping scripts for Coles, Woolworths, and IGA
- Shadow DOM handling for modern web components
- Pagination logic
- Product detail extraction
- Nutritional information parsing

## ⚠️ Legal & Ethical Considerations

**Important Disclaimers:**

1. **Terms of Service**: Always review and respect the terms of service of the websites being scraped
2. **Rate Limiting**: Implement delays between requests to avoid overloading servers
3. **robots.txt**: Respect robots.txt directives
4. **Personal Use**: This project is intended for educational and personal use only
5. **Data Accuracy**: Prices and availability may change; always verify current data
6. **No Warranty**: The author is not responsible for misuse of this software

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes only. Use responsibly and ethically.

## 👨‍💻 Author

**Nguyen Tan Sinh**
- GitHub: [@nguyentansinh123](https://github.com/nguyentansinh123)

## 🙏 Acknowledgments

- **Puppeteer Team** - For the amazing browser automation library
- **Australian Supermarkets** - Coles, Woolworths, IGA
- **Open Source Community** - For all the amazing packages used in this project

---

**⭐ Star this repo if you find it helpful!**

**Disclaimer**: This tool is for educational and personal use only. Always respect website terms of service and robots.txt files.  The author is not responsible for misuse of this software. 
