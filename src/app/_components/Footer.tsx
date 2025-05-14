"use client";

import { Mail, Phone, Film } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#4338ca] text-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Film className="text-white" />
            <span className="font-bold italic">Movie Z</span>
          </div>
          <p className="text-white/70 text-sm">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-semibold">Contact Information</h4>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email: support@movieZ.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>Phone: +976 (11) 123-4567</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h4 className="font-semibold">Follow us</h4>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <a href="#" className="hover:underline">
              Twitter
            </a>
            <a href="#" className="hover:underline">
              Youtube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
