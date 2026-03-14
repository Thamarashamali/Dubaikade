const productsData = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "electronics",
    price: "$129.99",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    description: "High-quality noise-canceling wireless headphones with a 30-hour battery life.",
    badge: "Bestseller"
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    category: "electronics",
    price: "$199.99",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    description: "Track your health, workouts, and notifications with this sleek smartwatch.",
    badge: "New"
  },
  {
    id: 3,
    name: "Minimalist Leather Backpack",
    category: "accessories",
    price: "$89.50",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
    description: "Durable and stylish leather backpack perfect for daily commute.",
    badge: ""
  },
  {
    id: 4,
    name: "Classic Sunglasses",
    category: "accessories",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
    description: "UV400 protection with a timeless classic design.",
    badge: "Sale"
  },
  {
    id: 5,
    name: "Organic Cotton T-Shirt",
    category: "clothing",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    description: "Ultra-soft, eco-friendly cotton t-shirt available in multiple colors.",
    badge: ""
  },
  {
    id: 6,
    name: "Running Sneakers",
    category: "clothing",
    price: "$110.00",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    description: "Lightweight and breathable sneakers built for maximum comfort.",
    badge: "Popular"
  }
];

// Product Render & Filtering Logic
const productsGrid = document.getElementById('products-grid');
const categoryBtns = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('search-input');

function renderProducts(products) {
  if (!productsGrid) return;
  
  productsGrid.innerHTML = '';
  
  if (products.length === 0) {
    productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">No products found matching your criteria.</p>';
    return;
  }
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card reveal active';
    
    let badgeHtml = '';
    if (product.badge) {
      badgeHtml = `<span class="product-badge">${product.badge}</span>`;
    }
    
    card.innerHTML = `
      <div class="product-image">
        ${badgeHtml}
        <img src="${product.image}" alt="${product.name}">
        <div class="product-overlay">
          <a href="contact.html?product=${product.id}" class="btn-quick-view">Inquire Now</a>
        </div>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${product.price}</span>
          <a href="contact.html?product=${product.id}" class="btn btn-primary" style="padding: 0.5rem 1rem;">Order</a>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });
}

function filterProducts() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const activeCategoryBtn = document.querySelector('.category-btn.active');
  const category = activeCategoryBtn ? activeCategoryBtn.getAttribute('data-category') : 'all';
  
  const filtered = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                          product.description.toLowerCase().includes(searchTerm);
    const matchesCategory = category === 'all' || product.category === category;
    
    return matchesSearch && matchesCategory;
  });
  
  renderProducts(filtered);
}

// Initialize Product Page Events
if (productsGrid) {
  // Initial Render
  renderProducts(productsData);
  
  // Category Filtering
  if (categoryBtns) {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        filterProducts();
      });
    });
  }
  
  // Search Filtering
  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }
}

// Function to render featured products on Home Page
function renderFeaturedProducts() {
  const featuredGrid = document.getElementById('featured-grid');
  if (!featuredGrid) return;
  
  const featured = productsData.slice(0, 3); // Top 3 products
  
  featured.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    
    let badgeHtml = '';
    if (product.badge) {
      badgeHtml = `<span class="product-badge">${product.badge}</span>`;
    }
    
    card.innerHTML = `
      <div class="product-image">
        ${badgeHtml}
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-desc">${product.description.substring(0, 50)}...</p>
        <div class="product-footer">
          <span class="product-price">${product.price}</span>
          <a href="products.html" class="btn btn-outline" style="padding: 0.5rem 1rem;">View</a>
        </div>
      </div>
    `;
    featuredGrid.appendChild(card);
  });
}

// Call on load
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedProducts();
});
