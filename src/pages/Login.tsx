import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AuthSystemPreview = () => {
  const [currentView, setCurrentView] = useState('login'); 
  const [role, setRole] = useState('consignee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const dummyData = {
    consignor: {
      email: 'consignor@example.com',
      password: 'consignor123',
      otp: '123456',
    },
    consignee: {
      email: 'consignee@example.com',
      password: 'consignee123',
      otp: '123456',
    },
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (role === 'consignor' && email === dummyData.consignor.email && password === dummyData.consignor.password) ||
      (role === 'consignee' && email === dummyData.consignee.email && password === dummyData.consignee.password)
    ) {
      setCurrentView('otp');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (
      (role === 'consignor' && enteredOtp === dummyData.consignor.otp) ||
      (role === 'consignee' && enteredOtp === dummyData.consignee.otp)
    ) {
      navigate(`/${role}`);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center p-4">
      {currentView === 'login' && (
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">DKC Consignment Portal</h1>
            <p className="text-gray-400">Secure access for consignees and consignors</p>
          </div>
          
          <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Sign in to your account</p>
            </div>
            
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">User Type</label>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      type="button"
                      className={`p-3 rounded-lg border ${
                        role === 'consignee'
                          ? 'border-blue-500 bg-blue-900/30 text-blue-400'
                          : 'border-gray-700 bg-gray-800 text-gray-400'
                      } transition-colors flex items-center justify-center`}
                      onClick={() => setRole('consignee')}
                    >
                      <User size={18} className="mr-2" />
                      Consignee
                    </button>
                    <button
                      type="button"
                      className={`p-3 rounded-lg border ${
                        role === 'consignor'
                          ? 'border-blue-500 bg-blue-900/30 text-blue-400'
                          : 'border-gray-700 bg-gray-800 text-gray-400'
                      } transition-colors flex items-center justify-center`}
                      onClick={() => setRole('consignor')}
                    >
                      <User size={18} className="mr-2" />
                      Consignor
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="w-full">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="w-full">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <Lock size={18} />
                      </div>
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                       <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded bg-gray-800 border-gray-700 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                      Remember me
                    </label>
                  </div>
                  <button type="button" className="text-sm font-medium text-blue-500 hover:text-blue-400">
                    Forgot password?
                  </button>
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 text-base px-4 py-2"
                >
                  Sign In
                </button>
                <div className="mt-4 text-gray-400 text-sm">
                  <p>Consignor: consignor@example.com / consignor123</p>
                  <p>Consignee: consignee@example.com / consignee123</p>
                 <Link to='/admin'>Admin Dashboard</Link>  
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {currentView === 'otp' && (
        <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Two-Factor Authentication</h2>
            <p className="text-gray-400">
              Please enter the 6-digit verification code sent to{' '}
              <span className="text-gray-300">(123) 456-7890</span>
            </p>
          </div>
          
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-14 text-center text-xl font-semibold text-white bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  maxLength={1}
                  pattern="[0-9]"
                  inputMode="numeric"
                />
              ))}
            </div>
            
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 text-base px-4 py-2"
              disabled={otp.join('').length !== 6}
            >
              Verify
            </button>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">
                Didn't receive the code?
              </p>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-400 text-sm font-medium"
              >
                Resend Code
              </button>
              <div className="mt-4 text-gray-400 text-sm">
                  <p>OTP: 123456</p>
                 
                </div>
            </div>
          </form>
        </div>
      )}
      
      {currentView === 'dashboard' && (
         <div className=' bg-amber-800'>hi there</div>
      )}
      
    
    </div>
  );
};

export default AuthSystemPreview;