/*eslint-disable*/
import React, { useState } from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import image from "assets/img/claro.jpg";

import imagen1 from '../imagenes/trabajo1.jpg';
import imagen2 from '../imagenes/trabajo2.jpg';
import imagen3 from '../imagenes/trabajo3.png';
import imagen4 from '../imagenes/trabajo4.jpg';
import {
  
  CarouselItem,
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

import 'bootstrap/dist/css/bootstrap.min.css';


const items = [
  {
    src: imagen1,
    altText: "Slide 1",
    caption: "Desarollador web",
  },
  {
    src: imagen2,
    altText: "Slide 2",
    caption: "Analista de RRHH",
  },
  {
    src: imagen3,
    altText: "Slide 3",
    caption: "Supervisor RRHH",
  },
  {
    src: imagen4,
    altText: "Slide 4",
    caption: "Tecnico",
  },
];



export default function Index() {
  const [demoModal, setDemoModal] = React.useState(false);
  const [activeIndex, setActiveIndex]=useState(0);
  const [animating,setAnimating]=useState(false);



  const next =()=> {
    if (animating) return;
    const nextIndex = activeIndex == items.length -1 ? 0 : activeIndex + 1 ;
    setActiveIndex(nextIndex);

  }


  const previous = () => {
   if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length -1 : activeIndex -1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);

  }

  const slides = items.map((item)=> {
    return (
      <CarouselItem
      onExiting={()=> setAnimating(true)}
      onExited= {() => setAnimating(false)}
      key={item.src}
      >
        <img src={item.src} alt={item.altText} width="100%" />
        <CarouselCaption captionText={item.caption} captionHeader= {item.caption} />
      </CarouselItem>
    );
  });

    return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px"  style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}>
        <div className="container mx-auto items-center flex flex-wrap" >
          <div className="w-full md:w- lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h1>
                BIENVENIDO A TOTONET S.A
              </h1>


              <h5>


              Puedes optar por postularte en una de nuestras plazas disponibles aplica entrando en la pagina de postulación que se encuentra 
              en la parte inferior y uno de nuestros colaboradores se pondra en contacto contigo para seguir tu proceso. 

              No dudes en postularte y ser parte de la familia TOTONET.
              </h5>
              
              
            </div>
            
          </div>
          
        </div>
        
       
      </section>
     
      <section>
          <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}

          >
            < CarouselIndicators items={items} activeIndex= {activeIndex} onClickHandler = {goToIndex} />
            {slides}
           <CarouselControl direction="prev" directionText= "Previous" onClickHandler={previous} />
           <CarouselControl direction="next" directionText="Next" onClickHandler= {next} />
          </Carousel>


        <div>
          <p></p>
          <p></p>
        </div>
      </section>

      
      <section className="pb-16 bg-blueGray-200 relative pt-32">
        <section className="block relative z-1 bg-blueGray-600">
        
        <div className="container mx-auto"
         style={{
         // backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }} >
          <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4  -mt-24">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Login Page
                  </h5>
                  <Link to="/auth/login">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/login.jpg").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center" color="white">
                    Postulation Page
                  </h5>
                  <Link to="/profile">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/formulario.png").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Login Page
                  </h5>
                  <Link to="/auth/login">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("assets/img/login.jpg").default}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </section>

        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
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

      
      
      <Footer />
    </>
  );
}
