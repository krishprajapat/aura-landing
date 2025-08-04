
-- User profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  sizes TEXT[],
  colors TEXT[],
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'processing',
  total DECIMAL(10,2) NOT NULL,
  items INTEGER NOT NULL,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  size TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User addresses table
CREATE TABLE user_addresses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('shipping', 'billing')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip_code TEXT NOT NULL,
  country TEXT NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wishlist table
CREATE TABLE wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, sizes, colors, in_stock) VALUES
('Classic Cotton T-Shirt', 'Premium cotton t-shirt with perfect fit', 29.99, '/api/placeholder/400/500', 'Tops', ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['White', 'Black', 'Navy'], true),
('Slim Fit Jeans', 'Comfortable slim fit jeans for everyday wear', 79.99, '/api/placeholder/400/500', 'Bottoms', ARRAY['28', '30', '32', '34', '36'], ARRAY['Blue', 'Black', 'Gray'], true),
('Wool Blend Sweater', 'Cozy wool blend sweater for cold days', 89.99, '/api/placeholder/400/500', 'Tops', ARRAY['S', 'M', 'L', 'XL'], ARRAY['Beige', 'Navy', 'Charcoal'], true),
('Leather Crossbody Bag', 'Genuine leather crossbody bag with adjustable strap', 129.99, '/api/placeholder/400/500', 'Accessories', ARRAY['One Size'], ARRAY['Brown', 'Black', 'Tan'], true),
('Summer Midi Dress', 'Flowy midi dress perfect for summer occasions', 69.99, '/api/placeholder/400/500', 'Dresses', ARRAY['XS', 'S', 'M', 'L'], ARRAY['Floral', 'Solid Blue', 'Solid Pink'], true),
('Casual Sneakers', 'Comfortable sneakers for daily wear', 99.99, '/api/placeholder/400/500', 'Shoes', ARRAY['6', '7', '8', '9', '10', '11'], ARRAY['White', 'Black', 'Gray'], true);

-- Row Level Security (RLS) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policies for orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policies for user_addresses
CREATE POLICY "Users can view own addresses" ON user_addresses
  FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can manage own addresses" ON user_addresses
  FOR ALL USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Policies for wishlist
CREATE POLICY "Users can view own wishlist" ON wishlist
  FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can manage own wishlist" ON wishlist
  FOR ALL USING (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Allow public read access to products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view products" ON products FOR SELECT TO public USING (true);
