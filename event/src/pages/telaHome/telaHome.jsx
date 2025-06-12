// import Footer from "../../components/footer/Footer";
// import Header from "../../components/header/Header";
// import BannerPrincipal from "../../assets/img/BannerPrincipal.png";
// import { Link } from "react-router-dom";
// import ImagemMapa from "../../assets/img/mapinha.png";

// import "./telaHome.css";

// const Home = () => {
//     return (
//         <>
//             <Header Usuario="none" naver="none" />

//             <main className="layout_grid">
//                 {/* Banner principal */}
//                 <div className="div-banner-principal">
//                     <img src={BannerPrincipal} alt="Imagem principal do evento" />
//                 </div>

//                 {/* Seção de eventos */}
//                 <section className="secao-eventos">
//                     <h2>Próximos Eventos</h2>
//                     <hr />
//                     <div className="conjunto-cards">
//                         {[1, 2, 3, 4].map((evento) => (
//                             <div className="cartao-evento" key={evento}>
//                                 <h2>Lorem</h2>
//                                 <p>Lorem ipsum dolor sit amet consectetur corrupti tempora! Delectus fugia.</p>
//                                 <Link className="link-evento" to="/Login">Conectar</Link>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Banner secundário */}
//                 <section className="banner-secundario">
//                     <h2>Visão</h2>
//                     <hr />
//                     <div className="texto-secundario">
//                         <p>
//                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus neque ipsum voluptatibus animi laudantium enim eius fugiat dolor voluptas nesciunt quos asperiores rem, eum dicta, expedita, minus odit facere eaque?
//                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut ducimus aperiam recusandae, dolorem illum voluptatem, in nemo voluptas eum saepe deserunt officiis non dolores minima quos quam animi praesentium. Inventore?
//                         </p>
//                     </div>
//                 </section>

//                 {/* Contato */}
//                 <section className="secao-contato">
//                     <h2>Contato</h2>
//                     <hr />
//                     <div className="area-contato">
//                         <div className="mapa-local">
//                             <img src={ImagemMapa} alt="Mapa de localização" />
//                         </div>
//                         <div className="info-local">
//                             <p>Rua Niterói, 180 - Centro</p>
//                             <p>São Caetano do Sul - SP</p>
//                             <p>(11) 4225-2000</p>
//                         </div>
//                     </div>
//                 </section>
//             </main>

//             <Footer />
//         </>
//     );
// };

// export default Home;
