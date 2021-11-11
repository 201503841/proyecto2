import React, { useRef, useState } from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { generar2 } from "api/acciones.js";

import { useHistory } from "react-router";



export default function Refrescar() {

    const [loading, setLoading] = useState(false);


    let history=useHistory();


    async function refrescando(e) {
 

        //SE COMIENZA A CONSUMIR ENDPOINT
        try {
          console.log("entre auii hey aqui estoy");
          const rawResponse = await generar2(
          ).then(res=> res.json())
          .then((cred)=>{
           console.log(cred);
           document.cookie=`token=${cred.refreshToken}; max-age=${60*3}; path=/; samesite=strict;`
           console.log(document.cookie);
           alert("BIENVENIDO")
        
             history.push('landing');
          });
         
          
          console.log(rawResponse);
            
          
        } catch (error) {
          console.log(error);
          alert("error")
        }
    
    
      }
    
      function salir() {
        history.push('index')
      }


  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={require("imagenes/exclamacion.jpg").default}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>


                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    <div>
                        *
                    </div>
                    ¡SU SESION HA EXPIRADO!
                  </h3>
                  <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">

                        <div className="rounded-t mb-0 px-4 py-4">
                          <hr className="mt-4 border-b-1 border-blueGray-300" />
                        </div>
                        <div className="flex-auto px-4 lg:px- py-10 pt-0">
                          <form>
                           
                            <button
                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                type="button"
                                onClick={refrescando}
                              >

                                REFRESCAR
                              </button>
                              <button
                                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                type="button"
                                onClick={salir}
                              >
                                SALIR
                              </button>
                          </form>
                        </div>
                      </div>
                      <div className="flex flex-wrap mt-6 relative">

                      </div>
                    </div>
                  </div>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                    GUATEMALA,GUATEMALA
                  </div>
                  <div className="container mx-auto px-4 h-full">

                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
