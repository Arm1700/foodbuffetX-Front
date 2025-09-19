// import React, { useState, useEffect } from "react";
// import DatePicker, { registerLocale } from "react-datepicker";
// import hy from "date-fns/locale/hy";
// import axios from "axios";
// import "react-datepicker/dist/react-datepicker.css";
// import { useAuth } from "../../../../hooks/useAuth";
// registerLocale("hy", hy);

// export default function Profile() {
//   const [birthDate, setBirthDate] = useState(null);
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [message, setMessage] = useState("");
//   const { auth } = useAuth(); // получаем токен
//   const token = auth?.access;

//   const [profile, setProfile] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone: "",
//     birth_date: null,
//   });


//   useEffect(() => {
//     if (!token) return;

//     axios
//       .get("http://localhost:8000/api/accounts/profile/", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => {
//         setProfile({
//           ...res.data,
//           birth_date: res.data.birth_date ? new Date(res.data.birth_date) : null,
//         });
//       })
//       .catch((err) => console.error(err));
//   }, [token]);

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleDateChange = (date) => {
//     setProfile({ ...profile, birth_date: date });
//   };

//   const handleSave = async () => {
//     if (!token) {
//       setMessage("Նախ պետք է մուտք գործել");
//       return;
//     }

//     try {
//       await axios.put(
//         "http://localhost:8000/api/accounts/profile/",
//         profile,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setMessage("Պրոֆիլը հաջողությամբ պահպանվեց!");
//     } catch (err) {
//       console.error(err);
//       setMessage("Սխալ պատահեց, փորձեք կրկին");
//     }
//   };

//   return (
//     <div className="px-[3%] py-6">
//       <h1 className="text-[#f93c22] text-[34px] font-bold mb-6">Պրոֆիլ</h1>

//       <div className="rounded-2xl py-6">
//         {/* Անուն */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Անուն</label>
//           <input
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             placeholder="Անուն"
//             className="w-full border-2 py-[2.3%] border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-[#f93c22] transition"
//           />
//         </div>

//         {/* Ազգանուն */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Ազգանուն</label>
//           <input
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             placeholder="Ազգանուն"
//             className="w-full border-2 py-[2.3%] border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-[#f93c22] transition"
//           />
//         </div>

//         {/* Էլ․ հասցե */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Էլ․ հասցե</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="alex@example.com"
//             className="w-full border-2 py-[2.3%] border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-[#f93c22] transition"
//           />
//         </div>

//         {/* Հեռախոսահամար */}
//         <div className="mb-5">
//           <label className="block text-gray-700 font-medium mb-2">Հեռախոսահամար</label>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="+7 (999) 123-45-67"
//             className="w-full border-2 py-[2.3%] border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-[#f93c22] transition"
//           />
//         </div>

//         {/* Ծննդյան ամսաթիվ */}
//         {/* <div className="mb-6">
//           <label className="block text-gray-700 font-medium mb-2">Ծննդյան ամսաթիվ</label>
//           <DatePicker
//             selected={birthDate}
//             onChange={(date) => setBirthDate(date)}
//             locale="hy"
//             placeholderText="Ընտրեք ծննդյան օրը"
//             className="w-full border-2 py-[6%] border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-[#f93c22] transition"
//           />
//         </div> */}

//         {message && (
//           <div className="mb-4 text-center text-sm text-red-600">{message}</div>
//         )}

//         {/* Button */}
//         <button
//           onClick={handleSave}
//           className="bg-[#f93c22] text-white font-bold px-[3%] py-[3%] rounded-[15px] shadow-md hover:bg-[#d8321b] transition mt-[10%]"
//         >
//           Պահպանել փոփոխությունները
//         </button>
//       </div>
//     </div>
//   );
// }
