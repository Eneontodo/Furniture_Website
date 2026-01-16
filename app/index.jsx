import React, { useState, useEffect, useRef } from 'react';
import { LogIn, UserPlus, Settings, Plus, Trash2, Upload, LogOut, Home, Users, Package, Eye, EyeOff, Camera, Image as ImageIcon, CheckCircle } from 'lucide-react';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', password: 'admin', name: 'Администратор', role: 'admin' },
    { id: 2, username: 'worker', password: 'worker', name: 'Рабочий', role: 'worker' }
  ]);
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: ''
  });
  
  const [furnitureForm, setFurnitureForm] = useState({
    type: '',
    photo: '',
    assembled: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const furnitureTypes = ['Стул', 'Стол', 'Диван', 'Кровать', 'Шкаф', 'Письменный стол', 'Полка', 'Комод', 'Книжная полка', 'Журнальный столик'];

  // Initialize with some sample furniture data
  useEffect(() => {
    const sampleData = [
      { id: 1, type: 'Стул', photo: 'https://placehold.co/200x150/4f46e5/white?text=Стул', assembled: 5, worker: 'Рабочий', workerId: 2 },
      { id: 2, type: 'Стол', photo: 'https://placehold.co/200x150/059669/white?text=Стол', assembled: 3, worker: 'Рабочий', workerId: 2 },
      { id: 3, type: 'Диван', photo: 'https://placehold.co/200x150/dc2626/white?text=Диван', assembled: 2, worker: 'Рабочий', workerId: 2 },
      { id: 4, type: 'Журнальный столик', photo: 'https://placehold.co/200x150/8b5cf6/white?text=Журнал.столик', assembled: 5, worker: 'Администратор', workerId: 1 }
    ];
    setFurnitureItems(sampleData);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = users.find(u => u.username === formData.username && u.password === formData.password);
    if (user) {
      setCurrentUser(user);
      setCurrentView('dashboard');
    } else {
      alert('Неверное имя пользователя или пароль');
    }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if username already exists
    if (users.find(u => u.username === formData.username)) {
      alert('Имя пользователя уже занято');
      setLoading(false);
      return;
    }
    
    const newUser = {
      id: users.length + 1,
      username: formData.username,
      password: formData.password,
      name: formData.name,
      role: 'worker'
    };
    
    setUsers([...users, newUser]);
    setShowSuccessModal(true);
    setLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
    setFormData({ username: '', password: '', name: '' });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой! Максимальный размер - 5 МБ');
        return;
      }
      
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Неподдерживаемый формат файла! Разрешены: JPG, PNG, GIF');
        return;
      }
      
      setLoading(true);
      try {
        // Simulate file upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create a local URL for the image
        const imageUrl = URL.createObjectURL(file);
        setFurnitureForm({...furnitureForm, photo: imageUrl});
      } catch (error) {
        alert('Ошибка при загрузке файла');
      }
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAddFurniture = async (e) => {
    e.preventDefault();
    if (!furnitureForm.type || !furnitureForm.assembled) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newItem = {
      id: Date.now(),
      type: furnitureForm.type,
      photo: furnitureForm.photo || `https://placehold.co/200x150/6366f1/white?text=${encodeURIComponent(furnitureForm.type)}`,
      assembled: parseInt(furnitureForm.assembled),
      worker: currentUser.name,
      workerId: currentUser.id
    };
    
    setFurnitureItems([...furnitureItems, newItem]);
    setFurnitureForm({ type: '', photo: '', assembled: '' });
    alert('Элемент мебели успешно добавлен!');
    setLoading(false);
  };

  const handleDeleteFurniture = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот элемент мебели?')) {
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setFurnitureItems(furnitureItems.filter(item => item.id !== id));
    alert('Элемент мебели успешно удален!');
    setLoading(false);
  };

  // Login Form Component
  const LoginForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Home className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Управление мебелью</h1>
          <p className="text-gray-600">Войдите в свою учетную запись</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Имя пользователя</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              placeholder="введите имя пользователя"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 pr-12"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Вход...
              </div>
            ) : (
              <>
                <LogIn className="w-5 h-5 inline mr-2" />
                Войти
              </>
            )}
          </button>
          
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => setCurrentView('register')}
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center justify-center mx-auto"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Создать аккаунт
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Register Form Component
  const RegisterForm = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Создать аккаунт</h1>
          <p className="text-gray-600">Присоединяйтесь к системе управления мебелью</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Полное имя</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Иван Иванов"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Имя пользователя</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="ваше_имя"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Пароль</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Создайте надежный пароль"
              required
              minLength="4"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Создание аккаунта...
              </div>
            ) : (
              <>
                <UserPlus className="w-5 h-5 inline mr-2" />
                Создать аккаунт
              </>
            )}
          </button>
          
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={() => setCurrentView('login')}
              className="text-green-600 hover:text-green-800 font-medium flex items-center justify-center mx-auto"
            >
              <LogIn className="w-4 h-4 mr-1" />
              Назад к входу
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Dashboard Component
  const Dashboard = () => {
    const myFurniture = furnitureItems.filter(item => item.workerId === currentUser?.id);
    const totalAssembledByMe = myFurniture.reduce((sum, item) => sum + item.assembled, 0);
    const totalFurniture = furnitureItems.length;
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Управление мебелью</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">
                    {currentUser?.role === 'admin' ? 'Администратор' : 'Рабочий'}
                  </p>
                </div>
                {currentUser?.role === 'admin' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center shadow-md hover:shadow-lg"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Панель администратора
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <Package className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Ваши элементы</p>
                  <p className="text-2xl font-bold text-gray-900">{myFurniture.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего собрано</p>
                  <p className="text-2xl font-bold text-gray-900">{totalAssembledByMe}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего в системе</p>
                  <p className="text-2xl font-bold text-gray-900">{totalFurniture}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add Furniture Form */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Plus className="w-6 h-6 mr-2 text-indigo-600" />
              Добавить новый элемент мебели
            </h2>
            
            <form onSubmit={handleAddFurniture} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Тип мебели *</label>
                  <select
                    value={furnitureForm.type}
                    onChange={(e) => setFurnitureForm({...furnitureForm, type: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  >
                    <option value="">Выберите тип мебели</option>
                    {furnitureTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Количество собрано *</label>
                  <input
                    type="number"
                    min="1"
                    value={furnitureForm.assembled}
                    onChange={(e) => setFurnitureForm({...furnitureForm, assembled: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Введите количество"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Загрузить фото</label>
                <div className="relative">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center"
                  >
                    {furnitureForm.photo ? (
                      <div className="flex items-center">
                        <ImageIcon className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-green-600 font-medium">Фото загружено</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Camera className="w-5 h-5 text-gray-500 mr-2" />
                        <span>Выберите файл или перетащите сюда</span>
                      </div>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Поддерживаемые форматы: JPG, PNG, GIF (макс. 5 МБ)</p>
                {furnitureForm.photo && (
                  <div className="mt-2">
                    <img 
                      src={furnitureForm.photo} 
                      alt="Preview" 
                      className="w-32 h-24 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Добавление...
                  </div>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Добавить элемент мебели
                  </>
                )}
              </button>
            </form>
          </div>

          {/* All Furniture Items */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Все элементы мебели ({furnitureItems.length})</h3>
            
            {furnitureItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">В системе пока нет элементов мебели.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {furnitureItems.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                    <img 
                      src={item.photo} 
                      alt={item.type}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-semibold text-gray-800 text-lg mb-1">{item.type}</h4>
                    <p className="text-gray-600 mb-2">Собрано: <span className="font-medium">{item.assembled} шт.</span></p>
                    <p className="text-sm text-gray-500">Добавил(а): {item.worker}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  };

  // Admin Panel Component
  const AdminPanel = () => {
    const totalFurniture = furnitureItems.length;
    const totalAssembled = furnitureItems.reduce((sum, item) => sum + item.assembled, 0);
    const uniqueWorkers = [...new Set(furnitureItems.map(item => item.worker))].length;
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Панель администратора</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Назад в панель
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Admin Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Package className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего элементов</p>
                  <p className="text-2xl font-bold text-gray-900">{totalFurniture}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                  <Package className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего собрано</p>
                  <p className="text-2xl font-bold text-gray-900">{totalAssembled}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Активных рабочих</p>
                  <p className="text-2xl font-bold text-gray-900">{uniqueWorkers}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Всего пользователей</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Manage Furniture Items */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Управление всеми элементами мебели</h2>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {totalFurniture} элементов
              </span>
            </div>
            
            {furnitureItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">В системе нет элементов мебели.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Фото</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Тип</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Собрано</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Рабочий</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {furnitureItems.map(item => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                        <td className="py-4 px-4">
                          <img 
                            src={item.photo} 
                            alt={item.type}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                        </td>
                        <td className="py-4 px-4 font-medium text-gray-800">{item.type}</td>
                        <td className="py-4 px-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                            {item.assembled} шт.
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{item.worker}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleDeleteFurniture(item.id)}
                            disabled={loading}
                            className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Удалить элемент"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Manage Users */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Управление пользователями</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Имя</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Имя пользователя</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Роль</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                      <td className="py-4 px-4 font-medium text-gray-800">{user.name}</td>
                      <td className="py-4 px-4 text-gray-600">{user.username}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'admin' ? 'Администратор' : 'Рабочий'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                          Активен
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  };

  // Success Modal Component
  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Регистрация успешна!</h2>
          <p className="text-gray-600">Теперь вы можете войти в систему</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              setShowSuccessModal(false);
              setCurrentView('login');
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            ОК
          </button>
        </div>
      </div>
    </div>
  );

  // Render based on current view and authentication state
  if (!currentUser && currentView !== 'register') {
    return <LoginForm />;
  }
  
  if (!currentUser && currentView === 'register') {
    return <RegisterForm />;
  }
  
  if (currentUser && currentView === 'admin') {
    return <AdminPanel />;
  }
  
  return (
    <>
      <Dashboard />
      {showSuccessModal && <SuccessModal />}
    </>
  );
};

export default App;


import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

