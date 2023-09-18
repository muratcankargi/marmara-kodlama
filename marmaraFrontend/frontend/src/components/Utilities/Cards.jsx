import React from "react";

// span, dark modda altta çıkan siyah çizgi
// borderla vermedim çünkü sağdan soldan boşluk olsun istedim
function CardHeading({ author, date }) {
  return (
    <div className="dark:bg-[#1B2430] relative flex justify-between items-center py-1 px-2 text-sm bg-primary-100 text-neutral">
      <span className="w-[96%] h-[2px] -bottom-1 left-1/2 -translate-x-1/2 rounded-lg dark:bg-[#10141A] bg-none absolute"></span>
      <div>{author}</div>
      <div>{date}</div>
    </div>
  );
}

function CardImage({ source }) {
  return (
    <img
      className="object-cover rounded-sm pt-3 h-56 "
      src={source}
      alt="Kayıp Eşya"
    />
  );
}

function CardButton() {
  return (
    <button className="text-neutral h-8 flex justify-center items-center self-end mt-3 font-bold bg-accent p-2 rounded-md">
      Ayrıntıları Gör
    </button>
  );
}

function CardContent({ heading, content }) {
  return (
    <>
      <div className="text-xl font-bold dark:text-neutral">{heading}</div>
      <p className="pt-2 dark:text-neutral">{content}</p>
    </>
  );
}

function CardBody() {
  return (
    <div className="bg-white dark:bg-[#1B2430]  shadow-md p-2 py-3 flex flex-col">
      <CardContent
        heading="Kayıp Siyah Cüzdan"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
    aperiam repudiandae unde non? Quae, odit."
      />
      <CardImage source="./images/cuzdan.jpg" />
      <CardButton />
    </div>
  );
}

function Card() {
  return (
    <div className="pb-5 px-3 ">
      <CardHeading author="Serkan Bayram" date="20/08/2023" />
      <CardBody />
    </div>
  );
}

// Bu componentler farklı sayfalara ayrılacak
function Cards() {
  return (
    <div className="w-full pt-5">
      <Card />
      <Card />
    </div>
  );
}

export default Cards;
