// dodaj event listener na svaki delete gumb
document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', async function() {
        // dobi productId
        const productId = this.id.split('-')[1];

        // fetchaj sve sto treba s /cart/remove/productId (usput umanji counter na cart.routes.js)
        const response = await fetch(`/cart/remove/${productId}`);
        const { cart, totalCount } = await response.json();

        // postavi quantity element na stranici na trenutnu vrijednost countera za item
        document.getElementById(`quantity-${productId}`).textContent = cart[productId] || 0;
    });
});

// dodaj event listener na svaki add gumb
document.querySelectorAll('.add-button').forEach(button => {
    button.addEventListener('click', async function() {
        // dobi productId
        const productId = this.id.split('-')[1];

        // fetchaj sve sto treba s /cart/add/productId (usput uvecaj counter na cart.routes.js)
        const response = await fetch(`/cart/add/${productId}`);
        const { cart, totalCount } = await response.json();

        // postavi quantity element na stranici na trenutnu vrijednost countera za item
        document.getElementById(`quantity-${productId}`).textContent = cart[productId] || 0;
    });
});
