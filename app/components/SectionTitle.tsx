type SectionTitleProps = { title: string }

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-[#1b110d] text-lg md:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
      {title}
    </h2>
  );
} 