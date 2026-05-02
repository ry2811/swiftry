import React from 'react';
import { Mail, BookOpen, Palette, Music, Instagram, Facebook, Twitter, Heart, Star, CheckCircle } from 'lucide-react';

export default function App() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    alert(`Cảm ơn bạn đã đăng ký với email: ${email}. Chúng tôi sẽ liên hệ sớm!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-pink-500" />
          <h1 className="text-2xl font-bold text-pink-600">Hạ An</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#about" className="hover:text-pink-500 transition">Giới Thiệu</a>
          <a href="#talents" className="hover:text-pink-500 transition">Tài Năng</a>
          <a href="#gallery" className="hover:text-pink-500 transition">Tranh Vẽ</a>
          <a href="#contact" className="hover:text-pink-500 transition">Liên Hệ</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Chào mừng đến với thế giới của <span className="text-pink-600">Hạ An</span></h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">Một cô gái tài năng với trái tim ấm áp, xuất sắc trong văn học, hội họa và âm nhạc.</p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              name="email"
              placeholder="Nhập email của bạn để nhận tin tức"
              required
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center justify-center transition"
            >
              <Mail className="mr-2 h-5 w-5" /> Đăng Ký Ngay
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">Chúng tôi tôn trọng quyền riêng tư của bạn. Không spam.</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Về Hạ An</h2>
          <p className="text-lg text-gray-700 mb-6">Hạ An là một cô gái đa tài, luôn tỏa sáng với sự sáng tạo và đam mê. Cô ấy không chỉ học giỏi văn mà còn có khả năng vẽ tranh tuyệt đẹp và hát hay, mang lại niềm vui cho mọi người xung quanh.</p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span>Học giỏi Văn</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span>Vẽ tranh đẹp</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span>Hát hay</span>
            </div>
          </div>
        </div>
      </section>

      {/* Talents Section */}
      <section id="talents" className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Tài Năng Nổi Bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-pink-50 p-6 rounded-xl shadow-md text-center">
              <BookOpen className="h-12 w-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Học Giỏi Văn</h3>
              <p className="text-gray-700">Hạ An có khả năng viết lách xuất sắc, với những bài văn giàu cảm xúc và sâu sắc, luôn đạt điểm cao.</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-xl shadow-md text-center">
              <Palette className="h-12 w-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Vẽ Tranh Đẹp</h3>
              <p className="text-gray-700">Tranh của cô ấy sống động và đầy màu sắc, thể hiện tâm hồn nghệ thuật và sự tỉ mỉ trong từng nét vẽ.</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-xl shadow-md text-center">
              <Music className="h-12 w-12 text-pink-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hát Hay</h3>
              <p className="text-gray-700">Giọng hát ngọt ngào và truyền cảm của Hạ An có thể chạm đến trái tim của bất kỳ ai lắng nghe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Tranh Vẽ Của Hạ An</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-pink-200 to-purple-200 flex items-center justify-center">
                <Palette className="h-16 w-16 text-pink-500" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900">Tác phẩm {i}</h3>
                <p className="text-gray-600 text-sm">Một bức tranh đẹp thể hiện tài năng của Hạ An.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Kết Nối Với Hạ An</h2>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Tên của bạn</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Nhập tên" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Nhập email" required />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Lời nhắn</label>
                <textarea className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" rows={4} placeholder="Viết lời nhắn cho Hạ An..." required></textarea>
              </div>
              <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center transition">
                <CheckCircle className="mr-2 h-5 w-5" /> Gửi Tin Nhắn
              </button>
            </form>
            <div className="flex justify-center space-x-6 mt-8">
              <a href="#" className="text-gray-600 hover:text-pink-500 transition"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-gray-600 hover:text-pink-500 transition"><Twitter className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-gray-600">
        <p>© 2023 Hạ An. Tất cả quyền được bảo lưu. Được tạo với <Heart className="inline h-4 w-4 text-pink-500" />.</p>
        <p className="text-sm mt-2">Trang web này được thiết kế để giới thiệu tài năng của Hạ An và thu thập email từ người hâm mộ.</p>
      </footer>
    </div>
  );
}
