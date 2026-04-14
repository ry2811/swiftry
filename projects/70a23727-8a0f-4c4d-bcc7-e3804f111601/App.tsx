import React, { useState } from 'react';
import { Mail, Music, Trophy, Star, User, Send, Target, Heart } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function App() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
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

  const passions = [
    {
      icon: ChessKnight,
      title: 'Cờ Vua',
      description: 'Chơi cờ vua từ nhỏ, đạt nhiều giải thưởng trong các giải đấu địa phương và quốc gia.',
      color: 'bg-blue-100 text-blue-800',
      iconColor: 'text-blue-600'
    },
    {
      icon: Basketball,
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Minh Hoàng</h1>
            <p className="text-xl text-gray-600 mb-4">Vận động viên - Nghệ sĩ - Người truyền cảm hứng</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                <Star size={16} />
                Cờ Vua
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-sm font-medium">
                <Star size={16} />
                Bóng Rổ
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                <Music size={16} />
                Guitar
              </span>
            </div>
          </div>
          
          <div className="relative">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <User size={120} className="text-gray-400" />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white p-2 rounded-full">
              <Trophy size={24} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Kết nối với tôi</h2>
            <p className="text-lg text-gray-600 mb-8">
              Tôi là Minh Hoàng - một người đam mê thể thao và nghệ thuật. Tôi tin rằng sự cân bằng giữa trí tuệ, 
              thể chất và cảm xúc là chìa khóa cho một cuộc sống trọn vẹn. Hãy cùng tôi khám phá thế giới của cờ vua, 
              bóng rổ và âm nhạc!
            </p>
          </div>
        </section>

        {/* Passions Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Đam Mê Của Tôi</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {passions.map((passion, index) => {
              const Icon = passion.icon;
              return (
                <div 
                  key={index} 
                  className={`${passion.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full ${passion.iconColor} bg-white`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold">{passion.title}</h3>
                  </div>
                  <p className="text-lg">{passion.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
              <Star className="text-yellow-500" />
              Thành Tích Nổi Bật
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Target size={20} className="text-green-500" />
                  <span className="text-lg">{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Collection Section */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="text-center mb-8">
              <Mail size={48} className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Kết Nối Ngay!</h2>
              <p className="text-blue-100">
                Đăng ký để nhận thông tin về các buổi biểu diễn, giải đấu và chia sẻ kinh nghiệm từ tôi.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Nhập họ tên của bạn"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-all ${
                  formStatus === 'submitting'
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-white text-blue-600 hover:bg-blue-50 hover:scale-[1.02]'
                }`}
              >
                {formStatus === 'submitting' ? (
                  'Đang gửi...'
                ) : (
                  <>
                    <Send size={20} />
                    Đăng ký nhận thông tin
                  </>
                )}
              </button>

              {formStatus === 'success' && (
                <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500">
                  <p className="text-green-100 font-medium">
                    Cảm ơn bạn! Tôi sẽ liên hệ sớm nhất có thể.
                  </p>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="text-center p-4 bg-red-500/20 rounded-lg border border-red-500">
                  <p className="text-red-100 font-medium">
                    Có lỗi xảy ra. Vui lòng thử lại!
                  </p>
                </div>
              )}
            </form>

            <div className="mt-8 text-center text-blue-100 text-sm">
              <p className="flex items-center justify-center gap-1">
                <Heart size={16} />
                Tôi tôn trọng quyền riêng tư của bạn và không chia sẻ thông tin với bên thứ ba.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">© 2024 Minh Hoàng. Tất cả các quyền được bảo lưu.</p>
          <p className="text-gray-400">Kết nối đam mê - Lan tỏa cảm hứng</p>
        </div>
      </footer>
    </div>
  );
}
