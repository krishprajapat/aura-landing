import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ShippingReturns() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="mb-12">
          <h1 className="font-anonymous text-4xl md:text-5xl font-bold text-brand-dark-brown mb-4">
            Shipping & Returns
          </h1>
          <p className="font-dm-sans text-gray-600 text-lg">
            Everything you need to know about our shipping and return policies
          </p>
        </div>

        <div className="prose prose-lg max-w-none font-dm-sans">
          
          {/* Shipping Section */}
          <section className="mb-12">
            <h2 className="font-anonymous text-3xl font-bold text-brand-dark-brown mb-6">
              Shipping Information
            </h2>

            <div className="mb-8">
              <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-4">
                Shipping Options & Delivery Times
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-brand-warm-beige">
                      <th className="border border-gray-300 px-4 py-3 text-left font-anonymous font-bold">Shipping Method</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-anonymous font-bold">Delivery Time</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-anonymous font-bold">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Standard Shipping</td>
                      <td className="border border-gray-300 px-4 py-3">5-7 business days</td>
                      <td className="border border-gray-300 px-4 py-3">$8.95 (Free on orders $150+)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Express Shipping</td>
                      <td className="border border-gray-300 px-4 py-3">2-3 business days</td>
                      <td className="border border-gray-300 px-4 py-3">$15.95</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Overnight Shipping</td>
                      <td className="border border-gray-300 px-4 py-3">1 business day</td>
                      <td className="border border-gray-300 px-4 py-3">$25.95</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-4">
                Order Processing
              </h3>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
                <li>Orders are processed Monday through Friday, excluding holidays</li>
                <li>Orders placed before 2:00 PM EST ship the same business day</li>
                <li>Orders placed after 2:00 PM EST or on weekends ship the next business day</li>
                <li>You will receive a confirmation email with tracking information once your order ships</li>
                <li>Custom or personalized items may require additional processing time</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-4">
                International Shipping
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We currently ship to select international destinations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
                <li><strong>Canada:</strong> 7-14 business days, starting at $19.95</li>
                <li><strong>United Kingdom:</strong> 10-21 business days, starting at $24.95</li>
                <li><strong>European Union:</strong> 10-21 business days, starting at $29.95</li>
                <li><strong>Australia:</strong> 14-28 business days, starting at $34.95</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-6">
                <strong>Note:</strong> International customers are responsible for all customs duties, taxes, and fees. These charges are not included in your order total and will be collected by the shipping carrier upon delivery.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-4">
                Shipping Restrictions
              </h3>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
                <li>We do not ship to P.O. boxes for express or overnight shipping</li>
                <li>Some items may have shipping restrictions due to size or weight</li>
                <li>Delivery to rural or remote areas may require additional time</li>
                <li>We reserve the right to select the shipping carrier for your order</li>
              </ul>
            </div>
          </section>

          {/* Returns Section */}
          <section className="mb-12">
            <h2 className="font-anonymous text-3xl font-bold text-brand-dark-brown mb-6">
              Returns & Exchanges
            </h2>

            <div className="mb-8">
              <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-4">
                30-Day Return Policy
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We want you to love your Vecteur purchase. If you're not completely satisfied, you may return eligible items within 30 days of delivery for a full refund or exchange.
              </p>
              <div className="bg-brand-warm-beige p-6 rounded-lg mb-6">
                <h4 className="font-anonymous text-lg font-bold text-brand-dark-brown mb-3">Return Requirements:</h4>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                  <li>Items must be unworn, unwashed, and in original condition</li>
                  <li>All original tags and labels must be attached</li>
                  <li>Items must be returned in original packaging when applicable</li>
                  <li>Original receipt or proof of purchase required</li>
                  <li>Return must be initiated within 30 days of delivery</li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-4">
                How to Return an Item
              </h3>
              <ol className="list-decimal pl-6 text-gray-700 leading-relaxed mb-6">
                <li className="mb-2"><strong>Initiate your return:</strong> Log into your account or email us at returns@vecteur.com</li>
                <li className="mb-2"><strong>Print return label:</strong> We'll email you a prepaid return shipping label</li>
                <li className="mb-2"><strong>Package your item:</strong> Place item(s) in original packaging or a suitable box</li>
                <li className="mb-2"><strong>Attach label:</strong> Securely attach the return label to your package</li>
                <li className="mb-2"><strong>Drop off:</strong> Take your package to any authorized shipping location</li>
                <li><strong>Tracking:</strong> Keep your receipt and track your return using the provided tracking number</li>
              </ol>
            </div>

            <div className="mb-8">
              <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-4">
                Exchange Policy
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We offer exchanges for different sizes or colors of the same item, subject to availability:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
                <li>Exchanges must meet the same requirements as returns</li>
                <li>Size and color exchanges are free (we cover return shipping)</li>
                <li>If the new item has a different price, you'll be charged or refunded the difference</li>
                <li>Exchange items ship once we receive your returned item</li>
                <li>If your desired size/color is unavailable, we'll process a refund</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-4">
                Non-Returnable Items
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The following items cannot be returned:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
                <li>Personalized or customized items</li>
                <li>Intimate apparel (underwear, swimwear)</li>
                <li>Items marked as "Final Sale"</li>
                <li>Gift cards</li>
                <li>Items returned after 30 days</li>
                <li>Items that show signs of wear, damage, or alterations</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="font-anonymous text-xl font-semibold text-brand-sage mb-4">
                Refund Processing
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Refund timeline and process:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-6">
                <li>Refunds are processed within 3-5 business days of receiving your return</li>
                <li>Refunds are issued to the original payment method</li>
                <li>Credit card refunds may take 5-10 business days to appear on your statement</li>
                <li>PayPal refunds are typically processed within 3-5 business days</li>
                <li>Original shipping charges are non-refundable (unless item was defective)</li>
                <li>You'll receive an email confirmation when your refund is processed</li>
              </ul>
            </div>
          </section>

          {/* Damaged or Defective Items */}
          <section className="mb-12">
            <h2 className="font-anonymous text-3xl font-bold text-brand-dark-brown mb-6">
              Damaged or Defective Items
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              If you receive a damaged or defective item, please contact us immediately:
            </p>
            
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
              <h4 className="font-anonymous text-lg font-bold text-red-800 mb-3">Report Within 48 Hours</h4>
              <p className="text-red-700 leading-relaxed mb-4">
                Please report any damage or defects within 48 hours of delivery for the fastest resolution.
              </p>
              <ul className="list-disc pl-6 text-red-700 leading-relaxed">
                <li>Email us at quality@vecteur.com with photos of the issue</li>
                <li>Include your order number and description of the problem</li>
                <li>We'll provide a prepaid return label and rush a replacement</li>
                <li>No need to return packaging for damaged items</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="font-anonymous text-3xl font-bold text-brand-dark-brown mb-6">
              Need Help?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our customer service team is here to help with any shipping or return questions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-brand-warm-beige p-6 rounded-lg">
                <h4 className="font-anonymous text-lg font-bold text-brand-dark-brown mb-3">Customer Service</h4>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>Email:</strong> support@vecteur.com
                </p>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Hours:</strong> Mon-Fri 9AM-6PM EST
                </p>
              </div>
              
              <div className="bg-brand-warm-beige p-6 rounded-lg">
                <h4 className="font-anonymous text-lg font-bold text-brand-dark-brown mb-3">Returns Department</h4>
                <p className="text-gray-700 leading-relaxed mb-2">
                  <strong>Email:</strong> returns@vecteur.com
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Address:</strong><br />
                  Vecteur Returns<br />
                  123 Fashion District Street<br />
                  New York, NY 10013
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
