document.addEventListener('DOMContentLoaded', function() {
	const changeQuantityButtons = document.querySelectorAll('.change-quantity');

	changeQuantityButtons.forEach(button => {
		button.addEventListener('click', function() {
			const productId = this.dataset.productId;
			const action = this.dataset.action;

			let cart = JSON.parse(localStorage.getItem('cart')) || [];

			const existingItem = cart.find(item => item.id === productId);

			if (existingItem) {
				if (action === 'add') {
					existingItem.quantity++;
				} else if (action === 'remove') {
					existingItem.quantity--;

					if (existingItem.quantity <= 0) {
						cart = cart.filter(item => item.id !== productId);
					}
				}

				localStorage.setItem('cart', JSON.stringify(cart));

				if (action === 'add') {
					alert('Количество товара увеличено!');
				} else {
					alert('Количество товара уменьшено!');
				}

			} else {
				 if (action === 'remove'){
						 return;
				 }

				const productCard = this.closest('.itemCardProduct_mainBlock');
				const productName = productCard.dataset.productName;
				const productPrice = productCard.dataset.productPrice;
				const productImage = productCard.dataset.productImage;

				cart.push({
					id: productId,
					name: productName,
					price: productPrice,
					image: productImage,
					quantity: 1
				});

				localStorage.setItem('cart', JSON.stringify(cart));
				 alert('Товар добавлен в корзину!');
			}

		});
	});
});
document.addEventListener('DOMContentLoaded', function() {
	const cartItemsContainer = document.getElementById('cart-items');
	const totalPriceElement = document.getElementById('total-price');

	// Функция для пересчета и отображения корзины
	function renderCart() {
		// Получаем корзину из LocalStorage
		const cart = JSON.parse(localStorage.getItem('cart')) || [];

		let totalPrice = 0;

		// Отображаем товары в корзине
		if (cart.length === 0) {
			cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
		} else {
			let cartHtml = '';
			cart.forEach(item => {
				cartHtml += `
					<div class="cart-item">
						<img class="imgBasket_item" src="${item.image}" alt="${item.name}">
						<div>
							<p>${item.name} x ${item.quantity}</p>
							<p>Цена: ${item.price} ₽</p>
							<p>Итого: ${item.price * item.quantity} ₽</p>
							<button class="remove-from-cart" data-product-id="${item.id}">Удалить</button>
							<button class='change-quantity' data-product-id="${item.id}" data-action="add">+</button>
							<button class='change-quantity' data-product-id="${item.id}" data-action="remove">-</button>
						</div>
					</div>
				`;
				totalPrice += item.price * item.quantity;
			});
			cartItemsContainer.innerHTML = cartHtml;
		}

		// Отображаем общую стоимость
		totalPriceElement.textContent = `Итого: ${totalPrice} ₽`;

		// Обновляем LocalStorage (необходимо после каждого изменения корзины)
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	 // Обработчики событий на странице корзины
	 cartItemsContainer.addEventListener('click', function(event) {
				if (event.target.classList.contains('remove-from-cart')) {
						const productId = event.target.dataset.productId;
						// Удаляем товар из корзины
						let cart = JSON.parse(localStorage.getItem('cart')) || [];
						cart = cart.filter(item => item.id !== productId);
						localStorage.setItem('cart', JSON.stringify(cart));
						renderCart(); // Перерисовываем корзину
				}

			 if (event.target.classList.contains('change-quantity')) {
						const productId = event.target.dataset.productId;
						const action = event.target.dataset.action;

						let cart = JSON.parse(localStorage.getItem('cart')) || [];
						const existingItem = cart.find(item => item.id === productId);

						 if (existingItem) {
								if (action === 'add') {
									existingItem.quantity++;
								} else if (action === 'remove') {
									existingItem.quantity--;

									// Если количество стало 0, удаляем товар из корзины
									if (existingItem.quantity <= 0) {
										cart = cart.filter(item => item.id !== productId);
									}
								}

								localStorage.setItem('cart', JSON.stringify(cart));
								 renderCart(); // Перерисовываем корзину
						 }
			 }
		});

	// Инициализация корзины при загрузке страницы
	renderCart();
});