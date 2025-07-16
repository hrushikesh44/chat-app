import { Camera, Mail, User } from 'lucide-react';
import { apiUrl } from '../utils/config';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const Profile = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [defaultUrl, setdefaultUrl] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUpdatingProfile(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${apiUrl}/upload/profilePic`, formData, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      const uploadedUrl = res.data.imageUrl;
      setImgUrl(uploadedUrl);
      localStorage.setItem('imgUrl', imgUrl);
    } catch (err) {
      console.error('Upload failed:', err);
    }
    setIsUpdatingProfile(false);
  };

  async function getUserDetails() {
    const response = await axios.get(`${apiUrl}/auth/userDetails`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    setdefaultUrl(response.data.user.profilePic);
    setUsername(response.data.user.fullName);
    setEmail(response.data.user.email);
    setTime(response.data.user.createdAt);
  }

  useEffect(() => {
    getUserDetails();
  }, [username, email]);

  return (
    <div className="h-fit text-neutral-900 overflow-hidden">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-neutral-200 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={defaultUrl || imgUrl || '/avatar.png'}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                `}
              >
                <Camera className="w-5 h-5 text-neutral-800" />
                <input
                  type="file"
                  ref={fileInputRef}
                  id="avatar-upload"
                  className="hidden"
                  capture="environment"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <p className="text-sm text-neutral-900">
              {isUpdatingProfile ? 'Uploading...' : 'Click the camera icon to update your photo'}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-neutral-900 flex items-center gap-2 ">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-neutral-100 rounded-lg border">{username}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-neutral-900 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-neutral-100 rounded-lg border">{email}</p>
            </div>
          </div>

          <div className="mt-6 bg-neutral-200 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{time.split('T')[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500"> 🟢 Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// <div className="lg:pl-20 pr-16">
//   <div className="block md:grid md:grid-cols-3 lg:grid-cols-3 w-full pl-20">
//     <div className="bg-purple-200 rounded-xl h-[75vh]  border border-white/50 overflow-hidden">
//       <div className=" p-7 text-neutral-600 font-bold text-3xl">
//         <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9ea0f7] via-purple-500 to-[#9ea0f7]">
//           Chatter
//         </span>
//         <div className="flex text-lg font-normal border border-black/10 rounded-md w-[15vw] mt-3">
//           <Search className="size-5 mt-2.5 ml-2 hover:scale-105" />
//           <input
//             type="search"
//             required
//             placeholder="Search"
//             className="p-1.5 focus:outline-none focus:ring-0 "
//           />
//         </div>
//         <div className=" mt-3 min-w-full h-[500px] border border-black/10 rounded-xl "></div>
//       </div>
//     </div>
//     <div className=" mr-20 md:col-span-2 lg:col-span-2 sm:block bg-purple-200/40 "></div>
//   </div>
// </div>
