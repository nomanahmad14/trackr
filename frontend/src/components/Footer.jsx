const Footer = () => {
  return (
    <footer className="mt-12 bg-blue-600 text-white border-t border-blue-700">
      <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <p className="font-medium">Trackr © 2026</p>

        <p className="text-blue-100">
          Made with love by{" "}
          <span className="text-white font-semibold">Noman</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;