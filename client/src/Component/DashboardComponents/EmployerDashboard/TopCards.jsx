import { motion } from "framer-motion";

const ImageCard = ({ imageSrc, title, description, altText }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 , animation: "easeInOut" }}
      whileHover={{ scale: 1.01, duration: 0.1 }}
      className="flex items-center p-4 bg-white rounded-lg shadow-md shadow-gray-100 border hover:bg-[#E1E5E5] border-gray-200 max-w-md">
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
    </motion.div>
  );
};

export default ImageCard;
