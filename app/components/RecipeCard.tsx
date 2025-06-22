import Link from 'next/link'

type RecipeCardProps = {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  cooking_time?: number;
  difficulty?: string;
  servings?: number;
  created_at: string;
};

export default function RecipeCard({ id, title, description, image_url, cooking_time, difficulty, servings }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${id}`} className="block">
      <div className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 flex-shrink-0 group cursor-pointer hover:shadow-lg transition-all duration-300">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col transition-transform duration-300 group-hover:scale-105 group-hover:z-10 relative overflow-hidden"
          style={{ 
            backgroundImage: image_url 
              ? `url('${image_url}')` 
              : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
          }}
        >
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Recipe Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <div className="flex items-center justify-between text-white text-xs">
              {cooking_time && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {cooking_time} dk
                </span>
              )}
              {difficulty && (
                <span className="px-2 py-1 bg-white/20 rounded-full">
                  {difficulty === 'easy' ? 'Kolay' : difficulty === 'medium' ? 'Orta' : 'Zor'}
                </span>
              )}
              {servings && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {servings} kişi
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-2">
          <h3 className="text-base font-medium leading-normal text-gray-800 mb-2 line-clamp-2">{title}</h3>
          {description && (
            <p className="text-sm font-normal leading-normal text-gray-600 line-clamp-3">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
} 