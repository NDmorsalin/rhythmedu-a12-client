const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="my-8 text-center">
      <h2 className="text-slate-800 text-2xl md:text-5xl font-semibold md:font-bold flex items-center justify-center gap-2">
        {title}
      </h2>
      <p className="text-slate-500 md:text-xl">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
