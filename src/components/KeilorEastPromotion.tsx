import React from "react";
import "./KeilorEastPromotion.css";
import useDocumentTitle from "../hooks/useDocumentTitle";
import keilorEastPromotion from "../assets/promotion-keilor-east.webp";

export default function KeilorEastPromotion() {
  useDocumentTitle("Keilor East Promotions - FAT CHEF");
  return (
    <div className="promo-root">
      <div className="paper-bg" />
      <div className="promo-container promo-image-container">
        <img
          src={keilorEastPromotion}
          alt="Keilor East promotion"
          className="promo-image"
        />
      </div>
    </div>
  );
}
