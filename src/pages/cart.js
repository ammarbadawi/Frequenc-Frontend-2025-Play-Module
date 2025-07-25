import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrash, 
  faMinus, 
  faPlus, 
  faArrowLeft,
  faShoppingCart,
  faCreditCard,
  faLock,
  faTruck,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../styles/cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Mock cart data - in a real app, this would come from context or API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCartItems([
        {
          id: 1,
          name: "Tennis Court Booking - Central Park",
          venue: "Central Park Tennis Center",
          date: "2024-02-15",
          time: "14:00 - 16:00",
          price: 45.00,
          quantity: 1,
          image: "/images/select-sport-img-1.png.png",
          type: "court_booking"
        },
        {
          id: 2,
          name: "Tennis Racket - Professional Series",
          brand: "Wilson",
          price: 89.99,
          quantity: 1,
          image: "/images/select-sport-img-2.png.png",
          type: "equipment"
        },
        {
          id: 3,
          name: "Tennis Balls Pack (3 cans)",
          brand: "Penn",
          price: 12.50,
          quantity: 2,
          image: "/images/select-sport-img-3.png.png",
          type: "equipment"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const applyCoupon = () => {
    if (couponCode.trim() === "") return;
    
    // Mock coupon validation
    if (couponCode.toLowerCase() === "welcome10") {
      setAppliedCoupon({
        code: couponCode,
        discount: 10,
        type: "percentage"
      });
      setCouponCode("");
    } else {
      alert("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = calculateSubtotal();
    return appliedCoupon.type === "percentage" 
      ? (subtotal * appliedCoupon.discount) / 100 
      : appliedCoupon.discount;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = subtotal > 50 ? 0 : 5.99;
    return subtotal - discount + shipping;
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to checkout or payment gateway
    alert("Proceeding to checkout...");
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/marketplace" className="btn btn-primary">
              <FontAwesomeIcon icon={faArrowLeft} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3>{item.name}</h3>
                  {item.brand && <p className="item-brand">{item.brand}</p>}
                  {item.venue && <p className="item-venue">{item.venue}</p>}
                  {item.date && item.time && (
                    <p className="item-schedule">
                      {item.date} • {item.time}
                    </p>
                  )}
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="item-quantity">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>

                <div className="item-total">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <button 
                  className="remove-item"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-header">
              <h3>Order Summary</h3>
            </div>

            <div className="summary-content">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>

              {appliedCoupon && (
                <div className="summary-row discount">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-${calculateDiscount().toFixed(2)}</span>
                </div>
              )}

              <div className="summary-row">
                <span>Shipping</span>
                <span>{calculateSubtotal() > 50 ? 'Free' : '$5.99'}</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>

              {calculateSubtotal() < 50 && (
                <div className="free-shipping-notice">
                  <FontAwesomeIcon icon={faTruck} />
                  <span>Add ${(50 - calculateSubtotal()).toFixed(2)} more for free shipping</span>
                </div>
              )}
            </div>

            <div className="coupon-section">
              <h4>Have a coupon?</h4>
              <div className="coupon-input">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && applyCoupon()}
                />
                <button onClick={applyCoupon}>Apply</button>
              </div>
              {appliedCoupon && (
                <div className="applied-coupon">
                  <span>{appliedCoupon.code}</span>
                  <button onClick={removeCoupon}>Remove</button>
                </div>
              )}
            </div>

            <div className="checkout-section">
              <button 
                className="btn btn-checkout"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                <FontAwesomeIcon icon={faCreditCard} />
                Proceed to Checkout
                <FontAwesomeIcon icon={faLock} />
              </button>
              
              <div className="secure-checkout">
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </div>

            <div className="continue-shopping">
              <Link to="/marketplace" className="btn btn-secondary">
                <FontAwesomeIcon icon={faArrowLeft} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 