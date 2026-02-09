import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '../../data/creativeTechnologistProjects';
import styles from './ProjectCard.module.css';

// Helper function to parse markdown-style bold text
const parseMarkdownBold = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*[^*]+\*\*)/);

  return parts.map(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Remove the ** markers and render as bold
      const boldText = part.slice(2, -2);
      return <strong key={part}>{boldText}</strong>;
    }
    return part;
  });
};

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>
          {project.category.replace(/-/g, ' ')}
        </span>
        {project.featured && (
          <span className={styles.featuredBadge}>Featured</span>
        )}
      </div>

      <h3 className={styles.title}>{project.title}</h3>

      <p className={styles.story}>{project.story}</p>

      {project.projectLinks ? (
        <div className={styles.links}>
          {project.projectLinks.map(link => (
            <div key={link.name} className={styles.projectLinkRow}>
              <div className={styles.projectName}>{link.name}</div>
              <div className={styles.linkGroup}>
                {link.githubUrl && (
                  <a
                    href={link.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <Github size={16} />
                    <span>View Code</span>
                  </a>
                )}
                {link.liveUrl && (
                  <a
                    href={link.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        (project.githubUrl || project.liveUrl) && (
          <div className={styles.links}>
            <div className={styles.linkGroup}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <Github size={16} />
                  <span>View Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        )
      )}

      {!isExpanded && (
        <div className={styles.technologies}>
          {project.technologies.map(tech => (
            <span key={tech} className={styles.tech}>
              {tech}
            </span>
          ))}
        </div>
      )}

      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.section}>
            <h4>Project Details</h4>
            {project.projectDetails ? (
              project.projectDetails.split('\n\n').map(paragraph => (
                <p key={paragraph.slice(0, 50).replace(/[^a-zA-Z0-9]/g, '')}>
                  {parseMarkdownBold(paragraph)}
                </p>
              ))
            ) : (
              <p>{project.story}</p>
            )}
          </div>

          <div className={styles.section}>
            <h4>Technologies Used</h4>
            <ul className={styles.detailsList}>
              {project.technologies.map(tech => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <button
        type="button"
        className={styles.expandButton}
        onClick={onToggleExpand}
        aria-expanded={isExpanded}
      >
        {isExpanded ? 'Show Less' : 'Learn More'}
        <span aria-hidden="true">{isExpanded ? '↑' : '↓'}</span>
      </button>
    </article>
  );
};
