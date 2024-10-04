import React from "react";
import "./CardProduct.css";

function CardProduct() {
  return (
    <div id="div1" class="col-md-4 hidden-lg  wow fadeInUp" data-wow-delay="0.3s">
      <div
        class="content-inner fl-wrap restaurante-menu"
        data-href="https://rockandfellers.com.ar/cartas-qr"
      >
        <div id="div2" class="content-front">
          <div id="div3" class="cf-inner">
            <div
            id="div4"
              class="bg "
              data-echo-background="https://rockandfellers.com.ar/front/images/menu/000.jpg"
            ></div>
            <div id="div5" class="overlay"></div>
            <div id="div6" class="inner">
              <h2 className="bg-white">Nuestra carta</h2>
              <h4 >Gran variedad de platos</h4>
            </div>
            <div id="div7" class="serv-num">01.</div>
          </div>
        </div>
        <div class="content-back">
          <div class="cf-inner">
            <div class="inner">
              <div class="dec-icon">
                <i class="fal fa-utensils-alt"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
