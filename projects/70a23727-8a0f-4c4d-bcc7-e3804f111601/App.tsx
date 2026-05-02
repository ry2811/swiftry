import React, { useState } from 'react';
import { 
  Mail, Music, Trophy, Star, User, Send, Target, Heart, 
  Layout, Activity 
} from 'lucide-react';

// --- Types ---
type FormData = {
  name: string;
  email: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function PortfolioApp() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  // --- Handlers ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Giả lập gọi API
    setTimeout(() => {
      if (formData.email && formData.name) {
        setFormStatus('success');
        setFormData({ name: '', email: '' });
        setTimeout(() => setFormStatus('idle'), 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    }, 1000);
  };

  // --- Data ---
  const passions = [
    {
      icon: Layout,
      title: 'Cờ Vua',
      description: 'Chơi cờ vua từ nhỏ, đạt nhiều giải thưởng trong các giải đấu địa phương và quốc gia.',
      color: 'bg-blue-100 text-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      icon: Activity,
      title: 'Bóng Rổ',
      description: 'Cầu thủ bóng rổ năng động, tham gia đội tuyển trường và các giải phong trào.',
      color: 'bg-orange-100 text-orange-800',
      iconColor: 'text-orange-600'
    },
    {
      icon: Music,
      title: 'Guitar',
      description: 'Đam mê âm nhạc, chơi guitar trong 5 năm và thường xuyên biểu diễn tại các sự kiện.',
      color: 'bg-purple-100 text-purple-800',
      iconColor: 'text-purple-600'
    }
  ];

  const achievements = [
    'Vô địch cờ vua trẻ thành phố 2023',
    'Huy chương vàng giải bóng rổ sinh viên',
    'Biểu diễn guitar tại 20+ sự kiện',
    'Huấn luyện viên cờ vua cho trẻ em'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 font-sans">
      {/* Header Section */}
      <header className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Minh Hoàng</h1>
            <p className="text-xl text-gray-600 mb-6 font-medium">Vận động viên - Nghệ sĩ - Người truyền cảm hứng</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {['Cờ Vua', 'Bóng Rổ', 'Guitar'].map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-200 text-sm font-semibold">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="w-56 h-56 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-1.5 shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                <User size={130} className="text-gray-300" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white p-3 rounded-full shadow-lg border-4 border-white">
              <Trophy size={28} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-20">
        {/* Intro */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Xin chào, tôi là ai?</h2>
            <p className="text-lg text-gray-600 leading-relaxed italic">
              "Tôi tin rằng sự cân bằng giữa trí tuệ, thể chất và cảm xúc là chìa khóa cho một cuộc sống trọn vẹn. 
              Mỗi ván cờ là một bài toán chiến thuật, mỗi trận đấu bóng rổ là bài học về đồng đội, 
              và mỗi bản nhạc là sự kết nối tâm hồn."
            </p>
          </div>
        </section>

        {/* Passions Grid */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-12">Đam Mê</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {passions.map((passion, index) => {
              const Icon = passion.icon;
              return (
                <div key={index} className={`${passion.color} rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 group`}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-2xl ${passion.iconColor} bg-white mb-6 shadow-sm group-hover:rotate-12 transition-transform`}>
                      <Icon size={36} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{passion.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{passion.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements Card */}
        <section className="mb-24">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-5xl mx-auto border border-gray-100">
            <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-3">
              <Trophy className="text-yellow-500" />
              Thành Tích Nổi Bật
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-green-500 group-hover:scale-110 transition-transform">
                    <Target size={22} />
                  </div>
                  <span className="text-lg font-medium text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="max-w-3xl mx-auto">
          <div className="bg-gray-900 rounded-[2rem] shadow-2xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-block p-4 bg-blue-500/20 rounded-2xl mb-4">
                  <Mail size={40} className="text-blue-400" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Kết Nối Ngay!</h2>
                <p className="text-gray-400 text-lg">
                  Đăng ký để nhận thông tin về các buổi biểu diễn và giải đấu mới nhất.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Họ và tên</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="Nguyễn Văn A"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`w-full py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    formStatus === 'submitting'
                      ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 active:scale-95'
                  }`}
                >
                  {formStatus === 'submitting' ? (
                    'Đang xử lý...'
                  ) : (
                    <>
                      <Send size={22} />
                      Gửi thông tin
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {formStatus === 'success' && (
                  <div className="animate-bounce-in text-center p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 font-medium">
                    ✨ Cảm ơn bạn! Tôi sẽ phản hồi sớm nhé.
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="text-center p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 font-medium">
                    ⚠️ Có lỗi xảy ra, thử lại sau nhé!
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold text-xl text-gray-800 mb-2">© 2026 Minh Hoàng</p>
          <p className="text-gray-500">Kết nối đam mê - Lan tỏa cảm hứng</p>
          <div className="mt-6 flex justify-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-500 cursor-pointer">
              <Heart size={18} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}