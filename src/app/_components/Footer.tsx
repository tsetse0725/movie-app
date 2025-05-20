"use client";

import { Mail, Phone, Film } from "lucide-react";

export default function Footer() {
  const handleClick = async () => {
    const id = "926393"; // Wicked movie example ID
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8`, // <-- өөрийнхөө TMDB Bearer Token оруулна
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log("🎬 Movie Detail:", data);
    } catch (error) {
      console.error("❌ Error:", error);
    }
  };
  return (
    <footer className="bg-[#3f34c4] text-white px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Logo */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Film className="text-white" />
            <span className="font-bold italic text-lg">Movie Z</span>
          </div>
          <p className="text-white/80 text-sm">
            &copy; 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        {/* Contact + Social */}
        <div className="flex flex-col md:flex-row gap-30 text-sm">
          {/* Contact */}
          <div className="flex flex-col gap-2">
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

          {/* Social Media */}
          <div className="flex flex-col md:items-start md:text-left items-center text-center">
            <h4 className="font-semibold mb-2">Follow us</h4>
            <div className="flex flex-col md:flex-row md:gap-4 gap-1">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
              >
                Facebook
              </a>
              <a href="#">Instagram</a>
              <a href="#">Twitter</a>
              <a href="#">Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
