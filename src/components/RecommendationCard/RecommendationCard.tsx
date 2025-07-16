import React from 'react';
import type { Recommendation } from '../../data/recommendations';
import styles from './RecommendationCard.module.css';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const primarySkills = ['React', 'TypeScript', 'JavaScript', 'Frontend'];
  
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatar}>{recommendation.avatar}</div>
        <div className={styles.info}>
          <h3 className={styles.name}>{recommendation.name}</h3>
          <p className={styles.title}>{recommendation.title} @ {recommendation.company}</p>
        </div>
      </div>
      
      <p className={styles.text}>{recommendation.content}</p>
      
      <div className={styles.skills}>
        {recommendation.skills.map((skill, index) => (
          <span 
            key={index} 
            className={`${styles.skill} ${primarySkills.includes(skill) ? styles.primary : ''}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};