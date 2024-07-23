document.addEventListener("DOMContentLoaded", async () => {
    const cardsContainer = document.getElementById('cards-container');
    const tabButtons = document.querySelectorAll('.category');

    const fetchData = async () => {
        try {
            const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
            const data = await response.json();
            return data.categories;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const calculateDiscount = (price, compareAtPrice) => {
        const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
        return Math.round(discount);
    };

    const renderCards = (categories, category) => {
        cardsContainer.innerHTML = '';
        const products = categories.find(cat => cat.category_name === category).category_products;

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `<div class="card-img">
                    ${product.badge_text ? `<p class="card-badge">${product.badge_text}</p>` : ''}
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="card-details">
                    <div class="title-vendor">
                        <h1 class="ProductName">${product.title.length > 10 ? product.title.substring(0, 10) + '...' : product.title}</h1>
                        <div>•</div>
                        <p class="ProductVendor">${product.vendor}</p>
                    </div>
                    <div class="price">
                        <p class="ProductPrice">₹${product.price}</p>
                        <p class="ProductComparePrice"><del>₹${product.compare_at_price}</del></p>
                        <p class="ProductDiscount">${calculateDiscount(product.price, product.compare_at_price)}% Off</p>
                    </div>
                </div>
                <button class="card-button">Add to cart</button>`;
            cardsContainer.appendChild(card);
        });
    };

    const categories = await fetchData();
    let activeCategory = 'Men';

    renderCards(categories, activeCategory);

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeCategory = button.getAttribute('data-category');
            renderCards(categories, activeCategory);
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});
