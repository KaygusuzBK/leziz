type CategoryCardProps = {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at?: string;
};

export default function CategoryCard({ id, name, description, image_url }: CategoryCardProps) {
  return (
    <div className="flex flex-col gap-3 pb-3 group cursor-pointer">
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl transition-transform duration-300 group-hover:scale-105 group-hover:z-10 relative overflow-hidden"
        style={{ 
          backgroundImage: image_url 
            ? `url('${image_url}')` 
            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {!image_url && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <p className="text-base font-medium leading-normal text-gray-800">{name}</p>
      {description && (
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      )}
    </div>
  );
} 