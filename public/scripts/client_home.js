// dohvati potrebne elemente
const cartImages = document.querySelectorAll('.cart-image');
const totalCounter = document.querySelector('.counter');

// na svaki cart image postavi eventListener
cartImages.forEach(img => {
    img.addEventListener('click', async function() {
      // dobi product name
      const productName = this.nextElementSibling.id.split('-')[1];
      
      // fetchaj sve sto treba s /cart/add/productId (usput uvecaj counter na cart.routes.js)
      const response = await fetch(`/cart/add/${productName}`);
      const { cart, totalCount } = await response.json();

      // dobavi counter za trenutni product i postavi mu vrijednost
      const counter = document.getElementById(`counter-${productName}`);
      counter.textContent = cart[productName] || 0;

      // updateaj totalni counter
      totalCounter.textContent = totalCount;
    });
});
