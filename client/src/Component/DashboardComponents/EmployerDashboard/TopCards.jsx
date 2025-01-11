const ImageCard = ({ imageSrc, title, description, altText }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-200 max-w-md">
      <div className="w-10 h-10 round-full flex-shrink-0">
        <img
          src={imageSrc}
          alt={altText || title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ImageCard;
