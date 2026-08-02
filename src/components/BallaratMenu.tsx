import React from "react";
import "./BallaratMenu.css";
import useDocumentTitle from "../hooks/useDocumentTitle";

/* ---------- Types ---------- */
interface Item {
  name: string;
  price?: string;      // 留空表示该行无独立价格（描述中自带多规格）
  desc?: string;
  flags?: string;      // (V/GF) 等
  dots?: boolean;      // 是否显示点状 leader（名称与价格之间）
}
interface Section {
  title: string;
  subtitle?: string;
  items: Item[];
  boxed?: boolean;     // 画出浅色或深色盒子
  inverse?: boolean;   // 深色反相（黑底白字）
}

/* ---------- Data: 左列：FAT CHEF SIGNATURE ---------- */
const signature: Section = {
  title: "FAT CHEF SIGNATURE",
  inverse: true,
  boxed: true,
  items: [
    {
      name: "SOUVLAKI PLATTER",
      desc:
        "Lamb, chicken souvlaki, chorizo, calamari. Served with pita bread, chips, green salad, tzatziki and tartare.\n" +
        "For 2: 79\nFor 4–5: 149\nFor 8–9: 289",
    },
    {
      name: "PARMALAKI PLATTER",
      desc:
        "Lamb, chicken souvlaki, calamari, and chicken parma (no ham). Served with pita bread, chips, green salad, tzatziki, and tartare.\n" +
        "For 2: 99 (500g parma)\nFor 4–5: 189 (1kg parma)\nFor 8–9: 299 (2kg parma)",
    },
    {
      name: "RIB MASTER PLATTER",
      desc:
        "Slow cooked marinated PORK ribs, fried chicken wings, chorizo. Served with coleslaw, chips, and fried onion rings.\n" +
        "For 2: 89\nFor 4–5: 165\nFor 8–9: 289",
    },
    {
      name: "BEEF LOVERS PLATTER",
      desc:
        "Slow cooked BBQ BEEF ribs, beef steak, grilled prawn skewers. Served with coleslaw, corn cobs, onion rings and chips.\n" +
        "For 2: 99\nFor 4–5: 179\nFor 8–9: 299",
    },
    {
      name: "MIXED GRILL PLATTER",
      desc:
        "Grilled chicken skewers, lamb skewers, prawn skewers, slice beef brisket, corn cobs. Served with chips and onion rings.\n" +
        "For 3–4: 185\nFor 7–8: 329",
    },
    {
      name: "SEAFOOD PLATTER",
      price: "159",
      desc:
        "Grilled salmon, grilled prawns, baked scallops with cheese, fried flat head fish, chilli mussels, lemon pepper calamari. Served with chips and green salad.\n" +
        "Add on lobster: $70",
      dots: true,
    },
  ],
};

/* ---------- Data: 中列：Starters/Salad/Sides/For Kids ---------- */
const starters: Section = {
  title: "STARTERS",
  items: [
    { name: "Bowl of chips with Aioli", price: "12", dots: true },
    { name: "Cheesy garlic bread", price: "15", dots: true },
    { name: "Arancini with homemade Napoli sauce", price: "13", dots: true },
    { name: "Fried chicken wings with cajun seasoning", price: "15", dots: true },
    { name: "Fried calamari with Tartare", price: "18", dots: true },
  ],
};

const salads: Section = {
  title: "SALAD",
  items: [
    {
      name: "CAESAR SALAD",
      price: "24",
      dots: true,
      desc:
        "Cos lettuce, croutons, parmesan cheese, crispy bacon, fried egg and creamy Caesar dressing. Add grilled chicken: $6",
    },
    {
      name: "PUMPKIN & QUINOA SALAD (V/GF)",
      price: "22",
      dots: true,
      desc:
        "Roasted pumpkin seasoned with herbs, served alongside quinoa, baby spinach, mixed salad, pepitas, cherry tomatoes, Spanish onion, dried fruit, and drizzled with honey mustard dressing. Add grilled chicken: $6",
    },
    {
      name: "GREEK LAMB/CHICKEN SALAD",
      price: "26",
      dots: true,
      desc:
        "Grilled lamb, accompanied by lettuce, olives, cherry tomatoes, Spanish onion, feta cheese, cucumber, and balsamic glaze.",
    },
  ],
};

const sides: Section = {
  title: "SIDES",
  items: [
    { name: "Green salad", price: "10", dots: true },
    { name: "Pita bread", price: "5", dots: true },
    { name: "Tzatziki/Tartare/BBQ sauce/Aioli/Mayo", price: "2", dots: true },
    { name: "Red wine jus/Mushroom sauce/Gravy/Garlic butter", price: "3", dots: true },
    { name: "Mashed potato/Steamed veggies", price: "6", dots: true },
  ],
};

const kids: Section = {
  title: "FOR KIDS",
  subtitle: "13  •  Under 10 years old",
  items: [
    { name: "Chicken nuggets and chips" },
    { name: "Ham, cheese pizza" },
    { name: "Kids fish and chips" },
    { name: "Kids Bolognese/Napoli spaghetti" },
    { name: "Cheese burger and chips" },
  ],
};

/* ---------- Data: 右列：Mains/Pasta + Desserts（黑底盒） ---------- */
const mains: Section = {
  title: "MAINS",
  items: [
    {
      name: "CHICKEN PARMIGIANA",
      desc:
        "300g: 27 • 500g: 39 • 1kg: 50 • 2kg: 79. Bread crumbed chicken breast, homemade napoli sauce, ham and melted mozzarella cheese. Served with chips and salad.",
    },
    { name: "CHICKEN SCHNITZEL", price: "26", dots: true, desc: "Served with chips, salad and gravy." },
    {
      name: "SOUVLAKI",
      desc:
        "Served with pita bread, chips, green salad, and tzatziki. Chicken: 26 • Lamb: 28 • Mix: 28",
    },
    { name: "LEMON SALT & PEPPER CALAMARI", price: "28", dots: true, desc: "Fried calamari, chips, green salad and tartare sauce." },
    { name: "CRISPY SKIN SALMON", price: "36", dots: true, desc: "Grilled crispy skin salmon, mashed potato, steamed broccoli, almond flakes and dill hollandaise sauce." },
    { name: "FISHERMAN’S BASKET", price: "35", dots: true, desc: "Flat head fish, calamari, panko prawn. Served with chips, green salad, lemon wedges, and tartare sauce." },
    {
      name: "PORTERHOUSE STEAK",
      desc:
        "250g: 29 • 400g: 45. Served with chips, green salad. Choices of mushroom, gravy or red wine sauce.",
    },
    {
      name: "RIB EYE STEAK (500g)",
      price: "54",
      dots: true,
      desc: "Served with chips, green salad. Choices of mushroom, gravy or red wine sauce.",
    },
    { name: "LAMB SHANK", price: "38", dots: true, desc: "Slow cooked in red wine jus. Served with mashed potatoes and veggies." },
    { name: "SLOW COOK BEEF BRISKET", price: "34", dots: true, desc: "Served with mashed potatoes, gravy and coleslaw." },
    { name: "CHILLI MUSSELS", price: "28", dots: true, desc: "Mussels cooked in napoli sauce with chilli flakes and herbs. Served with bread." },
    { name: "CHICKEN SCALOPPINI", price: "28", dots: true, desc: "Grilled chicken tender, cooked in creamy mushroom sauce. Served with green salad and chips." },
    { name: "FRIED CHICKEN BURGER", price: "25", dots: true, desc: "Crispy chicken topped with mayo coleslaw, cheddar cheese, burger sauce, accompanied by a side of chips." },
    { name: "ANGUS BEEF BURGER", price: "25", dots: true, desc: "A grilled Angus beef patty topped with crispy bacon, a fried egg, lettuce, sliced tomato, and melted cheddar cheese, all drizzled with smoked BBQ sauce. Served with a side of chips." },
  ],
};

const pasta: Section = {
  title: "PASTA",
  items: [
    { name: "CHILLI GARLIC PRAWN LINGUINE", price: "28", dots: true, desc: "Linguine and prawns prepared in a rich tomato paste, infused with garlic, onion, chilli flakes, capers, and cherry tomatoes. Finished off with a sprinkle of parmesan." },
    { name: "BOLOGNESE SPAGHETTI", price: "25", dots: true, desc: "Spaghetti with Bolognese sauce and melted mozzarella cheese." },
    { name: "MUSHROOM CARBONARA LINGUINE", price: "25", dots: true, desc: "Linguine and bacon cooked in creamy mushroom sauce." },
    { name: "HOMEMADE BEEF LASAGNE", price: "25", dots: true, desc: "Served with chips and green salad." },
    { name: "CREAMY CHICKEN PESTO RIGATONI", price: "25", dots: true, desc: "Delicious rigatoni tossed in a light cream sauce with basil pesto, garlic, onions, and tender chicken. Finished off with a sprinkle of parmesan." },
  ],
};

const desserts: Section = {
  title: "DESSERTS",
  inverse: true,
  boxed: true,
  items: [
    { name: "STICKY DATE", price: "15", dots: true, desc: "Date pudding with butterscotch sauce and icecream." },
    { name: "LEMON TART", price: "15", dots: true, desc: "Served with icecream and cream." },
    { name: "CHOCOLATE BROWNIE", price: "15", dots: true, desc: "Served with vanilla icecream." },
    { name: "ICECREAM", price: "8", dots: true, desc: "Chocolate / Vanilla / Strawberry" },
  ],
};

/* ---------- Data: Drinks ---------- */
const tea: Section = {
  title: "TEA",
  subtitle: "5.5",
  items: [
    { name: "English breakfast / Earl Grey / Peppermint" },
    { name: "Spring Green / Chamomile" },
  ],
};

const addOn: Section = {
  title: "ADD ON",
  subtitle: "0.8",
  items: [
    { name: "Soy Milk / Almond Milk / Lactose Free Milk" },
  ],
};

const juices: Section = {
  title: "JUICES",
  subtitle: "Glass 5  •  Jug 13",
  items: [
    { name: "Pineapple" },
    { name: "Pink Grapefruit" },
    { name: "Cranberry" },
    { name: "Apple" },
    { name: "Mango" },
    { name: "Orange" },
  ],
};

const coldDrinks: Section = {
  title: "COLD DRINKS",
  items: [
    { name: "Milk shake", price: "9", desc: "Chocolate / Strawberry / Banana / Vanilla / Caramel" },
    { name: "Ice Chocolate", price: "8" },
    { name: "Sparkling Water", price: "4.5" },
    { name: "Soft Drinks", price: "4.5", desc: "Coke / Coke Zero / Diet Coke / Fanta / Lift" },
    { name: "Lemon Lime Bitters", price: "8" },
  ],
};

const bottleBeers: Section = {
  title: "BOTTLE BEERS",
  items: [
    { name: "Carlton Dry" },
    { name: "Carlton Draught" },
    { name: "Great Northern" },
    { name: "Corona" },
    { name: "Cascade" },
    { name: "Furphy" },
    { name: "VB" },
    { name: "Apple Cider" },
  ],
};

/* ---------- Data: Bar Menu ---------- */
const redWine: Section = {
  title: "RED WINE",
  subtitle: "GLASS / BOTTLE",
  items: [
    { name: "Shiraz", price: "9 / 35", dots: true },
    { name: "Cabernet Sauvignon", price: "9 / 35", dots: true },
    { name: "Merlot", price: "9 / 35", dots: true },
    { name: "Pinot Noir", price: "9 / 35", dots: true },
  ],
};

const whiteWine: Section = {
  title: "WHITE WINE",
  subtitle: "GLASS / BOTTLE",
  items: [
    { name: "Sauvignon Blanc", price: "9 / 35", dots: true },
    { name: "Pinot Grigio", price: "9 / 35", dots: true },
    { name: "Chardonnay", price: "9 / 35", dots: true },
    { name: "Moscato", price: "9 / 35", dots: true },
    { name: "Rose", price: "9", dots: true },
  ],
};

const sparkling: Section = {
  title: "SPARKLING",
  items: [
    { name: "Prosecco" },
    { name: "Brut Cuvee" },
  ],
};

const gin: Section = {
  title: "GIN",
  items: [
    { name: "Hendricks" },
    { name: "Bombay Sapphire" },
    { name: "Tanqueray" },
  ],
};

const tequila: Section = {
  title: "TEQUILA",
  items: [
    { name: "Patron Reposado" },
    { name: "Sierra" },
  ],
};

const rum: Section = {
  title: "RUM",
  items: [
    { name: "Bacardi White Rum" },
    { name: "Bundaberg" },
    { name: "Kraken Dark Rum" },
  ],
};

const vodka: Section = {
  title: "VODKA",
  items: [
    { name: "Absolut" },
    { name: "Absolut Raspberry" },
    { name: "Absolut Vanilla" },
  ],
};

const bourbon: Section = {
  title: "BOURBON WHISKEY",
  items: [
    { name: "Maker's Mark" },
    { name: "Jack Daniels" },
    { name: "Jim Beam" },
    { name: "Wild Turkey" },
    { name: "Woodford Reserve" },
  ],
};

const whiskey: Section = {
  title: "WHISKEY",
  items: [
    { name: "Johnny Walker Red" },
    { name: "Johnny Walker Black" },
    { name: "Canadian Club" },
    { name: "Jameson" },
    { name: "Chivas 12 Years" },
    { name: "Chivas 18 Years" },
    { name: "Talisker 10 Years" },
    { name: "Ardbeg" },
    { name: "Glenfiddich" },
  ],
};

const cocktails: Section = {
  title: "COCKTAILS",
  subtitle: "GLASS $19 · JUG $54",
  inverse: true,
  boxed: true,
  items: [
    { name: "BULLFROG", desc: "Vodka, Tequila, rum, Cointreau, gin, sugar syrup, lemon juice, Blue Curacao, topped up with Red Bull." },
    { name: "ESPRESSO MARTINI", desc: "Vodka, Kahlua, espresso and simple syrup, shaken and served in martini glass." },
    { name: "OLD FASHIONED", desc: "Bourbon whiskey, simple syrup, classic bitters, stirred and served over ice in rock glass." },
    { name: "MOJITO", desc: "White rum, lime wedges, mint and simple syrup, muddled and served over crushed ice with a dash of soda." },
    { name: "PINK GIN SPRITZ", desc: "Sparkling wine, pink gin, topped with lemonade and garnished with strawberry in wine glass." },
    { name: "LONG ISLAND", desc: "Vodka, Tequila, gin, rum, Cointreau, simple syrup and lemon juice, shaken and served on a bed of Coca-Cola." },
    { name: "PINA'S COLADA", desc: "Malibu, rum, pineapple juice, vanilla ice cream and fresh kiwi, blended together." },
    { name: "SOURPUSS", desc: "Raspberry vodka, lemon juice, sugar syrup and pink grapefruit juice, shaken and served in martini glass with fairy floss on top." },
    { name: "PASSIONELLA", desc: "Vodka, lemon juice, apple juice, peach schnapps, passionfruit and simple syrup, served in vanilla sugar rimmed martini glass." },
    { name: "COSMOPOLITAN", desc: "Vodka, Cointreau, freshly squeezed lime juice and cranberry juice, shaken and served." },
    { name: "FROZEN DAIQUIRI", desc: "Rum, Cointreau, lime juice and sugar syrup, blended with ice. Choice of flavour: lime, mango or strawberry." },
    { name: "MOSCOW MULE", desc: "Vodka, fresh lime wedges and sugar syrup, topped up with spicy ginger beer." },
    { name: "TOBLERONE", desc: "Baileys, Frangelico and Kahlua, blended with ice cream." },
    { name: "SEX ON THE BEACH", desc: "Vodka, peach schnapps, orange juice and cranberry juice." },
    { name: "FRUIT TINGLE", desc: "Vodka, Blue Curacao, lemonade and grenadine." },
    { name: "MARGARITA", desc: "Tequila, triple sec, simple syrup and lime juice." },
  ],
};

const shots: Section = {
  title: "SHOTS",
  items: [
    { name: "MIND ERASER", price: "9", dots: true, desc: "Vodka, Kahlua, sparkling water." },
    { name: "JAM DONUT", price: "9", dots: true, desc: "Chambord, Baileys, sugar rim." },
    { name: "COOL COLADA", price: "9", dots: true, desc: "White rum, coconut liqueur, pineapple juice." },
    { name: "KAMIKAZE", price: "9", dots: true, desc: "Vodka, orange liqueur, lime juice." },
  ],
};

/* ---------- UI atoms ---------- */
const Rule: React.FC<{ inverse?: boolean }> = ({ inverse }) => (
  <div className={inverse ? "rule rule--inverse" : "rule"} />
);

const InkDots: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={`ink ${className ?? ""}`} aria-hidden>
    <g fill="currentColor" opacity="0.25">
      {Array.from({ length: 130 }).map((_, i) => (
        <circle
          key={i}
          cx={Number((Math.random() * 200).toFixed(2))}
          cy={Number((Math.random() * 200).toFixed(2))}
          r={Number((Math.random() * 1.6 + 0.3).toFixed(2))}
        />
      ))}
    </g>
  </svg>
);

const MenuItem: React.FC<Item> = ({ name, price, desc, flags, dots }) => (
  <div className="item">
    <div className={dots ? "item__row item__row--dots" : "item__row"}>
      <div className="item__name">
        <span>{name}</span>
        {flags && <span className="item__flags"> {flags}</span>}
      </div>
      {price !== undefined && price !== "" && (
        <div className="item__price">{price}</div>
      )}
    </div>
    {desc && <p className="item__desc">{desc}</p>}
  </div>
);

const Panel: React.FC<
  React.PropsWithChildren<{ boxed?: boolean; inverse?: boolean }>
> = ({ boxed, inverse, children }) => (
  <div
    className={[
      "panel",
      boxed ? "panel--boxed" : "",
      inverse ? "panel--inverse" : "",
    ]
      .join(" ")
      .trim()}
  >
    {children}
  </div>
);

const SectionBlock: React.FC<Section> = ({
  title,
  subtitle,
  items,
  boxed,
  inverse,
}) => (
  <Panel boxed={boxed} inverse={inverse}>
    <div className="section__head">
      <h2 className="section__title">{title}</h2>
      {subtitle && <span className="section__subtitle">{subtitle}</span>}
    </div>
    <Rule inverse={inverse} />
    <div>{items.map((it, idx) => <MenuItem key={idx} {...it} />)}</div>
  </Panel>
);

/* ---------- Page ---------- */
export default function BallaratMenu() {
  useDocumentTitle("Ballarat Menu - FAT CHEF");
  return (
    <div className="ballarat-root">
      {/* 背景与墨点 */}
      <div className="paper-bg" />
      <InkDots className="ink--tl" />
      <InkDots className="ink--br" />

      <div className="ballarat-wrap">
        <h1 className="menu-page-title">FAT CHEF Ballarat Menu</h1>
        <div className="grid3">
          {/* Left */}
          <div className="stack">
            <SectionBlock {...signature} />
            <SectionBlock {...desserts} />
          </div>

          {/* Middle */}
          <div className="stack">
            <SectionBlock {...starters} />
            <SectionBlock {...salads} />
            <SectionBlock {...sides} />
            <SectionBlock {...kids} />
          </div>

          {/* Right */}
          <div className="stack">
            <SectionBlock {...mains} />
            <SectionBlock {...pasta} />
            {/* 右下角黑底 Desserts 盒子 */}
          </div>
        </div>

        <div className="divider">
          <span className="divider__line" />
          <span className="divider__label">DRINKS MENU</span>
          <span className="divider__line" />
        </div>

        <div className="drinks-grid">
          <div className="left-col">
            <SectionBlock {...tea} />
            <SectionBlock {...addOn} />
            <SectionBlock {...juices} />
          </div>

          <div className="right-col">
            <SectionBlock {...coldDrinks} />
            <SectionBlock {...bottleBeers} />
          </div>
        </div>

        <div className="divider">
          <span className="divider__line" />
          <span className="divider__label">BAR MENU</span>
          <span className="divider__line" />
        </div>

        <div className="grid3">
          {/* Left: wines + white spirits */}
          <div className="stack">
            <SectionBlock {...redWine} />
            <SectionBlock {...whiteWine} />
            <SectionBlock {...sparkling} />
            <SectionBlock {...gin} />
            <SectionBlock {...tequila} />
            <SectionBlock {...rum} />
            <SectionBlock {...vodka} />
          </div>

          {/* Middle: cocktails (黑底盒) */}
          <div className="stack">
            <SectionBlock {...cocktails} />
          </div>

          {/* Right: shots + dark spirits */}
          <div className="stack">
            <SectionBlock {...shots} />
            <SectionBlock {...bourbon} />
            <SectionBlock {...whiskey} />
          </div>
        </div>
      </div>
    </div>
  );
}
