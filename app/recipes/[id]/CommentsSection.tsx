"use client";
import { useEffect, useState } from "react";
import { getCommentsByRecipe } from "../../lib/supabase/queries";
import AddCommentForm from "./AddCommentForm";
import Image from "next/image";

export default function CommentsSection({ recipeId }: { recipeId: string }) {
  const [comments, setComments] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    setLoading(true);
    const { data } = await getCommentsByRecipe(recipeId);
    setComments(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [recipeId]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Yorumlar</h2>
      <div className="space-y-4">
        {loading ? (
          <div>Yorumlar yükleniyor...</div>
        ) : Array.isArray(comments) && (comments as Record<string, unknown>[]).length > 0 ? (
          (comments as Record<string, unknown>[]).map((comment) => (
            <div key={comment.id as string} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
              <Image
                src={(comment.user_profiles as Record<string, unknown>)?.avatar_url as string || '/default-avatar.png'}
                alt={(comment.user_profiles as Record<string, unknown>)?.full_name as string || 'Kullanıcı'}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <div className="font-semibold text-orange-700">{(comment.user_profiles as Record<string, unknown>)?.full_name as string || 'Kullanıcı'}</div>
                <div className="text-gray-700">{comment.content as string}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(comment.created_at as string).toLocaleString('tr-TR')}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">Henüz yorum yok.</div>
        )}
      </div>
      <AddCommentForm recipeId={recipeId} onCommentAdded={fetchComments} />
    </div>
  );
} 