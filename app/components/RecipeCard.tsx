type RecipeCardProps = {
  image: string;
  title: string;
  description: string;
};

export default function RecipeCard({ image, title, description }: RecipeCardProps) {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 flex-shrink-0 group">
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col transition-transform duration-300 group-hover:scale-105 group-hover:z-10 relative overflow-hidden"
        style={{ backgroundImage: `url('${image}')` }}
      >
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div>
        <p className="text-base font-medium leading-normal" style={{ color: 'var(--text-primary)' }}>{title}</p>
        <p className="text-sm font-normal leading-normal" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>
    </div>
  );
} 