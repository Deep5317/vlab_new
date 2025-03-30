import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Vlabs</h3>
            <p className="text-blue-200">Interactive virtual physics experiments for students and educators.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-blue-200 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-blue-200 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-blue-200 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-blue-200 hover:text-white">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/experiments" className="text-blue-200 hover:text-white">
                  Experiments
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-200 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-blue-200 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic text-blue-200">
              <p>Email: info@vlabs.edu</p>
              <p>Phone: +1 (123) 456-7890</p>
              <p>Address: 123 Education St, Science City, SC 12345</p>
            </address>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
          <p>&copy; {new Date().getFullYear()} Vlabs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

