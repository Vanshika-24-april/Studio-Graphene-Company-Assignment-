document.addEventListener("DOMContentLoaded", function () {
    // Dynamic navigation menu
    const navbar = [
        { name: 'Home', id: 'home'},
        { name: 'About', id: 'about' },
        { name: 'Our Products', id: 'product', child: [
            { name: 'Product 1', id: 'p1'},
            { name: 'Product 2', id: 'p2' },
            { name: 'Product 3', id: 'p3'},
            { name: 'Product 4', id: 'p4' },
        ] },
        { name: 'Contact Us', id: 'contact'},
    ];

    const navList = document.querySelector('.nav-list');
    navbar.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${item.id}`;
        a.textContent = item.name;
        li.appendChild(a);

        if (item.child) {
            const subMenu = document.createElement('ul');
            item.child.forEach(subItem => {
                const subLi = document.createElement('li');
                const subA = document.createElement('a');
                subA.href = `#${subItem.id}`;
                subA.textContent = subItem.name;
                subLi.appendChild(subA);
                subMenu.appendChild(subLi);
            });
            li.appendChild(subMenu);
        }

        navList.appendChild(li);
    });

    // Fetch and display product data from the API
    const productApiUrl = 'https://fakestoreapi.com/products';
    
    fetch(productApiUrl)
        .then(response => response.json())
        .then(products => {
            const productSection = document.querySelector('.product-list');
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                productItem.innerHTML = `
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <strong>$${product.price}</strong>
                `;
                productSection.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
        });

    // Form validation
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Please fill out all fields.');
            return;
        }

        // Additional validation logic can be added here

        // If all validation passes, you can submit the form
        alert('Form submitted successfully!');
        contactForm.reset();
    });
});       
                    
            