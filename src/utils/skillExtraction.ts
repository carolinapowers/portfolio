/**
 * Systematic skill extraction utility for recommendations
 * Extracts additional skills from recommendation content that aren't explicitly listed
 */

import type { Recommendation } from '../data/recommendations';
import type { SkillCategory } from '../data/skills';

// Skill extraction rules mapping content patterns to skills
const EXTRACTION_RULES: Array<{
  patterns: RegExp[];
  skill: string;
  category: SkillCategory;
  priority: 'high' | 'medium' | 'low';
}> = [
  // Leadership & People Skills
  {
    patterns: [
      /patient|patience/i,
      /guide.*through.*challenges/i,
      /with patience and respect/i
    ],
    skill: 'Patient Teaching',
    category: 'leadership',
    priority: 'high'
  },
  {
    patterns: [
      /dependable|incredibly dependable/i,
      /reliable|reliability/i,
      /consistent.*deliver/i
    ],
    skill: 'Dependability',
    category: 'delivery',
    priority: 'high'
  },
  {
    patterns: [
      /elevates.*quality/i,
      /raises the bar/i,
      /improves.*project.*team/i
    ],
    skill: 'Quality Leadership',
    category: 'leadership',
    priority: 'high'
  },
  {
    patterns: [
      /willing to.*help/i,
      /jump in and help/i,
      /eager to lend a hand/i
    ],
    skill: 'Helpful Support',
    category: 'collaboration',
    priority: 'high'
  },
  {
    patterns: [
      /supportive/i,
      /offering.*support/i,
      /instrumental.*success/i
    ],
    skill: 'Supportive Leadership',
    category: 'leadership',
    priority: 'high'
  },

  // Technical Excellence
  {
    patterns: [
      /technically sharp/i,
      /technical.*excellence/i,
      /technical.*skill/i,
      /technical.*expertise/i
    ],
    skill: 'Technical Excellence',
    category: 'engineering',
    priority: 'high'
  },
  {
    patterns: [
      /thoughtful.*code/i,
      /clean.*thoughtful.*code/i,
      /attention to.*details/i
    ],
    skill: 'Code Craftsmanship',
    category: 'process',
    priority: 'high'
  },
  {
    patterns: [
      /problem-solving.*skills/i,
      /creative.*problem-solving/i,
      /innovative.*problem-solving/i
    ],
    skill: 'Problem-Solving Excellence',
    category: 'delivery',
    priority: 'high'
  },

  // Communication & Clarity
  {
    patterns: [
      /explain.*complex.*concepts.*clarity/i,
      /brings clarity to communication/i,
      /with clarity/i
    ],
    skill: 'Clear Communication',
    category: 'collaboration',
    priority: 'high'
  },
  {
    patterns: [
      /thoughtful.*insights/i,
      /asks.*right.*questions/i,
      /thoughtful.*feedback/i
    ],
    skill: 'Thoughtful Analysis',
    category: 'delivery',
    priority: 'medium'
  },

  // Learning & Growth
  {
    patterns: [
      /willing to.*dive in.*learn/i,
      /dedicated learner/i,
      /quick.*learn/i
    ],
    skill: 'Learning Agility',
    category: 'learning',
    priority: 'high'
  },
  {
    patterns: [
      /curiosity.*technical/i,
      /digging into.*root.*problem/i,
      /understand why.*behaved/i
    ],
    skill: 'Technical Curiosity',
    category: 'learning',
    priority: 'high'
  },

  // Innovation & Initiative
  {
    patterns: [
      /proactive.*approach/i,
      /decidedly proactive/i,
      /proactively seek/i
    ],
    skill: 'Proactive Initiative',
    category: 'delivery',
    priority: 'high'
  },
  {
    patterns: [
      /innovative.*problem-solving/i,
      /creativity.*proactive/i,
      /creative.*solutions/i
    ],
    skill: 'Innovation',
    category: 'learning',
    priority: 'high'
  },
  {
    patterns: [
      /experimenting.*testing/i,
      /initiative.*experimenting/i
    ],
    skill: 'Technical Experimentation',
    category: 'learning',
    priority: 'medium'
  },

  // Team Impact
  {
    patterns: [
      /brings.*best.*others/i,
      /lifts up.*around her/i,
      /makes.*team.*better/i
    ],
    skill: 'Team Empowerment',
    category: 'leadership',
    priority: 'high'
  },
  {
    patterns: [
      /vibrant energy/i,
      /brings.*energy/i,
      /sense of fun/i
    ],
    skill: 'Positive Energy',
    category: 'personality',
    priority: 'medium'
  },
  {
    patterns: [
      /calm.*thoughtful.*presence/i,
      /quiet strength/i,
      /humble/i
    ],
    skill: 'Calm Leadership',
    category: 'personality',
    priority: 'medium'
  },

  // Quality & Excellence
  {
    patterns: [
      /consistently.*deliver/i,
      /consistent.*quality/i,
      /never.*cuts corners/i
    ],
    skill: 'Consistent Quality',
    category: 'process',
    priority: 'high'
  },
  {
    patterns: [
      /dedication.*craft/i,
      /dedicated.*engineer/i,
      /commitment.*delivering/i
    ],
    skill: 'Professional Dedication',
    category: 'delivery',
    priority: 'high'
  },

  // Process & Organization
  {
    patterns: [
      /streamlined.*process/i,
      /streamlined.*tooling/i,
      /updating.*documentation/i
    ],
    skill: 'Process Optimization',
    category: 'process',
    priority: 'medium'
  },
  {
    patterns: [
      /coordinating.*teams/i,
      /navigating.*complex.*projects/i,
      /cross-team.*collaboration/i
    ],
    skill: 'Cross-team Coordination',
    category: 'collaboration',
    priority: 'high'
  }
];

/**
 * Extract additional skills from recommendation content
 */
export function extractSkillsFromContent(recommendation: Recommendation): string[] {
  const extractedSkills: string[] = [];
  const content = recommendation.content.toLowerCase();

  for (const rule of EXTRACTION_RULES) {
    const hasMatch = rule.patterns.some(pattern => pattern.test(content));

    if (hasMatch) {
      // Only add if not already in the skills list
      if (!recommendation.skills.includes(rule.skill)) {
        extractedSkills.push(rule.skill);
      }
    }
  }

  return extractedSkills;
}

/**
 * Get enhanced skills list with extracted skills
 */
export function getEnhancedSkills(recommendation: Recommendation): string[] {
  const extractedSkills = extractSkillsFromContent(recommendation);
  return [...recommendation.skills, ...extractedSkills];
}

/**
 * Analyze all recommendations and return enhancement suggestions
 */
export function analyzeSkillExtractionOpportunities(recommendations: Recommendation[]) {
  const results = recommendations.map(rec => ({
    id: rec.id,
    name: rec.name,
    currentSkills: rec.skills,
    extractedSkills: extractSkillsFromContent(rec),
    enhancedTotal: getEnhancedSkills(rec).length
  }));

  const summary = {
    totalRecommendations: recommendations.length,
    recommendationsWithExtractions: results.filter(r => r.extractedSkills.length > 0).length,
    totalExtractedSkills: results.reduce((sum, r) => sum + r.extractedSkills.length, 0),
    averageSkillsPerRecommendation: results.reduce((sum, r) => sum + r.enhancedTotal, 0) / results.length
  };

  return { results, summary };
}

/**
 * Apply skill extraction to a single recommendation
 */
export function enhanceRecommendationWithExtractedSkills(recommendation: Recommendation): Recommendation {
  const extractedSkills = extractSkillsFromContent(recommendation);

  return {
    ...recommendation,
    skills: [...recommendation.skills, ...extractedSkills]
  };
}