import React from "react";

const EnrollPatient = () => {
  return (
    <div className="w-full bg-white flex flex-col items-center justify-center gap-4">
      <div className="w-6/12 h-auto p-2 text-center">
        <p className="mt-10 font-bold text-6xl text-red-900">PATIENT INFORMATION</p>
      </div>

      <div className="w-6/12 h-auto p-4 bg-zinc-100">
        <form className=" gap-2">
          <div className="grid grid-cols-2 gap-1">
            <label className="pl-20 pt-1 font-bold text-left text-left text-sm text-black">LASTNAME:</label>
            <input
              type="text"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm h-8"
              placeholder="Enter lastname"
            />

            <label className="pl-20 pt-1  font-bold text-left text-sm text-black">FIRSTNAME:</label>
            <input
              type="text"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm h-8"
              placeholder="Enter firstname"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">MIDDLE NAME:</label>
            <input
              type="text"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm h-8"
              placeholder="Enter middle name"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">EMAIL ADDRESS:</label>
            <input
              type="email"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm h-8"
              placeholder="Enter email address"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">PASSWORD:</label>
            <input
              type="password"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm h-8"
              placeholder="Enter password"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">BIRTHDATE:</label>
            <input
              type="date"
              className="p-0.5 border border-gray-300 rounded w-3/4 text-sm h-8 text-gray-400"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">BIRTHPLACE:</label>
            <input
              type="text"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm h-8"
              placeholder="Enter birthplace"
            />

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">GENDER:</label>
            <select className="p-0.5 border border-gray-300 rounded w-3/4 text-gray-400 text-sm h-8">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label className="pl-20 pt-1  font-bold text-left text-sm text-black">MARITAL STATUS:</label>
            <select className="p-0.5 border border-gray-300 rounded w-3/4 text-gray-400 text-sm h-8">
              <option value="">Select marital status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>

            <label className="pl-20 pt-1 font-bold text-left text-sm text-black">CURRENT ADDRESS:</label>
            <input
              type="text"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm h-8"
              placeholder="Enter current address"
            />
            <label className="pl-40 pt-1 font-bold text-left text-sm text-black">REGION:</label>
            <input
              type="text"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm h-8"
              placeholder="Enter region"
            />

            <label className="pl-40 pt-1 font-bold text-left  text-sm text-black">CITY:</label>
            <input
              type="text"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm h-8"
              placeholder="Enter city"
            />

            <label className="pl-40 pt-1  font-bold text-left text-sm text-black">PROVINCE:</label>
            <input
              type="text"
              className="p-1 border border-gray-300 rounded w-3/4 text-sm h-8"
              placeholder="Enter province"
            />
          </div>

          <div className="flex justify-between mt-8 mb-8">
            <button type="submit" className="bg-red-900 text-white font-semibold shadow py-2 px-8 text-sm mr-20 ml-20 ">
              SUBMIT
            </button>
            <button type="button" className="bg-red-900 text-white font-semibold shadow py-2 px-6 mr-20 text-sm ">SUBMIT & ADD DISEASE PROFILE
            </button>
          </div>
        </form>
      </div>



    </div>
  );
};

export default EnrollPatient;
