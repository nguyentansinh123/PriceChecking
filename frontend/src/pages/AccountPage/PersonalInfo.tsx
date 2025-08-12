import React from 'react';
import Navbar from '@/comps/HomeCMTS/Navbar';
import Footer from '@/comps/HomeCMTS/Footer';
import lockInfo1 from '../../assets/lock-info1.png';
import lockInfo2 from '../../assets/lock-info2.png';


const PersonalInfo = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 overflow-hidden">
        <div className="w-4/5 mx-auto space-y-15">
          <Navbar />

          <nav className="flex" aria-label='Breadcrumb'>
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse ml-20">
              <li className="inline-flex items-center">
                <a href="#" className="inline-flex items-center text-lg font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                  <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                  </svg>
                  Account
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <a href="#" className="ms-1 text-lg font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                    Personal Information
                  </a>
                </div>
              </li>
            </ol>
          </nav>


          <h2 className="text-4xl font-bold mb-25 ml-20">Personal Info</h2>


          <div className="flex space-x-5 ml-20">
            <div className="flex-1 space-y-5">

              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Legal name</h3>
                  <p className="text-gray-600">Peter Griffin</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Edit</a>
              </div>

            
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Email address</h3>
                  <p className="text-gray-600">h**@designdrops.op</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Edit</a>
              </div>

              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Phone numbers</h3>
                  <p className="text-gray-600">Add a number so confirmed guests and Airbnb can get in touch. You can add other numbers and choose how they’re used.</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Add</a>
              </div>

              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Government ID</h3>
                  <p className="text-gray-600">Not provided</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Add</a>
              </div>

              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">Not provided</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Edit</a>
              </div>

              
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Emergency contact</h3>
                  <p className="text-gray-600">Not provided</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Add</a>
              </div>
            </div>

            
            <div className="flex-1 space-y-10 border-2 rounded-4xl p-8 ml-30 w-auto">
              
              <div className="items-center space-x-4 border-b pb-4 border-gray-300">
                <div>
                  <img src={lockInfo1} alt="info icon" className="w-20 h-20 mb-8" /> 
                </div>
                <div>
                  <h2 className="font-bold text-2xl mb-5">Why isn’t my info shown here?</h2>
                  <p className="text-gray-600 mb-8">We’re hiding some account details to protect your identity.</p>
                </div>
              </div>

              
              <div className="items-center space-x-4 border-gray-300">
                <div>
                  <img src={lockInfo2} alt="edit icon" className="w-20 h-20 mb-8" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl mb-5">Which details can be edited?</h3>
                  <p className="text-gray-600 mb-8">Details Airbnb uses to verify your identity can’t be changed. Contact info and some personal details can be edited, but we may ask you to verify your identity the next time you book or create a listing.</p>
                </div>
              </div>
            </div>


          </div>
          
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PersonalInfo;