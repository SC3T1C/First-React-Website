import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import './wtf.css';

const placeholderImg =
  'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420"><rect width="600" height="420" fill="%23e8d8cc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="28" fill="%23634232">Image</text></svg>';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/plan', label: 'Meal Plan' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/shop', label: 'Shop' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/login', label: 'Login' },
];

const featureCards = [
  {
    title: 'Weekly meal plans',
    desc: 'Ready-made weekly menus plus a grocery list that helps cut prep time.',
    icon: '🥗',
  },
  {
    title: 'Local favorites',
    desc: 'Explore Asian-inspired meals, street food, and chef-approved flavors.',
    icon: '🌏',
  },
  {
    title: 'Smart shopping',
    desc: 'Add ingredients to your cart and review totals before checkout.',
    icon: '🛒',
  },
  {
    title: 'Fresh cooking',
    desc: 'Simple recipes with few steps and delicious results every day.',
    icon: '🔥',
  },
];

const whyItems = [
  {
    title: 'Weekly menus made easy',
    desc: 'Plan your week with rich recipes and convenient shopping support.',
  },
  {
    title: 'Trusted ingredients',
    desc: 'From produce to proteins, every item is selected for quality.',
  },
  {
    title: 'Save time in the kitchen',
    desc: 'Cook faster with clear steps and balanced flavors.',
  },
];

const recipesData = [
  { id: 'pad-thai', name: 'Pad Thai', time: '30 min', diff: 'Easy', origin: 'Thailand', category: 'Thailand' },
  { id: 'green-curry', name: 'Green Curry', time: '45 min', diff: 'Medium', origin: 'Thailand', category: 'Thailand' },
  { id: 'tom-yum', name: 'Tom Yum Soup', time: '40 min', diff: 'Medium', origin: 'Thailand', category: 'Thailand' },
  { id: 'mango-rice', name: 'Mango Sticky Rice', time: '1 hr', diff: 'Easy', origin: 'Thailand', category: 'Thailand' },
  { id: 'pho-bo', name: 'Pho Bo', time: '4 hrs', diff: 'Hard', origin: 'Vietnam', category: 'Vietnam' },
  { id: 'banh-mi', name: 'Banh Mi', time: '30 min', diff: 'Easy', origin: 'Vietnam', category: 'Vietnam' },
  { id: 'bun-cha', name: 'Bun Cha', time: '1 hr', diff: 'Medium', origin: 'Vietnam', category: 'Vietnam' },
  { id: 'fresh-rolls', name: 'Fresh Rolls', time: '35 min', diff: 'Easy', origin: 'Vietnam', category: 'Vietnam' },
];

const shopItems = [
  {
    id: 'lemongrass',
    name: 'Lemongrass Stalks',
    price: 4.95,
    origin: 'Thailand',
    category: 'Produce',
    inStock: true,
    img: placeholderImg,
  },
  {
    id: 'coconut',
    name: 'Coconut Milk',
    price: 3.5,
    origin: 'Thai Pantry',
    category: 'Pantry',
    inStock: true,
    img: placeholderImg,
  },
  {
    id: 'rice-noodles',
    name: 'Rice Noodles',
    price: 6.0,
    origin: 'Vietnamese Pantry',
    category: 'Pantry',
    inStock: true,
    img: placeholderImg,
  },
  {
    id: 'chilies',
    name: 'Fresh Red Chilies',
    price: 2.95,
    origin: 'Produce',
    category: 'Produce',
    inStock: true,
    img: placeholderImg,
  },
  {
    id: 'fish-sauce',
    name: 'Fish Sauce',
    price: 5.25,
    origin: 'Asian Pantry',
    category: 'Pantry',
    inStock: true,
    img: placeholderImg,
  },
  {
    id: 'mango',
    name: 'Ripe Mango',
    price: 1.8,
    origin: 'Produce',
    category: 'Produce',
    inStock: true,
    img: placeholderImg,
  },
];

const mealPlan = [
  { day: 'Monday', name: 'Pad Thai', desc: 'Rice noodles with crunchy peanuts.', tag: 'Dinner' },
  { day: 'Tuesday', name: 'Tom Yum Soup', desc: 'Spicy broth with shrimp and herbs.', tag: 'Dinner' },
  { day: 'Wednesday', name: 'Banh Mi', desc: 'Crispy baguette with savory pork.', tag: 'Lunch' },
  { day: 'Thursday', name: 'Green Curry', desc: 'Creamy coconut curry with basil.', tag: 'Dinner' },
  { day: 'Friday', name: 'Fresh Rolls', desc: 'Light rice rolls with shrimp.', tag: 'Lunch' },
];

const productCategories = ['All', 'Produce', 'Pantry', 'Thai Pantry', 'Vietnamese Pantry', 'Asian Pantry'];
const regions = ['All', 'Thailand', 'Vietnam'];

function Header({ cartCount, onCartToggle, currentUser, onLogout }) {
  return (
    <nav>
      <NavLink className="nav-brand" to="/" end>
        <b>WTF</b> <span>Weekly Taste Finder</span>
      </NavLink>
      <ul>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink className={({ isActive }) => (isActive ? 'on' : '')} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="nav-r">
        <button className="cart-ico" type="button" onClick={onCartToggle} aria-label="Open cart">
          🛒
          {cartCount ? <span className="badge">{cartCount}</span> : null}
        </button>
        {currentUser ? (
          <>
            <span className="nav-user">Hi, {currentUser.fullName}</span>
            <button className="btn-s" type="button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink className="btn-login" to="/login">
            Sign in
          </NavLink>
        )}
      </div>
    </nav>
  );
}

function CartDrawer({ open, items, onClose, onRemove, onUpdateQty, onCheckout, total }) {
  return (
    <div>
      <div className={`cart-drawer${open ? ' open' : ''}`}>
        <div className="cart-head">
          <h3>Shopping cart</h3>
          <button className="btn-s" type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">Your cart is empty. Add some ingredients to get started.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong>
                  <p className="text-muted">{item.origin}</p>
                  <div className="qty-row">
                    <button type="button" onClick={() => onUpdateQty(item.id, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>
                <div>
                  <span className="sh-price">${(item.price * item.qty).toFixed(2)}</span>
                  <button className="btn-s" type="button" onClick={() => onRemove(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="sh-pr-row">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <button className="checkout-btn btn-p" type="button" onClick={onCheckout} disabled={!items.length}>
            Checkout
          </button>
        </div>
      </div>
      {open ? <div className="cart-backdrop" onClick={onClose} /> : null}
    </div>
  );
}

function HomePage({ onAddToCart }) {
  return (
    <div>
      <section className="hero">
        <span className="hero-badge">PLAN • COOK • ENJOY</span>
        <h1>Weekly Asian meal plans for modern home chefs</h1>
        <p>
          Discover easy recipes, fresh ingredients, and a simple shopping cart that keeps your week organized.
        </p>
        <div className="hero-btns">
          <NavLink className="btn-p" to="/shop">
            Shop groceries
          </NavLink>
          <NavLink className="btn-s" to="/plan">
            View meal plan
          </NavLink>
        </div>
        <div className="feat-grid">
          {featureCards.map((card) => (
            <article key={card.title} className="feat-card">
              <div className="feat-body">
                <div>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="cta-wrap">
        <div className="cta-box">
          <h2>Build your weekly plan in minutes</h2>
          <p>
            Add recipes, choose ingredients, and check out in one smooth experience. Your kitchen, simplified.
          </p>
          <button className="btn-p" type="button" onClick={() => onAddToCart(shopItems[0])}>
            Add starter ingredients
          </button>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="about-wrap">
      <section className="pg-head">
        <h1>About Weekly Taste Finder</h1>
        <p>We help you cook globally inspired meals without the guesswork.</p>
      </section>
      <p className="about-intro">
        Weekly Taste Finder brings healthy meal planning, Asian-inspired recipes, grocery shopping, and checkout into a single modern app.
      </p>
      <div className="mission-box">
        <h3>Our mission</h3>
        <p>We want every meal to be simple, delicious, and something you look forward to eating.</p>
      </div>
      <div className="why-grid">
        {whyItems.map((item) => (
          <div key={item.title} className="feat-card">
            <div className="feat-body">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanPage({ onSendMessage, messages, planInput, setPlanInput, mealList, handleQuick }) {
  return (
    <div className="plan-wrap">
      <div className="plan-card">
        <div className="plan-card-head">
          <div className="ai-ava">AI</div>
          <div>
            <p className="pc-title">Meal plan assistant</p>
            <small className="pc-sub">Share your preferences and get a weekly plan instantly.</small>
          </div>
        </div>
        <div className="chat-area">
          {messages.map((msg) => (
            <div key={msg.id} className={`msg ${msg.from === 'u' ? 'u' : ''}`}>
              <div className={`msg-av ${msg.from === 'u' ? 'u' : 'ai'}`}>
                {msg.from === 'u' ? 'You' : 'AI'}
              </div>
              <div className={`bub ${msg.from === 'u' ? 'u' : 'ai'}`}>{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="chat-inp-row">
          <input
            className="chat-inp"
            value={planInput}
            onChange={(e) => setPlanInput(e.target.value)}
            placeholder="Type your meal preferences..."
          />
          <button className="chat-send" type="button" onClick={onSendMessage}>
            ➤
          </button>
        </div>
        <div className="filter-row">
          {['No spice', 'Vegetarian', 'Low carb'].map((label) => (
            <button key={label} type="button" className="ftab" onClick={() => handleQuick(label)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="plan-card">
        <h2>Sample weekly meals</h2>
        <div className="meal-list">
          {mealList.map((meal) => (
            <div key={meal.day} className="meal-row">
              <div>
                <span className="meal-day">{meal.day}</span>
                <p className="meal-name">{meal.name}</p>
                <p className="meal-meta">{meal.desc}</p>
              </div>
              <span className="tag tag-b">{meal.tag}</span>
            </div>
          ))}
        </div>
        <button className="view-cal btn-p" type="button">
          Save this plan
        </button>
      </div>
    </div>
  );
}

function RecipesPage({ region, setRegion }) {
  const visible = useMemo(
    () => recipesData.filter((recipe) => region === 'All' || recipe.origin === region),
    [region]
  );

  return (
    <div className="recipes-wrap">
      <section className="pg-head">
        <h1>Recipes</h1>
        <p>Search by region and discover tasty, easy-to-follow meals.</p>
      </section>
      <div className="map-box">
        <h3>Select a region</h3>
        <div className="filter-row">
          {regions.map((country) => (
            <button
              key={country}
              type="button"
              className={`ftab${region === country ? ' on' : ''}`}
              onClick={() => setRegion(country)}
            >
              {country}
            </button>
          ))}
        </div>
      </div>
      <div className="recipes-sec">
        <div className="recipes-grid">
          {visible.map((recipe) => (
            <article key={recipe.id} className="rec-card">
              <div className="rec-img">
                <img src={placeholderImg} alt={recipe.name} />
                <span className={`diff-badge ${recipe.diff === 'Easy' ? 'diff-easy' : recipe.diff === 'Medium' ? 'diff-med' : 'diff-hard'}`}>
                  {recipe.diff}
                </span>
              </div>
              <div className="rec-body">
                <h4>{recipe.name}</h4>
                <div className="rec-meta">
                  <span>{recipe.time}</span>
                  <span>{recipe.origin}</span>
                </div>
                <button type="button" className="btn-view">
                  View recipe
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ShopPage({ category, setCategory, onAddToCart }) {
  const visible = useMemo(
    () => shopItems.filter((item) => category === 'All' || item.origin === category || item.category === category),
    [category]
  );

  return (
    <div className="shop-wrap">
      <section className="pg-head">
        <h1>Shop ingredients</h1>
        <p>Choose pantry staples and fresh produce for your next meal plan.</p>
      </section>
      <div className="filter-row">
        {productCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`ftab${category === cat ? ' on' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="shop-grid">
        {visible.map((item) => (
          <div key={item.id} className="sh-card">
            <div className="sh-img">
              <img src={item.img} alt={item.name} />
              {item.inStock ? <span className="in-stock">In stock</span> : null}
            </div>
            <div className="sh-body">
              <h4>{item.name}</h4>
              <div className="sh-origin">{item.origin}</div>
              <div className="sh-pr-row">
                <span className="sh-price">${item.price.toFixed(2)}</span>
                <button className="sh-plus" type="button" onClick={() => onAddToCart(item)}>
                  +
                </button>
              </div>
              <button className="add-btn" type="button" onClick={() => onAddToCart(item)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TransactionsPage({ history }) {
  const totalSpent = history.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="about-wrap">
      <section className="pg-head">
        <h1>Transaction history</h1>
        <p>Review your orders, totals, and recent shopping activity.</p>
      </section>
      <div className="feat-grid" style={{ marginBottom: '24px' }}>
        <article className="feat-card">
          <div className="feat-body">
            <h3>Total spent</h3>
            <p>${totalSpent.toFixed(2)}</p>
          </div>
        </article>
        <article className="feat-card">
          <div className="feat-body">
            <h3>Orders</h3>
            <p>{history.length}</p>
          </div>
        </article>
        <article className="feat-card">
          <div className="feat-body">
            <h3>Current status</h3>
            <p>{history.length ? 'Ready for pickup' : 'No orders yet'}</p>
          </div>
        </article>
      </div>
      <div className="about-wrap">
        {history.length === 0 ? (
          <p className="about-intro">No transactions yet. Add items to your cart and checkout to begin.</p>
        ) : (
          history.map((order) => (
            <div key={order.id} className="plan-card" style={{ marginBottom: '16px' }}>
              <h3>Order #{order.id}</h3>
              <p className="meal-meta">{order.date} · {order.items.length} items</p>
              <p>Total paid: ${order.total.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function LoginPage({ onLogin, currentUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (currentUser) {
    return <Navigate to="/secure" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const result = await onLogin({ email, password });
    if (result.success) {
      navigate('/secure');
    } else {
      setError(result.message || 'Login failed');
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h2>Sign in</h2>
        <p className="sub">Welcome back. Enter your details to access your meal planner.</p>
        {error ? <div className="form-error">{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <div className="fgrp">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@example.com" />
          </div>
          <div className="fgrp">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <div className="frow">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <button type="button" className="btn-s">
              Forgot?
            </button>
          </div>
          <button className="btn-p" type="submit">Sign in</button>
        </form>
        <hr />
        <p className="login-sw">
          New here?{' '}
          <button type="button" className="btn-s" onClick={() => navigate('/register')}>
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}

function Footer() {
  return <footer>© 2026 Weekly Taste Finder. Built with React.</footer>;
}

function ProtectedRoute({ authenticated, children }) {
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RegisterPage({ onSignup }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const result = await onSignup({ fullName, email, password });
    if (result.success) {
      navigate('/secure');
    } else {
      setError(result.message || 'Signup failed');
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h2>Create account</h2>
        <p className="sub">Register a new account and access your secure meal planning tools.</p>
        {error ? <div className="form-error">{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <div className="fgrp">
            <label htmlFor="fullName">Full name</label>
            <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" />
          </div>
          <div className="fgrp">
            <label htmlFor="registerEmail">Email</label>
            <input id="registerEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@example.com" />
          </div>
          <div className="fgrp">
            <label htmlFor="registerPassword">Password</label>
            <input id="registerPassword" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button className="btn-p" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

function SecurePage({ authToken }) {
  const [message, setMessage] = useState('Loading secure content...');

  useEffect(() => {
    if (!authToken) {
      return;
    }

    fetch('http://localhost:8080/api/auth/secure', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .then((data) => {
        setMessage(data.message || 'Secure route accessible.');
      })
      .catch(() => {
        setMessage('Unable to access secure route. Please login again.');
      });
  }, [authToken]);

  return (
    <div className="about-wrap">
      <section className="pg-head">
        <h1>Secure area</h1>
        <p>{message}</p>
      </section>
    </div>
  );
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'ai',
      text: 'Tell me what ingredients and meals you want, and I’ll make a weekly plan for the week.',
    },
  ]);
  const [planInput, setPlanInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('wtf-auth-token') || '');
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('wtf-user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('wtf-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    fetch('http://localhost:8080/api/orders')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unable to load orders');
        }
        return res.json();
      })
      .then((orders) => {
        if (!Array.isArray(orders)) {
          return;
        }
        setHistory(
          orders.map((order) => ({
            id: order.id,
            date: order.date,
            total: order.total,
            items: order.itemsJson ? JSON.parse(order.itemsJson) : [],
          }))
        );
      })
      .catch((error) => {
        console.error('Failed to load orders:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('wtf-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wtf-auth-token', authToken);
  }, [authToken]);

  useEffect(() => {
    localStorage.setItem('wtf-user', JSON.stringify(currentUser));
  }, [currentUser]);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems]);
  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );

  const addToCart = (product) => {
    setCartItems((items) => {
      const exists = items.find((item) => item.id === product.id);
      if (exists) {
        return items.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...items, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, nextQty) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, qty: Math.max(1, nextQty) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    if (!cartItems.length) {
      return;
    }

    const payload = {
      date: new Date().toLocaleDateString(),
      total: cartTotal,
      itemsJson: JSON.stringify(cartItems),
    };

    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Unable to save order');
      }

      const saved = await response.json();
      const order = {
        id: saved.id,
        date: saved.date,
        total: saved.total,
        items: saved.itemsJson ? JSON.parse(saved.itemsJson) : [],
      };

      setHistory((current) => [order, ...current]);
      setCartItems([]);
      setCartOpen(false);
    } catch (error) {
      console.error('Checkout failed', error);
      alert('Checkout failed. Please try again later.');
    }
  };

  const handleSignup = async ({ email, password, fullName }) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (response.ok) {
        const result = await response.json();
        setAuthToken(result.token);
        setCurrentUser(result.user);
        return { success: true };
      }

      if (response.status === 409) {
        return { success: false, message: 'Email already exists' };
      }

      return { success: false, message: 'Signup failed' };
    } catch (error) {
      console.error('Signup error', error);
      return { success: false, message: 'Signup failed' };
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        setAuthToken(result.token);
        setCurrentUser(result.user);
        return { success: true };
      }

      if (response.status === 401) {
        return { success: false, message: 'Email or password is incorrect' };
      }

      return { success: false, message: 'Login failed' };
    } catch (error) {
      console.error('Login error', error);
      return { success: false, message: 'Login failed' };
    }
  };

  const handleLogout = () => {
    setAuthToken('');
    setCurrentUser(null);
  };

  const handleSendMessage = () => {
    const text = planInput.trim();
    if (!text) return;
    const next = {
      id: messages.length + 1,
      from: 'u',
      text,
    };
    setMessages((prev) => [...prev, next]);
    setPlanInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          from: 'ai',
          text: `Great idea! I recommend a week with ${text}. Start with a fresh stir-fry, balance it with rice bowls, and end the week with a comforting soup.`,
        },
      ]);
    }, 500);
  };

  const handleQuick = (value) => {
    setPlanInput(value);
  };

  return (
    <BrowserRouter>
      <Header
        cartCount={cartCount}
        onCartToggle={() => setCartOpen((value) => !value)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onUpdateQty={updateQty}
        onCheckout={handleCheckout}
        total={cartTotal}
      />
      <main className="page-body">
        <Routes>
          <Route path="/" element={<HomePage onAddToCart={addToCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/plan"
            element={
              <PlanPage
                onSendMessage={handleSendMessage}
                messages={messages}
                planInput={planInput}
                setPlanInput={setPlanInput}
                mealList={mealPlan}
                handleQuick={handleQuick}
              />
            }
          />
          <Route path="/recipes" element={<RecipesPage region={selectedRegion} setRegion={setSelectedRegion} />} />
          <Route path="/shop" element={<ShopPage category={selectedCategory} setCategory={setSelectedCategory} onAddToCart={addToCart} />} />
              <Route
            path="/transactions"
            element={
              <ProtectedRoute authenticated={Boolean(authToken && currentUser)}>
                <TransactionsPage history={history} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/secure"
            element={
              <ProtectedRoute authenticated={Boolean(authToken && currentUser)}>
                <SecurePage authToken={authToken} />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage onSignup={handleSignup} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} currentUser={currentUser} />} />
          <Route path="*" element={<div className="pg-head"><h1>Page not found</h1><p>Use the menu to navigate back to the site.</p></div>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
