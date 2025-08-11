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

          {/* Breadcrumb Navigation */}
          <div className="text-gray-500 font-semibold mb-4 ml-20 text-lg">
            <p>
              <span className="">Account</span> {'>'} 
              <span className=""> Personal Info</span>
            </p>
          </div>

          {/* Page Title */}
          <h1 className="text-4xl font-bold mb-25 ml-20">Personal Info</h1>


          {/* Information Fields */}
          <div className="flex space-x-5 ml-20">
            <div className="flex-1 space-y-5">

              {/* Legal Name */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Legal name</h3>
                  <p className="text-gray-600">Peter Griffin</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Edit</a>
              </div>

              {/* Email Address */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Email address</h3>
                  <p className="text-gray-600">h**@designdrops.op</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Edit</a>
              </div>

              {/* Phone Numbers */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Phone numbers</h3>
                  <p className="text-gray-600">Add a number so confirmed guests and Airbnb can get in touch. You can add other numbers and choose how they’re used.</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Add</a>
              </div>

              {/* Government ID */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Government ID</h3>
                  <p className="text-gray-600">Not provided</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Add</a>
              </div>

              {/* Address */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-gray-600">Not provided</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Edit</a>
              </div>

              {/* Emergency Contact */}
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold text-lg">Emergency contact</h3>
                  <p className="text-gray-600">Not provided</p>
                </div>
                <a href="#" className="text-black font-semibold px-4 py-2 underline">Add</a>
              </div>
            </div>

            {/* Right Side (Reserved for Security Fields) */}
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

              {/* "Which details can be edited?" Section */}
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