// app/ad-price-breakdown/page.tsx
import React from 'react';
import Link from 'next/link';
import { Check, X, ArrowRight, Info } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertising Opportunities - Ontario Pulse',
  description: 'Premium advertising opportunities to reach engaged Ontario readers interested in local news, lifestyle, and trends.',
};

const AdPriceBreakdownPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Advertising With Ontario Pulse</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect your brand with our engaged community of Ontario readers interested in local news, lifestyle trends, and Canadian culture.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="mailto:oonkoo.mail@gmail.com" 
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Request Media Kit
            </Link>
            <Link 
              href="mailto:oonkoo.mail@gmail.com" 
              className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Advertise With Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Engaged Audience</h3>
              <p className="text-gray-600">
                Our readers are actively seeking local Ontario information, with an average session duration of 4+ minutes.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <path d="M3 3v18h18"></path>
                  <path d="M18 9l-6-6-7 5-3 10"></path>
                  <path d="M14 10l1 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Growing Readership</h3>
              <p className="text-gray-600">
                Our traffic increases consistently month-over-month, with 65% coming from targeted Ontario regions.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Brand Safety</h3>
              <p className="text-gray-600">
                We maintain high editorial standards, ensuring your brand appears alongside quality, trusted content.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Advertising Packages</h2>
          <p className="text-gray-600 mb-8">Choose the perfect advertising solution for your brand and budget.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Standard Package */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col h-full">
              <div className="bg-gray-50 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">Standard</h3>
                <p className="text-sm text-gray-500">Perfect for small businesses</p>
              </div>
              
              <div className="p-6 flex-grow">
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">$150</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Sidebar ad placement (300×250)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Appears on relevant category pages</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Mobile responsive design</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Monthly performance report</span>
                  </li>
                  <li className="flex items-start">
                    <X className="text-gray-300 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-gray-400">Homepage placement</span>
                  </li>
                </ul>
              </div>
              
              <div className="px-6 pb-6">
                <Link href="mailto:oonkoo.mail@gmail.com" className="block text-center py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
            
            {/* Premium Package */}
            <div className="bg-white rounded-xl overflow-hidden border-2 border-red-500 shadow-md flex flex-col h-full relative">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                POPULAR
              </div>
              
              <div className="bg-red-50 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">Premium</h3>
                <p className="text-sm text-gray-500">Ideal for growing brands</p>
              </div>
              
              <div className="p-6 flex-grow">
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">$350</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Homepage banner placement (728×90)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>In-content ad on article pages (336×280)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Mobile responsive design</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Bi-weekly performance reports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Ad creative consultation</span>
                  </li>
                </ul>
              </div>
              
              <div className="px-6 pb-6">
                <Link href="mailto:oonkoo.mail@gmail.com" className="block text-center py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
                  Get Started
                </Link>
              </div>
            </div>
            
            {/* Enterprise Package */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex flex-col h-full">
              <div className="bg-gray-50 px-6 py-4">
                <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
                <p className="text-sm text-gray-500">Maximum brand exposure</p>
              </div>
              
              <div className="p-6 flex-grow">
                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900">$750</span>
                  <span className="text-gray-500 ml-1">/month</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Premium placement across all ad positions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Category exclusivity (no competing brands)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>One sponsored content article</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Weekly performance reports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
              </div>
              
              <div className="px-6 pb-6">
                <Link href="mailto:oonkoo.mail@gmail.com" className="block text-center py-2 px-4 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">À La Carte Ad Placements</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-4 border-b border-gray-200 font-semibold">Ad Position</th>
                  <th className="text-left px-6 py-4 border-b border-gray-200 font-semibold">Size</th>
                  <th className="text-left px-6 py-4 border-b border-gray-200 font-semibold">Monthly Rate</th>
                  <th className="text-left px-6 py-4 border-b border-gray-200 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">Homepage Banner</td>
                  <td className="px-6 py-4 border-b border-gray-200">728×90px</td>
                  <td className="px-6 py-4 border-b border-gray-200">$300</td>
                  <td className="px-6 py-4 border-b border-gray-200">Prime visibility on our homepage</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">Sidebar Rectangle</td>
                  <td className="px-6 py-4 border-b border-gray-200">300×250px</td>
                  <td className="px-6 py-4 border-b border-gray-200">$150</td>
                  <td className="px-6 py-4 border-b border-gray-200">Appears on article and category pages</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">In-Content Rectangle</td>
                  <td className="px-6 py-4 border-b border-gray-200">336×280px</td>
                  <td className="px-6 py-4 border-b border-gray-200">$200</td>
                  <td className="px-6 py-4 border-b border-gray-200">Embedded within article content</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">Footer Banner</td>
                  <td className="px-6 py-4 border-b border-gray-200">728×90px</td>
                  <td className="px-6 py-4 border-b border-gray-200">$175</td>
                  <td className="px-6 py-4 border-b border-gray-200">Site-wide visibility at page bottom</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200">Mobile Banner</td>
                  <td className="px-6 py-4 border-b border-gray-200">320×100px</td>
                  <td className="px-6 py-4 border-b border-gray-200">$225</td>
                  <td className="px-6 py-4 border-b border-gray-200">Optimized for mobile visitors</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-500 flex items-start">
            <Info className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
            <p>All prices are in Canadian dollars. Volume discounts available for 3+ month commitments.</p>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sponsored Content</h2>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Native Content Opportunities</h3>
            <p className="text-gray-600 mb-6">
              Connect with our audience through in-depth sponsored articles written by our professional content team.
              All sponsored content is clearly labeled and crafted to provide genuine value to our readers.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="font-semibold text-red-600">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Single Sponsored Article</h4>
                  <p className="text-gray-600">Custom article on your chosen topic, featured for one week: $500</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="font-semibold text-red-600">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Series Package (3 Articles)</h4>
                  <p className="text-gray-600">Three-part content series published over three months: $1,200</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="font-semibold text-red-600">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Premium Content Package</h4>
                  <p className="text-gray-600">Article + social media promotion + newsletter feature: $800</p>
                </div>
              </div>
            </div>
            
            <Link href="mailto:oonkoo.mail@gmail.com" className="inline-flex items-center text-red-500 hover:text-red-600 font-medium">
              Request Content Guidelines
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
        
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Advertisers Say</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                    TF
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Thomas Franklin</h4>
                  <p className="text-sm text-gray-500">Marketing Director, Ontario Real Estate Group</p>
                </div>
              </div>
              <blockquote className="text-gray-600 italic">
                "Our campaign with Ontario Pulse exceeded expectations. The team was responsive and the detailed reporting helped us understand our ROI. We saw a 28% increase in qualified leads from the Toronto area."
              </blockquote>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                    SL
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Lee</h4>
                  <p className="text-sm text-gray-500">Owner, Maple Craft Brewery</p>
                </div>
              </div>
              <blockquote className="text-gray-600 italic">
                "As a small business, we were cautious about ad spending. Ontario Pulse delivered excellent value with their targeted audience. Our sidebar ads brought in new customers who specifically mentioned seeing us on the site."
              </blockquote>
            </div>
          </div>
        </section>
        
        <section>
          <div className="bg-red-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Grow Your Brand with Ontario Pulse?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our advertising team is ready to create a custom campaign to help you reach our engaged Ontario audience.
            </p>
            <div className="flex justify-center">
              <Link 
                href="mailto:oonkoo.mail@gmail.com" 
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdPriceBreakdownPage;