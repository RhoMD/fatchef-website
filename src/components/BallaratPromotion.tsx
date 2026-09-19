import React from "react";
import "./BallaratPromotion.css";
import useDocumentTitle from "../hooks/useDocumentTitle";
import ballaratPromotion from "../assets/promotion-ballarat.webp";

export default function BallaratPromotion() {
  useDocumentTitle("Ballarat Promotions - FAT CHEF");
  return (
    <div className="promo-root">
      <div className="paper-bg" />
      <div className="promo-container promo-image-container">
        <img
          src={ballaratPromotion}
          alt="Ballarat promotion"
          className="promo-image"
        />
      </div>
    </div>
  );
}
