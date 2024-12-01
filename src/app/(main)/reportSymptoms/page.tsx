import React from 'react';

const ReportSymptomsPage = () => {
  return (
    <div className="w-5/6 bg-white flex flex-col items-center px-6">
      <div className="w-6/12 h-auto mt-12 p-2 text-center">
        <p className="font-bold text-6xl text-red-900 text-nowrap tracking-wide">REPORT SYMPTOMS</p>
      </div>
      <form className="w-6/12 mt-8 flex flex-col gap-4">
        <label htmlFor="symptoms" className="font-semibold text-lg text-gray-700">
          Describe your symptoms:
        </label>
        <textarea
          id="symptoms"
          name="symptoms"
          className="w-full h-48 p-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-900"
          placeholder="Write your symptoms here..."
        />
        <button
          type="submit"
          className="self-center mt-4 px-6 py-2 bg-red-900 text-white font-bold rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportSymptomsPage;
