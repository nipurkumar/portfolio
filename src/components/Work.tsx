import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    const container = document.querySelector(".work-container");
    const boxes = document.getElementsByClassName("work-box");
    if (!container || boxes.length === 0) return;

    // Safe calculation
    const rectLeft = container.getBoundingClientRect().left || 0;
    const rect = boxes[0].getBoundingClientRect();
    const parentWidth =
      boxes[0].parentElement?.getBoundingClientRect().width || 0;
    const padding =
      parseInt(window.getComputedStyle(boxes[0]).paddingLeft) || 0;

    const translateX = Math.max(
      rect.width * boxes.length - (rectLeft + parentWidth) + padding,
      0
    );
    if (translateX <= 0) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", { x: -translateX, ease: "none" });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  // Safe fallback for projects
  const projects = config.projects || [];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.length === 0 && (
            <p style={{ color: "white" }}>No projects to display</p>
          )}
          {projects.map((project, index) => (
            <div className="work-box" key={project.id || index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title || "Untitled"}</h4>
                    <p>{project.category || "Unknown"}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.technologies || "N/A"}</p>

                {/* Project Links */}
                <div className="work-links">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Safe WorkImage */}
              {project.image || project.video ? (
                <WorkImage
                  image={project.image || ""}
                  video={project.video || ""}
                  alt={project.title}
                  link={project.live || ""}
                />
              ) : (
                <div
                  style={{
                    height: "200px",
                    background: "#222",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  No Media
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
