import { v4 as uuidv4 } from "uuid";

// random sayıda random tagsleri göstermek icin bir fonksiyon
const getRandomTags = () => {
  const loadingTags = [
    "Maltepe",
    "Elektronik",
    "Mühendislik Fakültesi",
    "Para",
    "Kadıköy",
    "Sosyal Bilimler",
    "İstanbul Kart",
    "Okul Kartı",
  ];

  const howManyTags = Math.floor(Math.random() * loadingTags.length);

  let tags = [];
  for (let i = 0; i < howManyTags; i++) {
    const randomIndex = Math.floor(Math.random() * loadingTags.length);

    tags.push(loadingTags[randomIndex]);
  }

  return tags;
};

// Sadece görüntüden oluşan interaktiflik içermeyen bir adet tag elemanı
export function NonInteractiveTag({ text, isLoading }) {
  return (
    <div
      className={`bg-black ${
        isLoading && "animate-pulse"
      } py-1 px-3 whitespace-nowrap rounded-sm font-semibold transition-all ease-in-out  text-neutral`}
    >
      {text}
    </div>
  );
}

let whichTags = getRandomTags();

export default function TagsLoadingSkeleton() {
  return (
    <div className="flex gap-3">
      {whichTags.map((text) => {
        return (
          <NonInteractiveTag isLoading={true} key={uuidv4()} text={text} />
        );
      })}
    </div>
  );
}
