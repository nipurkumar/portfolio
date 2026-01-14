import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image?: string;
  alt?: string;
  video?: string; // must be relative to /public
  link?: string;
}

const WorkImage = ({ image, alt, video: videoPath, link }: Props) => {
  const [isVideo, setIsVideo] = useState(false);

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={link}
        onMouseEnter={() => videoPath && setIsVideo(true)}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="disable"
      >
        {link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}

        {/* Image fallback */}
        {image ? (
          <img src={image} alt={alt || "Project"} />
        ) : (
          <div
            style={{
              width: "100%",
              height: "200px",
              background: "#222",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Image
          </div>
        )}

        {/* Video */}
        {isVideo && videoPath && (
          <video
            src={`/${videoPath}`} // public folder
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </a>
    </div>
  );
};

export default WorkImage;
