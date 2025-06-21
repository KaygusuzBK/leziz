type CategoryCardProps = {
  image: string;
  title: string;
};

export default function CategoryCard({ image, title }: CategoryCardProps) {
  return (
    <div className="flex flex-col gap-3 pb-3 group">
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl transition-transform duration-300 group-hover:scale-105 group-hover:z-10 relative overflow-hidden"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <p className="text-base font-medium leading-normal text-primary">{title}</p>
    </div>
  );
} 