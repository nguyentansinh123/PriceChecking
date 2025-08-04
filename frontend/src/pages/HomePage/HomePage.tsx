import analysis from '../../assets/analysis.png';
import stats from '../../assets/stats.png';
import business from '../../assets/business.png';
import financial from '../../assets/financial.png';
import digital from '../../assets/digital.png';
import world from '../../assets/world.png';
import woman from '../../assets/woman.png';
import dairy from '../../assets/dairy.png';
import vegetables from '../../assets/vegetables.png';
import spices from '../../assets/spices.png';
import honey from '../../assets/honey.png';
import tick from '../../assets/tick.png';
import chart from '../../assets/chart.png';
import quote from '../../assets/double-quote.png';
import Footer from '@/comps/HomeCMTS/Footer';
import Navbar from '@/comps/HomeCMTS/Navbar';

const HomePage = () => {
  return (
    <>
      <div className="bg-gray-50 py-10">
        <div className="w-4/5 mx-auto space-y-10 font-sans text-gray-800">
          
          <Navbar/>
          
          <section className="flex flex-col md:flex-row items-baseline-start p-0 bg-transparent">

            <div className="flex-1 flex flex-col space-y-6 pt-18">
              <h1 className="text-6xl font-bold leading-tight">
                Let your <span className="text-blue-600">prices</span> being low
              </h1>
              <p className="text-gray-500 max-w-md">
                Get fresh groceries online without stepping out to make delicious food with the freshest ingredients.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 max-w-md">
                <span className="flex items-center space-x-2">
                  <img src={tick} alt="tick" className="h-4" /> <span>Fresh Vegetables</span>
                </span>
                <span className="flex items-center space-x-2">
                  <img src={tick} alt="tick" className="h-4" /> <span>100% Guarantee</span>
                </span>
                <span className="flex items-center space-x-2">
                  <img src={tick} alt="tick" className="h-4" /> <span>Cash on Delivery</span>
                </span>
                <span className="flex items-center space-x-2">
                  <img src={tick} alt="tick" className="h-4" /> <span>Fast Delivery</span>
                </span>
              </div>


              <div className="mt-20 self-end shadow-lg bg-white p-3">
                <div className="flex items-center justify-between px-4 py-3 w-full gap-4">
                  <img src={stats} alt="Stats Icon" className="h-15 w-15 justify-center -ml-15 mr-3 mt-auto" />
                  <div>
                    <p className="text-gray-500 text-sm">Monthly Stats</p>
                    <p className="font-bold text-lg">+25%</p>
                  </div>
                  <img src={chart} alt="Chart" className="h-15 ml-5" />
                </div>
              </div>

            </div>
            
            <div className="flex-1 flex flex-col items-end justify-end relative mt-10 md:mt-0 z-0">
              <img src={world} alt="World Map" className="w-full max-w-[600px] mx-auto mr-80" />

              <div className="-mt-30 bg-white/50 backdrop-blur-sm shadow-md p-6 rounded-lg text-md w-92 max-w-full z-10">
                <img src={quote} alt="Quote" className="h-6 mb-4" />
                <p>
                  For the past few years, I’ve had a hard time finding the right place for skin care to deal with my complicated skin condition, thank God I found GlowQueen to treat my skin
                </p>
                <p className="mt-3 font-bold text-blue-900">Tamara Jules</p>
              </div>
            </div>
          </section>
          
          <section className="grid md:grid-cols-4 gap-6 px-10 py-14 bg-gray-50">
            <div className="text-center bg-white p-6 shadow">
              <img src={business} alt="Business Planning" className="mx-auto mb-4 h-12" />
              <h3 className="font-semibold mb-2">Business Planning</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-center bg-white p-6 shadow">
              <img src={financial} alt="Financial Planning" className="mx-auto mb-4 h-12" />
              <h3 className="font-semibold mb-2">Financial Planning</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-center bg-white p-6 shadow">
              <img src={digital} alt="Digital Marketing" className="mx-auto mb-4 h-12" />
              <h3 className="font-semibold mb-2">Digital Marketing</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-center bg-white p-6 shadow">
              <img src={analysis} alt="Market Analysis" className="mx-auto mb-4 h-12" />
              <h3 className="font-semibold mb-2">Market Analysis</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row items-center p-10 space-y-6 md:space-y-0 md:space-x-10 bg-gray-50h">
            <img src={woman} alt="Happy Woman" className="w-full max-w-[600px]" />

            <div className="shadow-lg p-8 bg-white">
              <h2 className="text-4xl font-bold mb-4 leading-snug">
                Find your comfort<br />
                working zone with<br />
                  Cozy Corner
              </h2>
              <p className="text-gray-500 text-base max-w-md">
                Change your work environment by using a co-working place, to meet new people and gain a new network.
              </p>
            </div>
          </section>

          <section className="grid md:grid-cols-4 gap-6 px-10 pb-14">
            <div className="text-center bg-white rounded-lg p-6 shadow">
              <img src={dairy} alt="Dairy Products" className="mx-auto mb-4 h-12" />
              <h3 className="font-semibold mb-2">Dairy Products</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow">
              <img src={vegetables} alt="Vegetables & Fruits" className="mx-auto mb-4 h-12" />
              <h3 className="font-semibold mb-2">Vegetables & Fruits</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow">
              <img src={spices} alt="Spices & Seasonings" className="mx-auto mb-4 h-12" />
              <h3 className="font-semibold mb-2">Spices & Seasonings</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="text-center bg-white rounded-lg p-6 shadow">
              <img src={honey} alt="Honey" className="mx-auto mb-4 h-12" />
              <h3 className="font-semibold mb-2">Honey</h3>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </section>
        </div>
      </div>
      
      <Footer/>
    </>
  );
};

export default HomePage;
