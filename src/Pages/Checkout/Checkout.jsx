// src/Pages/Checkout/CheckoutPage.jsx
import React, { useMemo, useState } from "react";
import { CreditCard, Truck, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import useCartStore from "../../Stores/useCartStore";

export default function CheckoutPage() {
  // 🛒 اجلب عناصر السلة من الستور
  const items = useCartStore((s) => s.items);

  // delivery + payment selections
  const [delivery, setDelivery] = useState("free");
  const [payment, setPayment] = useState("cod");
  const [useExistingAddress, setUseExistingAddress] = useState(true);

  // 💰 الحسابات
  const subTotal = useMemo(
    () =>
      (items ?? []).reduce(
        (s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0),
        0
      ),
    [items]
  );
  const deliveryCharge = delivery === "flat" ? 5 : 0;
  const total = subTotal + deliveryCharge;

  const isEmpty = !items || items.length === 0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT — SUMMARY / DELIVERY / PAYMENT */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Summary */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Summary</h3>
            </div>

            <div className="p-4 text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Sub-Total</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>${deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-semibold text-gray-900 dark:text-white">
                <span>Total Amount</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Items — من السلة */}
              <div className="mt-4 space-y-3">
                {isEmpty ? (
                  <div className="text-xs text-gray-500">
                    Your cart is empty.{" "}
                    <Link to="/products" className="text-blue-600 hover:underline">
                      Continue shopping
                    </Link>
                  </div>
                ) : (
                  items.map((it) => (
                    <div key={it.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                        {it.image ? (
                          <img
                            src={it.image}
                            alt={it.title}
                            className="w-full h-full object-contain"
                            onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700" />
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                          {it.title}
                        </p>
                        <div className="text-xs mt-1 flex items-center gap-2">
                          <span className="text-gray-500">Qty: {it.qty}</span>
                          <span className="text-green-600 font-semibold">
                            ${Number(it.price).toFixed(2)}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-100">
                            ${(Number(it.price) * Number(it.qty)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <Truck size={18} />
              <h3 className="font-semibold text-gray-900 dark:text-white">Delivery Method</h3>
            </div>
            <div className="p-4 text-sm text-gray-700 dark:text-gray-300 space-y-3">
              <p>Please select the preferred shipping method to use on this order.</p>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="free"
                  checked={delivery === "free"}
                  onChange={(e) => setDelivery(e.target.value)}
                />
                Free Shipping <span className="ml-2 text-gray-500">(Rate: $0.00)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="delivery"
                  value="flat"
                  checked={delivery === "flat"}
                  onChange={(e) => setDelivery(e.target.value)}
                />
                Flat Rate <span className="ml-2 text-gray-500">(Rate: $5.00)</span>
              </label>

              <div className="mt-3">
                <p className="mb-1">Add Comments About Your Order</p>
                <textarea
                  rows={4}
                  className="w-full rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-none"
                  placeholder="Comments..."
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <CreditCard size={18} />
              <h3 className="font-semibold text-gray-900 dark:text-white">Payment Method</h3>
            </div>
            <div className="p-4 text-sm text-gray-700 dark:text-gray-300 space-y-3">
              <p>Please select the preferred payment method to use on this order.</p>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={payment === "cod"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                Cash On Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={payment === "upi"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                UPI
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={payment === "bank"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                Bank Transfer
              </label>

              <div className="mt-2 flex items-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                  alt="visa"
                  className="h-5"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                  alt="mc"
                  className="h-5"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/PayPal_Logo_Icon_2014.svg"
                  alt="pp"
                  className="h-5"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT — ACCOUNT + BILLING */}
        <div className="lg:col-span-8 space-y-6">
          {/* New / Returning Customer */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">New Customer</h3>
            </div>
            <div className="p-4 md:p-6">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="acct" defaultChecked /> Register Account
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="acct" /> Guest Account
                  </label>
                </div>
                <p className="mt-2 text-xs">
                  By creating an account you will be able to shop faster, be up to date on an order’s
                  status, and keep track of the orders you have previously made.
                </p>
                <button className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                  Continue
                </button>
              </div>

              {/* Returning Customer */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Returning Customer</h4>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
                  />
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                    Login
                  </button>
                  <button className="text-sm text-gray-600 dark:text-gray-300 hover:underline">
                    Forgot Password?
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Billing Details */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Billing Details</h3>
            </div>

            <div className="p-4 md:p-6">
              {/* address switch */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700 dark:text-gray-300 mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="addr"
                    checked={useExistingAddress}
                    onChange={() => setUseExistingAddress(true)}
                  />
                  I want to use an existing address
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="addr"
                    checked={!useExistingAddress}
                    onChange={() => setUseExistingAddress(false)}
                  />
                  I want to use new address
                </label>
              </div>

              {useExistingAddress ? (
                <div className="rounded border border-dashed border-gray-300 dark:border-gray-700 p-4 text-sm text-gray-600 dark:text-gray-300">
                  Using saved address ending in <strong>…221B Baker Street, London</strong>.
                </div>
              ) : (
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">First Name*</label>
                    <input className="w-full rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Last Name*</label>
                    <input className="w-full rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-1">Address</label>
                    <input className="w-full rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">City*</label>
                    <div className="relative">
                      <select className="appearance-none w-full pr-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
                        <option>City</option>
                        <option>Cairo</option>
                        <option>Toronto</option>
                        <option>Dubai</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Post Code</label>
                    <input className="w-full rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2" />
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Country*</label>
                    <div className="relative">
                      <select className="appearance-none w-full pr-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
                        <option>Country</option>
                        <option>Egypt</option>
                        <option>USA</option>
                        <option>Canada</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Region/State</label>
                    <div className="relative">
                      <select className="appearance-none w-full pr-8 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2">
                        <option>Region/State</option>
                        <option>Giza</option>
                        <option>Ontario</option>
                        <option>Dubai</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" size={16} />
                    </div>
                  </div>
                </form>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded disabled:opacity-60"
                  disabled={isEmpty}
                  title={isEmpty ? "Your cart is empty" : "Place Order"}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* /RIGHT */}
      </div>
    </section>
  );
}

